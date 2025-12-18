import * as React from "react"

import { cn } from "~/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex min-h-[100px] w-full rounded-lg border px-3 py-2 text-sm shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:border-primary/50 disabled:cursor-not-allowed disabled:opacity-50 field-sizing-content",
        // Light mode
        "bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 hover:border-gray-400",
        // Dark mode
        "dark:bg-slate-950/50 dark:border-white/10 dark:text-slate-200 dark:placeholder:text-slate-500 dark:hover:border-white/20",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
