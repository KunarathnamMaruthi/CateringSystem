import {
  useEffect,
  useState,
} from "react";

import API from "../api/api";

import "./Admin.css";

export default function Admin() {

  // ================= STATES =================

  const [search, setSearch] =
    useState("");

  const [bookings, setBookings] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [editingId,
    setEditingId] =
    useState(null);

  const [editData,
    setEditData] =
    useState({
      name: "",
      email: "",
      guests: "",
    });

  // ================= MENU STATES =================

  const [showMenuForm,
    setShowMenuForm] =
    useState(false);

  const [menuData,
    setMenuData] =
    useState({

      name: "",

      category: "",

      price: "",

      offer: "",

      description: "",

      image: "",
    });

  // ================= ADMIN PROTECT =================

  useEffect(() => {

    const token =
      localStorage.getItem(
        "token"
      );

    const user =
      JSON.parse(
        localStorage.getItem(
          "user"
        )
      );

    if (!token) {

      window.location.href =
        "/login";

      return;
    }

    if (
      !user ||
      !user.isAdmin
    ) {

      alert(
        "Access Denied"
      );

      window.location.href =
        "/";

      return;
    }

  }, []);

  // ================= FETCH BOOKINGS =================

  const fetchBookings =
    async () => {

      try {

        setLoading(true);

        const res =
          await API.get(
            "/bookings"
          );

        setBookings(

          Array.isArray(
            res.data.bookings
          )

            ? res.data.bookings

            : []
        );

      } catch (err) {

        console.log(err);

        setBookings([]);

      } finally {

        setLoading(false);
      }
    };

  useEffect(() => {

    fetchBookings();

  }, []);

  // ================= ADD MENU =================

  const addMenu = async () => {

    try {

      const formData =
        new FormData();

      formData.append(
        "name",
        menuData.name
      );

      formData.append(
        "category",
        menuData.category
      );

      formData.append(
        "price",
        menuData.price
      );

      formData.append(
        "offer",
        menuData.offer
      );

      formData.append(
        "description",
        menuData.description
      );

      formData.append(
        "image",
        menuData.image
      );

      await API.post(
        "/menu",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      alert(
        "Menu Added Successfully"
      );

      setMenuData({

        name: "",

        category: "",

        price: "",

        offer: "",

        description: "",

        image: "",
      });

      setShowMenuForm(
        false
      );

    } catch (error) {

      console.log(error);

      alert(
        "Failed To Add Menu"
      );
    }
  };

  // ================= UPDATE STATUS =================

  const updateStatus =
    async (
      id,
      status
    ) => {

      try {

        await API.put(

          `/bookings/${id}`,

          { status }
        );

        fetchBookings();

      } catch (err) {

        alert(
          "Update failed"
        );
      }
    };

  // ================= DELETE =================

  const deleteBooking =
    async (id) => {

      const confirmDelete =
        window.confirm(
          "Delete booking?"
        );

      if (
        !confirmDelete
      ) {
        return;
      }

      try {

        await API.delete(
          `/bookings/${id}`
        );

        fetchBookings();

      } catch (err) {

        alert(
          "Delete failed"
        );
      }
    };

  // ================= EDIT =================

  const editBooking =
    (booking) => {

      setEditingId(
        booking._id
      );

      setEditData({

        name:
          booking.name,

        email:
          booking.email,

        guests:
          booking.guests,
      });
    };

  // ================= SAVE EDIT =================

  const saveEdit =
    async (id) => {

      try {

        await API.put(

          `/bookings/${id}`,

          editData
        );

        setEditingId(
          null
        );

        fetchBookings();

      } catch (err) {

        alert(
          "Update failed"
        );
      }
    };

  // ================= FILTER =================

  const filteredBookings =

    Array.isArray(bookings)

      ? bookings.filter(
          (b) =>

            (
              (b.name || "") +

              (b.email || "")
            )

              .toLowerCase()

              .includes(
                search.toLowerCase()
              )
        )

      : [];

  // ================= COUNTS =================

  const approvedCount =

    bookings.filter(
      (b) =>
        b.status ===
        "approved"
    ).length;

  const pendingCount =

    bookings.filter(
      (b) =>
        b.status ===
        "pending"
    ).length;

  const cancelledCount =

    bookings.filter(
      (b) =>
        b.status ===
        "cancelled"
    ).length;

  // ================= RETURN =================

  return (

    <div className="admin-page">

      <div className="admin-container">

        {/* HEADER */}

        <div className="admin-header">

          <div className="admin-top">

            <div>

              <h1 className="admin-title">
                Admin Dashboard
              </h1>

              <p className="admin-subtitle">
                Catering Management System
              </p>

            </div>

            <div className="admin-profile">

              <button
                className="add-menu-btn"
                onClick={() =>
                  setShowMenuForm(
                    !showMenuForm
                  )
                }
              >

                + Add Menu

              </button>

              <div className="admin-avatar">
                Admin
              </div>

            </div>

          </div>

          {/* SEARCH */}

          <input
            type="text"
            placeholder="Search bookings..."
            className="search-input"
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
          />

        </div>

        {/* ================= MENU FORM ================= */}

        {showMenuForm && (

          <div className="menu-form-card">

            <h2>
              Add New Menu
            </h2>

            <input
              type="text"
              placeholder="Menu Name"
              value={menuData.name}
              onChange={(e)=>
                setMenuData({
                  ...menuData,
                  name:
                    e.target.value,
                })
              }
            />

            <select
              value={
                menuData.category
              }
              onChange={(e)=>
                setMenuData({
                  ...menuData,
                  category:
                    e.target.value,
                })
              }
            >

              <option value="">
                Select Category
              </option>

              <option value="Wedding">
                Wedding
              </option>

              <option value="Birthday">
                Birthday
              </option>

              <option value="Corporate">
                Corporate
              </option>

              <option value="Private">
                Private
              </option>

            </select>

            <input
              type="number"
              placeholder="Price"
              value={menuData.price}
              onChange={(e)=>
                setMenuData({
                  ...menuData,
                  price:
                    e.target.value,
                })
              }
            />

            <input
              type="text"
              placeholder="Offer"
              value={menuData.offer}
              onChange={(e)=>
                setMenuData({
                  ...menuData,
                  offer:
                    e.target.value,
                })
              }
            />

            <textarea
              placeholder="Description"
              value={
                menuData.description
              }
              onChange={(e)=>
                setMenuData({
                  ...menuData,
                  description:
                    e.target.value,
                })
              }
            />

            {/* IMAGE INPUT */}

            <input
              type="file"
              accept="image/*"
              onChange={(e)=>
                setMenuData({
                  ...menuData,
                  image:
                    e.target.files[0],
                })
              }
            />

            {/* IMAGE PREVIEW */}

            {menuData.image && (

              <img
                src={URL.createObjectURL(menuData.image)}
                alt="preview"
                style={{
                  width: "220px",
                  height: "160px",
                  objectFit: "cover",
                  borderRadius: "12px",
                  marginTop: "10px",
                }}
              />

            )}

            <button
              className="save-menu-btn"
              onClick={addMenu}
            >

              Save Menu

            </button>

          </div>

        )}

        {/* ================= STATS ================= */}

        <div className="stats-grid">

          <div className="stat-card total">

            <h3>Total</h3>

            <p>
              {bookings.length}
            </p>

          </div>

          <div className="stat-card approved">

            <h3>Approved</h3>

            <p>
              {approvedCount}
            </p>

          </div>

          <div className="stat-card pending">

            <h3>Pending</h3>

            <p>
              {pendingCount}
            </p>

          </div>

          <div className="stat-card cancelled">

            <h3>Cancelled</h3>

            <p>
              {cancelledCount}
            </p>

          </div>

        </div>

        {/* ================= BOOKINGS TABLE ================= */}

        <div className="booking-section">

          <h2 className="section-title">
            Booking Management
          </h2>

          <div className="table-container">

            <table>

              <thead>

                <tr>

                  <th>Name</th>

                  <th>Email</th>

                  <th>Guests</th>

                  <th>Date</th>

                  <th>Status</th>

                  <th>Actions</th>

                </tr>

              </thead>

              <tbody>

                {loading ? (

                  <tr>

                    <td colSpan="6">
                      Loading...
                    </td>

                  </tr>

                ) : filteredBookings.length >
                  0 ? (

                  filteredBookings.map(
                    (b) => (

                      <tr key={b._id}>

                        <td>

                          {editingId ===
                          b._id ? (

                            <input
                              value={
                                editData.name
                              }
                              onChange={(e)=>
                                setEditData({
                                  ...editData,
                                  name:
                                    e.target.value,
                                })
                              }
                            />

                          ) : (
                            b.name
                          )}

                        </td>

                        <td>

                          {editingId ===
                          b._id ? (

                            <input
                              value={
                                editData.email
                              }
                              onChange={(e)=>
                                setEditData({
                                  ...editData,
                                  email:
                                    e.target.value,
                                })
                              }
                            />

                          ) : (
                            b.email
                          )}

                        </td>

                        <td>

                          {editingId ===
                          b._id ? (

                            <input
                              value={
                                editData.guests
                              }
                              onChange={(e)=>
                                setEditData({
                                  ...editData,
                                  guests:
                                    e.target.value,
                                })
                              }
                            />

                          ) : (
                            b.guests
                          )}

                        </td>

                        <td>

                          {b.eventDate

                            ? new Date(
                                b.eventDate
                              ).toLocaleDateString(
                                "en-AU"
                              )

                            : "-"}

                        </td>

                        <td>

                          <span
                            className={`status-badge ${b.status}`}
                          >

                            {b.status}

                          </span>

                        </td>

                        <td>

                          <div className="action-buttons">

                            <button
                              className="approve-btn"
                              onClick={() =>
                                updateStatus(
                                  b._id,
                                  "approved"
                                )
                              }
                            >
                              Approve
                            </button>

                            <button
                              className="cancel-btn"
                              onClick={() =>
                                updateStatus(
                                  b._id,
                                  "cancelled"
                                )
                              }
                            >
                              Cancel
                            </button>

                            {editingId ===
                            b._id ? (

                              <button
                                className="edit-btn"
                                onClick={() =>
                                  saveEdit(
                                    b._id
                                  )
                                }
                              >
                                Save
                              </button>

                            ) : (

                              <button
                                className="edit-btn"
                                onClick={() =>
                                  editBooking(
                                    b
                                  )
                                }
                              >
                                Edit
                              </button>

                            )}

                            <button
                              className="delete-btn"
                              onClick={() =>
                                deleteBooking(
                                  b._id
                                )
                              }
                            >
                              Delete
                            </button>

                          </div>

                        </td>

                      </tr>
                    )
                  )

                ) : (

                  <tr>

                    <td
                      colSpan="6"
                      style={{
                        textAlign:
                          "center",
                      }}
                    >

                      No bookings found

                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
}