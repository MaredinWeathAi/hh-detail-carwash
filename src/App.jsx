import { useState, useEffect, useRef } from "react";

const SERVICES = [
  { id: 1, name: "Signature Wash", duration: "45 min", price: 39, description: "Full exterior wash, wheel clean, streak-free dry" },
  { id: 2, name: "Interior Detail", duration: "90 min", price: 89, description: "Deep vacuum, wipe-down, leather condition, glass clean" },
  { id: 3, name: "Full Detail", duration: "3 hrs", price: 159, description: "Complete exterior + interior — showroom finish" },
  { id: 4, name: "Paint Correction", duration: "5 hrs", price: 349, description: "Single-stage machine polish, swirl removal, gloss restore" },
  { id: 5, name: "Ceramic Coat", duration: "8 hrs", price: 699, description: "9H nano-ceramic protection, 2-year warranty" },
  { id: 6, name: "Express Detail", duration: "30 min", price: 24, description: "Quick exterior rinse, window wipe, tire shine" },
];

const TIME_SLOTS = ["8:00 AM","9:00 AM","10:00 AM","11:00 AM","12:00 PM","1:00 PM","2:00 PM","3:00 PM","4:00 PM","5:00 PM"];

const MOCK_BOOKINGS = [
  { id: 1, name: "Carlos Mendez", service: "Full Detail", date: "2026-03-05", time: "10:00 AM", amount: 159, status: "confirmed" },
  { id: 2, name: "Sarah Johnson", service: "Ceramic Coat", date: "2026-03-05", time: "8:00 AM", amount: 699, status: "in-progress" },
  { id: 3, name: "Mike Torres", service: "Signature Wash", date: "2026-03-06", time: "2:00 PM", amount: 39, status: "confirmed" },
  { id: 4, name: "Ana Rivera", service: "Interior Detail", date: "2026-03-04", time: "11:00 AM", amount: 89, status: "completed" },
  { id: 5, name: "James Wu", service: "Paint Correction", date: "2026-03-03", time: "9:00 AM", amount: 349, status: "completed" },
  { id: 6, name: "Lisa Park", service: "Express Detail", date: "2026-03-03", time: "4:00 PM", amount: 24, status: "completed" },
];

const statusColor = { confirmed: "#0a84ff", "in-progress": "#ff9f0a", completed: "#30d158" };

