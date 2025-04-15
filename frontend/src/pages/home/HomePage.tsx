import { rootBG } from "@/assets";
import Container from "@/components/common/Container";

export default function HomePage() {
  return (
    <>
      <Container>
        <div
          className={`w-full relative bg-no-repeat bg-cover h-[500px] rounded-xl overflow-hidden`}
          style={{
            backgroundImage: `url(${rootBG})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          Hello world!
        </div>
        {/* <img src={rootBG} alt="" /> */}
      </Container>
    </>
  );
}
