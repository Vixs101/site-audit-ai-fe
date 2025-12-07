"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { navLinksLanding, navLinksWaitlist } from "../../lib/nav-link-data";
import DesktopNav from "./desktop-nav";
import { MobileNav } from "./mobile-nav";
import { CallToActionButtonHeader } from "./call-to-action-button-header";
import { usePathname } from "next/navigation";

const WaitlistHeader = () => {
  const pathname = usePathname();
  const landing = pathname !== "/waitlist";
  const [isOpen, setIsOpen] = useState(false);

  const actionText = "Get the App";
  const actionHref =
    "https://play.google.com/store/apps/details?id=net.emerj.sitelytics";

  const links = (() => {
    return landing ? navLinksLanding : navLinksWaitlist;
  })();

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => document.body.classList.remove("overflow-hidden");
  }, [isOpen]);

  return (
    <header
      className={`${pathname.includes("/admin/") || pathname === "/admin" ? "" : "max-w-[1440px]"}
     mx-auto font-sans font-medium 
    bg-white sticky top-0 z-50
    flex items-center justify-between
    px-4 sm:px-8 md:px-12 h-16 sm:h-20
    border-b border-[#EDEDED]
  `}
    >
      <Link href="/" onClick={() => setIsOpen(false)} className="z-100">
        <Image
          src="/assets/images/Logo.svg"
          alt="Site Audit AI Logo"
          width={115}
          height={115}
        />
      </Link>

      {links && links.length && (
        <DesktopNav links_data={links} pathname={pathname} />
      )}

      <button
        className="sm:hidden p-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5A3D] z-55"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={25} /> : <Menu size={25} />}
      </button>

      {links && links.length && (
        <MobileNav
          links_data={links}
          onclick={() => setIsOpen(false)}
          isOpen={isOpen}
          landing={landing}
          actionText={actionText}
          actionHref={actionHref}
          pathname={pathname}
        />
      )}

      <span
        className={`hidden sm:${landing ? "flex" : "hidden"} sm:ml-auto sm:justify-self-end`}
      >
        <CallToActionButtonHeader
          landing={landing}
          actionText={actionText}
          actionHref={actionHref}
        />
      </span>
    </header>
  );
};

export default WaitlistHeader;
