/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";
// import business from "@/assets/Business.svg";
// import plus from "@/assets/Plus.svg";
// import standard from "@/assets/Standard.svg";
// import { Button } from "@/components/ui/button";
// import { Check } from "lucide-react";
// import Image from "next/image";
// import { useState } from "react";
// import { MdArrowForwardIos } from "react-icons/md";
// import SubscriptionModal from "./subscription-modal";
// import downArrow from "@/assets/downArrow.svg";
// import { cn } from "@/lib/utils";
// import { useGetAllSubscriptionsQuery } from "@/redux/api/subscription";

// export default function MySubscription() {
//   const { data, isLoading } = useGetAllSubscriptionsQuery(undefined);

// const plusPlan = data?.data?.find((p: any) => p.name === "PLUS");
// const businessPlan = data?.data?.find((p: any) => p.name === "BUSINESS");

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isBusinessGrow, setIsBusinessGrow] = useState(false);

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//   };

//   const handleOpenModal = () => {
//     setIsModalOpen(true);
//   }
// const renderFeatures = (features: string[]) => (
//   <div className="space-y-3 mb-6">
//     {features.map((feature, index) => (
//       <div key={index} className="flex items-center space-x-2">
//         <Check className="w-5 h-5 text-green" />
//         <span className="text-xs">{feature}</span>
//       </div>
//     ))}
//   </div>
// );

//   // const handleSave = (values: any) => {
//   //   console.log("Form values:", values);
//   //   setIsModalOpen(false);
//   // };
//   if (isLoading) {
//   return <p className="text-center py-20">Loading subscriptions...</p>;
// }

//   return (
//     <div className="my-8 md:my-16 lg:my-24">
//       <div className="">
//         {/* Header Section */}
//         <div className="flex justify-between items-start mb-12">
//           <div>
//             <h1 className="text-2xl font-semibold text-gray-900 mb-2">Il mio abbonamento</h1>
//             <p className="text-text_light_gray text-sm">Gestisci i dettagli del tuo abbonamento e controlla le altre delle tue funzionalità</p>
//           </div>

//           <div  onClick={handleOpenModal} className="hidden md:flex cursor-pointer text-sm font-semibold text-primary uppercase items-center gap-1 hover:bg-primary/5 px-3 py-2 rounded-lg">
//             GESTISCI ABBONAMENTO
//             <MdArrowForwardIos />
//           </div>

//           {/* <BillingModal isOpen={isModalOpen} onClose={handleCloseModal} onSave={handleSave} /> */}
//           <SubscriptionModal isOpen={isModalOpen} onClose={handleCloseModal} />
//         </div>

//         {/* Subscription Cards */}
//         <div className="grid grid-cols-3 gap-6 lg:gap-20 mb-8">
//           {/* Standard Card */}
//           <div className="flex flex-col gap-8 h-full">
//             <div className="bg-white rounded-xl h-[450px] shadow-lg p-6 pt-7  border border-black/5 shadow-black/10">
//               <div className="text-center mb-6">
//                 <h3 className="text-lg font-semibold text-gray-900 mb-2">Standard</h3>
//                 <Image src={standard} alt="Standard Icon" className="w-10 h-10 mx-auto my-4" width={48} height={48} />
//                 <p className="text-sm text-[#AAAAAA] py-2">
//                   L&#39;essenziale per iniziare <br /> senza costi
//                 </p>
//               </div>

//               <div className="space-y-3 mb-6 px-10">
//                 <div className="flex items-center space-x-3">
//                   <Check className="w-5 h-5 text-green" />
//                   <span className="text-xs ">X6 Immagini</span>
//                 </div>
//                 <div className="flex items-center space-x-3">
//                   <Check className="w-5 h-5 text-green" />
//                   <span className="text-xs ">Promozioni a pagamento</span>
//                 </div>
//                 <div className="flex items-center space-x-3">
//                   <Check className="w-5 h-5 text-green" />
//                   <span className="text-xs ">Funzionalità standard</span>
//                 </div>
//                 <div className="flex items-center space-x-3">
//                   <Check className="w-5 h-5 text-green" />
//                   <span className="text-xs ">Annunci gratuiti</span>
//                 </div>
//                 <div className="flex items-center space-x-3">
//                   <Check className="w-5 h-5 text-green" />
//                   <span className="text-xs ">Servizio clienti</span>
//                 </div>
//               </div>
//             </div>

