import ButtonProps from "@/types/components/ButtonProps"

export function Button({ children, variant = 'primary', ...props }: ButtonProps) {
    const variants = {
        primary: 'bg-primary text-white hover:bg-primary-hover shadow-md',
        outline: 'border-2 border-white text-white hover:bg-white hover:text-primary'
    }

    return (
        <button
            {...props}
            className={`w-full font-bold py-3 px-6 rounded-full transition-all duration-300 
      active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]}`}
        >
            {children}
        </button>
    )
}