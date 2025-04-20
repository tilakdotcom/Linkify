import { development } from "@/assets";

const UnderDevelopment = () => {
  return (
    <div className="flex flex-col items-center justify-center  text-center py-5 gap-y-2">
      <img src={development} alt="Under Development" className="w-64 h-auto" />
      <h2 className="md:text-3xl text-xl font-bold ">
        This Area is Under Development
      </h2>
      <p className="mt-3 text-gray-400 max-w-md">
        We're currently building this section. Stay tuned for something awesome!
      </p>
    </div>
  );
};

export default UnderDevelopment;
