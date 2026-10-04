// apps/web/src/app/components/Sidebar.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Coffee, MessageCircle, Settings, HeartHandshake, Menu, Sun, Moon, ScrollText, UserPlus } from 'lucide-react';

const NAV = [
    { href: '/', label: 'Início', icon: Home },
    { href: '/cafe-com-deus', label: 'Café com Deus', icon: Coffee },
    { href: '/estude-com-cici', label: 'Estude com a Cici', icon: MessageCircle },
];

const THEMES = [
    { id: 'light', label: 'Claro', icon: Sun },
    { id: 'dark', label: 'Escuro', icon: Moon },
    { id: 'parchment', label: 'Pergaminho', icon: ScrollText },
];

const FONTS = [
    { id: 'garamond', label: 'Garamond' },
    { id: 'lora', label: 'Lora' },
    { id: 'crimson', label: 'Crimson' },
];

export function Sidebar({ open, onClose, logado, onOpenRegister }: { 
    open: boolean; onClose: () => void; logado: boolean; onOpenRegister: () => void }) {
    const pathname = usePathname();
    const [theme, setTheme] = useState('light'); // só visual por enquanto
    const [font, setFont] = useState('garamond');

    return (
        <>
            <div
                className={`sidebar-overlay ${open ? 'visible' : ''}`}
                onClick={onClose}
            />

            <nav className={`sidebar ${open ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <button
                        className="icon-btn"
                        onClick={onClose}
                        aria-label="Fechar menu"
                    >
                        <Menu size={22} />
                    </button>

                    <span>A Bíblia</span>
                </div>

                {NAV.map(({ href, label, icon: Icon }) => (
                    <Link
                        key={href}
                        href={href}
                        onClick={onClose}
                        className={`menu-item ${pathname === href ? 'active' : ''}`}
                    >
                        <Icon size={20} /> {label}
                    </Link>
                ))}

                {!logado && (
                    <button className="menu-item" onClick={onOpenRegister}>
                        <UserPlus size={20} /> Criar conta
                    </button>
                    )}

                <div className="divider" />

                <div className="nav-section-title">Tema</div>

                <div className="segmented">
                    {THEMES.map(({ id, label, icon: Icon }) => (
                        <button
                            key={id}
                            className="seg-btn"
                            aria-pressed={theme === id}
                            onClick={() => setTheme(id)}
                        >
                            <Icon size={18} /> {label}
                        </button>
                    ))}
                </div>

                <div className="nav-section-title">Fonte</div>

                <div className="segmented">
                    {FONTS.map(({ id, label }) => (
                        <button
                            key={id}
                            className="seg-btn"
                            aria-pressed={font === id}
                            onClick={() => setFont(id)}
                        >
                            <span
                                style={{
                                    fontFamily: 'var(--font-reading)',
                                    fontSize: '1.2rem',
                                }}
                            >
                                Aa
                            </span>
                            {label}
                        </button>
                    ))}
                </div>

                <div className="divider" />

                <Link
                    href="/configuracoes"
                    onClick={onClose}
                    className="menu-item"
                >
                    <Settings size={20} /> Configurações
                </Link>

                <Link
                    href="/doacoes"
                    onClick={onClose}
                    className="menu-item"
                >
                    <HeartHandshake size={20} /> Apoiar o projeto
                </Link>
            </nav>
        </>
    );
}