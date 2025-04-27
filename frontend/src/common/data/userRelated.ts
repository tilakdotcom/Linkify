import { BsClockHistory } from "react-icons/bs";
import { IconType } from "react-icons/lib";
import { RiBarChart2Fill } from "react-icons/ri";
import { TbHandFinger } from "react-icons/tb";
import { IoSettingsOutline } from "react-icons/io5";
import { TbBrandLinktree } from "react-icons/tb";

export type userPageNavProps = {
  title: string;
  icon: IconType;
};

export const userPageNav: userPageNavProps[] = [
  {
    title: "shortner",
    icon: TbBrandLinktree,
  },
  {
    title: "history",
    icon: BsClockHistory,
  },
  {
    title: "statistics",
    icon: RiBarChart2Fill,
  },
  {
    title: "clicks",
    icon: TbHandFinger,
  },
  {
    title: "settings",
    icon: IoSettingsOutline,
  },
];
