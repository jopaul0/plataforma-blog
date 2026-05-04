import { useState, useCallback } from 'react';
import { api } from '@/services/api';

export function useApi() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const request = useCallback(async <T>(
        method: 'get' | 'post' | 'put' | 'delete',
        url: string,
        data?: any
    ): Promise<T | null> => {
        setLoading(true);
        setError(null);

        try {
            const response = await api[method]<T>(url, data);
            return response.data;
        } catch (err: any) {
            const message = err.response?.data?.message || 'Erro na comunicação com o servidor';
            setError(message);
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    const get = <T>(url: string) => request<T>('get', url);
    const post = <T>(url: string, data: any) => request<T>('post', url, data);
    const put = <T>(url: string, data: any) => request<T>('put', url, data);
    const del = <T>(url: string) => request<T>('delete', url);

    return { get, post, put, del, loading, error };
}