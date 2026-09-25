// apps/web/src/app/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { BookOpen, Coffee, MessageCircle, Palette, HeartHandshake } from 'lucide-react';
import { booksApi } from '@the-bible/api-client';
import { AppShell } from './components/AppShell';

interface Book { id: number; slug: string; name: string; testament: 'OLD' | 'NEW'; }

const FEATURES = [
    { icon: BookOpen, title: 'Leitura contínua', text: 'Role e continue lendo sem interrupções, como um livro de verdade.' },
    { icon: Coffee, title: 'Café com Deus', text: 'Um versículo por dia com interpretação da IA para comparar com a sua.' },
    { icon: MessageCircle, title: 'Estude com a Cici', text: 'Tire dúvidas e aprofunde seus estudos conversando com nossa IA.' },
    { icon: Palette, title: 'Temas personalizados', text: 'Papel, modo escuro ou pergaminho antigo — do seu jeito.' },
];

export default function HomePage() {
    const [books, setBooks] = useState<Book[]>([]);

    useEffect(() => {
        booksApi.getAll().then(setBooks);
    }, []);

    const antigoTestamento = books.filter((b) => b.testament === 'OLD');
    const novoTestamento = books.filter((b) => b.testament === 'NEW');

    return (
        <AppShell>
            <div className="home-content">
                <h1>Bíblia de Bolso</h1>

                <Link href="/cafe-com-deus" className="btn-primary cafe-btn">
                    <Coffee size={18} /> Café com Deus
                </Link>

                <div className="testamentos">
                    <section>
                        <h2>Antigo Testamento</h2>
                        <ul>
                            {antigoTestamento.map((b) => (
                                <li key={b.id}><Link href={`/leitura/${b.slug}/1`}>{b.name}</Link></li>
                            ))}
                        </ul>
                    </section>
                    <section>
                        <h2>Novo Testamento</h2>
                        <ul>
                            {novoTestamento.map((b) => (
                                <li key={b.id}><Link href={`/leitura/${b.slug}/1`}>{b.name}</Link></li>
                            ))}
                        </ul>
                    </section>
                </div>

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
        </AppShell>
    );
}