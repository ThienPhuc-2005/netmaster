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
import { OnboardingPage } from '../features/onboarding/OnboardingPage'
import { LearnPage } from '../features/learn/LearnPage'
import { shouldReviewFirst, todayIso, useProgress } from '../store/progress'

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
  const onboardingDone = useProgress((s) => s.onboardingDone)

  if (!hydrated) return null
  if (!onboardingDone) return <OnboardingPage />
  return <AppLayout />
}
