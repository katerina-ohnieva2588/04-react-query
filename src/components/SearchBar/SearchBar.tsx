"use client";

import { useActionState } from "react";
import toast from "react-hot-toast";
import styles from "./SearchBar.module.css";

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

interface FormState {
  query: string;
}

const initialState: FormState = {
  query: "",
};

export default function SearchBar({ onSubmit }: SearchBarProps) {
  const [, formAction] = useActionState(
    (_: FormState, formData: FormData) => {
      const query = formData.get("query") as string;

      if (!query.trim()) {
        toast.error("Please enter your search query.");
        return { query: "" };
      }

      onSubmit(query);
      return { query: "" };
    },
    initialState
  );

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a
          className={styles.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TMDB
        </a>

        <form className={styles.form} action={formAction}>
          <input
            className={styles.input}
            type="text"
            name="query"
            autoComplete="off"
            placeholder="Search movies..."
            autoFocus
          />
          <button className={styles.button} type="submit">
            Search
          </button>
        </form>
      </div>
    </header>
  );
}