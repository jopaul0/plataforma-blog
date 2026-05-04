'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

export function ModalPortal({ children }: { children: React.ReactNode }) {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        return () => setMounted(false)
    }, [])

    return mounted
        ? createPortal(children, document.getElementById('modal-root')!)
        : null
}