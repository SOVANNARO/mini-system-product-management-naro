import React from "react";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ActionButtonProps
  extends React.ComponentPropsWithoutRef<typeof Button> {
  icon?: LucideIcon;
  iconClassName?: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  variant = "default",
  size,
  onClick,
  disabled = false,
  icon: Icon,
  children,
  className,
  iconClassName,
  ...props
}) => {
  return (
    <Button
      variant={variant}
      size={size}
      className={cn("cursor-pointer", className)}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {Icon && (
        <Icon
          className={cn("w-4 h-4", children ? "mr-2" : "", iconClassName)}
        />
      )}
      {children}
    </Button>
  );
};

export default ActionButton;
