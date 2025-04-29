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
import { useAppDispatch, useTypeSelector } from "@/store/store";
import { setShortUrl, shortenUrl, shortenUrlForUser } from "@/store/auth/uri";
import { useState } from "react";
import { frontendUri } from "@/common/lib/getEnv";
import { TbCopy, TbCopyCheck } from "react-icons/tb";
import { setPublicAccessWithLimit } from "@/store/auth/authSlice";
import { PUBLIC_ACCESS_LIMIT } from "@/common/constant";

export default function LinkShortner() {
  const dispatch = useAppDispatch();
  const { shortUrl, isLoading } = useTypeSelector((state) => state.uriRequest);
  const { user, publicAccessWithLimit } = useTypeSelector(
    (state) => state.auth
  );
  const [copied, setCopied] = useState<string>("");

  const form = useForm<z.infer<typeof uriSchema>>({
    resolver: zodResolver(uriSchema),
    defaultValues: {
      longUrl: "",
    },
  });

  const {
    formState: { errors },
  } = form;

  const isAccessLimited = publicAccessWithLimit < PUBLIC_ACCESS_LIMIT;

  async function onSubmit(data: z.infer<typeof uriSchema>) {
    if (isAccessLimited) {
      toast.success("Shortening the URL...");
      const longUrl = data.longUrl;
      const shortner =
        user != null ? shortenUrlForUser(longUrl) : shortenUrl(longUrl);
      const result = await dispatch(shortner);
      if (shortenUrl.fulfilled.match(result)) {
        toast.success("URL shortened successfully!");
        dispatch(setPublicAccessWithLimit());
        dispatch(setShortUrl(result.payload?.data?.shortLink as string));
      } else if (shortenUrl.rejected.match(result)) {
        toast.error("Error shortening URL. Please try again.");
      }
    } else {
      toast.error("You have reached the limit of shortening URLs.");
      toast.error(
        `You can shorten ${PUBLIC_ACCESS_LIMIT} links. Please login to shorten more links.`
      );
      form.reset();
      return;
    }
  }

  const updateUri = frontendUri + shortUrl.toString();

  const handleOnCopy = () => {
    if (copied === updateUri) return;
    if (copied !== "") {
      clearTimeout(0);
    }

    navigator.clipboard.writeText(updateUri);
    setCopied(updateUri);
    toast.success("URL copied");
    setTimeout(() => {
      setCopied("");
    }, 3000);
  };

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
                        className={`bg-transparent hover:bg-transparent sm:placeholder:text-sm sm:text-sm text-white/80 text-xs placeholder:text-xs focus:outline-none pl-2 py-1 rounded-full rounded-r-none md:w-sm w-full border-none focus:ring-0 focus:border-none  focus-visible:ring-0 `}
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
                disabled={errors.longUrl?.message || isLoading ? true : false}
                type="submit"
                className={`md:text-[14px] text-xs py-1.5 ${
                  errors.longUrl?.message
                    ? "cursor-not-allowed bg-blue-600 hover:bg-blue-600"
                    : ""
                }
                ${isLoading ? "cursor-not-allowed" : ""}     
               `}
              >
                Shorten
              </CustomButtonBlue>
            </div>
          </form>
        </FormProvider>
      </CommonDiv>

      <div className="text-red-500 text-xs">
        {errors.longUrl?.message && errors.longUrl.message}
        {!errors.longUrl?.message && <span>&nbsp;</span>}
        <div className="text-white/80 text-xs md:text-sm -mt-1 ">
          {shortUrl && (
            <span
              onClick={handleOnCopy}
              className="text-green-500 font-semibold sm:flex-row gap-1
              items-center flex-col flex cursor-pointer"
            >
              <span> Shortened URL:</span>
              {`${frontendUri}${shortUrl}`}
              {copied === updateUri ? (
                <TbCopyCheck className="md:size-5 font-semibold" />
              ) : (
                <TbCopy
                  onClick={handleOnCopy}
                  className="md:size-5 font-semibold"
                />
              )}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
