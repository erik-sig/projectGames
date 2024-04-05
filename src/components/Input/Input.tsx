"use client";

import { FormEvent, useState } from "react";

import styles from "./Input.module.css";
import { FiSearch } from "react-icons/fi";
import { useRouter } from "next/navigation";

export default function Input() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (search === "" || search.trim() === "") return;

    router.push(`/game/search/${search}`);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type='text'
        placeholder='Procurando algum jogo?...'
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <button type='submit'>
        <FiSearch size={29} color='#EA580C' />
      </button>
    </form>
  );
}
