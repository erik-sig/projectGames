"use client";

import { FiEdit, FiX } from "react-icons/fi";
import styles from "./Favorite.module.css";
import { useState } from "react";
import { DiVim } from "react-icons/di";

export default function Favorite() {
  const [input, setInput] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [gameName, setGameName] = useState("");

  const handleButton = () => {
    if (input !== "" || input.trim() !== "") setGameName(input);

    setInput("");
    setShowInput(!showInput);
  };

  return (
    <div className={styles.favoriteContainer}>
      {showInput ? (
        <div className={styles.gameInputContainer}>
          <input
            type='text'
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />
          <FiX size={24} onClick={handleButton} />
        </div>
      ) : (
        <button className={styles.editBtn} onClick={handleButton}>
          <FiEdit size={24} />
        </button>
      )}
      {gameName ? (
        <div>
          <span className={styles.spanLabel}>Jogo Favorito:</span>
          <p>{gameName}</p>
        </div>
      ) : (
        <span>Adicionar jogo</span>
      )}
    </div>
  );
}
