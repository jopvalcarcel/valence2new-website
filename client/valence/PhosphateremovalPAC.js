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
    // PACl parameters
    'txtPAClTP': 10,
    'txtPAClQ': 3800,
    'txtPAClSPin': 9,
    'txtPAClSPres': 3,
    'txtPACldosingRatio': 1.5,
    'txtPACldetentiontime': 7,

    
    'stdays': 7,

    'txtTPin': 10,
    'Txtflowrate7': 3800,
    'txtCPin': 9,
    'txtCPres': 3,
    'txtMP': 0.2,
    'txtpcnt': 34.4,
    'txtpcntsoln': 37,
    'txtdensity': 1.35




  };

  // Apply values to form inputs
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
      txtPAClTP: getValue('txtPAClTP'),
      txtPAClQ: getValue('txtPAClQ'),
      txtPAClSPin: getValue('txtPAClSPin'),
      txtPAClSPres: getValue('txtPAClSPres'),
      txtPACldosingRatio: getValue('txtPACldosingRatio'),
      txtPACldetentiontime: getValue('txtPACldetentiontime'),

      
      stdays: getValue('stdays'),


       txtTPin: getValue('txtTPin'),
      Txtflowrate7: getValue('Txtflowrate7'),
      txtCPin: getValue('txtCPin'),
      txtCPres: getValue('txtCPres'),
      txtMP: getValue('txtMP'),
      txtpcnt: getValue('txtpcnt'),
      txtpcntsoln: getValue('txtpcntsoln'),
      txtdensity: getValue('txtdensity')
    };

    // PACl Dosing
    const txtCalconsumption = (1 / 31) * (inputs.txtPAClSPin - inputs.txtPAClSPres) * (inputs.txtPACldosingRatio * 27);
    const txtPAClEfficiency = 100 * (inputs.txtPAClSPin - inputs.txtPAClSPres) / inputs.txtPAClSPin;
    const txtPAClunitconsumption = txtCalconsumption * (3 * 16 + 27 * 2) / (27 * 2) / (1.2 * 0.1);
     const txtPACldosinLperd = inputs.txtPAClQ * txtPAClunitconsumption / 1000;
     const txtPACTPef = inputs.txtPAClTP - inputs.txtPAClSPin + inputs.txtPAClSPres;
     const txtPACldosinLperhr = txtPACldosinLperd / 24;
     const txtPACldosinLkgd = txtPACldosinLperd * 1.2;
    const txtPAClvolumerpertank = 0.001 * txtPACldosinLperd * inputs.txtPACldetentiontime 
//FeCl3 Dosing

  const txtdr = inputs.txtMP * (inputs.txtCPin - inputs.txtCPres) * (55.85 / 30.97);
  const txtTPef = inputs.txtTPin - inputs.txtCPin + inputs.txtCPres;
  const txtkgd = inputs.Txtflowrate7 * txtdr * (1 / 1000);
  const txtkdsol = (txtkgd / 34.4) * 100;
  const txtLd = txtkdsol / ((inputs.txtpcntsoln / 100) * inputs.txtdensity);
  const txtstv = (txtkdsol / ((inputs.txtpcntsoln / 100) * inputs.txtdensity)) * inputs.stdays * (1 / 1000);
  const txtLhr = txtLd / 24;

    // BOD Oxygen Transfer Rate calculations



    // Prepare output values
    const outputFields = {
      txtCalconsumption,
      txtPAClEfficiency,
      txtPAClunitconsumption,
      txtPACldosinLperd,
      txtPACTPef,
      txtPACldosinLperhr,
      txtPACldosinLkgd,
      txtPAClvolumerpertank,
      txtPAClvolumerpertank,
      txtdr,
      txtTPef,
      txtkgd,
      txtkdsol,
      txtLd,
      txtstv,
      txtLhr,






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






 // Function to generate the report
  function generateReport() {
  try {
    // Map input fields to report fields
    const valueMap = {
      'txtPAClQ': 'txtPAClQ2',
      'txtPAClTP': 'txtPAClTP2',
      'txtPAClSPin': 'txtPAClSPin2',
      'txtPAClSPres': 'txtPAClSPres2',
      'txtPACldosingRatio': 'txtPACldosingRatio2',
      'txtPACldosinLperhr': 'txtPACldosinLperhr2',
      'txtPACldetentiontime': 'txtPACldetentiontime2',
      'txtPAClvolumerpertank': 'txtPAClvolumerpertank2',

         'txtdr': 'txtdr2',
          'txtLhr': 'txtLhr2',
          'stdays': 'stdays2',
          'txtstv': 'txtstv2',


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

    // Get project and chemical dosing pump details BEFORE creating the clone
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
      reportClone.querySelector('.chemical-pump-info'),
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
          <!-- Chemical Dosing Pump Details Table -->
          <h3>Chemical Dosing Pump Details</h3>
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