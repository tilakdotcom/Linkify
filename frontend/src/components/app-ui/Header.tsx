import Container from "../common/Container";
import { CustomButtonBlue, CustomButtonGray } from "../common/CustomButton";
import { LuLogIn } from "react-icons/lu";
import GradientText from "../common/GradientText";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const handleRegister = () => {
    navigate("/register");
  };
  return (
    <Container className="py-0">
      <header className="w-full h-16 flex items-center justify-between shadow-sm px-4  z-10 bg-opacity-80 backdrop-blur-sm rounded-md">
        <GradientText className="md:text-3xl text-2xl">Linkify</GradientText>

        <div className="flex items-center gap-2 justify-between">
          <CustomButtonGray className="md:text-[16px]">
            Log in <LuLogIn className="md:size-5" />
          </CustomButtonGray>
          <CustomButtonBlue
            navigateTo={handleRegister}
            className="md:text-[16px]"
          >
            Register
          </CustomButtonBlue>
        </div>
      </header>
    </Container>
  );
}
