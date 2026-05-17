import { useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./MovieModal.module.css";
import type { Movie } from "../../types/movie";

interface MovieModalProps {
  movie: Movie | null;
  onClose: () => void;
}

export default function MovieModal({ movie, onClose }: MovieModalProps) {
  useEffect(() => {
    if (!movie) return;

    document.body.style.overflow = "hidden";

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEsc);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleEsc);
    };
  }, [movie, onClose]);

  if (!movie) return null;

  return createPortal(
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal}>
        <button onClick={onClose}>&times;</button>

        <img
          src={
            movie.backdrop_path
              ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
              : "https://placehold.co/500x750?text=No+Image"
          }
          alt={movie.title ?? "No title"}
        />

        <h2>{movie.title}</h2>
        <p>{movie.overview}</p>
      </div>
    </div>,
    document.body
  );
}