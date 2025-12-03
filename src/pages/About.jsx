import "./About.css";

export default function About() {
  return (
    <div className="about-container">

      <div className="about-card">
        <h1 className="about-title">Tentang ArcaNotes</h1>

        <p className="about-subtitle">
          ArcaNotes dibuat sebagai ruang sederhana untuk mempelajari tarot dan menyimpan makna kartu secara ringkas dan mudah diakses.
        </p>

        <h2 className="about-section-title">Profil Pembuat</h2>
        <img
          src="https://siap.undip.ac.id/foto/ktm/2023/21120123140184-9f7885e0-9d7e-4f70-8ca7-37992bf855f0.jpg"
          alt="Foto Profil"
          className="profile-photo"
        />
        <p className="about-text">
          Nama : <b>Muhammad Bintang Al Harits</b><br />  
          NIM : 21120123140184
        </p>
      </div>
    </div>
  );
}
