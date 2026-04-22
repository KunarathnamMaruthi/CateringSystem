export default function Home() {
  return (
    <div className="home-container">

      {/*  CENTER TEXT */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1>Eventbite Catering 🍽️</h1>
        <h2>Delicious food for weddings, parties & corporate events</h2>
      </div>    

      {/*  FULL WIDTH IMAGES */}
      <div className="image-flex">
    
        <img src="/food2.webp" alt="food" />
        <img src="/food3.webp" alt="food" />
        <img src="/food4.webp" alt="food" />
      </div>

    </div>
  );
}