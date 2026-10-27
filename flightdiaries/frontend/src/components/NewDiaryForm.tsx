import { useState, type FormEvent } from 'react';
import { Visibility, Weather, type NewDiaryEntry } from '../types';

interface NewDiaryFormProps {
  onSubmit: (entry: NewDiaryEntry) => void;
}

export const NewDiaryForm = ({ onSubmit }: NewDiaryFormProps) => {
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Great);
  const [weather, setWeather] = useState<Weather>(Weather.Sunny);
  const [comment, setComment] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit({ date, visibility, weather, comment });
    setDate('');
    setVisibility(Visibility.Great);
    setWeather(Weather.Sunny);
    setComment('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add new entry</h2>

      <div>
        date{' '}
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>

      <div>
        visibility{' '}
        {Object.values(Visibility).map((value) => (
          <label key={value}>
            <input
              type="radio"
              name="visibility"
              value={value}
              checked={visibility === value}
              onChange={() => setVisibility(value)}
            />
            {value}
          </label>
        ))}
      </div>

      <div>
        weather{' '}
        {Object.values(Weather).map((value) => (
          <label key={value}>
            <input
              type="radio"
              name="weather"
              value={value}
              checked={weather === value}
              onChange={() => setWeather(value)}
            />
            {value}
          </label>
        ))}
      </div>

      <div>
        comment{' '}
        <input value={comment} onChange={(e) => setComment(e.target.value)} />
      </div>

      <button type="submit">add</button>
    </form>
  );
};