import { Card } from "@/shared/components/ui/card";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

type Props = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: "Auth | AuthKit",
  description: "bytaesu",
};

const AuthLayout = ({ children }: Props) => {
  return (
    <div className="mx-auto px-4 w-full max-w-md">
      <div className="flex items-center justify-center py-6">
        <Link href={"/"}>
          <p className="text-lg font-extrabold">Logo</p>
        </Link>
      </div>

      <div className="pb-20">
        <Card className="shadow-2xl">{children}</Card>
      </div>
    </div>
  );
};

export default AuthLayout;
