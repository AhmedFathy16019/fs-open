import { TextField, Grid, Button, Typography, Select, FormControl, InputLabel, MenuItem } from "@mui/material";
import { Error } from "@mui/icons-material";
import patientService from "../services/patients";
import { EntryWithoutId, HealthCheckRating } from "../types";
import { useState } from "react";
import axios from "axios";

const EntryForm: React.FC<{ patientId: string }> = ({ patientId }) => {
    const [ description, setDescription ] = useState('');
    const [ date, setDate ] = useState('');
    const [ specialist, setSpecialist ] = useState('');
    const [ healthCheckRating, setHealthCheckRating ] = useState('');
    const [ diagnosisCodes, setDiagnosisCodes ] = useState<string[]>([]);
    const [ type, setType ] = useState('HealthCheck');
    const [ dischargeDate, setDischargeDate ] = useState('');
    const [ dischargeCriteria, setDischargeCriteria ] = useState('');
    const [ employerName, setEmployerName ] = useState('');
    const [ sickLeaveStartDate, setSickLeaveStartDate ] = useState('');
    const [ sickLeaveEndDate, setSickLeaveEndDate ] = useState('');
    const [ error, setError ] = useState('');

    const onSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        const newEntry: EntryWithoutId = {
            description,
            date,
            specialist,
            healthCheckRating: Number(healthCheckRating) as HealthCheckRating,
            diagnosisCodes,
            type: "HealthCheck",
        };

        try {
            await patientService.addEntry(patientId, newEntry);
            onCancel();
        } catch (e) {
            if (axios.isAxiosError(e)) {
                if (e?.response?.data) {
                    const message = `Error: ${e.response.data.error.map((error: { message: string }) => error.message).join(', ')}`;
                    setError(message);
                } else {
                    setError("Unrecognized axios error");
                }
            } else {
                setError("Unknown error occurred");
            }

            setTimeout(() => {
                setError('');
            }, 5000);
        }
    };

    const onCancel = () => {
        setDescription('');
        setDate('');
        setSpecialist('');
        setHealthCheckRating('');
        setDiagnosisCodes([]);
    };

    return (
        <>
            { error && 
                <div style={{ color: 'red', border: '1px solid', borderRadius: '15px',padding: '10px', margin: '10px 0' }}>
                    <Typography variant="h6">
                        <Error />&nbsp;
                        {error}
                    </Typography>
                </div>
            }
            <form style={{ border: '1px dotted', padding: '15px', gap: '15px', display: 'flex', flexDirection: 'column'}}>
                <Typography variant="h5">New HealthCheck entry</Typography>
                
                <FormControl fullWidth>
                    <InputLabel id="entry-type-label">Type</InputLabel>
                    <Select
                        labelId="entry-type-label"
                        value={type}
                        onChange={e => setType(e.target.value)}
                        label="Type"
                    >
                        <MenuItem value="HealthCheck">Health Check</MenuItem>
                        <MenuItem value="Hospital">Hospital</MenuItem>
                        <MenuItem value="OccupationalHealthcare">Occupational Healthcare</MenuItem>
                    </Select>
                </FormControl>


                <TextField
                    label="Description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    fullWidth
                />

                <TextField
                    label="Date"
                    type="date"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    fullWidth
                    InputLabelProps={{
                        shrink: true,
                    }}
                />

                <TextField
                    label="Specialist"
                    value={specialist}
                    onChange={e => setSpecialist(e.target.value)}
                    fullWidth
                />

                <FormControl fullWidth>
                    <InputLabel id="diagnosis-codes-label">Diagnosis codes</InputLabel>
                    <Select
                        labelId="diagnosis-codes-label"
                        value={diagnosisCodes}
                        onChange={e => setDiagnosisCodes(e.target.value as string[])}
                        label="Diagnosis codes"
                        multiple
                    >
                        <MenuItem value="M24.2">M24.2</MenuItem>
                        <MenuItem value="M51.2">M51.2</MenuItem>
                        <MenuItem value="M54.2">M54.2</MenuItem>
                        <MenuItem value="M67.2">M67.2</MenuItem>
                    </Select>
                </FormControl>
                    

                { type === "HealthCheck" && 
                    <TextField
                        label="HealthCheckRating"
                        value={healthCheckRating}
                        onChange={e => setHealthCheckRating(e.target.value)}
                        fullWidth
                    />
                }

                { type === "Hospital" &&
                    <>
                        <TextField
                            label="Discharge date"
                            type="date"
                            value={dischargeDate}
                            onChange={e => setDischargeDate(e.target.value)}
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        
                        <TextField
                            label="Discharge criteria"
                            value={dischargeCriteria}
                            onChange={e => setDischargeCriteria(e.target.value)}
                            fullWidth
                        />
                    </>
                }

                { type === "OccupationalHealthcare" &&
                    <>
                        <TextField
                            label="Employer name"
                            value={employerName}
                            onChange={e => setEmployerName(e.target.value)}
                            fullWidth
                        />

                        <TextField
                            label="Sick leave start date"
                            type="date"
                            value={sickLeaveStartDate}
                            onChange={e => setSickLeaveStartDate(e.target.value)}
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                        <TextField
                            label="Sick leave end date"
                            type="date"
                            value={sickLeaveEndDate}
                            onChange={e => setSickLeaveEndDate(e.target.value)}
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </>
                }

                <Grid>
                    <Grid item>
                        <Button
                            type="reset"
                            variant="contained"
                            color="error"
                            style={{ float: 'left' }}
                            onClick={onCancel}
                        >
                            Cancel
                        </Button>
                    </Grid>

                    <Grid item>
                        <Button
                            type="submit"
                            onClick={onSubmit}
                            variant="contained"
                            color="inherit"
                            style={{ float: 'right' }}
                        >
                            Add entry
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </>
    );
};

export default EntryForm;