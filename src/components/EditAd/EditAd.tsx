"use client";

import { useRef, useState, useCallback } from "react";
import { Camera, Lock, UploadCloud, X, ChevronRight, PencilLine, CheckCircle2, ChevronLeft } from "lucide-react";
import Image from "next/image";

type FileWithPreview = {
  file: File;
  preview: string;
};

type TabType = "Immagini" | "Descrizione" | "Prezzo" | "Contatto" | "Pubblica";

function UploadSlot({
  label,
  locked = false,
  file,
  onSelect,
  onRemove,
}: {
  label: string;
  locked?: boolean;
  file?: FileWithPreview | null;
  onSelect?: (files: FileList) => void;
  onRemove?: () => void;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onClick = () => {
    if (locked) return;
    inputRef.current?.click();
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    if (locked) return;
    e.preventDefault();
    if (e.dataTransfer.files?.length && onSelect) {
      onSelect(e.dataTransfer.files);
    }
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    if (locked) return;
    e.preventDefault();
  };

  return (
    <div
      className={`relative flex items-center justify-center rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden cursor-pointer ${
        locked ? "opacity-80 cursor-not-allowed" : "hover:border-gray-300"
      }`}
      style={{ minHeight: 140 }}
      onClick={onClick}
      onDrop={onDrop}
      onDragOver={onDragOver}
      role="button"
      aria-disabled={locked}
    >
      {file ? (
        <>
          <img src={file.preview} alt={label} className="absolute inset-0 w-full h-full object-cover" />
          {!!onRemove && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemove();
              }}
              className="absolute top-2 right-2 inline-flex items-center justify-center rounded-full bg-white/90 border border-gray-200 p-1 text-gray-700 hover:bg-white"
              aria-label="Rimuovi immagine"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center p-6 text-center">
          {locked ? <Lock className="w-6 h-6 text-gray-500 mb-2" /> : <UploadCloud className="w-6 h-6 text-gray-500 mb-2" />}
          <p className="text-sm text-gray-600">{locked ? "Scopri come caricare più foto" : "Clicca o trascina l'immagine"}</p>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          if (locked) return;
          const files = e.target.files;
          if (files?.length && onSelect) onSelect(files);
        }}
      />
    </div>
  );
}

