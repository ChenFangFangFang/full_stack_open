import { Router } from "express";
import patientService from "../services/patientService";
import { NewPatientSchema } from "../util";
import { z } from "zod";

const router = Router();

router.get("/", (_req, res) => {
    res.send(patientService.getNonSensitivePatients());
});

router.post("/", (req, res) => {
    // const { name, dateOfBirth, ssn, gender, occupation } = req.body as NewPatient;
    // const newPatient = patientService.addPatient({
    //     name,
    //     dateOfBirth,
    //     ssn,
    //     gender,
    //     occupation
    // });
    // res.json(newPatient);
    try{
        const newPatientEntry = NewPatientSchema.parse(req.body);
        const addedPatient = patientService.addPatient(newPatientEntry);
        res.json(addedPatient);
    }catch(error:unknown){
        if (error instanceof z.ZodError) {
            res.status(400).send({ error: error.issues });
          } else {
            res.status(400).send({ error: 'unknown error' });
          }
    }
});

export default router;