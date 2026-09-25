// apps/web/src/app/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { BookOpen, Coffee, MessageCircle, Palette, HeartHandshake } from 'lucide-react';

const FEATURES = [
    { icon: BookOpen, title: 'Leitura contínua', text: 'Role e continue lendo sem interrupções, como um livro de verdade.' },
    { icon: Coffee, title: 'Café com Deus', text: 'Um versículo por dia com interpretação da IA para comparar com a sua.' },
    { icon: MessageCircle, title: 'Estude com a Cici', text: 'Tire dúvidas e aprofunde seus estudos conversando com nossa IA.' },
    { icon: Palette, title: 'Temas personalizados', text: 'Papel, modo escuro ou pergaminho antigo — do seu jeito.' },
];

export default function LandingPage() {
    const [logado, setLogado] = useState(false);

    useEffect(() => {
        setLogado(!!localStorage.getItem('token'));
    }, []);

    return (
        <main className="landing">
            <section className="hero">
                <h1>Bíblia de Bolso</h1>
                <p>Sua leitura diária, com café e interpretação da IA ao lado.</p>
                <div className="hero-actions">
                    {logado ? (
                        <Link href="/home" className="btn-primary">Ir para o app</Link>
                    ) : (
                        <>
                            <Link href="/register" className="btn-primary">Criar conta</Link>
                            <Link href="/login" className="btn-secondary">Entrar</Link>
                        </>
                    )}
                </div>
            </section>

            <section className="features">
                {FEATURES.map((f) => (
                    <div key={f.title} className="feature-card">
                        <f.icon size={28} />
                        <h3>{f.title}</h3>
                        <p>{f.text}</p>
                    </div>
                ))}
            </section>

            <footer className="landing-footer">
                <p>Gratuito, sem anúncios, sempre.</p>
                <Link href="/doacoes">
                    <HeartHandshake size={16} /> Apoiar o projeto
                </Link>
            </footer>
        </main>
    );
}