/*
  Warnings:

  - Added the required column `leafsEarned` to the `CampaignRedemption` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Campaign" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "leafReward" REAL NOT NULL,
    "imageUrl" TEXT,
    "qrSecret" TEXT NOT NULL,
    "codeText" TEXT,
    "maxUses" INTEGER,
    "currentUses" INTEGER NOT NULL DEFAULT 0,
    "expiresAt" DATETIME,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "companyId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Campaign_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AchievementDefinition" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "icon" TEXT NOT NULL DEFAULT '🌱',
    "category" TEXT NOT NULL,
    "tierThresholds" TEXT NOT NULL DEFAULT '[1,5,20,50,100,200,350,500,750,1000]',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "UserAchievement" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "achievementId" TEXT NOT NULL,
    "currentProgress" INTEGER NOT NULL DEFAULT 0,
    "currentTier" INTEGER NOT NULL DEFAULT 0,
    "unlockedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastProgressAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "UserAchievement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserAchievement_achievementId_fkey" FOREIGN KEY ("achievementId") REFERENCES "AchievementDefinition" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Mission" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "icon" TEXT NOT NULL DEFAULT '🎯',
    "type" TEXT NOT NULL,
    "requirementAction" TEXT NOT NULL,
    "requirementCount" INTEGER NOT NULL DEFAULT 1,
    "rewardLeafs" REAL NOT NULL DEFAULT 0,
    "rewardAchievementSlug" TEXT,
    "expiresAt" DATETIME,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "UserMission" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "missionId" TEXT NOT NULL,
    "progress" INTEGER NOT NULL DEFAULT 0,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "completedAt" DATETIME,
    "claimedAt" DATETIME,
    "startedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "UserMission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserMission_missionId_fkey" FOREIGN KEY ("missionId") REFERENCES "Mission" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CampaignRedemption" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "campaignId" TEXT NOT NULL,
    "leafsEarned" REAL NOT NULL,
    "redeemedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "CampaignRedemption_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CampaignRedemption_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_CampaignRedemption" ("campaignId", "id", "redeemedAt", "userId") SELECT "campaignId", "id", "redeemedAt", "userId" FROM "CampaignRedemption";
DROP TABLE "CampaignRedemption";
ALTER TABLE "new_CampaignRedemption" RENAME TO "CampaignRedemption";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Campaign_qrSecret_key" ON "Campaign"("qrSecret");

-- CreateIndex
CREATE UNIQUE INDEX "Campaign_codeText_key" ON "Campaign"("codeText");

-- CreateIndex
CREATE UNIQUE INDEX "AchievementDefinition_slug_key" ON "AchievementDefinition"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "UserAchievement_userId_achievementId_key" ON "UserAchievement"("userId", "achievementId");

-- CreateIndex
CREATE UNIQUE INDEX "UserMission_userId_missionId_key" ON "UserMission"("userId", "missionId");
