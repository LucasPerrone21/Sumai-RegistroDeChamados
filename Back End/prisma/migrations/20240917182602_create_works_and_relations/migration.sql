-- CreateTable
CREATE TABLE "Works" (
    "id" SERIAL NOT NULL,
    "id_unit" INTEGER NOT NULL,
    "id_company" INTEGER NOT NULL,
    "place" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Works_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorksWorkers" (
    "id" SERIAL NOT NULL,
    "id_work" INTEGER NOT NULL,
    "id_worker" INTEGER NOT NULL,

    CONSTRAINT "WorksWorkers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Works" ADD CONSTRAINT "Works_id_unit_fkey" FOREIGN KEY ("id_unit") REFERENCES "Unit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Works" ADD CONSTRAINT "Works_id_company_fkey" FOREIGN KEY ("id_company") REFERENCES "Companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorksWorkers" ADD CONSTRAINT "WorksWorkers_id_work_fkey" FOREIGN KEY ("id_work") REFERENCES "Works"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorksWorkers" ADD CONSTRAINT "WorksWorkers_id_worker_fkey" FOREIGN KEY ("id_worker") REFERENCES "Workers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
