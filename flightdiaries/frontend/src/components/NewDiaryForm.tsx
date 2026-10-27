import { useState, type FormEvent } from 'react';
import type { NewDiaryEntry, Visibility, Weather } from '../types';

interface NewDiaryFormProps {
  onSubmit: (entry: NewDiaryEntry) => void;
}

export const NewDiaryForm = ({ onSubmit }: NewDiaryFormProps) => {
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState('');
  const [weather, setWeather] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit({
      date,
      visibility: visibility as Visibility,
      weather: weather as Weather,
      comment,
    });
    setDate('');
    setVisibility('');
    setWeather('');
    setComment('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add new entry</h2>
      <div>
        date <input value={date} onChange={(e) => setDate(e.target.value)} />
      </div>
      <div>
        visibility <input value={visibility} onChange={(e) => setVisibility(e.target.value)} />
      </div>
      <div>
        weather <input value={weather} onChange={(e) => setWeather(e.target.value)} />
      </div>
      <div>
        comment <input value={comment} onChange={(e) => setComment(e.target.value)} />
      </div>
      <button type="submit">add</button>
    </form>
  );
};