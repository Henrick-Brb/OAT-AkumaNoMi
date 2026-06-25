import { SUPABASE_URL, SUPABASE_KEY } from '../config.js';
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
export default supabase;