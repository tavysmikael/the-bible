// apps/web/src/app/components/Footer.tsx
import Link from 'next/link';
import { BookOpen, Coffee, MessageCircle, Palette } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

const FEATURES = [
    { icon: BookOpen, title: 'Leitura contínua', text: 'Role e continue lendo, como num livro de verdade.' },
    { icon: Coffee, title: 'Café com Deus', text: 'Um versículo por dia e a interpretação da IA para comparar com a sua.' },
    { icon: MessageCircle, title: 'Converse com a Cici', text: 'Tire dúvidas e aprofunde seus estudos.' },
    { icon: Palette, title: 'Temas', text: 'Papel, modo escuro ou pergaminho antigo.' },
];

export function Footer() {
    return (
        <footer className="site-footer">
            <div className="footer-main">
                <div className="footer-left">
                    <h2>
                        LEIA COM CALMA.
                        <br />
                        REFLITA COM PROFUNDIDADE.
                    </h2>
                    <p>Gratuito, sem anúncios, sempre.</p>
                </div>

                <div className="footer-features">
                    {FEATURES.map((f) => (
                        <div key={f.title} className="footer-feature">
                            <f.icon size={24} />
                            <h3>{f.title}</h3>
                            <p>{f.text}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="footer-bottom">
                <div className="footer-bottom-inner">
                    <span>© 2026 A Bíblia · Texto bíblico: Bíblia Livre (CC BY 3.0 BR)</span>
                    <nav className="footer-bottom-links">
                        <Link href="/doacoes">Apoiar o projeto</Link>
                        <Link href="/creditos">Créditos e licenças</Link>
                        <Link href="/privacidade">Privacidade</Link>
                        <Link href="/termos">Termos de Uso</Link>
                        <a href="https://github.com/tavysmikael/the-bible" target="_blank" rel="noreferrer" aria-label="GitHub">
                            <FaGithub size={18} />
                        </a>
                    </nav>
                </div>
            </div>
        </footer>
    );
}