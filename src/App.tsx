import { API_KEY } from './constanst';
import { useState, useEffect } from 'react';

import { Movie } from './type';
import { SelectMode } from './components/SelectMode';

export default function App() {
  const [movies, setMovies] = useState<Movie | null>(null);
  const [guessMovie, setGuessMovie] = useState<string>('');
  const [live, setLive] = useState(5);
  const [points, setPoints] = useState(0);
  const [disable, setDisable] = useState(false);
  const [hint, setHint] = useState(false);
  const [selectMode, setSelectMode] = useState(true);
  const [value, setValue] = useState<number>(0);

  async function getMovie(): Promise<Movie> {
    const res = await fetch(
      'https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1',
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          accept: 'application/json'
        }
      }
    );
    const { results } = await res.json();
    const randomMovie = results[Math.floor(Math.random() * results.length)];

    return randomMovie;
  }
  useEffect(() => {
    getMovie().then((res) => {
      setMovies(res);
      hiddenWords(res.name);
    });
  }, [live, points, selectMode]);

  function hiddenWords(word: string) {
    if (!value) {
      return;
    }
    const positionRandom: number[] = [];
    for (let i = 0; i < Math.max(word.length / value, 1); i++) {
      console.log(Math.max(word.length / value, 1));

      const number = Math.floor(Math.random() * word.length);
      if (!positionRandom.includes(number)) {
        positionRandom.push(number);
      }
    }
    const splittedWord = word.split('');
    const newsplittedWord = splittedWord.map((el, index) => {
      if (positionRandom.includes(index)) {
        return '_';
      } else {
        return el;
      }
    });
    console.log(newsplittedWord);
    setGuessMovie(newsplittedWord.join(''));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (live - 1 == 0) {
      setDisable(true);
    }
    const formData = new FormData(e.currentTarget);
    const inputValue = formData.get('partial')?.toString();

    if (inputValue == movies?.name) {
      setPoints((points) => points + 1);
    } else {
      setLive((live) => {
        if (live == 0) {
          return live;
        }
        return live - 1;
      });
    }
    e.currentTarget.partial.value = '';
    setHint(false);
  }
  function setDifficulty(value: number) {
    setSelectMode(false);
    setValue(value);
    console.log(value);
  }
  return (
    <section className="m-auto gap-4 p-4 max-w-screen-lg grid min-h-screen grid-rows-[70px,1fr,30px] w-[500px] text-center relative">
      <header className="grid content-center">
        <h1 className="font-bold">GUESS WITH A MOVIE</h1>
        <button
          onClick={() => window.location.reload()}
          className={`absolute top-10 left-4 py-1 px-2 font-normal ${
            disable ? 'button-disable' : ''
          }`}
        >
          recargar
        </button>
      </header>
      <main>
        {selectMode ? (
          <SelectMode setDifficulty={setDifficulty} />
        ) : (
          <article>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <h3 className="flex justify-center gap-8 relative my-3 text-blue-800 font-bold">
                <span>{`Lives : ${live}`}</span>
                <span>{` Point : ${points}`}</span>
                <button
                  className="py-1 px-2 font-normal absolute right-2 text-white"
                  type="button"
                  onClick={() => setHint(true)}
                >
                  Usar hint
                </button>
              </h3>
              <input
                className="tracking-widest h-10 p-4 "
                type="text"
                readOnly
                value={guessMovie}
              />
              <input
                className="tracking-widest h-10 p-4"
                type="text"
                name="partial"
              />
              <button type="submit" className="my-4">
                Send
              </button>
            </form>
            <div className="h-[150px] overflow-y-auto border-solid border border-gray-500 p-1">
              {hint ? <p>{movies?.overview}</p> : ''}
            </div>
          </article>
        )}
      </main>
      <footer>{`ayuda : ${movies?.name}`}</footer>
    </section>
  );
}
