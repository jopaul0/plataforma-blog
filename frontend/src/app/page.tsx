'use client'

import { useState, useEffect } from 'react';
import { usePosts } from '@/contexts/PostsContext';
import { SectionContainer } from '@/components/SectionContainer';
import { PostCard } from '@/components/PostCard';
import { Button } from '@/components/Button';

export default function HomePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 6;

  const { homePostsData, loadingHome, fetchHomePosts } = usePosts();

  useEffect(() => {
    fetchHomePosts(currentPage, perPage);
  }, [currentPage]);

  const handleNextPage = () => {
    if (homePostsData && currentPage < homePostsData.meta.totalPages) {
      setCurrentPage((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <SectionContainer className="py-12 md:py-20 flex flex-col gap-12">
      {/* Header Principal */}
      <div className="flex flex-col gap-4 max-w-2xl">
        <h1 className="font-title text-4xl md:text-5xl font-black tracking-tight text-text leading-none">
          Bem-vindo ao <span className="text-primary">Portal Lux</span>
        </h1>
        <p className="font-sans text-base md:text-lg text-text-muted leading-relaxed">
          Explore os artigos mais recentes sobre desenvolvimento de software, arquitetura de sistemas e segurança.
        </p>
      </div>

      {/* Skeletons de Carregamento */}
      {loadingHome && !homePostsData && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-64 bg-surface/60 rounded-2xl border border-border/40" />
          ))}
        </div>
      )}

      {/* Renderização baseada no Cache */}
      {!loadingHome && homePostsData && (
        <>
          {homePostsData.posts.length === 0 ? (
            <div className="text-center py-20 bg-surface rounded-2xl border border-border/40">
              <p className="text-text-muted font-medium">Nenhum artigo publicado no momento.</p>
            </div>
          ) : (
            <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {homePostsData.posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </main>
          )}

          {/* Paginação */}
          {homePostsData.meta.totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-border/40 pt-6 mt-4">
              <div className="text-xs font-semibold tracking-wider text-text-muted uppercase">
                Página {homePostsData.meta.currentPage} de {homePostsData.meta.totalPages}
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                >
                  ← Anterior
                </Button>
                <Button
                  variant="outline"
                  onClick={handleNextPage}
                  disabled={currentPage === homePostsData.meta.totalPages}
                >
                  Próximo →
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </SectionContainer>
  );
}