import { TextField, Grid, Button, Typography } from "@mui/material";
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
    const [ diagnosisCodes, setDiagnosisCodes ] = useState('');
    const [ error, setError ] = useState('');

    const onSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        const diagnosesCodesArray = diagnosisCodes.split(',').map(code => code.trim());
        const newEntry: EntryWithoutId = {
            description,
            date,
            specialist,
            healthCheckRating: Number(healthCheckRating) as HealthCheckRating,
            diagnosisCodes: diagnosesCodesArray,
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
        setDiagnosisCodes('');
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

                <TextField
                    label="Description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    fullWidth
                />

                <TextField
                    label="Date"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    fullWidth
                />

                <TextField
                    label="Specialist"
                    value={specialist}
                    onChange={e => setSpecialist(e.target.value)}
                    fullWidth
                />

                <TextField
                    label="HealthCheckRating"
                    value={healthCheckRating}
                    onChange={e => setHealthCheckRating(e.target.value)}
                    fullWidth
                />

                <TextField
                    label="Diagnosis codes"
                    value={diagnosisCodes}
                    onChange={e => setDiagnosisCodes(e.target.value)}
                    fullWidth
                />

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