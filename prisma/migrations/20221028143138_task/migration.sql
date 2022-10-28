-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('Active', 'Completed');

-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL,
    "status" "TaskStatus" NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);
