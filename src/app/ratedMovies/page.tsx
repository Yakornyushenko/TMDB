import MoviesList from "@/src/ui/MoviesList/MoviesList";
import { Input } from "@/src/components/Input/Input";
import styles from "./page.module.scss";

export default function Page() {
  return (
    <section className={styles.ratedMovies}>
      <div className={styles.body}>
        <Input />
      </div>
      <MoviesList />
    </section>
  );
}
