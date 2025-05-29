 let simulationInterval;
  let elapsedTime = 0;
  let waterVolume = 0;
  let pumpOn = false;
  let speedMultiplier = 1;
  let lastUpdateTime = 0;
  let chamberArea = 0;
  const MAX_DISPLAY_DEPTH = 10;
  
  // Chart variables
  let waterLevelChart;
  let timeData = [];
  let levelData = [];
  const MAX_DATA_POINTS = 200;

  // Simulation state variables
  let pumpTimer = 0;
  let currentPhase = 'OFF';
  let lastRealTime = 0;
  let accumulatedTime = 0;

  function initializeChart() {
    const ctx = document.getElementById('waterLevelChart').getContext('2d');
    waterLevelChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: timeData,
        datasets: [{
          label: 'Water Level',
          data: levelData,
          borderColor: '#3498db',
          backgroundColor: 'rgba(52, 152, 219, 0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            title: {
              display: true,
              text: 'Time (minutes)'
            },
            ticks: {
              callback: function(value) {
                return parseFloat(value).toFixed(3);
              }
            },
            grid: {
              display: true,
              color: 'rgba(0, 0, 0, 0.05)'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Water Level (meters)'
            },
            min: 0,
            max: MAX_DISPLAY_DEPTH,
            grid: {
              display: true,
              color: 'rgba(0, 0, 0, 0.05)'
            }
          }
        },
        animation: {
          duration: 0
        }
      }
    });
  }

  function updateChart(timeInMinutes, waterLevel) {
    const roundedTime = parseFloat(timeInMinutes.toFixed(3));
    timeData.push(roundedTime);
    levelData.push(waterLevel);
    
    if (timeData.length > MAX_DATA_POINTS) {
      timeData.shift();
      levelData.shift();
    }
    
    waterLevelChart.data.labels = timeData;
    waterLevelChart.data.datasets[0].data = levelData;
    waterLevelChart.update();
  }

  function initializeSimulation() {
    const diameter = parseFloat(document.getElementById('diameter').value);
    chamberArea = Math.PI * Math.pow(diameter / 2, 2);
    
    const initialLevel = parseFloat(document.getElementById('initialLevel').value);
    waterVolume = initialLevel * chamberArea;
    
    timeData = [];
    levelData = [];
    if (waterLevelChart) {
      waterLevelChart.destroy();
    }
    initializeChart();
    
    document.getElementById('waterVolume').textContent = waterVolume.toFixed(4);
    document.getElementById('waterDepth').textContent = initialLevel.toFixed(4);
    updateWaterLevel(initialLevel);
    
    if (initialLevel > 0) {
      updateChart(0, initialLevel);
    }
  }

  function startSimulation() {
    stopSimulation();
    
    if (elapsedTime === 0) {
      initializeSimulation();
    }

    const inflowRate = parseFloat(document.getElementById('inflow').value) / 86400;
    const outflowRate = parseFloat(document.getElementById('outflow').value) / 86400;
    const pumpOnTime = parseFloat(document.getElementById('pumpOnTime').value);
    const pumpOffTime = parseFloat(document.getElementById('pumpOffTime').value);

    lastRealTime = Date.now();
    accumulatedTime = 0;

    simulationInterval = setInterval(() => {
      const now = Date.now();
      const realDeltaTime = (now - lastRealTime) / 1000;
      lastRealTime = now;
      
      const scaledDeltaTime = realDeltaTime * speedMultiplier;
      elapsedTime += scaledDeltaTime;
      accumulatedTime += scaledDeltaTime;
      
      document.getElementById('timeElapsed').textContent = Math.floor(elapsedTime);

      waterVolume += inflowRate * scaledDeltaTime;
      if (pumpOn) {
        waterVolume -= outflowRate * scaledDeltaTime;
        if (waterVolume < 0) waterVolume = 0;
      }

      pumpTimer += scaledDeltaTime;
      if (currentPhase === 'OFF' && pumpTimer >= pumpOffTime) {
        pumpTimer = 0;
        pumpOn = true;
        currentPhase = 'ON';
      } else if (currentPhase === 'ON' && pumpTimer >= pumpOnTime) {
        pumpTimer = 0;
        pumpOn = false;
        currentPhase = 'OFF';
      }

      const waterDepth = waterVolume / chamberArea;
      const timeInMinutes = elapsedTime / 60;

      document.getElementById('waterVolume').textContent = waterVolume.toFixed(4);
      document.getElementById('waterDepth').textContent = waterDepth.toFixed(4);
      const pumpStatusEl = document.getElementById('pumpStatus');
      pumpStatusEl.textContent = pumpOn ? 'ON' : 'OFF';
      pumpStatusEl.className = pumpOn ? 'status-on' : 'status-off';

      updateWaterLevel(waterDepth);
      updateChart(timeInMinutes, waterDepth);
    }, 16);
  }

  function updateWaterLevel(depth) {
    const visualDepth = Math.min(depth, MAX_DISPLAY_DEPTH);
    const heightPercent = (visualDepth / MAX_DISPLAY_DEPTH) * 100;
    document.getElementById('water').style.height = heightPercent + "%";
    
    const waterElement = document.getElementById('water');
    if (depth >= MAX_DISPLAY_DEPTH * 0.9) {
      waterElement.style.backgroundColor = '#e74c3c';
    } else {
      waterElement.style.backgroundColor = '#3498db';
    }
  }

  function stopSimulation() {
    clearInterval(simulationInterval);
    simulationInterval = null;
  }

  function resetSimulation() {
    stopSimulation();
    elapsedTime = 0;
    waterVolume = 0;
    pumpOn = false;
    speedMultiplier = 1;
    pumpTimer = 0;
    currentPhase = 'OFF';
    document.getElementById('timeElapsed').textContent = "0";
    document.getElementById('waterVolume').textContent = "0.00";
    document.getElementById('waterDepth').textContent = "0.00";
    document.getElementById('initialLevel').value = "0";
    const pumpStatusEl = document.getElementById('pumpStatus');
    pumpStatusEl.textContent = "OFF";
    pumpStatusEl.className = 'status-off';
    updateWaterLevel(0);
    
    timeData = [];
    levelData = [];
    if (waterLevelChart) {
      waterLevelChart.destroy();
    }
    initializeChart();
    
    document.getElementById('speed-btn').textContent = 'Speed: Normal (1x)';
    document.getElementById('speed-btn').className = '';
  }

  function toggleSpeed() {
    const speedButton = document.getElementById('speed-btn');
    
    if (speedMultiplier === 1) {
      speedMultiplier = 2;
      speedButton.textContent = 'Speed: Fast (2x)';
      speedButton.className = 'speed-up';
    } else if (speedMultiplier === 2) {
      speedMultiplier = 3600;
      speedButton.textContent = 'Speed: Super (3600x)';
      speedButton.className = 'super-speed';
    } else {
      speedMultiplier = 1;
      speedButton.textContent = 'Speed: Normal (1x)';
      speedButton.className = '';
    }

    lastRealTime = Date.now();
  }

  window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('start-sim-btn').addEventListener('click', startSimulation);
    document.getElementById('stop-sim-btn').addEventListener('click', stopSimulation);
    document.getElementById('reset-sim-btn').addEventListener('click', resetSimulation);
    document.getElementById('speed-btn').addEventListener('click', toggleSpeed);
    
    initializeChart();
    initializeSimulation();
  });