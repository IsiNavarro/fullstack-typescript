import { useEffect, useState } from 'react';
import axios from 'axios';
import { createDiary, getAllDiaries } from './services/diaryService';
import { NewDiaryForm } from './components/NewDiaryForm';
import type { NewDiaryEntry, NonSensitiveDiaryEntry } from './types';

const App = () => {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchDiaries = async () => {
      const data = await getAllDiaries();
      setDiaries(data);
    };
    void fetchDiaries();
  }, []);

  const showError = (message: string) => {
    setErrorMessage(message);
    setTimeout(() => setErrorMessage(null), 5000);
  };

  const addDiary = async (entry: NewDiaryEntry) => {
    try {
      const added = await createDiary(entry);
      setDiaries(diaries.concat(added));
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const data: unknown = error.response?.data;
        if (typeof data === 'string') {
          showError(data);
        } else if (data) {
          showError(JSON.stringify(data));
        } else {
          showError(error.message);
        }
      } else {
        showError('Unknown error');
      }
    }
  };

  return (
    <div>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <NewDiaryForm onSubmit={(entry) => void addDiary(entry)} />
      <h2>Diary entries</h2>
      {diaries.map(diary => (
        <div key={diary.id}>
          <h3>{diary.date}</h3>
          <p>visibility: {diary.visibility}</p>
          <p>weather: {diary.weather}</p>
        </div>
      ))}
    </div>
  );
};

export default App;