import { userPageNav } from "@/common/data/userRelated";
import { cn } from "@/common/lib/utils";

type UserHeaderProps = {
  className?: string;
};

export default function UserHeader({ className }: UserHeaderProps) {
  return (
    <div className={cn(" flex  justify-center bg-gray-800 py-2", className)}>
      <div className="w-full flex gap-x-1.5 items-center justify-between max-w-2xl">
        {userPageNav.map((icons, i) => {
          const Icon = icons.icon;
          return (
            <button
              key={i}
              className="flex gap-x-1.5 justify-center items-center focus:outline-none cursor-pointer border border-b-2 border-x-0 border-t-0 border-transparent hover:border-blue-500 pb-1 transition-colors  "
            >
              <Icon className="size-4 font-medium" />{" "}
              <span className="capitalize font-mediummd">{icons.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
