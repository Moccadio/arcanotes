import { useEffect, useState } from "react";
import { getCards } from "../services/api";
import "./CardCatalog.css";

export default function CardCatalog() {
  const [cards, setCards] = useState([]);
  const [search, setSearch] = useState("");

  // state untuk popup
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    getCards().then(setCards);
  }, []);

  const filteredCards = cards.filter(card =>
    card.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="catalog-container">
      <h2 className="page-title">Katalog Kartu Tarot</h2>

      {/* Search bar */}
      <div className="search-wrapper">
        <input
          className="search-bar"
          type="text"
          placeholder="Cari kartu tarot..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Grid kartu */}
      <div className="card-grid">
        {filteredCards.map(card => (
          <div
            className="card-item"
            key={card.id}
            onClick={() => setSelectedCard(card)} 
          >
            <img src={card.image_url} alt={card.name} />
            <p>{card.name}</p>
          </div>
        ))}

        {filteredCards.length === 0 && (
          <p style={{ marginTop: "20px", color: "#ccc" }}>
            uhm… kartu tidak ditemukan…
          </p>
        )}
      </div>

      {/* ======================= */}
      {/*        POPUP MODAL      */}
      {/* ======================= */}
      {selectedCard && (
        <div className="popup-overlay" onClick={() => setSelectedCard(null)}>
          <div className="popup-card" onClick={(e) => e.stopPropagation()}>
            <img src={selectedCard.image_url} alt={selectedCard.name} />
            <h3>{selectedCard.name}</h3>

            <p><b>Arcana:</b> {selectedCard.arcana}</p>
            {selectedCard.suit && (
              <p><b>Suit:</b> {selectedCard.suit}</p>
            )}

            <h4>Meaning (Upright)</h4>
            <p>{selectedCard.meaning_upright}</p>

            <h4>Meaning (Reversed)</h4>
            <p>{selectedCard.meaning_reversed}</p>

            <button className="close-btn" onClick={() => setSelectedCard(null)}>
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
