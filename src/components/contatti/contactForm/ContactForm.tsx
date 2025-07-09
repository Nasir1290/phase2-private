"use client";

import { SharedButton } from "@/components/shared/sharedButton/SharedButton";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import SuccessModal from "@/components/shared/modal/SuccessModal";
import { useCreateContactMutation } from "@/redux/api/contactApi";

const ContactForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [createContact] = useCreateContactMutation();
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Use the FormData API to extract all form data
    const formData = new FormData(e.target as HTMLFormElement);

    // Add the selected subject to the form data
    if (selectedSubject) {
      formData.append("subject", selectedSubject);
    }

    // Convert the FormData to an object for easier logging
    const formObject: Record<string, string> = {};
    formData.forEach((value, key) => {
      formObject[key] = value.toString();
    });

    try {
      // Trigger the API call to submit the form data
      const response = await createContact(formObject).unwrap();

      // Check if the response is successful
      if (response.success) {
        // Open the success modal if the response indicates success
        setIsModalOpen(true);
      } else {
        // Optionally, handle the case where the API call doesn't indicate success
        console.error("Failed to send email:", response.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  // Handle subject selection
  const handleSubjectClick = (subject: string) => {
    setSelectedSubject(subject);
  };

  // Handle modal toggle
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="w-full space-y-10 sm:space-y-20">
      <div className="container mx-auto w-full flex gap-3 justify-between">
        {/* Subject Options */}
        {["Supporto clienti", "Multe e pedaggi", "Rimborso deposito"].map(
          (subject) => (
            <p
              key={subject}
              className={`text-[12px] sm:text-sm md:text-base font-medium underline cursor-pointer ${
                selectedSubject === subject ? "text-red" : ""
              }`}
              onClick={() => handleSubjectClick(subject)}
            >
              {subject}
            </p>
          )
        )}
      </div>

      <div className="mx-auto w-full sm:min-w-[400px] max-w-[500px] flex justify-center items-center">
        <div className="p-5 md:p-8 border rounded-xl shadow-xl space-y-5 w-full items-end">
          <h2 className="font-bold text-xl mb-8">Invia un messaggio</h2>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-7">
            {/* Nome e cognome */}
            <div className="grid w-full items-center gap-3">
              <Label htmlFor="name" className="font-medium">
                Nome e cognome
              </Label>
              <Input
                type="text"
                id="name"
                name="name"
                className="shadow-md focus:shadow-red/10 rounded-lg w-full border"
              />
            </div>

            {/* Email */}
            <div className="grid w-full  items-center gap-3">
              <Label htmlFor="email" className="font-medium">
                Email
              </Label>
              <Input
                type="email"
                id="email"
                name="email"
                className="shadow-md focus:shadow-red/10 rounded-lg w-full border"
              />
            </div>

            {/* Numero di telefono */}
            <div className="grid w-full items-center gap-3">
              <Label htmlFor="phone" className="font-medium">
                Numero di telefono
                <span className="text-xs text-text_light_gray">
                  {"   "}
                  (facoltativo)
                </span>
              </Label>
              <Input
                type="text"
                id="phone"
                name="phone"
                className="shadow-md focus:shadow-red/10 rounded-lg w-full border"
              />
            </div>

            {/* Messaggio */}
            <div className="grid w-full gap-3">
              <Label htmlFor="message" className="font-medium">
                Messaggio
              </Label>
              <Textarea
                id="message"
                name="message"
                className="shadow-md focus:shadow-red/10 rounded-lg w-full"
              />
            </div>

            {/* Submit Button */}
            <SharedButton text="INVIA MESSAGGIO" cls="w-full" />
          </form>
        </div>
        {/* Success Modal */}
        <SuccessModal
          isOpen={isModalOpen}
          toggleModal={toggleModal}
          messages={{
            title: "Messaggio inoltrato correttamente",
            description:
              "Il tuo messaggio è stato inoltrato con successo. Il nostro team ti contatterà al più presto per fornirti tutte le informazioni di cui hai bisogno.",
          }}
        />
      </div>
    </div>
  );
};

export default ContactForm;
