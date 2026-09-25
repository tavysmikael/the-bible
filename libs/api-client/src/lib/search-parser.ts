export function parseReference(input: string): { bookName: string; chapter: number; verse?: number } | null {
    const normalized = input.trim().replace(/[,:]/g, ' ').replace(/\s+/g, ' ');
    const match = normalized.match(/^(.+?)\s+(\d+)(?:\s+(\d+))?$/);
    if (!match) return null;

    const [, bookName, chapter, verse] = match;
    return {
        bookName: bookName.trim(),
        chapter: Number(chapter),
        verse: verse ? Number(verse) : undefined,
    };
}