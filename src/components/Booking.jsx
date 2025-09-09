import { useState, useEffect } from "react";

function Booking() {
  const [date, setDate] = useState("");
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [name, setName] = useState("");

  // Fetch booked slots when date changes
  useEffect(() => {
    if (date) {
      fetch(`http://localhost:5000/api/calendar/availability?date=${date}`)
        .then(res => res.json())
        .then(data => {
          setSlots(data.bookedSlots || []);
        });
    }
  }, [date]);

  const handleBooking = async () => {
    if (!selectedSlot) return alert("Please choose a slot");
    if (!name) return alert("Please enter your name");

    const res = await fetch("http://localhost:5000/api/calendar/book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        date,
        startTime: selectedSlot.start,
        endTime: selectedSlot.end,
        customerName: name,
      }),
    });

    const data = await res.json();
    if (res.ok) {
      alert("Booking confirmed!");
    } else {
      alert(data.error);
    }
  };

  // Generate example slots (9 AM – 5 PM, every 1 hour)
  const generateSlots = () => {
    if (!date) return [];
    const slots = [];
    for (let hour = 9; hour < 17; hour++) {
      const start = new Date(`${date}T${hour.toString().padStart(2, "0")}:00:00`);
      const end = new Date(start.getTime() + 60 * 60 * 1000);

      const isBooked = slotsData.some(
        (s) => new Date(s.start).getTime() === start.getTime()
      );

      if (!isBooked) {
        slots.push({ start: start.toISOString(), end: end.toISOString() });
      }
    }
    return slots;
  };

  const slotsData = slots || [];
  const availableSlots = generateSlots();

  return (
    <div>
      <h2>Book a Slot</h2>
      <input type="date" value={date} onChange={e => setDate(e.target.value)} />

      <div>
        <h3>Available Slots</h3>
        {availableSlots.length === 0 ? (
          <p>No available slots</p>
        ) : (
          availableSlots.map((slot, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedSlot(slot)}
              style={{
                margin: "5px",
                backgroundColor:
                  selectedSlot?.start === slot.start ? "green" : "lightgray",
              }}
            >
              {new Date(slot.start).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
              {" - "}
              {new Date(slot.end).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </button>
          ))
        )}
      </div>

      <input
        type="text"
        placeholder="Your name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <button onClick={handleBooking}>Book Now</button>
    </div>
  );
}

export default Booking;
