import { CardModel } from "../models/cardModel.js";
import { supabase } from "../config/supabaseClient.js";
import { v4 as uuidv4 } from "uuid";

export const CardController = {
  async getAll(req, res) {
    const { data, error } = await CardModel.getAll();
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
  },

  async getById(req, res) {
    const { id } = req.params;
    const { data, error } = await CardModel.getById(id);

    if (error || !data) {
      return res.status(404).json({ error: "Card not found" });
    }

    res.json(data);
  },

  // ======================================================
  // CREATE CARD (versi baru: support upload gambar)
  // ======================================================
  async create(req, res) {
    try {
      const {
        name,
        arcana,
        suit,
        number,
        meaning_upright,
        meaning_reversed
      } = req.body;

      if (!name || !arcana) {
        return res.status(400).json({ error: "Name and arcana are required" });
      }

      // Ambil file dari multer
      const imageFile = req.file;

      if (!imageFile) {
        return res.status(400).json({ error: "Gambar wajib diupload." });
      }

      // Buat nama file unik
      const fileExt = imageFile.originalname.split(".").pop();
      const fileName = `${uuidv4()}.${fileExt}`;

      // Upload ke Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from("card-images")
        .upload(fileName, imageFile.buffer, {
          contentType: imageFile.mimetype,
        });

      if (uploadError) {
        console.error(uploadError);
        return res.status(500).json({ error: "Upload gambar gagal." });
      }

      // Ambil public URL
      const { data: urlData } = supabase.storage
        .from("card-images")
        .getPublicUrl(fileName);

      const cardData = {
        name,
        arcana,
        suit: arcana === "Minor" ? suit : null,
        number: number ?? null,
        meaning_upright,
        meaning_reversed,
        image_url: urlData.publicUrl, // ← URL gambar dari Supabase
      };

      const { data, error } = await CardModel.create(cardData);

      if (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
      }

      res.json({ message: "Card created", card: data[0] });

    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error saat menambah kartu." });
    }
  }
};
