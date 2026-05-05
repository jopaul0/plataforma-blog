'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, LogOut, User, ChevronDown } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import navRoutes from '@/constants/navRoutes'

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isProfileOpen, setIsProfileOpen] = useState(false) // Estado para o dropdown
    const { user, isAuthenticated, signOut } = useAuth()

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
    const navLinks = isAuthenticated ? navRoutes.isAuthenticated : navRoutes.default

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-sm">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-12">

                {/* Logo */}
                <Link href="/" className="text-xl font-black tracking-tighter text-text uppercase">
                    Portal Lux
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden items-center gap-10 md:flex">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-[13px] font-medium text-text-muted transition-colors hover:text-text"
                        >
                            {link.name}
                        </Link>
                    ))}

                    <div className="flex items-center gap-6">
                        {isAuthenticated ? (
                            <div className="relative border-l border-border/60 pl-6">
                                {/* Trigger do Dropdown */}
                                <button
                                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                                    className="flex items-center gap-2 text-[13px] font-semibold text-text hover:text-primary transition-colors"
                                >
                                    <span className="max-w-[120px] truncate">
                                        {user?.username || user?.name}
                                    </span>
                                    <motion.div
                                        animate={{ rotate: isProfileOpen ? 180 : 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <ChevronDown size={16} />
                                    </motion.div>
                                </button>

                                {/* Dropdown Menu Desktop */}
                                <AnimatePresence>
                                    {isProfileOpen && (
                                        <>
                                            {/* Overlay invisível para fechar ao clicar fora */}
                                            <div
                                                className="fixed inset-0 z-[-1]"
                                                onClick={() => setIsProfileOpen(false)}
                                            />
                                            <motion.div
                                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                className="absolute right-0 mt-4 w-48 rounded-xl border border-border bg-surface p-2 shadow-xl"
                                            >
                                                <Link
                                                    href="/profile"
                                                    onClick={() => setIsProfileOpen(false)}
                                                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-text-muted transition-colors hover:bg-background hover:text-text"
                                                >
                                                    <User size={16} />
                                                    Ver Perfil
                                                </Link>
                                                <button
                                                    onClick={() => { signOut(); setIsProfileOpen(false); }}
                                                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-red-500 transition-colors hover:bg-red-50"
                                                >
                                                    <LogOut size={16} />
                                                    Sair
                                                </button>
                                            </motion.div>
                                        </>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <Link
                                href="/auth"
                                className="rounded-md bg-[#1A1612] px-6 py-2 text-[13px] font-semibold text-white transition-all hover:bg-black active:scale-95"
                            >
                                Entrar
                            </Link>
                        )}
                    </div>
                </nav>

                {/* Mobile Menu Button */}
                <button className="text-text md:hidden" onClick={toggleMenu}>
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={toggleMenu}
                            className="fixed inset-0 top-16 bg-black/10 backdrop-blur-[2px] md:hidden"
                        />

                        <motion.div
                            initial={{ y: '-100%' }}
                            animate={{ y: 0 }}
                            exit={{ y: '-100%', opacity: 0 }}
                            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                            className="absolute left-0 top-16 z-[-1] w-full border-b border-border bg-background px-6 py-8 shadow-lg md:hidden"
                        >
                            <nav className="flex flex-col gap-6">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        onClick={toggleMenu}
                                        className="text-lg font-medium text-text"
                                    >
                                        {link.name}
                                    </Link>
                                ))}

                                <hr className="border-border/50" />

                                {isAuthenticated ? (
                                    <div className="flex flex-col gap-4">
                                        <Link
                                            href="/profile"
                                            onClick={toggleMenu}
                                            className="flex items-center gap-3 text-lg font-medium text-text"
                                        >
                                            <User size={20} />
                                            Ver Perfil
                                        </Link>
                                        <button
                                            onClick={() => { signOut(); toggleMenu(); }}
                                            className="flex items-center gap-3 font-bold text-red-500"
                                        >
                                            <LogOut size={20} />
                                            Sair
                                        </button>
                                    </div>
                                ) : (
                                    <Link
                                        href="/auth"
                                        onClick={toggleMenu}
                                        className="flex w-full items-center justify-center rounded-md bg-[#1A1612] py-3 font-bold text-white"
                                    >
                                        Entrar
                                    </Link>
                                )}
                            </nav>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </header>
    )
}