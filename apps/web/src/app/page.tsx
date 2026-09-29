// apps/web/src/app/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { BookOpen, Coffee, MessageCircle, ScrollText } from 'lucide-react';
import { booksApi } from '@the-bible/api-client';
import { Footer } from './components/Footer';

interface Book { id: number; slug: string; name: string; testament: 'OLD' | 'NEW'; }
type Testament = 'OLD' | 'NEW';
type Status = 'loading' | 'ok' | 'error';

export default function HomePage() {
    const [books, setBooks] = useState<Book[]>([]);
    const [status, setStatus] = useState<Status>('loading');
    const [aberto, setAberto] = useState<Testament | null>(null);

    useEffect(() => {
        booksApi
            .getAll()
            .then((data) => { setBooks(data); setStatus('ok'); })
            .catch(() => setStatus('error'));
    }, []);

    const toggle = (t: Testament) => setAberto((atual) => (atual === t ? null : t));
    const visiveis = books.filter((b) => b.testament === aberto);

    return (
        <>
            <div className="page-column home-content">
                <h1>A Bíblia</h1>
                <p className="subtitle">Seu contato com Deus diário, com café e interpretação da IA para te ajudar.</p>

                <div className="action-grid">
                    <button className="action-btn" aria-expanded={aberto === 'OLD'} onClick={() => toggle('OLD')}>
                        <ScrollText size={30} />
                        <span className="action-title">Antigo Testamento</span>
                        <span className="action-sub">39 livros</span>
                    </button>
                    <button className="action-btn" aria-expanded={aberto === 'NEW'} onClick={() => toggle('NEW')}>
                        <BookOpen size={30} />
                        <span className="action-title">Novo Testamento</span>
                        <span className="action-sub">27 livros</span>
                    </button>

                    {aberto && (
                        <div className="book-panel">
                            {status === 'loading' && <p className="panel-msg">Carregando livros...</p>}
                            {status === 'error' && (
                                <p className="erro">Não foi possível carregar os livros. Confirme que a API está rodando.</p>
                            )}
                            {status === 'ok' && (
                                <div className="book-grid">
                                    {visiveis.map((b) => (
                                        <Link key={b.id} href={`/leitura/${b.slug}/1`} className="book-chip">{b.name}</Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    <Link href="/cafe-com-deus" className="action-btn wide">
                        <Coffee size={30} />
                        <span className="action-title">Café com Deus</span>
                        <span className="action-sub">Versículo do dia e a interpretação da IA</span>
                    </Link>
                    <Link href="/estude-com-cici" className="action-btn wide">
                        <MessageCircle size={30} />
                        <span className="action-title">Converse com a Cici</span>
                        <span className="action-sub">Tire dúvidas e aprofunde seus estudos</span>
                    </Link>
                </div>
            </div>

            <Footer />
        </>
    );
}