const hospitalImages = [
  "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=600&q=80"
];

const hospitalData = {
  Delhi: [
    { name: "AIIMS Delhi", rating: 4.9, reviews: 513, beds: 20, dist: "2.5 km", area: "Ansari Nagar, New Delhi" },
    { name: "Fortis Escorts Heart Institute", rating: 4.7, reviews: 423, beds: 15, dist: "4.1 km", area: "Okhla Road, New Delhi" },
    { name: "Max Super Speciality Hospital", rating: 4.6, reviews: 310, beds: 18, dist: "6.3 km", area: "Saket, New Delhi" },
    { name: "Indraprastha Apollo Hospital", rating: 4.5, reviews: 298, beds: 12, dist: "7.2 km", area: "Sarita Vihar, New Delhi" },
    { name: "BLK-Max Super Speciality", rating: 4.4, reviews: 221, beds: 10, dist: "5.7 km", area: "Pusa Road, New Delhi" }
  ],

  Mumbai: [
    { name: "Kokilaben Hospital", rating: 4.8, reviews: 487, beds: 16, dist: "3.4 km", area: "Andheri West, Mumbai" },
    { name: "Lilavati Hospital", rating: 4.6, reviews: 352, beds: 13, dist: "5.8 km", area: "Bandra West, Mumbai" },
    { name: "Nanavati Max Hospital", rating: 4.5, reviews: 304, beds: 19, dist: "6.1 km", area: "Vile Parle, Mumbai" }
  ],

  Bangalore: [
    { name: "Manipal Hospital", rating: 4.7, reviews: 401, beds: 22, dist: "4.0 km", area: "Old Airport Road, Bangalore" },
    { name: "Narayana Health City", rating: 4.6, reviews: 339, beds: 28, dist: "8.5 km", area: "Bommasandra, Bangalore" },
    { name: "Aster CMI Hospital", rating: 4.5, reviews: 276, beds: 14, dist: "6.8 km", area: "Hebbal, Bangalore" }
  ],

  Chennai: [
    { name: "Apollo Hospital Chennai", rating: 4.7, reviews: 459, beds: 18, dist: "3.1 km", area: "Greams Road, Chennai" },
    { name: "MIOT International", rating: 4.6, reviews: 318, beds: 15, dist: "5.2 km", area: "Manapakkam, Chennai" },
    { name: "SIMS Hospital", rating: 4.4, reviews: 244, beds: 11, dist: "4.7 km", area: "Vadapalani, Chennai" }
  ],

  Kolkata: [
    { name: "AMRI Hospital", rating: 4.6, reviews: 302, beds: 17, dist: "4.4 km", area: "Dhakuria, Kolkata" },
    { name: "Fortis Hospital Anandapur", rating: 4.5, reviews: 289, beds: 12, dist: "6.6 km", area: "Anandapur, Kolkata" },
    { name: "Apollo Multispeciality", rating: 4.4, reviews: 261, beds: 14, dist: "5.9 km", area: "Canal Circular Road, Kolkata" }
  ]
};

function getMapUrl(hospital) {
  const query = encodeURIComponent(`${hospital.name}, ${hospital.area}`);
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}

function getEmbedMapUrl(hospital) {
  const query = encodeURIComponent(`${hospital.name}, ${hospital.area}`);
  return `https://www.google.com/maps?q=${query}&output=embed`;
}

