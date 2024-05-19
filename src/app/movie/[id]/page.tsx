import Movie from "@/src/ui/MoviePage";

export default function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  return <Movie id={id} />;
}
