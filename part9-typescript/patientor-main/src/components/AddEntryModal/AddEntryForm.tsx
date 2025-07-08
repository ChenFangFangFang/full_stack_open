import { useState, SyntheticEvent, useEffect } from "react";
import { TextField, InputLabel, MenuItem, Select, Grid, Button, SelectChangeEvent, OutlinedInput, Alert } from '@mui/material';
import { EntryType, EntryFormValues, HealthCheckRating, Diagnosis } from "../../types";
import diagnosisService from "../../services/diagnoses";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
}

interface EntryTypeOption {
  value: EntryType;
  label: string;
}

interface SickLeave {
  startDate: string;
  endDate: string;
}

interface Discharge {
  date: string;
  criteria: string;
}

const entryTypeOptions: EntryTypeOption[] = Object.values(EntryType).map(v => ({
  value: v, label: v.toString()
}));

const AddEntryForm = ({ onCancel, onSubmit }: Props) => {
  const [entryType, setEntryType] = useState<EntryType>(EntryType.HealthCheck);
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(HealthCheckRating.Healthy);
  const [employerName, setEmployerName] = useState('');
  const [sickLeave, setSickLeave] = useState<SickLeave>({ startDate: '', endDate: '' });
  const [discharge, setDischarge] = useState<Discharge>({ date: '', criteria: '' });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchDiagnoses = async () => {
      const diagnoses = await diagnosisService.getAll();
      setDiagnoses(diagnoses);
    };
    void fetchDiagnoses();
  }, []);

  const onEntryTypeChange = (event: SelectChangeEvent<string>) => {
    setEntryType(event.target.value as EntryType);
  };

  const onDiagnosisCodesChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    setDiagnosisCodes(
      typeof value === 'string' ? value.split(',') : value
    );
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!description) {
      newErrors.description = 'Description is required';
    }
    if (!date) {
      newErrors.date = 'Date is required';
    }
    if (!specialist) {
      newErrors.specialist = 'Specialist is required';
    }

    switch (entryType) {
      case EntryType.HealthCheck:
        if (healthCheckRating === undefined) {
          newErrors.healthCheckRating = 'Health check rating is required';
        }
        break;
      case EntryType.OccupationalHealthcare:
        if (!employerName) {
          newErrors.employerName = 'Employer name is required';
        }
        if (sickLeave.startDate && !sickLeave.endDate) {
          newErrors.sickLeaveEnd = 'End date is required if start date is set';
        }
        if (!sickLeave.startDate && sickLeave.endDate) {
          newErrors.sickLeaveStart = 'Start date is required if end date is set';
        }
        break;
      case EntryType.Hospital:
        if (!discharge.date) {
          newErrors.dischargeDate = 'Discharge date is required';
        }
        if (!discharge.criteria) {
          newErrors.dischargeCriteria = 'Discharge criteria is required';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const baseEntry = {
      description,
      date,
      specialist,
      diagnosisCodes,
      type: entryType
    };

    switch (entryType) {
      case EntryType.HealthCheck:
        onSubmit({
          ...baseEntry,
          type: "HealthCheck",
          healthCheckRating,
        });
        break;
      case EntryType.OccupationalHealthcare:
        onSubmit({
          ...baseEntry,
          type: "OccupationalHealthcare",
          employerName,
          sickLeave: sickLeave.startDate && sickLeave.endDate ? sickLeave : undefined,
        });
        break;
      case EntryType.Hospital:
        onSubmit({
          ...baseEntry,
          type: "Hospital",
          discharge,
        });
        break;
    }
  };

  return (
    <div>
      <form onSubmit={addEntry}>
        <Grid container spacing={2}>
          {Object.values(errors).length > 0 && (
            <Grid item xs={12}>
              <Alert severity="error">
                Please fix the following errors:
                <ul style={{ margin: 0, paddingLeft: '1.5em' }}>
                  {Object.values(errors).map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </Alert>
            </Grid>
          )}

          <Grid item xs={12}>
            <InputLabel>Entry Type</InputLabel>
            <Select
              fullWidth
              value={entryType}
              onChange={onEntryTypeChange}
            >
              {entryTypeOptions.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Description"
              fullWidth
              value={description}
              onChange={({ target }) => setDescription(target.value)}
              error={Boolean(errors.description)}
              helperText={errors.description}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Date"
              type="date"
              fullWidth
              value={date}
              onChange={({ target }) => setDate(target.value)}
              InputLabelProps={{ shrink: true }}
              error={Boolean(errors.date)}
              helperText={errors.date}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Specialist"
              fullWidth
              value={specialist}
              onChange={({ target }) => setSpecialist(target.value)}
              error={Boolean(errors.specialist)}
              helperText={errors.specialist}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <InputLabel>Diagnosis Codes</InputLabel>
            <Select
              multiple
              fullWidth
              value={diagnosisCodes}
              onChange={onDiagnosisCodesChange}
              input={<OutlinedInput />}
              renderValue={(selected) => (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {selected.map((code) => {
                    const diagnosis = diagnoses.find(d => d.code === code);
                    return (
                      <div key={code} style={{ 
                        padding: '2px 4px',
                        borderRadius: '4px',
                        backgroundColor: '#e0e0e0'
                      }}>
                        {code} - {diagnosis?.name}
                      </div>
                    );
                  })}
                </div>
              )}
            >
              {diagnoses.map((diagnosis) => (
                <MenuItem key={diagnosis.code} value={diagnosis.code}>
                  {diagnosis.code} - {diagnosis.name}
                </MenuItem>
              ))}
            </Select>
          </Grid>

          {entryType === EntryType.HealthCheck && (
            <Grid item xs={12}>
              <InputLabel error={Boolean(errors.healthCheckRating)}>
                Health Check Rating
                {errors.healthCheckRating && (
                  <span style={{ color: '#d32f2f', marginLeft: '8px' }}>
                    *{errors.healthCheckRating}
                  </span>
                )}
              </InputLabel>
              <Select
                fullWidth
                value={healthCheckRating}
                onChange={(e) => setHealthCheckRating(Number(e.target.value) as HealthCheckRating)}
                error={Boolean(errors.healthCheckRating)}
                required
              >
                <MenuItem value={HealthCheckRating.Healthy}>Healthy (0)</MenuItem>
                <MenuItem value={HealthCheckRating.LowRisk}>Low Risk (1)</MenuItem>
                <MenuItem value={HealthCheckRating.HighRisk}>High Risk (2)</MenuItem>
                <MenuItem value={HealthCheckRating.CriticalRisk}>Critical Risk (3)</MenuItem>
              </Select>
            </Grid>
          )}

          {entryType === EntryType.OccupationalHealthcare && (
            <>
              <Grid item xs={12}>
                <TextField
                  label="Employer Name"
                  fullWidth
                  value={employerName}
                  onChange={({ target }) => setEmployerName(target.value)}
                  error={Boolean(errors.employerName)}
                  helperText={errors.employerName}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Sick Leave Start Date"
                  type="date"
                  fullWidth
                  value={sickLeave.startDate}
                  onChange={({ target }) => setSickLeave({ ...sickLeave, startDate: target.value })}
                  InputLabelProps={{ shrink: true }}
                  error={Boolean(errors.sickLeaveStart)}
                  helperText={errors.sickLeaveStart}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Sick Leave End Date"
                  type="date"
                  fullWidth
                  value={sickLeave.endDate}
                  onChange={({ target }) => setSickLeave({ ...sickLeave, endDate: target.value })}
                  InputLabelProps={{ shrink: true }}
                  error={Boolean(errors.sickLeaveEnd)}
                  helperText={errors.sickLeaveEnd}
                />
              </Grid>
            </>
          )}

          {entryType === EntryType.Hospital && (
            <>
              <Grid item xs={6}>
                <TextField
                  label="Discharge Date"
                  type="date"
                  fullWidth
                  value={discharge.date}
                  onChange={({ target }) => setDischarge({ ...discharge, date: target.value })}
                  InputLabelProps={{ shrink: true }}
                  error={Boolean(errors.dischargeDate)}
                  helperText={errors.dischargeDate}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Discharge Criteria"
                  fullWidth
                  value={discharge.criteria}
                  onChange={({ target }) => setDischarge({ ...discharge, criteria: target.value })}
                  error={Boolean(errors.dischargeCriteria)}
                  helperText={errors.dischargeCriteria}
                  required
                />
              </Grid>
            </>
          )}

          <Grid item xs={12}>
            <Grid container spacing={2} justifyContent="flex-end">
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddEntryForm;