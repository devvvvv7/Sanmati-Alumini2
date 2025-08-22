// Smooth scroll
function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}

// Thank you after registration
function afterRegister() {
  alert("✅ Thank you for registering! Your profile has been added.");
  loadAlumniFromSheet(); // refresh alumni directory
}

// Load alumni from Google Sheet
async function loadAlumniFromSheet() {
  const sheetURL = "https://docs.google.com/spreadsheets/d/2PACX-1vSdxQrD2F3uU3lyf0vqZj_r3WNjcHnbWCgc3vkGc-o2mSKcJtsBCJwa5hLEHyihFlMaXnsDhfkU5Jtx/gviz/tq?tqx=out:json";
  try {
    const res = await fetch(sheetURL);
    const text = await res.text();
    const json = JSON.parse(text.substr(47).slice(0, -2));

    const alumni = json.table.rows.map(r => ({
      name: r.c[0]?.v || "",
      email: r.c[1]?.v || "",
      batch: r.c[2]?.v || "",
      profession: r.c[3]?.v || "",
      company: r.c[4]?.v || "",
      location: r.c[5]?.v || ""
    }));

    displayAlumni(alumni);
  } catch (err) {
    console.error("Error loading alumni:", err);
  }
}

// Display alumni cards
function displayAlumni(alumni) {
  const container = document.getElementById("alumni-list");
  container.innerHTML = "";

  alumni.forEach(alum => {
    const card = document.createElement("div");
    card.classList.add("alumni-card");
    card.innerHTML = `
      <h3>${alum.name}</h3>
      <p><strong>Batch:</strong> ${alum.batch}</p>
      <p><strong>Profession:</strong> ${alum.profession}</p>
      <p><strong>Company:</strong> ${alum.company}</p>
      <p><strong>Location:</strong> ${alum.location}</p>
    `;
    container.appendChild(card);
  });
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  loadAlumniFromSheet();
});
