import CommonDiv from "../common/CommonDiv";
import { CustomButtonBlue } from "../common/CustomButton";
import { GoLink } from "react-icons/go";

export default function LinkShortner() {
  return (
    <CommonDiv className="mt-2 ">
      <div className=" flex items-center justify-center pl-3">
        <GoLink className="md:size-5 " />
        <input
          type="text"
          className="bg-transparent placeholder:text-sm text-sm  text-white/80 focus:outline-none  pl-2 py-1 rounded-full rounded-r-none md:w-sm w-full"
          placeholder="Enter the link here"
        />
      </div>
      <div className="">
        <CustomButtonBlue className="md:text-[14px] py-1.5">
          Shorten Now
        </CustomButtonBlue>
      </div>
    </CommonDiv>
  );
}
