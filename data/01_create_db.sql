BEGIN; --start

DROP TABLE IF EXISTS "name",
"verb",
"complement",
"adjective",
"preposition",
"pronom",
"phrase";

CREATE TABLE IF NOT EXISTS "name" (
"id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
"element" TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS "verb" (
"id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
"element" TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS "complement" (
"id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
"element" TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS "adjective" (
"id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
"element" TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS "preposition" (
"id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
"element" TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS "pronom" (
"id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
"element" TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS "phrase" (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name_id" INTEGER NOT NULL REFERENCES "name"("id") 
    MATCH SIMPLE ON UPDATE NO ACTION ON DELETE CASCADE,
    "verb_id" INTEGER NOT NULL REFERENCES "verb"("id") 
    MATCH SIMPLE ON UPDATE NO ACTION ON DELETE CASCADE,
    "complement_id" INTEGER NOT NULL REFERENCES "complement"("id") 
    MATCH SIMPLE ON UPDATE NO ACTION ON DELETE CASCADE,
    "adjective_id" INTEGER NOT NULL REFERENCES "adjective"("id") 
    MATCH SIMPLE ON UPDATE NO ACTION ON DELETE CASCADE,
    "preposition_id" INTEGER NOT NULL REFERENCES "preposition"("id") 
    MATCH SIMPLE ON UPDATE NO ACTION ON DELETE CASCADE,
    "pronom_id" INTEGER NOT NULL REFERENCES "pronom"("id") 
    MATCH SIMPLE ON UPDATE NO ACTION ON DELETE CASCADE
);

COMMIT; --end