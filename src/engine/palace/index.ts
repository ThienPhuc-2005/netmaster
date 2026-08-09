// Cửa vào của cung điện ký ức (spec Module 5). Tầng UI và tầng nội dung
// chỉ import từ đây, không với tay vào từng file con.

export * from './palace'
export * from './walk'
export * from './cards'
// KHÔNG re-export palaceSchema — schema là đồ nghề của cổng nội dung (DEV/TEST)
// và trang /design; re-export ở đây là kéo tháp zod vào đường nóng PROD
// (biên bản hội đồng trung cấp, ghế Hiệu năng). Cần schema thì import
// thẳng file schema.
