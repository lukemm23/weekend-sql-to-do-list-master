CREATE TABLE "todos" (
    "id" SERIAL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "date" DATE
);

INSERT INTO "todos" (description, status, date)
VALUES ('walk the dog', 'not done', '11/25/2019');
INSERT INTO "todos" (description, status, date)
VALUES ('buy groceries', 'not done', '11/25/2019');
INSERT INTO "todos" (description, status, date)
VALUES ('get gas', 'not done', '11/26/2019');