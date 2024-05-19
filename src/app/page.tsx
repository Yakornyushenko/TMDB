import block from "bem-cn";
import "./page.scss";
import HomePage from "@/src/ui/HomePage";

const b = block("home");

export default async function Page() {
  return (
    <main className={b()}>
      <section>
        <HomePage />
      </section>
    </main>
  );
}
