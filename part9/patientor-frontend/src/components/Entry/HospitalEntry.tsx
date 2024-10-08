import { HospitalEntry } from '../../types';
import { Typography } from '@mui/material';
import { LocalHospital } from '@mui/icons-material';


const HospitalEntryComponent: React.FC<{ entry: HospitalEntry}>= ({ entry }) => {
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
                <LocalHospital />
            </Typography>
            
            <Typography variant="body1" fontStyle={'italic'}> {entry.description} </Typography>
            
            <Typography variant="body1"> Discharge: {entry.discharge.date} </Typography>

            <Typography variant="body1"> Criteria: {entry.discharge.criteria} </Typography>

            <Typography variant="body1"> diagnose by {entry.specialist} </Typography>
        </div>
    );
};

export default HospitalEntryComponent;