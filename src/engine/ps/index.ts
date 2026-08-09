// Cửa vào của terminal PowerShell ảo (spec Module 12). Tầng UI và tầng
// nội dung chỉ import từ đây, không với tay vào từng file con.

export * from './world'
export * from './interpret'
export * from './gradePs'
// KHÔNG re-export psSchema — schema là đồ nghề của cổng nội dung (DEV/TEST)
// và trang /design; re-export ở đây là kéo tháp zod vào đường nóng PROD
// (biên bản hội đồng trung cấp, ghế Hiệu năng). Cần schema thì import
// thẳng file schema.
