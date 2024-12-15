import {
  CardContent,
  CardFooter,
  CardHeader,
} from "@/shared/components/ui/card";
import { OrDivider } from "@/shared/components/ui/or-divider";
import GoogleLogo from "@/shared/components/ui/svg/google-logo";
import { SearchParams } from "@/shared/lib/types";
import AuthErrorAlert from "@/features/auth/components/AuthErrorAlert";
import ContinueWithOAuth from "@/features/auth/components/ContinueWithOAuth";
import SignInForm from "@/features/auth/components/SignInForm";
import { AUTH_ROUTES } from "@/shared/lib/supabase/auth/auth.config";
import { isPresetAuthError } from "@/features/auth/lib/utils";
import Link from "next/link";
import React from "react";

type Props = {
  searchParams: SearchParams;
};

const SignInPage = ({ searchParams }: Props) => {
  const { error_message } = searchParams;
  const isValidError = isPresetAuthError(error_message);

  return (
    <div>
      <CardHeader className="space-y-4">
        <h1 className="text-center text-2xl font-semibold">
          Sign in to AuthKit
        </h1>
        {/* Display error message if it matches one of the preset errors */}
        {isValidError && <AuthErrorAlert errorMessage={error_message} />}
      </CardHeader>

      <CardContent className="space-y-4">
        <ContinueWithOAuth provider="google" logo={<GoogleLogo />} />
        <OrDivider />
        <SignInForm />
      </CardContent>

      <CardFooter className="p-4 border-t bg-muted flex justify-center items-center">
        <div className="flex justify-center items-center space-x-1">
          <p className="text-sm font-normal text-muted-foreground">
            New to AuthKit?
          </p>
          <Link href={AUTH_ROUTES.Public.SignUp}>
            <p className="text-sm text-blue-500 font-medium">Create account</p>
          </Link>
        </div>
      </CardFooter>
    </div>
  );
};

export default SignInPage;
