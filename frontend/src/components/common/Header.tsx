import Container from "./Container";
import { CustomButtonBlue, CustomButtonGray } from "./CustomButton";

export default function Header() {
  return (
    <Container className="py-3">
      <header className="w-full h-16 flex items-center justify-between shadow-sm px-4">
        <div className="md:text-3xl text-2xl font-bold cursor-pointer bg-gradient-to-r from-pink-600 via-indigo-500 to-blue-500 bg-clip-text text-transparent hover:via-70% ">
          Linkify
        </div>
        <div className="flex items-center gap-2 justify-between">
          <CustomButtonGray>Log in</CustomButtonGray>
          <CustomButtonBlue>Register Now</CustomButtonBlue>
        </div>
      </header>
    </Container>
  );
}
