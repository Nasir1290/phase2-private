/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, CreditCard, Calendar, AlertCircle, ArrowUpCircle, ArrowDownCircle, XCircle, CheckCircle, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { cn } from "@/lib/utils";

export default function SubscriptionDetailsPage() {
  const [openItem, setOpenItem] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setOpenItem(openItem === id ? null : id);
  };

  const faqItems = [
    {
      id: "current",
      icon: <CreditCard className="w-6 h-6 text-blue-600" />,
      question: "Il mio abbonamento attuale",
      answer: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-base">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-600 text-sm">Piano attuale</p>
              <p className="font-bold text-xl">Plus</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-600 text-sm">Ciclo di fatturazione</p>
              <p className="font-bold">Mensile</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-600 text-sm">Prossimo addebito</p>
              <p className="font-bold">30 gennaio 2026</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-600 text-sm">Importo mensile</p>
              <p className="font-bold text-xl">39.00 CHF</p>
            </div>
            <div className="bg-green-50 border border-green-200 p-4 rounded-lg col-span-1 sm:col-span-2">
              <p className="text-gray-600 text-sm">Stato</p>
              <p className="font-bold text-green-700 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Attivo
              </p>
            </div>
          </div>
          <p className="text-sm text-gray-600">
            Hai accesso completo a tutte le funzionalità del piano Plus, inclusi i crediti mensili In Cima e In Risalto.
          </p>
        </div>
      ),
    },
    {
      id: "cancel",
      icon: <XCircle className="w-6 h-6 text-red-600" />,
      question: "Come annullare l'abbonamento?",
      answer: (
        <div className="space-y-5">
          <p>Puoi scegliere tra due opzioni:</p>
          <div className="grid gap-4">
            <Card className="border-green-200 bg-green-50">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  Annulla alla fine del mese (consigliato)
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <p>• Mantieni accesso e benefici completi fino al 30 gennaio 2026</p>
                <p>• Nessun nuovo addebito dal mese prossimo</p>
                <p>• L'abbonamento termina automaticamente alla data di rinnovo</p>
              </CardContent>
            </Card>
            <Card className="border-red-200 bg-red-50">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  Annulla immediatamente
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <p>• Accesso termina subito</p>
                <p>• Nessun rimborso per il mese corrente</p>
                <p>• Passi immediatamente al piano Standard gratuito</p>
              </CardContent>
            </Card>
          </div>
          <p className="text-sm font-medium">
            <Wallet className="w-4 h-4 inline mr-1" />
            In entrambi i casi, <strong>tutti i crediti nel tuo wallet rimangono tuoi per sempre</strong>.
          </p>
          <div className="pt-3">
            <Button variant="destructive" size="lg" className="w-full">
              Annulla abbonamento
            </Button>
          </div>
        </div>
      ),
    },
    {
      id: "upgrade",
      icon: <ArrowUpCircle className="w-6 h-6 text-green-600" />,
      question: "Come passare al piano Business (Upgrade)?",
      answer: (
        <div className="space-y-4">
          <p>Puoi passare al piano superiore in qualsiasi momento.</p>
          <ul className="space-y-2 text-sm">
            <li>• L'upgrade è <strong>immediato</strong></li>
            <li>• Paghi solo la differenza proporzionale per i giorni rimanenti del mese</li>
            <li>• Da subito ricevi tutti i benefici Business</li>
            <li>• Dal mese prossimo: 119 CHF/mese con crediti più alti</li>
          </ul>
          <Button size="lg" className="w-full bg-green-600 hover:bg-green-700">
            Passa subito a Business – 119 CHF/mese
          </Button>
        </div>
      ),
    },
    {
      id: "downgrade",
      icon: <ArrowDownCircle className="w-6 h-6 text-amber-600" />,
      question: "Come tornare al piano Plus (Downgrade)?",
      answer: (
        <div className="space-y-4">
          <p>Se sei su Business e vuoi risparmiare:</p>
          <ul className="space-y-2 text-sm">
            <li>• Il downgrade si applica <strong>alla fine del mese corrente</strong></li>
            <li>• Fino al 30 gennaio 2026 mantieni tutti i benefici Business</li>
            <li>• Dal mese prossimo paghi solo 39 CHF e ricevi i benefici Plus</li>
          </ul>
          <Button variant="outline" size="lg" className="w-full">
            Torna al piano Plus
          </Button>
        </div>
      ),
    },
    {
      id: "benefits",
      icon: <Calendar className="w-6 h-6 text-indigo-600" />,
      question: "Cosa ricevo ogni mese con il mio abbonamento?",
      answer: (
        <div className="space-y-6">
          <p>Ogni mese, alla data di fatturazione, ricevi automaticamente nuovi crediti promozionali:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-2 border-primary bg-primary/5">
              <CardHeader>
                <CardTitle className="text-xl">Piano Plus</CardTitle>
                <p className="text-3xl font-bold mt-2">39 CHF/mese</p>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="flex items-center gap-2 text-lg">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  5 × In Cima
                </p>
                <p className="flex items-center gap-2 text-lg">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  1 × In Risalto
                </p>
              </CardContent>
            </Card>
            <Card className="border-2 border-purple-600">
              <CardHeader>
                <CardTitle className="text-xl">Piano Business</CardTitle>
                <p className="text-3xl font-bold mt-2">119 CHF/mese</p>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="flex items-center gap-2 text-lg">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  12 × In Cima
                </p>
                <p className="flex items-center gap-2 text-lg">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  3 × In Risalto
                </p>
                <p className="flex items-center gap-2 text-lg">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  1 × In Homepage
                </p>
              </CardContent>
            </Card>
          </div>
          <p className="text-center font-medium">
            <Wallet className="w-5 h-5 inline mr-1" />
            Tutti i crediti <strong>non scadono mai</strong> e puoi usarli quando vuoi.
          </p>
        </div>
      ),
    },
    {
      id: "payment-issues",
      icon: <AlertCircle className="w-6 h-6 text-amber-600" />,
      question: "Cosa succede se il pagamento non va a buon fine?",
      answer: (
        <div className="space-y-3">
          <ul className="space-y-2">
            <li>• L'abbonamento diventa <strong>Past Due</strong></li>
            <li>• Mantieni l'accesso completo</li>
            <li>• Stripe ritenta automaticamente il pagamento per 3–7 giorni</li>
            <li>• Non ricevi nuovi crediti mensili finché il pagamento non riesce</li>
            <li>• Aggiorna la carta → tutto torna normale automaticamente</li>
          </ul>
        </div>
      ),
    },
    {
      id: "resume",
      icon: <Calendar className="w-6 h-6 text-teal-600" />,
      question: "Come riattivare un abbonamento annullato?",
      answer: (
        <div className="space-y-3">
          <p>Se hai annullato alla fine del periodo e vuoi tornare:</p>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Torna alla pagina abbonamenti</li>
            <li>Scegli il piano che desideri</li>
            <li>Vieni addebitato subito e riottieni accesso + crediti mensili</li>
          </ol>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-10">
          Gestione del tuo Abbonamento
        </h1>

        <div className="space-y-4">
          {faqItems.map((item) => (
            <Card
              key={item.id}
              className={cn(
                "overflow-hidden transition-all duration-300",
                openItem === item.id ? "ring-2 ring-primary shadow-lg" : "shadow-md"
              )}
            >
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                aria-expanded={openItem === item.id}
              >
                <div className="flex items-center gap-4">
                  {item.icon}
                  <h3 className="text-lg md:text-xl font-semibold">{item.question}</h3>
                </div>
                {openItem === item.id ? (
                  <ChevronUp className="w-6 h-6 text-gray-500" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-gray-500" />
                )}
              </button>

              <div
                className={cn(
                  "transition-all duration-300",
                  openItem === item.id ? "block px-6 pb-7" : "hidden"
                )}
              >
                {item.answer}
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600">
            Hai altre domande? Scrivici a{" "}
            <a href="mailto:support@yourapp.com" className="text-primary font-medium hover:underline">
              support@yourapp.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}