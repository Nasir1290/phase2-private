"use client";

import stars from "@/assets/Paccheto 3 in 1.svg";
import { Button } from "@/components/ui/button";

import cima from "@/assets/Annunci in cima (1).svg";
import home from "@/assets/Annunci in homepage (1).svg";
import annunci from "@/assets/Annunci in risalto (1).svg";
import info from "@/assets/Punto info.svg";
import { useState } from "react";
import MyCheckbox from "../ui/MyCheckbox";
import InCimaModal from "./in-cima-modal";
import InHomepageModal from "./in-homepage-modal";
import InRisaltoModal from "./in-risalto";
import PacchettoModal from "./pacchetto-modal";
import free from "@/assets/free.svg";

const PromotionalCards = () => {
  const [isModalInCimaOpen, setIsModalInCimaOpen] = useState(false);
  const [isModalInHomepageOpen, setIsModalInHomepageOpen] = useState(false);
  const [isModalInRisaltoOpen, setIsModalInRisaltoOpen] = useState(false);
  const [isModalPacchettoOpen, setIsModalPacchettoOpen] = useState(false);
  const [cimaSelectedOneVote, setCimaSelectedOneVote] = useState<boolean>(false);
  const [cimaSelectedThreeVote, setCimaSelectedThreeVote] = useState<boolean>(false);
  const [cimaSelectedSevenVote, setCimaSelectedSevenVote] = useState<boolean>(false);
  const [cimaSelectedGratuiti, setCimaSelectedGratuiti] = useState<boolean>(false);

  const [homepageSelectedOneVote, setHomepageSelectedOneVote] = useState<boolean>(false);
  const [homepageSelectedThreeVote, setHomepageSelectedThreeVote] = useState<boolean>(false);
  const [homepageSelectedSevenVote, setHomepageSelectedSevenVote] = useState<boolean>(false);
  const [homepageSelectedGratuiti, setHomepageSelectedGratuiti] = useState<boolean>(false);

  // risalto
  const [risaltoSelectedOneVote, setRisaltoSelectedOneVote] = useState<boolean>(false);
  const [risaltoSelectedThreeVote, setRisaltoSelectedThreeVote] = useState<boolean>(false);
  const [risaltoSelectedSevenVote, setRisaltoSelectedSevenVote] = useState<boolean>(false);
  const [risaltoSelectedGratuiti, setRisaltoSelectedGratuiti] = useState<boolean>(false);

  console.log(cimaSelectedOneVote, cimaSelectedThreeVote, cimaSelectedSevenVote, cimaSelectedGratuiti);
  console.log(homepageSelectedOneVote, homepageSelectedThreeVote, homepageSelectedSevenVote, homepageSelectedGratuiti);
  console.log(risaltoSelectedOneVote, risaltoSelectedThreeVote, risaltoSelectedSevenVote, risaltoSelectedGratuiti);
  const openInHomepageModal = () => setIsModalInHomepageOpen(true);
  const openInCimaModal = () => setIsModalInCimaOpen(true);
  const openInRisaltoModal = () => setIsModalInRisaltoOpen(true);
  const openPacchettoModal = () => setIsModalPacchettoOpen(true);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ">
      {/* In cima */}
      <InCimaModal isOpen={isModalInCimaOpen} onClose={() => setIsModalInCimaOpen(false)} />
      <div className="bg-white border border-black/5 shadow-xl shadow-black/10 rounded-xl p-6 xl:px-10 relative">
        <div className="flex items-center justify-center mb-4">
          <div className="flex flex-col items-center gap-2">
            <h3 className="font-semibold">In cima</h3>
            <div className="w-10 h-10 rounded-full flex items-center justify- my-1">
              <img src={cima.src} alt="Up Icon" className="w-10 h-10 text-gray-600" />
            </div>
          </div>
        </div>
        <div className="absolute top-4 right-4">
          <img src={info.src} alt="Info Icon" className="w-4 h-4 text-gray-400 cursor-pointer" onClick={openInCimaModal} />
        </div>
        <p className="text-xs text-[#AAAAAA] mb-6 text-center ">
          Porta il tuo annuncio in cima <br /> alla lista per aumentare la <br /> visibilità
        </p>

        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-between">
            <MyCheckbox label={"1 vota"} defaultChecked={false} onChange={(checked) => setCimaSelectedOneVote(checked)} />
            {/* <div className="flex items-center gap-2">
              <Checkbox id="1vote" />
              <label htmlFor="1vote" className="text-sm">
                1 vota
              </label>
            </div> */}
            <span className="text-sm font-medium">7.-</span>
          </div>

          <div className="flex items-center justify-between">
            {/* <div className="flex items-center gap-2">
              <Checkbox id="3vote" />
              <label htmlFor="3vote" className="text-sm">
                3 vote
              </label>
            </div> */}
            <MyCheckbox label={"3 vote"} defaultChecked={false} onChange={(checked) => setCimaSelectedThreeVote(checked)} />
            <span className="text-sm font-medium">18.-</span>
          </div>

          <div className="flex items-center justify-between">
            {/* <div className="flex items-center gap-2">
              <Checkbox id="7vote" />
              <label htmlFor="7vote" className="text-sm">
                7 vote
              </label>
            </div> */}
            <MyCheckbox label={"7 vote"} defaultChecked={false} onChange={(checked) => setCimaSelectedSevenVote(checked)} />
            <span className="text-sm font-medium">34.-</span>
          </div>

          <div className="flex items-center gap-2 pt-4 ">
            {/* <Checkbox id="gratuiti0" />
            <label htmlFor="gratuiti0" className="text-sm text-green-600">
              Gratuiti (0 disponibili)
            </label> */}
            <MyCheckbox
              image={free.src}
              label={"Gratuiti (0 disponibili)"}
              defaultChecked={false}
              onChange={(checked) => setCimaSelectedGratuiti(checked)}
            />
          </div>
        </div>

        <Button variant="outline" className="w-full bg-transparent rounded">
          Acquista
        </Button>
      </div>

      {/* In homepage */}
      <InHomepageModal isOpen={isModalInHomepageOpen} onClose={() => setIsModalInHomepageOpen(false)} />
      <div className="bg-white border border-black/5 shadow-xl shadow-black/10 rounded-xl p-6 xl:px-10 relative">
        <div className="flex items-center justify-center mb-4">
          <div className="flex flex-col items-center gap-2">
            <h3 className="font-semibold">In homepage</h3>
            <div className="w-10 h-10 rounded-full flex items-center justify-center my-1">
              {/* <Home className="w-5 h-5 text-gray-600" /> */}
              <img src={home.src} alt="Home Icon" className="w-10 h-10 text-gray-600" />
            </div>
          </div>
        </div>
        <div onClick={openInHomepageModal} className="absolute top-4 right-4">
          {/* <Info className="w-4 h-4 text-gray-400 cursor-pointer"  /> */}
          <img src={info.src} alt="Info Icon" className="w-4 h-4 text-gray-400 cursor-pointer" />
        </div>
        <p className="text-xs text-[#AAAAAA] mb-6 text-center ">Promuovi il tuo annuncio sulla homepage ed attira immediatamente l&apos;attenzione</p>

        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-between">
            {/* <div className="flex items-center gap-2">
              <Checkbox id="1giorno" />
              <label htmlFor="1giorno" className="text-sm">
                1 giorno
              </label>
            </div> */}
            <MyCheckbox label={"1 giorno"} defaultChecked={false} onChange={(checked) => setHomepageSelectedOneVote(checked)} />
            <span className="text-sm font-medium">24.-</span>
          </div>

          <div className="flex items-center justify-between">
            {/* <div className="flex items-center gap-2">
              <Checkbox id="3giorni" />
              <label htmlFor="3giorni" className="text-sm">
                3 giorni
              </label>
            </div> */}
            <MyCheckbox label={"3 giorni"} defaultChecked={false} onChange={(checked) => setHomepageSelectedThreeVote(checked)} />
            <span className="text-sm font-medium">59.-</span>
          </div>

          <div className="flex items-center justify-between">
            {/* <div className="flex items-center gap-2">
              <Checkbox id="7giorni" />
              <label htmlFor="7giorni" className="text-sm">
                7 giorni
              </label>
            </div> */}
            <MyCheckbox label={"7 giorni"} defaultChecked={false} onChange={(checked) => setHomepageSelectedSevenVote(checked)} />
            <span className="text-sm font-medium">134.-</span>
          </div>

          <div className="flex items-center gap-2 pt-4">
            {/* <Checkbox id="gratuiti2" />
            <label htmlFor="gratuiti2" className="text-sm text-green-600">
              Gratuiti (2 giorni)
            </label> */}
            <MyCheckbox
              image={free.src}
              label={"Gratuiti (0 giorni)"}
              defaultChecked={false}
              onChange={(checked) => setHomepageSelectedGratuiti(checked)}
            />
          </div>
        </div>

        <Button variant="outline" className="w-full bg-transparent rounded">
          Acquista
        </Button>
      </div>

      {/* In risalto */}
      <InRisaltoModal isOpen={isModalInRisaltoOpen} onClose={() => setIsModalInRisaltoOpen(false)} />
      <div className="bg-white border border-black/5 shadow-xl shadow-black/10 rounded-xl p-6 xl:px-10 relative">
        <div className="flex items-center justify-center mb-4">
          <div className="flex flex-col items-center gap-2">
            <h3 className="font-semibold">In risalto</h3>
            <div className="w-10 h-10  rounded-full flex items-center justify-center my-1">
              {/* <Diamond className="w-5 h-5 text-gray-600" /> */}
              <img src={annunci.src} alt="Diamond Icon" className="w-10 h-10 text-gray-600" />
            </div>
          </div>
        </div>
        <div className="absolute top-4 right-4">
          {/* <Info className="w-4 h-4 text-gray-400 cursor-pointer" onClick={openInRisaltoModal} /> */}
          <img src={info.src} alt="Info Icon" className="w-4 h-4 text-gray-400 cursor-pointer" onClick={openInRisaltoModal} />
        </div>
        <p className="text-xs text-[#AAAAAA] mb-6 text-center ">
          Evidenzia il tuo annuncio con <br />
          un bordo rosso per una maggiore visibilità
        </p>

        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-between">
            {/* <div className="flex items-center gap-2">
              <Checkbox id="1giorno2" />
              <label htmlFor="1giorno2" className="text-sm">
                1 giorno
              </label>
            </div> */}
            <MyCheckbox label={"1 giorno"} defaultChecked={false} onChange={(checked) => setRisaltoSelectedOneVote(checked)} />
            <span className="text-sm font-medium">16.-</span>
          </div>

          <div className="flex items-center justify-between">
            {/* <div className="flex items-center gap-2">
              <Checkbox id="3giorni2" />
              <label htmlFor="3giorni2" className="text-sm">
                3 giorni
              </label>
            </div> */}
            <MyCheckbox label={"3 giorni"} defaultChecked={false} onChange={(checked) => setRisaltoSelectedThreeVote(checked)} />
            <span className="text-sm font-medium">39.-</span>
          </div>

          <div className="flex items-center justify-between">
            {/* <div className="flex items-center gap-2">
              <Checkbox id="7giorni2" />
              <label htmlFor="7giorni2" className="text-sm">
                7 giorni
              </label>
            </div> */}
            <MyCheckbox label={"7 giorni"} defaultChecked={false} onChange={(checked) => setRisaltoSelectedSevenVote(checked)} />
            <span className="text-sm font-medium">89.-</span>
          </div>

          <div className="flex items-center gap-2 pt-4">
            {/* <Checkbox id="gratuiti1" />
            <label htmlFor="gratuiti1" className="text-sm text-green-600">
              Gratuiti (1 giorno)
            </label> */}
            <MyCheckbox
              image={free.src}
              label={"Gratuiti (0 giorno)"}
              defaultChecked={false}
              onChange={(checked) => setRisaltoSelectedGratuiti(checked)}
            />
          </div>
        </div>

        <Button variant="outline" className="w-full bg-transparent rounded">
          Acquista
        </Button>
      </div>
      {/* Pacchetto 3 in 1 */}
      <PacchettoModal isOpen={isModalPacchettoOpen} onClose={() => setIsModalPacchettoOpen(false)} />
      <div className="bg-white border border-primary shadow-xl shadow-black/10 rounded-xl p-6 xl:px-10 relative">
        <div className="flex items-center justify-center">
          <div className="flex flex-col items-center gap-3 mb-3">
            <h3 className="font-semibold">Pacchetto 3 in 1</h3>
            <div className="w-24 h-14 flex items-center justify-center">
              {/* <Diamond className="w-5 h-5 text-gray-600" /> */}
              <img src={stars.src} alt="Diamond Icon" className="w-24 h-14" />
            </div>
          </div>
        </div>
        <div className="absolute top-4 right-4">
          {/* <Info className="w-4 h-4 text-gray-400 cursor-pointer" onClick={openInRisaltoModal} /> */}
          <img src={info.src} alt="Info Icon" className="w-4 h-4 text-gray-400 cursor-pointer" onClick={openPacchettoModal} />
        </div>

        <p className="text-center mt-4 mb-8 text-sm">
          Attrai clienti
          <br /> istantaneamente
        </p>
        <p className="text-xs text-[#AAAAAA] mb-9 text-center ">
          Visibilità multipla garantita <br />
          8 volte in cima, 2 volte in <br /> homepage e 4 volte in risalto
        </p>

        <p className=" mb-6 text-base text-center">
          Offerta 3 in 1 a soli <span className="font-bold">99.-</span>
        </p>

        <Button className="w-full bg-primary hover:bg-primary text-white rounded">Acquista ora</Button>
      </div>

      
    </div>
  );
};

export default PromotionalCards;
