/*
  Warnings:

  - You are about to alter the column `available` on the `Book` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `publishedYear` on the `Book` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Book" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "publishedYear" INTEGER NOT NULL,
    "available" INTEGER NOT NULL,
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Book" ("author", "available", "category", "createdAt", "description", "id", "publishedYear", "title") SELECT "author", "available", "category", "createdAt", "description", "id", "publishedYear", "title" FROM "Book";
DROP TABLE "Book";
ALTER TABLE "new_Book" RENAME TO "Book";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
