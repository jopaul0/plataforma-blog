'use client'

import { useEffect, useState, use } from 'react';
import { useApi } from '@/hooks/useApi';
import { SectionContainer } from '@/components/SectionContainer';
import { PostCard } from '@/components/PostCard';
import { User, Loader2 } from 'lucide-react';

interface PublicProfilePageProps {
    params: Promise<{ id: string }>;
}

export default function PublicProfilePage({ params }: PublicProfilePageProps) {
    const { id } = use(params);
    const { get, loading, error } = useApi();
    const [authorData, setAuthorData] = useState<any | null>(null);

    useEffect(() => {
        async function loadAuthorProfile() {
            const response = await get<any>(`/auth/users/${id}`);
            if (response.success && response.data) {
                setAuthorData(response.data);
            }
        }
        loadAuthorProfile();
    }, [id]);

    return (
        <SectionContainer className="py-12 max-w-4xl font-sans">
            {loading && (
                <div className="min-h-[40vh] flex flex-col items-center justify-center gap-2">
                    <Loader2 className="w-8 h-8 text-primary animate-spin" />
                    <p className="text-sm text-text-muted">Carregando perfil do autor...</p>
                </div>
            )}

            {error && (
                <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-xl text-center">
                    <p className="text-sm font-medium text-red-400">Autor não encontrado.</p>
                </div>
            )}

            {!loading && authorData && (
                <div className="flex flex-col gap-10">
                    <div className="bg-surface rounded-2xl border border-border/50 p-6 flex items-center gap-4">
                        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            <User size={24} />
                        </div>
                        <div>
                            <h1 className="font-title text-3xl font-black text-text">{authorData.name}</h1>
                            <p className="text-sm text-text-muted">@{authorData.username}</p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-6">
                        <h2 className="text-xl font-bold text-text border-b border-border/40 pb-2">Artigos Publicados</h2>
                        {authorData.posts?.length === 0 ? (
                            <p className="text-sm text-text-muted">Este autor ainda não publicou nenhum artigo.</p>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {authorData.posts.map((post: any) => (
                                    // Injeta o nó do autor no objeto post para manter compatibilidade com o PostCard
                                    <PostCard key={post.id} post={{ ...post, author: { id: authorData.id, name: authorData.name, username: authorData.username } }} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </SectionContainer>
    );
}