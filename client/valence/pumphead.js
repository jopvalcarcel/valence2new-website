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

function fillExample() {
  const exampleValues = {
    'txtPumpFlowrate':1,
    'txtPumpVelocity': 0.6083,
    'txtDensity': 998,
    'txtkinematicviscosity': 0.001005,
    'txtPumpPipefff': 0.0051,
    'txtroughness': 0.000046,
    'txtPumpPipeTotalLenghtArea': 170,
    'pumphoursoperation': 24,
    'ElevationChange': 15,
    'elbow90': 2,
    'pumpefficiency': 65,
    'pumphoursoperation':24



  };

  for (const [id, value] of Object.entries(exampleValues)) {
    const element = document.getElementById(id);
    if (element) {
      element.value = value;
    }
  }
}

// Main calculation function
function calculate() {
  try {
    // Get all input values
    const inputs = {
       txtPumpFlowrate: getValue('txtPumpFlowrate'),
      txtPumpVelocity: getValue('txtPumpVelocity'),
      txtDensity: getValue('txtDensity'),
      txtkinematicviscosity: getValue('txtkinematicviscosity'),
      txtPumpPipefff: getValue('txtPumpPipefff'),
      txtroughness: getValue('txtroughness'),
      txtPumpPipeTotalLenghtArea: getValue('txtPumpPipeTotalLenghtArea'),
      pumphoursoperation: getValue('pumphoursoperation'),



      // System parameters
      ElevationChange: getValue('ElevationChange'),
      elbow90: getValue('elbow90'),
      pumpefficiency: getValue('pumpefficiency')

 };
    // Perform all calculations
// Calculate vs (settling velocity)
// Calculate total volume

       // Flow rate calculations
    const txtPumpFlowratepers = inputs.txtPumpFlowrate / 60;
    const txtPumpFlowrateperhour = inputs.txtPumpFlowrate * 60;
    const txtPumpFlowrateperday = inputs.txtPumpFlowrate * 60 * 24;
     let txtPumpcomputedArea = inputs.txtPumpFlowrate * (1 / 60) / inputs.txtPumpVelocity;


   let txtPumpPipeDN = "";
    if (txtPumpcomputedArea < 0.0000669) {
        txtPumpPipeDN = "DN 8";
    } else if (txtPumpcomputedArea < 0.0001232) {
        txtPumpPipeDN = "DN 10";
    } else if (txtPumpcomputedArea < 0.000196) {
        txtPumpPipeDN = "DN 15";
    } else if (txtPumpcomputedArea < 0.0003441) {
        txtPumpPipeDN = "DN 20";
    } else if (txtPumpcomputedArea < 0.0005576) {
        txtPumpPipeDN = "DN 25";
    } else if (txtPumpcomputedArea < 0.0013134) {
        txtPumpPipeDN = "DN 40";
    } else if (txtPumpcomputedArea < 0.0021648) {
        txtPumpPipeDN = "DN 50";
    } else if (txtPumpcomputedArea < 0.0030889) {
        txtPumpPipeDN = "DN 65";
    } else if (txtPumpcomputedArea < 0.0047696) {
        txtPumpPipeDN = "DN 80";
    } else if (txtPumpcomputedArea < 0.0063787) {
        txtPumpPipeDN = "DN 90";
    } else if (txtPumpcomputedArea < 0.008213) {
        txtPumpPipeDN = "DN 100";
    } else if (txtPumpcomputedArea < 0.012907) {
        txtPumpPipeDN = "DN 125";
    } else if (txtPumpcomputedArea < 0.018639) {
        txtPumpPipeDN = "DN 150";
    } else if (txtPumpcomputedArea < 0.032275) {
        txtPumpPipeDN = "DN 200";
    } else if (txtPumpcomputedArea < 0.050871) {
        txtPumpPipeDN = "DN 250";
    } else if (txtPumpcomputedArea < 0.072193) {
        txtPumpPipeDN = "DN 300";
    } else if (txtPumpcomputedArea < 0.09) {
        txtPumpPipeDN = "DN 350";
    } else if (txtPumpcomputedArea < 0.11) {
        txtPumpPipeDN = "DN 400";
    }

        let txtPumpPipeDiameter = 0;
    switch (txtPumpPipeDN) {
        case "DN 8": txtPumpPipeDiameter = 0.00923; break;
        case "DN 10": txtPumpPipeDiameter = 0.012523; break;
        case "DN 15": txtPumpPipeDiameter = 0.015798; break;
        case "DN 20": txtPumpPipeDiameter = 0.02093; break;
        case "DN 25": txtPumpPipeDiameter = 0.026645; break;
        case "DN 40": txtPumpPipeDiameter = 0.040894; break;
        case "DN 50": txtPumpPipeDiameter = 0.052501; break;
        case "DN 65": txtPumpPipeDiameter = 0.062713; break;
        case "DN 80": txtPumpPipeDiameter = 0.077928; break;
        case "DN 90": txtPumpPipeDiameter = 0.09012; break;
        case "DN 100": txtPumpPipeDiameter = 0.10226; break;
        case "DN 125": txtPumpPipeDiameter = 0.10226; break;
        case "DN 150": txtPumpPipeDiameter = 0.154051; break;
        case "DN 200": txtPumpPipeDiameter = 0.202717; break;
        case "DN 250": txtPumpPipeDiameter = 0.273; break;
        case "DN 300": txtPumpPipeDiameter = 0.3; break;
        case "DN 350": txtPumpPipeDiameter = 0.33; break;
        case "DN 400": txtPumpPipeDiameter = 0.381; break;
    }


        const elbow45 = getValue('elbow45');
    const elbow90 = getValue('elbow90');
    const Tee = getValue('Tee');
    const ReturnBend = getValue('ReturnBend');
    const Coupling = getValue('Coupling');
    const Union = getValue('Union');
    const GateWideOpen = getValue('GateWideOpen');
    const GateHalfOpen = getValue('GateHalfOpen');
    const GlobeWideOpen = getValue('GlobeWideOpen');
    const GlobeHalfOpen = getValue('GlobeHalfOpen');
    const AngleValveWideOpenCheckValve = getValue('AngleValveWideOpenCheckValve');
    const BallValve = getValue('BallValve');
    const SwingValve = getValue('SwingValve');
    const WaterMeter = getValue('WaterMeter');

    const txtPumpPipeReynoldsNumber = txtPumpPipeDiameter * inputs.txtPumpVelocity * inputs.txtDensity / (inputs.txtkinematicviscosity);
    const txtroughnessoverdiameter = parseFloat((inputs.txtroughness / txtPumpPipeDiameter).toFixed(6));

    const txtHeadStraightPipe = 4 * inputs.txtPumpPipefff * inputs.txtPumpPipeTotalLenghtArea * Math.pow(inputs.txtPumpVelocity, 2) * (1 / 2) * (1 /txtPumpPipeDiameter) * (1 / 9.81);
    
    const txtHeadContraction = 0.55 * (1 / 1) * Math.pow(inputs.txtPumpVelocity, 2) * (1 / 2) * (1 / 9.81);
    
    const txtHeadExpansion = Math.pow(inputs.txtPumpVelocity, 2) * (1 / 2) * (1 / 9.81);

    let txtHeadFittings = Math.pow(inputs.txtPumpVelocity, 2) * (1 / 2) * (1 / 9.81) * (
        elbow45 * 0.35 + 
        elbow90 * 0.75 + 
        Tee * 1 + 
        ReturnBend * 1.5 + 
        Coupling * 0.04 + 
        Union * 0.04 + 
        GateWideOpen * 0.17 + 
        GateHalfOpen * 0.45 + 
        GlobeWideOpen * 6 + 
        GlobeHalfOpen * 9.5 + 
        AngleValveWideOpenCheckValve * 2 + 
        BallValve * 70 + 
        SwingValve * 2 + 
        WaterMeter * 7
    );
    txtHeadFittings = parseFloat(txtHeadFittings.toFixed(6));

    const totalCalculatedHeadLoss = txtHeadExpansion + txtHeadFittings + txtHeadContraction + txtHeadStraightPipe + inputs.ElevationChange;

    const TotalHead = parseFloat(totalCalculatedHeadLoss.toFixed(2));
    let pumppowerwithefficiency = 0.001 * inputs.txtPumpFlowrate * (1 / 60) * inputs.txtDensity * TotalHead * 9.81 / (inputs.pumpefficiency * 0.01);
     pumppowerwithefficiency = parseFloat(pumppowerwithefficiency.toFixed(2));
    
    const outputFields = {
    

    txtPumpFlowratepers: txtPumpFlowratepers,
    txtPumpFlowrateperhour:txtPumpFlowrateperhour,
    txtPumpFlowrateperday:txtPumpFlowrateperday,
    txtPumpcomputedArea:txtPumpcomputedArea,
    txtPumpPipeDN:txtPumpPipeDN,
    txtPumpPipeDiameter:txtPumpPipeDiameter,
    txtPumpPipeReynoldsNumber:txtPumpPipeReynoldsNumber,
    txtroughnessoverdiameter:txtroughnessoverdiameter,
    txtHeadStraightPipe:txtHeadStraightPipe,
    txtHeadContraction:txtHeadContraction,
    txtHeadExpansion:txtHeadExpansion,
    txtHeadFittings:txtHeadFittings,
    totalCalculatedHeadLoss:totalCalculatedHeadLoss,
    TotalHead:TotalHead,
    pumppowerwithefficiency:pumppowerwithefficiency,



    };

for (const [id, value] of Object.entries(outputFields)) {
  const el = document.getElementById(id);
  if (el) {
    // For pipe size (text value) or any string value, don't use toFixed()
    if (id.includes('Pipesize') || typeof value === 'string') {
      el.value = value; // Directly set the string value
    } else {
      el.value = value.toFixed(2); // For numeric values
    }
  } else {
    // Fallback display if element doesn't exist
    document.getElementById('results').innerHTML += `<div class="result">${id}: ${value}</div>`;
  }
}

  } catch (error) {
    console.error("Calculation error:", error);
    document.getElementById('results').innerHTML = `
      <div class="error">Error in calculations: ${error.message}</div>
    `;
  }
}

