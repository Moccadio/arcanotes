import { useEffect, useState } from "react";
import { getCards } from "../services/api";
import "./Home.css";

export default function Home({ navigate }) {
  const [cards, setCards] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    getCards().then(res => {
      if (!res) return;
      const shuffle = [...res].sort(() => Math.random() - 0.5);
      setCards(shuffle.slice(0, 3)); // 🔥 hanya 3 kartu harian
    });
  }, []);

  const next = () => setIndex(i => (i + 1) % 3);        // 🔥 loop hanya 3 kartu
  const prev = () => setIndex(i => (i - 1 + 3) % 3);

  return (
    <div className="home-carousel-container">

      <h2 className="carousel-title">🔮 Tarot Harian</h2>
      <p className="carousel-subtitle">Geser untuk melihat kartu lainnya</p>

      {cards.length === 3 && (
        <div className="carousel-body">

          <button className="carousel-btn left" onClick={prev}>❮</button>

          <div className="carousel-card">
            <img src={cards[index].image_url} alt={cards[index].name}/>
            <h3>{cards[index].name}</h3>

            <p><b>Arcana:</b> {cards[index].arcana}</p>
            {cards[index].suit && <p><b>Suit:</b> {cards[index].suit}</p>}

            <div className="meaning">
              <h4>Upright</h4>
              <p>{cards[index].meaning_upright}</p>

              <h4>Reversed</h4>
              <p>{cards[index].meaning_reversed}</p>
            </div>
          </div>

          <button className="carousel-btn right" onClick={next}>❯</button>
        </div>
      )}

      <button className="read-again" onClick={() => navigate("reading")}>
        Baca Ramalan lagi
      </button>
    </div>
  );
}
