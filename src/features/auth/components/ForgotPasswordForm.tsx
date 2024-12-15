"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { PRESET_AUTH_ERRORS } from "@/shared/lib/supabase/auth/auth.config";
import { forgotPasswordFormSchema } from "../lib/validations";
import { forgotPasswordAction } from "../actions/forgot-password";

interface ForgotPasswordFormProps {
  enterVerificationStage: (userEmail: string) => void;
}

/**
 * ForgotPasswordForm component
 * Handles the process of collecting an email for password reset.
 * Validates the email, performs the forgot password action, and
 * sets verification stage if the email is valid.
 */
const ForgotPasswordForm = ({
  enterVerificationStage,
}: ForgotPasswordFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof forgotPasswordFormSchema>>({
    resolver: zodResolver(forgotPasswordFormSchema),
    defaultValues: {
      email: "",
    },
  });

  /**
   * Form submission handler
   * - Submits the email for password reset.
   * - If successful, initiates the verification stage.
   */
  const onSubmit = async (
    formData: z.infer<typeof forgotPasswordFormSchema>
  ) => {
    setIsLoading(true);

    const { data, error } = await forgotPasswordAction(formData.email);

    if (error) {
      setIsLoading(false);
      toast.error(error);
      return;
    }

    if (!data?.userEmail) {
      setIsLoading(false);
      toast.error(PRESET_AUTH_ERRORS.UserEmailNotFound);
      return;
    }

    // Proceed to verification stage with the provided email
    enterVerificationStage(data.userEmail);
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div>
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
          </div>
          <div className="pt-6">
            <Button
              variant={"blue"}
              isLoading={isLoading}
              type="submit"
              className="w-full"
            >
              Continue
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ForgotPasswordForm;
