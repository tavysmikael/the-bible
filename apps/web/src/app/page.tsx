// apps/web/src/app/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { BookOpen, Coffee, MessageCircle, Palette, HeartHandshake } from 'lucide-react';
import { booksApi } from '@the-bible/api-client';

interface Book { id: number; slug: string; name: string; testament: 'OLD' | 'NEW'; }
type Testament = 'OLD' | 'NEW';

const FEATURES = [
    { icon: BookOpen, title: 'Leitura contínua', text: 'Role e continue lendo sem interrupções, como um livro de verdade.' },
    { icon: Coffee, title: 'Café com Deus', text: 'Um versículo por dia com interpretação da IA para comparar com a sua.' },
    { icon: MessageCircle, title: 'Estude com a Cici', text: 'Tire dúvidas e aprofunde seus estudos conversando com nossa IA.' },
    { icon: Palette, title: 'Temas personalizados', text: 'Papel, modo escuro ou pergaminho antigo — do seu jeito.' },
];

export default function HomePage() {
    const [books, setBooks] = useState<Book[]>([]);
    const [aberto, setAberto] = useState<Testament | null>(null);

    useEffect(() => { booksApi.getAll().then(setBooks); }, []);

    const toggle = (t: Testament) => setAberto((atual) => (atual === t ? null : t));
    const visiveis = books.filter((b) => b.testament === aberto);

    return (
        <div className="page-column home-content">
            <h1>Bíblia de Bolso</h1>
            <p className="subtitle">Sua leitura diária, com café e interpretação da IA ao lado.</p>

            <div className="testament-toggle">
                <button className="testament-btn" aria-pressed={aberto === 'OLD'} onClick={() => toggle('OLD')}>
                    Antigo Testamento
                </button>
                <button className="testament-btn" aria-pressed={aberto === 'NEW'} onClick={() => toggle('NEW')}>
                    Novo Testamento
                </button>
            </div>

            <Link href="/cafe-com-deus" className="cafe-btn">
                <Coffee size={18} /> Café com Deus
            </Link>

            {aberto && (
                <div className="book-grid">
                    {visiveis.map((b) => (
                        <Link key={b.id} href={`/leitura/${b.slug}/1`} className="book-chip">{b.name}</Link>
                    ))}
                </div>
            )}

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
                <Link href="/doacoes"><HeartHandshake size={16} /> Apoiar o projeto</Link>
            </footer>
        </div>
    );
}