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
        setErrorMessage(error.response?.data?.error || 'Unknown error');
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
        <div>
          <p>date</p>
          <input type="date" 
            placeholder="Date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div>
          <p>visibility</p>

          great <input type="radio" name="visibility" onChange={() => setVisibility('great')} checked={visibility === 'great'}/>
          
          good <input type="radio" name="visibility" onChange={() => setVisibility('good')} checked={visibility === 'good'}/>
          
          ok <input type="radio" name="visibility" onChange={() => setVisibility('ok')} checked={visibility === 'ok'}/>
          
          poor <input type="radio" name="visibility" onChange={() => setVisibility('poor')} checked={visibility === 'poor'}/>
        </div>

        <div>
          <p>weather</p>
          
          sunny <input type="radio" name="weather" onChange={() => setWeather('sunny')} checked={weather === 'sunny'}/>

          rainy <input type="radio" name="weather" onChange={() => setWeather('rainy')} checked={weather === 'rainy'}/>

          cloudy <input type="radio" name="weather" onChange={() => setWeather('cloudy')} checked={weather === 'cloudy'}/>

          stormy <input type="radio" name="weather" onChange={() => setWeather('stormy')} checked={weather === 'stormy'}/>

          windy <input type="radio" name="weather" onChange={() => setWeather('windy')} checked={weather === 'windy'}/>
        </div>

        <div>
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