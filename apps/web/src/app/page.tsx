// apps/web/src/app/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Coffee } from 'lucide-react';
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

                {aberto && status === 'loading' && <p className="subtitle">Carregando livros...</p>}
                {aberto && status === 'error' && (
                    <p className="erro">
                        Não foi possível carregar os livros. Confirme que a API está rodando (pnpm nx serve api).
                    </p>
                )}
                {aberto && status === 'ok' && (
                    <div className="book-grid">
                        {visiveis.map((b) => (
                            <Link key={b.id} href={`/leitura/${b.slug}/1`} className="book-chip">{b.name}</Link>
                        ))}
                    </div>
                )}
            </div>

            <Footer />
        </>
    );
}