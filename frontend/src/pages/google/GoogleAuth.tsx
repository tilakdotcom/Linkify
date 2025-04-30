import { useGoogleLogin } from "@react-oauth/google";

export default function GoogleAuth() {
  interface AuthResult {
    code?: string;
  }

  const googleResponse = async (authResult: AuthResult) => {
    try {
      console.log("bhai response from google ", authResult);
      console.log(authResult["code"]);
    } catch (error) {
      if (error instanceof Error) {
        console.log("error in Google Login", error.message);
      } else {
        console.log("error in Google Login", error);
      }
    }
  };
  const handleOnError = (error: unknown) => {
    if (error instanceof Error) {
      console.log("error in Google Login", error.message);
    } else {
      console.log("error in Google Login", error);
    }
  };

  const googleLogin = useGoogleLogin({
    onError: handleOnError,
    onSuccess: googleResponse,
    flow: "auth-code",
  });
  return (
    <div
      className="h-screen
    flex justify-center items-center bg-gray-900"
    >
      <button onClick={googleLogin}>Login with Google</button>
    </div>
  );
}
