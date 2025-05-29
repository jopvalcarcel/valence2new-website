const body = document.querySelector("body"),
      sidebar = document.querySelector(".sidebar"),
      toggle = body.querySelector(".toggle"),
      searchBtn = body.querySelector(".search-box"),
      modeSwitch = body.querySelector(".toggle-switch"),
      modeText = body.querySelector(".mode-text");

toggle.addEventListener("click", () => {
    sidebar.classList.toggle("close");
});

modeSwitch.addEventListener("click", () => {
    body.classList.toggle("dark");
    
    if(body.classList.contains("dark")) {
        modeText.innerText = "Light mode";
    } else {
        modeText.innerText = "Dark mode";
    }
});

function toggleOption() {
    const isChecked = document.getElementById('toggleSwitch').checked;
    const label = document.getElementById('toggleLabel');
    label.textContent = isChecked ? 'Option B' : 'Option A';
  
    // Add your Option A/B logic here
    if (isChecked) {
      console.log("Option B selected");
    } else {
      console.log("Option A selected");
    }
  }