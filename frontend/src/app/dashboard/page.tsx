'use client'

import { useState, useEffect } from 'react';
import { PrivateRoute } from "@/components/PrivateRoute";
import Link from 'next/link';
import { Button } from '@/components/Button';
import { useApi } from '@/hooks/useApi';
import { PaginatedPostsResponse } from '@/types/api/posts';
import { PlusCircle, Edit2, FileText, Loader2 } from 'lucide-react';

export default function DashboardPage() {
    const [postsData, setPostsData] = useState<PaginatedPostsResponse | null>(null);
    const { get, loading, error } = useApi();

    // Carrega os posts para gerenciamento no painel
    useEffect(() => {
        async function loadUserPosts() {
            const response = await get<PaginatedPostsResponse>('/posts?perPage=20');
            if (response.success && response.data) {
                setPostsData(response.data);
            }
        }
        loadUserPosts();
    }, []);

    return (
        <PrivateRoute>
            <main className="max-w-5xl mx-auto p-6 md:p-12 font-sans">
                {/* Cabeçalho do Dashboard */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-border/40">
                    <div>
                        <h1 className="font-title text-3xl font-black text-text">Meu Painel</h1>
                        <p className="text-sm text-text-muted">Gerencie suas publicações no Portal Lux</p>
                    </div>

                    <Link href="/posts/create">
                        <Button variant="primary" className="flex items-center gap-2 font-bold tracking-wider sm:w-auto">
                            <PlusCircle size={18} />
                            NOVO POST
                        </Button>
                    </Link>
                </div>

                {/* Feedback de Carregamento */}
                {loading && (
                    <div className="flex flex-col items-center justify-center py-20 gap-3">
                        <Loader2 className="w-8 h-8 text-primary animate-spin" />
                        <p className="text-sm text-text-muted font-medium">Carregando seus artigos...</p>
                    </div>
                )}

                {/* Lista de Posts para Edição */}
                {!loading && postsData && (
                    <div className="flex flex-col gap-4">
                        {postsData.posts.length === 0 ? (
                            <div className="text-center py-16 bg-surface rounded-2xl border border-border/40">
                                <p className="text-text-muted font-medium">Você ainda não escreveu nenhum artigo.</p>
                            </div>
                        ) : (
                            <div className="overflow-hidden rounded-2xl border border-border/50 bg-surface">
                                <div className="divide-y divide-border/40">
                                    {postsData.posts.map((post) => (
                                        <div
                                            key={post.id}
                                            className="flex flex-col sm:flex-row sm:items-center justify-between p-5 gap-4 hover:bg-background/40 transition-colors"
                                        >
                                            {/* Informações do Post */}
                                            <div className="flex items-start gap-3 max-w-xl">
                                                <FileText className="text-primary/70 mt-1 flex-shrink-0" size={20} />
                                                <div className="flex flex-col gap-1">
                                                    <h3 className="font-semibold text-text text-base leading-snug">
                                                        {post.title}
                                                    </h3>
                                                    <span className="text-xs text-text-muted">
                                                        Criado em {new Date(post.createdAt).toLocaleDateString('pt-BR')}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* O BOTÃO DE EDITAR FICA AQUI */}
                                            <div className="flex items-center gap-2 self-end sm:self-center">
                                                <Link href={`/posts/edit/${post.id}`} className="w-full sm:w-auto">
                                                    <Button
                                                        variant="primary"
                                                        className="!py-1.5 !px-4 text-xs font-bold bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-white transition-all shadow-none flex items-center gap-1.5"
                                                    >
                                                        <Edit2 size={14} />
                                                        EDITAR
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </main>
        </PrivateRoute>
    );
}