import { Entry } from "../../types";
import HealthCheckEntryComponent from "./HealthCheckEntry";
import HospitalEntryComponent from "./HospitalEntry";
import OccupationalHealthcareEntryComponent from "./OccupationalHealthcareEntry";

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    switch (entry.type) {
        case "HealthCheck":
            return <HealthCheckEntryComponent entry={entry} />;
        case "Hospital":
            return <HospitalEntryComponent entry={entry} />;
        case "OccupationalHealthcare":
            return <OccupationalHealthcareEntryComponent entry={entry} />;
        default:
            return null;
    }
};

export default EntryDetails;