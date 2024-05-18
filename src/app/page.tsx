import block from "bem-cn";
import Filter from "@/src/ui/Filter/Filter";
import "./page.scss";
import { MoviesList } from "@/src/ui/MoviesList/MoviesList";

const b = block("home");

export default async function Page() {
  return (
    <main className={b()}>
      <section>
        <h1 className={b()}>Movies</h1>
        <Filter />
        <MoviesList />
      </section>
    </main>
  );
}
