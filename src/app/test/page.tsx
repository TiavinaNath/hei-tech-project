'use server'

import { createClient } from '@/lib/supabase/server'

export default async function ShowSessionPage() {
  const supabase = await createClient()
  const { data: { session } } = await supabase.auth.getSession() // c'est pour prendre les info dans la session
  // visiter http://localhost:3000/test pour voir votre information en tant que user
  // cette route sera effacé à la production

  return (
    <main>
      <h1>Dashboard</h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </main>
  )
}
