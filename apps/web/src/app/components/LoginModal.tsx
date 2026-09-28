// apps/web/src/app/components/LoginModal.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { authApi } from '@the-bible/api-client';

export function LoginModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [erro, setErro] = useState('');

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setErro('');
        try {
            const { accessToken } = await authApi.login(email, password);
            localStorage.setItem('token', accessToken);
            onSuccess();
        } catch {
            setErro('Email ou senha inválidos');
        }
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>Entrar</h2>
                <form onSubmit={handleSubmit}>
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button type="submit" className="btn-primary">Entrar</button>
                </form>
                {erro && <p className="erro">{erro}</p>}
                <p>Não tem conta? <Link href="/register" onClick={onClose}>Criar conta</Link></p>
            </div>
        </div>
    );
}