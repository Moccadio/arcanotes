import { useEffect, useState } from "react";
import { getCards } from "../services/api";
import "./SimulasiTarot.css";

export default function SimulasiTarot() {
  const [cards, setCards] = useState([]);
  const [picked, setPicked] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    getCards().then(setCards);
  }, []);

  function drawCards(count) {
    if (!cards.length) return;

    const shuffled = [...cards].sort(() => Math.random() - 0.5);

    const chosen = shuffled.slice(0, count).map((c) => ({
      ...c,
      reversed: Math.random() < 0.5,
    }));

    setPicked(chosen);
  }

  return (
    <div className="sim-container">
      <h2 className="page-title">Simulasi Tarot Reading</h2>

      {/* === GUIDE SEBELUM KARTU DIAMBIL === */}
      {picked.length === 0 && (
        <div className="sim-guide">
          <h3>Panduan Pembacaan</h3>
          <ul>
            <li><b>Masa Lalu</b> — Akar masalah atau fondasi situasi.</li>
            <li><b>Masa Sekarang</b> — Kondisi yang sedang kamu hadapi.</li>
            <li><b>Masa Depan</b> — Arah atau potensi perkembangan situasi.</li>
          </ul>
          <p>Pilih jumlah kartu untuk memulai pembacaan.</p>
        </div>
      )}

      <div className="sim-buttons">
        <button onClick={() => drawCards(1)}>Tarik 1 Kartu</button>
        <button onClick={() => drawCards(3)}>Tarik 3 Kartu</button>
      </div>

      <div className="sim-card-grid">
        {picked.map((card) => (
          <div
            key={card.id}
            className={`sim-card ${card.reversed ? "reversed" : ""}`}
            onClick={() => setSelectedCard(card)}
          >
            <img src={card.image_url} alt={card.name} />
            <p>{card.reversed ? `${card.name} (Reversed)` : card.name}</p>
          </div>
        ))}
      </div>

      {/* POPUP DETAIL */}
      {selectedCard && (
        <div className="popup-overlay" onClick={() => setSelectedCard(null)}>
          <div className="popup-card" onClick={(e) => e.stopPropagation()}>
            <img src={selectedCard.image_url} alt={selectedCard.name} />
            <h3>
              {selectedCard.name} {selectedCard.reversed && "(Reversed)"}
            </h3>

            <p>
              <b>Arcana:</b> {selectedCard.arcana}
            </p>
            {selectedCard.suit && (
              <p>
                <b>Suit:</b> {selectedCard.suit}
              </p>
            )}

            <h4>Meaning</h4>
            <p>
              {selectedCard.reversed
                ? selectedCard.meaning_reversed
                : selectedCard.meaning_upright}
            </p>

            <button className="close-btn" onClick={() => setSelectedCard(null)}>
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
