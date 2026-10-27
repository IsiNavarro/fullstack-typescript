import type { CoursePart } from '../types';
import { Part } from './Part';

interface ContentProps {
  courseParts: CoursePart[];
}

export const Content = ({ courseParts }: ContentProps) => {
  return (
    <div>
      {courseParts.map(part => (
        <Part key={part.name} part={part} />
      ))}
    </div>
  );
};