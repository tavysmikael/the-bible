// apps/web/src/app/leitura/[slug]/[capitulo]/page.tsx
'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import { versesApi } from '@the-bible/api-client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface Verse { id: number; number: number; texts: { content: string }[]; }
interface ChapterBlock { chapter: number; verses: Verse[]; }

export default function LeituraPage() {
    const params = useParams<{ slug: string; capitulo: string }>();
    const [blocks, setBlocks] = useState<ChapterBlock[]>([]);
    const sentinelRef = useRef<HTMLDivElement>(null);
    const nextChapter = useRef(Number(params.capitulo));
    const loading = useRef(false);
    const ended = useRef(false);

    const loadNext = useCallback(async () => {
        if (loading.current || ended.current) return;
        loading.current = true;
        try {
            const chapter = nextChapter.current;
            const verses: Verse[] = await versesApi.getChapter(params.slug, chapter);
            if (verses.length === 0) { ended.current = true; return; }
            setBlocks((prev) => [...prev, { chapter, verses }]);
            nextChapter.current = chapter + 1;
        } finally {
            loading.current = false;
        }
    }, [params.slug]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => { if (entries[0].isIntersecting) loadNext(); },
            { rootMargin: '400px' },
        );
        if (sentinelRef.current) observer.observe(sentinelRef.current);
        return () => observer.disconnect();
    }, [blocks, loadNext]);

    return (
        <div className="leitura-container">
            <Link href="/" className="back-btn" aria-label="Voltar">
                <ArrowLeft size={20} />
            </Link>
            {blocks.map((block) => (
                <section key={block.chapter} className="capitulo">
                    <h2>Capítulo {block.chapter}</h2>

                    {block.verses.map((v) => (
                        <p key={v.id}>
                            <sup>{v.number}</sup>
                            {v.texts[0]?.content}
                        </p>
                    ))}
                </section>
            ))}

            <div ref={sentinelRef} style={{ height: 1 }} />
        </div>
    );
}