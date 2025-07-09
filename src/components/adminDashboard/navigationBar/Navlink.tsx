import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoLogOut } from "react-icons/io5";
import logo from "@/assets/logo/blacklogo.svg";
import { useLogoutMutation } from "@/redux/api/authApi";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { removeUser } from "@/redux/slice/userSlice";
import { toast } from "sonner";
import Cookies from "js-cookie";

// Define a type for a NavLink item
interface NavLink {
  name: string;
  href: string;
  icon: React.ElementType;
}

export default function MainNavLink({
  user,
  navLink,
}: {
  user?: { name: string; role: string; image: string } | null;
  navLink: NavLink[];
}) {
  const pathname = usePathname();
  const [logout] = useLogoutMutation();
  const router = useRouter();
  const dispatch = useDispatch();

  const isActive = (href: string) => {
    const cleanHref = href.split("?")[0];
    const cleanPathname = pathname.split("?")[0];

    if (cleanHref === "/dashboard") {
      return cleanPathname === "/dashboard";
    }

    return cleanPathname.startsWith(cleanHref);
  };

  const handleLogout = async () => {
    try {
      const res = await logout({}).unwrap();

      if (res?.success) {
        // Remove token
        Cookies.remove("accessToken");

        // Clear Redux state
        dispatch(removeUser());

        // Redirect to login
        router.push("/login");

        // Success message
        toast.success("User logged out successfully");
      } else {
        throw new Error(res?.message || "Logout failed");
      }
    } catch (error) {
      console.error("Logout Error:", error);

      // Handle API errors properly
      const apiError = (
        error as {
          data?: { message?: string; errorMessages?: { message: string }[] };
        }
      )?.data;

      const errorMessage =
        apiError?.errorMessages?.map((err) => err.message).join(", ") ||
        apiError?.message ||
        "Failed to logout. Please try again.";

      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Link href={"/"} className="px-8 py-6 pb-10 lg:py-0 h-8 lg:h-20">
        <Image
          src={logo}
          alt="logo"
          width={200}
          height={200}
          className="w-36 lg:w-40 lg:h-24"
        />
      </Link>
      <nav className="flex-1 px-4 py-6">
        <div className="space-y-1">
          {navLink?.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-3 px-3 py-3 rounded-md text-[15px] ${
                isActive(link.href)
                  ? "border border-red/20 bg-red/5 text-black shadow"
                  : "hover:shadow hover:shadow-red/20"
              }`}
            >
              <div className="rounded">
                <link.icon className="min-w-6 min-h-6" />
              </div>
              {link.name}
            </Link>
          ))}
        </div>
      </nav>
      <div className="mt-auto px-4 space-y-1">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-3 rounded-md cursor-pointer text-black"
        >
          <IoLogOut className="min-w-6 min-h-6" />
          Log Out
        </button>

        {/* Profile Section */}
        {user ? (
          <div className="flex items-center gap-3 px-3 py-3 mt-4">
            <Image
              src={user.image || "/path/to/default/profile.jpg"}
              alt="Profile"
              width={40}
              height={40}
              className="rounded-full"
            />
            <div className="flex-1">
              <div className="font-medium">{user.name}</div>
              <div className="text-xs text-gray-500">{user.role}</div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center px-3 py-3 mt-4"></div>
        )}
      </div>
    </div>
  );
}
