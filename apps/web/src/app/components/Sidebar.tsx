// apps/web/src/app/components/Sidebar.tsx
'use client';

import Link from 'next/link';

export function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
    if (!open) return null;

    return (
        <>
            <div className="sidebar-overlay" onClick={onClose} />
            <nav className="sidebar">
                <Link href="/" onClick={onClose}>Início</Link>
                <Link href="/cafe-com-deus" onClick={onClose}>Café com Deus</Link>
                <Link href="/estude-com-cici" onClick={onClose}>Estude com Cici</Link>
                <Link href="/configuracoes" onClick={onClose}>Configurações</Link>
                <Link href="/doacoes" onClick={onClose}>Apoiar o projeto</Link>
            </nav>
        </>
    );
}