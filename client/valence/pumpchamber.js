function resetForm() {
    document.querySelectorAll('input[type="number"]').forEach(input => {
        if (!input.hasAttribute('readonly')) {
            input.value = '';
        }
    });
    document.getElementById('results').innerHTML = '';
}

function fillExample() {
    // Flow parameters
    document.getElementById('txtAvFlowratecmd').value = 480;
    document.getElementById('txtPkFlowratecmd').value = 720;
    document.getElementById('chosenpumpflowrate').value = 0.5;
    document.getElementById('txtStartsperhour').value = 15;
    document.getElementById('txtdetentiontimels').value = 20;
    document.getElementById('txtChosenTankVolume').value = 10;
    document.getElementById('txtActualDiameter').value = 1.3;
    document.getElementById('txtFBls').value = 0.5;
    document.getElementById('txtWatervelocity').value = 1.5;

    // Hatch Size parameters
    document.getElementById('txtWidthofPump').value = 0.3;
    document.getElementById('txtLenghtofPump').value = 0.3;
    document.getElementById('txtNumberofPumps').value = 2;
    document.getElementById('txtDistancebetweenpump').value = 0.3;
    document.getElementById('txtPumptowalldistance').value = 0.2;

    // Allowances
    document.getElementById('txtHHLallowance').value = 0.3048;
    document.getElementById('txtHLallowance').value = 0.25;
}

