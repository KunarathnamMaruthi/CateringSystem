import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  useNavigate,
} from "react-router-dom";

import "./MenuPage.css";

export default function MenuPage() {

  const [menus, setMenus] =
    useState([]);

  const [selectedCategory,
    setSelectedCategory] =
    useState("All");

  const navigate =
    useNavigate();

  useEffect(() => {
    fetchMenus();
  }, []);

  // FETCH MENUS

  const fetchMenus = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/menu"
      );

      console.log(res.data);

      if (
        Array.isArray(res.data)
      ) {

        setMenus(res.data);

      } else if (
        Array.isArray(
          res.data.menus
        )
      ) {

        setMenus(
          res.data.menus
        );

      } else {

        setMenus([]);

      }

    } catch (error) {

      console.log(error);

      setMenus([]);

    }
  };

  // FILTER MENUS

  const filteredMenus =
    selectedCategory === "All"
      ? menus
      : menus.filter(
          (item) =>
            item.category ===
            selectedCategory
        );

  return (

    <div className="menu-page">

      {/* TOP SECTION */}

      <div className="top-section">

        <h1 className="menu-title">
          Catering Menu
        </h1>

        {/* FILTER */}

        <div className="filter-container">

          <select
            className="filter-select"
            value={
              selectedCategory
            }
            onChange={(e) =>
              setSelectedCategory(
                e.target.value
              )
            }
          >

            <option value="All">
              All Categories
            </option>

            <option value="Wedding">
              Wedding Catering
            </option>

            <option value="Birthday">
              Birthday Party
            </option>

            <option value="Corporate">
              Corporate Event
            </option>

            <option value="Private">
              Private Event
            </option>

          </select>

        </div>

      </div>

      {/* MENU GRID */}

      <div className="menu-grid">

        {filteredMenus.length > 0 ? (

          filteredMenus.map(
            (item) => (

            <div
              key={item._id}
              className="menu-card"
            >

              {/* IMAGE */}

              <img
                src={
                  item.image
                    ? `http://localhost:5000/uploads/${item.image}`
                    : "https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
                }
                alt={item.name}
                className="menu-image"
              />

              {/* CONTENT */}

              <div className="menu-content">

                {/* NAME */}

                <h2 className="menu-name">
                  {item.name}
                </h2>

                {/* CATEGORY */}

                <p className="menu-category">
                  {item.category}
                </p>

                {/* DESCRIPTION */}

                <p className="menu-description">
                  {item.description}
                </p>

                {/* PRICE */}

                <h3 className="menu-price">
                  ${item.price}
                </h3>

                {/* OFFER */}

                {item.offer && (

                  <p className="menu-offer">

                     {item.offer}

                  </p>

                )}

                {/* ORDER BUTTON */}

                <button
                  className="order-btn"
                  onClick={() =>
                    navigate(
                      "/booking",
                      {
                        state: {
                          menuName:
                            item.name,

                          category:
                            item.category,

                          price:
                            item.price,

                          image:
                            item.image,
                        },
                      }
                    )
                  }
                >

                  Order Now

                </button>

              </div>

            </div>

          ))

        ) : (

          <h2 className="no-menu">

            No Menu Items Found

          </h2>

        )}

      </div>

    </div>
  );
}