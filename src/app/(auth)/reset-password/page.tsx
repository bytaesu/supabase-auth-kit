"use server";

import ResetPasswordForm from "@/components/features/Auth/ResetPasswordForm";
import SignOutButton from "@/components/features/Auth/SignOutButton";
import { CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { AUTH_ROUTES } from "@/lib/constants";
import { createClient } from "@/lib/supabase/client/server";
import { ChevronLeft } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";

const ResetPasswordPage = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  // Redirect to sign-in if no user data or an error occurs
  if (!data || error) {
    redirect(AUTH_ROUTES.Public.SignIn);
  }

  return (
    <div>
      <CardHeader>
        <h1 className="text-center text-2xl font-semibold">
          Choose a new password
        </h1>
      </CardHeader>

      <CardContent>
        <ResetPasswordForm />
      </CardContent>

      <CardFooter className="p-4 border-t bg-muted flex justify-center items-center">
        <SignOutButton variant={"ghost"} size={"xs"}>
          <div className="flex text-brandColor justify-center items-center">
            <ChevronLeft size={20} />
            <p className="text-sm font-medium">Back to sign in</p>
          </div>
        </SignOutButton>
      </CardFooter>
    </div>
  );
};

export default ResetPasswordPage;
