import { BsClockHistory } from "react-icons/bs";
import { IconType } from "react-icons/lib";
import { RiBarChart2Fill } from "react-icons/ri";
import { TbHandFinger } from "react-icons/tb";
import { IoSettingsOutline } from "react-icons/io5";

export type userPageNavProps = {
  name: string;
  icon: IconType;
};

export const userPageNav: userPageNavProps[] = [
  {
    name: "history",
    icon: BsClockHistory,
  },
  {
    name: "statistics",
    icon: RiBarChart2Fill,
  },
  {
    name: "clicks",
    icon: TbHandFinger,
  },
  {
    name: "settings",
    icon: IoSettingsOutline,
  },
];
