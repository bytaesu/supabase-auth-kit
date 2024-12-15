import { PASSWORD_REQUIREMENTS } from "@/shared/lib/supabase/auth/auth.config";

type Props = {
  password: string;
};

/**
 * PasswordConditionBar Component
 * Displays a visual representation of password strength based on fulfilled conditions.
 * Each fulfilled condition is represented by a colored bar.
 */
const PasswordConditionBar = ({ password }: Props) => {
  const fulfilledConditions = PASSWORD_REQUIREMENTS.filter((condition) =>
    condition.regex.test(password)
  ).length;

  const progressBars = Math.min(3, fulfilledConditions);
  const allConditionsMet = progressBars === 3;

  return (
    <div className="w-full">
      <div className="flex gap-1">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-all duration-500 ${
              i < progressBars
                ? "bg-destructive" // Partially satisfied
                : "bg-border" // Unsatisfied
            }`}
            style={{
              width: i < progressBars ? "100%" : "0%",
              backgroundColor: allConditionsMet
                ? "rgb(34, 197, 94, 0.8)"
                : undefined, // Fully satisfied
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default PasswordConditionBar;
