import Edit from "@/components/prototype/editPrototype/Edit";

export default function PrototypeEditPage({
  params,
}: {
  params: { id: string };
}) {
  return <Edit id={params.id} />;
}
