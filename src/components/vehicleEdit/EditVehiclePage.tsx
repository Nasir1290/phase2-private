// "use client";

// import { Separator } from "@/components/ui/separator";
// import { useState, useEffect, useRef } from "react";
// import { VehicleFormData } from "@/types/vehiclStep";
// import { useRouter } from "next/navigation";
// import {
//   useGetCarBySlugQuery,
//   useUpdateCarDetailsByOwnerMutation,
// } from "@/redux/api/carApi";
// import { toast } from "sonner";
// import EditRegistration from "../adminDashboard/pages/editVehicle/EditRegistration";
// import EditDetails from "../adminDashboard/pages/editVehicle/EditDetails";
// import EditFuel from "../adminDashboard/pages/editVehicle/EditFuel";
// import EditPhotos from "../adminDashboard/pages/editVehicle/EditPhotos";
// import EditDescription from "../adminDashboard/pages/editVehicle/EditDescription";
// import EditPrice from "../adminDashboard/pages/editVehicle/EditPrice";
// import EditAccessori from "../adminDashboard/pages/editVehicle/EditAccessori";
// import EditContact from "../adminDashboard/pages/editVehicle/EditContact";
// import EditAuthentication from "../adminDashboard/pages/editVehicle/EditAuthentication";
// import Loading from "../shared/loading/Loading";
// import FavoritesCard from "../allCards/FavoritesCard";
// import { cn } from "@/lib/utils";

// const steps = [
//   { id: "registrazione", label: "Registrazione", number: 1 },
//   { id: "immagini", label: "Immagini", number: 2 },
//   { id: "descrizione", label: "Descrizione", number: 3 },
//   { id: "prezzo", label: "Prezzo", number: 4 },
//   { id: "accessori", label: "Accessori", number: 5 },
//   { id: "contatto", label: "Contatto", number: 6 },
//   { id: "autenticazione", label: "Autenticazione", number: 7 }, // ← NEW STEP
// ];

// const EditVehiclePage = ({ slug }: { slug: string }) => {
//   const {
//     data: singleCarDetails,
//     isLoading,
//     isError,
//   } = useGetCarBySlugQuery(slug);
//   const carDetails = singleCarDetails?.data;
//   const [updateCar] = useUpdateCarDetailsByOwnerMutation();
//   const router = useRouter();

//   const [formData, setFormData] = useState<VehicleFormData>({
//     category: "",
//     brand: "",
//     model: "",
//     year: 2025,
//     transmission: "",
//     color: "",
//     kmh: 0,
//     engine: "",
//     maxSpeed: 0,
//     horsePower: 0,
//     seats: 0,
//     fuelType: "",
//     otherImages: [],
//     mainImage: null,
//     video: undefined,
//     description: "",
//     deposite: "",
//     depositePolicy: "",
//     fuelPolicy: "",
//     mileagePolicy: "",
//     damagePolicy: "",
//     price: [],
//     accessories: [],
//     advertiserName: "",
//     phoneNumber: "",
//     email: "",
//     whatsapp: "",
//     authenticationFile: null,
//     ownerId: "",
//     location: "",
//     latitude: 0,
//     longitude: 0,
//   });

//   const [activeStep, setActiveStep] = useState(0);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const sectionRefs = useRef<(HTMLElement | null)[]>([]);

//   useEffect(() => {
//     if (carDetails) {
//       let prices = (carDetails?.price || []).filter(
//         (p: any) => p.rentalTime !== 24
//       );

//       const oneDayPrice = carDetails?.oneDayRentalPrice ?? 0;
//       const oneDayKm = carDetails?.oneDayRentalKilometer ?? "";

//       const hasValidOneDay = oneDayPrice > 0 || oneDayKm !== "";

//       const day24Entry = {
//         rentalTime: 24,
//         price: hasValidOneDay ? Number(oneDayPrice) : 0,
//         kilometerPerHour: hasValidOneDay ? String(oneDayKm) : "",
//       };

//       prices = [...prices, day24Entry];
//       prices.sort((a: any, b: any) => a.rentalTime - b.rentalTime);

