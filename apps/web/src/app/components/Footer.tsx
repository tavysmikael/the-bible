// apps/web/src/app/components/Footer.tsx
import Link from 'next/link';
import { BookOpen, Coffee, MessageCircle, Palette } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

const FEATURES = [
    { icon: BookOpen, title: 'Leitura contínua', text: 'Role e continue lendo sem interrupções, como um livro de verdade.' },
    { icon: Coffee, title: 'Café com Deus', text: 'Um versículo por dia com interpretação da IA para comparar com a sua.' },
    { icon: MessageCircle, title: 'Estude com a Cici', text: 'Tire dúvidas e aprofunde seus estudos conversando com nossa IA.' },
    { icon: Palette, title: 'Temas personalizados', text: 'Papel, modo escuro ou pergaminho antigo — do seu jeito.' },
];

export function Footer() {
    return (
        <footer className="site-footer">
            <div className="footer-features">
                {FEATURES.map((f) => (
                    <div key={f.title} className="footer-feature">
                        <f.icon size={26} />
                        <h3>{f.title}</h3>
                        <p>{f.text}</p>
                    </div>
                ))}
            </div>

            <div className="footer-main">
                <div className="footer-left">
                    <h2>
                        LEIA COM CALMA.
                        <br />
                        REFLITA COM PROFUNDIDADE.
                    </h2>
                    <p>Gratuito, sem anúncios, sempre.</p>
                </div>

                <div className="footer-cols">
                    <div className="footer-col">
                        <h4>LEITURA</h4>
                        <ul>
                            <li><Link href="/leitura/genesis/1">Gênesis</Link></li>
                            <li><Link href="/leitura/salmos/1">Salmos</Link></li>
                            <li><Link href="/leitura/proverbios/1">Provérbios</Link></li>
                            <li><Link href="/leitura/joao/1">João</Link></li>
                        </ul>
                    </div>

                    <div className="footer-col">
                        <h4>ESTUDO</h4>
                        <ul>
                            <li><Link href="/cafe-com-deus">Café com Deus</Link></li>
                            <li><Link href="/estude-com-cici">Estude com a Cici</Link></li>
                            <li><Link href="/configuracoes">Configurações</Link></li>
                        </ul>
                    </div>

                    <div className="footer-col">
                        <h4>PROJETO</h4>
                        <ul>
                            <li><Link href="/doacoes">Apoiar o projeto</Link></li>
                            <li><Link href="/creditos">Créditos e licenças</Link></li>
                            <li>
                                <a href="https://github.com/tavysmikael/the-bible" target="_blank" rel="noreferrer">
                                    Código no GitHub
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="footer-bottom-inner">
                    <span>
                        © 2026 A Bíblia · Texto bíblico: Bíblia Livre (CC BY 3.0 BR)
                    </span>
                    <div className="footer-bottom-links">
                        <Link href="/privacidade">Privacidade</Link>
                        <Link href="/termos">Termos de Uso</Link>
                        <a href="https://github.com/tavysmikael/the-bible" target="_blank" rel="noreferrer" aria-label="GitHub">
                            <FaGithub size={18} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}