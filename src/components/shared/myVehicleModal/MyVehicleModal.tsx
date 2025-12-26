/* eslint-disable @typescript-eslint/no-explicit-any */
import { Separator } from "@/components/ui/separator";
import { useDeleteCarMutation, useUpdateCarStatusMutation } from "@/redux/api/carApi";
import Image from "next/image";
import { toast } from "sonner";

type MyVehicleModalProps = {
  isOpen: boolean;
  toggleModal: () => void;
  title: string;
  mainImage: string;
  model: string;
  brand: string;
  logo: string;
  description: string;
  confirmButtontext: string;
  vehicleId: string;
  currentStatus: string;
};

const MyVehicleModal: React.FC<MyVehicleModalProps> = ({
  isOpen,
  toggleModal,
  title,
  mainImage,
  model,
  brand,
  logo,
  description,
  confirmButtontext,
  vehicleId,
  currentStatus,
}) => {
  const [updateCarStatus] = useUpdateCarStatusMutation();
  const [deleteCar] = useDeleteCarMutation();

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteCar({
        id,
      }).unwrap();

      if (res.success) {
        toast.success(res.message || `Car deleted successfully!`);
      } else {
        toast.error(res.message || `Failed to delete car. Please try again.`);
      }
    } catch (error: any) {
      toast.error(error?.data?.message || `Failed to delete car. Please try again.`);
    }
  };

  const handleStatusChange = async () => {
    const newStatus = currentStatus === "ACTIVE" ? "SUSPEND" : "ACTIVE";

    try {
      const res = await updateCarStatus({
        id: vehicleId,
        carStatus: newStatus,
      }).unwrap();

      if (res.success) {
        toast.success(`Car status updated to ${newStatus}`);
      } else {
        toast.error(`Failed to update car status: ${res.message || "Please try again."}`);
      }

      toggleModal();
    } catch (error: any) {
      console.error("Failed to update car status", error);
      toast.error(`Error: ${error?.data?.message || "Please try again."}`);
    }
  };

  if (!isOpen) return null;

  const handleAction = () => {
    if (confirmButtontext === "Si, rimuovi") {
      handleDelete(vehicleId);
    } else if (confirmButtontext === "Si, sospendi" || confirmButtontext === "Sì, attivo") {
      handleStatusChange();
    }
  };
  const truncatedDescription = description.split(" ").slice(0, 20).join(" ");
  return (
    <div className="fixed inset-0 bg-footer_bg/50 flex justify-center items-center z-50 overflow-auto py-4" onClick={toggleModal}>
      <div className="bg-white p-4 md:px-9 md:py-7 rounded-xl w-full max-w-[600px] mx-4 relative" onClick={(e) => e.stopPropagation()}>
        <button onClick={toggleModal} className="absolute top-3 right-5 text-3xl text-text_light_gray hover:text-primary">
          &times;
        </button>
        <div className="space-y-4">
          <div className="flex flex-col items-start gap-3">
            <h2 className="text-xl md:text-[22px] font-semibold text-start md:mb-5">{title}</h2>
            <div className="flex flex-col sm:flex-row items-start gap-6">
              {/* Main Image Container - Fixed size */}
              <div className="w-full sm:w-48 h-28 sm:h-28 flex-shrink-0">
                <Image
                  src={mainImage}
                  alt="Main Image"
                  width={1000}
                  height={1000}
                  className="w-full h-20 rounded-xl object-cover"
                  style={{
                    maxWidth: "100%",
                    height: "120px",
                  }}
                />
              </div>

              {/* Content Section */}
              <div className="space-y-4 flex-1 min-w-0">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 md:w-8 md:h-8 flex-shrink-0">
                    <Image src={logo} alt="logo" width={32} height={32} className="w-full h-full object-contain" />
                  </div>
                  <h2 className="font-medium text-base md:text-xl truncate">{brand + " " + model}</h2>
                </div>
                <p className="text-sm text-text_light_gray break-words">{truncatedDescription}...</p>
              </div>
            </div>
          </div>

          <Separator className="mt-8 mb-6" />

          <div className="mt-4 flex justify-between gap-3">
            <button
              onClick={toggleModal}
              className="w-36 bg-white py-2 border border-gray-100 shadow-lg text-sm px-4 rounded-md flex items-center justify-center space-x-2 font-medium"
            >
              NO
            </button>
            <button
              onClick={handleAction}
              className="w-36 bg-primary text-white text-center py-2 shadow-lg text-sm px-4 rounded-md flex items-center justify-center space-x-2 font-medium"
            >
              {confirmButtontext}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyVehicleModal;
