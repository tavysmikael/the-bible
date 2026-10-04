'use client';

import { useState } from 'react';
import Link from 'next/link';
import { authApi } from '@the-bible/api-client';

export function LoginModal({
    onClose,
    onSuccess,
    onSwitchToRegister,
}: {
    onClose: () => void;
    onSuccess: () => void;
    onSwitchToRegister: () => void;
}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [erro, setErro] = useState('');

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setErro('');

        try {
            const tokens = await authApi.login(email, password);

            localStorage.setItem('accessToken', tokens.accessToken);
            localStorage.setItem('refreshToken', tokens.refreshToken);

            onSuccess();
        } catch {
            setErro('Email ou senha inválidos');
        }
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
            >
                <h2>Entrar</h2>

                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button type="submit" className="btn-primary">
                        Entrar
                    </button>
                </form>

                {erro && <p className="erro">{erro}</p>}

                  <p>Não tem conta? <button className="link-btn" onClick={onSwitchToRegister}>Criar conta</button></p>
            </div>
        </div>
    );
}