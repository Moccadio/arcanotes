import { supabase } from "../config/supabaseClient.js";

export const ReadingModel = {
  async create(data) {
    return await supabase.from("readings").insert([data]).select();
  },

  async getAll() {
    return await supabase.from("readings").select("*");
  },

  async getById(id) {
    return await supabase.from("readings").select("*").eq("id", id).single();
  }
};
