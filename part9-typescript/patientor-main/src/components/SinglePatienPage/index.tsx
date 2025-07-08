import { useState , useEffect} from "react";
import {Patient } from "../../types";
import { useParams } from "react-router-dom";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import { Button } from '@mui/material';
import { EntryFormValues } from "../../types";
import patientService from "../../services/patients";
import EntryDetails from "../EntryDetails";
import AddEntryModal from "../AddEntryModal";

const SinglePatientPage = () => {
    const [error, setError] = useState<string>();
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

    const {id} = useParams();
    const [patient, setPatient] = useState<Patient | null>(null);

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

    const submitNewEntry = async (values: EntryFormValues) => {
        try {
            if (id && patient) {
                const newEntry = await patientService.addEntry(id, values);
                setPatient({
                    ...patient,
                    entries: patient.entries.concat(newEntry)
                });
                closeModal();
            }
        } catch (e: unknown) {
            if (e instanceof Error) {
                setError(e.message);
            } else {
                setError('Failed to add entry');
            }
        }
    };

    const genderIcon = patient?.gender === 'male' ? <MaleIcon /> : <FemaleIcon />;

    if (!patient) {
        return null;
    }

    return (
        <div>
            <div><h2>Patient Name: {patient.name}</h2>{genderIcon}</div>
            <p>SSN: {patient.ssn}</p>
            <p>Patient Occupation: {patient.occupation}</p>
            <div>
                <h3>Entries</h3>
                {patient.entries.map((entry) => (
                    <EntryDetails key={entry.id} entry={entry} />
                ))}
            </div>
            <AddEntryModal
                modalOpen={modalOpen}
                onClose={closeModal}
                onSubmit={submitNewEntry}
                error={error}
            />
            <Button 
                variant="contained" 
                color="primary" 
                onClick={openModal}
            >
                Add New Entry
            </Button>
        </div>
    );
};

export default SinglePatientPage;