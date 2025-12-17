import commision from "@/assets/partnership/zero-commissioni.svg";
import collaborate from "@/assets/partnership/collaborazione.svg";
import privacy from "@/assets/partnership/privacy.svg";
import Image from "next/image";
import Link from "next/link";
import { MdArrowForwardIos } from "react-icons/md";

const PartnershipTerms = () => {
  return (
    <div id="partnership-termini-e-condizioni" className="container mx-auto">
      {" "}
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <header className="w-full md:max-w-2xl text-start md:mb-16">
          <div className="flex flex-col gap-4">
            <span className="text-sm font-medium text-text_light_gray uppercase">REGOLAMENTO</span>

            <h1 className="text-2xl md:text-[30px] font-extrabold">
              Politiche <br />
              <span className="text-primary">termini e condizioni</span>
            </h1>
          </div>
        </header>

        <Link
          href="/terms-condition"
          className="text-sm font-semibold text-primary uppercase hidden md:flex items-center gap-1 hover:bg-primary/5 px-3 py-2 rounded-lg h-8 mt-[60px]"
        >
          VEDI TERMINI E CONDIZIONI
          <MdArrowForwardIos />
        </Link>
      </div>
      <div className="mx-auto mt-20 md:mt-0">
        <div className="flex justify-between overflow-x-auto scrollbar-hide gap-6 xl:gap-40 ">
          {/* ZERO COMMISSIONI  */}
          <div className="min-w-[300px] w-full pr-10 flex flex-col items-start text-start">
            <div className="w-16 h-16">
              <Image src={commision} alt="commision" width={50} height={50} className="w-20 h-20" />
            </div>
            <p className="text-lg font-semibold mt-8 mb-3">ZERO COMMISSIONI</p>
            <p className="min-w-48 text-text_light_gray font-medium text-sm ">
              Non addebitiamo alcuna commissione <br /> aggiuntiva per il servizio
            </p>
          </div>
          {/* COLLABORAZIONE  */}
          <div className="min-w-[300px] w-full pr-10 flex flex-col items-start text-start">
            <div className="w-[70px] h-[70px]">
              <Image src={collaborate} alt="collaborate" width={50} height={50} className="w-20 h-20" />
            </div>
            <p className="text-lg font-semibold mt-7 mb-3">COLLABORAZIONE</p>
            <p className="min-w-48 text-text_light_gray font-medium text-sm ">
              Stipuliamo un accordo di partnership con <br /> ogni azienda di noleggio veicoli inserita <br /> sulla nostra piattaforma
            </p>
          </div>
          {/* PRIVACY  */}
          <div className="min-w-[400px] w-full pr-0 md:pr-10 flex flex-col items-start text-start">
            <div className="w-16 h-16">
              <Image src={privacy} alt="privacy" width={50} height={50} className="w-[48px] h-[48px] mt-4" />
            </div>
            <p className="text-lg font-semibold mt-8 mb-3">PRIVACY</p>
            <p className="min-w-48 text-text_light_gray font-medium text-sm ">
              Proteggiamo i tuoi dati personali nel <br /> rispetto delle normative vigenti, assicurando <br /> sicurezza e riservatezza
            </p>
          </div>
        </div>
      </div>
      <Link
        href="/terms-condition"
        className="md:hidden text-sm font-semibold text-primary uppercase flex items-center justify-between shadow border-opacity-55 gap-1 hover:bg-primary/5 px-16 py-6 rounded-lg h-8 mt-[60px] "
      >
        VEDI TERMINI E CONDIZIONI
        <MdArrowForwardIos />
      </Link>
    </div>
  );
};

export default PartnershipTerms;
