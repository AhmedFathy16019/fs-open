import { OccupationalHealthcareEntry } from "../../types";
import { Typography } from '@mui/material';
import { Work } from '@mui/icons-material';

const OccupationalHealthcareEntryComponent: React.FC<{ entry: OccupationalHealthcareEntry }> = ({ entry }) => {
    return (
        <div
            key={entry.id}
            style={{
                border: '1px solid black',
                borderRadius: '25px',
                padding: '15px',
                margin: '10px'
            }
        }>
            <Typography variant="body1">
                {entry.date}&nbsp;
                <Work />&nbsp;
                <i>{entry.employerName}</i>
            </Typography>

            <Typography variant="body1" fontStyle={'italic'}> {entry.description} </Typography>

            <Typography variant="body1"> diagnose by {entry.specialist} </Typography>
        </div>
    );
};

export default OccupationalHealthcareEntryComponent;