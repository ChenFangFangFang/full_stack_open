import { Router } from "express";
import patientService from "../services/patientService";
// import { NewPatientSchema } from "../util";
// import { z } from "zod";

const router = Router();

router.get("/", (_req, res) => {
    res.send(patientService.getNonSensitivePatients());
});

// router.post("/", (req, res) => {

//     try{
//         const newPatientEntry = NewPatientSchema.parse(req.body);
//         const addedPatient = patientService.addPatient(newPatientEntry);
//         res.json(addedPatient);
//     }catch(error:unknown){
//         if (error instanceof z.ZodError) {
//             res.status(400).send({ error: error.issues });
//           } else {
//             res.status(400).send({ error: 'unknown error' });
//           }
//     }
// });
router.get("/:id", (req, res) => {
    const { id } = req.params;
    const patient = patientService.getPatient(id);
    res.json(patient);
});
export default router;