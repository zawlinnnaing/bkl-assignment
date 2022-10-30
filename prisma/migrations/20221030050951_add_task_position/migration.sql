/*
  Warnings:

  - A unique constraint covering the columns `[list_id,position]` on the table `Task` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `position` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "position" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Task_list_id_position_key" ON "Task"("list_id", "position");
