'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApi } from '@/hooks/useApi';
import { usePosts } from '@/contexts/PostsContext';
import { SectionContainer } from '@/components/SectionContainer';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { PrivateRoute } from '@/components/PrivateRoute';
import { ArrowLeft, Save, Globe } from 'lucide-react';
import Link from 'next/link';

export default function CreatePostPage() {
    const router = useRouter();
    const { post, loading, error } = useApi();

    const { invalidateUserPosts, invalidateHomePosts } = usePosts();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [formError, setFormError] = useState('');

    const handleSubmit = async (status: 'DRAFT' | 'PUBLISHED') => {
        setFormError('');

        if (title.trim().length < 5) {
            setFormError('O título deve ter pelo menos 5 caracteres.');
            return;
        }
        if (content.trim().length < 10) {
            setFormError('O conteúdo deve ter pelo menos 10 caracteres.');
            return;
        }

        const response = await post<any>('/posts', {
            title,
            content,
            status,
        });

        if (response.success) {
            invalidateUserPosts();
            invalidateHomePosts();

            router.push('/dashboard');
            router.refresh();
        } else {
            setFormError(response.error || 'Não foi possível salvar a publicação.');
        }
    };

    return (
        <PrivateRoute>
            <SectionContainer className="py-12 max-w-3xl font-sans">
                <div className="flex flex-col gap-4 mb-8">
                    <Link
                        href="/dashboard"
                        className="inline-flex items-center gap-2 text-sm font-medium text-text-muted hover:text-primary transition-colors group"
                    >
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        <span>Voltar para o Dashboard</span>
                    </Link>
                    <h1 className="font-title text-3xl md:text-4xl font-black text-text">
                        Criar Novo Artigo
                    </h1>
                </div>

                {(formError || error) && (
                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-center mb-6">
                        <p className="text-sm font-medium text-red-400">{formError || error}</p>
                    </div>
                )}

                {/* Formulário */}
                <div className="flex flex-col gap-6 bg-surface p-6 md:p-8 rounded-2xl border border-border/60">
                    <div>
                        <Input
                            label="Título do Artigo"
                            type="text"
                            placeholder="Ex: Dominando a Arquitetura com Clean Code"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            disabled={loading}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-text-muted mb-2">Conteúdo do Post</label>
                        <textarea
                            className="w-full min-h-[300px] p-4 bg-background text-text border border-border/60 rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-text-muted/50 font-sans text-base transition-all resize-y shadow-sm"
                            placeholder="Escreva aqui o corpo do seu artigo completo..."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            disabled={loading}
                        />
                    </div>

                    {/* Botões de Ação */}
                    <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-border/40">
                        <Button
                            variant="outline"
                            onClick={() => handleSubmit('DRAFT')}
                            disabled={loading}
                            className="w-full sm:w-auto flex items-center justify-center gap-2"
                        >
                            <Save size={16} />
                            Salvar como Rascunho
                        </Button>
                        <Button
                            variant="primary"
                            onClick={() => handleSubmit('PUBLISHED')}
                            disabled={loading}
                            className="w-full sm:w-auto flex items-center justify-center gap-2"
                        >
                            <Globe size={16} />
                            {loading ? 'Publicando...' : 'Publicar Artigo'}
                        </Button>
                    </div>
                </div>
            </SectionContainer>
        </PrivateRoute>
    );
}