// Tab content components
function ImmaginiTab({
  mainImage,
  images,
  handleAddMain,
  handleAddAt,
  removeAt,
  removeMain,
}: {
  mainImage: FileWithPreview | null;
  images: (FileWithPreview | null)[];
  handleAddMain: (files: FileList) => void;
  handleAddAt: (index: number, files: FileList) => void;
  removeAt: (index: number) => void;
  removeMain: () => void;
}) {
  return (
    <section>
      <h3 className="text-lg font-semibold mb-2">Foto</h3>
      <p className="text-sm text-gray-500 mb-6">Aggiungi, modifica o rimuovi immagini del tuo veicolo</p>

      {/* Main image */}
      <div className="mb-8">
        <h4 className="text-sm font-medium mb-3">Immagine principale</h4>
        <div className="relative rounded-xl border border-gray-200 bg-white shadow-sm p-3">
          <div className="relative w-full h-60 overflow-hidden rounded-lg">
            {mainImage ? (
              <img src={mainImage.preview} alt="Immagine principale" className="absolute inset-0 w-full h-full object-cover rounded-lg" />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-gray-500">
                <Camera className="w-6 h-6 mr-2" />
                Nessuna immagine selezionata
              </div>
            )}
          </div>

          <div className="mt-3 flex items-center gap-3">
            <button
              className="inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm hover:bg-gray-50"
              onClick={() => document.getElementById("main-upload-trigger")?.click()}
            >
              <UploadCloud className="w-4 h-4" />
              Carica immagine
            </button>
            {mainImage && (
              <button
                className="inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm hover:bg-gray-50"
                onClick={removeMain}
              >
                <X className="w-4 h-4" />
                Rimuovi
              </button>
            )}
            <button className="ml-auto inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm hover:bg-gray-50">
              <PencilLine className="w-4 h-4" />
              Modifica
            </button>
          </div>

          <input
            id="main-upload-trigger"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (!f) return;
              handleAddMain(e.target.files as FileList);
            }}
          />
        </div>
      </div>

      {/* Other images */}
      <div>
        <h4 className="text-sm font-medium mb-3">Altre immagini</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((img, i) => {
            const locked = i >= 3;
            return (
              <UploadSlot
                key={i}
                label={`Immagine ${i + 1}`}
                locked={locked}
                file={img}
                onSelect={locked ? undefined : (files) => handleAddAt(i, files)}
                onRemove={locked || !img ? undefined : () => removeAt(i)}
              />
            );
          })}
        </div>
      </div>

      {/* Video */}
      <div className="pt-8">
        <h3 className="text-lg font-semibold mb-2">Video</h3>
        <p className="text-sm text-gray-500 mb-6">Carica, modifica o rimuovi i video del tuo veicolo</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl">
          <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-6 flex items-center justify-center">
            <div className="text-center">
              <Lock className="w-6 h-6 text-gray-500 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Scopri come caricare video</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DescrizioneTab({
  description,
  setDescription,
  insurance,
  setInsurance,
}: {
  description: string;
  setDescription: (value: string) => void;
  insurance: string;
  setInsurance: (value: string) => void;
}) {
  return (
    <section className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-2">Descrizione</h3>
        <p className="text-sm text-gray-500 mb-4">Fai risaltare il tuo veicolo con una descrizione dettagliata</p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Descrizione del veicolo</label>
            <textarea
              className="w-full h-32 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-primary"
              placeholder="Inserisci una descrizione dettagliata del veicolo..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <p className="text-xs text-gray-400 mt-1">0/50 Parole</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Cos&apos;è incluso nella prenotazione</h3>
        <p className="text-sm text-gray-500 mb-4">Inserisci cosa è incluso nella prenotazione e le politiche riguardanti il veicolo</p>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Franchigia (in caso di danni)</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-primary"
              placeholder="CHF"
              value={insurance}
              onChange={(e) => setInsurance(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Politiche sul deposito</label>
              <textarea
                className="w-full h-24 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-primary"
                placeholder="Descrizione delle politiche sul deposito..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Politiche sul carburante</label>
              <textarea
                className="w-full h-24 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-primary"
                placeholder="Descrizione delle politiche sul carburante..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Politiche sui chilometri</label>
              <textarea
                className="w-full h-24 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-primary"
                placeholder="Descrizione delle politiche sui chilometri..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Politiche sui danni</label>
              <textarea
                className="w-full h-24 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-primary"
                placeholder="Descrizione delle politiche sui danni..."
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PrezzoTab({ price, setPrice }: { price: string; setPrice: (value: string) => void }) {
  return (
    <section>
      <h3 className="text-lg font-semibold mb-2">Prezzo</h3>
      <p className="text-sm text-gray-500 mb-6">Imposta il prezzo per il noleggio del tuo veicolo</p>

      <div className="max-w-md space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Prezzo giornaliero</label>
          <div className="relative">
            <input
              type="text"
              className="w-full p-3 pl-12 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-primary"
              placeholder="230"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <span className="absolute left-3 top-3 text-gray-500">CHF</span>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium mb-2">Riepilogo prezzi</h4>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span>Prezzo base giornaliero</span>
              <span>CHF {price || "0"}</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Commissione piattaforma (10%)</span>
              <span>CHF {price ? (parseFloat(price) * 0.1).toFixed(0) : "0"}</span>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between font-medium">
              <span>Guadagno per giorno</span>
              <span>CHF {price ? (parseFloat(price) * 0.9).toFixed(0) : "0"}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContattoTab({
  phone,
  setPhone,
  email,
  setEmail,
}: {
  phone: string;
  setPhone: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
}) {
  return (
    <section>
      <h3 className="text-lg font-semibold mb-2">Contatto</h3>
      <p className="text-sm text-gray-500 mb-6">Inserisci le tue informazioni di contatto</p>

      <div className="max-w-md space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Numero di telefono</label>
          <input
            type="tel"
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-primary"
            placeholder="+41 79 123 45 67"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-primary"
            placeholder="esempio@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-1">Protezione privacy</h4>
          <p className="text-sm text-blue-700">Le tue informazioni di contatto saranno visibili solo agli utenti che prenotano il tuo veicolo.</p>
        </div>
      </div>
    </section>
  );
}

function PubblicaTab() {
  return (
    <section>
      <h3 className="text-lg font-semibold mb-2">Pubblica annuncio</h3>
      <p className="text-sm text-gray-500 mb-6">Rivedi e pubblica il tuo annuncio</p>

      <div className="space-y-6">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-green-900">Pronto per la pubblicazione</h4>
              <p className="text-sm text-green-700 mt-1">
                Il tuo annuncio è completo e pronto per essere pubblicato. Una volta pubblicato, gli utenti potranno vedere e prenotare il tuo
                veicolo.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium mb-3">Riepilogo annuncio</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Veicolo:</span>
              <span>Maserati Ghibli Gransport</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Prezzo giornaliero:</span>
              <span>CHF 230</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Immagini caricate:</span>
              <span>4 immagini</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Stato:</span>
              <span className="text-green-600">Pronto</span>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h4 className="font-medium text-yellow-900 mb-1">Nota importante</h4>
          <p className="text-sm text-yellow-700">
            Una volta pubblicato, il tuo annuncio sarà visibile a tutti gli utenti. Potrai sempre modificarlo successivamente dalla tua dashboard.
          </p>
        </div>
      </div>
    </section>
  );
}

export default function EditListing() {
  const [activeTab, setActiveTab] = useState<TabType>("Immagini");
  const [mainImage, setMainImage] = useState<FileWithPreview | null>(null);
  const [images, setImages] = useState<(FileWithPreview | null)[]>([null, null, null, null, null, null]);

  // Form states
  const [description, setDescription] = useState("");
  const [insurance, setInsurance] = useState("");
  const [price, setPrice] = useState("230");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const tabs: TabType[] = ["Immagini", "Descrizione", "Prezzo", "Contatto", "Pubblica"];
  const currentTabIndex = tabs.indexOf(activeTab);

  const toPreview = useCallback((f: File): FileWithPreview => {
    return { file: f, preview: URL.createObjectURL(f) };
  }, []);

  const handleAddMain = (files: FileList) => {
    const f = files[0];
    if (!f) return;
    setMainImage(toPreview(f));
  };

  const handleAddAt = (index: number, files: FileList) => {
    const f = files[0];
    if (!f) return;
    setImages((prev) => {
      const next = [...prev];
      next[index] = toPreview(f);
      return next;
    });
  };

  const removeAt = (index: number) => {
    setImages((prev) => {
      const next = [...prev];
      if (next[index]?.preview) URL.revokeObjectURL(next[index]!.preview);
      next[index] = null;
      return next;
    });
  };

  const removeMain = () => {
    if (mainImage?.preview) URL.revokeObjectURL(mainImage.preview);
    setMainImage(null);
  };

  const goToNextTab = () => {
    if (currentTabIndex < tabs.length - 1) {
      setActiveTab(tabs[currentTabIndex + 1]);
    }
  };

  const goToPrevTab = () => {
    if (currentTabIndex > 0) {
      setActiveTab(tabs[currentTabIndex - 1]);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "Immagini":
        return (
          <ImmaginiTab
            mainImage={mainImage}
            images={images}
            handleAddMain={handleAddMain}
            handleAddAt={handleAddAt}
            removeAt={removeAt}
            removeMain={removeMain}
          />
        );
      case "Descrizione":
        return <DescrizioneTab description={description} setDescription={setDescription} insurance={insurance} setInsurance={setInsurance} />;
      case "Prezzo":
        return <PrezzoTab price={price} setPrice={setPrice} />;
      case "Contatto":
        return <ContattoTab phone={phone} setPhone={setPhone} email={email} setEmail={setEmail} />;
      case "Pubblica":
        return <PubblicaTab />;
      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Page header */}
      <div className="px-6 lg:px-10 pt-8">
        <h1 className="text-2xl font-bold">Modifica annuncio</h1>
        <p className="text-sm text-gray-500">Gestisci e aggiorna il tuo annuncio in pochi click</p>
      </div>

      <div className="px-6 lg:px-10 py-6 space-y-8">
        {/* Selected vehicle card */}
        <section className="rounded-xl border border-gray-200 bg-white shadow-sm p-4">
          <div className="flex items-start gap-4">
            <div className="relative w-44 h-28 rounded-lg overflow-hidden">
              <Image src="/placeholder.svg?height=112&width=176" alt="Vehicle" fill className="object-cover" unoptimized />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span className="text-xs text-green-700">Annuncio pubblicato</span>
              </div>
              <h2 className="mt-1 font-semibold">Maserati Ghibli Gransport</h2>
              <p className="text-sm text-gray-500 mt-1">Description goes here Description goes here Description goes here...</p>
              <div className="mt-2 text-sm text-gray-900 font-medium">CHF {price}</div>
            </div>
          </div>
        </section>

        {/* Tab Navigation */}
        <section className="grid grid-cols-5 gap-4">
          {tabs.map((label, idx) => (
            <button
              key={label}
              onClick={() => setActiveTab(label)}
              className={`flex items-center gap-2 rounded-full border bg-white px-3 py-1.5 text-sm shadow-sm transition-colors ${
                activeTab === label ? "border-primary text-primary bg-red-50" : "border-gray-200 text-gray-600 hover:border-gray-300"
              }`}
            >
              <span
                className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs ${
                  activeTab === label ? "bg-primary text-white" : "bg-gray-100 text-gray-700"
                }`}
              >
                {idx + 1}
              </span>
              <span className="truncate">{label}</span>
            </button>
          ))}
        </section>

        {/* Tab Content */}
        <div className="min-h-[500px]">{renderTabContent()}</div>

        {/* Footer actions */}
        <div className="flex items-center justify-between py-8">
          <button
            onClick={goToPrevTab}
            disabled={currentTabIndex === 0}
            className={`inline-flex items-center gap-2 rounded-md px-6 py-3 font-semibold shadow-md ${
              currentTabIndex === 0 ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-gray-600 text-white hover:bg-gray-700"
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            Indietro
          </button>

          <button
            onClick={goToNextTab}
            className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-white font-semibold hover:bg-primary shadow-md"
          >
            {currentTabIndex === tabs.length - 1 ? "Pubblica" : "Avanti"}
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </main>
  );
}
