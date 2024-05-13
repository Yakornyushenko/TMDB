import MoviesList from "@/src/ui/MoviesList/MoviesList";
import block from "bem-cn";

const b = block("ratedMovies");

export default function Page() {
  return (
    <section>
      <h1> RatedMovies</h1>
      <MoviesList />
    </section>
  );
}
