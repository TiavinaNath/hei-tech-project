import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://jxqaetbsoqdhosbpcybr.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY

if (!supabaseKey) {
  throw new Error('NEXT_PUBLIC_SUPABASE_KEY is not defined in .env.local')
}

export const supabase = createClient(supabaseUrl, supabaseKey)
