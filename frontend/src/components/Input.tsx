import { forwardRef } from 'react'
import InputProps from "@/types/components/InputProps"

export const Input = forwardRef<HTMLInputElement, InputProps & { error?: string }>(
    ({ label, variant = 'default', error, ...props }, ref) => {
        const bgVariant = variant === 'surface' ? 'bg-surface' : 'bg-background'

        return (
            <div className="flex flex-col gap-1 w-full font-sans">
                <label className="text-sm font-medium text-text-muted">{label}</label>
                <input
                    ref={ref}
                    {...props}
                    className={`w-full p-3 rounded-xl border ${error ? 'border-red-500' : 'border-border'} ${bgVariant} 
          text-text placeholder:text-text-muted/50 outline-none transition-all 
          focus:border-primary focus:ring-1 focus:ring-primary shadow-sm`}
                />
                {error && <span className="text-xs text-red-500 font-medium">{error}</span>}
            </div>
        )
    }
)

Input.displayName = 'Input'