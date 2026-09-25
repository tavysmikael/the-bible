// apps/web/src/app/leitura/[slug]/[capitulo]/page.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import { versesApi } from '@the-bible/api-client';

interface Verse {
    id: number;
    number: number;
    texts: { content: string }[];
}

interface ChapterBlock {
    chapter: number;
    verses: Verse[];
}

export default function LeituraPage() {
    const params = useParams<{ slug: string; capitulo: string }>();
    const [blocks, setBlocks] = useState<ChapterBlock[]>([]);
    const sentinelRef = useRef<HTMLDivElement>(null);
    const chapterRef = useRef(Number(params.capitulo));

    async function loadNextChapter() {
        const verses = await versesApi.getChapter(params.slug, chapterRef.current);
        if (verses.length === 0) return; // fim do livro
        setBlocks((prev) => [...prev, { chapter: chapterRef.current, verses }]);
        chapterRef.current += 1;
    }

    useEffect(() => {
        loadNextChapter();
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) loadNextChapter();
            },
            { rootMargin: '400px' },
        );

        if (sentinelRef.current) observer.observe(sentinelRef.current);
        return () => observer.disconnect();
    }, [blocks]);

    return (
        <div className= "leitura-container" >
        {
            blocks.map((block) => (
                <section key= { block.chapter } className = "capitulo" >
                <h2>Capítulo { block.chapter } </h2>
          {
                    block.verses.map((v) => (
                        <p key= { v.id } >
                        <sup>{ v.number } </sup> {v.texts[0]?.content}
                        </p>
                    ))
        }
        </section>
      ))
}
<div ref={ sentinelRef } style = {{ height: 1 }} />
    </div>
  );
}