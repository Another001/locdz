import { LoginForm } from "./_components/login-form";

export const metadata = {
  title: "Đăng nhập tài xế — Vi Vu Việt",
  description:
    "Đăng nhập buồng lái tài xế Vi Vu Việt để nhận chuyến, theo dõi lịch trình và quản lý thu nhập mỗi ngày.",
};

export default function DriverLoginPage() {
  return (
    <main id="main" className="min-h-[dvh] bg-canvas flex items-center justify-center">
      <div className="w-full px-4">
        <section
          aria-labelledby="dang-nhap"
          className="mx-auto max-w-[460px] rounded-[20px] border border-line bg-surface p-[clamp(26px,3.4vw,38px)] shadow-md max-[640px]:p-5"
        >
          <LoginForm />
        </section>
      </div>
    </main>
  );
}
