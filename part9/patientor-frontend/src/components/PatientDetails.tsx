import { useParams } from "react-router-dom";
import { Patient } from "../types";
// import { Diagnosis, Patient } from "../types";
import { Typography, Container } from "@mui/material";
import { Male, Female, Error } from "@mui/icons-material";
import { useEffect, useState } from "react";
import patientService from "../services/patients";
// import diagnosesService from "../services/diagnoses";
import EntryDetails from "./Entry";
import EntryForm from "./EntryForm";

const PatientDetails = () => {
    const patientId = useParams<{ id: string }>().id;
    const [patient, setPatient] = useState<Patient>();
    // const [diagnoses, setDiagnoses] = useState<Diagnosis[]>();

    useEffect(() => {
        const fetchPatient = async () => {
            const patient = await patientService.getPatient(patientId!);
            setPatient(patient);
        };
        void fetchPatient();

        // const fetchDiagnoses = async () => {
        //     const diagnoses = await diagnosesService.getAll();
        //     setDiagnoses(diagnoses);
        // };
        // void fetchDiagnoses();
    }, [patientId]);

    return (
        <Container>
            <Typography variant="h4">
                {patient?.name}

                { patient?.gender === 'male' && <Male style={{marginLeft: '1em'}} /> }
                { patient?.gender === 'female' && <Female style={{marginLeft: '1em'}} /> }
                { patient?.gender === 'other' && <Error style={{marginLeft: '1em'}} /> }
            </Typography>

            <Typography variant="body1"> ssn: {patient?.ssn} </Typography>

            <Typography variant="body1"> occupation: {patient?.occupation} </Typography>

            <EntryForm patientId={patientId!} />

            <Typography variant="h5"> entries </Typography>

            {patient?.entries.map(entry => (
                <EntryDetails key={entry.id} entry={entry} />
            ))}
        </Container>
    );
};

export default PatientDetails;
