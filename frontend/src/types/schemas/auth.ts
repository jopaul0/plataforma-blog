import { z } from 'zod'

export const registerSchema = z.object({
    name: z.string()
        .min(3, 'O nome deve ter pelo menos 3 caracteres')
        .regex(/^[A-Za-zÀ-ÿ]+(?:\s[A-Za-zÀ-ÿ]+)*$/, 'O nome deve conter apenas letras'),
    username: z.string().min(3, 'O nome de usuário deve ter pelo menos 3 caracteres'),
    email: z.email('E-mail inválido'),
    password: z.string()
        .min(8, 'A senha deve ter pelo menos 8 caracteres')
        .regex(/[a-z]/, 'A senha deve conter pelo menos uma letra minúscula')
        .regex(/[A-Z]/, 'A senha deve conter pelo menos uma letra maiúscula')
        .regex(/[0-9]/, 'A senha deve conter pelo menos um número')
        .regex(/[^a-zA-Z0-9]/, 'A senha deve conter pelo menos um caractere especial'),
});

export type RegisterData = z.infer<typeof registerSchema>