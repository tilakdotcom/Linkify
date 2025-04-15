import LinkShortner from "@/components/app-ui/LinkShortner";
import Container from "@/components/common/Container";
import GradientText from "@/components/common/GradientText";

export default function HomePage() {
  return (
    <>
      <Container>
        {/* hero section */}
        <section
          id="home"
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
        </section>
      </Container>
    </>
  );
}
