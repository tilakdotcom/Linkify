import Container from "../common/Container";
import { CustomButtonBlue, CustomButtonGray } from "../common/CustomButton";
import { LuLogIn } from "react-icons/lu";
import GradientText from "../common/GradientText";
import { useNavigate } from "react-router-dom";
import LinkButton from "../common/LinkButton";
import { useTypeSelector } from "@/store/store";

export default function Header() {
  const navigate = useNavigate();
  const { isAuthenticated } = useTypeSelector((state) => state.auth);
  const handleRegister = () => {
    navigate("/register");
  };
  const handleLogin = () => {
    navigate("/login");
  };
  return (
    <Container className="py-0">
      <header className="w-full h-16 flex items-center justify-between shadow-sm px-4  z-10 bg-opacity-80 backdrop-blur-sm rounded-md">
        <LinkButton to="/">
          <GradientText className="md:text-3xl text-2xl">Linkify</GradientText>
        </LinkButton>

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
        {isAuthenticated && (
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