// Helper function to get input values
function getValue(id) {
  const element = document.getElementById(id);
  return element ? parseFloat(element.value) || 0 : 0;
}








// Function to generate the report
function generateReport() {
  try {
    // Map and copy other fields
    const valueMap = {
  
      'txtPumpFlowrate': 'txtPumpFlowrate2',
      'TotalHead': 'TotalHead2',
      'pumphoursoperation': 'pumphoursoperation2',
    };

    for (const [sourceId, targetId] of Object.entries(valueMap)) {
      const source = document.getElementById(sourceId);
      const target = document.getElementById(targetId);
      if (source && target) {
        // For select elements, we need to get the selected option text
        if (source.tagName === 'SELECT') {
          const selectedOption = source.options[source.selectedIndex];
          target.value = selectedOption.text;
        } else {
          target.value = source.value;
        }
      } else {
        console.warn(`Element not found: ${sourceId} or ${targetId}`);
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
  }
}

// Function to print the report (without duplicate project info)
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
      reportClone.querySelector('.project-info'),
      reportClone.querySelector('.equipment-info'),
      reportClone.querySelector('h1') // Remove the Design Report header
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
    const brandNameEl = document.getElementById('brandName');
    const modelNameEl = document.getElementById('modelName');
    const pumpTypeEl = document.getElementById('pumpType');
    const dutyEl = document.getElementById('duty');
    const standbyEl = document.getElementById('standby');
    const pumpNameEl = document.getElementById('pumpName');
    const powerConsumptionEl = document.getElementById('powerConsumption');

    if (!projectNameEl || !projectNumberEl || !projectDateEl || !projectVersionEl) {
      throw new Error("One or more project detail fields are missing.");
    }

    const projectName = projectNameEl.value || 'Unnamed Project';
    const projectNumber = projectNumberEl.value || 'N/A';
    const projectDate = projectDateEl.value || new Date().toISOString().slice(0, 10);
    const projectVersion = projectVersionEl.value || '1.0';
    const brandName = brandNameEl ? brandNameEl.value || 'N/A' : 'N/A';
    const modelName = modelNameEl ? modelNameEl.value || 'N/A' : 'N/A';
    const pumpType = pumpTypeEl ? pumpTypeEl.value || 'N/A' : 'N/A';
    const duty = dutyEl ? dutyEl.value || 'N/A' : 'N/A';
    const standby = standbyEl ? standbyEl.value || 'N/A' : 'N/A';
    const pumpName = pumpNameEl ? pumpNameEl.value || 'N/A' : 'N/A';
    const powerConsumption = powerConsumptionEl ? powerConsumptionEl.value || 'N/A' : 'N/A';

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
          <!-- Equipment Details Table -->
          <h3>Equipment Details</h3>
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
                <td>Brand</td>
                <td>${brandName}</td>
              </tr>
              <tr>
                <td>Model</td>
                <td>${modelName}</td>
              </tr>
              <tr>
                <td>Pump Type</td>
                <td>${pumpType}</td>
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