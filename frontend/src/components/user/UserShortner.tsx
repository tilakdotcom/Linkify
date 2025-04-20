import { GoQuestion } from "react-icons/go";
import LinkShortner from "../app-ui/LinkShortner";
import GradientText from "../common/GradientText";

export default function UserShortner() {
  return (
    <section
      id="hero"
      className="flex flex-col items-center justify-center space-y-6"
    >
      <GradientText className="md:text-5xl text-3xl font-bold text-center tracking-wide max-w-4xl leading-[1.2] pb-0">
        Welcome back! Ready to shorten some links with Linkify?
      </GradientText>

      <p className="text-gray-500 text-[16.5px] font-normal text-center max-w-2xl">
        Create short, shareable links and track every click. Linkify helps you
        manage your URLs with ease and precision.
      </p>

      {/* Link shortener input */}
      <LinkShortner />

      {/* Usage info for logged-in user */}
      <p className="text-gray-400 text-[13.5px] font-normal text-center max-w-2xl flex gap-x-1 items-center">
        You can create{" "}
        <span className="font-bold text-green-600 text-[14px]"> multi </span>
        links.
        <GoQuestion title="Link limit resets daily for free users." />
      </p>
    </section>
  );
}
