interface TimelineEvent {
  step: number;
  title: string | React.ReactNode;
  detail: string | React.ReactNode;
}

interface Timeline {
  Year: { from: number; to: number };
  events: TimelineEvent[];
}

const Timeline = () => {
  const timelines: Timeline[] = [
    {
      Year: { from: 2025, to: 2026 },
      events: [
        {
          step: 1,
          title: "Rating",
          detail:
            "Puntiamo a potenziare il nostro rating e a consolidare il brand Bittengo, offrendo un servizio impeccabile che ispiri fiducia e soddisfazione.",
        },
        {
          step: 2,
          title: "Nuovi partner",
          detail:
            "Acquisizione di nuovi partner per ampliare la nostra offerta di veicoli a noleggio e servizi",
        },
        {
          step: 3,
          title: "Espansione clientela",
          detail:
            "Puntiamo ad espandere la nostra clientela oltre i 500 clienti, offrendo un servizio di noleggio veicoli che unisce qualità, convenienza ed innovazione",
        },
        {
          step: 4,
          title: "Bittengo 2.0",
          detail:
            "Integrazione di funzionalità innovative sulla nostra piattaforma, progettate per rivoluzionare l’esperienza di noleggio in Svizzera.",
        },
      ],
    },
  ];

  return (
    <div className="space-y-10 xl:space-y-20">
      <header className={`max-w-2xl text-start mb-5 lg:mb-16`}>
        <div className="flex flex-col gap-4">
          <span className="text-sm font-medium text-text_light_gray uppercase">
            ROADMAP
          </span>

          <h1 className="text-2xl md:text-[30px] font-extrabold">
            I nostri prossimi <br />
            <span className="text-red">obiettivi per il futuro</span>
          </h1>
        </div>
      </header>

      {/* Timeline  */}
      <div className="overflow-auto scrollbar-hide">
        <div className="w-full flex items-center justify-between">
          <div className="relative">
            {timelines.map((timeline, timelineIndex) => (
              <div key={timelineIndex} className="flex items-center">
                {/* Display Year */}
                <div className=" text-center text-red mb-[45px] ">
                  <p className="text-base font-semibold">
                    {timeline.Year?.from}
                  </p>
                  <div className=" border-l-4 border-solid border-red mx-4 h-7"></div>
                </div>

                {/* Display Events */}
                {timeline.events.map((event, eventIndex) => (
                  <div
                    key={eventIndex}
                    className="flex flex-col items-center z-10"
                  >
                    <div
                      className={`flex flex-col items-center my-5 ${
                        event.step % 2 === 0
                          ? "flex-col-reverse mb-[180px] "
                          : "flex-col mt-[210px]"
                      }`}
                    >
                      {/* Step Circle */}
                      <div className="w-11 h-11  bg-red rounded-full text-white flex items-center justify-center">
                        <span className="text-xl font-semibold">
                          {event.step}
                        </span>
                      </div>

                      {/* Dashed Vertical Line */}
                      <div className="border-l-2 border-dashed border-red mx-4 gap-10 h-14"></div>

                      {/* Event Card */}
                      <div className="text-center w-[270px] xl:w-[264px] 2xl:w-[270px] h-44 px-3 py-5 bg-white border border-gray-200 rounded-xl shadow-lg">
                        <p className="font-bold text-lg mb-4">{event.title}</p>
                        <p className="text-sm text-text_light_gray">
                          {event.detail}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Display Year */}
                <div className="flex flex-col-reverse text-center text-red mt-[62px] ">
                  <p className="text-base font-semibold">{timeline.Year?.to}</p>
                  <div className="top- border-l-4 border-solid border-red mx-4 h-7"></div>
                </div>
              </div>
            ))}

            <div className="absolute top-64 left-0 min-w-screen border-t-2 border-red w-full z-0"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
