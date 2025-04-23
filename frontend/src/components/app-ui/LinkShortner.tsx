import CommonDiv from "../common/CommonDiv";
import { CustomButtonBlue } from "../common/CustomButton";
import { GoLink } from "react-icons/go";
import { uriSchema } from "@/common/schemas/url";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { FormProvider } from "react-hook-form";
import { Input } from "../ui/input";
import { FormField, FormItem, FormControl } from "../ui/form";

export default function LinkShortner() {
  const form = useForm<z.infer<typeof uriSchema>>({
    resolver: zodResolver(uriSchema),
    defaultValues: {
      longUrl: "",
    },
  });

  const {
    formState: { errors },
  } = form;

  function onSubmit(data: z.infer<typeof uriSchema>) {
    toast.success("Shortening the URL...");
    console.log("Submitted URL:", data.longUrl);
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-1">
      <CommonDiv className="mt-2 ">
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex items-center"
          >
            <FormField
              control={form.control}
              name="longUrl"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center justify-center pl-3">
                      <GoLink className="md:size-5 text-white/80" />
                      <Input
                        autoComplete="off"
                        className={`bg-transparent hover:bg-transparent placeholder:text-sm text-sm text-white/80 focus:outline-none pl-2 py-1 rounded-full rounded-r-none md:w-sm w-full border-none focus:ring-0 focus:border-none  focus-visible:ring-0 `}
                        placeholder="Enter the link here"
                        {...field}
                      />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            <div>
              <CustomButtonBlue
                disabled={errors.longUrl?.message ? true : false}
                type="submit"
                className={`md:text-[14px] py-1.5 ${
                  errors.longUrl?.message
                    ? "cursor-not-allowed bg-blue-500 hover:bg-blue-500"
                    : ""
                } `}
              >
                Shorten Now
              </CustomButtonBlue>
            </div>
          </form>
        </FormProvider>
      </CommonDiv>

      <div className="text-red-500 text-xs">
        {errors.longUrl?.message && errors.longUrl.message}
        {!errors.longUrl?.message && <span>&nbsp;</span>}
      </div>
    </div>
  );
}
