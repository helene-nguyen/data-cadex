BEGIN;

ALTER TABLE "name" RENAME TO "names";
ALTER TABLE "verb" RENAME TO "verbs";
ALTER TABLE "complement" RENAME TO "complements";
ALTER TABLE "adjective" RENAME TO "adjectives";
ALTER TABLE "preposition" RENAME TO "prepositions";
ALTER TABLE "pronom" RENAME TO "pronoms";

COMMIT;