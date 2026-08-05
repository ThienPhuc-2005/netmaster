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
