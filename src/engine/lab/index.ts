// Cửa vào của bộ mô phỏng phòng lab (spec Module 4). Tầng UI và tầng
// nội dung chỉ import từ đây, không với tay vào từng file con.

export * from './topology'
export * from './simulate'
export * from './stp'
export * from './acl'
export * from './ospf'
export * from './session'
export * from './gradeLab'
// KHÔNG re-export labSchema — schema là đồ nghề của cổng nội dung (DEV/TEST)
// và trang /design; re-export ở đây là kéo tháp zod vào đường nóng PROD
// (biên bản hội đồng trung cấp, ghế Hiệu năng). Cần schema thì import
// thẳng file schema.
