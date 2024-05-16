import Movie from "@/src/ui/Movie/Movie";

export default function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  return typeof window !== "undefined" && <Movie id={id} />;
}
