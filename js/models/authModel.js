import supabase from './supabaseClient.js';

export async function login(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
}

export async function cadastrar(email, password) {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    return data;
}

export async function logout() {
    await supabase.auth.signOut();
}

export async function getSession() {
    const { data } = await supabase.auth.getSession();
    return data.session;
}