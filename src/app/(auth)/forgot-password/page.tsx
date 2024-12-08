"use client";

import {
  CardContent,
  CardFooter,
  CardHeader,
} from "@/shared/components/ui/card";
import ForgotPasswordForm from "@/features/auth/components/ForgotPasswordForm";
import VerificationStage from "@/features/auth/components/VerificationStage";
import useVerificationStage from "@/features/auth/hooks/useVerificationStage";
import { AUTH_ROUTES } from "@/features/auth/lib/auth.config";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

const ForgotPasswordPage = () => {
  // Use custom hook to manage the verification stage
  const {
    isVerificationStage,
    userEmail,
    enterVerificationStage,
    exitVerificationStage,
  } = useVerificationStage();

  // Show verification stage component if user is in verification stage
  if (isVerificationStage) {
    return (
      <VerificationStage
        emailOtpType="recovery"
        userEmail={userEmail}
        handleExit={exitVerificationStage}
      />
    );
  }

  // Show forgot password form if user is not in verification stage
  return (
    <div>
      <CardHeader>
        <h1 className="text-center text-2xl font-semibold">Reset password</h1>
        <p className="text-muted-foreground text-sm font-normal">
          Enter the email address associated with your account and we will send
          you a code to reset your password.
        </p>
      </CardHeader>

      <CardContent>
        <ForgotPasswordForm enterVerificationStage={enterVerificationStage} />
      </CardContent>

      <CardFooter className="p-4 border-t bg-muted flex justify-center items-center">
        <Link href={AUTH_ROUTES.Public.SignIn}>
          <div className="flex text-blue-500 justify-center items-center">
            <ChevronLeft size={20} />
            <p className="text-sm font-medium">Back to sign in</p>
          </div>
        </Link>
      </CardFooter>
    </div>
  );
};

export default ForgotPasswordPage;
