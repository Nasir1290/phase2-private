import Image, { StaticImageData } from "next/image";
import React from "react";
import phone from "@/assets/contact/phone.svg";
import whatsapp from "@/assets/contact/whatsapp.svg";
import mail from "@/assets/contact/mail.svg";
import instagram from "@/assets/contact/instagram.svg";
import facebook from "@/assets/contact/facebook.svg";
import linkedin from "@/assets/contact/linkedin.svg";
import { Separator } from "@/components/ui/separator";

type ContactMethod = {
  src: string | StaticImageData;
  label: string;
  href: string;
};

const ContactDetails: React.FC = () => {
  const contactMethods: ContactMethod[] = [
    {
      src: phone,
      label: "+41 78 248 05 01",
      href: "tel:+41782480501",
    },
    {
      src: whatsapp,
      label: "Whatsapp",
      href: "https://wa.me/+41782480501",
    },
    {
      src: mail,
      label: "info@bittengo.com",
      href: "mailto:info@bittengo.com",
    },
  ];

  const socialLinks: ContactMethod[] = [
    {
      src: instagram,
      label: "Instagram",
      href: "https://www.instagram.com/bittengo_official/?igsh=MW5tMnExb2FsOGxuaw%3D%3D&utm_source=qr#",
    },
    {
      src: facebook,
      label: "Facebook",
      href: "https://www.facebook.com/people/Bittengo/61557722955719/?mibextid=LQQJ4d",
    },
    {
      src: linkedin,
      label: "LinkedIn",
      href: "https://www.linkedin.com/company/bittengo/?originalSubdomain=it",
    },
  ];

  return (
    <div className="w-full flex justify-center ">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 md:gap-0 w-full ">
        <div className="flex flex-col items-center min-w-40">
          <header className="text-left mb-10 flex flex-col gap-1">
            <span className="text-xs font-semibold text-text_light_gray ">
              Supporto e richieste
            </span>
            <h1 className="font-bold tracking-tight text-xl md:text-2xl">
              Canali di contatto
            </h1>
          </header>

          <div className="space-y-4">
            {contactMethods.map((method, index) => (
              <div key={index} className="flex items-center gap-3">
                <Image
                  src={method.src}
                  alt={method.label}
                  width={100}
                  height={100}
                  className="h-6 w-6"
                />
                <a href={method.href} className="text-sm md:text-base  ">
                  {method.label}
                </a>
              </div>
            ))}
          </div>
        </div>

        <Separator orientation="vertical" className="hidden md:block h-44" />
        <Separator className="md:hidden" />

        {/* Display Social Media Links */}
        <div className="space-y-4 flex flex-col min-w-40">
          <header className="text-left mb-10 flex flex-col gap-1">
            <span className="text-xs font-semibold text-text_light_gray">
              Media
            </span>
            <h1 className="font-bold tracking-tight text-xl md:text-2xl">
              Social
            </h1>
          </header>

          {socialLinks.map((link, index) => (
            <div key={index} className="flex items-center gap-3">
              <Image
                src={link.src}
                alt={link.label}
                width={100}
                height={100}
                className="w-5 h-5 sm:h-6 sm:w-6"
              />
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm md:text-base"
              >
                {link.label}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactDetails;
