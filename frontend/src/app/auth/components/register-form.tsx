'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/Input'
import { Button } from '@/components/Button'
import { registerSchema, RegisterData } from '@/types/schemas/auth'
import { useApi } from '@/hooks/useApi'
import { useState } from 'react'
import { StatusModal } from '@/components/StatusModal'


export function RegisterForm() {
    const { post, loading, error } = useApi()
    const [modal, setModal] = useState<{ open: boolean; type: 'success' | 'error'; message: string }>({
        open: false,
        type: 'success',
        message: ''
    })

    const { register, handleSubmit, reset, formState: { errors } } = useForm<RegisterData>({
        resolver: zodResolver(registerSchema)
    })

    const handleCloseModal = () => {
        setModal(prev => ({ ...prev, open: false }))
        if (modal.type === 'success') {
            reset()
        }
    }

    const onSubmit = async (data: RegisterData) => {
        const response = await post<any>('/auth/register', data);

        if (response.success) {
            setModal({
                open: true,
                type: 'success',
                message: 'Sua conta foi criada com brilho!'
            });
        } else {
            setModal({
                open: true,
                type: 'error',
                message:
                    response.error ||
                    'Ops! Algo deu errado ao criar sua conta.'
            });
        }
    };


    return (
        <>
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
                    <Button type="submit" disabled={loading}>
                        {loading ? 'PROCESSANDO...' : 'CRIAR CONTA'}
                    </Button>
                </div>
            </form>

            <StatusModal
                isOpen={modal.open}
                onClose={handleCloseModal}
                type={modal.type}
                message={modal.message}
            />
        </>
    )
}