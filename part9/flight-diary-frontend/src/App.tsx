import { useEffect, useState } from "react"
import { addDiary, getDiaries } from "./diaryService"
import { Diary, NewDiary } from "./types";
import axios from "axios";

function App() {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState('');
  const [weather, setWeather] = useState('');
  const [comment, setComment] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    getDiaries().then((diaries) => { setDiaries(diaries) });
  }, [])

  const diaryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();
    
    const newDiary: NewDiary = {
      date,
      visibility,
      weather,
      comment,
    };

    addDiary(newDiary).then((diary) => {
      setDiaries(diaries.concat(diary));
      setDate('');
      setVisibility('');
      setWeather('');
      setComment('');
    }).catch((error) => {
      if (axios.isAxiosError(error)) {
        console.log('error.response :>> ', error.response);
        setErrorMessage(error.response?.data || 'Unknown error');
      } else {
        console.error(error);
      }
  });
  }

  return (
    <>
      <h1>Add new entry</h1>
      <form onSubmit={diaryCreation}>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <div style={{flex: 'row'}}>
          <p>date</p>
          <input type="text" 
            placeholder="Date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div style={{flex: 'row'}}>
          <p>visibility</p>
          <input type="text" 
            placeholder="Visibility"
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
          />
        </div>

        <div style={{flex: 'row'}}>
          <p>weather</p>
          <input type="text" 
            placeholder="Weather"
            value={weather}
            onChange={(e) => setWeather(e.target.value)}
          />
        </div>

        <div style={{flex: 'row'}}>
          <p>comment</p>
          <input type="text" 
            placeholder="Comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>

        <button type="submit">Add</button>
      </form>

      <div>
        <h1>Diary entries</h1>
        {diaries.map(diary => {
          return (
            <div key={diary.id}>
              <h2>{diary.date}</h2>
              <p>Visibility: {diary.visibility}</p>
              <p>Weather: {diary.weather}</p>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default App;