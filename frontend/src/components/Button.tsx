import ButtonProps from "@/types/components/ButtonProps";
import { base, variants } from "@/constants/btnVariants";

export function Button({
    children,
    variant = "primary",
    className = "",
    ...props
}: ButtonProps) {


    return (
        <button
            {...props}
            className={`${base} ${variants[variant]} ${className}`}
        >
            {children}
        </button>
    );
}