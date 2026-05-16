import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      const token = localStorage.getItem("token");

      //  Protect route
      if (!token) {
        navigate("/login");
        return;
      }

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (err) {
      console.log("PROFILE ERROR:", err);
      localStorage.clear();
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="page-container">
      <div className="card">
        <h2>My Profile</h2>

        {user ? (
          <>
            <p><b>Name:</b> {user.name}</p>
            <p><b>Email:</b> {user.email}</p>

            {/* Optional role display */}
            <p>
              <b>Role:</b> {user.isAdmin ? "Admin" : "User"}
            </p>

            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default Profile;