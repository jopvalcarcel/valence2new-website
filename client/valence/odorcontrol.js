// odorcontrol.js
// Helper function to safely get numeric values from inputs
function getValue(id) {
  const element = document.getElementById(id);
  if (!element) {
    console.warn(`Element with ID '${id}' not found`);
    return 0;
  }
  return parseFloat(element.value) || 0;
}

// Reset form to empty state
function resetForm() {
  document.querySelectorAll('input[type="number"]').forEach(input => {
    if (!input.hasAttribute('readonly')) {
      input.value = '';
    }
  });
  document.querySelectorAll('input[type="text"]').forEach(input => {
    if (!input.classList.contains('tank-name')) {
      input.value = '';
    }
  });
  
  // Reset tank inputs to just one empty row
  const tankInputs = document.getElementById('tankInputs');
  tankInputs.innerHTML = `
    <div class="tank-row">
      <label>Tank Name <input type="text" class="tank-name" placeholder="e.g., Equalization Tank"></label>
      <label>Volume (m³) <input type="number" class="tank-volume" min="0" step="0.1"></label>
      <button class="remove-tank" onclick="removeTank(this)">×</button>
    </div>
  `;
}

// Add example values
function fillExample() {
  resetForm();
  
  // Add example tanks
  const exampleTanks = [
    { name: "Oil and Grease Tank", volume: 150 },
    { name: "Primary Clrarifier", volume: 200 },
    { name: "Anoxic Tank", volume: 300 }
  ];
  
  const tankInputs = document.getElementById('tankInputs');
  tankInputs.innerHTML = '';
  
  exampleTanks.forEach((tank, index) => {
    const tankRow = document.createElement('div');
    tankRow.className = 'tank-row';
    tankRow.innerHTML = `
      <label>Tank Name <input type="text" class="tank-name" value="${tank.name}"></label>
      <label>Volume (m³) <input type="number" class="tank-volume" min="0" step="0.1" value="${tank.volume}"></label>
      <button class="remove-tank" onclick="removeTank(this)">×</button>
    `;
    tankInputs.appendChild(tankRow);
  });
  
  // Set other example values
  document.getElementById('airChanges').value = 12;
  document.getElementById('safetyFactor').value = 20;
}

// Add a new tank input row
function addTank() {
  const tankInputs = document.getElementById('tankInputs');
  const newRow = document.createElement('div');
  newRow.className = 'tank-row';
  newRow.innerHTML = `
    <label>Tank Name <input type="text" class="tank-name" placeholder="e.g., Equalization Tank"></label>
    <label>Volume (m³) <input type="number" class="tank-volume" min="0" step="0.1"></label>
    <button class="remove-tank" onclick="removeTank(this)">×</button>
  `;
  tankInputs.appendChild(newRow);
}

// Remove a tank input row
function removeTank(button) {
  const tankRows = document.querySelectorAll('.tank-row');
  if (tankRows.length > 1) {
    button.parentElement.remove();
  } else {
    alert("You need at least one tank for calculation.");
  }
}

// Main calculation function
function calculate() {
  try {
    // Get all tank volumes
    const tankVolumes = Array.from(document.querySelectorAll('.tank-volume')).map(input => parseFloat(input.value) || 0);
    const totalVolume = tankVolumes.reduce((sum, volume) => sum + volume, 0);
    
    // Get other parameters
    const airChangesPerHour = getValue('airChanges');
    const safetyFactor = getValue('safetyFactor');
    
    // Perform calculations
    const airFlowHour = totalVolume * airChangesPerHour;
    const airFlowMinute = airFlowHour / 60;
    const finalCapacity = airFlowMinute * (1 + (safetyFactor / 100));
    
    // Update output fields
    document.getElementById('totalVolume').value = totalVolume.toFixed(2);
    document.getElementById('airFlowHour').value = airFlowHour.toFixed(2);
    document.getElementById('airFlowMinute').value = airFlowMinute.toFixed(2);
    document.getElementById('finalCapacity').value = finalCapacity.toFixed(2);
    
  } catch (error) {
    console.error("Calculation error:", error);
    alert("An error occurred during calculation. Please check your inputs.");
  }
}

