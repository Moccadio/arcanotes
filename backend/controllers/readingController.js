import { CardModel } from "../models/cardModel.js";

export const ReadingController = {
  async getAll(req, res) {
    // Placeholder for getting all readings if we were storing them
    res.json({ message: "Get all readings not implemented yet" });
  },

  async getById(req, res) {
    // Placeholder for getting a specific reading
    res.json({ message: "Get reading by ID not implemented yet" });
  },

  async simulate(req, res) {
    try {
      const { method } = req.body; // e.g., "past-present-future", "celtic-cross"
      
      // Fetch all cards to pick random ones
      const { data: allCards, error } = await CardModel.getAll();
      
      if (error) {
        return res.status(500).json({ error: "Failed to fetch cards for simulation" });
      }

      if (!allCards || allCards.length === 0) {
        return res.status(404).json({ error: "No cards available for reading" });
      }

      // Simple logic: pick 3 random cards for now (or based on method)
      // For "past-present-future", we need 3 cards.
      const numCards = method === "celtic-cross" ? 10 : 3;
      
      const shuffled = [...allCards].sort(() => 0.5 - Math.random());
      const selectedCards = shuffled.slice(0, numCards);

      res.json(selectedCards);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error during simulation" });
    }
  }
};
