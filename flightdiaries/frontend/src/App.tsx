import { useEffect, useState } from 'react';
import { createDiary, getAllDiaries } from './services/diaryService';
import { NewDiaryForm } from './components/NewDiaryForm';
import type { NewDiaryEntry, NonSensitiveDiaryEntry } from './types';

const App = () => {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);

  useEffect(() => {
    const fetchDiaries = async () => {
      const data = await getAllDiaries();
      setDiaries(data);
    };
    void fetchDiaries();
  }, []);

  const addDiary = async (entry: NewDiaryEntry) => {
    const added = await createDiary(entry);
    setDiaries(diaries.concat(added));
  };

  return (
    <div>
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