"use client";

import {
  CardContent,
  CardFooter,
  CardHeader,
} from "@/shared/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/shared/components/ui/input-otp";
import {
  PRESET_EMAIL_OTP_CONFIG,
  PresetEmailOtpType,
} from "@/shared/lib/supabase/auth/auth.config";
import { Button } from "@/shared/components/ui/button";
import { delay } from "@/shared/lib/utils";
import { verificationFormSchema } from "../lib/validations";
import { verifyOtpAction } from "../actions/verify-otp";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import React, { useState } from "react";

interface VerificationStageProps {
  userEmail: string;
  emailOtpType: PresetEmailOtpType;
  handleExit: () => void;
}

/**
 * VerificationStage Component
 * Renders a form for OTP verification, handling both OTP input and submission.
 * Displays error messages based on the OTP verification result.
 */
const VerificationStage = ({
  userEmail,
  emailOtpType,
  handleExit,
}: VerificationStageProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { redirectTo, message } = PRESET_EMAIL_OTP_CONFIG[emailOtpType];

  const form = useForm<z.infer<typeof verificationFormSchema>>({
    resolver: zodResolver(verificationFormSchema),
    defaultValues: {
      email: userEmail,
      token: "",
    },
  });

  /**
   * Handles OTP completion and submission.
   * - Sets loading state and submits OTP to verifyOtpAction.
   * - Redirects on success or shows error message if verification fails.
   */
  const onComplete = async (tokenValue: string) => {
    setIsLoading(true);
    await delay(1000); // Fake short delay for better UX

    form.setValue("token", tokenValue);
    const { email, token } = form.getValues();
    const { error } = await verifyOtpAction(email, token, emailOtpType);

    if (error) {
      setIsLoading(false);
      toast.error(error);
      return;
    }

    router.replace(redirectTo);
  };

  return (
    <div>
      <CardHeader>
        <h6 className="text-center text-2xl font-semibold">Verification</h6>
      </CardHeader>

      <CardContent className="flex flex-col items-center justify-center space-y-4">
        <p className="text-muted-foreground">
          {`${message} `}
          <strong className="text-foreground font-semibold">{userEmail}</strong>
          {". Enter it below."}
        </p>
        <div className="py-4">
          <InputOTP maxLength={6} onComplete={onComplete} disabled={isLoading}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
      </CardContent>

      <CardFooter className="p-4 border-t bg-muted flex justify-center items-center">
        {isLoading ? (
          <Button disabled variant="ghost" size="xs">
            <Loader2 className="h-5 w-5 animate-spin" />
            Verifying
          </Button>
        ) : (
          <Button variant="ghost" size="xs" onClick={handleExit}>
            <div className="flex text-blue-500 justify-center items-center">
              <ChevronLeft size={20} />
              <p className="text-sm font-medium">Back</p>
            </div>
          </Button>
        )}
      </CardFooter>
    </div>
  );
};

export default VerificationStage;
