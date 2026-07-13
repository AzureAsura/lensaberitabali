-- All existing rows were backfilled with a unique slug (one-off script,
-- run once and removed) before this migration was applied.
-- Safe to enforce NOT NULL now that no row is missing one.
ALTER TABLE "berita" ALTER COLUMN "slug" SET NOT NULL;