function showHospitalMap(hospital, emergency = false) {
  const mapPanel = document.getElementById("mapPanel");
  const mapFrame = document.getElementById("hospitalMap");
  const mapTitle = document.getElementById("mapTitle");
  const mapAddress = document.getElementById("mapAddress");
  const mapLink = document.getElementById("mapLink");

  if (!mapPanel || !mapFrame || !mapTitle || !mapAddress || !mapLink) {
    return;
  }

  mapTitle.textContent = emergency
    ? `Emergency Hospital: ${hospital.name}`
    : hospital.name;

  mapAddress.textContent = hospital.area;
  mapFrame.src = getEmbedMapUrl(hospital);
  mapLink.href = getMapUrl(hospital);

  mapPanel.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

function searchHospitals() {
  const city = document.getElementById("city").value;
  const spec = document.getElementById("specialty").value;
  const loading = document.getElementById("loading");
  const cards = document.getElementById("cards");
  const resultTitle = document.getElementById("resultTitle");
  const foundCount = document.getElementById("foundCount");

  loading.textContent = "Searching hospitals...";
  loading.classList.add("active");

  cards.innerHTML = "";
  foundCount.textContent = "Please wait";

  setTimeout(() => {
    const hospitals = hospitalData[city] || [];

    loading.textContent = "";
    loading.classList.remove("active");

    resultTitle.innerHTML =
      `Top Hospitals in <strong>${city}</strong> for <strong>${spec}</strong>`;

    foundCount.textContent = `${hospitals.length} Hospitals Found`;

    cards.innerHTML = hospitals.map((hospital, index) => `
      <article class="card">

        <div class="image-wrap">
          <img
            src="${hospitalImages[index % hospitalImages.length]}"
            alt="${hospital.name}"
          >

          <span class="badge">★ Top Rated</span>
        </div>

        <div class="card-body">

          <h4>${hospital.name}</h4>

          <p class="address">
            ⌖ ${hospital.area}
          </p>

          <p class="rating">
            <span>★</span>
            ${hospital.rating}
            <span class="reviews">
              (${hospital.reviews} Reviews)
            </span>
          </p>

          <div class="hospital-meta">

            <div>
              <small>🛏 Beds Available</small>
              <strong>${hospital.beds}</strong>
            </div>

            <div>
              <small>📍 Distance</small>
              <strong>${hospital.dist}</strong>
            </div>

          </div>

          <div class="card-actions">

            <button
              type="button"
              class="map-btn"
              onclick="viewOnMap('${city}', ${index})"
            >
              ⌖ View on Map
            </button>

            <button
              type="button"
              class="details-btn"
              onclick="showDetails('${hospital.name}', '${hospital.beds}')"
            >
              Details
            </button>

          </div>

        </div>
      </article>
    `).join("");

    if (hospitals.length > 0) {
      showHospitalMap(hospitals[0]);
    }

  }, 900);
}

function viewOnMap(city, hospitalIndex) {
  const hospital = hospitalData[city][hospitalIndex];

  if (hospital) {
    showHospitalMap(hospital);
  }
}

function showDetails(hospitalName, beds) {
  alert(
    `${hospitalName}\nBeds available: ${beds}\nStatus: Verified by QuickCare`
  );
}

function findEmergencyHospital() {
  const citySelect = document.getElementById("city");
  const city = citySelect
    ? citySelect.value
    : "your city";

  const hospitals = hospitalData[city] || [];

  const emergencyHospital = hospitals
    .slice()
    .sort((first, second) => second.beds - first.beds)[0];

  if (!emergencyHospital) {
    alert(`No emergency hospital found in ${city}.`);
    return;
  }

  showHospitalMap(emergencyHospital, true);

  alert(
    `Emergency hospital found in ${city}: ${emergencyHospital.name}\nShowing its location below.`
  );
}

const emergencyBtn =
  document.getElementById("emergencyBtn");

if (emergencyBtn) {
  emergencyBtn.addEventListener(
    "click",
    findEmergencyHospital
  );
}

const searchBtn =
  document.querySelector(".search-btn");

if (searchBtn) {
  searchBtn.addEventListener(
    "click",
    searchHospitals
  );
}

const adminForm =
  document.getElementById("adminForm");

if (adminForm) {

  adminForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const username =
      document.getElementById("username").value.trim();

    const password =
      document.getElementById("password").value.trim();

    const message =
      document.getElementById("loginMessage");

    if (
      username === "admin" &&
      password === "quickcare123"
    ) {

      message.textContent =
        "Login successful. Welcome to QuickCare Admin.";

      message.className =
        "login-message success";

      setTimeout(() => {
        window.location.href = "quickcare.html";
      }, 700);

      return;
    }

    message.textContent =
      "Invalid login. Try username admin and password quickcare123.";

    message.className =
      "login-message error";
  });
}