// Hai cánh cổng điều hướng của app, tách khỏi `main.tsx` để TEST ĐƯỢC.
//
// Trước đây chúng nằm trong file entry — nơi có createRoot và import
// font, nên không test nào đụng tới được; đúng vùng từng có một bug thật
// (StrictMode render đôi nuốt mất <Navigate>) và đó là lý do hội đồng
// 07-08 (ghế kiến trúc) chỉ đích danh chỗ này.
//
// Cả hai cổng có chung một luật: QUYẾT ĐỊNH TRONG EFFECT, không trong
// render. Lý do gấp đôi:
//   1. Phải chờ zustand persist rehydrate xong mới đọc được hộp ôn tập —
//      quyết sớm là quyết trên state trắng của người học cũ.
//   2. Render KHÔNG được mutate cờ module: StrictMode gọi render hai lần,
//      lần đầu bật cờ thì lần hai đã thấy "đã quyết rồi" và <Navigate>
//      biến mất.

import { useEffect, useState } from 'react'
import { Navigate } from 'react-router'
import { AppLayout } from '../components/AppLayout'
import { ManThieuNoiDung } from '../components/ManThieuNoiDung'
import { OnboardingPage } from '../features/onboarding/OnboardingPage'
import { LearnPage } from '../features/learn/LearnPage'
import { loadModules, noiDungDayDu, primeModules } from '../content'
import { cardIdsHopLe } from '../engine/reviewQueue'
import { shouldReviewFirst, todayIso, useProgress } from '../store/progress'

// Kéo nội dung NGAY khi bundle chạy — song song với hydrate store, không
// chờ React mount. AppGate chỉ mở AppLayout khi promise này xong, nên mọi
// `loadModules()` đồng bộ phía sau cổng luôn đọc được cache đã đầy.
// (Onboarding KHÔNG chờ nội dung: aha 60 giây đứng trước mọi thứ, và màn
// đó không đọc module nào.)
const contentReady = primeModules()
// Nhận cú hụt NGAY TẠI ĐÂY một lần nữa, dù `AppGate` mới là chỗ dựng màn:
// promise này bắn từ lúc bundle chạy, nên nó có thể hụt TRƯỚC khi React
// kịp mount và gắn tay bắt. Không có dòng này thì trình duyệt ghi một
// "Uncaught (in promise)" đỏ vào console — tiếng ồn vô nghĩa ngay giữa
// chỗ người đi sửa lỗi cần đọc. `.catch` trả về promise KHÁC nên
// `contentReady` vẫn nguyên vẹn cho bên dưới dùng.
contentReady.catch(() => undefined)

/** Ba trạng thái của kho nội dung, nhìn từ cổng vào app. */
type TrangThaiNoiDung = 'dang-keo' | 'xong' | 'hut'

// Luật "mỗi ngày mở app, việc ĐẦU TIÊN là ôn thẻ đến hạn" (spec 2.2) chỉ
// áp cho lần điều hướng ĐẦU của phiên; sau đó người học đi lại tự do
// (việc học BÀI MỚI vẫn bị chặn riêng bởi luật nợ > 30 thẻ).
let openedIntoReview = false

/** Chỉ dành cho TEST: trả cờ "đã vào app lần đầu" về như lúc mở app. */
export function resetSessionGatesForTest(): void {
  openedIntoReview = false
}

export function LearnIndexGate() {
  const [decision, setDecision] = useState<'pending' | 'review' | 'learn'>(
    openedIntoReview ? 'learn' : 'pending',
  )

  useEffect(() => {
    if (decision !== 'pending') return
    const decide = () => {
      openedIntoReview = true
      const { reviewCards, lastReviewDate } = useProgress.getState()
      setDecision(shouldReviewFirst(reviewCards, lastReviewDate, todayIso()) ? 'review' : 'learn')
    }
    if (useProgress.persist.hasHydrated()) {
      decide()
      return
    }
    return useProgress.persist.onFinishHydration(decide)
  }, [decision])

  if (decision === 'pending') return null
  if (decision === 'review') return <Navigate to="/on-tap" replace />
  return <LearnPage />
}

