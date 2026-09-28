// apps/web/src/app/layout.tsx
import './global.css';
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