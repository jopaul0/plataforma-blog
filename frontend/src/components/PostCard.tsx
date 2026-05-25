'use client'

import Link from 'next/link';
import PostCardProps from '@/types/components/PostCardProps';

export function PostCard({ post }: PostCardProps) {
    const { title, slug, content, createdAt, author } = post;

    const formattedDate = new Date(createdAt).toLocaleDateString('pt-BR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

    const cleanContent = content.replace(/<[^>]*>/g, '');
    const excerpt = cleanContent.length > 140
        ? `${cleanContent.substring(0, 140)}...`
        : cleanContent;

    return (
        <article className="group flex flex-col justify-between p-6 bg-surface rounded-2xl border border-border/60 hover:border-primary/40 transition-all duration-300 hover:shadow-lg">
            <div className="flex flex-col flex-1">

                {/* Metadados: Autor e Data */}
                <div className="flex items-center gap-2 text-xs font-medium text-text-muted mb-3">
                    <span className="font-semibold text-text group-hover:text-primary transition-colors">
                        @{author.username}
                    </span>
                    <span className="text-border">•</span>
                    <time dateTime={createdAt}>{formattedDate}</time>
                </div>

                {/* Título do Post */}
                <h3 className="font-title text-2xl font-bold tracking-tight text-text mb-3 leading-snug group-hover:text-primary transition-colors">
                    <Link href={`/posts/${slug}`}>
                        {title}
                    </Link>
                </h3>

                {/* Trecho do Conteúdo */}
                <p className="font-sans text-sm text-text-muted leading-relaxed mb-6 flex-1">
                    {excerpt}
                </p>
            </div>

            {/* Link de Ação */}
            <div className="pt-2 border-t border-border/30">
                <Link
                    href={`/posts/${slug}`}
                    className="inline-flex items-center text-xs font-bold text-primary hover:text-primary-hover tracking-wider uppercase transition-colors"
                >
                    Ler artigo completo →
                </Link>
            </div>
        </article>
    );
}