//       setFormData({
//         category: carDetails.category || "",
//         brand: carDetails.brand || "",
//         model: carDetails.model || "",
//         year: carDetails.year || 2025,
//         transmission: carDetails.transmission || "",
//         color: carDetails.color || "",
//         kmh: carDetails.kmh || 0,
//         engine: carDetails.engine || "",
//         maxSpeed: carDetails.maxSpeed || 0,
//         horsePower: carDetails.horsePower || 0,
//         seats: carDetails.seats || 0,
//         fuelType: carDetails.fuelType || "",
//         otherImages: carDetails.otherImages || [],
//         mainImage: carDetails.mainImage || null,
//         video: carDetails.video || undefined,
//         description: carDetails.description || "",
//         deposite: carDetails.deposite || 0,
//         depositePolicy: carDetails.depositePolicy || "",
//         fuelPolicy: carDetails.fuelPolicy || "",
//         mileagePolicy: carDetails.mileagePolicy || "",
//         damagePolicy: carDetails.damagePolicy || "",
//         price: prices,
//         accessories: carDetails.accessories || [],
//         advertiserName: carDetails.advertiserName || "",
//         phoneNumber: carDetails.phoneNumber || "",
//         email: carDetails.email || "",
//         whatsapp: carDetails.whatsapp || "",
//         authenticationFile: carDetails.authenticationFile || null,
//         ownerId: carDetails.ownerId || "",
//         location: carDetails.location || "",
//         latitude: carDetails.latitude || 0,
//         longitude: carDetails.longitude || 0,
//       });
//     }
//   }, [carDetails]);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             const stepIndex = steps.findIndex((s) => s.id === entry.target.id);
//             if (stepIndex !== -1) setActiveStep(stepIndex);
//           }
//         });
//       },
//       { threshold: 0.4, rootMargin: "-80px 0px -50% 0px" }
//     );

//     sectionRefs.current.forEach((ref) => ref && observer.observe(ref));

//     return () => observer.disconnect();
//   }, []);

//   const scrollToSection = (index: number) => {
//     const target = sectionRefs.current[index];
//     if (target) {
//       target.scrollIntoView({ behavior: "smooth", block: "start" });
//     }
//   };

//   if (isLoading) {
//     return <Loading />;
//   }

//   if (isError || !carDetails) {
//     toast.error("Veicolo non trovato o slug non valido.");
//     router.back();
//     return null;
//   }

//   const handleFormChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
//     >
//   ) => {
//     const { id, value } = e.target;
//     setFormData((prev) => ({ ...prev, [id]: value }));
//   };

//   const handleAccessoriesChange = (name: string, value: any[]) => {
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     try {
//       const formDataToSend = new FormData();

//       formDataToSend.append(
//         "bodyData",
//         JSON.stringify({
//           ownerId: formData.ownerId,
//           category: formData.category,
//           brand: formData.brand,
//           model: formData.model,
//           year: formData.year,
//           transmission: formData.transmission,
//           color: formData.color,
//           kmh: formData.kmh,
//           engine: formData.engine,
//           maxSpeed: formData.maxSpeed,
//           horsePower: formData.horsePower,
//           seats: formData.seats,
//           fuelType: formData.fuelType,
//           description: formData.description,
//           deposite: formData.deposite,
//           depositePolicy: formData.depositePolicy,
//           fuelPolicy: formData.fuelPolicy,
//           mileagePolicy: formData.mileagePolicy,
//           damagePolicy: formData.damagePolicy,
//           accessories: formData.accessories,
//           price: formData.price,
//           advertiserName: formData.advertiserName,
//           phoneNumber: formData.phoneNumber,
//           email: formData.email,
//           whatsapp: formData.whatsapp,
//           location: formData.location,
//           latitude: formData.latitude,
//           longitude: formData.longitude,
//         })
//       );

//       if (formData.mainImage instanceof File) {
//         formDataToSend.append("mainImage", formData.mainImage);
//       }

//       formData.otherImages?.forEach((img) => {
//         if (img instanceof File) {
//           formDataToSend.append("otherImages", img);
//         }
//       });

//       if (formData.authenticationFile instanceof File) {
//         formDataToSend.append(
//           "authenticationFile",
//           formData.authenticationFile
//         );
//       }

//       const result = await updateCar({
//         id: carDetails?.id,
//         data: formDataToSend,
//       }).unwrap();

//       if (result.success) {
//         toast.success("Veicolo aggiornato con successo!");
//         router.push(`/dashboard`);
//         router.refresh();
//       } else {
//         toast.error(result.message || "Aggiornamento fallito");
//       }
//     } catch (error: any) {
//       console.error("Errore update:", error);
//       toast.error(
//         error?.data?.message || error.message || "Errore durante il salvataggio"
//       );
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="min-h-screen pb-20">
//       {/* Sticky Step Progress Header */}
//       <div className="sticky top-0 z-30 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//           <div className="relative flex items-center justify-between">
//             {steps.map((step, idx) => (
//               <div
//                 key={step.id}
//                 className="flex-1 flex flex-col items-center relative cursor-pointer min-w-0"
//                 onClick={() => scrollToSection(idx)}
//               >
//                 {/* Circle + number */}
//                 <div className="relative z-10 mb-2">
//                   <div
//                     className={cn(
//                       "w-9 h-9 rounded-full flex items-center justify-center border-2 shadow-sm text-sm md:text-base font-semibold transition-colors",
//                       idx <= activeStep
//                         ? "border-primary bg-primary text-white"
//                         : "border-gray-300 bg-white text-gray-700"
//                     )}
//                   >
//                     {step.number}
//                   </div>
//                 </div>

//                 {/* Label – above the line */}
//                 <span
//                   className={cn(
//                     "text-[15px] font-medium mb-3 text-center",
//                     idx <= activeStep ? "text-primary" : "text-gray-700"
//                   )}
//                 >
//                   {step.label}
//                 </span>

//                 {/* Connecting line – only between steps */}
//                 {idx < steps.length - 1 && (
//                   <div
//                     className={cn(
//                       "absolute top-[1.125rem] left-[50%] w-[calc(100%-2.25rem)] h-[2px] z-0",
//                       idx + 1 <= activeStep ? "bg-primary" : "bg-gray-200"
//                     )}
//                   />
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Content */}
//       <div className="max-w-5xl mx-auto px-4 pt-8">
//         <FavoritesCard vehicle={carDetails} isFavorite={false} />

