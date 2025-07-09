import Link from "next/link";
import Image from "next/image";
import mail from "@/assets/footer/email.svg";
import facebook from "@/assets/footer/facebook.svg";
import whatsapp from "@/assets/footer/whatsapp.svg";
import linkedIn from "@/assets/footer/linkedin.svg";
import visa from "@/assets/footer/visa.svg";
import twint from "@/assets/footer/twint.svg";
import mastercard from "@/assets/footer/mastercard.svg";
import { WhiteLogo } from "../logo/logo";

export default function Footer() {
  const footerLinks = {
    "Su di noi": [
      { href: "/benefici", label: "Benefici" },
      { href: "/#recensioni", label: "Recensioni" },
      { href: "/terms-condition", label: "Termini e policy" },
    ],
    Servizi: [
      { href: "/veicoli ", label: "Veicoli" },
      { href: "/#best-offer", label: "Offerte speciali" },
      { href: "/marchi", label: "Marchi" },
    ],
    Aiuto: [
      { href: "/partnership", label: "Partnership" },
      { href: "/contatti", label: "Contatti" },
      { href: "/#faq ", label: "FAQ" },
    ],
  };

  const socialLinks = [
    { href: "mailto:info@bittengo.com", src: mail, alt: "Mail" },
    {
      href: "https://www.facebook.com/people/Bittengo/61557722955719/",
      src: facebook,
      alt: "Facebook",
    },
    {
      href: "https://wa.me/message/RUPR44645UADN1",
      src: whatsapp,
      alt: "WhatsApp",
    },
    {
      href: "https://www.linkedin.com/company/bittengo/?viewAsMember=true",
      src: linkedIn,
      alt: "LinkedIn",
    },
  ];

  const paymentMethods = [
    { src: visa, alt: "Visa", width: 60, height: 40 },
    { src: twint, alt: "Twint", width: 96, height: 32 },
    { src: mastercard, alt: "Mastercard", width: 60, height: 40 },
  ];

  return (
    <div className="relative xl:mt-40">
      <footer className="hidden md:block bg-footer_bg text-white mt-20">
        <div className="container mx-auto flex flex-col lg:flex-row items-center lg:items-start justify-between px-4 sm:px-6 lg:pl-16 lg:pr-6 py-10 md:py-20 ">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-10 w-full items-start">
            {/* Logo and Social Links */}
            <div className="col-span-1 lg:col-span-1 flex flex-col items-start gap-8">
              <div>
                <WhiteLogo />
                <p className="mt-4 font-light text-sm">
                  Rentalhub in Switzerland
                </p>
              </div>
              <div className="flex gap-4">
                {socialLinks.map(({ href, src, alt }) => (
                  <Link
                    key={alt}
                    href={href}
                    className="w-8 h-8 transition-transform hover:scale-110"
                  >
                    <Image
                      src={src || "/placeholder.svg"}
                      alt={alt}
                      width={32}
                      height={32}
                    />
                    <span className="sr-only">{alt}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Navigation Links */}
            <div className="col-span-1 lg:col-span-2 flex justify-between items-start w-full lg:ml-20 xl:ml-32">
              {Object.entries(footerLinks).map(([title, links]) => (
                <div key={title} className="space-y-4">
                  <h3 className="font-medium text-lg">{title}</h3>
                  <ul className="space-y-2">
                    {links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="text-sm hover:underline"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Methods and Copyright */}
          <div className="mt-12 lg:mt-0 flex flex-col justify-between gap-6 w-60">
            <div className="flex items-center gap-4 flex-wrap">
              {paymentMethods.map(({ src, alt }) => (
                <Image
                  key={alt}
                  src={src || "/placeholder.svg"}
                  alt={alt}
                  width={300}
                  height={300}
                  className="w-10 h-10"
                />
              ))}
            </div>
            <div className="text-sm text-text_white font-light text-center md:text-left">
              <p>Bittengo SAGL</p>
              <p>{new Date().getFullYear()} Copyright reserved</p>
              <p>CH-501.4.029.465-1</p>
            </div>
          </div>
        </div>
      </footer>
      <footer className="md:hidden bg-footer_bg text-white mt-20">
        <div className="text-[15px] text-text_white font-light text-center md:text-left mt-10 py-6">
          <p>© {new Date().getFullYear()} Copyright reserved | Bittengo SAGL</p>
        </div>
      </footer>
    </div>
  );
}
