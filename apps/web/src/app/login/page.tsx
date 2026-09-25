'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authApi } from '@the-bible/api-client';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [erro, setErro] = useState('');
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro('');
    try {
      const { accessToken } = await authApi.login(email, password);
      localStorage.setItem('token', accessToken);
      router.push('/home');
    } catch (err) {
      setErro('Email ou senha inválidos');
    }
  }

  return (
    <main>
      <h1>Bíblia de Bolso</h1>
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
        <button type="submit">Entrar</button>
      </form>
      {erro && <p>{erro}</p>}
    </main>
  );
}