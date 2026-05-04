'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/Button'
import StatusModalProps from '@/types/components/StatusModalProps'
import { ModalPortal } from '@/components/ModalPortal'

export function StatusModal({ isOpen, onClose, type, message }: StatusModalProps) {
    return (
        <ModalPortal>
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/40 ">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="bg-surface w-full max-w-sm rounded-[2rem] p-8 shadow-2xl text-center border border-border"
                        >
                            {/* Conteúdo do Modal */}
                            <h2 className="font-title text-3xl text-primary mb-2">
                                {type === 'success' ? 'Sucesso!' : 'Ops!'}
                            </h2>
                            <p className="text-text-muted mb-8">{message}</p>
                            <Button onClick={onClose}>Fechar</Button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </ModalPortal>
    )
}