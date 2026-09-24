'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { booksApi } from '@the-bible/api-client';

interface Book {
    id: number;
    slug: string;
    name: string;
    testament: 'OLD' | 'NEW';
}

export default function HomePage() {
    const [books, setBooks] = useState<Book[]>([]);
    const [carregando, setCarregando] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/');
            return;
        }

        booksApi
            .getAll()
            .then(setBooks)
            .finally(() => setCarregando(false));
    }, [router]);

    function handleLogout() {
        localStorage.removeItem('token');
        router.push('/');
    }

    if (carregando) return <p>Carregando...</p>;

    const antigoTestamento = books.filter((b) => b.testament === 'OLD');
    const novoTestamento = books.filter((b) => b.testament === 'NEW');

    return (
        <main>
            <h1>A Bíblia</h1>
            <button onClick={handleLogout}>Sair</button>

            <section>
                <h2>Antigo Testamento</h2>
                <ul>
                    {antigoTestamento.map((book) => (
                        <li key={book.id}>
                            <a href={`/leitura/${book.slug}/1`}>{book.name}</a>
                        </li>
                    ))}
                </ul>
            </section>

            <section>
                <h2>Novo Testamento</h2>
                <ul>
                    {novoTestamento.map((book) => (
                        <li key={book.id}>
                            <a href={`/leitura/${book.slug}/1`}>{book.name}</a>
                        </li>
                    ))}
                </ul>
            </section>
        </main>
    );
} 