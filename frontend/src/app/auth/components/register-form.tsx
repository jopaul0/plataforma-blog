'use client'

import { Input } from '@/components/Input'
import { Button } from '@/components/Button'

export function RegisterForm() {
    return (
        <form className="flex flex-col gap-4 w-full">
            <Input
                label="Nome"
                type="text"
                placeholder="Seu nome completo"
                variant="default"
            />
            <Input
                label="E-mail"
                type="email"
                placeholder="exemplo@email.com"
            />
            <Input
                label="Senha"
                type="password"
                placeholder="••••••••"
            />

            <div className="mt-2">
                <Button type="submit">CRIAR CONTA</Button>
            </div>
        </form>
    )
}