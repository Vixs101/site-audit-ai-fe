"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
// import { socialIcons } from "@/lib/social-icon-data";
import { footerLinks } from "@/lib/footer-links-data";
import { GetApp } from "../landing/get-app";

const LandingFooter = () => {
  const pathname = usePathname();
  const HIDDEN_PATHS = [
    "/faq",
    "/about",
    "/cookie-policy",
    "/privacy-policy",
    "/terms-of-use",
    "/release",
    "/resources",
    "/squeeze",
  ];

  const showFooterAppSection = !(
    HIDDEN_PATHS.includes(pathname ?? "") || pathname?.includes("/resources/")
  );

  const is625HeightPage = pathname === "/" || pathname === "/how-it-works";
  const footerHeightClass = is625HeightPage ? "h-[px]" : "h-[px]";

  return (
    <footer
      className={`${pathname === "/admin" || pathname.includes("/admin/") ? "hidden" : "block"} relative`}
    >
      <div
        className={`${
          pathname === "/faq" ||
          pathname === "/admin" ||
          pathname.includes("/admin/") ||
          pathname.includes("/scan/") ||
          pathname === "/scan" ||
          pathname === "/squeeze" ||
          pathname === "/about" ||
          pathname === "/cookie-policy" ||
          pathname === "/privacy-policy" ||
          pathname === "/terms-of-use" ||
          pathname === "/release" ||
          pathname === "/resources" ||
          pathname === "/resources/1" ||
          pathname === "/resources/2" ||
          pathname === "/resources/3" ||
          pathname === "/resources/4" ||
          pathname === "/contact"
            ? "hidden"
            : ""
        }`}
      >
        <div
          id="footer-app"
          className="bg-[#E85238] rounded-[16px] max-w-[305px] h-[474px] mx-auto relative top-[28px] font-sans overflow-hidden
             md:max-w-[578px] md:h-[216px] md:rounded-[15px]
             lg:max-w-[1050px] lg:h-[380px] lg:rounded-[30px]
             mb-[-40px] z-10
             flex flex-col md:flex-row gap-5 md::items-stretch md:justify-between"
        >
          {/* left column */}
          <div className="w-full md:max-w-[313px] p-4 flex flex-col h-full gap-3 md:p-6 md:gap-0 lg:w-1/2 lg:max-w-[519px] lg:h-[266px] lg:p-10 lg:pt-16 lg:gap-6">
            <div>
              <h2 className="text-3xl leading-[38px] sm:text-[32px] md:text-2xl md:max-w-[303px] md:h-[56px] md:leading-7 lg:text-5xl lg:max-w-[519px] lg:h-[112px] lg:leading-[56px] xl:text-5xl font-bold text-white sm:leading-[56px]">
                Audit Your Website <br /> Instantly
              </h2>

              <p className="text-sm md:text-[12px] md:max-w-[313px] md:h-[60px] md:leading-4 lg:text-[17px] lg:max-w-[497px] lg:h-[62px] lg:leading-[22px] max-w-[497px] text-white md:mt-2 lg:mt-2 sm:leading-[22px]">
                Download the app and let AI analyze your site, uncover
                opportunities, and boost performance, all in seconds.
              </p>
            </div>

            <GetApp />
          </div>

          {/* right column */}
          <div className=" sm:block flex-1 relative">
            {/* Individual Circles directly positioned */}
            <div className="absolute w-[150px] h-[150px] right-[60px] top-[-120px] md:w-[104px] md:h-[104px] md:right-[100px] md:top-[50px] lg:w-[202px] lg:h-[202px] lg:right-[89px] lg:top-[91px] rounded-full border-[0.9px] border-[#FCB1A2]/30" />
            <div className="absolute w-[220px] h-[220px] right-[30px] top-[-154px] md:w-[156px] md:h-[156px] md:right-[75px] md:top-[25px] lg:w-[303px] lg:h-[303px] lg:right-[38.5px] lg:top-[40.5px] rounded-full border-[0.9px] border-[#FCB1A2]/30" />
            <div className="absolute w-[290px] h-[290px] right-[0px] top-[-184px] md:w-[208px] md:h-[208px] md:right-[50px] md:top-[0px] lg:w-[404px] lg:h-[404px] lg:right-[-12px] lg:top-[-10px] rounded-full border-[0.9px] border-[#FCB1A2]/30" />
            <div className="absolute w-[360px] h-[360px] right-[-30px] top-[-214.6px] md:w-[260px] md:h-[260px] md:right-[25px] md:top-[-25px] lg:w-[505px] lg:h-[505px] lg:right-[-62.5px] lg:top-[-60.5px] rounded-full border-[0.9px] border-[#FCB1A2]/30" />
            <div className="absolute w-[430px] h-[430px] right-[-60px] top-[-244.08px] md:w-[312px] md:h-[312px] md:right-[0px] md:top-[-50px] lg:w-[606px] lg:h-[606px] lg:right-[-113px] lg:top-[-111px] rounded-full border-[0.9px] border-[#FCB1A2]/30" />
            <Image
              src="/assets/images/landing/cta-phones.png"
              alt="Phone mockups"
              width={715.57}
              height={622.06}
              className="absolute top-[50px] right-[100px] z-10 scale-125  md:right-[60px] md:scale-145 lg:scale-105 lg:right-[25px] hidden md:block"
            />
          </div>
          <div className="md:hidden w-full h-1/2">
            <Image
              src="/assets/images/landing/cta-phones.png"
              alt="Phone mockups"
              width={412}
              height={358}
              className="absolute top-[250px] right-[50px] z-10 scale-130 "
            />
          </div>
        </div>
      </div>

      <section
        className={`bg-[#0A0A0B] ${footerHeightClass} ${
          pathname === "/faq" ||
          pathname === "/admin" ||
          pathname.includes("/admin/") ||
          pathname.includes("/scan/") ||
          pathname === "/scan" ||
          pathname === "/about" ||
          pathname === "/squeeze" ||
          pathname === "/cookie-policy" ||
          pathname === "/privacy-policy" ||
          pathname === "/terms-of-use" ||
          pathname === "/release" ||
          pathname === "/resources" ||
          pathname === "/resources/1" ||
          pathname === "/resources/2" ||
          pathname === "/resources/3" ||
          pathname === "/resources/4" ||
          pathname === "/contact"
            ? "pt-16"
            : "pt-40"
        }`}
      >
        <div className="flex items-start justify-between max-w-[1440px] mx-auto font-sans py-8 px-11 md:px-5 md:whitespace-nowrap flex-col sm:flex-row md:justify-between md:mb-20 gap-8">
          <div>
            <Link href="/" className="hidden xl:flex items-center gap-2">
              <Image
                src="/assets/images/footer-logo.svg"
                alt="Site Audit AI Logo"
                width={346}
                height={108}
                className=""
              />
            </Link>
            <Link
              href="/"
              className="hidden md:flex xl:hidden items-center gap-2"
            >
              <Image
                src="/assets/images/footer-logo.svg"
                alt="Site Audit AI Logo"
                width={207}
                height={108}
                className=""
              />
            </Link>
            <Link href="/" className="md:hidden flex items-center gap-2">
              <Image
                src="/assets/images/footer-logo.svg"
                alt="Site Audit AI Logo"
                width={207}
                height={108}
                className=""
              />
            </Link>
          </div>
          <div className="flex flex-col sm:flex-row gap-8 sm:gap-20 ">
            {footerLinks.map((column) => (
              <div key={column.title}>
                <h3 className="text-lg md:text-[16px] xl:text-[32px] text-[#FEFFFF] font-bold sm:mb-[16.45px]">
                  {column.title}
                </h3>
                <ul className="space-y-2">
                  {column.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm md:text-md lg:text-[20px] text-[#B9B9B9] font-medium hover:text-white"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className=" max-w-[1440px] mx-auto px-11 md:px-12 ">
          <div
            id="footer-nav"
            className=" font-sans  flex flex-col items-center justify-center gap-6 min:h-32 md:flex-row md:justify-between border-b border-b-[#f5e9e9]/45 md:my-6 py-8 "
          >
            <p className="text-[#f5e9e9] text-sm md:text-[16px]">
              Sitelytics &copy;{new Date().getFullYear()}. All rights reserved
            </p>
          </div>
        </div>

        <div className="h-4 "></div>
      </section>
    </footer>
  );
};

export default LandingFooter;
