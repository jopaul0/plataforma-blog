import { motion, AnimatePresence } from 'framer-motion'
import { LoginForm } from './login-form'
import { RegisterForm } from './register-form'
import { AUTH_SPRING } from '@/constants/animation'
import { FormTrackProps } from '@/types/components/LoginPageProps'

export function FormTrack({ isLogin, toggle }: FormTrackProps) {
    return (
        <>
            <div className="overflow-hidden mb-6">
                <AnimatePresence mode="wait" initial={false}>
                    <motion.h1
                        key={isLogin ? 'entrar' : 'criar'}
                        initial={{ opacity: 0, x: isLogin ? -24 : 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: isLogin ? 24 : -24 }}
                        transition={{ duration: 0.38, ease: [0.76, 0, 0.24, 1] }}
                        className="font-title text-4xl text-primary text-center"
                    >
                        {isLogin ? 'Entrar' : 'Criar Conta'}
                    </motion.h1>
                </AnimatePresence>
            </div>

            <div className="w-full overflow-hidden">
                <motion.div
                    animate={{ x: isLogin ? '0%' : '-50%' }}
                    transition={AUTH_SPRING}
                    className="flex w-[200%]"
                >
                    <div className="w-1/2 flex-shrink-0"><LoginForm /></div>
                    <div className="w-1/2 flex-shrink-0"><RegisterForm /></div>
                </motion.div>
            </div>

            <button onClick={toggle} className="mt-6 text-sm text-text-muted md:hidden font-medium underline decoration-primary/30 underline-offset-4">
                {isLogin ? 'Não tem conta? Cadastre-se' : 'Já tem conta? Entre aqui'}
            </button>
        </>
    )
}