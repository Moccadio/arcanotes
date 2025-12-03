import { supabase } from "../config/supabaseClient.js";

export const CardModel = {
  async getAll() {
    return await supabase.from("cards").select("*").order("number", { ascending: true });
  },

  async getById(id) {
    return await supabase.from("cards").select("*").eq("id", id).single();
  },

  async create(data) {
    return await supabase.from("cards").insert([data]).select();
  }
};
