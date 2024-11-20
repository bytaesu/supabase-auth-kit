"use client";

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import React, { useState } from "react";

type Props = {
  errorMessage: string | string[] | undefined;
};

/**
 * AuthErrorAlert Component
 * Displays an alert with an error message and a close button.
 * Can be dismissed by the user.
 */
const AuthErrorAlert = ({ errorMessage }: Props) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="flex items-center justify-between bg-destructive/10 border border-destructive/20 rounded-sm p-3">
      <p className="text-sm font-medium">{errorMessage}</p>
      <Button
        type="button"
        onClick={handleClose}
        variant={"ghost"}
        size={"xs"}
        className="hover:bg-transparent"
      >
        <X className="text-destructive/70" />
      </Button>
    </div>
  );
};

export default AuthErrorAlert;
