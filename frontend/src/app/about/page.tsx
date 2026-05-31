'use client'

import { SectionContainer } from '@/components/SectionContainer';
import { Button } from '@/components/Button';
import Link from 'next/link';
import { ShieldCheck, Cpu, Users, ArrowRight } from 'lucide-react';

export default function AboutPage() {
    return (
        <SectionContainer className="py-12 md:py-20 max-w-4xl font-sans flex flex-col gap-16">
            <div className="flex flex-col gap-4 max-w-3xl">
                <span className="text-xs font-bold tracking-widest text-primary uppercase bg-primary/10 px-3 py-1 rounded-full self-start">
                    Nossa Essência
                </span>
                <h1 className="font-title text-4xl md:text-5xl font-black text-text tracking-tight leading-none">
                    Sobre o <span className="text-primary">Portal Lux</span>
                </h1>
                <p className="text-base md:text-lg text-text-muted leading-relaxed mt-2">
                    O Portal Lux é uma plataforma open-source de publicação e compartilhamento de conhecimento técnico.
                    Nossa missão é conectar desenvolvedores, arquitetos de software e entusiastas de tecnologia, fornecendo um espaço limpo, seguro e performático para a disseminação de ideias que moldam o futuro da computação.
                </p>
            </div>

            {/* Grid de Valores/Pilares */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-surface rounded-2xl border border-border/50 flex flex-col gap-3 shadow-sm hover:border-primary/30 transition-all group">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
                        <Cpu size={20} />
                    </div>
                    <h3 className="font-bold text-text text-lg">Tecnologia de Ponta</h3>
                    <p className="text-sm text-text-muted leading-relaxed">
                        Construído utilizando Next.js v15, TypeScript e Prisma, garantindo máxima performance de renderização, SEO e tipagem estrita de ponta a ponta.
                    </p>
                </div>

                <div className="p-6 bg-surface rounded-2xl border border-border/50 flex flex-col gap-3 shadow-sm hover:border-primary/30 transition-all group">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
                        <ShieldCheck size={20} />
                    </div>
                    <h3 className="font-bold text-text text-lg">Segurança Garantida</h3>
                    <p className="text-sm text-text-muted leading-relaxed">
                        Proteção de rotas com middlewares assíncronos, limitação de requisições maliciosas (Rate Limit) e hashing criptográfico seguro de credenciais.
                    </p>
                </div>

                <div className="p-6 bg-surface rounded-2xl border border-border/50 flex flex-col gap-3 shadow-sm hover:border-primary/30 transition-all group">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
                        <Users size={20} />
                    </div>
                    <h3 className="font-bold text-text text-lg">Comunidade Ativa</h3>
                    <p className="text-sm text-text-muted leading-relaxed">
                        Um ecossistema democrático onde autores gerenciam seus artigos, interagem por meio de curtidas inteligentes e debatem em seções de comentários.
                    </p>
                </div>
            </div>

            {/* Banner Call-to-Action Inferior */}
            <div className="bg-surface border border-border/60 rounded-3xl p-8 md:p-12 flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none" />

                <div className="flex flex-col gap-2 max-w-xl">
                    <h2 className="text-2xl font-black text-text font-title">Quer compartilhar o seu conhecimento?</h2>
                    <p className="text-sm text-text-muted leading-relaxed">
                        Crie sua conta hoje mesmo e publique seus rascunhos ou artigos completos para milhares de desenvolvedores ao redor do mundo.
                    </p>
                </div>

                <Link href="/auth" className="flex-shrink-0">
                    <Button className="flex items-center gap-2 font-bold tracking-wider text-xs">
                        COMEÇAR AGORA
                        <ArrowRight size={14} />
                    </Button>
                </Link>
            </div>
        </SectionContainer>
    );
}