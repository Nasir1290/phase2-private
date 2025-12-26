import Image from "next/image";
import lugano from "@/assets/home/popularDestiniation/lugano.svg";
import bellinzona from "@/assets/home/popularDestiniation/bellinzona.svg";
import locarno from "@/assets/home/popularDestiniation/locarno.svg";
import ascona from "@/assets/home/popularDestiniation/ascona.svg";
import Link from "next/link";
const PopularDestination = () => {
  const places = [
    {
      id: 1,
      name: "Lugano",
      description: "Noleggia un veicolo e scopri le meraviglie di Lugano",
      image: lugano,
      link: "/veicoli?latitude=46.005764&longitude=8.953648",
    },
    {
      id: 2,
      name: "Bellinzona",
      description: "Raggiungi facilmente i famosi castelli medievali ed i suoi tesori storici",
      image: bellinzona,
      link: "/veicoli?latitude=46.189984&longitude=9.022511",
    },
    {
      id: 3,
      name: "Locarno",
      description: "Dal Lago Maggiore ai panorami mozzafiato, grazie alla comodità del noleggio flessibile",
      image: locarno,
      link: "/veicoli?latitude=46.16957&longitude=8.795927",
    },
    {
      id: 4,
      name: "Ascona",
      description: "Vivi al massimo Ascona, tra arte, cultura e relax sul lago",
      image: ascona,
      link: "/veicoli?latitude=46.154903&longitude=8.76755",
    },
  ];

  return (
    <div id="popular-destinations" className="space-y-16">
      <div className="container mx-auto">
        <header className="max-w-2xl text-start">
          <div className="flex flex-col gap-4">
            <span className="text-sm font-medium text-text_light_gray uppercase">NAVIGA</span>
            <h1 className=" text-2xl md:text-[32px] font-extrabold">
              Sceltri tra le
              <span className="text-primary">
                {" "}
                destinazioni <br />{" "}
              </span>
              più <span className="text-primary"> popolari</span>
            </h1>
          </div>
        </header>
      </div>

      <div className="bg-[#F1F1F1]">
        <section className="container mx-auto py-12">
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-6 p-4">
              {places.map((place) => (
                <Link key={place.id} href={place.link}>
                  <div
                    className="bg-white rounded-2xl shadow hover:shadow-primary/20 hover:shadow-md px-8 py-8 text-center 
                  h-[300px] border min-w-[250px]   xl:w-[258px] 2xl:w-[275px]"
                  >
                    <Image
                      src={place.image}
                      alt={place.name}
                      width={100}
                      height={100}
                      className="mx-auto rounded-full mb-7 w-[90px] h-[90px] 2xl:w-[100px] 2xl:h-[100px]"
                    />
                    <h2 className="text-lg font-bold mt-2 mb-3">{place.name}</h2>
                    <p className="text-text_dark_gray/80 font-[500] text-[14px]">{place.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PopularDestination;
