import { Link } from "react-router-dom";
import "../App.css";



export default function Home() {

  return (

    <div className="home-container">

      {/* ================= HERO ================= */}

      <div className="hero-section">

        <h1>
          Eventbite Catering 🍽️
        </h1>

        <p>
          Premium catering services for weddings,
          birthdays, corporate events and parties.
        </p>

        <div className="hero-buttons">

          <Link to="/booking">
            <button className="btn-green">
              Book Catering
            </button>
          </Link>

          <Link to="/menu">
            <button className="menu-btn">
              View Menu
            </button>
          </Link>

        </div>

      </div>

      {/* ================= FEATURES ================= */}

      <div className="features-grid">

        <div className="feature-card">
          <h3>🍛 Fresh Food</h3>
          <p>
            Delicious meals prepared
            with fresh ingredients.
          </p>
        </div>

        <div className="feature-card">
          <h3>🚚 Fast Delivery</h3>
          <p>
            On-time delivery for all
            special events.
          </p>
        </div>

        <div className="feature-card">
          <h3>🎉 Event Experts</h3>
          <p>
            Professional catering for
            weddings & parties.
          </p>
        </div>

      </div>

      {/* ================= IMAGE GALLERY ================= */}

      <div className="image-grid">

        <img
          src="/food2.webp"
          alt="Catering Food"
          onError={(e) =>
            (e.target.style.display = "none")
          }
        />

        <img
          src="/food3.webp"
          alt="Wedding Catering"
          onError={(e) =>
            (e.target.style.display = "none")
          }
        />

        <img
          src="/food4.webp"
          alt="Party Catering"
          onError={(e) =>
            (e.target.style.display = "none")
          }
        />

      </div>

    </div>
  );
}