function calculate() {
    try {
        // Input values with defaults
        const avgFlowCmd = parseFloat(document.getElementById('txtAvFlowratecmd').value) || 0;
        const peakFlowCmd = parseFloat(document.getElementById('txtPkFlowratecmd').value) || 0;
        const chosenFlow = parseFloat(document.getElementById('chosenpumpflowrate').value) || 0.5;
        const startsPerHour = parseFloat(document.getElementById('txtStartsperhour').value) || 15;
        const detentionTimeLS = parseFloat(document.getElementById('txtdetentiontimels').value) || 20;
        const chosenTankVolume = parseFloat(document.getElementById('txtChosenTankVolume').value) || 10;
        const actualDiameter = parseFloat(document.getElementById('txtActualDiameter').value) || 1.3;
        const fbLs = parseFloat(document.getElementById('txtFBls').value) || 0.5;

        // Flow calculations
        const avgFlowCmh = avgFlowCmd / 24;
        const avgFlowCmMin = avgFlowCmh / 60;
        const peakFlowCmh = peakFlowCmd / 24;
        const peakFlowCmMin = peakFlowCmh / 60;
        const cycleTime = 60 / startsPerHour;
        const minTankVolume = cycleTime / ((1 / avgFlowCmMin) + (1 / (chosenFlow - avgFlowCmMin)));
        const maxTankVolume = detentionTimeLS * peakFlowCmMin;
        const tankArea = actualDiameter * actualDiameter * (1/4) * Math.PI;
        const pumpOnTime = (minTankVolume / avgFlowCmMin)*60;
        const pumpOffTime = minTankVolume / (chosenFlow - avgFlowCmMin)*60;

        // Set calculated flow values
        document.getElementById('cycletime').value = cycleTime.toFixed(2);
        document.getElementById('txtAvFlowratecmh').value = avgFlowCmh.toFixed(2);
        document.getElementById('txtAvFlowratecmmin').value = avgFlowCmMin.toFixed(2);
        document.getElementById('txtPkFlowratecmh').value = peakFlowCmh.toFixed(2);
        document.getElementById('txtPkFlowratecmmin').value = peakFlowCmMin.toFixed(2);
        document.getElementById('txtMinTankVolume').value = minTankVolume.toFixed(2);
        document.getElementById('txtMaxTankVolume').value = maxTankVolume.toFixed(2);
        document.getElementById('txtTankarea').value = tankArea.toFixed(2);
        document.getElementById('txtpumpON').value = pumpOnTime.toFixed(2);
        document.getElementById('txtpumpOFF').value = pumpOffTime.toFixed(2);

        // Water level calculations
        const waterLevel = maxTankVolume / tankArea;
        const totalTankDepth = waterLevel + fbLs;
        document.getElementById('txtWL').value = waterLevel.toFixed(2);
        document.getElementById('txttotalTankDepth').value = totalTankDepth.toFixed(2);

        // Hatch size calculations
        const lengthOfPump = parseFloat(document.getElementById('txtLenghtofPump').value) || 0.3;
        const numberOfPumps = parseFloat(document.getElementById('txtNumberofPumps').value) || 2;
        const distanceBetweenPumps = parseFloat(document.getElementById('txtDistancebetweenpump').value) || 0.3;
        const widthOfPump = parseFloat(document.getElementById('txtWidthofPump').value) || 0.3;
        const pumpToWallDistance = parseFloat(document.getElementById('txtPumptowalldistance').value) || 0.2;

        const recommendedHatchLength = (lengthOfPump * numberOfPumps) + (distanceBetweenPumps * (numberOfPumps - 1));
        const recommendedHatchWidth = widthOfPump * numberOfPumps;
        const diameterBasedOnLength = recommendedHatchLength + pumpToWallDistance*2;

        document.getElementById('txtRecommendedHatchLength').value = recommendedHatchLength.toFixed(2);
        document.getElementById('txtRecommendedHatchwidth').value = recommendedHatchWidth.toFixed(2);
        document.getElementById('txtDiameterbasedonlength').value = diameterBasedOnLength.toFixed(2);

        // Water level alarms
        const hhlAllowance = parseFloat(document.getElementById('txtHHLallowance').value) || 0.3048;
        const hlAllowance = parseFloat(document.getElementById('txtHLallowance').value) || 0.25;

        const highLevel = hlAllowance + waterLevel;
        const highHighLevel = hhlAllowance + highLevel;
        const lowLevel = waterLevel;

        document.getElementById('txtHighHighlevel').value = highHighLevel.toFixed(2);
        document.getElementById('txtHighlevel').value = highLevel.toFixed(2);
        document.getElementById('txtLowlevel').value = lowLevel.toFixed(2);

        // Pump sizing
        const waterVelocity = parseFloat(document.getElementById('txtWatervelocity').value) || 1.5;
        const suctionPumpArea = (chosenFlow / 60) / waterVelocity; // Area in m²

        
        const suctionPumpDiameter = Math.sqrt((4 * suctionPumpArea) / Math.PI) ; // Diameter in mm
        
        document.getElementById('txtsuctionpumpsizeinternal').value = suctionPumpDiameter.toFixed(2);
        document.getElementById('txtsuctionpumparea').value = suctionPumpArea.toFixed(2);


        const FD = waterVelocity*3.28/(32.2*(suctionPumpDiameter*3.28)^0.5)
        document.getElementById('txtFD').value = FD.toFixed(2);

        const lowlowLevel = (suctionPumpDiameter*3.28)*(1+2.3*FD)

        document.getElementById('txtLowLowlevel').value = lowlowLevel.toFixed(2);


        const totalTankVolume = waterLevel*tankArea


        document.getElementById('txttotalTankVolume').value = totalTankVolume.toFixed(2);

        // Display comprehensive results
        document.getElementById('results').innerHTML = `
            <h3>Calculation Results</h3>
            <p><strong>Cycle Time:</strong> ${cycleTime.toFixed(2)} seconds</p>
            <p><strong>Minimum Tank Volume:</strong> ${minTankVolume.toFixed(2)} m³</p>
            <p><strong>Maximum Tank Volume:</strong> ${maxTankVolume.toFixed(2)} m³</p>
            <p><strong>Water Level:</strong> ${waterLevel.toFixed(2)} m</p>
            <p><strong>Recommended Pump Size:</strong> ${suctionPumpArea}</p>
        `;
    } catch (error) {
        console.error("Calculation error:", error);
        document.getElementById('results').innerHTML = `
            <div class="error">Error in calculations: ${error.message}</div>
        `;
    }
}


