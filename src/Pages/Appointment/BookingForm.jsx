import React, { useState } from "react";
import { Container, Form, Button, Modal } from "react-bootstrap";
import emailjs from "@emailjs/browser";

const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    idea: "",
  });

  const [isFocused, setIsFocused] = useState({
    name: false,
    email: false,
    phone: false,
    date: false,
    idea: false,
  });

  const [showModal, setShowModal] = useState(false);

  const isFormValid =
    formData.name && formData.email && formData.phone && formData.date;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFocus = (field) => {
    setIsFocused({ ...isFocused, [field]: true });
  };

  const handleBlur = (field) => {
    setIsFocused({ ...isFocused, [field]: false });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    // EmailJS to client
    // emailjs.send(
    //   "YOUR_SERVICE_ID",
    //   "YOUR_TEMPLATE_ID_CLIENT",
    //   {
    //     to_name: formData.name,
    //     client_email: formData.email,
    //     booking_date: formData.date,
    //     idea: formData.idea,
    //   },
    //   "YOUR_PUBLIC_KEY"
    // );

    // EmailJS to admin
    emailjs.send(
      "service_pumplh6",
      "template_r9qqhg9",
      {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        booking_date: formData.date,
        idea: formData.idea,
      },
      "y2ueaxA8OnxIMywqj"
    );

    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setFormData({ name: "", email: "", phone: "", date: "", idea: "" });
  };

  const styles = {
    container: {
      minHeight: "100vh",
      padding: "2rem",
      background: "#a15757ff",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    form: {
      background: "black",
      padding: "2.5rem",
      borderRadius: "16px",
      color: "#333",
      maxWidth: "500px",
      width: "100%",
      boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
      display: "flex",
      flexDirection: "column",
      gap: "1.5rem",
      position: "relative",
    },
    inputWrapper: { position: "relative", marginBottom: "1.5rem" },
    input: {
      width: "100%",
      padding: "1rem 0.75rem",
      borderRadius: "8px",
      border: "1px solid #ccc",
      outline: "none",
      background: "#fdfdfd",
      fontSize: "1rem",
      color: "#333",
    },
    label: {
      position: "absolute",
      left: "12px",
      top: "14px",
      color: "#777",
      fontSize: "1rem",
      pointerEvents: "none",
      transition: "all 0.3s ease",
    },
    labelActive: {
      top: "-10px",
      fontSize: "0.85rem",
      color: "#ff0057",
      background: "#fff",
      padding: "0 4px",
    },
    button: (enabled) => ({
      padding: "0.9rem",
      borderRadius: "10px",
      border: "none",
      background: enabled ? "#ff0057" : "#ccc",
      color: "#fff",
      cursor: enabled ? "pointer" : "not-allowed",
      fontWeight: "bold",
      fontSize: "1rem",
      transition: "all 0.3s",
      boxShadow: enabled
        ? "0 4px 15px rgba(255,0,87,0.4)"
        : "0 0 0 rgba(0,0,0,0)",
    }),
    modalHeader: {
      background: "#fff",
      color: "#333",
      borderBottom: "1px solid #ddd",
    },
    modalBody: { background: "#fff", color: "#333", textAlign: "center" },
    modalFooter: { background: "#fff", borderTop: "1px solid #ddd" },
  };

  // Function to check if label should float
  const isActive = (field) => formData[field] || isFocused[field];

  return (
    <Container fluid style={styles.container}>
      <Form onSubmit={handleSubmit} style={styles.form}>
        <h3 className="text-center mb-4" style={{ color: "#ff0057" }}>
          Book Your Slot
        </h3>

        {["name", "email", "phone", "date", "idea"].map((field, idx) => (
          <div key={idx} style={styles.inputWrapper}>
            <Form.Label
              htmlFor={field}
              style={{
                ...styles.label,
                ...(isActive(field) ? styles.labelActive : {}),
              }}
            >
              {field === "idea"
                ? "Idea about your tattoo (Optional)"
                : field.charAt(0).toUpperCase() + field.slice(1) + " *"}
            </Form.Label>
            <Form.Control
              id={field}
              type={field === "date" ? "date" : field === "idea" ? "textarea" : "text"}
              name={field}
              value={formData[field]}
              onFocus={() => handleFocus(field)}
              onBlur={() => handleBlur(field)}
              onChange={handleChange}
              required={field !== "idea"}
              style={{
                ...styles.input,
                height: field === "idea" ? "100px" : "auto",
              }}
              min={field === "date" ? new Date().toISOString().split("T")[0] : undefined}
            />
          </div>
        ))}

        <Button
          type="submit"
          disabled={!isFormValid}
          style={styles.button(isFormValid)}
        >
          Book Slot
        </Button>
      </Form>

      {/* Modal Alert */}
      <Modal
        show={showModal}
        onHide={handleClose}
        centered
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton style={styles.modalHeader}>
          <Modal.Title>Booking Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body style={styles.modalBody}>
          Our Employee will call/mail you to confirm the booking on{" "}
          <strong>{formData.date}</strong>.
        </Modal.Body>
        <Modal.Footer style={styles.modalFooter}>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default BookingForm;
