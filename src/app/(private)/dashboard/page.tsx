import SignOutButton from "@/components/features/auth/SignOutButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AUTH_ROUTES } from "@/lib/supabase/auth.config";
import { createClient } from "@/lib/supabase/client/server";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";

export const metadata: Metadata = {
  title: "Dashboard | AuthKit",
  description: "bytaesu",
};

const DashboardPage = async () => {
  const supabase = createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (!user || error) {
    redirect(AUTH_ROUTES.Public.SignIn);
  }

  return (
    <div className="flex flex-col items-center p-20 space-y-10">
      <h1 className="text-3xl font-semibold md:text-4xl lg:text-5xl">
        Private Home
      </h1>

      <SignOutButton>Sign Out</SignOutButton>

      <div>
        <Card>
          <CardHeader>
            <CardTitle>Authenticated User</CardTitle>
            <CardDescription>
              {"You can get user information using "}
              <span className="underline">supabase.auth.getUser()</span>
            </CardDescription>
          </CardHeader>

          <CardContent className="text-sm">
            <p>Email: {user.email}</p>
            <p>ID: {user.id}</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-10"></div>
    </div>
  );
};

export default DashboardPage;