function generateReport() {
  try {
    // Get all required input elements
    const inputs = {
      txtAvFlowratecmd: document.getElementById('txtAvFlowratecmd'),
      txtPkFlowratecmd: document.getElementById('txtPkFlowratecmd'),
      chosenpumpflowrate: document.getElementById('chosenpumpflowrate'),
      txtpumpON: document.getElementById('txtpumpON'),
      txtpumpOFF: document.getElementById('txtpumpOFF'),
      txtActualDiameter: document.getElementById('txtActualDiameter'),
      txttotalTankDepth: document.getElementById('txttotalTankDepth')
    };

    // Validate input elements exist
    for (const [id, element] of Object.entries(inputs)) {
      if (!element) {
        throw new Error(`Input element with ID '${id}' not found.`);
      }
    }

    // Get values and validate they are numeric
    const values = {};
    for (const [id, element] of Object.entries(inputs)) {
      const value = element.value.trim();
      if (value === '' || isNaN(value)) {
        throw new Error(`Please enter a valid number for ${id.replace('txt', '').replace(/cmd$/, '')}.`);
      }
      values[id] = parseFloat(value);
    }

    // Create dimension string
    const dimensionString = `${values.txtActualDiameter.toFixed(2)}m × ${values.txttotalTankDepth.toFixed(2)}m`;

    // Set tank dimensions
    const dimensionField = document.getElementById('txtTankDimensions2');
    if (!dimensionField) {
      throw new Error("Tank dimensions field 'txtTankDimensions2' not found.");
    }
    dimensionField.value = dimensionString;

    // Map values to report fields
    const valueMap = {
      txtAvFlowratecmd: 'txtAvFlowratecmd2',
      txtPkFlowratecmd: 'txtPkFlowratecmd2',
      chosenpumpflowrate: 'chosenpumpflowrate2',
      txtpumpON: 'txtpumpON2',
      txtpumpOFF: 'txtpumpOFF2'
    };

    // Copy values to report
    for (const [sourceId, targetId] of Object.entries(valueMap)) {
      const target = document.getElementById(targetId);
      if (!target) {
        throw new Error(`Report field with ID '${targetId}' not found.`);
      }
      target.value = inputs[sourceId].value;
    }

    // Show report section
    const reportEl = document.getElementById('reportSection');
    if (!reportEl) {
      throw new Error("Report section with ID 'reportSection' not found.");
    }
    reportEl.style.display = 'block';
    reportEl.scrollIntoView({ behavior: 'smooth' });

  } catch (error) {
    console.error("Error generating report:", error);
    alert(`Error generating report: ${error.message}`);
  }
}

// Add event listener for the Generate Report button
document.addEventListener('DOMContentLoaded', () => {
  const generateButton = document.getElementById('generate-report-btn');
  if (generateButton) {
    generateButton.addEventListener('click', generateReport);
  } else {
    console.error("Generate Report button with ID 'generate-report-btn' not found.");
  }
});

