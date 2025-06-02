import React, { useState, useEffect } from "react";
import { chosung } from "./Hangul.js";
import wordlist from "../data/wordlist.json";

function Game() {
  const [target, setTarget] = useState("");
  const [hint, setHint] = useState("");
  const [guess, setGuess] = useState("");
  const [attempts, setAttempts] = useState([]);
  const [message, setMessage] = useState("");

  const startNewGame = () => {
    const word = wordlist[Math.floor(Math.random() * wordlist.length)];
    setTarget(word);
    setHint(word.split("").map(chosung).join(""));
    setGuess("");
    setAttempts([]);
    setMessage("");
  };

  useEffect(() => {
    startNewGame();
  }, []);

  const handleSubmit = () => {
    if (guess.length !== 3) {
      setMessage("3글자 단어를 입력하세요.");
      return;
    }

    const result = guess.split("").map((ch, i) => {
      if (ch === target[i]) return "🟩";
      else if (target.includes(ch)) return "🟨";
      else return "⬜";
    });

    const newAttempts = [...attempts, { guess, result }];
    setAttempts(newAttempts);
    setGuess("");

    if (guess === target) {
      setMessage("정답입니다!");
    } else if (newAttempts.length === 6) {
      setMessage(`실패! 정답은 '${target}'였습니다.`);
    } else {
      setMessage("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "2rem", fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>자음들레</h1>
      <p>힌트 (초성): <strong>{hint}</strong></p>

      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          value={guess}
          maxLength={3}
          onChange={(e) => setGuess(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{ fontSize: "1.5rem", textAlign: "center", width: "6rem" }}
        />
        <button onClick={handleSubmit} style={{ marginLeft: "1rem", fontSize: "1rem" }}>
          입력
        </button>
        <button onClick={startNewGame} style={{ marginLeft: "0.5rem", fontSize: "1rem" }}>
          새 게임
        </button>
      </div>

      <div style={{ marginTop: "1rem" }}>
        {attempts.map((a, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginBottom: "0.3rem" }}>
            {a.result.map((res, idx) => (
              <div
                key={idx}
                style={{
                  width: "2.5rem",
                  height: "2.5rem",
                  fontSize: "1.5rem",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: res === "🟩" ? "#6aaa64" : res === "🟨" ? "#c9b458" : "#787c7e",
                  color: "white",
                  borderRadius: "0.3rem",
                }}
              >
                {a.guess[idx]}
              </div>
            ))}
          </div>
        ))}
      </div>

      <p style={{ marginTop: "1rem", fontWeight: "bold" }}>{message}</p>
    </div>
  );
}

export default Game;
