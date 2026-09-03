-- CreateEnum
CREATE TYPE "AlumniApplicationStatus" AS ENUM ('SUBMITTED', 'ACTIVE', 'EXPIRED', 'PLACED', 'SUSPENDED');

-- CreateTable
CREATE TABLE "AlumniApplication" (
    "id" TEXT NOT NULL,
    "applicationId" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "whatsapp" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "trade" TEXT NOT NULL,
    "skills" TEXT NOT NULL,
    "yearsOfExperience" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "preferredWorkLocation" TEXT NOT NULL,
    "certifications" TEXT,
    "currentEmploymentStatus" TEXT NOT NULL,
    "cvFile" TEXT,
    "status" "AlumniApplicationStatus" NOT NULL DEFAULT 'SUBMITTED',
    "activeSupportStart" TIMESTAMP(3),
    "activeSupportEnd" TIMESTAMP(3),
    "placementStatus" TEXT,
    "notes" TEXT,
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AlumniApplication_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AlumniApplication_applicationId_key" ON "AlumniApplication"("applicationId");

-- CreateIndex
CREATE INDEX "AlumniApplication_status_idx" ON "AlumniApplication"("status");

-- CreateIndex
CREATE INDEX "AlumniApplication_trade_idx" ON "AlumniApplication"("trade");
