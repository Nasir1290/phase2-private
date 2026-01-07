"use client"


import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { CalendarDays, CheckCircle2, CircleDot, Square, Clock3, MapPin, ExternalLink } from 'lucide-react'
import { cn } from "@/lib/utils"
import Image from "next/image"

export default function BookingConfirmation() {
  return (
    <div className="space-y-10 mt-24 container mx-auto px-4 py-6 md:px-6 lg:py-8">
      {/* Header */}
      <header className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
            Abbiamo ricevuto la tua prenotazione
          </h1>
          <span aria-hidden="true" className="hidden text-neutral-700 md:inline-flex">
            <CalendarDays className="h-6 w-6" />
          </span>
        </div>
        <div className="basis-full text-sm text-muted-foreground md:basis-auto">
          Prenotazione <span className="font-medium text-neutral-900">#B101</span>
        </div>
      </header>

      {/* Content grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        {/* Left: Steps and vehicle */}
        <section className="space-y-10">
          {/* Steps */}
          <div>
            <h2 className="mb-2 text-lg font-semibold">Prossimi passi</h2>
            <p className="mb-6 max-w-prose text-sm text-muted-foreground">
              Attenzione, questa non è una conferma di prenotazione; il proprietario del veicolo ti contatterà entro 24 ore per confermare il noleggio.
            </p>

            <ol className="relative ml-1 space-y-6 border-l pl-6">
              <Step state="done" title="Prenotazione eseguita correttamente" />
              <Step state="current" title="Il fornitore ha ricevuto la tua richiesta" />
              <Step state="todo" title="Riceverai una risposta entro 24 ore" />
            </ol>

            <p className="mt-8 max-w-prose text-sm text-muted-foreground">
              Se hai domande relative alla prenotazione, non esitare a contattarci.
              Se il fornitore accetterà la tua richiesta, ti invitiamo a seguire le sue istruzioni per completare correttamente il noleggio.
            </p>
          </div>

          {/* Vehicle */}
          <div>
            <h2 className="mb-2 text-lg font-semibold">Il tuo veicolo</h2>
            <p className="mb-4 max-w-prose text-sm text-muted-foreground">
              Di seguito trovi i dettagli del veicolo scelto; ti consigliamo di verificarli attentamente per garantire che tutto sia conforme alle tue esigenze.
            </p>

            <div className="p-3 sm:p-4">
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="sm:w-[280px]">
                  <Image
                    height={400}
                    width={280}
                    src="/placeholder-ro7fx.png"
                    alt="Maserati Ghibli Gransport"
                    className="h-40 w-full rounded-md object-cover sm:h-full"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="mb-3 flex items-center gap-2">
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-neutral-900 text-[10px] font-semibold text-white">
                      {"IT"}
                    </span>
                    <h3 className="truncate text-base font-semibold sm:text-lg">Maserati Ghibli Gransport</h3>
                  </div>

                  <ul className="mb-4 text-xs text-muted-foreground sm:text-sm">
                    <li>Dimensioni raccomandate 300x300px</li>
                    <li>Immagine di copertina 300x300px</li>
                    <li>Galleria consigliata 300x300px</li>
                  </ul>

                  <Button variant="outline" className="gap-2" aria-label="Vedi annuncio del veicolo">
                    <ExternalLink className="h-4 w-4" />
                    Vedi annuncio
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Right: Summary card */}
        <aside className="order-first lg:order-last">
          <SummaryCard />
        </aside>
      </div>

      {/* Payment section (bottom part) */}
      <PaymentSection />
    </div>
  )
}

