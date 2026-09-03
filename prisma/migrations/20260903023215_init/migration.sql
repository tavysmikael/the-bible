-- CreateEnum
CREATE TYPE "Language" AS ENUM ('PT', 'EN', 'ES');

-- CreateEnum
CREATE TYPE "Testament" AS ENUM ('OLD', 'NEW');

-- CreateTable
CREATE TABLE "Book" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "testament" "Testament" NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Verse" (
    "id" SERIAL NOT NULL,
    "bookId" INTEGER NOT NULL,
    "chapter" INTEGER NOT NULL,
    "number" INTEGER NOT NULL,

    CONSTRAINT "Verse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerseText" (
    "id" SERIAL NOT NULL,
    "verseId" INTEGER NOT NULL,
    "language" "Language" NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "VerseText_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DailyVerse" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "verseId" INTEGER NOT NULL,

    CONSTRAINT "DailyVerse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Interpretation" (
    "id" SERIAL NOT NULL,
    "dailyVerseId" INTEGER NOT NULL,
    "language" "Language" NOT NULL,
    "content" TEXT NOT NULL,
    "generatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Interpretation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Book_slug_key" ON "Book"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Verse_bookId_chapter_number_key" ON "Verse"("bookId", "chapter", "number");

-- CreateIndex
CREATE UNIQUE INDEX "VerseText_verseId_language_key" ON "VerseText"("verseId", "language");

-- CreateIndex
CREATE UNIQUE INDEX "DailyVerse_date_key" ON "DailyVerse"("date");

-- CreateIndex
CREATE UNIQUE INDEX "Interpretation_dailyVerseId_language_key" ON "Interpretation"("dailyVerseId", "language");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Verse" ADD CONSTRAINT "Verse_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VerseText" ADD CONSTRAINT "VerseText_verseId_fkey" FOREIGN KEY ("verseId") REFERENCES "Verse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyVerse" ADD CONSTRAINT "DailyVerse_verseId_fkey" FOREIGN KEY ("verseId") REFERENCES "Verse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Interpretation" ADD CONSTRAINT "Interpretation_dailyVerseId_fkey" FOREIGN KEY ("dailyVerseId") REFERENCES "DailyVerse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
