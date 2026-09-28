'use client';

import { useEffect, useState } from 'react';
import { Menu, Search, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { booksApi, parseReference } from '@the-bible/api-client';
import { Sidebar } from './Sidebar';
import { LoginModal } from './LoginModal';

export function AppShell({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [logado, setLogado] = useState(false);
    const [loginOpen, setLoginOpen] = useState(false);

    const router = useRouter();

    useEffect(() => {
        setLogado(!!localStorage.getItem('token'));
    }, []);

    async function handleSearch(e: React.FormEvent) {
        e.preventDefault();

        const ref = parseReference(query);

        if (!ref) return;

        const book = await booksApi.search(ref.bookName);

        if (book) {
            router.push(`/leitura/${book.slug}/${ref.chapter}`);
        }
    }

    function handleLogout() {
        localStorage.removeItem('token');
        setLogado(false);
        setMenuOpen(false);
        router.push('/');
    }

    return (
        <div className="app-shell">
            <header className="topbar">
                <button
                    onClick={() => setSidebarOpen(true)}
                    aria-label="Menu"
                >
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

                {logado ? (
                    <div className="profile-menu">
                        <button
                            onClick={() => setMenuOpen((v) => !v)}
                            aria-label="Perfil"
                        >
                            <User size={22} />
                        </button>

                        {menuOpen && (
                            <div className="profile-dropdown">
                                <Link
                                    href="/perfil"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    Perfil
                                </Link>

                                <button onClick={handleLogout}>
                                    Sair
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <button
                        onClick={() => setLoginOpen(true)}
                        className="btn-secondary"
                    >
                        Entrar
                    </button>
                )}
            </header>

            <Sidebar
                open={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            <main>{children}</main>

            {loginOpen && (
                <LoginModal
                    onClose={() => setLoginOpen(false)}
                    onSuccess={() => {
                        setLogado(true);
                        setLoginOpen(false);
                    }}
                />
            )}
        </div>
    );
}