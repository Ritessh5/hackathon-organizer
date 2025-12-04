-- CreateTable
CREATE TABLE "Team" (
    "id" SERIAL NOT NULL,
    "team_name" TEXT NOT NULL,
    "leader_name" TEXT NOT NULL,
    "state" TEXT,
    "institution" TEXT,
    "problem_statement" TEXT,
    "problem_identified" TEXT,
    "solution_description" TEXT,
    "tech_stack" TEXT,
    "diagram_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);
