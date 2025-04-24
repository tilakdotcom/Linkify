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
        console.log(result.payload);
      } else if (getShortUrl.rejected.match(result)) {
        console.error(result);
        toast.error("Errorin getting URLs. Please try again.");
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
        <div className="max-w-md w-full bg-gray-800 rounded-xl shadow-2xl p-8 border border-gray-700">
          <div className="rounded-full bg-red-500/10 p-3 w-16 h-16 flex items-center justify-center mx-auto mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-red-500 mb-4">
            404 - Link Not Found
          </h1>
          <p className="text-lg text-gray-300 mb-6">
            Oops! The link you're trying to access is either broken, expired, or
            never existed.
          </p>
          <CustomButtonBlue
            navigateTo={() => navigate("/")}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white rounded-lg shadow-lg w-full font-medium text-lg flex items-center justify-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Back to Home
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
