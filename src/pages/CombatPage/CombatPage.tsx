import React, { useState, useEffect } from "react";
import "./CombatPage.css";

const MAX_ROUND = 5;
const ROUND_TIME = 5;

const CombatPage: React.FC<{ onChangePage: () => void }> = ({
  onChangePage,
}) => {
  const [selectedCards, setSelectedCards] = useState<string[]>([]);
  const [opponentCards, setOpponentCards] = useState<string[]>([]);
  const [currentRound, setCurrentRound] = useState(0);
  const [showCards, setShowCards] = useState(true);
  const [timer, setTimer] = useState(ROUND_TIME);
  const [gameResult, setGameResult] = useState<string | null>(null);

  const [playerScore, setPlayerScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);

  const handleCardSelect = (color: string) => {
    if (selectedCards.length < 10) {
      setSelectedCards((prevCards) => [...prevCards, color]);
      setShowCards(false);
    }
  };

  const handleOpponentCardSelect = () => {
    const colors = ["red", "blue"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setOpponentCards((prevCards) => [...prevCards, randomColor]);
  };

  const calculateScores = (playerCard: string, opponentCard: string) => {
    if (playerCard === "red" && opponentCard === "red") {
      setPlayerScore((prevScore) => prevScore - 2);
      setOpponentScore((prevScore) => prevScore - 2);
    } else if (playerCard === "blue" && opponentCard === "blue") {
      setPlayerScore((prevScore) => prevScore + 3);
      setOpponentScore((prevScore) => prevScore + 3);
    } else if (playerCard === "red" && opponentCard === "blue") {
      setOpponentScore((prevScore) => prevScore - 2);
      setPlayerScore((prevScore) => prevScore + 5);
    } else if (playerCard === "blue" && opponentCard === "red") {
      setOpponentScore((prevScore) => prevScore + 5);
      setPlayerScore((prevScore) => prevScore - 2);
    }
  };

  useEffect(() => {
    if (!!opponentCards[0] && selectedCards.length === opponentCards.length) {
      calculateScores(
        selectedCards[selectedCards.length - 1],
        opponentCards[opponentCards.length - 1]
      );
    }
  }, [selectedCards, opponentCards]);

  useEffect(() => {
    if (currentRound < MAX_ROUND && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => clearInterval(interval);
    } else if (timer === 0) {
      if (showCards) {
        handleCardSelect("blue");
        handleOpponentCardSelect();
      }
      setShowCards(false);

      if (currentRound === MAX_ROUND - 1) {
        // Если это последний раунд
        const result =
          playerScore > opponentScore
            ? "WIN"
            : playerScore < opponentScore
            ? "LOSE"
            : "DRAW";
        setGameResult(result);
      } else {
        setCurrentRound((prevRound) => prevRound + 1);
        setShowCards(true);

        setTimer(ROUND_TIME);
      }
      if (selectedCards.length > opponentCards.length) {
        handleOpponentCardSelect();
      }
    }
  }, [currentRound, timer, showCards]);

  useEffect(() => {
    if (gameResult) {
      setTimeout(() => {
        onChangePage();
      }, 3000);
    }
  }, [onChangePage, gameResult]);

  return (
    <>
      <div className="combat-page">
        <div className="timer-section">
          {gameResult ? (
            <h2 className="result">{gameResult}</h2>
          ) : (
            <div className="progress-bar">
              <div
                className="progress-bar-fill"
                style={{ width: `${(timer / ROUND_TIME) * 100}%` }}
              ></div>
            </div>
          )}
        </div>

        <div className="selected-cards-section">
          <h2 className="selected-cards-score">{opponentScore}</h2>
          <h3 className="selected-cards-title">OPPONENT</h3>
          <div className="selected-cards-table">
            <div className="selected-cards-container">
              {opponentCards.map((color, index) => (
                <div
                  key={index}
                  className={`selected-card card-${color}`}
                ></div>
              ))}
            </div>
            <div className="divider"></div>
            <div className="selected-cards-container">
              {selectedCards.map((color, index) => (
                <div
                  key={index}
                  className={`selected-card card-${color}`}
                ></div>
              ))}
            </div>
          </div>
          <h3 className="selected-cards-title">YOU</h3>
          <h2 className="selected-cards-score">{playerScore}</h2>
        </div>

        <div className="card-selection-section">
          {!gameResult && showCards && currentRound <= MAX_ROUND ? (
            <div className="cards-container">
              <div
                className="card card-red"
                onClick={() => handleCardSelect("red")}
              >
                ✖
              </div>
              <div
                className="card card-blue"
                onClick={() => handleCardSelect("blue")}
              >
                ✚
              </div>
            </div>
          ) : (
            <div className="loader"></div>
          )}
        </div>
      </div>
    </>
  );
};

export default CombatPage;
