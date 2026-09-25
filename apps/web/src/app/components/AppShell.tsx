// apps/web/src/app/components/AppShell.tsx
'use client';

import { useState } from 'react';
import { Menu, Search, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { booksApi } from '@the-bible/api-client';
import { parseReference } from '@the-bible/api-client';
import { Sidebar } from './Sidebar';

export function AppShell({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [query, setQuery] = useState('');
    const router = useRouter();

    async function handleSearch(e: React.FormEvent) {
        e.preventDefault();
        const ref = parseReference(query);
        if (!ref) return;

        const book = await booksApi.search(ref.bookName);
        if (book) router.push(`/leitura/${book.slug}/${ref.chapter}`);
    }

    return (
        <div className="app-shell">
            <header className="topbar">
                <button onClick={() => setSidebarOpen(true)} aria-label="Menu">
                    <Menu size={22} />
                </button>

                <form onSubmit={handleSearch} className="search-form">
                    <Search size={18} />
                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="João, 3, 16"
                    />
                </form>

                <button onClick={() => router.push('/perfil')} aria-label="Perfil">
                    <User size={22} />
                </button>
            </header>

            <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <main>{children}</main>
        </div>
    );
}