//         <form onSubmit={handleSubmit} className="space-y-16 pt-10">
//           <section
//             id="registrazione"
//             ref={(el) => {
//               sectionRefs.current[0] = el;
//             }}
//             className="scroll-mt-40"
//           >
//             <EditRegistration
//               formData={formData}
//               onFormChange={handleFormChange}
//               setFormData={setFormData}
//             />
//             <span className="mt-4">.</span>
//             <EditDetails
//               formData={formData}
//               onFormChange={handleFormChange}
//               setFormData={setFormData}
//             />
//           </section>

//           <section
//             id="immagini"
//             ref={(el) => {
//               sectionRefs.current[1] = el;
//             }}
//             className="scroll-mt-40"
//           >
//             <EditPhotos
//               formData={formData}
//               setFormData={setFormData}
//               carId={carDetails?.id}
//             />
//           </section>

//           <section
//             id="descrizione"
//             ref={(el) => {
//               sectionRefs.current[2] = el;
//             }}
//             className="scroll-mt-40"
//           >
//             <EditDescription
//               formData={formData}
//               onFormChange={handleFormChange}
//               setFormData={setFormData}
//             />
//           </section>

//           <section
//             id="prezzo"
//             ref={(el) => {
//               sectionRefs.current[3] = el;
//             }}
//             className="scroll-mt-40"
//           >
//             <EditPrice formData={formData} setFormData={setFormData} />
//           </section>

//           <section
//             id="accessori"
//             ref={(el) => {
//               sectionRefs.current[4] = el;
//             }}
//             className="scroll-mt-40"
//           >
//             <EditAccessori
//               formData={formData}
//               onFormChange={handleAccessoriesChange}
//             />
//           </section>

//           <section
//             id="contatto"
//             ref={(el) => {
//               sectionRefs.current[5] = el;
//             }}
//             className="scroll-mt-40 space-y-16"
//           >
//             <EditContact formData={formData} onFormChange={handleFormChange} />
//           </section>

//           {/* ─── NEW: Autenticazione section ─── */}
//           <section
//             id="autenticazione"
//             ref={(el) => {
//               sectionRefs.current[6] = el;
//             }}
//             className="scroll-mt-40"
//           >
//             <EditAuthentication formData={formData} setFormData={setFormData} />
//           </section>

//           <Separator className="my-20" />

