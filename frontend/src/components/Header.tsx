'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, LogOut, User, ChevronDown } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import navRoutes from '@/constants/navRoutes'
import { usePathname } from 'next/navigation'
import { Button } from './Button'

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isProfileOpen, setIsProfileOpen] = useState(false)
    const { user, isAuthenticated, signOut } = useAuth()
    const pathname = usePathname()

    if (pathname === '/auth') return null

    const navLinks = isAuthenticated ? navRoutes.isAuthenticated : navRoutes.default
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

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
                        <Link key={link.name} href={link.href} className="text-[13px] font-medium text-text-muted transition-colors hover:text-text">
                            {link.name}
                        </Link>
                    ))}

                    <div className="flex items-center gap-6">
                        {isAuthenticated ? (
                            <UserDropdown
                                user={user}
                                isOpen={isProfileOpen}
                                setIsOpen={setIsProfileOpen}
                                signOut={signOut}
                            />
                        ) : (
                            <Link href="/auth">
                                <Button className="px-8">Entrar</Button>
                            </Link>
                        )}
                    </div>
                </nav>

                {/* Mobile Trigger */}
                <button className="text-text md:hidden" onClick={toggleMenu}>
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            <MobileMenu
                isOpen={isMenuOpen}
                toggle={toggleMenu}
                navLinks={navLinks}
                isAuthenticated={isAuthenticated}
                signOut={signOut}
            />
        </header>
    )
}

/* --- Sub-componentes--- */

function UserDropdown({ user, isOpen, setIsOpen, signOut }: any) {
    return (
        <div className="relative border-l border-border/60 pl-6">
            <button onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-2 text-[13px] font-semibold text-text hover:text-primary transition-colors">
                <span className="max-w-[120px] truncate">{user?.username || user?.name}</span>
                <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown size={16} />
                </motion.div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <div className="fixed inset-0 z-[-1]" onClick={() => setIsOpen(false)} />
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute right-0 mt-4 w-48 rounded-xl border border-border bg-surface p-2 shadow-xl">
                            <Link href="/profile" onClick={() => setIsOpen(false)} className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-text-muted transition-colors hover:bg-background hover:text-text">
                                <User size={16} /> Ver Perfil
                            </Link>
                            <button onClick={() => { signOut(); setIsOpen(false); }} className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-red-500 transition-colors hover:bg-red-50">
                                <LogOut size={16} /> Sair
                            </button>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    )
}

function MobileMenu({ isOpen, toggle, navLinks, isAuthenticated, signOut }: any) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={toggle} className="fixed inset-0 top-16 bg-black/10 backdrop-blur-[2px] md:hidden" />
                    <motion.div initial={{ y: '-100%' }} animate={{ y: 0 }} exit={{ y: '-100%', opacity: 0 }} transition={{ type: 'spring', damping: 30, stiffness: 300 }} className="absolute left-0 top-16 z-[-1] w-full border-b border-border bg-background px-6 py-8 shadow-lg md:hidden">
                        <nav className="flex flex-col gap-6">
                            {navLinks.map((link: any) => (
                                <Link key={link.name} href={link.href} onClick={toggle} className="text-lg font-medium text-text">
                                    {link.name}
                                </Link>
                            ))}
                            <hr className="border-border/50" />
                            {isAuthenticated ? (
                                <div className="flex flex-col gap-4">
                                    <Link href="/profile" onClick={toggle} className="flex items-center gap-3 text-lg font-medium text-text"><User size={20} /> Ver Perfil</Link>
                                    <button onClick={() => { signOut(); toggle(); }} className="flex items-center gap-3 font-bold text-red-500"><LogOut size={20} /> Sair</button>
                                </div>
                            ) : (
                                <Link href="/auth" onClick={toggle}>
                                    <Button className="w-full">Entrar</Button>
                                </Link>
                            )}
                        </nav>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}