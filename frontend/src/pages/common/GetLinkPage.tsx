import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CustomButtonBlue } from "@/components/common/CustomButton";
import { useAppDispatch, useTypeSelector } from "@/store/store";
import { getShortUrl } from "@/store/auth/uri";
import toast from "react-hot-toast";

export default function RedirectPage() {
  const navigate = useNavigate();
  const { isLoading, error } = useTypeSelector((state) => state.uriRequest);
  const dispatch = useAppDispatch();
  const { short } = useParams<{ short: string }>();

  useEffect(() => {
    const fetchLongUrl = async () => {
      const result = await dispatch(getShortUrl(short as string));

      if (getShortUrl.fulfilled.match(result)) {
        const longLink = result.payload?.data?.longLink;
        if (longLink) {
          window.location.href = longLink;
        } else {
          toast.error("Invalid redirect URL.");
        }
      } else if (getShortUrl.rejected.match(result)) {
        console.error(result);
      }
    };

    fetchLongUrl();
  }, [dispatch, short]);

  if (isLoading && !error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
        <div className="flex flex-col items-center space-y-6">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-xl font-medium text-gray-300 animate-pulse">
            Redirecting you shortly...
          </p>
          <p className="text-sm text-gray-400 max-w-md text-center">
            You'll be automatically redirected to your destination in a moment
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-4 text-center">
        <div className="md:max-w-md w-full bg-gray-800 rounded-xl shadow-2xl p-8 border border-gray-700 items-center flex flex-col">
          <h1 className="sm:text-4xl text-sl font-bold text-red-500 mb-4">
            404 - Link Not Found
          </h1>
          <p className="sm:text-lg text-sm text-gray-300 mb-6">
            Oops! The link you're trying to access is either broken, expired, or
            never existed.
          </p>
          <CustomButtonBlue
            navigateTo={() => navigate("/")}
            className="md:text-[15px]"
          >
            ← Back to Home
          </CustomButtonBlue>
        </div>
      </div>
    );
  }

  // This should not normally render, but keeping as fallback
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <p className="text-lg animate-pulse text-gray-300">
        Redirecting to your destination...
      </p>
    </div>
  );
}