export default function App() {
  const [view, setView] = useState("home");
  const [selectedService, setSelectedService] = useState(null);
  const [bookingStep, setBookingStep] = useState(1);
  const [bookingData, setBookingData] = useState({ name: "", email: "", phone: "", date: "", time: "", vehicle: "" });
  const [bookings, setBookings] = useState(MOCK_BOOKINGS);
  const [paymentDone, setPaymentDone] = useState(false);
  const [cardData, setCardData] = useState({ number: "", expiry: "", cvv: "", name: "" });
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => { setTimeout(() => setHeroVisible(true), 100); }, []);

  const totalRevenue = bookings.filter(b => b.status === "completed").reduce((s, b) => s + b.amount, 0);
  const pendingRevenue = bookings.filter(b => b.status !== "completed").reduce((s, b) => s + b.amount, 0);

  const handleBook = () => {
    const newBooking = {
      id: bookings.length + 1,
      name: bookingData.name,
      service: selectedService.name,
      date: bookingData.date,
      time: bookingData.time,
      amount: selectedService.price,
      status: "confirmed",
    };
    setBookings([newBooking, ...bookings]);
    setBookingStep(4);
  };

  const styles = {
    root: { fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif", background: "#fff", color: "#000", minHeight: "100vh", overflowX: "hidden" },
    nav: { position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: "rgba(255,255,255,0.85)", backdropFilter: "blur(20px)", borderBottom: "1px solid #e5e5e5", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 40px", height: 52 },
    navLogo: { fontSize: 14, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", color: "#000" },
    navLinks: { display: "flex", gap: 32, listStyle: "none", margin: 0, padding: 0 },
    navLink: (active) => ({ fontSize: 13, color: active ? "#000" : "#666", cursor: "pointer", fontWeight: active ? 600 : 400, transition: "color 0.2s", background: "none", border: "none", padding: 0 }),
    navCta: { background: "#000", color: "#fff", border: "none", borderRadius: 20, padding: "8px 20px", fontSize: 13, fontWeight: 500, cursor: "pointer" },
    page: { paddingTop: 52 },
    hero: { minHeight: "92vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "80px 20px", background: "#fff", position: "relative", overflow: "hidden" },
    heroEyebrow: { fontSize: 12, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "#888", marginBottom: 24, opacity: heroVisible ? 1 : 0, transform: heroVisible ? "none" : "translateY(10px)", transition: "all 0.6s ease" },
    heroTitle: { fontSize: "clamp(52px, 8vw, 96px)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.03em", marginBottom: 24, opacity: heroVisible ? 1 : 0, transform: heroVisible ? "none" : "translateY(20px)", transition: "all 0.7s ease 0.1s" },
    heroSub: { fontSize: "clamp(17px, 2vw, 21px)", color: "#555", maxWidth: 520, margin: "0 auto 48px", lineHeight: 1.5, fontWeight: 300, opacity: heroVisible ? 1 : 0, transition: "all 0.7s ease 0.2s" },
    heroBtns: { display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center", opacity: heroVisible ? 1 : 0, transition: "all 0.7s ease 0.3s" },
    btnPrimary: { background: "#000", color: "#fff", border: "none", borderRadius: 28, padding: "16px 36px", fontSize: 16, fontWeight: 500, cursor: "pointer", transition: "transform 0.15s, box-shadow 0.15s" },
    btnSecondary: { background: "transparent", color: "#000", border: "1.5px solid #000", borderRadius: 28, padding: "16px 36px", fontSize: 16, fontWeight: 500, cursor: "pointer" },
    section: { padding: "100px 40px", maxWidth: 1100, margin: "0 auto" },
    sectionLabel: { fontSize: 12, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "#888", marginBottom: 16 },
    sectionTitle: { fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 700, letterSpacing: "-0.025em", marginBottom: 16 },
    sectionSub: { fontSize: 17, color: "#555", maxWidth: 480, lineHeight: 1.6 },
    serviceGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 2, marginTop: 48 },
    serviceCard: (sel) => ({ background: sel ? "#000" : "#f5f5f5", color: sel ? "#fff" : "#000", borderRadius: 18, padding: "32px", cursor: "pointer", transition: "all 0.2s", position: "relative", overflow: "hidden" }),
    serviceName: { fontSize: 20, fontWeight: 600, marginBottom: 8 },
    serviceDesc: { fontSize: 14, opacity: 0.7, lineHeight: 1.5, marginBottom: 24 },
    serviceFooter: { display: "flex", justifyContent: "space-between", alignItems: "center" },
    servicePrice: { fontSize: 28, fontWeight: 700 },
    serviceDur: { fontSize: 13, opacity: 0.6 },
    divider: { height: 1, background: "#e5e5e5", margin: "0 40px" },
    statsRow: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2, marginTop: 48 },
    statCard: { background: "#f5f5f5", borderRadius: 18, padding: "40px 32px" },
    statNum: { fontSize: 48, fontWeight: 700, letterSpacing: "-0.03em" },
    statLabel: { fontSize: 14, color: "#888", marginTop: 8 },
    table: { width: "100%", borderCollapse: "collapse", marginTop: 32 },
    th: { textAlign: "left", fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#888", padding: "12px 16px", borderBottom: "1px solid #e5e5e5" },
    td: { padding: "16px 16px", borderBottom: "1px solid #f0f0f0", fontSize: 14 },
    badge: (s) => ({ display: "inline-block", background: statusColor[s] + "18", color: statusColor[s], borderRadius: 20, padding: "4px 12px", fontSize: 12, fontWeight: 600 }),
    modal: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 },
    modalBox: { background: "#fff", borderRadius: 24, padding: 48, width: "100%", maxWidth: 520, position: "relative" },
    input: { width: "100%", border: "1.5px solid #e5e5e5", borderRadius: 12, padding: "14px 16px", fontSize: 16, outline: "none", boxSizing: "border-box", marginBottom: 12, fontFamily: "inherit", transition: "border-color 0.2s" },
    stepTitle: { fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 8 },
    stepSub: { fontSize: 15, color: "#666", marginBottom: 32 },
    backBtn: { background: "none", border: "none", cursor: "pointer", fontSize: 14, color: "#888", marginBottom: 24, padding: 0 },
    progressBar: { display: "flex", gap: 6, marginBottom: 36 },
    progressDot: (active, done) => ({ flex: 1, height: 3, borderRadius: 2, background: done ? "#000" : active ? "#000" : "#e5e5e5", transition: "background 0.3s" }),
    successIcon: { width: 64, height: 64, background: "#000", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", fontSize: 28 },
    timeGrid: { display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 8, marginBottom: 24 },
    timeBtn: (sel) => ({ padding: "12px 4px", border: sel ? "2px solid #000" : "1.5px solid #e5e5e5", borderRadius: 10, background: sel ? "#000" : "#fff", color: sel ? "#fff" : "#000", fontSize: 13, cursor: "pointer", fontFamily: "inherit" }),
  };

  // BOOKING MODAL
  const BookingModal = () => (
    <div style={styles.modal} onClick={(e) => e.target === e.currentTarget && (setBookingStep(1), setSelectedService(null), setPaymentDone(false))}>
      <div style={styles.modalBox}>
        <button style={styles.backBtn} onClick={() => { if (bookingStep > 1 && bookingStep < 4) setBookingStep(s => s - 1); else { setSelectedService(null); setBookingStep(1); setPaymentDone(false); } }}>
          {bookingStep < 4 ? "← Back" : "✕ Close"}
        </button>
        <div style={styles.progressBar}>
          {[1,2,3].map(s => <div key={s} style={styles.progressDot(bookingStep === s, bookingStep > s)} />)}
        </div>

        {bookingStep === 1 && (
          <>
            <div style={styles.stepTitle}>Your Details</div>
            <div style={styles.stepSub}>{selectedService.name} · ${selectedService.price}</div>
            <input style={styles.input} placeholder="Full name" value={bookingData.name} onChange={e => setBookingData({...bookingData, name: e.target.value})} />
            <input style={styles.input} placeholder="Email address" value={bookingData.email} onChange={e => setBookingData({...bookingData, email: e.target.value})} />
            <input style={styles.input} placeholder="Phone number" value={bookingData.phone} onChange={e => setBookingData({...bookingData, phone: e.target.value})} />
            <input style={styles.input} placeholder="Vehicle (e.g. 2022 BMW 5 Series)" value={bookingData.vehicle} onChange={e => setBookingData({...bookingData, vehicle: e.target.value})} />
            <button style={{...styles.btnPrimary, width: "100%", marginTop: 8}} disabled={!bookingData.name || !bookingData.email} onClick={() => setBookingStep(2)}>
              Continue
            </button>
          </>
        )}

        {bookingStep === 2 && (
          <>
            <div style={styles.stepTitle}>Pick a Time</div>
            <div style={styles.stepSub}>Choose your preferred date and time slot.</div>
            <input style={styles.input} type="date" value={bookingData.date} onChange={e => setBookingData({...bookingData, date: e.target.value})} min={new Date().toISOString().split("T")[0]} />
            <div style={styles.timeGrid}>
              {TIME_SLOTS.map(t => (
                <button key={t} style={styles.timeBtn(bookingData.time === t)} onClick={() => setBookingData({...bookingData, time: t})}>{t}</button>
              ))}
            </div>
            <button style={{...styles.btnPrimary, width: "100%"}} disabled={!bookingData.date || !bookingData.time} onClick={() => setBookingStep(3)}>
              Continue to Payment
            </button>
          </>
        )}

        {bookingStep === 3 && (
          <>
            <div style={styles.stepTitle}>Payment</div>
            <div style={styles.stepSub}>Secure checkout · ${selectedService.price} total</div>
            <div style={{ background: "#f5f5f5", borderRadius: 14, padding: "16px 20px", marginBottom: 20, fontSize: 14 }}>
              <div style={{ fontWeight: 600 }}>{selectedService.name}</div>
              <div style={{ color: "#888", marginTop: 4 }}>{bookingData.date} at {bookingData.time} · {bookingData.vehicle}</div>
            </div>
            <input style={styles.input} placeholder="Name on card" value={cardData.name} onChange={e => setCardData({...cardData, name: e.target.value})} />
            <input style={styles.input} placeholder="Card number" maxLength={19} value={cardData.number} onChange={e => setCardData({...cardData, number: e.target.value.replace(/\D/g,'').replace(/(.{4})/g,'$1 ').trim()})} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <input style={{...styles.input, marginBottom: 0}} placeholder="MM / YY" maxLength={7} value={cardData.expiry} onChange={e => setCardData({...cardData, expiry: e.target.value})} />
              <input style={{...styles.input, marginBottom: 0}} placeholder="CVV" maxLength={4} value={cardData.cvv} onChange={e => setCardData({...cardData, cvv: e.target.value})} />
            </div>
            <button style={{...styles.btnPrimary, width: "100%", marginTop: 20}} onClick={handleBook} disabled={!cardData.name || cardData.number.length < 19}>
              Pay ${selectedService.price} · Book Now
            </button>
            <div style={{ textAlign: "center", fontSize: 12, color: "#aaa", marginTop: 12 }}>🔒 256-bit SSL · Powered by Stripe</div>
          </>
        )}

        {bookingStep === 4 && (
          <div style={{ textAlign: "center" }}>
            <div style={styles.successIcon}>✓</div>
            <div style={styles.stepTitle}>You're booked.</div>
            <div style={{ fontSize: 15, color: "#555", marginBottom: 32, lineHeight: 1.6 }}>
              {selectedService.name} confirmed for {bookingData.date} at {bookingData.time}.<br/>
              A confirmation has been sent to {bookingData.email}.
            </div>
            <button style={{...styles.btnPrimary}} onClick={() => { setSelectedService(null); setBookingStep(1); setView("admin"); }}>
              View Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );

  // HOME VIEW
  const HomeView = () => (
    <div>
      {/* Hero */}
      <div style={styles.hero}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 50% 0%, #f0f0f0 0%, #fff 70%)", zIndex: 0 }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={styles.heroEyebrow}>Miami's Premier Detail Studio</div>
          <h1 style={styles.heroTitle}>H&H Detail<br/>& Car Wash</h1>
          <p style={styles.heroSub}>Obsessive attention to every surface. Showroom results, delivered to your schedule.</p>
          <div style={styles.heroBtns}>
            <button style={styles.btnPrimary} onClick={() => setView("services")}>Book a Service</button>
            <button style={styles.btnSecondary} onClick={() => setView("services")}>View Packages</button>
          </div>
        </div>
        <div style={{ position: "absolute", bottom: 40, fontSize: 13, color: "#aaa", letterSpacing: "0.05em" }}>Miami, FL · Open Daily 8AM–6PM</div>
      </div>

      <div style={styles.divider} />

      {/* Stats */}
      <div style={styles.section}>
        <div style={styles.sectionLabel}>By the Numbers</div>
        <div style={styles.statsRow}>
          {[["500+","Vehicles detailed"], ["4.9★","Average rating"], ["5 yrs","Serving Miami"]].map(([n, l]) => (
            <div key={l} style={styles.statCard}>
              <div style={styles.statNum}>{n}</div>
              <div style={styles.statLabel}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={styles.divider} />

      {/* Services preview */}
      <div style={styles.section}>
        <div style={styles.sectionLabel}>Services</div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16 }}>
          <div>
            <div style={styles.sectionTitle}>Every service.<br/>Perfected.</div>
          </div>
          <button style={styles.btnSecondary} onClick={() => setView("services")}>See all packages →</button>
        </div>
        <div style={styles.serviceGrid}>
          {SERVICES.slice(0,3).map(s => (
            <div key={s.id} style={styles.serviceCard(false)} onClick={() => { setSelectedService(s); setView("services"); }}>
              <div style={styles.serviceName}>{s.name}</div>
              <div style={styles.serviceDesc}>{s.description}</div>
              <div style={styles.serviceFooter}>
                <span style={styles.servicePrice}>${s.price}</span>
                <span style={styles.serviceDur}>{s.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ background: "#000", color: "#fff", padding: "100px 40px", textAlign: "center" }}>
        <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "#666", marginBottom: 24 }}>Ready?</div>
        <div style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 700, letterSpacing: "-0.025em", marginBottom: 24, lineHeight: 1.1 }}>Book your detail<br/>in under 2 minutes.</div>
        <button style={{ ...styles.btnPrimary, background: "#fff", color: "#000", fontSize: 17, padding: "18px 48px" }} onClick={() => setView("services")}>
          Schedule Now
        </button>
      </div>
    </div>
  );

  // SERVICES VIEW
  const ServicesView = () => (
    <div style={styles.section}>
      <div style={styles.sectionLabel}>Our Packages</div>
      <div style={styles.sectionTitle}>Choose your service.</div>
      <div style={{ fontSize: 16, color: "#888", marginBottom: 48 }}>Select a package to book your appointment online.</div>
      <div style={styles.serviceGrid}>
        {SERVICES.map(s => (
          <div key={s.id} style={styles.serviceCard(selectedService?.id === s.id)}
            onClick={() => setSelectedService(selectedService?.id === s.id ? null : s)}>
            <div style={styles.serviceName}>{s.name}</div>
            <div style={styles.serviceDesc}>{s.description}</div>
            <div style={styles.serviceFooter}>
              <span style={styles.servicePrice}>${s.price}</span>
              <span style={styles.serviceDur}>{s.duration}</span>
            </div>
            {selectedService?.id === s.id && (
              <div style={{ marginTop: 24 }}>
                <button style={{ ...styles.btnPrimary, background: "#fff", color: "#000", width: "100%", fontSize: 15 }}
                  onClick={(e) => { e.stopPropagation(); setBookingStep(1); }}>
                  Book This →
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  // ADMIN VIEW
  const AdminView = () => (
    <div style={styles.section}>
      <div style={styles.sectionLabel}>Dashboard</div>
      <div style={styles.sectionTitle}>Revenue & Bookings</div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 2, marginTop: 40, marginBottom: 2 }}>
        {[
          ["$" + totalRevenue.toLocaleString(), "Collected Revenue"],
          ["$" + pendingRevenue.toLocaleString(), "Pending"],
          [bookings.filter(b=>b.status==="confirmed").length, "Upcoming Appts"],
          [bookings.filter(b=>b.status==="completed").length, "Completed"],
        ].map(([n, l]) => (
          <div key={l} style={styles.statCard}>
            <div style={{ ...styles.statNum, fontSize: 36 }}>{n}</div>
            <div style={styles.statLabel}>{l}</div>
          </div>
        ))}
      </div>

      <table style={styles.table}>
        <thead>
          <tr>{["Client", "Service", "Date", "Time", "Amount", "Status"].map(h => <th key={h} style={styles.th}>{h}</th>)}</tr>
        </thead>
        <tbody>
          {bookings.map(b => (
            <tr key={b.id}>
              <td style={styles.td}><strong>{b.name}</strong></td>
              <td style={styles.td}>{b.service}</td>
              <td style={styles.td}>{b.date}</td>
              <td style={styles.td}>{b.time}</td>
              <td style={styles.td}><strong>${b.amount}</strong></td>
              <td style={styles.td}><span style={styles.badge(b.status)}>{b.status}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div style={styles.root}>
      {/* NAV */}
      <nav style={styles.nav}>
        <div style={styles.navLogo} onClick={() => setView("home")} role="button">H&H Detail</div>
        <ul style={styles.navLinks}>
          {[["home","Home"],["services","Services"],["admin","Dashboard"]].map(([v, label]) => (
            <li key={v}><button style={styles.navLink(view===v)} onClick={() => setView(v)}>{label}</button></li>
          ))}
        </ul>
        <button style={styles.navCta} onClick={() => setView("services")}>Book Now</button>
      </nav>

      <div style={styles.page}>
        {view === "home" && <HomeView />}
        {view === "services" && <ServicesView />}
        {view === "admin" && <AdminView />}
      </div>

      {selectedService && bookingStep >= 1 && bookingStep <= 4 && view === "services" && <BookingModal />}
    </div>
  );
}
