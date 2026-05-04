import { motion, AnimatePresence } from 'framer-motion'
import { FADE_Y } from '@/constants/animation'
import { AuthBannerProps } from '@/types/components/LoginPageProps'


export function AuthBanner({ isLogin, isMobile }: AuthBannerProps) {
    const containerClasses = isMobile
        ? "md:hidden bg-primary text-white px-8 py-10 flex flex-col items-center text-center gap-3"
        : "hidden md:flex flex-col items-center justify-center text-center"

    return (
        <div className={containerClasses}>
            <AnimatePresence mode="wait" initial={false}>
                <motion.h2
                    key={isLogin ? 'h-in' : 'h-up'}
                    variants={FADE_Y} initial="hidden" animate="visible" exit="exit"
                    className={`${isMobile ? 'text-3xl' : 'text-4xl'} font-title font-light text-white leading-tight whitespace-pre-line`}
                >
                    {isLogin ? 'Bem-vindo\nde volta!' : 'Olá,\nAmigo!'}
                </motion.h2>
            </AnimatePresence>
            <AnimatePresence mode="wait" initial={false}>
                <motion.p
                    key={isLogin ? 'p-in' : 'p-up'}
                    variants={FADE_Y} initial="hidden" animate="visible" exit="exit"
                    transition={{ delay: 0.05 }}
                    className="text-sm font-light opacity-70 max-w-[220px] leading-relaxed"
                >
                    {isLogin
                        ? 'Para manter-se conectado, faça login com seus dados pessoais.'
                        : 'Comece sua jornada conosco e compartilhe suas ideias.'}
                </motion.p>
            </AnimatePresence>
        </div>
    )
}