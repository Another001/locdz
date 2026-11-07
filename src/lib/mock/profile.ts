import type { DriverProfile } from "@/types";

export const driverProfile: DriverProfile = {
  name: "Nguyễn Anh Minh",
  initial: "M",
  meta: "Tài xế · Tham gia 12/03/2023",
  fields: [
    { label: "Họ tên", value: "Nguyễn Anh Minh" },
    { label: "Số điện thoại", value: "0903 123 456" },
    { label: "Email", value: "minh.nguyen@vuvuviet.vn" },
    { label: "Ngày tham gia", value: "12/03/2023" },
  ],
  licenseNote: "Chỉ đọc — admin cập nhật",
  licenseFields: [
    { label: "Số GPLX", value: "012345678901" },
    { label: "Hạng", value: "B2", badge: "sky" },
    { label: "Ngày hết hạn", value: "15/06/2027" },
    { label: "Trạng thái", value: "Còn hiệu lực", badge: "green" },
  ],
};
