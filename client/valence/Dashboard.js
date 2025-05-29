// =========================
// ✅ Configurable Hyperlinks
// =========================
const menuLinks = [
{ text: "Dashboard", href: "#" },
{ text: "Influent Parameters", href: "designcondition.html" },
{ text: "Pump Chamber", href: "pumpchamber.html" },
{ text: "Bar Screening", href: "barscreening.html" },
{ text: "Oil and Grease", href: "oilandgrease.html" },
{ text: "Grit Removal", href: "gritremoval.html" },
{ text: "Equalization Tank", href: "EQTank.html" },
{ text: "Primary Clarifier", href: "PrimaryClarifier.html" },
{ text: "DAF", href: "DAF.html" },
{ text: "Modified Ludzack-Ettinger", href: "MLE.html" },
{ text: "SBR", href: "SBR.html" },
{ text: "MBBR", href: "4MBBR.html" },
{ text: "MBR", href: "MBR.html" },
{ text: "IFAS", href: "IFAS.html" },
{ text: "Air requirements", href: "Aerationfast.html" },
{ text: "Pump Sizing", href: "pumphead.html" },
{ text: "Blower Pressure", href: "blowerhead.html" },
{ text: "Air Piping and Diffuser", href: "pipesizing.html" },
{ text: "Chlorine Contact", href: "CCT.html" },
{ text: "Aerobic Digester", href: "aerobicdigester.html" },
{ text: "Dewatering", href: "dewatering.html" },
{ text: "Chlorine Dosing", href: "Chlorinedosing.html" },
{ text: "Phosphate Removal", href: "Phosphateremoval.html" },
{ text: "Process Flow Diagram", href: "pfd.html" },
{ text: "Layout", href: "Layout.html" }
  // Add/remove/edit links here
];

// =========================
// ✅ DOM References
// =========================
const body = document.querySelector("body"),
      sidebar = document.querySelector(".sidebar"),
      toggle = body.querySelector(".toggle"),
      searchInput = body.querySelector(".search-box input"),
      modeSwitch = body.querySelector(".toggle-switch"),
      modeText = body.querySelector(".mode-text");

// =========================
// ✅ Sidebar Toggle
// =========================
toggle.addEventListener("click", () => {
  sidebar.classList.toggle("close");
});

// =========================
// ✅ Dark/Light Mode Toggle
// =========================
modeSwitch.addEventListener("click", () => {
  body.classList.toggle("dark");
  modeText.innerText = body.classList.contains("dark") ? "Light mode" : "Dark mode";
});

// =========================
// ✅ Dropdown Toggle Logic (Based on .has-dropdown)
// =========================
const dropdownToggles = document.querySelectorAll(".has-dropdown > a");

dropdownToggles.forEach(toggle => {
  toggle.addEventListener("click", (e) => {
    e.preventDefault();
    const parentLi = toggle.parentElement;

    // Close others
    document.querySelectorAll(".has-dropdown.open").forEach(openItem => {
      if (openItem !== parentLi) {
        openItem.classList.remove("open");
      }
    });

    // Toggle clicked one
    parentLi.classList.toggle("open");
  });
});

// =========================
// ✅ Create Search Box Results
// =========================
let searchResultsContainer = document.querySelector(".search-results");
if (!searchResultsContainer) {
  searchResultsContainer = document.createElement("div");
  searchResultsContainer.classList.add("search-results");
  document.querySelector(".search-box").appendChild(searchResultsContainer);
}

// =========================
// ✅ Search Filtering Logic
// =========================
searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.toLowerCase().trim();
  searchResultsContainer.innerHTML = "";

  if (searchTerm === "") {
    searchResultsContainer.style.display = "none";
    return;
  }

  const matchedLinks = menuLinks.filter(link =>
    link.text.toLowerCase().includes(searchTerm)
  );

  if (matchedLinks.length === 0) {
    const div = document.createElement("div");
    div.classList.add("result-item");
    div.textContent = "No results found.";
    searchResultsContainer.appendChild(div);
    searchResultsContainer.style.display = "block";
    return;
  }

  matchedLinks.forEach(link => {
    const resultItem = document.createElement("div");
    resultItem.classList.add("result-item");
    resultItem.textContent = cleanText(link.text);
    resultItem.addEventListener("click", () => {
      window.location.href = link.href;
    });
    searchResultsContainer.appendChild(resultItem);
  });

  searchResultsContainer.style.display = "block";
});

// =========================
// ✅ Close Dropdowns & Search on Outside Click
// =========================
document.addEventListener("click", (e) => {
  const isInsideDropdown = e.target.closest(".has-dropdown");
  const isInsideSearchBox = e.target.closest(".search-box");

  if (!isInsideDropdown) {
    document.querySelectorAll(".has-dropdown.open").forEach(openItem => {
      openItem.classList.remove("open");
    });
  }

  if (!isInsideSearchBox) {
    searchResultsContainer.style.display = "none";
  }
});

// =========================
// ✅ Clean Link Text for Display
// =========================
function cleanText(text) {
  return text.replace(".html", "").replace(/_/g, " ");
}