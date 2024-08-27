import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_API_URL
const supabaseAnonKey = process.env.SUPABASE_API_KEY

console.log(supabaseUrl, supabaseAnonKey);

export const supabase = () => createClient(supabaseUrl, supabaseAnonKey)
