
import { useState , useEffect} from "react";
import {Patient } from "../../types";
import { useParams } from "react-router-dom";
import patientService from "../../services/patients";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import { Button } from '@mui/material';
import EntryDetails from "../EntryDetails";
const SinglePatientPage = () => {
const {id} = useParams();
const [patient, setPatient] = useState<Patient | null>(null);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const [error, setError] = useState<string | null>(null);
useEffect(() => {
    console.log("single patient page is rendered");
    const fetchPatient = async () => {
        console.log("fetching patient");
        try {
            if(id){
                console.log("patientId: ",id);
                const patient = await patientService.getPatient(id);
                setPatient(patient);
                console.log("patient: ",patient);
            }
        } catch (error) {
            setError('Failed to fetch patient data');
        }
    };
    fetchPatient();
}, [id]);

const genderIcon = patient?.gender === 'male' ? <MaleIcon /> : <FemaleIcon />;
return (
    <div>
        <div><h2>Patient Name: {patient?.name}</h2>{genderIcon}</div>
        <p>SSN: {patient?.ssn}</p>
        <p>Patient Occupation: {patient?.occupation}</p>
<div>
    <h3>Entries</h3>
        
        {patient?.entries.map((entry) => (
        <EntryDetails key={entry.id} entry={entry} />
            
))}
</div>
        <Button variant="contained" color="primary" >Add New Entry
            
        </Button>
    </div>
);

};

export default SinglePatientPage;