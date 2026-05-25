'use client'

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { useApi } from '@/hooks/useApi';
import { useAuth } from '@/contexts/AuthContext';
import { StatusModal } from '@/components/StatusModal';
import { loginSchema, LoginData } from '@/types/schemas/auth';

export function LoginForm() {
    const { post, loading, error: apiError } = useApi();
    const { signIn } = useAuth();
    const [modal, setModal] = useState({ open: false, type: 'error' as 'error' | 'success', message: '' });

    const { register, handleSubmit, formState: { errors } } = useForm<LoginData>({
        resolver: zodResolver(loginSchema)
    });

    const onSubmit = async (data: LoginData) => {
        const response = await post<{ user: any; token: string }>(
            '/auth/login',
            data
        );

        if (response.success && response.data) {
            signIn({
                user: response.data.user,
                token: response.data.token
            });

            window.location.href = '/dashboard';
        } else {
            setModal({
                open: true,
                type: 'error',
                message:
                    response.error ||
                    'E-mail ou senha incorretos.'
            });
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full">
                <h1 className="font-title text-4xl text-primary text-center">Entrar</h1>
                <Input
                    label="E-mail"
                    type="email"
                    placeholder="exemplo@email.com"
                    error={errors.email?.message}
                    {...register('email')}
                />
                <div className="flex flex-col">
                    <Input
                        label="Senha"
                        type="password"
                        placeholder="••••••••"
                        error={errors.password?.message}
                        {...register('password')}
                    />
                    <a href="#" className="text-xs text-primary hover:text-primary-hover hover:underline self-end mt-2 font-medium transition-colors">
                        Esqueceu a senha?
                    </a>
                </div>
                <div className="mt-4">
                    <Button type="submit" disabled={loading}>
                        {loading ? 'AUTENTICANDO...' : 'ENTRAR'}
                    </Button>
                </div>
            </form>

            <StatusModal
                isOpen={modal.open}
                onClose={() => setModal({ ...modal, open: false })}
                type={modal.type}
                message={modal.message}
            />
        </>
    );
}