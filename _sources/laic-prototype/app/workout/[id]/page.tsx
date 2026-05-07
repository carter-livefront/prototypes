import WorkoutDetailScreen from "@/components/Workout/WorkoutDetailScreen";

export function generateStaticParams() {
  const dynamicPool = Array.from({ length: 50 }, (_, i) => ({
    id: `gen-${i + 1}`,
  }));
  return [{ id: "v1" }, { id: "v2" }, { id: "new" }, ...dynamicPool];
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <WorkoutDetailScreen id={id} />;
}
