import Container from "../common/Container";
import { CustomButtonBlue, CustomButtonGray } from "../common/CustomButton";
import { LuLogIn } from "react-icons/lu";
import GradientText from "../common/GradientText";
import { useNavigate } from "react-router-dom";
import LinkButton from "../common/LinkButton";
import { useAppDispatch, useTypeSelector } from "@/store/store";
import { logoutUser } from "@/store/auth/authSlice";
import toast from "react-hot-toast";

export default function Header() {
  const navigate = useNavigate();
  const { isAuthenticated } = useTypeSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const handleRegister = () => {
    navigate("/register");
  };
  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      toast.success("Logged out successfully!");
      navigate("/login");
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message || "Logout failed! Please try again.");
      } else {
        toast.error("Logout failed! Please try again.");
      }
    }
  };

  return (
    <Container className="py-0">
      <header className="w-full h-16 flex items-center justify-between shadow-sm px-4  z-10 bg-opacity-80 backdrop-blur-sm rounded-md">
        <LinkButton to="/">
          <GradientText className="md:text-3xl text-2xl">Linkify</GradientText>
        </LinkButton>

        {isAuthenticated && (
          <div className="flex items-center gap-2 justify-between">
            <CustomButtonGray
              className="md:text-[15px] hover:to-red-500 hover:from-red-600 "
              navigateTo={handleLogout}
            >
              Logout <LuLogIn className="md:size-4" />
            </CustomButtonGray>
          </div>
        )}

        {!isAuthenticated && (
          <div className="flex items-center gap-2 justify-between">
            <CustomButtonGray
              className="md:text-[15px]"
              navigateTo={handleLogin}
            >
              Log in <LuLogIn className="md:size-4" />
            </CustomButtonGray>
            <CustomButtonBlue
              navigateTo={handleRegister}
              className="md:text-[15px]"
            >
              Register
            </CustomButtonBlue>
          </div>
        )}
      </header>
    </Container>
  );
}
