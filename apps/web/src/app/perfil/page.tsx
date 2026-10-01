// apps/web/src/app/perfil/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authApi } from '@the-bible/api-client';

interface Perfil { id: number; email: string; createdAt: string; }

export default function PerfilPage() {
  const [perfil, setPerfil] = useState<Perfil | null>(null);
  const router = useRouter();

  useEffect(() => {
    authApi.me().then(setPerfil).catch(() => router.push('/'));
  }, [router]);

  if (!perfil) return <p className="page-column">Carregando...</p>;

  const desde = new Date(perfil.createdAt).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });

  return (
    <div className="page-column perfil-page">
      <div className="avatar lg">{perfil.email[0].toUpperCase()}</div>
      <h1>{perfil.email}</h1>
      <p className="subtitle">Na Bíblia de Bolso desde {desde}</p>
    </div>
  );
}