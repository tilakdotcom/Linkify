import LinkShortner from "@/components/app-ui/LinkShortner";
import Container from "@/components/common/Container";
import GradientText from "@/components/common/GradientText";
import { GoQuestion } from "react-icons/go";
import { IoArrowDownSharp } from "react-icons/io5";

export default function HomePage() {
  return (
    <>
      <Container>
        {/* hero section */}
        <section
          id="hero"
          className="flex flex-col items-center justify-center space-y-6"
        >
          <GradientText className="md:text-5xl text-3xl font-bold text-center tracking-wide max-w-4xl leading-[1.2] pb-0">
            Shorten your links and track your clicks with Linkify :)
          </GradientText>
          <p className="text-gray-500 text-[16.5px] font-normal text-center max-w-2xl ">
            Linkify is a URL shortening service that allows you to create short
            links for your long URLs. You can also track the number of clicks on
            your short links.
          </p>
          {/* link shortner  */}
          <LinkShortner />
          {/* inform */}
          <p className="text-gray-400 text-[13.5px] font-normal text-center max-w-2xl flex gap-x-1 items-center">
            You can create{" "}
            <span className="font-bold text-pink-600 text-[14px]"> 05 </span>{" "}
            more links. Register Now to enjoy unlimited usages{" "}
            <GoQuestion title="These rules are important" />
          </p>
        </section>

        {/* example links */}
        <section
          id="try"
          className="flex flex-col items-center justify-center py-5"
        >
          <div className="flex flex-col items-center justify-center space-y-2">
            <p> Try our Shorten links </p>
            <span>
              <IoArrowDownSharp className="size-6 animate-bounce "/>
            </span>
          </div>
        </section>
      </Container>
    </>
  );
}
