import styles from "./page.module.scss";
import RatedMoviesPage from "@/src/ui/RatedMoviesPage";

export default function Page() {
  return (
    <section className={styles.ratedMovies}>
      <RatedMoviesPage />
    </section>
  );
}
