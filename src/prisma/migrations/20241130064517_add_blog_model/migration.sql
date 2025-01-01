-- CreateTable
CREATE TABLE "Blog" (
    "id" SERIAL NOT NULL,
    "authorUserName" TEXT NOT NULL,
    "authorName" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "coverImage" TEXT NOT NULL,
    "blogDescription" TEXT NOT NULL,

    CONSTRAINT "Blog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Blog_authorUserName_key" ON "Blog"("authorUserName");

-- CreateIndex
CREATE UNIQUE INDEX "Blog_coverImage_key" ON "Blog"("coverImage");
