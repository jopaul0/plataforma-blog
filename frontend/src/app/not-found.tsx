'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/Button'

export default function NotFound() {
    return (
        <main className="flex min-h-[70vh] flex-col items-center justify-center text-center px-6">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="font-title text-9xl text-primary opacity-20">404</h1>
                <h2 className="font-title text-4xl text-text -mt-12 mb-4">Página não encontrada</h2>
                <p className="text-text-muted max-w-md mx-auto mb-8">
                    Parece que o conteúdo que você está procurando se perdeu na escuridão.
                    Que tal voltar para a luz da página inicial?
                </p>

                <div className="w-full max-w-[200px] mx-auto">
                    <Link href="/">
                        <Button>VOLTAR AO PORTAL</Button>
                    </Link>
                </div>
            </motion.div>
        </main>
    )
}