/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { signUpSchema } from "@/common/schemas/auth.schema";
import { signupImage } from "@/assets";
import { useState } from "react";
import Container from "@/components/common/Container";
import { useAppDispatch, useTypeSelector } from "@/store/store";
import { registerUser } from "@/store/auth/authSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import GoogleAuth from "@/components/common/GoogleAuth";

export default function SignupPage() {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const { isLoading } = useTypeSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      avatar: null,
    },
  });

  async function onSubmit(values: z.infer<typeof signUpSchema>) {
    const response = await dispatch(
      registerUser({
        email: values.email,
        password: values.password,
        avatar: values.avatar,
      })
    );

    // Handle the response here if needed
    if (registerUser.fulfilled.match(response)) {
      toast.success("Registration successful! redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } else {
      toast.error("Email already exists");
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

        {/* Right Side - Sign Up Form */}
        <div className="flex flex-col justify-center items-center p-8 w-full">
          <h2 className="text-3xl font-semibold text-gray-100">Sign Up</h2>
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

              {/* Avatar Upload with Preview */}
              <FormField
                control={form.control}
                name="avatar"
                render={({ field: { value, onChange, ...fieldProps } }) => (
                  <FormItem>
                    <FormLabel>Profile Picture</FormLabel>
                    <FormControl>
                      <Input
                        {...fieldProps}
                        type="file"
                        accept="image/*"
                        className="w-full px-4 border rounded-lg file:border-none focus:ring-2 focus:ring-neutral-500 focus:outline-none  file:text-gray-200"
                        onChange={(event) => {
                          const file = event.target.files
                            ? event.target.files[0]
                            : null;
                          onChange(file);
                          if (file) {
                            setAvatarPreview(URL.createObjectURL(file));
                          } else {
                            setAvatarPreview(null);
                          }
                        }}
                      />
                    </FormControl>
                    {avatarPreview && (
                      <div className="mt-2">
                        <img
                          draggable="false"
                          src={avatarPreview}
                          alt="Profile Preview"
                          className="w-16 h-16 rounded-full object-cover"
                        />
                      </div>
                    )}
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
                  {isLoading ? "Processing..." : "Sign Up"}
                </Button>
              </div>

              {/* Already have an account? */}
              <p className="text-sm text-gray-600 text-center mt-2">
                Already have an account?{" "}
                <a href="/login" className="text-blue-600 hover:underline">
                  Login
                </a>
              </p>
            </form>
          </Form>
        </div>
      </div>
    </Container>
  );
}
