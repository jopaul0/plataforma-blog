'use client'

import { Input } from '@/components/Input'
import { Button } from '@/components/Button'

export function LoginForm() {
    return (
        <form className="flex flex-col gap-4 w-full">
            <h1 className="font-title text-4xl text-primary text-center">Entrar</h1>
            <Input
                label="E-mail"
                type="email"
                placeholder="exemplo@email.com"
                required
            />

            <div className="flex flex-col">
                <Input
                    label="Senha"
                    type="password"
                    placeholder="••••••••"
                    required
                />
                <a
                    href="#"
                    className="text-xs text-primary hover:text-primary-hover hover:underline self-end mt-2 font-medium transition-colors"
                >
                    Esqueceu a senha?
                </a>
            </div>

            <div className="mt-4">
                <Button type="submit">ENTRAR</Button>
            </div>
        </form>
    )
}