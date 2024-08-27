import { createClient } from '@supabase/supabase-js'

export const supabase = () => {
    const supabaseUrl = process.env.SUPABASE_API_URL
    const supabaseAnonKey = process.env.SUPABASE_API_KEY

    return createClient(supabaseUrl, supabaseAnonKey,
        {
            auth: {
                autoRefreshToken: false,
                persistSession: false,
                detectSessionInUrl: false
            }
        }
    )
}
