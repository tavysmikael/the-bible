// apps/web/src/app/components/AppShell.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    Menu,
    Search,
    User,
    UserRound,
    Settings,
    LogOut,
} from 'lucide-react';
import {
    authApi,
    booksApi,
    parseReference,
} from '@the-bible/api-client';
import { Sidebar } from './Sidebar';
import { LoginModal } from './LoginModal';

export function AppShell({
    children,
}: {
    children: React.ReactNode;
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [loginOpen, setLoginOpen] = useState(false);
    const [logado, setLogado] = useState(false);
    const [email, setEmail] = useState('');
    const [query, setQuery] = useState('');

    const menuRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    function loadUser() {
        const accessToken = localStorage.getItem('accessToken');

        if (!accessToken) {
            setLogado(false);
            setEmail('');
            return;
        }

        setLogado(true);

        authApi
            .me()
            .then((u) => {
                setEmail(u.email);
            })
            .catch(() => {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');

                setLogado(false);
                setEmail('');
            });
    }

    useEffect(() => {
        loadUser();
    }, []);

    useEffect(() => {
        function onKey(e: KeyboardEvent) {
            if (e.key === 'Escape') {
                setSidebarOpen(false);
                setMenuOpen(false);
                setLoginOpen(false);
            }
        }

        function onClick(e: MouseEvent) {
            if (
                menuRef.current &&
                !menuRef.current.contains(e.target as Node)
            ) {
                setMenuOpen(false);
            }
        }

        document.addEventListener('keydown', onKey);
        document.addEventListener('mousedown', onClick);

        return () => {
            document.removeEventListener('keydown', onKey);
            document.removeEventListener('mousedown', onClick);
        };
    }, []);

    async function handleSearch(e: React.FormEvent) {
        e.preventDefault();

        const ref = parseReference(query);

        if (!ref) return;

        try {
            const book = await booksApi.search(ref.bookName);

            if (book) {
                router.push(
                    `/leitura/${book.slug}/${ref.chapter}`,
                );
            }
        } catch {
            // busca sem resultado: ignora por enquanto
        }
    }

    function handleLogout() {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');

        setLogado(false);
        setEmail('');
        setMenuOpen(false);

        router.push('/');
    }

    return (
        <>
            <header className="topbar">
                <button
                    className="icon-btn"
                    onClick={() => setSidebarOpen(true)}
                    aria-label="Menu"
                >
                    <Menu size={22} />
                </button>

                <form
                    onSubmit={handleSearch}
                    className="search-form"
                >
                    <Search size={18} />

                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="João, 3, 16"
                    />
                </form>

                {logado ? (
                    <div
                        className="profile-menu"
                        ref={menuRef}
                    >
                        <button
                            className="avatar"
                            onClick={() =>
                                setMenuOpen((v) => !v)
                            }
                            aria-label="Perfil"
                        >
                            {email ? (
                                email[0].toUpperCase()
                            ) : (
                                <User size={18} />
                            )}
                        </button>

                        {menuOpen && (
                            <div className="profile-dropdown">
                                <div className="profile-header">
                                    <span className="avatar lg">
                                        {email ? (
                                            email[0].toUpperCase()
                                        ) : (
                                            <User size={20} />
                                        )}
                                    </span>

                                    <span className="profile-email">
                                        {email}
                                    </span>
                                </div>

                                <div className="divider" />

                                <Link
                                    href="/perfil"
                                    className="menu-item"
                                    onClick={() =>
                                        setMenuOpen(false)
                                    }
                                >
                                    <UserRound size={20} />
                                    Meu perfil
                                </Link>

                                <Link
                                    href="/configuracoes"
                                    className="menu-item"
                                    onClick={() =>
                                        setMenuOpen(false)
                                    }
                                >
                                    <Settings size={20} />
                                    Configurações
                                </Link>

                                <div className="divider" />

                                <button
                                    className="menu-item"
                                    onClick={handleLogout}
                                >
                                    <LogOut size={20} />
                                    Sair
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <button
                        className="btn-outline"
                        onClick={() => setLoginOpen(true)}
                    >
                        <User size={18} />
                        Entrar
                    </button>
                )}
            </header>

            <Sidebar
                open={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                logado={logado}
            />

            <main>{children}</main>

            {loginOpen && (
                <LoginModal
                    onClose={() => setLoginOpen(false)}
                    onSuccess={() => {
                        setLoginOpen(false);
                        loadUser();
                    }}
                />
            )}
        </>
    );
}