import type { VehiclePageData } from "@/types";

export const vehiclePage: VehiclePageData = {
  vehicle: {
    name: "Ford Transit 16 chỗ",
    plate: "51A-123.45",
    status: "Hoạt động",
    specs: [
      { label: "Loại xe", value: "Xe khách 16 chỗ" },
      { label: "Biển số", value: "51A-123.45" },
      { label: "Số chỗ", value: "16 chỗ" },
      { label: "Năm sản xuất", value: "2022" },
      { label: "Nhiên liệu", value: "Dầu diesel" },
      { label: "Màu xe", value: "Trắng" },
    ],
  },
  documentsUpdatedAt: "01/11/2026",
  documents: [
    {
      id: "dkx",
      name: "Đăng ký xe",
      detail: "Số: 012345 · Cấp 12/2022",
      valid: true,
      expiry: "HSD 12/2027",
    },
    {
      id: "dang-kiem",
      name: "Đăng kiểm",
      detail: "Tem kiểm định 10/2026",
      valid: false,
      expiry: "HSD 10/2026",
    },
    {
      id: "tnds",
      name: "Bảo hiểm TNDS bắt buộc",
      detail: "Bảo Việt · HĐ 51A/2024",
      valid: true,
      expiry: "HSD 06/2027",
    },
    {
      id: "vat-chat",
      name: "Bảo hiểm vật chất",
      detail: "PVI · HĐ VC-2024/888",
      valid: false,
      expiry: "HSD 09/2026",
    },
  ],
  trips: [
    {
      id: "trip-1",
      route: "Giáp Bát → Hòa Bình",
      time: "Hôm nay · 06:30",
      success: true,
    },
    {
      id: "trip-2",
      route: "Nước Ngầm → Ninh Bình",
      time: "Hôm qua · 07:00",
      success: false,
    },
    {
      id: "trip-3",
      route: "Mỹ Đình → Hải Dương",
      time: "30/10 · 13:00",
      success: true,
    },
    {
      id: "trip-4",
      route: "Gia Lâm → Bắc Ninh",
      time: "29/10 · 08:15",
      success: false,
    },
  ],
  adminNote:
    "Xe do admin gán. Mọi thay đổi về xe vui lòng liên hệ admin — tài xế không tự đổi xe.",
  tipNote:
    "Trước mỗi chuyến, kiểm tra lốp, đèn và nhiên liệu. Nếu phát hiện sự cố, mở chi tiết chuyến và bấm “Báo sự cố” để admin hỗ trợ.",
};
