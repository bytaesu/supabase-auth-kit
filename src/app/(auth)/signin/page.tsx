import ContinueWithOAuth from "@/components/features/Auth/ContinueWithOAuth";
import ErrorAlert from "@/components/features/Auth/ErrorAlert";
import SignInForm from "@/components/features/Auth/SignInForm";
import { CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { OrDivider } from "@/components/ui/or-divider";
import GoogleLogo from "@/components/ui/svg/google-logo";
import { AUTH_ROUTES } from "@/lib/supabase/auth-config";
import { SearchParams } from "@/lib/types";
import { isPresetErrorMessage } from "@/lib/utils";
import Link from "next/link";
import React from "react";

type Props = {
  searchParams: SearchParams;
};

const SignInPage = ({ searchParams }: Props) => {
  const { error_message } = searchParams;
  const isPresetError = isPresetErrorMessage(error_message);

  return (
    <div>
      <CardHeader className="space-y-4">
        <h1 className="text-center text-2xl font-semibold">
          Sign in to AuthKit
        </h1>
        {/* Display error message if it matches one of the preset errors */}
        {isPresetError && <ErrorAlert errorMessage={error_message} />}
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
            <p className="text-sm text-brandColor font-medium">
              Create account
            </p>
          </Link>
        </div>
      </CardFooter>
    </div>
  );
};

export default SignInPage;