//           <div className="flex justify-end">
//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className={cn(
//                 "bg-primary text-white py-3 px-12 rounded-lg shadow-lg text-lg font-semibold transition flex items-center gap-3",
//                 isSubmitting
//                   ? "opacity-70 cursor-not-allowed"
//                   : "hover:bg-primary/90"
//               )}
//             >
//               {isSubmitting ? (
//                 <>
//                   <svg
//                     className="animate-spin h-5 w-5 text-white"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                   >
//                     <circle
//                       className="opacity-25"
//                       cx="12"
//                       cy="12"
//                       r="10"
//                       stroke="currentColor"
//                       strokeWidth="4"
//                     />
//                     <path
//                       className="opacity-75"
//                       fill="currentColor"
//                       d="M4 12a8 8 0 018-8v8h8a8 8 0 01-16 0z"
//                     />
//                   </svg>
//                   Salvataggio in corso...
//                 </>
//               ) : (
//                 "Salva modifiche"
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EditVehiclePage;

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";

import { Separator } from "@/components/ui/separator";
import { useState, useEffect, useRef } from "react";
import { VehicleFormData } from "@/types/vehiclStep";
import { useRouter } from "next/navigation";
import {
  useGetCarBySlugQuery,
  useUpdateCarDetailsByOwnerMutation,
} from "@/redux/api/carApi";
import { toast } from "sonner";
import EditRegistration from "../adminDashboard/pages/editVehicle/EditRegistration";
import EditDetails from "../adminDashboard/pages/editVehicle/EditDetails";
import EditFuel from "../adminDashboard/pages/editVehicle/EditFuel";
import EditPhotos from "../adminDashboard/pages/editVehicle/EditPhotos";
import EditDescription from "../adminDashboard/pages/editVehicle/EditDescription";
import EditPrice from "../adminDashboard/pages/editVehicle/EditPrice";
import EditAccessori from "../adminDashboard/pages/editVehicle/EditAccessori";
import EditContact from "../adminDashboard/pages/editVehicle/EditContact";
import EditAuthentication from "../adminDashboard/pages/editVehicle/EditAuthentication";
import Loading from "../shared/loading/Loading";
import FavoritesCard from "../allCards/FavoritesCard";
import { cn } from "@/lib/utils";

const steps = [
  { id: "registrazione", label: "Registrazione", number: 1 },
  { id: "immagini", label: "Immagini", number: 2 },
  { id: "descrizione", label: "Descrizione", number: 3 },
  { id: "prezzo", label: "Prezzo", number: 4 },
  { id: "accessori", label: "Accessori", number: 5 },
  { id: "contatto", label: "Contatto", number: 6 },
  { id: "autenticazione", label: "Autenticazione", number: 7 }, // ← NEW STEP
];

