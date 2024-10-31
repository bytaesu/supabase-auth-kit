"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { signInAction } from "@/actions/sign-in";
import { signInFormSchema } from "@/lib/validation-schemas";
import PasswordInput from "./PasswordInput";
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
import { AUTH_ROUTES } from "@/lib/supabase/auth-config";

/**
 * SignInForm Component
 * A form component that allows users to sign in by providing an email and password.
 * Includes validation, form submission, and error handling.
 */
const SignInForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  /**
   * Handles form submission.
   * - Attempts to sign the user in with provided credentials.
   * - Redirects to the private home on success or displays an error message on failure.
   */
  const onSubmit = async (formData: z.infer<typeof signInFormSchema>) => {
    setIsLoading(true);

    const { error } = await signInAction(formData.email, formData.password);
    if (error) {
      setIsLoading(false);
      toast.error(error);
      return;
    }

    router.replace(AUTH_ROUTES.Private.PrivateHome);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <FormField
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input id="email" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel>Password</FormLabel>
                  <Link href={AUTH_ROUTES.Public.ForgotPassword}>
                    <p className="text-sm text-blue-500 font-medium">
                      Forgot password?
                    </p>
                  </Link>
                </div>
                <FormControl>
                  <div className="relative">
                    <PasswordInput id="password" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="pt-6">
          <Button
            variant={"blue"}
            isLoading={isLoading}
            type="submit"
            className="w-full"
          >
            Sign in
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SignInForm;
