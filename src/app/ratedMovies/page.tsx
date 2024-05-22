import RatedMoviesPage from "@/src/ui/RatedMoviesPage/RatedMoviesPage";
import "./page.scss";
import block from "bem-cn";

const b = block("ratedMovies");

export default function Page() {
  return (
    <section className={b("ratedMovies")}>
      <RatedMoviesPage />
    </section>
  );
}
