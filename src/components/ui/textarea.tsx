import * as React from "react";

import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-lg border bg-white px-3 py-2 text-base placeholder:text-neutral-300 placeholder:font-normal disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:placeholder:text-neutral-400 focus:outline-none",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
