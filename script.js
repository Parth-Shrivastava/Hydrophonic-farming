// Reset wires/pipes and buttons
function resetSystem() {
  document.querySelectorAll('.wire-segment, .pipe-segment, .control-btn')
    .forEach(el => el.classList.remove('active'));
}

// Activate a nutrient manually via button
function activateNutrient(nutrient) {
  resetSystem();

  const button = document.querySelector(`.control-btn.${nutrient}`);
  if (button) button.classList.add("active");

  const connections = {
    nitrogen: ["wireNitrogen", "pipeNitrogenTank", "pipeTankPlant"],
    potassium: ["wirePotassium", "pipePotassiumTank", "pipeTankPlant"],
    sodium: ["wireSodium", "pipeSodiumTank", "pipeTankPlant"] // phosphorus
  };

  if (connections[nutrient]) {
    connections[nutrient].forEach(connectionId => {
      const connection = document.getElementById(connectionId);
      if (connection) {
        connection.classList.add("active"); // ✅ turn green
      }
    });
  }
}

// Temporary activation for analyze logic
function temporaryActivateNutrient(nutrient, duration) {
  activateNutrient(nutrient);
  setTimeout(() => resetSystem(), duration);
}

// Analyze NPK values
document.getElementById("analyzeBtn").addEventListener("click", analyzeNPKValues);

function analyzeNPKValues() {
  const nitrogen = parseFloat(document.getElementById("nitrogen").value) || 0;
  const phosphorus = parseFloat(document.getElementById("phosphorus").value) || 0;
  const potassium = parseFloat(document.getElementById("potassium").value) || 0;

  console.log(`Analyzing NPK values: N=${nitrogen}, P=${phosphorus}, K=${potassium}`);

  // Define thresholds
  const thresholds = { nitrogen: 15, phosphorus: 15, potassium: 15 };

  // Check against thresholds and activate if needed
  if (nitrogen < thresholds.nitrogen) {
    temporaryActivateNutrient("nitrogen", 2000);
  }
  if (phosphorus < thresholds.phosphorus) {
    setTimeout(() => temporaryActivateNutrient("sodium", 2000), 2100);
  }
  if (potassium < thresholds.potassium) {
    setTimeout(() => temporaryActivateNutrient("potassium", 2000), 4200);
  }
}
