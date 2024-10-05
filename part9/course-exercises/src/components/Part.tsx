
interface CoursePartBase {
    name: string;
    exerciseCount: number;
}

interface CoursePartVerbose extends CoursePartBase {
    description: string;
};

interface CoursePartBasic extends CoursePartVerbose {
    kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
    groupProjectCount: number;
    kind: "group"
}

interface CoursePartBackground extends CoursePartVerbose {
    backgroundMaterial: string;
    kind: "background"
}

interface CoursePartSpecial extends CoursePartVerbose {
    requirements: string[];
    kind: "special"
}

export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;

interface PartProps {
    part: CoursePart;
}

const Part = ({ part }: PartProps) => {
    switch (part.kind) {
        case "basic":
            return (
                <div>
                    <h4>{part.name} {part.exerciseCount}</h4>
                    <p>{part.description}</p>
                </div>
            )
        case "group":
            return (
                <div>
                    <h4>{part.name} {part.exerciseCount}</h4>
                    <p>project exercises {part.groupProjectCount}</p>
                </div>
            )
        case "background":
            return (
                <div>
                    <h4>{part.name} {part.exerciseCount}</h4>
                    <p>{part.description}</p>
                    <p>submit to {part.backgroundMaterial}</p>
                </div>
            )
        case "special":
            return (
                <div>
                    <h4>{part.name} {part.exerciseCount}</h4>
                    <p>{part.description}</p>
                    <p>required skills: {part.requirements.join(", ")}</p>
                </div>
            )
        default:
            return null;
    }
}

export default Part;