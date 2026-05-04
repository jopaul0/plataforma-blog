'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/Input'
import { Button } from '@/components/Button'
import { registerSchema, RegisterData } from '@/types/schemas/auth'

export function RegisterForm() {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterData>({
        resolver: zodResolver(registerSchema)
    })

    const onSubmit = async (data: RegisterData) => {
        try {
            console.log("Enviando dados para a API:", data)
            // Chamada Axios virá aqui em seguida
        } catch (error) {
            console.error("Erro no registro:", error)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 w-full">
            <h1 className="font-title text-4xl text-primary text-center">Criar Conta</h1>
            <Input
                label="Nome"
                placeholder="Seu nome completo"
                error={errors.name?.message}
                {...register('name')}
            />
            <Input
                label="Nome de usuário"
                placeholder="ex: joao_dev"
                error={errors.username?.message}
                {...register('username')}
            />
            <Input
                label="E-mail"
                type="email"
                placeholder="exemplo@email.com"
                error={errors.email?.message}
                {...register('email')}
            />
            <Input
                label="Senha"
                type="password"
                placeholder="••••••••"
                error={errors.password?.message}
                {...register('password')}
            />
            <div className="mt-2">
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'CRIANDO...' : 'CRIAR CONTA'}
                </Button>
            </div>
        </form>
    )
}