import { toast } from "sonner";

type ToastAction = {
  label: string;
  onClick: () => void;
};

export const showToast = (
  type: "success" | "error",
  title: string,
  description: string,
  action?: ToastAction
) => {
  const toastFn = type === "success" ? toast.success : toast.error;
  toastFn(title, {
    description,
    action: action
      ? {
          label: action.label,
          onClick: action.onClick,
        }
      : undefined,
  });
};
