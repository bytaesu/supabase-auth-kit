"use client";

import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string; // Optional label prop
}

/**
 * PasswordInput Component
 * A custom password input field that allows users to toggle the visibility of their password.
 * Uses forwardRef to support refs for parent components.
 */
const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ label, className, ...props }, ref) => {
    const [passwordHidden, setPasswordHidden] = useState(true);

    return (
      <div className="space-y-1">
        {label && <label className="block text-sm font-medium">{label}</label>}
        <div className="relative">
          <Input
            type={passwordHidden ? "password" : "text"}
            className={`pr-10 ${className}`}
            ref={ref}
            {...props}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setPasswordHidden(!passwordHidden)}
            className="absolute inset-y-0 right-0 flex items-center text-muted-foreground"
          >
            {passwordHidden ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
