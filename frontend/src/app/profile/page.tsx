'use client'

import { PrivateRoute } from '@/components/PrivateRoute';
import { useAuth } from '@/contexts/AuthContext';
import { usePosts } from '@/contexts/PostsContext';
import { SectionContainer } from '@/components/SectionContainer';
import { User, Mail, Calendar, FileText } from 'lucide-react';

export default function ProfilePage() {
    const { user } = useAuth();
    const { userPosts } = usePosts();

    return (
        <PrivateRoute>
            <SectionContainer className="py-12 max-w-2xl font-sans">
                <div className="bg-surface rounded-[2rem] border border-border/60 p-8 shadow-sm flex flex-col gap-6">
                    <div className="flex items-center gap-4 pb-6 border-b border-border/40">
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            <User size={32} />
                        </div>
                        <div>
                            <h1 className="font-title text-3xl font-black text-text">{user?.name}</h1>
                            <p className="text-sm text-text-muted">@{user?.username}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex items-center gap-3 p-4 bg-background rounded-xl border border-border/40">
                            <Mail className="text-primary/70" size={18} />
                            <div className="flex flex-col">
                                <span className="text-[10px] text-text-muted font-bold uppercase tracking-wider">E-mail</span>
                                <span className="text-sm text-text truncate font-medium">{user?.email}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 p-4 bg-background rounded-xl border border-border/40">
                            <FileText className="text-primary/70" size={18} />
                            <div className="flex flex-col">
                                <span className="text-[10px] text-text-muted font-bold uppercase tracking-wider">Publicações</span>
                                <span className="text-sm text-text font-medium">{userPosts?.length || 0} artigos salvos</span>
                            </div>
                        </div>
                    </div>
                </div>
            </SectionContainer>
        </PrivateRoute>
    );
}