import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AUTH_ROUTES } from "@/lib/constants";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function HomePage() {
  return (
    <div className="flex flex-col items-center space-y-10 pb-10">
      <div className="flex flex-col items-center lg:flex-row lg:space-x-10">
        <div className="max-w-2xl lg:flex-shrink-0">
          <Image
            src={"/images/nextjs-supabase-auth-kit.png"}
            alt="Next.js Supabase Auth Kit"
            width={"1200"}
            height={"630"}
          />
        </div>
        <div className="lg:pt-8">
          <div>
            <p className="text-xl font-semibold">Tech stacks</p>
            <ul className="list-disc ml-6 text-sm font-medium pt-1">
              <li>Next.js 14 (React 18) using App Router</li>
              <li>Supabase</li>
              <li>Tailwind CSS</li>
              <li>Shadcn UI</li>
              <li>Zod</li>
              <li>TypeScript</li>
            </ul>
          </div>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Try Demo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <Link href={AUTH_ROUTES.Public.SignIn} passHref>
              <Button className="pl-6">
                Sign in
                <ChevronRight />
              </Button>
            </Link>
            <Link href={AUTH_ROUTES.Public.SignUp} passHref>
              <Button className="pl-6">
                Create account
                <ChevronRight />
              </Button>
            </Link>
            <Link href={AUTH_ROUTES.Private.PrivateHome} passHref>
              <Button variant={"outline"} className="pl-6">
                Private Home
                <ChevronRight />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      <div>
        <Link
          href={"https://github.com/bytaesu/nextjs-supabase-auth-kit"}
          prefetch={false}
          passHref
        >
          <Button variant={"link"}>
            <GitHubLogoIcon />
            bytaesu/nextjs-supabase-auth-kit
          </Button>
        </Link>
      </div>
    </div>
  );
}
