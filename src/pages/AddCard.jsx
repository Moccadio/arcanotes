import { useState } from "react";
import "./AddCard.css";

export default function AddCard({ navigate }) {
  const [arcana, setArcana] = useState("Major");
  const [suit, setSuit] = useState("");
  const [name, setName] = useState("");
  const [upright, setUpright] = useState("");
  const [reversed, setReversed] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);

  // Preview image sebelum upload
  function handleImageChange(e) {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!imageFile) {
      alert("Upload gambar dulu ya.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("arcana", arcana);
    formData.append("suit", arcana === "Minor" ? suit : "");
    formData.append("meaning_upright", upright);
    formData.append("meaning_reversed", reversed);
    formData.append("image", imageFile); 

    const res = await fetch(`${import.meta.env.VITE_API_URL}/cards`, {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      alert("Kartu berhasil ditambahkan!");
      navigate("catalog");
    } else {
      alert("Gagal menambahkan kartu!");
    }
  }

  return (
    <div style={{
      maxWidth: "900px",
      margin: "0 auto",
      padding: "0 20px",
      paddingTop: "100px"
    }}>
      
      <h2 className="page-title">Tambah Kartu Tarot</h2>

      <form onSubmit={handleSubmit} className="form-container">

        {/* Arcana */}
        <label>Arcana:</label>
        <select value={arcana} onChange={(e) => setArcana(e.target.value)}>
          <option value="Major">Major Arcana</option>
          <option value="Minor">Minor Arcana</option>
        </select>

        {/* Suit */}
        {arcana === "Minor" && (
          <>
            <label>Suit:</label>
            <select value={suit} onChange={(e) => setSuit(e.target.value)}>
              <option value="">-- Pilih Suit --</option>
              <option value="Wands">Wands (Api)</option>
              <option value="Cups">Cups (Air)</option>
              <option value="Swords">Swords (Udara)</option>
              <option value="Pentacles">Pentacles (Tanah)</option>
            </select>
          </>
        )}

        {/* Nama */}
        <label>Nama Kartu:</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        {/* Meaning */}
        <label>Meaning Upright:</label>
        <textarea
          rows="3"
          value={upright}
          onChange={(e) => setUpright(e.target.value)}
        />

        <label>Meaning Reversed:</label>
        <textarea
          rows="3"
          value={reversed}
          onChange={(e) => setReversed(e.target.value)}
        />

        {/* Upload Gambar */}
        <label>Upload Gambar Kartu:</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />

        <button type="submit" className="submit-btn" style={{ marginTop: "18px" }}>
          Tambah Kartu
        </button>

      </form>
    </div>
  );
}
