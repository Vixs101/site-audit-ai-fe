import { CallToActionButtonHeader } from "./call-to-action-button-header";
import NavLink from "./nav-link";
import { usePathname } from "next/navigation";
import { sidebarLinks } from "@/app/admin/layout";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

export const MobileNav = ({
  isOpen,
  links_data,
  onclick,
  landing,
  actionText,
  actionHref,
  pathname,
}: {
  isOpen: boolean;
  links_data: Array<Record<string, string>>;
  onclick: () => void;
  landing: boolean;
  actionText: string;
  actionHref: string;
  pathname: string;
}) => {
  const routePathname = usePathname();
  return (
    <div
      className={`
    fixed inset-0
    bg-white 
    flex flex-col items-center justify-start
    pt-24 pb-10 gap-8
    transition-all duration-300
    z-50
    ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"}
  `}
    >
      <div
        className="flex-1 flex flex-col items-center gap-8 mt-15
"
      >
        {routePathname &&
          (routePathname.startsWith("/admin/") || routePathname === "/admin") &&
          sidebarLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/admin" && pathname?.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={onclick}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all group",
                  isActive
                    ? "bg-[#FF5A3D] text-white shadow-lg shadow-[#FF5A3D]/20"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <link.icon className="w-5 h-5" />
                {link.label}
                {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
              </Link>
            );
          })}
        {routePathname &&
          routePathname !== "/admin" &&
          !routePathname.startsWith("/admin/") &&
          links_data.map(({ href, label }) => (
            <NavLink
              key={label}
              href={href}
              label={label}
              onClick={onclick}
              mobile={true}
              pathname={pathname}
            />
          ))}
      </div>

      <CallToActionButtonHeader
        landing={landing}
        actionText={actionText}
        actionHref={actionHref}
        onclick={onclick}
      />
    </div>
  );
};
