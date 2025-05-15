// app/api/user/route.ts
import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user?.id) {
    console.error('User is not authenticated');
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }
  const { data: profile, error } = await supabase
    .from('users')
    .select('first_name')
    .eq('id', session.user.id)
    .single();

  if (error) {
    console.error('Failed to fetch profile:', error); 
    return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 });
  }

  return NextResponse.json({
    userId: session.user.id,
    firstName: profile.first_name,
  });
}
