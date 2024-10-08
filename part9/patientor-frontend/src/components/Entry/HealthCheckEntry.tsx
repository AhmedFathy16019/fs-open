
import { Typography } from "@mui/material";
import { HealthCheckEntry } from "../../types";
import { MedicalServices, Favorite } from '@mui/icons-material';

const getHeartColor = (rating: number): string => {
    switch (rating) {
        case 0:
            return 'green';
        case 1:
            return 'yellow';
        case 2:
            return 'orange';
        case 3:
            return 'red';
        default:
            return 'gray';
    }
};

const HealthCheckEntryComponent: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
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
                <MedicalServices />
            </Typography>

            <Typography variant="body1" fontStyle={'italic'}> {entry.description} </Typography>

            <Favorite style={{ color: getHeartColor(entry.healthCheckRating) }} />

            <Typography variant="body1"> diagnose by {entry.specialist} </Typography>
        </div>
    );
};

export default HealthCheckEntryComponent;