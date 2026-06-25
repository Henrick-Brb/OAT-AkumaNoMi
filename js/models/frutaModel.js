import supabase from './supabaseClient.js';

export async function listarFrutas() {
    const { data, error } = await supabase.from('frutas').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    return data;
}

export async function salvarFruta(fruta, id = null) {
    if (id) {
        const { data, error } = await supabase.from('frutas').update(fruta).eq('id', id).select();
        if (error) throw error;
        return data[0];
    } else {
        const { data, error } = await supabase.from('frutas').insert([fruta]).select();
        if (error) throw error;
        return data[0];
    }
}

export async function excluirFruta(id) {
    const { error } = await supabase.from('frutas').delete().eq('id', id);
    if (error) throw error;
}