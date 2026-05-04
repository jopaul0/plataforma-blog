import { motion, AnimatePresence } from 'framer-motion'
import { LoginForm } from './login-form'
import { RegisterForm } from './register-form'
import { AUTH_SPRING } from '@/constants/animation'
import { FormTrackProps } from '@/types/components/LoginPageProps'

export function FormTrack({ isLogin, toggle }: FormTrackProps) {
    return (
        <>
            <div className="w-full overflow-hidden">
                <motion.div
                    animate={{ x: isLogin ? '0%' : '-50%' }}
                    transition={AUTH_SPRING}
                    className="flex w-[200%] h-full"
                >
                    {/* Container do Login */}
                    <div className="w-1/2 flex-shrink-0 flex flex-col justify-center px-2">
                        <LoginForm />
                    </div>

                    {/* Container do Registro */}
                    <div className="w-1/2 flex-shrink-0 flex flex-col justify-center px-2">
                        <RegisterForm />
                    </div>
                </motion.div>
            </div>

            <button onClick={toggle} className="mt-6 text-sm text-text-muted md:hidden font-medium underline decoration-primary/30 underline-offset-4">
                {isLogin ? 'Não tem conta? Cadastre-se' : 'Já tem conta? Entre aqui'}
            </button>
        </>
    )
}