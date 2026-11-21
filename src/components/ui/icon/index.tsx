import type { ComponentType, SVGProps } from "react";

import { AlertIcon } from "./alert";
import { ArrowRightIcon } from "./arrow-right";
import { ArrowUpRightIcon } from "./arrow-up-right";
import { CalendarIcon } from "./calendar";
import { CarIcon } from "./car";
import { CheckCircleIcon } from "./check-circle";
import { CheckIcon } from "./check";
import { ChevronDownIcon } from "./chevron-down";
import { CloseIcon } from "./close";
import { CopyIcon } from "./copy";
import { EyeIcon } from "./eye";
import { EyeOffIcon } from "./eye-off";
import { LockIcon } from "./lock";
import { LogoutIcon } from "./logout";
import { MailIcon } from "./mail";
import { MapIcon } from "./map";
import { MenuIcon } from "./menu";
import { PinIcon } from "./pin";
import { ShieldIcon } from "./shield";
import { UserIcon } from "./user";
import { WalletIcon } from "./wallet";

export {
  AlertIcon,
  ArrowRightIcon,
  ArrowUpRightIcon,
  CalendarIcon,
  CarIcon,
  CheckCircleIcon,
  CheckIcon,
  ChevronDownIcon,
  CloseIcon,
  CopyIcon,
  EyeIcon,
  EyeOffIcon,
  LockIcon,
  LogoutIcon,
  MailIcon,
  MapIcon,
  MenuIcon,
  PinIcon,
  ShieldIcon,
  UserIcon,
  WalletIcon,
};

export type IconName =
  | "calendar"
  | "user"
  | "arrow-right"
  | "arrow-up-right"
  | "check"
  | "check-circle"
  | "chevron-down"
  | "menu"
  | "close"
  | "car"
  | "wallet"
  | "pin"
  | "map"
  | "copy"
  | "alert"
  | "lock"
  | "logout"
  | "mail"
  | "shield"
  | "eye"
  | "eye-off";

const iconMap: Record<
  IconName,
  ComponentType<SVGProps<SVGSVGElement>>
> = {
  calendar: CalendarIcon,
  user: UserIcon,
  "arrow-right": ArrowRightIcon,
  "arrow-up-right": ArrowUpRightIcon,
  check: CheckIcon,
  "check-circle": CheckCircleIcon,
  "chevron-down": ChevronDownIcon,
  menu: MenuIcon,
  close: CloseIcon,
  car: CarIcon,
  wallet: WalletIcon,
  pin: PinIcon,
  map: MapIcon,
  copy: CopyIcon,
  alert: AlertIcon,
  lock: LockIcon,
  logout: LogoutIcon,
  mail: MailIcon,
  shield: ShieldIcon,
  eye: EyeIcon,
  "eye-off": EyeOffIcon,
};

export function Icon({
  name,
  className,
}: {
  name: IconName;
  className?: string;
}) {
  const Component = iconMap[name];
  return <Component className={className} />;
}