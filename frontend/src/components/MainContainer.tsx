import MainContainerProps from "@/types/components/MainContainer";

export function MainContainer({ children, className = "" }: MainContainerProps) {
    return (
        <main
            className={`
        w-full
        max-w-7xl
        mx-auto
        px-4
        sm:px-6
        lg:px-8
        bg-background
        ${className}
      `}
        >
            {children}
        </main>
    );
}