// Function to generate the report
function generateReport() {
  try {
    // Get all tank data
    const tankNames = Array.from(document.querySelectorAll('.tank-name')).map(input => input.value || "Unnamed Tank");
    const tankVolumes = Array.from(document.querySelectorAll('.tank-volume')).map(input => parseFloat(input.value) || 0);
    
    // Populate tank table in report
    const reportTankTable = document.getElementById('reportTankTable');
    reportTankTable.innerHTML = '';
    
    tankNames.forEach((name, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td><input type="text" value="${name}" readonly></td>
        <td><input type="text" value="${tankVolumes[index].toFixed(2)}" readonly></td>
      `;
      reportTankTable.appendChild(row);
    });
    
    // Map other values to report
    const valueMap = {
      'totalVolume': 'reportTotalVolume',
      'airChanges': 'reportAirChanges',
      'airFlowMinute': 'reportAirFlow',
      'safetyFactor': 'reportSafetyFactor',
      'finalCapacity': 'reportFinalCapacity'
    };
    
    for (const [sourceId, targetId] of Object.entries(valueMap)) {
      const source = document.getElementById(sourceId);
      const target = document.getElementById(targetId);
      if (source && target) {
        target.value = source.value;
      }
    }
    
    // Show the report
    const reportEl = document.getElementById('reportSection');
    if (reportEl) {
      reportEl.style.display = 'block';
      reportEl.scrollIntoView({ behavior: 'smooth' });
    }
    
  } catch (error) {
    console.error("Error generating report:", error);
    alert("An error occurred while generating the report.");
  }
}

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

    // Get project and odor control details BEFORE creating the clone
    const projectName = document.getElementById('projectName').value || 'Unnamed Project';
    const projectNumber = document.getElementById('projectNumber').value || 'N/A';
    const projectDate = document.getElementById('projectDate').value || new Date().toISOString().slice(0, 10);
    const projectVersion = document.getElementById('projectVersion').value || '1.0';
    const odorControlName = document.getElementById('odorControlName') ? document.getElementById('odorControlName').value || 'N/A' : 'N/A';
    const odorControlType = document.getElementById('odorControlType') ? document.getElementById('odorControlType').value || 'N/A' : 'N/A';
    const odorControlBrand = document.getElementById('odorControlBrand') ? document.getElementById('odorControlBrand').value || 'N/A' : 'N/A';
    const duty = document.getElementById('duty') ? document.getElementById('duty').value || 'N/A' : 'N/A';
    const standby = document.getElementById('standby') ? document.getElementById('standby').value || 'N/A' : 'N/A';
    const powerConsumption = document.getElementById('powerConsumption') ? document.getElementById('powerConsumption').value || 'N/A' : 'N/A';

    // Create a clone of the report section
    const reportClone = reportSection.cloneNode(true);

    // Remove elements we don't want in print
    const elementsToRemove = [
      reportClone.querySelector('.print-button'),
      reportClone.querySelector('.project-info'),
      reportClone.querySelector('.odor-control-info'),
      reportClone.querySelector('h1') // Remove the Design Report header
    ];
    elementsToRemove.forEach(element => {
      if (element) element.remove();
    });

    // Replace readonly inputs with spans for printing
    const inputs = reportClone.querySelectorAll('input[readonly]');
    inputs.forEach(input => {
      const span = document.createElement('span');
      span.textContent = input.value || 'N/A';
      span.style.display = 'inline-block';
      span.style.width = '100%';
      span.style.padding = '5px';
      span.style.textAlign = 'center';
      input.parentNode.replaceChild(span, input);
    });

    // Create print window
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      throw new Error("Failed to open print window. Please allow pop-ups for this site.");
    }

    printWindow.document.write(`
      <html>
        <head>
          <title>Design Report</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { color: #003366; text-align: center; margin-bottom: 5px; }
            h3 { color: #004080; margin-top: 25px; }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; margin-bottom: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
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
            <h1>Design Report</h1>
            <div class="project-details">
              <div class="column">
                <div><strong>Project:</strong> ${projectName}</div>
                <div><strong>Number:</strong> ${projectNumber}</div>
              </div>
              <div class="column">
                <div><strong>Date:</strong> ${projectDate}</div>
                <div><strong>Version:</strong> ${projectVersion}</div>
              </div>
            </div>
          </div>
          <!-- Odor Control Details Table -->
          <h3>Odor Control Details</h3>
          <table border="1" cellpadding="5" cellspacing="0">
            <thead>
              <tr>
                <th>Parameter</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Name</td>
                <td>${odorControlName}</td>
              </tr>
              <tr>
                <td>Type</td>
                <td>${odorControlType}</td>
              </tr>
              <tr>
                <td>Brand</td>
                <td>${odorControlBrand}</td>
              </tr>
              <tr>
                <td>Duty</td>
                <td>${duty}</td>
              </tr>
              <tr>
                <td>Standby</td>
                <td>${standby}</td>
              </tr>
              <tr>
                <td>Power Consumption (kW)</td>
                <td>${powerConsumption}</td>
              </tr>
            </tbody>
          </table>
          ${reportClone.innerHTML}
          
          <script>
            window.onload = function() {
              setTimeout(function() {
                window.print();
                setTimeout(function() { window.close(); }, 200);
              }, 200);
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