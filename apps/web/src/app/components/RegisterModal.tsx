// apps/web/src/app/components/RegisterModal.tsx
'use client';

import { useState } from 'react';
import { authApi } from '@the-bible/api-client';

export function RegisterModal({ onClose, onSuccess, onSwitchToLogin }: {
  onClose: () => void;
  onSuccess: () => void;
  onSwitchToLogin: () => void;
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [erro, setErro] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro('');
    try {
      const tokens = await authApi.register(email, password);
      localStorage.setItem('accessToken', tokens.accessToken);
      localStorage.setItem('refreshToken', tokens.refreshToken);
      onSuccess();
    } catch {
      setErro('Não foi possível criar a conta. Tente outro email.');
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Criar conta</h2>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Senha (mín. 8 caracteres)" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit" className="btn-primary">Criar conta</button>
        </form>
        {erro && <p className="erro">{erro}</p>}
        <p>Já tem conta? <button className="link-btn" onClick={onSwitchToLogin}>Entrar</button></p>
      </div>
    </div>
  );
}