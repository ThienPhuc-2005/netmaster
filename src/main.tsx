import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router'

// Font tự host — không CDN: Be Vietnam Pro (thiết kế cho tiếng Việt)
// cho UI, JetBrains Mono cho IP/port/số liệu kỹ thuật.
import '@fontsource/be-vietnam-pro/400.css'
import '@fontsource/be-vietnam-pro/600.css'
import '@fontsource/be-vietnam-pro/700.css'
import '@fontsource/jetbrains-mono/400.css'
import '@fontsource/jetbrains-mono/700.css'
import './styles/app.css'

import { AppLayout } from './components/AppLayout'
import { OnboardingPage } from './features/onboarding/OnboardingPage'
import { LearnPage } from './features/learn/LearnPage'
import { LessonPlayer } from './features/learn/LessonPlayer'
import { ModuleTestPage } from './features/learn/ModuleTestPage'
import { ReviewPage } from './features/review/ReviewPage'
import { DrillPage } from './features/drill/DrillPage'
import { ClinicPage } from './features/clinic/ClinicPage'
import { ProfilePage } from './features/profile/ProfilePage'
import { DesignPage } from './features/design/DesignPage'
import { shouldReviewFirst, todayIso, useProgress } from './store/progress'

// Luật "mỗi ngày mở app, việc ĐẦU TIÊN là ôn thẻ đến hạn" (spec 2.2):
// lần điều hướng ĐẦU của phiên app, còn thẻ đến hạn và hôm nay chưa ôn
// → đưa thẳng vào Ôn tập. Sau đó người học tự do đi lại (việc học BÀI
// MỚI vẫn bị chặn riêng bởi luật nợ > 30 thẻ).
//
// Quyết định đặt trong EFFECT, không phải trong render: (1) chờ được
// zustand persist rehydrate xong mới đọc hộp ôn; (2) render không được
// mutate cờ module — StrictMode render đôi sẽ nuốt mất <Navigate> nếu
// lần render đầu đã bật cờ.
let openedIntoReview = false

function LearnIndexGate() {
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

// Cổng vào app: người dùng MỚI thấy onboarding (bắn gói tin) trước mọi
// thứ — kể cả sidebar, kể cả luật "ôn trước" (spec 4.5: aha moment đứng
// trước mọi màn giới thiệu). Chờ zustand rehydrate rồi mới quyết định
// để không nháy onboarding với người dùng cũ.
function AppGate() {
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

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <AppGate />,
      children: [
        { index: true, element: <LearnIndexGate /> },
        { path: 'bai/:lessonId', element: <LessonPlayer /> },
        { path: 'kiem-tra/:moduleId', element: <ModuleTestPage /> },
        { path: 'on-tap', element: <ReviewPage /> },
        { path: 'luyen-subnet', element: <DrillPage /> },
        { path: 'phong-kham', element: <ClinicPage /> },
        { path: 'ho-so', element: <ProfilePage /> },
        { path: 'design', element: <DesignPage /> },
      ],
    },
  ],
  // GitHub Pages đặt app dưới /<repo>/; BASE_URL do Vite bơm theo `base`
  // ('/' khi dev → basename '' như cũ). react-router muốn không có '/' cuối.
  { basename: import.meta.env.BASE_URL.replace(/\/$/, '') },
)

// Vite không Fast-Refresh được file entry (chứa cả router lẫn gate) —
// khi file này đổi lúc dev, module chạy lại: giữ root cũ để không
// createRoot hai lần trên cùng container (chỉ ảnh hưởng dev, không prod).
interface RootHost {
  __netmasterRoot?: ReturnType<typeof createRoot>
}
const host = globalThis as RootHost
host.__netmasterRoot ??= createRoot(document.getElementById('root')!)
host.__netmasterRoot.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
