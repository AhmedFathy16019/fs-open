import { useParams } from "react-router-dom";
import { Patient } from "../types";
import { Typography, Container } from "@mui/material";
import { Male, Female, Error } from "@mui/icons-material";
import { useEffect, useState } from "react";
import patientService from "../services/patients";

const PatientDetails = () => {
    const patientId = useParams<{ id: string }>().id;
    const [patient, setPatient] = useState<Patient>();

    useEffect(() => {
        const fetchPatient = async () => {
            const patient = await patientService.getPatient(patientId!);
            setPatient(patient);
        };
        void fetchPatient();
    }, [patientId]);

    return (
        <Container>
            <Typography variant="h4">
                {patient?.name}

                { patient?.gender === 'male' && <Male style={{marginLeft: '1em'}} /> }
                { patient?.gender === 'female' && <Female style={{marginLeft: '1em'}} /> }
                { patient?.gender === 'other' && <Error style={{marginLeft: '1em'}} /> }
            </Typography>

            <Typography variant="body1">
                ssn: {patient?.ssn}
            </Typography>

            <Typography variant="body1">
                occupation: {patient?.occupation}
            </Typography>
        </Container>
    );
};

export default PatientDetails;
