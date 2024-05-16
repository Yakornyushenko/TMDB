import block from "bem-cn";
import Filter from "@/src/ui/Filter/Filter";
import MoviesList from "@/src/ui/MoviesList/MoviesList";
import "./page.scss";

const b = block("home");

export default async function Page() {
  return (
    <main className={b()}>
      <section>
        <h1 className={b()}>Movies</h1>

        {typeof window !== "undefined" && (
          <>
            <Filter /> <MoviesList />
          </>
        )}
      </section>
    </main>
  );
}
