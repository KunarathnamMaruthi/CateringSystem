import { useEffect, useState } from "react";
import axios from "axios";

function MenuPage() {
  const [menus, setMenus] = useState([]);

  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    image: null,
  });

  // Fetch menus
  const fetchMenus = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/menus");
      setMenus(res.data);
    } catch (error) {
      console.log(error);
      alert("Failed to load menus");
    }
  };

  useEffect(() => {
    fetchMenus();
  }, []);

  // Handle text input
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Add menu
  const addMenu = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("category", form.category);
      formData.append("price", form.price);
      formData.append("description", form.description);

      if (form.image) {
        formData.append("image", form.image);
      }

      await axios.post(
        "http://localhost:5000/api/menus",
        formData
      );

      setForm({
        name: "",
        category: "",
        price: "",
        description: "",
        image: null,
      });

      fetchMenus();

      alert("Food menu added successfully!");
    } catch (error) {
      console.log(error);
      alert("Failed to add menu");
    }
  };

  // Delete menu
  const deleteMenu = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/menus/${id}`
      );

      fetchMenus();
    } catch (error) {
      console.log(error);
      alert("Failed to delete menu");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>
        Catering Food Menu
      </h1>

      {/* Add Menu Form */}
      <form onSubmit={addMenu} style={styles.form}>
        {/* Food Name */}
        <input
          type="text"
          name="name"
          placeholder="Food Name"
          value={form.name}
          onChange={handleChange}
          style={styles.input}
          required
        />

        {/* Category */}
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          style={styles.input}
          required
        >
          <option value="">
            Select Catering Category
          </option>

          <option value="Wedding Catering">
            Wedding Catering
          </option>

          <option value="Corporate Catering">
            Corporate Catering
          </option>

          <option value="Social Events Catering">
            Social Events Catering
          </option>

          <option value="Private Parties Catering">
            Private Parties Catering
          </option>

          <option value="Cocktail and Reception Catering">
            Cocktail and Reception Catering
          </option>

          <option value="Drop and Go Catering">
            Drop and Go Catering
          </option>

          <option value="Outdoor and Barbeque Catering">
            Outdoor and Barbeque Catering
          </option>
        </select>

        {/* Price */}
        <div style={styles.priceContainer}>
          <span style={styles.dollar}>$</span>

          <input
            type="number"
            name="price"
            placeholder="0.00"
            value={form.price}
            onChange={handleChange}
            style={styles.priceInput}
            required
          />
        </div>

        {/* Description */}
        <textarea
          name="description"
          placeholder="Food Description"
          value={form.description}
          onChange={handleChange}
          style={styles.textarea}
        />

        {/* Upload Image */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setForm({
              ...form,
              image: e.target.files[0],
            })
          }
          style={styles.input}
        />

        {/* Submit Button */}
        <button type="submit" style={styles.button}>
          Add Food Menu
        </button>
      </form>

      {/* Menu Cards */}
      <div style={styles.grid}>
        {menus.map((menu) => (
          <div key={menu._id} style={styles.card}>
            {menu.imageUrl && (
              <img
                src={menu.imageUrl}
                alt={menu.name}
                style={styles.image}
              />
            )}

            <h2>{menu.name}</h2>

            <p>
              <strong>Category:</strong>{" "}
              {menu.category}
            </p>

            <p>
              <strong>Price:</strong> $
              {menu.price}
            </p>

            <p>{menu.description}</p>

            <button
              onClick={() =>
                deleteMenu(menu._id)
              }
              style={styles.deleteButton}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    padding: "30px",
    background: "#f4f4f4",
    fontFamily: "Arial",
  },

  title: {
    textAlign: "center",
    color: "#ff7a00",
    marginBottom: "30px",
  },

  form: {
    maxWidth: "500px",
    margin: "0 auto",
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow:
      "0 2px 10px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },

  input: {
    padding: "12px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },

  textarea: {
    padding: "12px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
    minHeight: "100px",
  },

  button: {
    padding: "12px",
    background: "#ff7a00",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
  },

  grid: {
    marginTop: "40px",
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
  },

  card: {
    background: "white",
    borderRadius: "10px",
    padding: "15px",
    boxShadow:
      "0 2px 10px rgba(0,0,0,0.1)",
  },

  image: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: "10px",
    marginBottom: "10px",
  },

  deleteButton: {
    marginTop: "10px",
    padding: "10px",
    background: "red",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    width: "100%",
  },

  // Price Styles
  priceContainer: {
    display: "flex",
    alignItems: "center",
    border: "1px solid #ccc",
    borderRadius: "5px",
    background: "white",
  },

  dollar: {
    padding: "12px",
    fontSize: "18px",
    fontWeight: "bold",
    color: "#555",
  },

  priceInput: {
    flex: 1,
    padding: "12px",
    border: "none",
    outline: "none",
    fontSize: "16px",
  },
};

export default MenuPage;