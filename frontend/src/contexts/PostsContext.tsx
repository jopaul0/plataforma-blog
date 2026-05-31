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

    // Estados Globais Isolados (Cache em Memória)
    const [homePostsData, setHomePostsData] = useState<PaginatedPostsResponse | null>(null);
    const [searchPostsData, setSearchPostsData] = useState<PaginatedPostsResponse | null>(null); // Exclusivo para Pesquisa
    const [userPosts, setUserPosts] = useState<Post[] | null>(null);

    const [loadingHome, setLoadingHome] = useState(false);
    const [loadingSearch, setLoadingSearch] = useState(false);
    const [loadingDashboard, setLoadingDashboard] = useState(false);

    // Busca os posts públicos da HomePage (Sempre limpo, sem filtros de busca)
    const fetchHomePosts = async (page: number, perPage: number, forceRefresh = false) => {
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

    // Função exclusiva para Pesquisa de Artigos
    const fetchSearchPosts = async (page: number, perPage: number, search: string) => {
        setLoadingSearch(true);

        let url = `/posts?page=${page}&perPage=${perPage}`;
        if (search.trim()) {
            url += `&search=${encodeURIComponent(search.trim())}`;
        }

        const response = await get<PaginatedPostsResponse>(url);
        if (response.success && response.data) {
            setSearchPostsData(response.data);
        }
        setLoadingSearch(false);
    };

    // Busca os posts privados do usuário logado (Dashboard)
    const fetchUserPosts = async (forceRefresh = false) => {
        if (!isAuthenticated) return;

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

    // Funções de Invalidação
    const invalidateUserPosts = () => setUserPosts(null);
    const invalidateHomePosts = () => setHomePostsData(null);
    const invalidateSearchPosts = () => setSearchPostsData(null);

    return (
        <PostsContext.Provider
            value={{
                homePostsData,
                searchPostsData,
                userPosts,
                loadingHome,
                loadingSearch,
                loadingDashboard,
                fetchHomePosts,
                fetchSearchPosts,
                fetchUserPosts,
                invalidateUserPosts,
                invalidateHomePosts,
                invalidateSearchPosts
            }}
        >
            {children}
        </PostsContext.Provider>
    );
}

export const usePosts = () => useContext(PostsContext);