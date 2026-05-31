'use client'

import { useState, useEffect, use } from 'react';
import { useApi } from '@/hooks/useApi';
import { useAuth } from '@/contexts/AuthContext';
import { usePosts } from '@/contexts/PostsContext';
import { SectionContainer } from '@/components/SectionContainer';
import { Button } from '@/components/Button';
import Link from 'next/link';
import { ArrowLeft, Calendar, User, Heart, MessageSquare, Trash2 } from 'lucide-react';
import { Post } from '@/types/components/PostCardProps';

interface PostDetailPageProps {
    params: Promise<{ username: string; slug: string }>;
}

export default function PostDetailPage({ params }: PostDetailPageProps) {
    const { username, slug } = use(params);
    const { user: loggedInUser } = useAuth();
    const { invalidateHomePosts, invalidateUserPosts } = usePosts();
    const { get, post: apiPost, del, loading, error } = useApi();

    const [post, setPost] = useState<Post | null>(null);
    const [comments, setComments] = useState<any[]>([]);
    const [newComment, setNewComment] = useState('');

    const loadPostAndComments = async () => {
        const postRes = await get<Post>(`/posts/author/${username}/${slug}`);
        if (postRes.success && postRes.data) {
            setPost(postRes.data);

            // Busca os comentários vinculados à postagem (Task 13-1)
            const commentRes = await get<any>(`/posts/${postRes.data.id}/comments`);
            if (commentRes.success && commentRes.data?.comments) {
                setComments(commentRes.data.comments);
            }
        }
    };

    useEffect(() => {
        loadPostAndComments();
    }, [username, slug]);

    const handleLike = async () => {
        if (!post) return;
        const res = await apiPost<any>(`/posts/${post.id}/likes`, {});
        if (res.success) {
            invalidateHomePosts();
            invalidateUserPosts();
            setPost(prev => prev ? {
                ...prev,
                likedByMe: !prev.likedByMe,
                likesCount: prev.likedByMe ? prev.likesCount - 1 : prev.likesCount + 1
            } : null);
        }
    };

    const handleCommentSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!post || !newComment.trim()) return;

        const res = await apiPost<any>(`/posts/${post.id}/comments`, { content: newComment });
        if (res.success && res.data?.comment) {
            setComments(prev => [...prev, res.data.comment]);
            setNewComment('');
        }
    };

    const handleCommentDelete = async (commentId: string) => {
        if (!confirm('Excluir este comentário?')) return;
        const res = await del<any>(`/comments/${commentId}`);
        if (res.success) {
            setComments(prev => prev.filter(c => c.id !== commentId));
        }
    };

    return (
        <SectionContainer className="py-12 max-w-3xl font-sans">
            <Link href="/" className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-primary mb-8 group font-medium">
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Voltar ao início
            </Link>

            {loading && !post && <div className="h-32 bg-surface animate-pulse rounded-2xl" />}

            {!loading && post && (
                <>
                    <article>
                        <header className="flex flex-col gap-4 mb-8 pb-6 border-b border-border/40">
                            <Link href={`/users/${post.authorId}`} className="text-xs font-bold text-primary uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full self-start hover:bg-primary/20">
                                @{post.author.username}
                            </Link>
                            <h1 className="font-title text-4xl md:text-5xl font-black text-text leading-tight">{post.title}</h1>
                            <div className="flex flex-wrap items-center gap-4 text-xs text-text-muted">
                                <span className="flex items-center gap-1.5 font-medium">
                                    <User size={14} className="text-primary/70" /> Por {post.author.name}
                                </span>
                                <time className="flex items-center gap-1.5">
                                    <Calendar size={14} className="text-primary/70" /> {new Date(post.createdAt).toLocaleDateString('pt-BR')}
                                </time>
                            </div>
                        </header>

                        <div className="text-text/90 text-base md:text-lg leading-relaxed whitespace-pre-wrap mb-10">{post.content}</div>

                        {/* Barra de Interação (Likes) */}
                        <div className="flex items-center gap-3 border-y border-border/40 py-4 mb-12">
                            <button onClick={handleLike} className={`flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl border transition-all ${post.likedByMe ? 'bg-red-500/10 border-red-500/20 text-red-500' : 'bg-surface border-border/40 text-text-muted hover:text-text'}`}>
                                <Heart size={18} fill={post.likedByMe ? 'currentColor' : 'none'} />
                                <span>{post.likesCount} Curtidas</span>
                            </button>
                        </div>
                    </article>

                    {/* Seção de Comentários */}
                    <section className="mt-12">
                        <h3 className="text-xl font-bold text-text mb-6 flex items-center gap-2">
                            <MessageSquare size={20} className="text-primary" /> Comentários ({comments.length})
                        </h3>

                        {loggedInUser ? (
                            <form onSubmit={handleCommentSubmit} className="flex flex-col gap-3 mb-8">
                                <textarea value={newComment} onChange={e => setNewComment(e.target.value)} placeholder="Escreva seu comentário..." className="w-full h-24 p-3 bg-surface text-text border border-border/60 rounded-xl outline-none text-sm font-sans focus:border-primary resize-none" />
                                <Button type="submit" className="sm:w-auto self-end !py-2 !px-5 text-xs">ENVIAR COMENTÁRIO</Button>
                            </form>
                        ) : (
                            <p className="text-sm text-text-muted mb-8 bg-surface p-4 rounded-xl border border-border/40 text-center">Faça <Link href="/auth" className="text-primary font-bold underline">login</Link> para participar do debate.</p>
                        )}

                        <div className="flex flex-col gap-4">
                            {comments.map(comment => (
                                <div key={comment.id} className="p-4 bg-surface rounded-xl border border-border/40 flex justify-between gap-4">
                                    <div className="flex flex-col gap-1.5">
                                        <div className="flex items-center gap-2 text-xs">
                                            <span className="font-bold text-text">@{comment.author.username}</span>
                                            <span className="text-text-muted/60">{new Date(comment.createdAt).toLocaleDateString('pt-BR')}</span>
                                        </div>
                                        <p className="text-sm text-text/90 leading-relaxed">{comment.content}</p>
                                    </div>
                                    {loggedInUser?.id === comment.authorId && (
                                        <button onClick={() => handleCommentDelete(comment.id)} className="text-text-muted hover:text-red-500 self-start transition-colors p-1">
                                            <Trash2 size={15} />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                </>
            )}
        </SectionContainer>
    );
}