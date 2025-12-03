export default function CardItem({ card, onClick }) {
  return (
    <div
      style={{
        padding: 10,
        background: "#2e2e2e",
        borderRadius: 8,
        cursor: "pointer",
        textAlign: "center"
      }}
      onClick={onClick}
    >
      <img
        src={card.image_url}
        alt={card.name}
        style={{ width: "100%", borderRadius: 6 }}
      />
      <p style={{ marginTop: 8 }}>{card.name}</p>
    </div>
  );
}
