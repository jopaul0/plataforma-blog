'use client'

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { useApi } from '@/hooks/useApi';
import { SectionContainer } from '@/components/SectionContainer';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { PrivateRoute } from '@/components/PrivateRoute';
import { ArrowLeft, Save, Globe, Loader2, Calendar, Link2 } from 'lucide-react';
import Link from 'next/link';
import { generateSlug } from '@/utils/generateSlug';

interface EditPostPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default function EditPostPage({ params }: EditPostPageProps) {
    const { id } = use(params);
    const router = useRouter();

    const { get, put, loading, error } = useApi();

    // Estados dos campos do Artigo
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [status, setStatus] = useState<'DRAFT' | 'PUBLISHED'>('DRAFT');
    const [createdAt, setCreatedAt] = useState('');
    const [username, setUsername] = useState('');

    const [formError, setFormError] = useState('');
    const [fetchingPost, setFetchingPost] = useState(true);

    useEffect(() => {
        async function loadPostData() {
            setFetchingPost(true);

            const response = await get<any>(`/posts/${id}`);
            if (response.success && response.data) {
                setTitle(response.data.title || '');
                setContent(response.data.content || '');
                setStatus(response.data.status || 'DRAFT');
                setCreatedAt(response.data.createdAt || '');

                if (response.data.author?.username) {
                    setUsername(response.data.author.username);
                }
            }
            setFetchingPost(false);
        }
        loadPostData();
    }, [id]);

    const formattedDate = createdAt
        ? new Date(createdAt).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })
        : '';

    const slugPreview = title ? generateSlug(title) : '';

    const handleSubmit = async (currentStatus: 'DRAFT' | 'PUBLISHED') => {
        setFormError('');

        if (title.trim().length < 5) {
            setFormError('O título deve ter pelo menos 5 caracteres.');
            return;
        }
        if (content.trim().length < 10) {
            setFormError('O conteúdo deve ter pelo menos 10 caracteres.');
            return;
        }

        const response = await put<any>(`/posts/${id}`, {
            title,
            content,
            status: currentStatus,
        });

        if (response.success) {
            router.push('/dashboard');
            router.refresh();
        } else {
            setFormError(response.error || 'Não foi possível salvar as alterações.');
        }
    };

    if (fetchingPost) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
                <p className="text-sm text-text-muted font-medium">Carregando dados do artigo...</p>
            </div>
        );
    }

    return (
        <PrivateRoute>
            <SectionContainer className="py-12 max-w-3xl">

                {/* Cabeçalho da Página com Metadados */}
                <div className="flex flex-col gap-4 mb-8">
                    <Link
                        href="/dashboard"
                        className="inline-flex items-center gap-2 text-sm font-medium text-text-muted hover:text-primary transition-colors group"
                    >
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        <span>Voltar para o Dashboard</span>
                    </Link>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <h1 className="font-title text-3xl md:text-4xl font-black text-text">
                            Editar Artigo
                        </h1>

                        {/* Indicador visual do status vindo da API */}
                        <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border self-start ${status === 'PUBLISHED'
                            ? 'bg-green-500/10 text-green-400 border-green-500/20'
                            : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                            }`}>
                            {status === 'PUBLISHED' ? '● Publicado' : '○ Rascunho'}
                        </span>
                    </div>

                    {/* Exibição da Data de Criação Nativa */}
                    {createdAt && (
                        <div className="flex items-center gap-1.5 text-xs text-text-muted font-medium">
                            <Calendar size={14} className="text-primary/70" />
                            <span>Criado originalmente em {formattedDate}</span>
                        </div>
                    )}
                </div>

                {(formError || error) && (
                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-center mb-6">
                        <p className="text-sm font-medium text-red-400">{formError || error}</p>
                    </div>
                )}

                {/* Formulário Controlado */}
                <div className="flex flex-col gap-6 bg-surface p-6 md:p-8 rounded-2xl border border-border/60">

                    {/* Input de Título */}
                    <div>
                        {/* CORREÇÃO: Forçando o mapeamento explícito do value e do name para sincronizar o forwardRef */}
                        <Input
                            label="Título do Artigo"
                            name="title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            disabled={loading}
                        />

                        {/* Prévia dinâmica de URL baseado na alteração do título */}
                        {title && username && (
                            <div className="mt-2 flex items-center gap-1.5 text-xs text-text-muted bg-background/50 p-2.5 rounded-xl border border-border/40 font-mono">
                                <Link2 size={13} className="text-primary flex-shrink-0" />
                                <span className="truncate">
                                    Link permanente: /posts/{username}/<span className="text-primary font-bold">{slugPreview}</span>
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Textarea de Conteúdo */}
                    <div>
                        <label className="block text-sm font-medium text-text-muted mb-2">Conteúdo do Post</label>
                        <textarea
                            className="w-full min-h-[320px] p-4 bg-background text-text border border-border/60 rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-text-muted/50 font-sans text-base transition-all resize-y shadow-sm"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            disabled={loading}
                        />
                    </div>

                    {/* Botões de Persistência */}
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
                            {loading ? 'Salvando...' : status === 'PUBLISHED' ? 'Atualizar Artigo' : 'Salvar e Publicar'}
                        </Button>
                    </div>
                </div>
            </SectionContainer>
        </PrivateRoute>
    );
}