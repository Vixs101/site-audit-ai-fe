import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAdminAuth } from "@/contexts/admin-auth-context";
import { LogOut } from "lucide-react";

export const CallToActionButtonHeader = ({
  landing,
  actionText,
  actionHref,
  onclick,
}: {
  landing: boolean;
  actionText: string;
  actionHref: string;
  onclick?: () => void;
}) => {
  const pathname = usePathname();
  const { user, logout } = useAdminAuth();

  return (
    <div className=" flex flex-col sm:flex-row sm:space-x-4 items-center">
      {landing && (
        <Link
          href={actionHref}
          target="_blank"
          className={` bg-[#FF5A3D] py-3 px-7 text-white rounded-xl mt-3 sm:mt-0 w-[90%] text-center sm:w-[unset] ${pathname === "/admin" || pathname.includes("/admin/") ? "hidden" : "block"} `}
          onClick={onclick}
        >
          {actionText}
        </Link>
      )}
      {/* User section */}
      <div
        className={`${pathname === "/admin" || pathname.includes("/admin/") ? "block" : "hidden"} ${!user ? "hidden" : "block"} p-4 border-t border-border`}
      >
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-muted/50 cursor-pointer  group">
          <div className="w-9 h-9 group-hover:text-red-500 rounded-full bg-linear-to-br from-[#FF5A3D] to-[#FF5A3D]/70 flex items-center justify-center text-white font-medium text-sm shrink-0">
            {user?.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{user?.name}</p>
            <p className="text-xs text-muted-foreground truncate">
              {user?.email}
            </p>
          </div>
          <button
            onClick={logout}
            className="cursor-pointer p-2 rounded-lg hover:bg-background transition-colors text-muted-foreground hover:text-red-500"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
