import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { loginSchema } from "@/common/schemas/auth.schema";
import { signupImage } from "@/assets";
import Container from "@/components/common/Container";
import { useAppDispatch, useTypeSelector } from "@/store/store";
import { loginUser } from "@/store/auth/authSlice";
import toast from "react-hot-toast";
import GoogleAuth from "@/components/common/GoogleAuth";

export default function LoginPage() {
  const { isLoading } = useTypeSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    const response = await dispatch(
      loginUser({
        email: values.email,
        password: values.password,
      })
    );

    // Handle the response here if needed
    if (loginUser.fulfilled.match(response)) {
      toast.success("Login successful!");
    } else if (loginUser.rejected.match(response)) {
      toast.error("Login failed. Please check your credentials and try again.");
    }
  }

  return (
    <Container className="flex justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl w-full bg-gray-800 shadow-lg rounded-2xl overflow-hidden">
        {/* Left Side - Illustration */}
        <div className="hidden md:flex justify-center items-center bg-gray-500 p-8">
          <img
            src={signupImage}
            alt="Signup Illustration"
            className="max-w-xs"
            draggable="false"
          />
        </div>

        {/* Right Side - Login Form */}
        <div className="flex flex-col justify-center items-center p-8 w-full">
          <h2 className="text-3xl font-semibold text-gray-100">Login</h2>
          <p className="text-gray-300 mb-4 text-sm">Join us and get started!</p>
          <GoogleAuth />


          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-4"
            >
              {/* Email Input */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        autoComplete="email"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder:text-gray-300"
                        placeholder="Enter your email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password Input */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        autoComplete="current-password"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder:text-gray-300"
                        placeholder="Enter your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <div>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-2 px-4 rounded-lg font-medium text-white focus:outline-none focus:ring-2 focus:ring-gray-600 transition ${
                    isLoading
                      ? "cursor-not-allowed bg-blue-400"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {isLoading ? "Processing..." : "Login"}
                </Button>
              </div>

              {/* Already have an account? */}
              <p className="text-sm text-gray-600 text-center mt-2">
                Don&apos;t have an Account?{" "}
                <a href="/register" className="text-blue-600 hover:underline">
                  Register
                </a>
              </p>
            </form>
          </Form>
        </div>
      </div>
    </Container>
  );
}
