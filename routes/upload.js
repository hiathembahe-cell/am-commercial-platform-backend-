import express from "express";
import multer from "multer";
import xlsx from "xlsx";
import pool from "../db.js";

const router = express.Router();

// مكان حفظ ملفات Excel مؤقتًا
const upload = multer({ dest: "excel/" });

router.post("/excel", upload.single("file"), async (req, res) => {
  try {
    // قراءة ملف Excel
    const workbook = xlsx.readFile(req.file.path);

    // قراءة الشيتات المطلوبة
    const overviewSheet = workbook.Sheets["Overview"];
    const subcontractorsSheet = workbook.Sheets["Subcontractors"];

    // تحويل الشيتات إلى JSON
    const overviewData = xlsx.utils.sheet_to_json(overviewSheet);
    const subcontractorsData = xlsx.utils.sheet_to_json(subcontractorsSheet);

    // إدخال بيانات Overview
    const o = overviewData[0];
    await pool.query(
      `INSERT INTO project_overview (project_name, total_contracts, signed_contracts, unassigned_contracts, progress)
       VALUES ($1,$2,$3,$4,$5)`,
      [o.Project, o.TotalContracts, o.SignedContracts, o.UnassignedContracts, o.Progress]
    );

    // إدخال بيانات Subcontractors
    for (let row of subcontractorsData) {
      await pool.query(
        `INSERT INTO subcontractors_status (project_name, scope_of_work, subcontractor_name, contract_status, subcontractor_number, subcontractor_email)
         VALUES ($1,$2,$3,$4,$5,$6)`,
        [
          row.Project,
          row.ScopeOfWork,
          row.SubcontractorName,
          row.Status,
          row.Number,
          row.Email
        ]
      );
    }

    res.json({ message: "Excel imported successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to process Excel" });
  }
});

export default router;