/* Payment section */
function PaymentSection() {
  return (
    <section className="space-y-4 max-w-3xl">
      <div>
        <h2 className="text-lg font-semibold">Pagamento</h2>
        <p className="mt-1 max-w-prose text-sm text-muted-foreground">
          Il costo mostrato è il reale importo del noleggio, ti invitiamo a metterti in contatto con il fornitore per
          concordare il metodo di pagamento e saldare l&apos;importo preventivato
        </p>
      </div>

      <div className="">
        {/* Dettagli richiedente */}
        <h3 className="text-sm font-semibold">Dettagli richiedente</h3>

        <dl className="mt-3 divide-y rounded-md border">
          <Row label="Numero di telefono" value="+41 79 260 21 45" />
          <Row label="Email" value="panzone@gmail.com" />
          <div className="grid grid-cols-1 gap-2 p-3 sm:grid-cols-[260px_minmax(0,1fr)]">
            <dt className="text-sm text-neutral-700">Richieste speciali</dt>
            <dd>
              <div className="min-h-24 rounded-md border bg-neutral-50" aria-label="Richieste speciali (vuoto)" />
            </dd>
          </div>
        </dl>

        {/* Dettaglio sul prezzo */}
        <h3 className="mt-6 text-sm font-semibold">Dettaglio sul prezzo</h3>
        <div className="mt-3 overflow-hidden rounded-md border">
          <PriceRow label="Noleggio 5 giorni" value={"1'200 CHF"} />
          <PriceRow
            label="Costi del servizio"
            value={<span className="text-green-600">Gratuito</span>}
          />
          <Separator />
          <div className="flex items-center justify-between p-3">
            <div className="text-sm font-semibold">TOTALE</div>
            <div className="text-sm font-semibold text-neutral-900">1&apos;200 CHF</div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-1 gap-2 p-3 sm:grid-cols-[260px_minmax(0,1fr)]">
      <dt className="text-sm text-neutral-700">{label}</dt>
      <dd className="truncate text-sm text-neutral-900">{value}</dd>
    </div>
  )
}

function PriceRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between p-3">
      <div className="text-sm text-neutral-700">{label}</div>
      <div className="text-sm text-neutral-900">{value}</div>
    </div>
  )
}

/* Right summary card */
function SummaryCard() {
  return (
    <div className="sticky top-28 p-4 sm:p-5">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-base font-semibold">La tua prenotazione</h3>
        <span aria-hidden="true" className="text-neutral-700">
          <CalendarDays className="h-5 w-5" />
        </span>
      </div>

      <div className="space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <Clock3 className="h-4 w-4 text-neutral-700" />
            <span className="text-sm font-medium">Check-in</span>
          </div>
        <div className="text-right text-sm text-muted-foreground">
            23 Agosto 2024
            <span className="ml-2 inline-flex items-center gap-1 text-neutral-700">
              <Clock3 className="h-3.5 w-3.5" /> 13:00
            </span>
          </div>
        </div>

        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <Clock3 className="h-4 w-4 text-neutral-700" />
            <span className="text-sm font-medium">Check-out</span>
          </div>
          <div className="text-right text-sm text-muted-foreground">
            28 Agosto 2024
            <span className="ml-2 inline-flex items-center gap-1 text-neutral-700">
              <Clock3 className="h-3.5 w-3.5" /> 13:00
            </span>
          </div>
        </div>

        <Separator />

        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-neutral-700" />
            <span className="text-sm font-medium">Ubicazione veicolo</span>
          </div>
          <div className="flex items-center justify-between gap-3 text-sm">
            <span className="text-muted-foreground">Via Emilio maraini 4B</span>
            <span className="text-muted-foreground">Massagno</span>
          </div>
        </div>
      </div>
    </div>
  )
}

type StepState = "done" | "current" | "todo"

function Step({ state, title, description }: { state: StepState; title: string; description?: string }) {
  return (
    <li className="relative">
      {/* Marker */}
      <span className="absolute -left-[27px] top-0 inline-flex h-5 w-5 items-center justify-center rounded-full bg-white">
        {state === "done" && <CheckCircle2 className="h-5 w-5 text-green-600" aria-hidden="true" />}
        {state === "current" && <CircleDot className="h-5 w-5 text-neutral-800" aria-hidden="true" />}
        {state === "todo" && <Square className="h-4 w-4 text-neutral-400" aria-hidden="true" />}
        <span className="sr-only">
          {state === "done" ? "Completato" : state === "current" ? "In corso" : "Da fare"}
        </span>
      </span>

      <div className="space-y-1">
        <div className={cn("text-sm", state === "current" ? "font-semibold" : "font-medium")}>{title}</div>
        {description ? <p className="text-sm text-muted-foreground">{description}</p> : null}
      </div>
    </li>
  )
}
