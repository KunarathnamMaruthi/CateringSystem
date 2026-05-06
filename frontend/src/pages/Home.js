import "../App.css";

export default function Home() {
  return (
    <div className="home-container">

      {/* CENTER TEXT */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1>Eventbite Catering 🍽️</h1>
        <h2>
          Delicious food for weddings, parties & corporate events
        </h2>
      </div>

      {/* IMAGES */}
      <div className="image-flex">

        <img
          src="/food2.webp"
          alt="Delicious catering dish"
          onError={(e) => (e.target.style.display = "none")}
        />

        <img
          src="/food3.webp"
          alt="Catering food setup"
          onError={(e) => (e.target.style.display = "none")}
        />

        <img
          src="/food4.webp"
          alt="Event catering meal"
          onError={(e) => (e.target.style.display = "none")}
        />

      </div>
    </div>
  );
}