//             <Button variant="outline" className="w-full max-w-[250px] mx-auto bg-transparent shadow">
//               Gratuito
//             </Button>
//           </div>
//           {/* Plus Card */}
//         {/* Plus Card */}
// <div className="flex flex-col gap-8 h-full">
//   <div className="bg-white rounded-xl h-[450px] shadow-lg p-6 pt-7 md:px-16 border border-black/5 shadow-black/10">
//     <div className="text-center mb-6">
//       <h3 className="text-lg font-semibold text-gray-900 mb-2">Plus</h3>
//       <Image src={plus} alt="Plus Icon" className="w-10 h-10 mx-auto my-4" />
//       <p className="text-sm text-[#AAAAAA] py-2">
//         {plusPlan?.description}
//       </p>
//     </div>

//     {plusPlan && renderFeatures(plusPlan.features)}
//   </div>

//   <Button className="w-full max-w-[250px] mx-auto bg-primary text-white shadow">
//     Piano attuale – {plusPlan?.monthlyPrice} CHF/mese
//   </Button>
// </div>

//           {/* Business Card */}
//        {/* Business Card */}
// <div className="flex flex-col gap-8 h-full">
//   <div
//     className={cn(
//       "bg-white rounded-xl shadow-lg p-6 pt-7 md:px-16 border border-black/5 shadow-black/10 overflow-hidden",
//       isBusinessGrow ? "h-[515px]" : "h-[450px]",
//       "transition-all duration-500 ease-in-out"
//     )}
//   >
//     <div className="text-center mb-6">
//       <h3 className="text-lg font-semibold text-gray-900 mb-2">Business</h3>
//       <Image src={business} alt="Business Icon" className="w-10 h-10 mx-auto my-4" />
//       <p className="text-sm text-[#AAAAAA] py-2">
//         {businessPlan?.description}
//       </p>
//     </div>

//     <div className="space-y-3 mb-7">
//       {businessPlan?.features
//         ?.slice(0, 6)
//         .map((feature: string, index: number) => (
//           <div key={index} className="flex items-center space-x-2">
//             <Check className="w-5 h-5 text-green" />
//             <span className="text-xs">{feature}</span>
//           </div>
//         ))}

//       {/* Expanded features */}
//       {isBusinessGrow &&
//         businessPlan?.features
//           ?.slice(6)
//           .map((feature: string, index: number) => (
//             <div key={index} className="flex items-center space-x-2">
//               <Check className="w-5 h-5 text-green" />
//               <span className="text-xs">{feature}</span>
//             </div>
//           ))}

//       <div
//         onClick={() => setIsBusinessGrow(!isBusinessGrow)}
//         className={cn(
//           "flex items-center justify-center py-2 cursor-pointer transition-all duration-500",
//           isBusinessGrow && "rotate-180"
//         )}
//       >
//         <Image src={downArrow} alt="Down Arrow" className="w-5 h-5" />
//       </div>
//     </div>
//   </div>

//   <Button variant="outline" className="w-full max-w-[250px] mx-auto shadow">
//     Acquista – {businessPlan?.monthlyPrice} CHF/mese
//   </Button>
// </div>

//         </div>
//         {/* Current Subscription Section */}
//         <div className="mt-20">
//           <p className="text-sm text-text_light_gray mb-5">Il tuo abbonamento &quot;Plus&quot;</p>

//           <div className="flex items-center gap-6 mb-2 ">
//             <h4 className="font-semibold text-gray-900 text-xl">Bittengo SAGL</h4>
//             <Image src={plus} alt="Plus Icon" className="w-6 h-6" width={48} height={48} />
//           </div>

