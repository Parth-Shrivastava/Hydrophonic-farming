const thresholds = {
  nitrogen: 50,
  phosphorus: 40,
  potassium: 60
};

// Event listener for analyze button
document.getElementById('analyzeBtn').addEventListener('click', () => {
  const nitrogen = parseFloat(document.getElementById('nitrogen').value);
  const phosphorus = parseFloat(document.getElementById('phosphorus').value);
  const potassium = parseFloat(document.getElementById('potassium').value);

  if (nitrogen < thresholds.nitrogen) activateNutrient('nitrogen');
  if (phosphorus < thresholds.phosphorus) activateNutrient('phosphorus');
  if (potassium < thresholds.potassium) activateNutrient('potassium');
});

function activateNutrient(nutrient) {
  resetSystem();

  const connections = {
    nitrogen: ['wireNitrogen', 'pipeNitrogenTank', 'pipeTankPlant'],
    phosphorus: ['wirePhosphorus', 'pipePhosphorusTank', 'pipeTankPlant'],
    potassium: ['wirePotassium', 'pipePotassiumTank', 'pipeTankPlant']
  };

  // Activate corresponding wires and pipes
  if (connections[nutrient]) {
    connections[nutrient].forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.classList.add('active');
        // Deactivate after 2 seconds
        setTimeout(() => el.classList.remove('active'), 2000);
      }
    });
  }

  // Highlight the control button
  document.querySelectorAll('.control-btn').forEach(btn => btn.classList.remove('active'));
  const btn = document.querySelector(`.control-btn.${nutrient}`);
  if (btn) btn.classList.add('active');
}

function resetSystem() {
  document.querySelectorAll('.wire-segment, .pipe-segment').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.control-btn').forEach(btn => btn.classList.remove('active'));
}
