






let simulationInterval;
let elapsedTime = 0; // in hours
let waterVolume = 18.75; // Start with 75% of 25m³ (18.75m³)
let speedMultiplier = 1;
let lastUpdateTime = 0;
let chart;
let phase = "REACT"; // Start in react phase since tank is already filled
let cycleCount = 0;
const tankArea = 6.25; // m² (for 4m depth at 25m³ volume)
const maxVolume = 25; // m³
const initialVolume = 18.75; // 75% of max volume
const maxChartHours = 24; // Total hours to display
const chartResolution = 0.1; // Data point every 0.1 hours (6 minutes)
let chartData = [];

// Phase durations (hours)
const phaseDurations = {
  FILL: 4,
  REACT: 3,
  SETTLE: 0.5,
  DECANT: 0.5
};

// Initialize chart
function initChart() {
  const ctx = document.getElementById('sbrChart').getContext('2d');
  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: 'Water Level (m)',
        data: [],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 2,
        fill: true
      }]
    },
    options: {
      scales: {
        x: {
          title: {
            display: true,
            text: 'Time (hours)'
          },
          min: 0,
          max: 4 // Start showing first 4 hours
        },
        y: {
          title: {
            display: true,
            text: 'Water Level (m)'
          },
          min: 2.5,
          max: 4.5
        }
      },
      animation: {
        duration: 0
      },
      plugins: {
        annotation: {
          annotations: {
            fillPhase: {
              type: 'box',
              xMin: 0,
              xMax: 4,
              backgroundColor: 'rgba(52, 152, 219, 0.1)',
              borderColor: 'rgba(52, 152, 219, 0.5)',
              borderWidth: 1,
              label: {
                content: 'FILL',
                enabled: true
              }
            },
            reactPhase: {
              type: 'box',
              xMin: 4,
              xMax: 7,
              backgroundColor: 'rgba(46, 204, 113, 0.1)',
              borderColor: 'rgba(46, 204, 113, 0.5)',
              borderWidth: 1,
              label: {
                content: 'REACT',
                enabled: true
              }
            },
            settlePhase: {
              type: 'box',
              xMin: 7,
              xMax: 7.5,
              backgroundColor: 'rgba(241, 196, 15, 0.1)',
              borderColor: 'rgba(241, 196, 15, 0.5)',
              borderWidth: 1,
              label: {
                content: 'SETTLE',
                enabled: true
              }
            },
            decantPhase: {
              type: 'box',
              xMin: 7.5,
              xMax: 8,
              backgroundColor: 'rgba(231, 76, 60, 0.1)',
              borderColor: 'rgba(231, 76, 60, 0.5)',
              borderWidth: 1,
              label: {
                content: 'DECANT',
                enabled: true
              }
            }
          }
        }
      }
    }
  });

  // Initialize with starting value
  chartData.push({ time: 0, depth: initialVolume / tankArea });
  updateChart();
}

function startSimulation() {
  stopSimulation();
  if (!chart) initChart();
  
  lastUpdateTime = Date.now();
  elapsedTime = 0;
  cycleCount = 0;
  phase = "REACT";
  waterVolume = initialVolume;
  chartData = [{ time: 0, depth: initialVolume / tankArea }];
  
  simulationInterval = setInterval(() => {
    const now = Date.now();
    const deltaTime = (now - lastUpdateTime) / 1000; // in seconds
    lastUpdateTime = now;
    
    // Convert deltaTime to hours (1 real second = 1 simulation hour)
    const deltaHours = deltaTime * 3600 * speedMultiplier;
    elapsedTime += deltaHours / 3600; // Convert back to hours
    
    // Update phase based on elapsed time in current cycle
    const cyclePosition = elapsedTime % 8; // 8-hour cycles
    
    if (cyclePosition < phaseDurations.FILL && phase !== "FILL") {
      phase = "FILL";
      cycleCount++;
    } else if (cyclePosition >= phaseDurations.FILL && 
               cyclePosition < phaseDurations.FILL + phaseDurations.REACT && 
               phase !== "REACT") {
      phase = "REACT";
    } else if (cyclePosition >= phaseDurations.FILL + phaseDurations.REACT && 
               cyclePosition < phaseDurations.FILL + phaseDurations.REACT + phaseDurations.SETTLE && 
               phase !== "SETTLE") {
      phase = "SETTLE";
    } else if (cyclePosition >= phaseDurations.FILL + phaseDurations.REACT + phaseDurations.SETTLE && 
               phase !== "DECANT") {
      phase = "DECANT";
    }
    
    // Process current phase
    switch(phase) {
      case "FILL":
        waterVolume += (maxVolume/phaseDurations.FILL) * deltaHours / 3600;
        if (waterVolume > maxVolume) waterVolume = maxVolume;
        break;
        
      case "REACT":
      case "SETTLE":
        // No volume change during react or settle phases
        break;
        
      case "DECANT":
        waterVolume -= (maxVolume/phaseDurations.DECANT) * deltaHours / 3600;
        if (waterVolume < initialVolume) waterVolume = initialVolume;
        break;
    }
    
    // Calculate water depth
    const waterDepth = waterVolume / tankArea;
    
    // Store data point
    if (elapsedTime - chartData[chartData.length-1].time >= chartResolution) {
      chartData.push({ time: elapsedTime, depth: waterDepth });
      
      // Remove old data points beyond our window
      while (chartData.length > 0 && chartData[0].time < elapsedTime - maxChartHours) {
        chartData.shift();
      }
    }
    
    // Update display
    updateDisplay(elapsedTime, waterDepth, phase);
    updateChart();
    
  }, 1000 / 60); // 60 FPS for smooth animation
}