//           <p className="text-sm text-black">Abbonamento Plus: 39 CHF/mese</p>
//         </div>
//       </div>
//     </div>
//   );
// }

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import business from "@/assets/Business.svg";
import plus from "@/assets/Plus.svg";
import standard from "@/assets/Standard.svg";
import { Button } from "@/components/ui/button";
import { Check, Loader2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { MdArrowForwardIos } from "react-icons/md";
import downArrow from "@/assets/downArrow.svg";
import { cn } from "@/lib/utils";
import {
  useGetAllSubscriptionsQuery,
  useCreateSubscriptionMutation,
} from "@/redux/api/subscription";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "sonner";
import { useGetMyProfileQuery } from "@/redux/api/authApi";
import { TUserData } from "@/types/global";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: "16px",
      color: "#333",
      letterSpacing: "0.025em",
      "::placeholder": { color: "#aaa" },
    },
    invalid: { color: "#ef4444" },
  },
};

function SubscriptionModal({
  isOpen,
  onClose,
  selectedPlan,
}: {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan: any | null;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [createSubscription, { isLoading: isCreating }] =
    useCreateSubscriptionMutation();
  const [cardName, setCardName] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsProcessing(true);

    if (!stripe || !elements || !selectedPlan) {
      setIsProcessing(false);
      return;
    }

    const cardNumberElement = elements.getElement(CardNumberElement);
    if (!cardNumberElement) {
      setIsProcessing(false);
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardNumberElement,
      billing_details: { name: cardName || undefined },
    });

    if (error) {
      console.error("Stripe error:", error);
      setErrorMessage(error.message || "Errore con la carta.");
      setIsProcessing(false);
      return;
    }

    console.log("PaymentMethod created:", paymentMethod.id); // Debug

    try {
      await createSubscription({
        subscriptionPlanId: selectedPlan.id,
        billingCycle: "MONTHLY",
        paymentMethodId: paymentMethod.id,
      }).unwrap();

      toast.success(`Abbonamento ${selectedPlan.name} attivato con successo!`);
      onClose();
    } catch (err: any) {
      setErrorMessage(
        err?.data?.message || "Impossibile completare l'abbonamento. Riprova."
      );
    } finally {
      setIsProcessing(false);
    }
  };

  if (!selectedPlan) {
    return null;
  }

  const features = selectedPlan.features || [];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {/* Gradient backdrop */}
      <div className="fixed inset-0 bg-gradient-to-br from-pink-300 via-orange-200 to-pink-400 z-40" />

      <DialogContent className="w-full max-w-md sm:max-w-lg md:max-w-2xl p-6 sm:p-8 bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl z-50 overflow-hidden">
        {/* Accessible hidden title for screen readers */}
        <DialogHeader className="sr-only">
          <DialogTitle>Abbonamento {selectedPlan.name}</DialogTitle>
          <DialogDescription>
            Completa il pagamento per attivare il piano {selectedPlan.name}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center space-y-6">
          {/* Visible custom title & price */}
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
              Abbonati a {selectedPlan.name.toUpperCase()}
            </h2>
            <div className="mt-4">
              <p className="text-sm text-gray-600">Importo totale:</p>
              <p className="text-4xl sm:text-5xl font-bold text-pink-600">
                {selectedPlan.monthlyPrice} CHF
              </p>
              <p className="text-sm text-gray-600">/mese</p>
            </div>
          </div>

          {/* Features - responsive */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((feature: string, i: number) => (
              <div key={i} className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-sm sm:text-base text-gray-700">
                  {feature}
                </span>
              </div>
            ))}
          </div>

          {/* Payment form */}
          <div className="w-full bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-inner border border-white/50">
            <h3 className="text-xl font-semibold text-gray-900 mb-5 text-center">
              Informazioni Carta di Credito
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label className="text-gray-800 font-medium">
                  Titolare della carta
                </Label>
                <input
                  type="text"
                  placeholder="Mario Rossi"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  className="w-full px-4 py-3 bg-white rounded-xl text-gray-900 focus:outline-none focus:ring-4 focus:ring-pink-400/50 shadow border border-gray-200"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label className="text-gray-800 font-medium">
                  Numero carta
                </Label>
                <div className="p-4 bg-white rounded-xl shadow border border-gray-200">
                  <CardNumberElement options={CARD_ELEMENT_OPTIONS} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-gray-800 font-medium">Scadenza</Label>
                  <div className="p-4 bg-white rounded-xl shadow border border-gray-200">
                    <CardExpiryElement options={CARD_ELEMENT_OPTIONS} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-800 font-medium">CVC</Label>
                  <div className="p-4 bg-white rounded-xl shadow border border-gray-200">
                    <CardCvcElement options={CARD_ELEMENT_OPTIONS} />
                  </div>
                </div>
              </div>

              {errorMessage && (
                <div
                  className="p-3 bg-red-50 border border-red-500 rounded-xl text-red-400 text-sm 
                shadow-[0_0_10px_#de5555]"
                >
                  {errorMessage}
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="w-full border-gray-400 text-gray-700 hover:bg-gray-100"
                  disabled={isProcessing}
                >
                  Annulla
                </Button>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold text-lg px-8 py-4 rounded-xl shadow-lg"
                  disabled={!stripe || isProcessing || isCreating}
                >
                  {isProcessing || isCreating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Elaborazione...
                    </>
                  ) : (
                    <>Paga {selectedPlan.monthlyPrice} CHF e Abbonati</>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function MySubscription() {
  const { data, isLoading } = useGetAllSubscriptionsQuery(undefined);

  const plusPlan = data?.data?.find((p: any) => p.name === "PLUS");
  const businessPlan = data?.data?.find((p: any) => p.name === "BUSINESS");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any | null>(null);
  const [isBusinessGrow, setIsBusinessGrow] = useState(false);
  const { data: userData } = useGetMyProfileQuery("");
  const user: TUserData = userData?.data;

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPlan(null);
  };

  const handleOpenModal = (plan: any | null = null) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  const renderFeatures = (features: string[]) => (
    <div className="space-y-3 mb-6">
      {features.map((feature, index) => (
        <div key={index} className="flex items-center space-x-2">
          <Check className="w-5 h-5 text-green" />
          <span className="text-xs">{feature}</span>
        </div>
      ))}
    </div>
  );

  if (isLoading) {
    return <p className="text-center py-20">Loading subscriptions...</p>;
  }

  return (
    <Elements stripe={stripePromise}>
      <div className="my-8 md:my-16 lg:my-24">
        <div>
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-4">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                Il mio abbonamento
              </h1>
              <p className="text-text_light_gray text-sm">
                Gestisci i dettagli del tuo abbonamento e controlla le altre
                funzionalità
              </p>
            </div>
            <div
              onClick={() => handleOpenModal(null)}
              className="cursor-pointer text-sm font-semibold text-primary uppercase flex items-center gap-1 hover:bg-primary/5 px-3 py-2 rounded-lg w-full md:w-auto justify-center md:justify-start"
            >
              GESTISCI ABBONAMENTO <MdArrowForwardIos />
            </div>
          </div>

          {/* Subscription Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-20 mb-8">
            {/* Standard */}
            <div className="flex flex-col gap-8">
              <div className="bg-white rounded-xl shadow-lg p-6 pt-7 border border-black/5 h-auto md:h-[450px]">
                <div className="text-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Standard
                  </h3>
                  <Image
                    src={standard}
                    alt="Standard"
                    className="w-10 h-10 mx-auto my-4"
                  />
                  <p className="text-sm text-[#AAAAAA] py-2">
                    L'essenziale per iniziare
                    <br />
                    senza costi
                  </p>
                </div>
                <div className="space-y-3 mb-6 px-0 md:px-10">
                  {[
                    "X6 Immagini",
                    "Promozioni a pagamento",
                    "Funzionalità standard",
                    "Annunci gratuiti",
                    "Servizio clienti",
                  ].map((f) => (
                    <div key={f} className="flex items-center space-x-3">
                      <Check className="w-5 h-5 text-green" />
                      <span className="text-xs">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
              {user?.subscriptionType === "STANDARD" ? (
                <Button
                  variant="outline"
                  className="w-full max-w-[250px] mx-auto"
                >
                  Piano Attuale
                </Button>
              ) : (
                <Button
                  disabled
                  className="w-full max-w-[250px] mx-auto bg-primary text-white"
                >
                  Free
                </Button>
              )}
            </div>

            {/* Plus */}
            <div className="flex flex-col gap-8">
              <div className="bg-white rounded-xl shadow-lg p-6 pt-7 px-6 md:px-16 border border-black/5 h-auto md:h-[450px]">
                <div className="text-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Plus
                  </h3>
                  <Image
                    src={plus}
                    alt="Plus"
                    className="w-10 h-10 mx-auto my-4"
                  />
                  <p className="text-sm text-[#AAAAAA] py-2">
                    {plusPlan?.description}
                  </p>
                </div>
                {plusPlan && renderFeatures(plusPlan.features)}
              </div>
              {user?.subscriptionType == "PLUS" ? (
                <Button
                  variant="outline"
                  className="w-full max-w-[250px] mx-auto shadow border-4 border-emerald-400"
                  disabled
                >
                  Piano attuale
                </Button>
              ) : (
                <Button
                  onClick={() => handleOpenModal(plusPlan)}
                  className="w-full max-w-[250px] mx-auto bg-primary text-white"
                >
                  Acquista – {plusPlan?.monthlyPrice} CHF/mese
                </Button>
              )}
            </div>

            {/* Business */}
            <div className="flex flex-col gap-8">
              <div
                className={cn(
                  "bg-white rounded-xl shadow-lg p-6 pt-7 px-6 md:px-16 border border-black/5 overflow-hidden",
                  isBusinessGrow
                    ? "h-auto md:h-[515px]"
                    : "h-auto md:h-[450px]",
                  "transition-all duration-500"
                )}
              >
                <div className="text-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Business
                  </h3>
                  <Image
                    src={business}
                    alt="Business"
                    className="w-10 h-10 mx-auto my-4"
                  />
                  <p className="text-sm text-[#AAAAAA] py-2">
                    {businessPlan?.description}
                  </p>
                </div>
                <div className="space-y-3 mb-7">
                  {businessPlan?.features
                    ?.slice(0, isBusinessGrow ? undefined : 6)
                    .map((feature: string, i: number) => (
                      <div key={i} className="flex items-center space-x-2">
                        <Check className="w-5 h-5 text-green" />
                        <span className="text-xs">{feature}</span>
                      </div>
                    ))}
                  <div
                    onClick={() => setIsBusinessGrow(!isBusinessGrow)}
                    className={cn(
                      "flex justify-center py-2 cursor-pointer",
                      isBusinessGrow && "rotate-180"
                    )}
                  >
                    <Image src={downArrow} alt="Toggle" className="w-5 h-5" />
                  </div>
                </div>
              </div>
              {user?.subscriptionType == "BUSINESS" ? (
                <Button
                  variant="outline"
                  className="w-full max-w-[250px] mx-auto shadow border-4 border-emerald-400"
                  disabled
                >
                  Piano attuale
                </Button>
              ) : (
                <Button
                  variant="outline"
                  className="w-full max-w-[250px] mx-auto bg-primary text-white"
                  onClick={() => handleOpenModal(businessPlan)}
                >
                  Acquista – {businessPlan?.monthlyPrice} CHF/mese
                </Button>
              )}
            </div>
          </div>

          {/* Current Subscription */}
          <div className="mt-20">
            <p className="text-sm text-text_light_gray mb-5">
              Il tuo abbonamento "{user?.subscriptionType}"
            </p>
            <div className="flex items-center gap-6 mb-2">
              <h4 className="font-semibold text-gray-900 text-xl">
                Bittengo SAGL
              </h4>
              <Image src={plus} alt="Plus" className="w-6 h-6" />
            </div>
            <p className="text-sm text-black">
              Abbonamento {user?.subscriptionType}:
              {user?.subscriptionType == "STANDARD"
                ? "FREE"
                : user?.subscriptionType == "PLUS"
                ? "39 CHF/mese"
                : user?.subscriptionType == "BUSINESS"
                ? "119 CHF/mese"
                : ""}
            </p>
          </div>
        </div>

        <SubscriptionModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          selectedPlan={selectedPlan}
        />
      </div>
    </Elements>
  );
}
