import { useEffect, useState } from 'react';
import axios from 'axios';

interface Diary {
  id: number;
  date: string;
  weather: string;
  visibility: string;
  comment: string;
}

type Weather = 'sunny' | 'rainy' | 'cloudy' | 'stormy' | 'windy';
type Visibility = 'great' | 'good' | 'ok' | 'poor';

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [date, setDate] = useState('');
  const [weather, setWeather] = useState<Weather>('sunny');
  const [visibility, setVisibility] = useState<Visibility>('good');
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/api/diaries')
      .then(response => {
        setDiaries(response.data);
      })
      .catch(error => {
        setError('Error fetching diaries');
        console.log(error);
      });
  }, []);

  const diaryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const newDiary = {
      date,
      weather,
      visibility,
      comment
    };

    axios.post('http://localhost:3000/api/diaries', newDiary)
      .then(response => {
        setDiaries(diaries.concat(response.data));
        setDate('');
      })
      .catch(error => {
        setError(error.response?.data?.error || 'Error creating diary');
        setTimeout(() => setError(''), 5000);
      });
  };

  return (
    <div>
      <h2>Add new entry</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={diaryCreation}>
        <div>
          <label>Date: </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <label>Weather: </label>
          <select value={weather} onChange={(e) => setWeather(e.target.value as Weather)}>
            <option value="sunny">Sunny</option>
            <option value="rainy">Rainy</option>
            <option value="cloudy">Cloudy</option>
            <option value="stormy">Stormy</option>
            <option value="windy">Windy</option>
          </select>
        </div>
        <div>
          <label>Visibility: </label>
          <select value={visibility} onChange={(e) => setVisibility(e.target.value as Visibility)}>
            <option value="great">Great</option>
            <option value="good">Good</option>
            <option value="ok">Ok</option>
            <option value="poor">Poor</option>
          </select>
        </div>
        <div>
          <label>Comment: </label>
          <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} />
        </div>
        <button type="submit">Add</button>
      </form>

      <h2>Diary entries</h2>
      {diaries.map((diary: Diary) => (
        <div key={diary.id} style={{ 
          margin: '10px 0',
          padding: '10px',
          border: '1px solid #ddd',
          borderRadius: '5px'
        }}>
          <p><strong>Date:</strong> {diary.date}</p>
          <p><strong>Weather:</strong> {diary.weather}</p>
          <p><strong>Visibility:</strong> {diary.visibility}</p>
        </div>
      ))}
    </div>
  );
};

export default App;