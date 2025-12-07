import NavLink from "./nav-link";
import { usePathname } from "next/navigation";

const DesktopNav = ({
  links_data,
  pathname,
}: {
  links_data: Array<Record<string, string>>;
  pathname: string;
}) => {
  const routePathname = usePathname();

  return (
    <>
      {routePathname &&
        routePathname !== "/admin" &&
        !routePathname.startsWith("/admin/") && (
          <nav className="hidden md:absolute md:left-1/2 md:transform md:-translate-x-1/2 sm:ml-auto sm:flex sm:justify-center sm:gap-8 text-base">
            {links_data.map(({ href, label }) => (
              <NavLink
                key={label}
                href={href}
                label={label}
                mobile={false}
                pathname={pathname}
              />
            ))}
          </nav>
        )}
    </>
  );
};

export default DesktopNav;
