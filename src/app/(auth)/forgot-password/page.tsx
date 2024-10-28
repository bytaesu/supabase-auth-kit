"use client";

import ForgotPasswordForm from "@/components/features/Auth/ForgotPasswordForm";
import { CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import VerificationStage from "@/components/features/Auth/VerificationStage";
import useVerificationStage from "@/hooks/useVerificationStage";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React from "react";
import { AUTH_ROUTES } from "@/lib/constants";

const ForgotPasswordPage = () => {
  // Use custom hook to manage the verification stage
  const {
    isVerificationStage,
    userEmail,
    enterVerificationStage,
    exitVerificationStage,
  } = useVerificationStage();

  return (
    <div>
      {isVerificationStage ? (
        // Show verification stage component if user is in verification stage
        <VerificationStage
          emailOtpType="recovery"
          userEmail={userEmail}
          handleExit={exitVerificationStage}
        />
      ) : (
        // Show forgot password form if user is not in verification stage
        <div>
          <CardHeader>
            <h1 className="text-center text-2xl font-semibold">
              Reset password
            </h1>
            <p className="text-muted-foreground text-sm font-normal">
              Enter the email address associated with your account and we will
              send you a code to reset your password.
            </p>
          </CardHeader>

          <CardContent>
            <ForgotPasswordForm
              enterVerificationStage={enterVerificationStage}
            />
          </CardContent>

          <CardFooter className="p-4 border-t bg-muted flex justify-center items-center">
            <Link href={AUTH_ROUTES.Public.SignIn}>
              <div className="flex text-brandColor justify-center items-center">
                <ChevronLeft size={20} />
                <p className="text-sm font-medium">Back to sign in</p>
              </div>
            </Link>
          </CardFooter>
        </div>
      )}
    </div>
  );
};

export default ForgotPasswordPage;
