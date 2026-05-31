'use client'

import { createContext, useContext, useState, ReactNode } from 'react';
import { useApi } from '@/hooks/useApi';
import { useAuth } from './AuthContext';
import { Post } from '@/types/components/PostCardProps';
import { PaginatedPostsResponse } from '@/types/api/posts';
import { PostsContextData } from '@/types/contexts/posts';

const PostsContext = createContext<PostsContextData>({} as PostsContextData);

export function PostsProvider({ children }: { children: ReactNode }) {
    const { get } = useApi();
    const { isAuthenticated } = useAuth();

    // Estados Globais em Memória (Nosso Cache Local)
    const [homePostsData, setHomePostsData] = useState<PaginatedPostsResponse | null>(null);
    const [userPosts, setUserPosts] = useState<Post[] | null>(null);

    const [loadingHome, setLoadingHome] = useState(false);
    const [loadingDashboard, setLoadingDashboard] = useState(false);

    // Busca os posts públicos da HomePage
    const fetchHomePosts = async (page: number, perPage: number, forceRefresh = false) => {
        // Se o cache já possui os dados dessa página específica e não estamos forçando a atualização, ignora a requisição HTTP
        if (homePostsData && homePostsData.meta.currentPage === page && !forceRefresh) {
            return;
        }

        setLoadingHome(true);
        const response = await get<PaginatedPostsResponse>(`/posts?page=${page}&perPage=${perPage}`);
        if (response.success && response.data) {
            setHomePostsData(response.data);
        }
        setLoadingHome(false);
    };

    // Busca os posts privados do usuário logado (Dashboard)
    const fetchUserPosts = async (forceRefresh = false) => {
        if (!isAuthenticated) return;

        // Se já possuímos os posts do usuário em memória e não foi solicitado refresh, usa o cache local instantâneo
        if (userPosts !== null && !forceRefresh) {
            return;
        }

        setLoadingDashboard(true);
        const response = await get<{ posts: Post[] }>('/posts/me');

        if (response.success && response.data?.posts) {
            setUserPosts(response.data.posts);
        } else if (response.success) {
            setUserPosts([]);
        }
        setLoadingDashboard(false);
    };

    // Funções de Invalidação Estratégica (Gatilhadas após criar/editar/deletar posts)
    const invalidateUserPosts = () => setUserPosts(null);
    const invalidateHomePosts = () => setHomePostsData(null);

    return (
        <PostsContext.Provider
            value={{
                homePostsData,
                userPosts,
                loadingHome,
                loadingDashboard,
                fetchHomePosts,
                fetchUserPosts,
                invalidateUserPosts,
                invalidateHomePosts
            }}
        >
            {children}
        </PostsContext.Provider>
    );
}

export const usePosts = () => useContext(PostsContext);