const EditVehiclePage = ({ slug }: { slug: string }) => {
  const {
    data: singleCarDetails,
    isLoading,
    isError,
  } = useGetCarBySlugQuery(slug);
  const carDetails = singleCarDetails?.data;
  const [updateCar] = useUpdateCarDetailsByOwnerMutation();
  const router = useRouter();

  const [formData, setFormData] = useState<VehicleFormData>({
    category: "",
    brand: "",
    model: "",
    year: 2025,
    transmission: "",
    color: "",
    kmh: 0,
    engine: "",
    maxSpeed: 0,
    horsePower: 0,
    seats: 0,
    fuelType: "",
    otherImages: [],
    mainImage: null,
    video: undefined,
    description: "",
    deposite: "",
    depositePolicy: "",
    fuelPolicy: "",
    mileagePolicy: "",
    damagePolicy: "",
    price: [],
    accessories: [],
    advertiserName: "",
    phoneNumber: "",
    email: "",
    whatsapp: "",
    authenticationFile: null,
    ownerId: "",
    location: "",
    latitude: 0,
    longitude: 0,
  });

  const [activeStep, setActiveStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    if (carDetails) {
      let prices = (carDetails?.price || []).filter(
        (p: any) => p.rentalTime !== 24,
      );

      const oneDayPrice = carDetails?.oneDayRentalPrice ?? 0;
      const oneDayKm = carDetails?.oneDayRentalKilometer ?? "";

      const hasValidOneDay = oneDayPrice > 0 || oneDayKm !== "";

      const day24Entry = {
        rentalTime: 24,
        price: hasValidOneDay ? Number(oneDayPrice) : 0,
        kilometerPerHour: hasValidOneDay ? String(oneDayKm) : "",
      };

      prices = [...prices, day24Entry];
      prices.sort((a: any, b: any) => a.rentalTime - b.rentalTime);

      setFormData({
        category: carDetails.category || "",
        brand: carDetails.brand || "",
        model: carDetails.model || "",
        year: carDetails.year || 2025,
        transmission: carDetails.transmission || "",
        color: carDetails.color || "",
        kmh: carDetails.kmh || 0,
        engine: carDetails.engine || "",
        maxSpeed: carDetails.maxSpeed || 0,
        horsePower: carDetails.horsePower || 0,
        seats: carDetails.seats || 0,
        fuelType: carDetails.fuelType || "",
        otherImages: carDetails.otherImages || [],
        mainImage: carDetails.mainImage || null,
        video: carDetails.video || undefined,
        description: carDetails.description || "",
        deposite: carDetails.deposite || 0,
        depositePolicy: carDetails.depositePolicy || "",
        fuelPolicy: carDetails.fuelPolicy || "",
        mileagePolicy: carDetails.mileagePolicy || "",
        damagePolicy: carDetails.damagePolicy || "",
        price: prices,
        accessories: carDetails.accessories || [],
        advertiserName: carDetails.advertiserName || "",
        phoneNumber: carDetails.phoneNumber || "",
        email: carDetails.email || "",
        whatsapp: carDetails.whatsapp || "",
        authenticationFile: carDetails.authenticationFile || null,
        ownerId: carDetails.ownerId || "",
        location: carDetails.location || "",
        latitude: carDetails.latitude || 0,
        longitude: carDetails.longitude || 0,
      });
    }
  }, [carDetails]);

  useEffect(() => {
    if (!carDetails) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = steps.findIndex((s) => s.id === entry.target.id);
            if (index !== -1) {
              setActiveStep(index);
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50% 0px",
      },
    );

    // Use setTimeout to ensure refs are populated
    setTimeout(() => {
      sectionRefs.current.forEach((ref) => {
        if (ref) observer.observe(ref);
      });
    }, 100);

    return () => observer.disconnect();
  }, [carDetails]); // Add dependencies

  const scrollToSection = (index: number) => {
    const target = sectionRefs.current[index];
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError || !carDetails) {
    toast.error("Veicolo non trovato o slug non valido.");
    router.back();
    return null;
  }

  const handleFormChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleAccessoriesChange = (name: string, value: any[]) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();

      formDataToSend.append(
        "bodyData",
        JSON.stringify({
          ownerId: formData.ownerId,
          category: formData.category,
          brand: formData.brand,
          model: formData.model,
          year: formData.year,
          transmission: formData.transmission,
          color: formData.color,
          kmh: formData.kmh,
          engine: formData.engine,
          maxSpeed: formData.maxSpeed,
          horsePower: formData.horsePower,
          seats: formData.seats,
          fuelType: formData.fuelType,
          description: formData.description,
          deposite: formData.deposite,
          depositePolicy: formData.depositePolicy,
          fuelPolicy: formData.fuelPolicy,
          mileagePolicy: formData.mileagePolicy,
          damagePolicy: formData.damagePolicy,
          accessories: formData.accessories,
          price: formData.price,
          advertiserName: formData.advertiserName,
          phoneNumber: formData.phoneNumber,
          email: formData.email,
          whatsapp: formData.whatsapp,
          location: formData.location,
          latitude: formData.latitude,
          longitude: formData.longitude,
        }),
      );

      if (formData.mainImage instanceof File) {
        formDataToSend.append("mainImage", formData.mainImage);
      }

      formData.otherImages?.forEach((img) => {
        if (img instanceof File) {
          formDataToSend.append("otherImages", img);
        }
      });

      if (formData.authenticationFile instanceof File) {
        formDataToSend.append(
          "authenticationFile",
          formData.authenticationFile,
        );
      }

      const result = await updateCar({
        id: carDetails?.id,
        data: formDataToSend,
      }).unwrap();

      if (result.success) {
        toast.success("Veicolo aggiornato con successo!");
        router.push(`/dashboard`);
        router.refresh();
      } else {
        toast.error(result.message || "Aggiornamento fallito");
      }
    } catch (error: any) {
      console.error("Errore update:", error);
      toast.error(
        error?.data?.message ||
          error.message ||
          "Errore durante il salvataggio",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Sticky Step Progress Header */}
      <div className="sticky shadow-sm top-24 z-30 bg-white">
        <div className="mx-auto  py-3">
          <div className="relative flex items-center justify-between">
            {steps.map((step, idx) => (
              <div
                key={step.id}
                className="flex-1 flex flex-col items-center relative cursor-pointer min-w-0"
                onClick={() => scrollToSection(idx)}
              >
                {/* Circle + number */}
                <div className="relative z-10 mb-2">
                  <div
                    className={cn(
                      "w-9 h-9 rounded-full flex items-center justify-center border-2 shadow-sm text-sm md:text-base font-semibold transition-colors",
                      idx === activeStep
                        ? "border-primary bg-primary text-white"
                        : "border-gray-300 bg-white text-gray-700",
                    )}
                  >
                    {step.number}
                  </div>
                </div>

                {/* Label – above the line */}
                <span
                  className={cn(
                    "text-[15px] font-medium mb-3 text-center",
                    idx === activeStep ? "text-primary" : "text-gray-700",
                  )}
                >
                  {step.label}
                </span>

                {/* Connecting line – only between steps */}
                {idx < steps.length - 1 && (
                  <div className="absolute top-[1.125rem] left-[50%] w-[calc(100%-2.25rem)] h-[2px] z-0 bg-gray-200" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto pt-8">
        <FavoritesCard vehicle={carDetails} isFavorite={false} />

        <form onSubmit={handleSubmit} className="space-y-16 pt-10">
          <section
            id="registrazione"
            ref={(el) => {
              sectionRefs.current[0] = el;
            }}
            className="scroll-mt-48"
          >
            <EditRegistration
              formData={formData}
              onFormChange={handleFormChange}
              setFormData={setFormData}
            />
            <span className="mt-4">.</span>
            <EditDetails
              formData={formData}
              onFormChange={handleFormChange}
              setFormData={setFormData}
            />
          </section>

          <section
            id="immagini"
            ref={(el) => {
              sectionRefs.current[1] = el;
            }}
            className="scroll-mt-48"
          >
            <EditPhotos
              formData={formData}
              setFormData={setFormData}
              carId={carDetails?.id}
            />
          </section>

          <section
            id="descrizione"
            ref={(el) => {
              sectionRefs.current[2] = el;
            }}
            className="scroll-mt-48"
          >
            <EditDescription
              formData={formData}
              onFormChange={handleFormChange}
              setFormData={setFormData}
            />
          </section>

          <section
            id="prezzo"
            ref={(el) => {
              sectionRefs.current[3] = el;
            }}
            className="scroll-mt-48"
          >
            <EditPrice formData={formData} setFormData={setFormData} />
          </section>

          <section
            id="accessori"
            ref={(el) => {
              sectionRefs.current[4] = el;
            }}
            className="scroll-mt-48"
          >
            <EditAccessori
              formData={formData}
              onFormChange={handleAccessoriesChange}
            />
          </section>

          <section
            id="contatto"
            ref={(el) => {
              sectionRefs.current[5] = el;
            }}
            className="scroll-mt-48 space-y-16"
          >
            <EditContact formData={formData} onFormChange={handleFormChange} />
          </section>

          {/* ─── NEW: Autenticazione section ─── */}
          <section
            id="autenticazione"
            ref={(el) => {
              sectionRefs.current[6] = el;
            }}
            className="scroll-mt-48 "
          >
            <EditAuthentication formData={formData} setFormData={setFormData} />
          </section>

          <Separator className="my-20" />

          {/* <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className={cn(
                "bg-primary text-white py-3 px-12 rounded-lg shadow-lg text-lg font-semibold transition flex items-center gap-3",
                isSubmitting
                  ? "opacity-70 cursor-not-allowed"
                  : "hover:bg-primary/90"
              )}
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8h8a8 8 0 01-16 0z"
                    />
                  </svg>
                  Salvataggio in corso...
                </>
              ) : (
                "Salva modifiche"
              )}
            </button>
          </div> */}

          <div className="fixed bottom-6 right-6 z-40 md:bottom-8 md:right-10">
            <button
              type="submit"
              // form="vehicle-edit-form"
              disabled={isSubmitting}
              className={cn(
                "flex items-center text-white justify-center gap-2 px-5 py-2 md:px-7 md:py-3 rounded-md font-medium text-base shadow-sm transition-all duration-200",
                isSubmitting
                  ? "bg-primary/70 cursor-not-allowed"
                  : "bg-primary hover:bg-primary/95 active:scale-95 shadow-primary/35 hover:shadow-primary/50",
              )}
            >
              {isSubmitting ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8h8a8 8 0 01-16 0z"
                  />
                </svg>
              ) : (
                <>
                  <span className="hidden md:inline">Salva modifiche</span>
                  <span className="md:hidden">Salva</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditVehiclePage;
