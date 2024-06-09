import './App.css';
import Home from './components/Home';
import PlayGame from './components/PlayGame';
import EndGame from './components/EndGame';
import { useEffect, useState } from 'react';

function App() {
  const [statusGame, setStatusGame] = useState(null);
  const [score, setScore] = useState(null);
  const [timeLeft, setTimeLeft] = useState(60); // Timer set to 60 seconds

  useEffect(() => {
    if (statusGame === 'PlayGame') {
      setScore({
        right: 0,
        wrong: 0
      });

      const interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            setStatusGame('EndGame');
            clearInterval(interval);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [statusGame]);

  const handleChangeStatusGame = (status) => {
    setStatusGame(status);
    if (status === 'PlayGame') {
      setTimeLeft(60); // Reset timer to 60 seconds when game starts
    }
  }

  const handleChangeScore = (type) => {
    if (type === 'right') {
      setScore({
        ...score,
        right: score.right + 1
      })
    } else {
      setScore({
        ...score,
        wrong: score.wrong + 1
      })
    }
  }

  let layout;
  switch (statusGame) {
    case 'PlayGame':
      layout = <PlayGame onChangeScore={handleChangeScore} timeLeft={timeLeft} />
      break;
    case 'EndGame':
      layout = <EndGame score={score} onGame={handleChangeStatusGame} />
      break;
    default:
      layout = <Home onGame={handleChangeStatusGame} />
      break;
  }

  return (
    <div className="App">
      {layout}
    </div>
  );
}

export default App;
