import type { CoursePart } from "../types"

interface ContentProps {
    courseParts: CoursePart[]
}

export const Content = ({courseParts}: ContentProps) => {
    return <div>
        {courseParts.map(coursePart => <p key={coursePart.name}>{coursePart.name} {coursePart.exerciseCount}</p>)}
    </div>
}