function updateChart() {
  if (chartData.length === 0) return;
  
  // Update chart data
  chart.data.labels = chartData.map(d => d.time.toFixed(1));
  chart.data.datasets[0].data = chartData.map(d => d.depth);
  
  // Adjust x-axis scale to show moving window
  const currentMax = Math.min(maxChartHours, Math.max(4, elapsedTime + 2));
  chart.options.scales.x.min = Math.max(0, currentMax - maxChartHours);
  chart.options.scales.x.max = currentMax;
  
  // Update phase annotations for current cycle
  const cycleStart = Math.floor(elapsedTime / 8) * 8;
  chart.options.plugins.annotation.annotations.fillPhase.xMin = cycleStart;
  chart.options.plugins.annotation.annotations.fillPhase.xMax = cycleStart + phaseDurations.FILL;
  chart.options.plugins.annotation.annotations.reactPhase.xMin = cycleStart + phaseDurations.FILL;
  chart.options.plugins.annotation.annotations.reactPhase.xMax = cycleStart + phaseDurations.FILL + phaseDurations.REACT;
  chart.options.plugins.annotation.annotations.settlePhase.xMin = cycleStart + phaseDurations.FILL + phaseDurations.REACT;
  chart.options.plugins.annotation.annotations.settlePhase.xMax = cycleStart + phaseDurations.FILL + phaseDurations.REACT + phaseDurations.SETTLE;
  chart.options.plugins.annotation.annotations.decantPhase.xMin = cycleStart + phaseDurations.FILL + phaseDurations.REACT + phaseDurations.SETTLE;
  chart.options.plugins.annotation.annotations.decantPhase.xMax = cycleStart + 8;
  
  chart.update();
}

function updateDisplay(time, depth, currentPhase) {
  document.getElementById('timeElapsed').textContent = time.toFixed(2);
  document.getElementById('waterVolume').textContent = waterVolume.toFixed(2);
  document.getElementById('waterDepth').textContent = depth.toFixed(2);
  
  const phaseElement = document.getElementById('phaseStatus');
  phaseElement.textContent = currentPhase;
  phaseElement.className = `phase-${currentPhase.toLowerCase()}`;
  
  // Update visual water level indicator (75% to 100% range)
  const heightPercent = ((depth - 3) / 1) * 100 + 75;
  document.getElementById('waterLevelIndicator').style.height = `${Math.min(100, Math.max(0, heightPercent))}%`;
}

function stopSimulation() {
  clearInterval(simulationInterval);
}

function resetSimulation() {
  stopSimulation();
  elapsedTime = 0;
  waterVolume = initialVolume;
  phase = "REACT";
  chartData = [{ time: 0, depth: initialVolume / tankArea }];
  
  document.getElementById('timeElapsed').textContent = "0.00";
  document.getElementById('waterVolume').textContent = initialVolume.toFixed(2);
  document.getElementById('waterDepth').textContent = (initialVolume/tankArea).toFixed(2);
  
  const phaseElement = document.getElementById('phaseStatus');
  phaseElement.textContent = "REACT";
  phaseElement.className = "phase-react";
  
  document.getElementById('waterLevelIndicator').style.height = "75%";
  
  if (chart) {
    updateChart();
  }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
  initChart();
  document.getElementById('startButton').addEventListener('click', startSimulation);
  document.getElementById('resetButton').addEventListener('click', resetSimulation);
  document.getElementById('speedButton').addEventListener('click', function() {
    speedMultiplier = speedMultiplier === 1 ? 2 : 1;
    this.textContent = speedMultiplier === 2 ? 'Normal Speed' : 'Speed Up 2x';
    this.classList.toggle('speed-up');
  });
  
  // Initialize display
  document.getElementById('waterVolume').textContent = initialVolume.toFixed(2);
  document.getElementById('waterDepth').textContent = (initialVolume/tankArea).toFixed(2);
  document.getElementById('waterLevelIndicator').style.height = "75%";
});

function updateDisplay(time, depth, currentPhase) {
  document.getElementById('timeElapsed').textContent = time.toFixed(2);
  document.getElementById('waterVolume').textContent = waterVolume.toFixed(2);
  document.getElementById('waterDepth').textContent = depth.toFixed(2);
  
  const phaseElement = document.getElementById('phaseStatus');
  phaseElement.textContent = currentPhase;
  phaseElement.className = `phase-${currentPhase.toLowerCase()}`;
  
  // Update visual water level indicator with freeboard
  const maxVisualDepth = 4.5; // 4m water + 0.5m freeboard
  const heightPercent = (depth / maxVisualDepth) * 100;
  document.getElementById('waterLevelIndicator').style.height = `${Math.min(100, Math.max(0, heightPercent))}%`;
  
  // Update the depth marker position
  const depthMarker = document.getElementById('depthMarker');
  if (depthMarker) {
    const markerPosition = (depth / maxVisualDepth) * 100;
    depthMarker.style.bottom = `${markerPosition}%`;
    depthMarker.textContent = `${depth.toFixed(2)}m`;
  }
}