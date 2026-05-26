'use client'

import { useState, useEffect, use } from 'react';
import { useApi } from '@/hooks/useApi';
import { SectionContainer } from '@/components/SectionContainer';
import { Button } from '@/components/Button';
import Link from 'next/link';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import { Post } from '@/types/components/PostCardProps';

interface PostDetailPageProps {
    params: Promise<{
        username: string;
        slug: string;
    }>;
}

export default function PostDetailPage({ params }: PostDetailPageProps) {
    const { username, slug } = use(params);

    const [post, setPost] = useState<Post | null>(null);
    const { get, loading, error } = useApi();

    useEffect(() => {
        async function loadPost() {
            const response = await get<Post>(`/posts/author/${username}/${slug}`);
            if (response.success && response.data) {
                setPost(response.data);
            }
        }
        loadPost();
    }, [username, slug]);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('pt-BR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };

    return (
        <SectionContainer className="py-12 md:py-20 max-w-3xl">
            {/* Botão Voltar */}
            <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm font-medium text-text-muted hover:text-primary transition-colors group mb-8"
            >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                <span>Voltar ao início</span>
            </Link>

            {/* Estado de Carregamento (Skeleton Screen) */}
            {loading && (
                <div className="animate-pulse flex flex-col gap-4">
                    <div className="h-4 bg-border/60 rounded w-24" />
                    <div className="h-12 bg-border/60 rounded w-3/4 my-2" />
                    <div className="h-4 bg-border/60 rounded w-48 mb-8" />
                    <div className="space-y-3">
                        <div className="h-4 bg-border/40 rounded w-full" />
                        <div className="h-4 bg-border/40 rounded w-full" />
                        <div className="h-4 bg-border/40 rounded w-5/6" />
                    </div>
                </div>
            )}

            {/* Estado de Erro / 404 (Requisito do Backlog) */}
            {error && !loading && (
                <div className="text-center py-16 bg-surface rounded-[2rem] border border-border/50 flex flex-col items-center gap-4 px-6">
                    <h2 className="font-title text-4xl text-text">Artigo não encontrado</h2>
                    <p className="text-text-muted max-w-sm text-sm">
                        O artigo que está a tentar aceder não existe ou o nome de utilizador do autor está incorreto.
                    </p>
                    <Link href="/" className="mt-2">
                        <Button variant="primary" className="px-6">EXPLORAR OUTROS POSTS</Button>
                    </Link>
                </div>
            )}

            {/* Conteúdo Completo do Artigo */}
            {!loading && !error && post && (
                <article className="font-sans">
                    <header className="flex flex-col gap-4 mb-8 pb-6 border-b border-border/40">
                        {/* Tag do Autor */}
                        <span className="text-xs font-bold text-primary uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full self-start">
                            @{post.author.username}
                        </span>

                        {/* Título */}
                        <h1 className="font-title text-4xl md:text-5xl font-black text-text leading-tight">
                            {post.title}
                        </h1>

                        {/* Metadados */}
                        <div className="flex flex-wrap items-center gap-4 text-xs text-text-muted">
                            <span className="flex items-center gap-1.5 font-medium">
                                <User size={14} className="text-primary/70" />
                                Por {post.author.name}
                            </span>
                            <span className="hidden sm:inline text-border">•</span>
                            <time dateTime={post.createdAt} className="flex items-center gap-1.5">
                                <Calendar size={14} className="text-primary/70" />
                                {formatDate(post.createdAt)}
                            </time>
                        </div>
                    </header>

                    {/* Corpo do Texto */}
                    <div
                        className="text-text/90 text-base md:text-lg leading-relaxed whitespace-pre-wrap selection:bg-primary/20"
                    >
                        {post.content}
                    </div>
                </article>
            )}
        </SectionContainer>
    );
}