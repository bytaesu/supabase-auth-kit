"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { signUpAction } from "@/actions/sign-up";
import { signUpFormSchema } from "@/lib/validation-schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import PasswordInput from "./PasswordInput";
import PasswordConditionBar from "./PasswordConditionBar";
import { Button } from "@/components/ui/button";
import { PRESET_ERRORS } from "@/lib/supabase/auth-config";

interface SignUpFormProps {
  enterVerificationStage: (userEmail: string) => void;
}

/**
 * SignUpForm Component
 * Handles user sign-up with email and password input fields.
 * Includes real-time password validation and error handling.
 */
const SignUpForm = ({ enterVerificationStage }: SignUpFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  /**
   * Handles form submission
   * - Submits user data for sign-up.
   * - Calls enterVerificationStage on success or shows error on failure.
   */
  const onSubmit = async (formData: z.infer<typeof signUpFormSchema>) => {
    setIsLoading(true);

    const { data, error } = await signUpAction(
      formData.email,
      formData.password
    );

    if (error) {
      setIsLoading(false);
      toast.error(error);
      return;
    }

    if (data) {
      enterVerificationStage(data?.userEmail);
    } else {
      setIsLoading(false);
      toast.error(PRESET_ERRORS.UserEmailNotFound);
    }
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    id="password"
                    {...field}
                    // The password field is validated in real-time as the user types
                    onChange={(e) => {
                      field.onChange(e);
                      form.trigger("password");
                    }}
                  />
                </FormControl>
                <div className="pt-3">
                  <PasswordConditionBar password={form.watch("password")} />
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="mt-6">
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
  );
};

export default SignUpForm;
