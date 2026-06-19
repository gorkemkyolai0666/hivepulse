-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('owner', 'manager', 'beekeeper');

-- CreateEnum
CREATE TYPE "HiveStatus" AS ENUM ('active', 'queenless', 'swarm_risk', 'wintering', 'inactive');

-- CreateEnum
CREATE TYPE "HiveType" AS ENUM ('langstroth', 'top_bar', 'warre', 'flow');

-- CreateEnum
CREATE TYPE "HarvestStatus" AS ENUM ('planned', 'extracted', 'stored', 'sold');

-- CreateEnum
CREATE TYPE "HarvestContainer" AS ENUM ('bucket', 'drum', 'jar_batch', 'comb');

-- CreateEnum
CREATE TYPE "InspectionStatus" AS ENUM ('scheduled', 'completed', 'follow_up', 'cancelled');

-- CreateEnum
CREATE TYPE "BroodPattern" AS ENUM ('excellent', 'good', 'fair', 'poor');

-- CreateEnum
CREATE TYPE "Temperament" AS ENUM ('calm', 'moderate', 'aggressive');

-- CreateEnum
CREATE TYPE "TreatmentStatus" AS ENUM ('scheduled', 'in_progress', 'completed', 'overdue');

-- CreateEnum
CREATE TYPE "TreatmentCategory" AS ENUM ('varroa', 'nosema', 'wax_moth', 'feeding', 'queen_rearing', 'other');

-- CreateEnum
CREATE TYPE "HoneyVarietyCategory" AS ENUM ('wildflower', 'clover', 'acacia', 'chestnut', 'lavender', 'forest', 'citrus', 'other');

-- CreateEnum
CREATE TYPE "HoneyVarietyStatus" AS ENUM ('active', 'seasonal', 'discontinued');

-- CreateTable
CREATE TABLE "apiaries" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT,
    "address" TEXT,
    "city" TEXT,
    "state" TEXT,
    "zip_code" TEXT,
    "total_hives" INTEGER NOT NULL DEFAULT 48,
    "timezone" TEXT NOT NULL DEFAULT 'Europe/Istanbul',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "apiaries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'owner',
    "apiary_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hives" (
    "id" TEXT NOT NULL,
    "apiary_id" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "hive_type" "HiveType" NOT NULL DEFAULT 'langstroth',
    "queen_age_months" INTEGER,
    "status" "HiveStatus" NOT NULL DEFAULT 'active',
    "last_inspected" DATE,
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "hives_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "harvests" (
    "id" TEXT NOT NULL,
    "apiary_id" TEXT NOT NULL,
    "hive_id" TEXT,
    "batch_name" TEXT NOT NULL,
    "floral_source" TEXT,
    "weight_kg" DOUBLE PRECISION NOT NULL,
    "container" "HarvestContainer" NOT NULL DEFAULT 'bucket',
    "status" "HarvestStatus" NOT NULL DEFAULT 'planned',
    "harvested_at" DATE,
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "harvests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inspections" (
    "id" TEXT NOT NULL,
    "apiary_id" TEXT NOT NULL,
    "hive_id" TEXT NOT NULL,
    "inspected_at" TIMESTAMP(3) NOT NULL,
    "brood_pattern" "BroodPattern" NOT NULL DEFAULT 'good',
    "temperament" "Temperament" NOT NULL DEFAULT 'calm',
    "honey_stores" DOUBLE PRECISION,
    "status" "InspectionStatus" NOT NULL DEFAULT 'completed',
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "inspections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "treatments" (
    "id" TEXT NOT NULL,
    "apiary_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "category" "TreatmentCategory" NOT NULL DEFAULT 'varroa',
    "location" TEXT,
    "scheduled_at" TIMESTAMP(3) NOT NULL,
    "status" "TreatmentStatus" NOT NULL DEFAULT 'scheduled',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "treatments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "honey_varieties" (
    "id" TEXT NOT NULL,
    "apiary_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "variety_category" "HoneyVarietyCategory" NOT NULL DEFAULT 'wildflower',
    "status" "HoneyVarietyStatus" NOT NULL DEFAULT 'active',
    "price_per_kg" DOUBLE PRECISION NOT NULL,
    "moisture_percent" DOUBLE PRECISION,
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "honey_varieties_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "hives_apiary_id_number_key" ON "hives"("apiary_id", "number");

-- CreateIndex
CREATE INDEX "hives_apiary_id_status_idx" ON "hives"("apiary_id", "status");

-- CreateIndex
CREATE INDEX "harvests_apiary_id_status_idx" ON "harvests"("apiary_id", "status");

-- CreateIndex
CREATE INDEX "inspections_apiary_id_status_idx" ON "inspections"("apiary_id", "status");

-- CreateIndex
CREATE INDEX "inspections_apiary_id_inspected_at_idx" ON "inspections"("apiary_id", "inspected_at");

-- CreateIndex
CREATE INDEX "treatments_apiary_id_scheduled_at_idx" ON "treatments"("apiary_id", "scheduled_at");

-- CreateIndex
CREATE INDEX "honey_varieties_apiary_id_variety_category_idx" ON "honey_varieties"("apiary_id", "variety_category");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_apiary_id_fkey" FOREIGN KEY ("apiary_id") REFERENCES "apiaries"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hives" ADD CONSTRAINT "hives_apiary_id_fkey" FOREIGN KEY ("apiary_id") REFERENCES "apiaries"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "harvests" ADD CONSTRAINT "harvests_apiary_id_fkey" FOREIGN KEY ("apiary_id") REFERENCES "apiaries"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "harvests" ADD CONSTRAINT "harvests_hive_id_fkey" FOREIGN KEY ("hive_id") REFERENCES "hives"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inspections" ADD CONSTRAINT "inspections_apiary_id_fkey" FOREIGN KEY ("apiary_id") REFERENCES "apiaries"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inspections" ADD CONSTRAINT "inspections_hive_id_fkey" FOREIGN KEY ("hive_id") REFERENCES "hives"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "treatments" ADD CONSTRAINT "treatments_apiary_id_fkey" FOREIGN KEY ("apiary_id") REFERENCES "apiaries"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "honey_varieties" ADD CONSTRAINT "honey_varieties_apiary_id_fkey" FOREIGN KEY ("apiary_id") REFERENCES "apiaries"("id") ON DELETE CASCADE ON UPDATE CASCADE;
