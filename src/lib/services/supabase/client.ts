import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  return createBrowserClient(
    'https://mjqqjcubkoilxmelnbxn.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1qcXFqY3Via29pbHhtZWxuYnhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI2NTMyNzAsImV4cCI6MjAyODIyOTI3MH0.eFYDUktj6m3vDznvDJosUNSQOAO-wQCf_MS6WM6MGKM',
  );
}
