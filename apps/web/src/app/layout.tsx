// apps/web/src/app/layout.tsx
import './styles/base.css';
import './styles/topbar.css';
import './styles/sidebar.css';
import './styles/modal.css';
import './styles/reading.css';
import './styles/home.css';
import './styles/footer.css';

import { AppShell } from './components/AppShell';

export const metadata = {
  title: 'A Bíblia',
  description: 'Sua leitura diária, com café e interpretação da IA ao lado.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}