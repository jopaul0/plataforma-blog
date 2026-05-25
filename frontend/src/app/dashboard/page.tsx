'use client'

import { PrivateRoute } from "@/components/PrivateRoute";
import Link from 'next/link';
import { Button } from '@/components/Button';
import { PlusCircle } from 'lucide-react';


export default function DashboardPage() {
    return (
        <PrivateRoute>
            <main className="p-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-border/40">
                    <div>
                        <h1 className="font-title text-3xl font-black text-text">Meu Painel</h1>
                        <p className="text-sm text-text-muted">Gerencie suas publicações no Portal Lux</p>
                    </div>

                    {/* Botão para acessar a tela de criação */}
                    <Link href="/posts/create">
                        <Button variant="primary" className="flex items-center gap-2 font-bold tracking-wider">
                            <PlusCircle size={18} />
                            NOVO POST
                        </Button>
                    </Link>
                </div>
            </main>
        </PrivateRoute>
    );
}