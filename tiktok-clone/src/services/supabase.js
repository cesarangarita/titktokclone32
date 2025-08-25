import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://kwajnaiebdhdonootfwh.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt3YWpuYWllYmRoZG9ub290ZndoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzNjI1MTIsImV4cCI6MjA2OTkzODUxMn0.FdHBrofsi-MQxY2JL7JefkI1CTD1pEymESRYKymXdpA'

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    storageKey: 'tiktok-clone-auth',
    storage: window.localStorage
  }
})
