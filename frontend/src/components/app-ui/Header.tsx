import Container from "../common/Container";
import { CustomButtonBlue, CustomButtonGray } from "../common/CustomButton";
import { LuLogIn } from "react-icons/lu";
import GradientText from "../common/GradientText";

export default function Header() {
  return (
    <Container className="py-0">
      <header className="w-full h-16 flex items-center justify-between shadow-sm px-4 fixed z-10 bg-opacity-80 backdrop-blur-sm rounded-md">
        <GradientText className="md:text-3xl text-2xl">Linkify</GradientText>

        <div className="flex items-center gap-2 justify-between">
          <CustomButtonGray className="md:text-[16px]">
            Log in <LuLogIn className="md:size-5" />
          </CustomButtonGray>
          <CustomButtonBlue className="md:text-[16px]">
            Register
          </CustomButtonBlue>
        </div>
      </header>
    </Container>
  );
}
