export const base =
    "w-full font-semibold py-2 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 " +
    "focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";

export const variants = {
    primary:
        "bg-primary text-white hover:bg-primary-hover focus:ring-primary/50 shadow-md",

    secondary:
        "bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-400",

    outline:
        "border border-white text-white hover:bg-white hover:text-primary focus:ring-primary",

    ghost:
        "text-primary hover:bg-primary/10 focus:ring-primary/30",

    danger:
        "bg-red-500 text-white hover:bg-red-600 focus:ring-red-400 shadow-md",

    success:
        "bg-green-500 text-white hover:bg-green-600 focus:ring-green-400 shadow-md",
};