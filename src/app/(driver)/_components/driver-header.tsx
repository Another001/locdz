"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { Icon } from "@/components/ui/icon";

const navItems = [
  { label: "Tổng quan", href: "/" },
  { label: "Xe được giao", href: "#" },
  { label: "Hồ sơ", href: "#" },
] as const;

type NavItem = { label: string; href: string; active: boolean };

function NavLink({
  item,
  mobile = false,
  onNavigate,
}: {
  item: NavItem;
  mobile?: boolean;
  onNavigate?: () => void;
}) {
  const className = mobile
    ? `border-b border-line-soft py-3 text-[15px] font-semibold ${
        item.active ? "text-sky-700" : "text-slate-700"
      } last:border-b-0`
    : `relative py-1.5 text-[14.5px] font-medium transition-colors after:absolute after:-bottom-0.5 after:left-0 after:right-0 after:h-0.5 after:origin-left after:rounded after:bg-sky-600 after:transition-transform after:content-[''] ${
        item.active
          ? "text-sky-700 after:scale-x-100"
          : "text-slate-700 after:scale-x-0 hover:text-sky-700 hover:after:scale-x-100"
      }`;

  const content = (
    <>
      {item.label}
      {!mobile && item.active ? <span className="sr-only"> (đang xem)</span> : null}
    </>
  );

  if (item.href === "/") {
    return (
      <Link
        href={item.href}
        className={className}
        aria-current={item.active ? "page" : undefined}
        onClick={onNavigate}
      >
        {content}
      </Link>
    );
  }

  return (
    <a
      href={item.href}
      className={className}
      aria-current={item.active ? "page" : undefined}
      onClick={onNavigate}
    >
      {content}
    </a>
  );
}

export function DriverHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const nav = navItems.map((item) => ({
    ...item,
    active: item.href === pathname,
  }));

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 8);

    update();
    window.addEventListener("scroll", update, { passive: true });

    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    const onOutsideClick = (event: MouseEvent) => {
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    };
    const onResize = () => {
      if (window.innerWidth > 900) setMenuOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("click", onOutsideClick);
    window.addEventListener("resize", onResize);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("click", onOutsideClick);
      window.removeEventListener("resize", onResize);
    };
  }, [menuOpen]);

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-[60] backdrop-blur-[16px] transition-[background-color,border-color,box-shadow] duration-200 ${
        scrolled
          ? "border-b border-line bg-[rgba(255,255,255,0.92)] shadow-[0_8px_30px_-24px_rgba(8,20,38,0.4)]"
          : "border-b border-transparent bg-[rgba(247,250,253,0.72)]"
      }`}
    >
      <div className="mx-auto flex min-h-[70px] w-full max-w-[1240px] items-center justify-between gap-6 px-4 md:min-h-[78px] md:px-5">
        <Link
          href="/"
          className="inline-flex flex-none items-center gap-2.5 font-heading text-[21px] font-extrabold tracking-[-0.02em] text-ink max-[400px]:text-[19px]"
          aria-label="Vi Vu Việt Khu tài xế"
        >
          <span className="grid h-[42px] w-[42px] place-items-center overflow-hidden rounded-xl bg-white shadow-[0_8px_18px_-10px_rgba(8,20,38,0.45)] max-[400px]:h-9 max-[400px]:w-9 max-[400px]:rounded-[11px]">
            <Image
              src="/assets/logo.svg"
              alt=""
              width={42}
              height={42}
              className="h-full w-full object-contain"
              unoptimized
              priority
            />
          </span>
          <span>
            Vi Vu <span className="text-sky-700">Việt</span>
          </span>
        </Link>

        <nav
          className="hidden items-center gap-[30px] min-[901px]:flex"
          aria-label="Điều hướng tài xế"
        >
          {nav.map((item) => (
            <NavLink key={item.label} item={item} />
          ))}
        </nav>

        <div className="flex items-center gap-[18px]">
          <a
            href="#"
            className="inline-flex min-h-11 items-center gap-2.5 rounded-full border border-line bg-white py-1 pl-[5px] pr-3 transition-[background-color,border-color,box-shadow] hover:border-sky-300 hover:bg-sky-50 hover:shadow-sm max-[900px]:gap-0 max-[900px]:p-[5px]"
            aria-label="Hồ sơ tài xế Anh Minh"
          >
            <span
              className="grid h-[34px] w-[34px] flex-none place-items-center rounded-full bg-navy-800 font-heading text-sm font-extrabold leading-none text-white"
              aria-hidden="true"
            >
              M
            </span>
            <span className="flex min-w-0 flex-col leading-[1.15] max-[900px]:hidden">
              <strong className="font-heading text-[13px] font-bold text-ink">
                Anh Minh
              </strong>
              <small className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.08em] text-slate-500">
                Tài xế
              </small>
            </span>
          </a>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-white text-ink min-[901px]:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobileNav"
            aria-label={menuOpen ? "Đóng menu" : "Mở menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <Icon
              name={menuOpen ? "close" : "menu"}
              className="h-5 w-5"
            />
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div
          id="mobileNav"
          className="absolute inset-x-0 top-full border-b border-line bg-white px-5 pb-[22px] pt-[18px] shadow-md min-[901px]:hidden"
        >
          <nav className="flex flex-col" aria-label="Điều hướng tài xế trên di động">
            {nav.map((item) => (
              <NavLink
                key={item.label}
                item={item}
                mobile
                onNavigate={() => setMenuOpen(false)}
              />
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
