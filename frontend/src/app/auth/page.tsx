'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { AuthBanner } from './components/auth-banner'
import { FormTrack } from './components/form-track'
import { AUTH_SPRING } from '@/constants/animation'
import { Button } from '@/components/Button'

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true)
    const toggle = () => setIsLogin(v => !v)

    return (
        <main className="min-h-screen flex items-center justify-center bg-background p-4 font-sans">
            <div className="relative w-full max-w-[950px] bg-surface rounded-[2rem] shadow-2xl overflow-hidden border border-border/50 flex flex-col md:flex-row md:h-[580px]">

                <AuthBanner isLogin={isLogin} isMobile />

                {/* Painel lateral Desktop */}
                <motion.div
                    animate={{ x: isLogin ? '0%' : '138.1%' }}
                    transition={AUTH_SPRING}
                    className="hidden md:flex absolute top-0 left-0 w-[42%] h-full bg-primary text-white p-12 flex-col items-center justify-center z-10 shadow-2xl"
                >
                    <AuthBanner isLogin={isLogin} />
                    <div className="w-full max-w-[180px] mt-10">
                        <Button variant="outline" onClick={toggle}>
                            {isLogin ? 'CRIAR CONTA' : 'ENTRAR'}
                        </Button>
                    </div>
                </motion.div>

                {/* Conteúdo do Formulário */}
                <div className="flex-1 flex flex-col items-center justify-center py-10 px-6 md:px-0">
                    <motion.div
                        animate={{ x: isLogin ? '0%' : (typeof window !== 'undefined' && window.innerWidth > 768 ? '-72.4%' : '0%') }}
                        transition={AUTH_SPRING}
                        className="w-full md:w-[58%] md:ml-auto p-0 md:p-10"
                    >
                        <FormTrack isLogin={isLogin} toggle={toggle} />
                    </motion.div>
                </div>

            </div>
        </main>
    )
}