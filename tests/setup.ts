// Vitest setup — chạy TRƯỚC khi mỗi file test được import.
// Môi trường node không có localStorage; stub in-memory để zustand
// persist hoạt động thật trong test (jsdom đã có sẵn thì giữ nguyên).

function memoryStorage(): Storage {
  const bag = new Map<string, string>()
  return {
    get length() {
      return bag.size
    },
    clear: () => bag.clear(),
    getItem: (k) => bag.get(k) ?? null,
    key: (i) => [...bag.keys()][i] ?? null,
    removeItem: (k) => bag.delete(k),
    setItem: (k, v) => bag.set(k, String(v)),
  }
}

if (typeof globalThis.localStorage === 'undefined') {
  globalThis.localStorage = memoryStorage()
}

// Nội dung giờ nạp LƯỜI (primeModules — xem src/content/index.ts): app do
// AppGate prime; test thì prime MỘT LẦN ở đây để mọi loadModules() đồng
// bộ trong test vẫn chạy y như cũ. Top-level await: vitest chờ setup
// xong mới chạy test.
import { primeModules } from '../src/content'

await primeModules()
