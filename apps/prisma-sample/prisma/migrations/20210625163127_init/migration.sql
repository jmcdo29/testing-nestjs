-- CreateTable
CREATE TABLE "Cat" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT E'',
    "breed" TEXT NOT NULL DEFAULT E'',
    "age" INTEGER,

    PRIMARY KEY ("id")
);