// Function to print the report
function printReport() {
  try {
    // Update the report first
    generateReport();

    // Verify report section exists
    const reportSection = document.getElementById('reportSection');
    if (!reportSection) {
      throw new Error("Report section with ID 'reportSection' not found.");
    }

    // Create a clone of the report section
    const reportClone = reportSection.cloneNode(true);

    // Remove elements we don't want in print
    const elementsToRemove = [
      reportClone.querySelector('.print-button'),
      reportClone.querySelector('.project-info')
    ];
    elementsToRemove.forEach(element => {
      if (element) element.remove();
    });

    // Replace readonly inputs with spans for printing
    const readonlyInputs = reportClone.querySelectorAll('input[readonly]');
    readonlyInputs.forEach(input => {
      const span = document.createElement('span');
      span.textContent = input.value || 'N/A';
      span.style.display = 'inline-block';
      span.style.padding = '8px';
      span.style.textAlign = 'center';
      span.style.boxSizing = 'border-box';
      input.parentNode.replaceChild(span, input);
    });

    // Get project details with validation
    const projectNameEl = document.getElementById('projectName');
    const projectNumberEl = document.getElementById('projectNumber');
    const projectDateEl = document.getElementById('projectDate');
    const projectVersionEl = document.getElementById('projectVersion');
    const brandNameEl = document.getElementById('brandName'); // New field
    const modelNameEl = document.getElementById('modelName'); // New field

    if (!projectNameEl || !projectNumberEl || !projectDateEl || !projectVersionEl) {
      throw new Error("One or more project detail fields are missing.");
    }

    const projectName = projectNameEl.value || 'Unnamed Project';
    const projectNumber = projectNumberEl.value || 'N/A';
    const projectDate = projectDateEl.value || new Date().toISOString().slice(0, 10);
    const projectVersion = projectVersionEl.value || '1.0';
    const brandName = brandNameEl ? brandNameEl.value || 'N/A' : 'N/A'; // Handle if fields don't exist
    const modelName = modelNameEl ? modelNameEl.value || 'N/A' : 'N/A';

    // Create print window
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      throw new Error("Failed to open print window. Please allow pop-ups for this site.");
    }

    printWindow.document.write(`
      <html>
        <head>
          <title></title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { color: #003366; text-align: center; margin-bottom: 5px; }
            h3 { color: #004080; margin-top: 25px; }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: center; }
            th { background-color: #f2f2f2; }
            .project-header { margin-bottom: 20px; }
            .project-details { 
              display: flex; 
              justify-content: space-between; 
              flex-wrap: wrap;
              margin-bottom: 20px; 
              font-size: 14px;
            }
            .project-details .column {
              display: flex;
              flex-direction: column;
              min-width: 200px;
            }
            .project-details .column div {
              margin: 5px 0;
            }
            @page { size: auto; margin: 10mm; }
          </style>
        </head>
        <body>
          <div class="project-header">
            <h1></h1>
            <div class="project-details">
              <div class="column">
                <div><strong>Project:</strong> ${projectName}</div>
                <div><strong>Brand:</strong> ${brandName}</div>
                <div><strong>Model:</strong> ${modelName}</div>
              </div>
              <div class="column">
                <div><strong>Number:</strong> ${projectNumber}</div>
                <div><strong>Date:</strong> ${projectDate}</div>
                <div><strong>Version:</strong> ${projectVersion}</div>
              </div>
            </div>
          </div>
          ${reportClone.innerHTML}
          <script>
            window.onload = function() {
              setTimeout(function() {
                window.print();
                setTimeout(function() { window.close(); }, 500);
              }, 500);
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  } catch (error) {
    console.error("Error printing report:", error);
    alert(`Error printing report: ${error.message}`);
  }
}

// Add event listener for the Print Report button
document.addEventListener('DOMContentLoaded', () => {
  const printButton = document.getElementById('print-report-btn');
  if (printButton) {
    printButton.addEventListener('click', printReport);
  } else {
    console.error("Print Report button with ID 'print-report-btn' not found.");
  }
});

// Initialize event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('calculate-btn').addEventListener('click', calculate);
  document.getElementById('reset-btn').addEventListener('click', resetForm);
  document.getElementById('example-btn').addEventListener('click', fillExample);
});


document.addEventListener('DOMContentLoaded', function () {
    // ==================== TANK VISUALIZATION ====================
    const tankCanvas = document.getElementById('tankCanvas');
    const tankCtx = tankCanvas.getContext('2d');
    const drawTankBtn = document.getElementById('draw-tank-btn'); // Changed ID
    const volumeDisplay = document.getElementById('volume');
    const areaDisplay = document.getElementById('area');
    const cylindricalInputs = document.getElementById('cylindrical-inputs');

    // Tank Visualization Functions
    function resizeTankCanvas() {
        const container = document.querySelector('.canvas-container');
        tankCanvas.width = Math.min(container.clientWidth, 800);
        tankCanvas.height = Math.min(container.clientWidth * 0.6, 500);
        drawTank();
    }

    function updateTankCalculations() {
        const diameter = parseInt(document.getElementById('diameter').value) || 0;
        const depth = parseInt(document.getElementById('cyl-depth').value) || 0;
        const radius = diameter / 2;
        const area = Math.PI * radius * radius;
        const volume = area * depth;

        areaDisplay.textContent = Math.round(area).toLocaleString();
        volumeDisplay.textContent = Math.round(volume).toLocaleString();
        return { area, volume };
    }

    function drawTank() {
        tankCtx.clearRect(0, 0, tankCanvas.width, tankCanvas.height);
        drawCylindricalTank();
    }

    function drawCylindricalTank() {
        const diameter = parseInt(document.getElementById('diameter').value) || 60;
        const depth = parseInt(document.getElementById('cyl-depth').value) || 40;
        const radius = diameter / 2;

        updateTankCalculations();

        const maxDimension = Math.max(diameter * 2, depth * 2);
        const scale = Math.min(tankCanvas.width, tankCanvas.height) / (maxDimension * 1.5);
        const centerX = tankCanvas.width / 2;
        const centerY = tankCanvas.height / 2 + 50;

        const angle = Math.PI / 6;
        const cosAngle = Math.cos(angle);
        const sinAngle = Math.sin(angle);

        function project(x, y, z) {
            const isoX = (x - z) * cosAngle;
            const isoY = y + (x + z) * sinAngle;
            return {
                x: centerX + isoX * scale,
                y: centerY - isoY * scale
            };
        }

        tankCtx.strokeStyle = '#333';
        tankCtx.lineWidth = 2;
        const segments = 36;

        // Draw top ellipse
        tankCtx.beginPath();
        for (let i = 0; i <= segments; i++) {
            const theta = (i / segments) * Math.PI * 2;
            const x = Math.cos(theta) * radius;
            const z = Math.sin(theta) * radius;
            const y = depth / 2;
            const point = project(x, y, z);
            i === 0 ? tankCtx.moveTo(point.x, point.y) : tankCtx.lineTo(point.x, point.y);
        }
        tankCtx.stroke();

        // Draw bottom ellipse
        tankCtx.beginPath();
        for (let i = 0; i <= segments; i++) {
            const theta = (i / segments) * Math.PI * 2;
            const x = Math.cos(theta) * radius;
            const z = Math.sin(theta) * radius;
            const y = -depth / 2;
            const point = project(x, y, z);
            i === 0 ? tankCtx.moveTo(point.x, point.y) : tankCtx.lineTo(point.x, point.y);
        }
        tankCtx.stroke();

        // Draw vertical edges
        for (let i = 0; i < segments; i += segments / 4) {
            const theta = (i / segments) * Math.PI * 2;
            const x = Math.cos(theta) * radius;
            const z = Math.sin(theta) * radius;

            const topPoint = project(x, depth / 2, z);
            const bottomPoint = project(x, -depth / 2, z);

            tankCtx.beginPath();
            tankCtx.moveTo(topPoint.x, topPoint.y);
            tankCtx.lineTo(bottomPoint.x, bottomPoint.y);
            tankCtx.stroke();
        }

        // Draw filled side view
        tankCtx.fillStyle = 'rgba(100, 150, 255, 0.3)';
        tankCtx.beginPath();
        for (let i = 0; i <= segments / 2; i++) {
            const theta = (i / segments) * Math.PI * 2;
            const x = Math.cos(theta) * radius;
            const z = Math.sin(theta) * radius;
            const y = depth / 2;
            const point = project(x, y, z);
            i === 0 ? tankCtx.moveTo(point.x, point.y) : tankCtx.lineTo(point.x, point.y);
        }
        for (let i = segments / 2; i >= 0; i--) {
            const theta = (i / segments) * Math.PI * 2;
            const x = Math.cos(theta) * radius;
            const z = Math.sin(theta) * radius;
            const y = -depth / 2;
            const point = project(x, y, z);
            tankCtx.lineTo(point.x, point.y);
        }
        tankCtx.closePath();
        tankCtx.fill();
        tankCtx.stroke();

        // Labels
        tankCtx.fillStyle = '#333';
        tankCtx.font = '14px Arial';
        tankCtx.textAlign = 'center';

        const diameterLabelPos = project(0, -depth / 2 - 10, 0);
        tankCtx.fillText(`Diameter: ${diameter}`, diameterLabelPos.x, diameterLabelPos.y);

        const depthLabelPos = project(-radius - 15, 0, -radius - 10);
        tankCtx.fillText(`Depth: ${depth}`, depthLabelPos.x, depthLabelPos.y);
    }

    // ==================== PLAN VISUALIZATION ====================
    const planCanvas = document.getElementById('planCanvas');
    const planCtx = planCanvas.getContext('2d');
    const drawPlanBtn = document.getElementById('draw-plan-btn'); // Changed ID
    const pumpSpacingInput = document.getElementById('pump-spacing');
    const pumpToEdgeInput = document.getElementById('pump-to-edge');

    function resizePlanCanvas() {
        const container = document.querySelector('.form-container');
        planCanvas.width = container.clientWidth - 40;
        planCanvas.height = 500;
    }

    function drawPlan() {
        const diameter = parseFloat(document.getElementById('circle-diameter').value) || 1.3;
        const rectLength = parseFloat(document.getElementById('rect-length').value) || 0.9;
        const rectWidth = parseFloat(document.getElementById('rect-width').value) || 0.6;
        const pumpLength = parseFloat(document.getElementById('pump-length').value) || 0.3;
        const pumpWidth = parseFloat(document.getElementById('pump-width').value) || 0.3;
        const numPumps = parseInt(document.getElementById('num-pumps').value) || 2;

        // Calculate distances
        const spacing = numPumps > 1 ? (rectLength - numPumps * pumpLength) / (numPumps + 1) : 0;
        const pumpToEdge = (diameter - rectLength) / 2;

        // Update readonly inputs
        pumpSpacingInput.value = numPumps > 1 ? spacing.toFixed(2) : 'N/A';
        pumpToEdgeInput.value = pumpToEdge.toFixed(2);

        planCtx.clearRect(0, 0, planCanvas.width, planCanvas.height);

        // Calculate scale to fit entire circle with padding
        const padding = 50;
        const scale = Math.min(
            (planCanvas.width - padding * 2) / diameter,
            (planCanvas.height - padding * 2) / diameter
        );
        const centerX = planCanvas.width / 2;
        const centerY = planCanvas.height / 2;
        const radius = (diameter / 2) * scale;

        // Draw Grid
        const gridStep = 0.1 * scale;
        planCtx.beginPath();
        planCtx.strokeStyle = '#e0e0e0';
        planCtx.lineWidth = 0.5;
        for (let x = centerX - radius; x <= centerX + radius; x += gridStep) {
            planCtx.moveTo(x, centerY - radius);
            planCtx.lineTo(x, centerY + radius);
        }
        for (let y = centerY - radius; y <= centerY + radius; y += gridStep) {
            planCtx.moveTo(centerX - radius, y);
            planCtx.lineTo(centerX + radius, y);
        }
        planCtx.stroke();

        // Draw Axes
        planCtx.beginPath();
        planCtx.strokeStyle = '#000000';
        planCtx.lineWidth = 1;
        planCtx.moveTo(centerX - radius, centerY);
        planCtx.lineTo(centerX + radius, centerY);
        planCtx.moveTo(centerX, centerY - radius);
        planCtx.lineTo(centerX, centerY + radius);
        planCtx.stroke();

        // Draw Axis Labels
        planCtx.font = '12px Arial';
        planCtx.fillStyle = '#000000';
        planCtx.textAlign = 'center';
        planCtx.textBaseline = 'top';
        for (let x = -diameter / 2; x <= diameter / 2; x += 0.1) {
            const canvasX = centerX + x * scale;
            planCtx.fillText(x.toFixed(1), canvasX, centerY + 5);
        }
        planCtx.textAlign = 'right';
        planCtx.textBaseline = 'middle';
        for (let y = -diameter / 2; y <= diameter / 2; y += 0.1) {
            const canvasY = centerY - y * scale;
            planCtx.fillText(y.toFixed(1), centerX - 5, canvasY);
        }

        // Draw Circle
        planCtx.beginPath();
        planCtx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        planCtx.strokeStyle = '#0077cc';
        planCtx.lineWidth = 2;
        planCtx.stroke();

        // Draw Rectangle
        const rectScaledLength = rectLength * scale;
        const rectScaledWidth = rectWidth * scale;
        const rectLeft = centerX - rectScaledLength / 2;
        const rectTop = centerY - rectScaledWidth / 2;
        planCtx.beginPath();
        planCtx.rect(rectLeft, rectTop, rectScaledLength, rectScaledWidth);
        planCtx.strokeStyle = '#cc3300';
        planCtx.lineWidth = 2;
        planCtx.stroke();

        // Draw Pumps
        const pumpScaledLength = pumpLength * scale;
        const pumpScaledWidth = pumpWidth * scale;
        const spacingScaled = spacing * scale;

        for (let i = 0; i < numPumps; i++) {
            const pumpX = rectLeft + spacingScaled * (i + 1) + pumpScaledLength * i;
            const pumpY = centerY - pumpScaledWidth / 2;
            planCtx.beginPath();
            planCtx.rect(pumpX, pumpY, pumpScaledLength, pumpScaledWidth);
            planCtx.fillStyle = 'rgba(0, 150, 0, 0.5)';
            planCtx.fill();
            planCtx.strokeStyle = '#006600';
            planCtx.stroke();
        }
    }

    // ==================== INITIALIZATION ====================
    // Tank Visualization Setup
    cylindricalInputs.style.display = 'flex';
    updateTankCalculations();
    resizeTankCanvas();
    window.addEventListener('resize', resizeTankCanvas);
    drawTankBtn.addEventListener('click', drawTank);
    document.getElementById('diameter').addEventListener('input', updateTankCalculations);
    document.getElementById('cyl-depth').addEventListener('input', updateTankCalculations);

    // Plan Visualization Setup
    resizePlanCanvas();
    drawPlan();
    drawPlanBtn.addEventListener('click', () => {
        resizePlanCanvas();
        drawPlan();
    });
    window.addEventListener('resize', () => {
        resizePlanCanvas();
        drawPlan();
    });
});