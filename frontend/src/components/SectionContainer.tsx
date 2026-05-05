import SectionContainerProps from "@/types/components/SectionContainerProps";

export function SectionContainer({ children, className = "" }: SectionContainerProps) {
    return (
        <section
            className={`
        w-full
        max-w-7xl
        mx-auto
        px-4
        sm:px-6
        lg:px-8
        ${className}
      `}
        >
            {children}
        </section>
    );
}