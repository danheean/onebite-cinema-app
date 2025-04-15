import ClientComponents from "@/components/client-components";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) {
  const { q } = await searchParams;

  return (
    <div>
      Search : {q}
      <ClientComponents>
        <></>
      </ClientComponents>
    </div>
  );
}
