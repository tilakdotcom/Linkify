import { googleIcon } from "@/assets";
import { loginWithGoogleUser } from "@/store/auth/authSlice";
import { useAppDispatch, useTypeSelector } from "@/store/store";
import { useGoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";

export default function GoogleAuth() {
  const { isLoading } = useTypeSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  async function handleOnGoogle(authResult: object) {
    const response = await dispatch(loginWithGoogleUser(authResult));

    // Handle the response here if needed
    if (loginWithGoogleUser.fulfilled.match(response)) {
      toast.success("Login successful!");
    } else if (loginWithGoogleUser.rejected.match(response)) {
      toast.error("Login failed please try again");
    }
  }

  const handleOnError = (error: unknown) => {
    if (error instanceof Error) {
      console.log("error in Google Login", error.message);
    } else {
      console.log("error in Google Login", error);
    }
  };

  const googleLogin = useGoogleLogin({
    onError: handleOnError,
    onSuccess: handleOnGoogle,
    flow: "auth-code",
  });
  return (
    /* From Uiverse.io by OfficialRushO */
    <button
      disabled={isLoading}
      onClick={googleLogin}
      draggable={false}
      className={`cursor-pointer text-black flex gap-2 items-center bg-white px-4 py-2 rounded-lg font-medium sm:text-sm text-xs hover:bg-zinc-300 transition-all ease-in duration-200 mb-2 ${
        isLoading ? "cursor-not-allowed" : ""
      }`}
    >
      <img src={googleIcon} alt="goofle" className="size-4 sm:size-5" />
      Continue with Google
    </button>
  );
}
