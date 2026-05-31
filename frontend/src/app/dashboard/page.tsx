'use client'

import { useEffect, useState } from 'react';
import { PrivateRoute } from "@/components/PrivateRoute";
import Link from 'next/link';
import { Button } from '@/components/Button';
import { useApi } from '@/hooks/useApi';
import { PlusCircle, Edit2, Trash2, FileText, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { usePosts } from '@/contexts/PostsContext';
import { StatusModal } from '@/components/StatusModal';

export default function DashboardPage() {
    const { loading: authLoading } = useAuth();
    const { userPosts, loadingDashboard, fetchUserPosts, invalidateUserPosts, invalidateHomePosts } = usePosts();
    const { del, loading: deleteLoading } = useApi();

    const [modal, setModal] = useState({ open: false, type: 'success' as 'success' | 'error', message: '' });

    useEffect(() => {
        if (authLoading) return;
        fetchUserPosts();
    }, [authLoading]);

    const handleDelete = async (postId: string) => {
        if (!confirm('Deseja realmente remover este artigo? Esta ação ocultará a publicação.')) return;

        const response = await del<any>(`/posts/${postId}`);

        if (response.success) {
            invalidateUserPosts();
            invalidateHomePosts();
            fetchUserPosts(true);
            setModal({ open: true, type: 'success', message: 'Artigo removido com sucesso!' });
        } else {
            setModal({ open: true, type: 'error', message: response.error || 'Falha ao remover artigo.' });
        }
    };

    return (
        <PrivateRoute>
            <main className="max-w-5xl mx-auto p-6 md:p-12 font-sans">
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

                {loadingDashboard && !userPosts && (
                    <div className="flex flex-col items-center justify-center py-20 gap-3">
                        <Loader2 className="w-8 h-8 text-primary animate-spin" />
                        <p className="text-sm text-text-muted font-medium">Carregando seus artigos...</p>
                    </div>
                )}

                {!loadingDashboard && userPosts && (
                    <div className="flex flex-col gap-4">
                        {userPosts.length === 0 ? (
                            <div className="text-center py-16 bg-surface rounded-2xl border border-border/40">
                                <p className="text-text-muted font-medium">Você ainda não escreveu nenhum artigo.</p>
                            </div>
                        ) : (
                            <div className="overflow-hidden rounded-2xl border border-border/50 bg-surface">
                                <div className="divide-y divide-border/40">
                                    {userPosts.map((post) => (
                                        <div key={post.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-5 gap-4 hover:bg-background/40 transition-colors">
                                            <div className="flex items-start gap-3 max-w-xl">
                                                <FileText className="text-primary/70 mt-1 flex-shrink-0" size={20} />
                                                <div className="flex flex-col gap-1">
                                                    <div className="flex items-center gap-2">
                                                        <h3 className="font-semibold text-text text-base leading-snug">{post.title}</h3>
                                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${post.status === 'PUBLISHED' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'}`}>
                                                            {post.status === 'PUBLISHED' ? 'Publicado' : 'Rascunho'}
                                                        </span>
                                                    </div>
                                                    <span className="text-xs text-text-muted">Criado em {new Date(post.createdAt).toLocaleDateString('pt-BR')}</span>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2 self-end sm:self-center">
                                                <Link href={`/posts/edit/${post.id}`}>
                                                    <Button variant="primary" className="!py-1.5 !px-3 text-xs font-bold bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-white shadow-none flex items-center gap-1.5">
                                                        <Edit2 size={13} /> EDITAR
                                                    </Button>
                                                </Link>
                                                <Button variant="danger" onClick={() => handleDelete(post.id)} disabled={deleteLoading} className="!py-1.5 !px-3 text-xs font-bold bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white shadow-none flex items-center gap-1.5">
                                                    <Trash2 size={13} /> EXCLUIR
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </main>
            <StatusModal isOpen={modal.open} onClose={() => setModal({ ...modal, open: false })} type={modal.type} message={modal.message} />
        </PrivateRoute>
    );
}