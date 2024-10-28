"use client";

import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client/browser";
import { Provider } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import {
  AUTH_ROUTES,
  PRESET_ERRORS,
  PROVIDER_DISPLAY_NAMES,
} from "@/lib/supabase/auth-config";

type Props = {
  provider: Provider;
  logo: React.ReactNode;
};

/**
 * "signInWithOAuth" simply redirects to an OAuth provider URL, so "use client" was applied.
 * The actual authentication is handled in the route handler (/api/auth/callback).
 */
const ContinueWithOAuth = ({ provider, logo }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [callbackUrl, setCallbackUrl] = useState<string | null>(null);
  const providerDisplayName = PROVIDER_DISPLAY_NAMES[provider];

  useEffect(() => {
    setCallbackUrl(
      new URL(AUTH_ROUTES.API.OAuthCallback, window.location.origin).toString()
    );

    // 'Safari' caches the page state when navigating back.
    // Reset loading state to ensure accurate loading behavior.
    const resetLoadingState = (event: PageTransitionEvent) => {
      if (event?.persisted) {
        setIsLoading(false);
      }
    };
    window.addEventListener("pageshow", resetLoadingState);
    return () => {
      window.removeEventListener("pageshow", resetLoadingState);
    };
  }, []);

  /**
   * Handles the OAuth sign-in process by redirecting to the provider's authentication URL.
   * If the callback URL is missing, an error message is displayed.
   */
  const onClick = async () => {
    setIsLoading(true);

    if (!callbackUrl) {
      setIsLoading(false);
      const errorMessage = PRESET_ERRORS.MissingCallbackUrl;
      toast.error(errorMessage);
      return;
    }
    console.info(callbackUrl);
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithOAuth({
      provider: provider,
      options: {
        redirectTo: callbackUrl.toString(),
      },
    });

    if (error) {
      setIsLoading(false);
      toast.error(error.message);
      return;
    }
  };

  return (
    <div>
      <Button
        type="button"
        onClick={onClick}
        variant={"outline"}
        isLoading={isLoading}
        className="w-full bg-card font-medium"
      >
        {logo}
        Continue with {providerDisplayName}
      </Button>
    </div>
  );
};

export default ContinueWithOAuth;
