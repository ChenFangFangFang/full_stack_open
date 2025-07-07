import { Entry, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry } from "../../types";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import WorkIcon from '@mui/icons-material/Work';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { assertNever } from "./utils";
import { Diagnosis } from "../../types";
import { useState,useEffect } from "react";
import diagnosesService from "../../services/diagnoses";
import { Card, CardContent, Typography, Box, Divider } from '@mui/material';
const DiagnosisList = ({ diagnosisCodes }: { diagnosisCodes?: string[] }) => {
    const [diagnoses, setDiagnoses] = useState<{ [code: string]: Diagnosis }>({});
  
    useEffect(() => {
      const fetchDiagnoses = async () => {
        const diagnosesData = await diagnosesService.getAll();
        const diagnosesObject = Object.fromEntries(
          diagnosesData.map(d => [d.code, d])
        );
        setDiagnoses(diagnosesObject);
      };
      fetchDiagnoses();
    }, []);
  
    if (!diagnosisCodes) return null;
  
    return (
      <ul>
        {diagnosisCodes.map((code) => (
          <li key={code}>{code}: {diagnoses[code]?.name}</li>
        ))}
      </ul>
    );
  };

  const HospitalEntryDetails = ({ entry }: { entry: HospitalEntry }) => {
    return (
      <Card sx={{ mb: 2, borderLeft: 4, borderColor: 'primary.main' }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <LocalHospitalIcon sx={{ mr: 1, color: 'primary.main' }} />
            <Typography variant="body1">{entry.date}</Typography>
          </Box>
          <Typography sx={{ mb: 1.5 }}>{entry.description}</Typography>
          <DiagnosisList diagnosisCodes={entry.diagnosisCodes} />
          <Divider sx={{ my: 1.5 }} />
          <Typography variant="body2" color="text.secondary">
            Discharge: {entry.discharge.date} - {entry.discharge.criteria}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Diagnosed by {entry.specialist}
          </Typography>
        </CardContent>
      </Card>
    );
  };
  
  const OccupationalHealthcareEntryDetails = ({ entry }: { entry: OccupationalHealthcareEntry }) => {
    return (
      <Card sx={{ mb: 2, borderLeft: 4, borderColor: 'info.main' }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <WorkIcon sx={{ mr: 1, color: 'info.main' }} />
            <Typography variant="body1">{entry.date}</Typography>
            <Typography variant="body2" sx={{ ml: 2 }}>
              Employer: {entry.employerName}
            </Typography>
          </Box>
          <Typography sx={{ mb: 1.5 }}>{entry.description}</Typography>
          <DiagnosisList diagnosisCodes={entry.diagnosisCodes} />
          {entry.sickLeave && (
            <>
              <Divider sx={{ my: 1.5 }} />
              <Typography variant="body2" color="text.secondary">
                Sick Leave: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}
              </Typography>
            </>
          )}
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Diagnosed by {entry.specialist}
          </Typography>
        </CardContent>
      </Card>
    );
  };
  
  const HealthCheckEntryDetails = ({ entry }: { entry: HealthCheckEntry }) => {
    return (
      <Card sx={{ mb: 2, borderLeft: 4, borderColor: 'success.main' }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <MedicalServicesIcon sx={{ mr: 1, color: 'success.main' }} />
            <Typography variant="body1">{entry.date}</Typography>
          </Box>
          <Typography sx={{ mb: 1.5 }}>{entry.description}</Typography>
          <DiagnosisList diagnosisCodes={entry.diagnosisCodes} />
          <Box sx={{ mt: 1.5 }}>
            <FavoriteIcon sx={{ 
              color: entry.healthCheckRating === 0 ? 'success.main' : 
                     entry.healthCheckRating === 1 ? 'warning.main' :
                     entry.healthCheckRating === 2 ? 'error.light' : 'error.main' 
            }} />
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Diagnosed by {entry.specialist}
          </Typography>
        </CardContent>
      </Card>
    );
  };
  const EntryDetails = ({ entry }: { entry: Entry }) => {
    switch (entry.type) {
      case "Hospital":
        return <HospitalEntryDetails entry={entry} />;
      case "OccupationalHealthcare":
        return <OccupationalHealthcareEntryDetails entry={entry} />;
      case "HealthCheck":
        return <HealthCheckEntryDetails entry={entry} />;
      default:
        return assertNever(entry);
    }
  };

  export default EntryDetails;
