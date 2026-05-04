'use client'

import { PrivateRoute } from "@/components/PrivateRoute";

export default function DashboardPage() {
    return (
        <PrivateRoute>
            <main className="p-8">
                <h1 className="font-title text-4xl text-primary">Seu Painel</h1>
                <p className="font-sans text-text-muted mt-4">Bem-vindo ao Portal Lux!</p>
            </main>
        </PrivateRoute>
    );
}