/**
 * Cổng vào app: người dùng MỚI thấy onboarding (bắn gói tin) trước mọi
 * thứ — kể cả sidebar, kể cả luật "ôn trước" (spec 4.5: aha moment đứng
 * trước mọi màn giới thiệu). Chờ rehydrate rồi mới quyết định để không
 * nháy onboarding vào mặt người dùng cũ.
 */
export function AppGate() {
  const [hydrated, setHydrated] = useState(useProgress.persist.hasHydrated())
  useEffect(() => {
    if (hydrated) return
    return useProgress.persist.onFinishHydration(() => setHydrated(true))
  }, [hydrated])
  const [noiDung, setNoiDung] = useState<TrangThaiNoiDung>('dang-keo')
  // Đếm số lần bấm "Thử lại" — đổi số là effect chạy lại và gọi
  // `primeModules()` một lượt mới.
  const [lanThu, setLanThu] = useState(0)
  useEffect(() => {
    let alive = true
    // Lượt đầu dùng promise đã bắn từ lúc bundle chạy (đừng kéo lại thứ
    // đang trên đường về); lượt thử lại mới gọi hàm lần nữa — kho vẫn
    // rỗng nên nó kéo thật, không có cache nào chắn.
    const cho = lanThu === 0 ? contentReady : primeModules()
    cho.then(
      () => {
        if (!alive) return
        // DỌN THẺ MỒ CÔI ngay khi nội dung đã nạp (phát hiện K1, khối
        // 21.46). Đây là chỗ DUY NHẤT biết đủ hai vế: hộp ôn tập của người
        // học, và nội dung hiện tại dựng được mặt thẻ nào. Thẻ nội dung
        // không còn mà để lại thì nó vẫn tính vào nợ quá hạn, vẫn kéo
        // người học vào phiên ôn — mà phiên ôn không dựng nổi mặt nó.
        //
        // CHỈ KHI NỘI DUNG VỀ ĐỦ (khối 21.49). Hàm này XOÁ HẲN thẻ khỏi
        // hộp; chạy nó trên khúc nội dung cụt là đọc "gói chưa tải về"
        // thành "khái niệm đã bị bỏ" rồi xoá sạch lịch ôn của nửa khóa
        // sau — mất dữ liệu thật, chỉ vì một lần rớt mạng. Thiếu thì thà
        // để thẻ nằm đó: lượt mở app sau, nội dung về đủ là dọn được.
        if (noiDungDayDu()) useProgress.getState().donTheMoCoi(cardIdsHopLe(loadModules()))
        setNoiDung('xong')
      },
      // KÉO HỤT (phát hiện L1): mạng rớt giữa chừng, hoặc service worker
      // cài lúc mạng chập chờn nên cache thiếu một file nội dung. Trước
      // đây nhánh này không tồn tại — promise reject rơi vào hư không và
      // cổng đứng mãi ở `return null`, tức MÀN TRẮNG câm. Giờ nói ra và
      // đưa đường thử lại.
      (loi: unknown) => {
        if (!alive) return
        console.warn('[netmaster] chưa kéo được nội dung bài học', loi)
        setNoiDung('hut')
      },
    )
    return () => {
      alive = false
    }
  }, [lanThu])
  const onboardingDone = useProgress((s) => s.onboardingDone)

  if (!hydrated) return null
  // Onboarding mở được ngay cả khi nội dung còn đang kéo (màn đó tự đủ);
  // nội dung thường xong từ lâu trước khi người mới bấm hết onboarding.
  if (!onboardingDone) return <OnboardingPage />
  if (noiDung === 'hut') {
    return (
      <ManThieuNoiDung
        thuLai={() => {
          setNoiDung('dang-keo')
          setLanThu((n) => n + 1)
        }}
      />
    )
  }
  if (noiDung !== 'xong') return null
  return <AppLayout />
}
