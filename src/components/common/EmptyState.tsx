import { type ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export const EmptyState = ({
  icon,
  title,
  description,
  action,
}: EmptyStateProps) => (
  <div className="flex flex-col items-center justify-center py-16 px-4">
    {icon && <div className="mb-4 text-4xl text-slate-300">{icon}</div>}
    <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
    {description && (
      <p className="text-slate-600 text-center max-w-md mb-6">{description}</p>
    )}
    {action && (
      <Button onClick={action.onClick} className="mt-4">
        {action.label}
      </Button>
    )}
  </div>
);
