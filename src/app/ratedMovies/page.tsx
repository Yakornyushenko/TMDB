import styles from "./page.module.scss";
import RatedMoviePage from "@/src/app/ratedMovies/components";

export default function Page() {
  return (
    <section className={styles.ratedMovies}>
      <RatedMoviePage />
    </section>
  );
}
