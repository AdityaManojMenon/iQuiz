"use client";
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { clsx } from "clsx";

// Define the base neo classes
const neoClasses = "w-full rounded-full px-3.5 py-2.5 border-2 relative z-10 text-lg font-bold transform hover:-translate-y-0.5 transition duration-200";

// Define the button variants with cva
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 shadow-none",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        neo: cn(neoClasses, "bg-[#3e406a] text-white border-[#6366a7] rounded-full"),
        neoOutline: cn(neoClasses, "bg-[#3e406a] text-white border-[#FFFFFF] rounded-full hover:bg-[#4a4c66] hover:border-[#6366a7]"),
        correct: "bg-green-500 text-white border-green-700", // Green for correct answers
        wrong: "bg-red-500 text-white border-red-700", // Red for wrong answers
      },
      size: {
        default: "h-12 px-4 py-2 rounded-full", // Increased height for the buttons
        sm: "h-10 rounded-full px-3",
        lg: "h-14 rounded-full px-4 py-2",
        xl: "rounded-2xl h-16 px-6 py-3",
        icon: "h-10 w-10 rounded-full",
      },
    },
    defaultVariants: {
      variant: "neoOutline",  // Set to neoOutline for this specific style
      size: "default",
    },
  }
);


// Define the span variants for extra styling if needed
export const spanVariants = cva(
  ["absolute", "h-14", "bottom-[-7px]", "w-full", "border-2", "left-0", "z-0"],
  {
    variants: {
      variant: {
        default: "hidden",
        destructive: "hidden",
        outline: "hidden",
        secondary: "hidden",
        ghost: "hidden",
        link: "hidden",
        neo: "border-blue-900 bg-primary-shadow rounded-full",
        neoOutline: "hidden", // Remove any extra styling for neoOutline
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);


export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

// Define the Button component
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <div className={variant === "neo" || variant === "neoOutline" ? "relative" : ""}>
        <Comp
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        />
        {variant === "neo" || variant === "neoOutline" ? (
          <span className={cn(spanVariants({ variant }))}></span>
        ) : null}
      </div>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
