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
  document.getElementById('results').innerHTML = '';
}

// Fill form with example data

function fillExample() {
  const exampleValues = {
    // Flow parameters

    'txtinfluentMPN_coeff': 10,
    'txtinfluentMPN_exp': 9,    // Will display as 10 × 10^9 (1,000,000,000)
    'txteffluentMPN_coeff': 10,
    'txteffluentMPN_exp': 4,    // Will display as 10 × 10^4 (10,000)
    'txtFlowrateCl': 22700,
    'txtinfluentMPN': 1000000000,
    'txteffluentMPN': 10000,
    'txtCCT': 30,
    'CTb': 4,
    'nvalue': 2.8,
    'txtImmediateCldemand': 2,
    'txtChlorinedemandduetodecay': 2.5,
    'txtClStoragedays': 1
  };

  for (const [id, value] of Object.entries(exampleValues)) {
    const element = document.getElementById(id);
    if (element) {
      element.value = value;
    } else {
      console.warn(`Element with ID '${id}' not found`);
    }
  }
}

// Main calculation function
function calculate() {
  try {
    // Get all input values
    const inputs = {
      txtFlowrateCl: getValue('txtFlowrateCl'),
      txtinfluentMPN: getValue('txtinfluentMPN'),
      txteffluentMPN: getValue('txteffluentMPN'),
      txtCCT: getValue('txtCCT'),
      CTb: getValue('CTb'),
      nvalue: getValue('nvalue'),
      txtImmediateCldemand: getValue('txtImmediateCldemand'),
      txtChlorinedemandduetodecay: getValue('txtChlorinedemandduetodecay'),
      txtClStoragedays: getValue('txtClStoragedays')
    };

    // Calculate water level difference
    const txtCldoseColiform = (inputs.CTb * (1 / inputs.txtCCT) * Math.pow(inputs.txteffluentMPN / inputs.txtinfluentMPN, (1 / inputs.nvalue) * (-1)));
    const txtTotalChlorineDose = inputs.txtImmediateCldemand + inputs.txtChlorinedemandduetodecay + txtCldoseColiform;
    const txtNaOClkgd = txtTotalChlorineDose * (inputs.txtFlowrateCl / 1000);
    const txtNaOClLhr = Math.round(((txtNaOClkgd * (100 / 7)) / 1.1) / 24 * 10000) / 10000; // Round to 4 decimal places
    const txtNaOClLday = txtNaOClLhr * 24;
    const txtClStorageTank = txtNaOClLday * inputs.txtClStoragedays / 1000;
    // BOD Oxygen Transfer Rate calculations



    // Prepare output values
    const outputFields = {
      txtCldoseColiform,
      txtTotalChlorineDose,
      txtNaOClkgd,
      txtNaOClLhr,
      txtNaOClLday,
      txtClStorageTank,
    };

    // Update DOM with results
    for (const [id, value] of Object.entries(outputFields)) {
      const el = document.getElementById(id);
      if (el) {
        el.value = value.toFixed(2);
      } else {
        document.getElementById('results').innerHTML += `<div class="result">${id}: ${value.toFixed(2)}</div>`;
      }
    }

  } catch (error) {
    console.error("Calculation error:", error);
    document.getElementById('results').innerHTML = `
      <div class="error">Error in calculations: ${error.message}</div>
    `;
  }
}



//Scientific values

// Add this to your existing JavaScript
function setupScientificInputs() {
  const scientificInputs = document.querySelectorAll('.scientific-input');
  
  scientificInputs.forEach(container => {
    const coeffInput = container.querySelector('input[type="number"]:not([id*="exp"])');
    const expInput = container.querySelector('input[type="number"][id*="exp"]');
    const hiddenInput = container.querySelector('input[type="hidden"]');
    
    function updateValue() {
      const coefficient = parseFloat(coeffInput.value) || 0;
      const exponent = parseFloat(expInput.value) || 0;
      hiddenInput.value = coefficient * Math.pow(10, exponent);
    }
    
    coeffInput.addEventListener('input', updateValue);
    expInput.addEventListener('input', updateValue);
  });
}

// Call this when the page loads
document.addEventListener('DOMContentLoaded', setupScientificInputs);



 // Function to generate the report
  function generateReport() {
  try {
    // Map input fields to report fields
    const valueMap = {
      'txtFlowrateCl': 'txtFlowrateCl2',
      'txtTotalChlorineDose': 'txtTotalChlorineDose2',
      'txtNaOClLhr': 'txtNaOClLhr2',
      'txtClStoragedays': 'txtClStoragedays2',
      'txtClStorageTank': 'txtClStorageTank2',


    };

    // Copy values from input fields to report fields
    for (const [sourceId, targetId] of Object.entries(valueMap)) {
      const source = document.getElementById(sourceId);
      const target = document.getElementById(targetId);
      if (source && target) {
        target.value = source.value;
      }
    }

    // Show the report section
    const reportEl = document.getElementById('reportSection');
    if (reportEl) {
      reportEl.style.display = 'block';
      reportEl.scrollIntoView({ behavior: 'smooth' });
    }

  } catch (error) {
    console.error("Error generating report:", error);
    alert("Error generating report. Please check console for details.");
  }
}

function printReport() {
  try {
    // Update the report first
    generateReport();

    // Verify report section exists
    const reportSection = document.getElementById('reportSection');
    if (!reportSection) {
      throw new Error("Report section with ID 'reportSection' not found.");
    }

    // Get project and chlorine dosing pump details BEFORE creating the clone
    const projectName = document.getElementById('projectName').value || 'Unnamed Project';
    const projectNumber = document.getElementById('projectNumber').value || 'N/A';
    const projectDate = document.getElementById('projectDate').value || new Date().toISOString().slice(0, 10);
    const projectVersion = document.getElementById('projectVersion').value || '1.0';
    const pumpName = document.getElementById('pumpName') ? document.getElementById('pumpName').value || 'N/A' : 'N/A';
    const pumpType = document.getElementById('pumpType') ? document.getElementById('pumpType').value || 'N/A' : 'N/A';
    const brand = document.getElementById('brand') ? document.getElementById('brand').value || 'N/A' : 'N/A';
    const model = document.getElementById('model') ? document.getElementById('model').value || 'N/A' : 'N/A';
    const duty = document.getElementById('duty') ? document.getElementById('duty').value || 'N/A' : 'N/A';
    const standby = document.getElementById('standby') ? document.getElementById('standby').value || 'N/A' : 'N/A';
    const powerConsumption = document.getElementById('powerConsumption') ? document.getElementById('powerConsumption').value || 'N/A' : 'N/A';

    // Create a clone of the report section
    const reportClone = reportSection.cloneNode(true);

    // Remove elements we don't want in print
    const elementsToRemove = [
      reportClone.querySelector('.print-button'),
      reportClone.querySelector('.project-info'),
      reportClone.querySelector('.chlorine-pump-info'),
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
          <!-- Chlorine Dosing Pump Details Table -->
          <h3>Chlorine Dosing Pump Details</h3>
          <table border="1" cellpadding="5" cellspacing="0">
            <thead>
              <tr>
                <th>Parameter</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Pump Name</td>
                <td>${pumpName}</td>
              </tr>
              <tr>
                <td>Pump Type</td>
                <td>${pumpType}</td>
              </tr>
              <tr>
                <td>Brand</td>
                <td>${brand}</td>
              </tr>
              <tr>
                <td>Model</td>
                <td>${model}</td>
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