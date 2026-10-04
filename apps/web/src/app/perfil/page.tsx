// apps/web/src/app/perfil/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authApi } from '@the-bible/api-client';
import { ArrowLeft, Calendar, Shield, User } from 'lucide-react';

interface Perfil {
  id: number;
  email: string;
  createdAt: string;
  role?: 'USER' | 'ADMIN';
}

export default function PerfilPage() {
  const [perfil, setPerfil] = useState<Perfil | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    authApi
      .me()
      .then(setPerfil)
      .catch(() => router.push('/'))
      .finally(() => setLoading(false));
  }, [router]);

  if (loading) {
    return (
      <div className="page-column perfil-page">
        <div className="perfil-loading">
          <div className="avatar lg skeleton" />
          <div className="skeleton skeleton-title" />
          <div className="skeleton skeleton-text" />
        </div>
      </div>
    );
  }

  if (!perfil) return null;

  const inicial = perfil.email.charAt(0).toUpperCase();

  const desde = new Date(perfil.createdAt).toLocaleDateString('pt-BR', {
    month: 'long',
    year: 'numeric',
  });

  const dataCadastro = new Date(perfil.createdAt).toLocaleDateString(
    'pt-BR',
    {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    },
  );

  const isAdmin = perfil.role === 'ADMIN';

  return (
    <div className="page-column perfil-page">
      <button
        type="button"
        className="perfil-back"
        onClick={() => router.back()}
      >
        <ArrowLeft size={18} />
        Voltar
      </button>

      <section className="perfil-header">
        <div className="avatar lg perfil-avatar">{inicial}</div>

        <div className="perfil-heading">
          <h1>Meu perfil</h1>

          <p className="perfil-email">
            {perfil.email}
          </p>

          <span className={`perfil-role ${isAdmin ? 'admin' : ''}`}>
            <Shield size={15} />
            {isAdmin ? 'Administrador' : 'Usuário'}
          </span>
        </div>
      </section>

      <section className="perfil-card">
        <div className="perfil-card-header">
          <User size={20} />
          <div>
            <h2>Informações da conta</h2>
            <p>Dados básicos do seu perfil</p>
          </div>
        </div>

        <div className="perfil-info-list">
          <div className="perfil-info">
            <span className="perfil-info-label">E-mail</span>
            <span className="perfil-info-value">{perfil.email}</span>
          </div>

          <div className="perfil-info">
            <span className="perfil-info-label">ID da conta</span>
            <span className="perfil-info-value">#{perfil.id}</span>
          </div>

          <div className="perfil-info">
            <span className="perfil-info-label">
              <Calendar size={16} />
              Criado em
            </span>

            <span className="perfil-info-value">
              {dataCadastro}
            </span>
          </div>
        </div>
      </section>

      <p className="perfil-since">
        Usando a Bíblia de Bolso desde <strong>{desde}</strong>.
      </p>
    </div>
  );
}