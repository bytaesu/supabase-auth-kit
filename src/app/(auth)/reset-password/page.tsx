"use server";

import {
  CardContent,
  CardFooter,
  CardHeader,
} from "@/shared/components/ui/card";
import { supabaseServerClient } from "@/shared/lib/supabase/client/server";
import ResetPasswordForm from "@/features/auth/components/ResetPasswordForm";
import SignOutButton from "@/features/auth/components/SignOutButton";
import { AUTH_ROUTES } from "@/features/auth/lib/auth.config";
import { ChevronLeft } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";

const ResetPasswordPage = async () => {
  const supabase = supabaseServerClient();
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
          <div className="flex text-blue-500 justify-center items-center">
            <ChevronLeft size={20} />
            <p className="text-sm font-medium">Back to sign in</p>
          </div>
        </SignOutButton>
      </CardFooter>
    </div>
  );
};

export default ResetPasswordPage;
