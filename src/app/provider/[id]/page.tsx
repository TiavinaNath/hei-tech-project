// src/app/providers/[id]/page.tsximport { createClient } from "@/lib/supabase/server";
import { createClient } from "@/lib/supabase/server";
import { notFound } from 'next/navigation';

type Props = {
  params: { id: string };
};

export default async function ProviderDetail({ params }: Props) {
  const supabase = createClient();

  const { data: provider } = await (await supabase)
    .from('profiles')
    .select('*')
    .eq('id', params.id)
    .single();

  if (!provider) return notFound();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{provider.name}</h1>
      <p>Services : {provider.services}</p>
      <p>Bio : {provider.bio}</p>
    </div>
  );
}
