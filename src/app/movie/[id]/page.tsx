import ClientComponents from "@/components/client-components";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div>
      movie : {id}
      <ClientComponents>
        <></>
      </ClientComponents>
    </div>
  );
}
