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
import { FormField, FormItem, FormControl, FormMessage } from "../ui/form";

export default function LinkShortner() {
  const form = useForm<z.infer<typeof uriSchema>>({
    resolver: zodResolver(uriSchema),
    defaultValues: {
      longUrl: "",
    },
  });

  function onSubmit(data: z.infer<typeof uriSchema>) {
    toast.success("Shortening the URL...");
    console.log("Submitted URL:", data.longUrl);
  }

  return (
    <CommonDiv className="mt-2 space-y-4">
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center">
          <FormField
            control={form.control}
            name="longUrl"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex items-center justify-center pl-3">
                    <GoLink className="md:size-5 text-white/80" />
                    <Input
                      className="bg-transparent placeholder:text-sm text-sm text-white/80 focus:outline-none pl-2 py-1 rounded-full rounded-r-none md:w-sm w-full border-none focus:ring-0 focus:border-none  focus-visible:ring-0 "
                      placeholder="Enter the link here"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <CustomButtonBlue type="submit" className="md:text-[14px] py-1.5">
              Shorten Now
            </CustomButtonBlue>
          </div>
        </form>
      </FormProvider>
    </CommonDiv>
  );
}
