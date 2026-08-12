import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, useRouteError } from 'react-router'
import { LazyMotion, MotionConfig, domAnimation } from 'motion/react'

// Font tự host — không CDN: Be Vietnam Pro (thiết kế cho tiếng Việt)
// cho UI, JetBrains Mono cho IP/port/số liệu kỹ thuật.
import '@fontsource/be-vietnam-pro/400.css'
import '@fontsource/be-vietnam-pro/600.css'
import '@fontsource/be-vietnam-pro/700.css'
import '@fontsource/jetbrains-mono/400.css'
import '@fontsource/jetbrains-mono/700.css'
import './styles/app.css'

import { AppErrorBoundary } from './components/AppErrorBoundary'
import { ManLoiRoute } from './components/ManLoi'
import { SingleWindowGuard } from './components/SingleWindowGuard'
import { useSettings } from './store/settings'
import { LessonPlayer } from './features/learn/LessonPlayer'
import { ReviewPage } from './features/review/ReviewPage'
// Hai cánh cổng điều hướng ở file riêng để test jsdom với tới được —
// file entry này có createRoot nên import vào test là chạy cả app.
import { AppGate, LearnIndexGate } from './app/gates'

// Route NGOÀI đường nóng tách chunk riêng (hội đồng, ghế hiệu năng: một
// bundle 1.27MB zero code-split là chỗ máy yếu mạng chậm đau đầu tiên).
// Đường nóng giữ eager: onboarding → LearnPage/ReviewPage → LessonPlayer
// (gate ôn-trước đưa người học vào đúng các trang này ở mọi phiên).
const ModuleTestPage = lazy(() =>
  import('./features/learn/ModuleTestPage').then((mod) => ({ default: mod.ModuleTestPage })),
)
const DrillPage = lazy(() => import('./features/drill/DrillPage').then((mod) => ({ default: mod.DrillPage })))
const VlsmDrill = lazy(() => import('./features/drill/VlsmDrill').then((mod) => ({ default: mod.VlsmDrill })))
const ClinicPage = lazy(() => import('./features/clinic/ClinicPage').then((mod) => ({ default: mod.ClinicPage })))
const ProfilePage = lazy(() =>
  import('./features/profile/ProfilePage').then((mod) => ({ default: mod.ProfilePage })),
)
const WeakSpotDrillPage = lazy(() =>
  import('./features/profile/WeakSpotDrill').then((mod) => ({ default: mod.WeakSpotDrillPage })),
)
const DesignPage = lazy(() => import('./features/design/DesignPage').then((mod) => ({ default: mod.DesignPage })))
const GraduationPage = lazy(() =>
  import('./features/graduation/GraduationPage').then((mod) => ({ default: mod.GraduationPage })),
)

/** Fallback null: chunk route nhỏ, nháy spinner còn ồn hơn là đợi ~100ms. */
function lazyRoute(element: React.ReactNode) {
  return <Suspense fallback={null}>{element}</Suspense>
}

/** Vỏ nhỏ đọc lỗi từ router rồi giao cho màn lỗi dùng chung. */
function RouteErrorScreen() {
  return <ManLoiRoute error={useRouteError()} />
}

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <AppGate />,
      // Lỗi khi render một route bị ROUTER bắt trước AppErrorBoundary —
      // không khai chỗ này thì người học thấy màn lỗi mặc định của
      // react-router: mất cả 4 tab, và không còn đường nào tới trang Hồ
      // sơ để lùi về bản tự lưu (phát hiện J1, khối 21.43).
      errorElement: <RouteErrorScreen />,
      children: [
        { index: true, element: <LearnIndexGate /> },
        { path: 'bai/:lessonId', element: <LessonPlayer /> },
        { path: 'kiem-tra/:moduleId', element: lazyRoute(<ModuleTestPage />) },
        { path: 'on-tap', element: <ReviewPage /> },
        { path: 'luyen-subnet', element: lazyRoute(<DrillPage />) },
        { path: 'luyen-vlsm', element: lazyRoute(<VlsmDrill />) },
        { path: 'phong-kham', element: lazyRoute(<ClinicPage />) },
        { path: 'ho-so', element: lazyRoute(<ProfilePage />) },
        { path: 'luyen-lai', element: lazyRoute(<WeakSpotDrillPage />) },
        { path: 'tot-nghiep/:milestoneId', element: lazyRoute(<GraduationPage />) },
        { path: 'design', element: lazyRoute(<DesignPage />) },
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
// Vỏ gốc: lưới đỡ lỗi (không còn màn trắng khi engine throw) + chặn hai
// cửa sổ ghi đè nhau. Boundary cần lang mà class component không hook
// được — bọc qua một function component nhỏ.
function Root() {
  const lang = useSettings((s) => s.lang)
  return (
    <AppErrorBoundary lang={lang}>
      <SingleWindowGuard>
        {/* LazyMotion strict: chỉ ship phần domAnimation của thư viện
            motion (mọi chỗ đã đổi motion.* → m.*). MotionConfig
            reducedMotion="user": TẤT CẢ animation của motion tôn trọng
            prefers-reduced-motion mặc định — khỏi nhớ useReducedMotion
            từng chỗ (lỗ MiniPacket hội đồng bắt được tự lành). */}
        <LazyMotion features={domAnimation} strict>
          <MotionConfig reducedMotion="user">
            <RouterProvider router={router} />
          </MotionConfig>
        </LazyMotion>
      </SingleWindowGuard>
    </AppErrorBoundary>
  )
}

host.__netmasterRoot ??= createRoot(document.getElementById('root')!)
host.__netmasterRoot.render(
  <StrictMode>
    <Root />
  </StrictMode>,
)

/**
 * Cài service worker để app nằm được trên màn hình chính và mở được khi
 * mất mạng (kho ý tưởng F1).
 *
 * CHỈ ở bản build thật: dev server không phát `sw.js`, mà một service
 * worker cũ còn sống ở localhost sẽ phục vụ asset ôi giữa lúc đang sửa
 * code — kiểu lỗi tốn cả buổi để nhận ra.
 *
 * Đăng ký SAU `load` để không giành băng thông với lượt vẽ đầu tiên.
 * `scope` bằng đúng BASE: trên GitHub Pages app nằm dưới /<tên-repo>/,
 * lấy scope gốc là trình duyệt từ chối thẳng.
 */
if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  const base = import.meta.env.BASE_URL
  window.addEventListener('load', () => {
    void navigator.serviceWorker.register(`${base}sw.js`, { scope: base })
  })
}
