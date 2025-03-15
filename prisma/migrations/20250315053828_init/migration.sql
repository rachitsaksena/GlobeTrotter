-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "score" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Destination" (
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "trivia" TEXT[],
    "clues" TEXT[],
    "fun_facts" TEXT[],

    CONSTRAINT "Destination_pkey" PRIMARY KEY ("city")
);

-- CreateTable
CREATE TABLE "GameSession" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "destinationId" TEXT NOT NULL,
    "isCorrect" BOOLEAN NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GameSession_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Destination_city_key" ON "Destination"("city");

-- AddForeignKey
ALTER TABLE "GameSession" ADD CONSTRAINT "GameSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameSession" ADD CONSTRAINT "GameSession_destinationId_fkey" FOREIGN KEY ("destinationId") REFERENCES "Destination"("city") ON DELETE RESTRICT ON UPDATE CASCADE;
