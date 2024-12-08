import { useState } from "react";

type UseVerificationStageReturnType = {
  isVerificationStage: boolean;
  userEmail: string;
  enterVerificationStage: (userEmail: string) => void;
  exitVerificationStage: () => void;
};

/**
 * Custom hook to manage the verification stage of the process.
 * Provides functions to enter and exit the verification stage and manage the user’s email.
 */
const useVerificationStage = (): UseVerificationStageReturnType => {
  const [isVerificationStage, setIsVerificationStage] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const enterVerificationStage = (email: string) => {
    setUserEmail(email);
    setIsVerificationStage(true);
  };

  const exitVerificationStage = () => {
    setUserEmail("");
    setIsVerificationStage(false);
  };

  return {
    isVerificationStage,
    userEmail,
    enterVerificationStage,
    exitVerificationStage,
  };
};

export default useVerificationStage;
