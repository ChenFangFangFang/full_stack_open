import { Router } from "express";
import patientService from "../services/patientService";
import { EntryWithoutId } from "../types";
const router = Router();

router.get("/", (_req, res) => {
    res.send(patientService.getNonSensitivePatients());
});

router.get("/:id", (req, res) => {
    const { id } = req.params;
    const patient = patientService.getPatient(id);
    res.json(patient);
});
router.post("/:id/entries", (req, res) => {
    try {
        const { id } = req.params;
        const newEntry = req.body as EntryWithoutId;
        const addedEntry = patientService.addEntry(id, newEntry);
        res.status(201).json(addedEntry);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: 'Unknown error' });
        }
    }
});
export default router;