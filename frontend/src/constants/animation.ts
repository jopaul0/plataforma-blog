import { Transition, Variants } from 'framer-motion'

export const AUTH_SPRING: Transition = {
    type: 'spring',
    stiffness: 320,
    damping: 36,
    mass: 1,
}

export const FADE_Y: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
}

export const TITLE_SLIDE: Variants = {
    initial: (isLogin: boolean) => ({ opacity: 0, x: isLogin ? -24 : 24 }),
    animate: { opacity: 1, x: 0 },
    exit: (isLogin: boolean) => ({ opacity: 0, x: isLogin ? 24 : -24 })
}