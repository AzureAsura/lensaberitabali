-- Add nullable slug column first (existing rows have no slug yet).
-- A backfill script populates it, then a follow-up migration makes it NOT NULL.
ALTER TABLE "berita" ADD COLUMN "slug" TEXT;

CREATE UNIQUE INDEX "berita_slug_key" ON "berita"("slug");
