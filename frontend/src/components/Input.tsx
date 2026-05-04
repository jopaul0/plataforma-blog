import InputProps from "@/types/components/InputProps"

export function Input({ label, variant = 'default', ...props }: InputProps) {
  const bgVariant = variant === 'surface' ? 'bg-surface' : 'bg-background'

  return (
    <div className="flex flex-col gap-1 w-full font-sans">
      <label className="text-sm font-medium text-text-muted">{label}</label>
      <input
        {...props}
        className={`w-full p-3 rounded-xl border border-border ${bgVariant} 
        text-text placeholder:text-text-muted/50 outline-none transition-all 
        focus:border-primary focus:ring-1 focus:ring-primary shadow-sm`}
      />
    </div>
  )
}