import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  useChangePasswordMutation,
  useGetMyProfileQuery,
} from "@/redux/api/authApi";
import { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { toast } from "sonner";

const Sicurezza = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { data: getProfile } = useGetMyProfileQuery({});
  const userId = getProfile?.data?.id;

  const [changePassword] = useChangePasswordMutation();

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  // Handle password change submission
  const handleSubmit = async () => {
    if (newPassword !== confirmPassword) {
      setError("Le password non corrispondono!");
    } else {
      setError("");

      const formObject = {
        oldPassword,
        newPassword,
        userId,
      };

      try {
        const res = await changePassword(formObject).unwrap();

        if (res?.success) {
          toast.success("Password changed successfully");
        } else {
          toast.error("An error occurred while updating the password");
        }
      } catch (error) {
        const apiError = (
          error as {
            data?: {
              message?: string;
              errorMessages?: { message: string }[];
            };
          }
        )?.data;

        const errorMessage =
          apiError?.errorMessages?.map((err) => err.message).join(", ") ||
          apiError?.message ||
          "An unexpected error occurred";

        toast.error(errorMessage);
      }
    }
  };

  return (
    <div className="py-4 space-y-16 xl:space-y-24 pt-12">
      <div>
        <h2 className="text-2xl font-bold mb-2">Modifica password</h2>
        <p className="text-sm mb-8 text-text_light_gray">
          Aggiorna le tue credenziali in modo rapido e sicuro
        </p>
        {/* Password Update Section */}
        <div className=" space-y-8 my-20">
          {/* Old Password */}
          <div className="space-y-4 relative">
            <Label
              htmlFor="password"
              className="text-[15px] text-text_default font-normal"
            >
              Password attuale
            </Label>
            <div className="relative w-full max-w-md">
              <Input
                type={showPassword ? "text" : "password"}
                id="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="md:min-w-[560px] border px-4 w-full mb-4 py-6 rounded-xl shadow-md"
              />
              {/* Toggle Icon */}
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-4 md:left-[515px] top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showPassword ? (
                  <IoEyeOutline size={20} />
                ) : (
                  <IoEyeOffOutline size={20} />
                )}
              </button>
            </div>
          </div>

          <div className="flex gap-5 md:gap-20 w-full">
            {/* New Password */}
            <div className="space-y-4 w-full relative">
              <Label
                htmlFor="new-password"
                className="text-[15px] text-text_default font-normal"
              >
                Nuova password
              </Label>
              <div className="relative">
                <Input
                  type={showNewPassword ? "text" : "password"}
                  id="new-password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="border px-4 xl:min-w-[560px] w-full mb-4 py-6 rounded-xl shadow-md"
                />
                {/* Toggle Icon */}
                <button
                  type="button"
                  onClick={() => setShowNewPassword((prevState) => !prevState)}
                  className="absolute right-4 xl:left-[515px] top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  {showNewPassword ? (
                    <IoEyeOutline size={20} />
                  ) : (
                    <IoEyeOffOutline size={20} />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-4 w-full relative">
              <Label
                htmlFor="confirm-password"
                className="text-[15px] text-text_default font-normal"
              >
                Conferma password
              </Label>
              <div className="relative">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirm-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="border px-4 w-full mb-4 py-6 rounded-xl shadow-md"
                />
                {/* Toggle Icon */}
                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword((prevState) => !prevState)
                  }
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  {showConfirmPassword ? (
                    <IoEyeOutline size={20} />
                  ) : (
                    <IoEyeOffOutline size={20} />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <Separator />
        {/* Save Button */}
        <div className="flex justify-end pt-4 mt-10">
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-red text-white px-12 py-2 font-medium text-sm rounded-sm"
          >
            SALVA
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sicurezza;
