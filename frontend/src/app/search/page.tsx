'use client'

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { usePosts } from '@/contexts/PostsContext';
import { SectionContainer } from '@/components/SectionContainer';
import { PostCard } from '@/components/PostCard';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { Search, Loader2, FileQuestion } from 'lucide-react';

function SearchResults() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const query = searchParams.get('q') || '';

    // Consumindo os novos estados e funções dedicadas à pesquisa
    const { searchPostsData, loadingSearch, fetchSearchPosts } = usePosts();
    const [searchTerm, setSearchTerm] = useState(query);
    const [page, setPage] = useState(1);

    useEffect(() => {
        setSearchTerm(query);
        fetchSearchPosts(page, 6, query); // Aciona o fluxo isolado de busca
    }, [query, page]);

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchTerm.trim()) {
            router.push('/');
            return;
        }
        setPage(1);
        router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    };

    return (
        <SectionContainer className="py-12 max-w-5xl font-sans flex flex-col gap-8">
            <form onSubmit={handleSearchSubmit} className="flex gap-2 max-w-xl w-full">
                <div className="flex-1">
                    <Input
                        label=''
                        type="text"
                        placeholder="Pesquisar por título ou conteúdo..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Button type="submit" className="flex items-center gap-2 !py-2.5">
                    <Search size={16} />
                    Buscar
                </Button>
            </form>

            <div>
                <h1 className="font-title text-2xl font-black text-text">
                    {query ? `Resultados para: "${query}"` : 'Explorar Artigos'}
                </h1>
                {searchPostsData && (
                    <p className="text-xs text-text-muted mt-1 font-medium uppercase tracking-wider">
                        Encontrados {searchPostsData.meta.totalItems} artigos
                    </p>
                )}
            </div>

            {loadingSearch && (
                <div className="flex flex-col items-center justify-center py-20 gap-3">
                    <Loader2 className="w-8 h-8 text-primary animate-spin" />
                    <p className="text-sm text-text-muted font-medium">Buscando publicações...</p>
                </div>
            )}

            {!loadingSearch && searchPostsData && (
                <>
                    {searchPostsData.posts.length === 0 ? (
                        <div className="flex flex-col items-center justify-center text-center py-16 bg-surface rounded-2xl border border-border/40 gap-3">
                            <FileQuestion className="text-text-muted/60" size={40} />
                            <div>
                                <p className="text-text font-semibold">Nenhum resultado correspondente</p>
                                <p className="text-sm text-text-muted mt-0.5">Tente usar palavras-chave diferentes ou termos mais abrangentes.</p>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {searchPostsData.posts.map((post) => (
                                <PostCard key={post.id} post={post} />
                            ))}
                        </div>
                    )}

                    {(searchPostsData.meta.totalPages > 1 && (
                    <div className="flex items-center justify-between border-t border-border/40 pt-6 mt-4">
                        <span className="text-xs font-semibold text-text-muted uppercase">
                            Página {searchPostsData.meta.currentPage} de {searchPostsData.meta.totalPages}
                        </span>
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                onClick={() => { setPage(p => p - 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                                disabled={page === 1}
                            >
                                Anterior
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => { setPage(p => p + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                                disabled={page === searchPostsData.meta.totalPages}
                            >
                                Próximo
                            </Button>
                        </div>
                    </div>
                    ))}
                </>
            )}
        </SectionContainer>
    );
}

export default function SearchPage() {
    return (
        <Suspense fallback={
            <div className="min-h-[50vh] flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
        }>
            <SearchResults />
        </Suspense>
    );
}