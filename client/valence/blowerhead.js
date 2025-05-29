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
      // Flow parameters
        'Waterlevelforpsig': 4,
        'AmbTemp': 100,
        'TempRise': 98,
        'waterlevelPSIA': 23.2,
        'frictionlossPSIG': 0.25,

        // Pipe system parameters
        'PipeID': 10.02,
        'LenghtofPipe': 124,
        'EquivSilencer': 238,
        'scfm': 1,  

        // Component counts
        'Standard90Elbowno': 4,
        'CheckValveno': 1,
        'Silencerno': 1,
        'FlowthrougBranchno': 1,
        'ButterflyValveno': 2,
        'TransitioninSizeno': 1,
        'LongRadius90Elbowno': 0,
        'LongStandard45Elbowno': 0,
        'FlowthroughRunno': 0,
        'GateValveno': 0


  };

  for (const [id, value] of Object.entries(exampleValues)) {
    const element = document.getElementById(id);
    if (element) {
      element.value = value;
    }
  }
}
function calculate() {
  try {
    // Get all input values
    const inputs = {
      Waterlevelforpsig: getValue('Waterlevelforpsig'),
      AmbTemp: getValue('AmbTemp'),
      TempRise: getValue('TempRise'),
      PipeID: getValue('PipeID'),
      LenghtofPipe: getValue('LenghtofPipe'),
      EquivSilencer: getValue('EquivSilencer'),
      scfm: getValue('scfm'),
      Standard90Elbowno: getValue('Standard90Elbowno'),
      CheckValveno: getValue('CheckValveno'),
      Silencerno: getValue('Silencerno'),
      FlowthrougBranchno: getValue('FlowthrougBranchno'),
      ButterflyValveno: getValue('ButterflyValveno'),
      TransitioninSizeno: getValue('TransitioninSizeno'),
      LongRadius90Elbowno: getValue('LongRadius90Elbowno'),
      LongStandard45Elbowno: getValue('LongStandard45Elbowno'),
      FlowthroughRunno: getValue('FlowthroughRunno'),
      GateValveno: getValue('GateValveno')
    };

    // Perform all calculations
    const waterlevelPSIG = inputs.Waterlevelforpsig * 1.4219702063247;
    const waterlevelPSIA = waterlevelPSIG + 14.7;

    const EquivLengthGateValve = 13 * inputs.PipeID / 12;
    const EquivLengthButterflyValve = 20 * inputs.PipeID / 12;
    const EquivLengthCheckValve = 135 * inputs.PipeID / 12;
    const EquivLengthStandard90Elbow = 30 * inputs.PipeID / 12;
    const EquivLengthLongRadius90Elbow = 20 * inputs.PipeID / 12;
    const EquivLengthLongStandard45Elbow = 16 * inputs.PipeID / 12;
    const EquivLengthTransitioninSize = 20 * inputs.PipeID / 12;
    const EquivLengthFlowthroughRun = 20 * inputs.PipeID / 12;
    const EquivLengthFlowthrougBranch = 60 * inputs.PipeID / 12;


        // Calculate total equivalent lengths for each component type
    const TotGateValve = inputs.GateValveno * EquivLengthGateValve;
    const TotButterflyValve = inputs.ButterflyValveno * EquivLengthButterflyValve;
    const TotCheckValve = inputs.CheckValveno * EquivLengthCheckValve;
    const TotStandard90Elbow = inputs.Standard90Elbowno * EquivLengthStandard90Elbow;
    const TotLongRadius90Elbow = inputs.LongRadius90Elbowno * EquivLengthLongRadius90Elbow;
    const TotLongStandard45Elbow = inputs.LongStandard45Elbowno * EquivLengthLongStandard45Elbow;
    const TotTransitioninSize = inputs.TransitioninSizeno * EquivLengthTransitioninSize;
    const TotFlowthroughRun = inputs.FlowthroughRunno * EquivLengthFlowthroughRun;
    const TotFlowthrougBranch = inputs.FlowthrougBranchno * EquivLengthFlowthrougBranch;
    const TotSilencer = inputs.Silencerno * inputs.EquivSilencer;

    // Calculate TOTAL equivalent length
    let TOTAL = inputs.LenghtofPipe + TotButterflyValve + TotGateValve + 
               TotCheckValve + TotStandard90Elbow + TotLongStandard45Elbow + 
               TotTransitioninSize + TotFlowthroughRun + TotFlowthrougBranch + 
               TotSilencer;

               

    TOTAL = Math.round(TOTAL * 10) / 10; // Round to 1 decimal place


    // Iterative calculation with convergence check
const MAX_ITERATIONS = 10;
const TOLERANCE = 0.0001; // Convergence tolerance

let frictionlossPSIG = 0.25; // Initial estimate
let previousFrictionLoss;
let iteration = 0;

do {
    previousFrictionLoss = frictionlossPSIG;
    let Meansystem = parseFloat(waterlevelPSIA) + frictionlossPSIG / 2;
    
    frictionlossPSIG = 0.07 * Math.pow(parseFloat(scfm.value), 1.85) * 
                      (460 + parseFloat(AmbTemp.value) + parseFloat(TempRise.value)) * 
                      (parseFloat(TOTAL) / 100) / 
                      (Math.pow(parseFloat(PipeID.value), 5) * Meansystem * 528);
    
    iteration++;
} while (iteration < MAX_ITERATIONS && 
         Math.abs(frictionlossPSIG - previousFrictionLoss) > TOLERANCE);

frictionlossPSIG = Math.round(frictionlossPSIG * 10000) / 10000; // Round to 4 decimal places


Meansystem = parseFloat(waterlevelPSIA) + frictionlossPSIG / 2;

    let Blowerdischargepressure = frictionlossPSIG + waterlevelPSIA - 14.7;
    Blowerdischargepressure = Math.round(Blowerdischargepressure * 100) / 100; // Round to 2 decimal places

    // Convert temperature to Celsius
    const TempRiseCelsius = ((inputs.TempRise - 32) * 5 / 9);
    const AmbTempCelsius = ((inputs.AmbTemp - 32) * 5 / 9);

    // Prepare output fields
    const outputFields = {
      waterlevelPSIG: waterlevelPSIG,

      EquivLengthGateValve: EquivLengthGateValve,
      EquivLengthButterflyValve: EquivLengthButterflyValve,
      EquivLengthCheckValve: EquivLengthCheckValve,
      EquivLengthStandard90Elbow: EquivLengthStandard90Elbow,
      EquivLengthLongRadius90Elbow: EquivLengthLongRadius90Elbow,
      EquivLengthLongStandard45Elbow: EquivLengthLongStandard45Elbow,
      EquivLengthTransitioninSize: EquivLengthTransitioninSize,
      EquivLengthFlowthroughRun: EquivLengthFlowthroughRun,
      EquivLengthFlowthrougBranch: EquivLengthFlowthrougBranch,
            TotGateValve: TotGateValve,
      TotButterflyValve: TotButterflyValve,
      TotCheckValve: TotCheckValve,
      TotStandard90Elbow: TotStandard90Elbow,
      TotLongRadius90Elbow: TotLongRadius90Elbow,
      TotLongStandard45Elbow: TotLongStandard45Elbow,
      TotTransitioninSize: TotTransitioninSize,
      TotFlowthroughRun: TotFlowthroughRun,
      TotFlowthrougBranch: TotFlowthrougBranch,
      TotSilencer: TotSilencer,
      TOTAL: TOTAL,
      frictionlossPSIG:frictionlossPSIG,
      Meansystem :Meansystem,
        Blowerdischargepressure: Blowerdischargepressure,
      TempRiseCelsius: TempRiseCelsius,
      AmbTempCelsius: AmbTempCelsius

    };

    // Set output values
    for (const [id, value] of Object.entries(outputFields)) {
      const el = document.getElementById(id);
      if (el) {
        // For pipe size (text value) or any string value, don't use toFixed()
        if (typeof value === 'string') {
          el.value = value;
        } else {
          // Determine appropriate decimal places based on the variable
          let decimalPlaces = 2; // default
          if (id === 'frictionlossPSIG') decimalPlaces = 4;
          if (id === 'TOTAL') decimalPlaces = 1;
          if (id === 'Blowerdischargepressure') decimalPlaces = 2;
          
          el.value = value.toFixed(decimalPlaces);
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
      'scfm': 'scfm2',
       'Blowerdischargepressure': 'Blowerdischargepressure2',
       'blowerpurpose': 'blowerpurpose2',
        'blowertype': 'blowertype2',
         'brand': 'brand2',

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

    // Get project and blower details BEFORE creating the clone
    const projectName = document.getElementById('projectName').value || 'Unnamed Project';
    const projectNumber = document.getElementById('projectNumber').value || 'N/A';
    const projectDate = document.getElementById('projectDate').value || new Date().toISOString().slice(0, 10);
    const projectVersion = document.getElementById('projectVersion').value || '1.0';
    const blowerName = document.getElementById('blowerName') ? document.getElementById('blowerName').value || 'N/A' : 'N/A';
    const brandName = document.getElementById('brandName') ? document.getElementById('brandName').value || 'N/A' : 'N/A';
    const modelName = document.getElementById('modelName') ? document.getElementById('modelName').value || 'N/A' : 'N/A';
    const duty = document.getElementById('duty') ? document.getElementById('duty').value || 'N/A' : 'N/A';
    const standby = document.getElementById('standby') ? document.getElementById('standby').value || 'N/A' : 'N/A';
    const powerConsumption = document.getElementById('powerConsumption') ? document.getElementById('powerConsumption').value || 'N/A' : 'N/A';

    // Create a clone of the report section
    const reportClone = reportSection.cloneNode(true);

    // Remove elements we don't want in print
    const elementsToRemove = [
      reportClone.querySelector('.print-button'),
      reportClone.querySelector('.project-info'),
      reportClone.querySelector('.blower-info'),
      reportClone.querySelector('h1') // Remove the Design Report header
    ];
    elementsToRemove.forEach(element => {
      if (element) element.remove();
    });

    // Replace readonly inputs and selects with spans for printing
    const inputs = reportClone.querySelectorAll('input[readonly], select[readonly], input[id$="2"], select[id$="2"]');
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
          <!-- Blower Details Table -->
          <h3>Blower Details</h3>
          <table border="1" cellpadding="5" cellspacing="0">
            <thead>
              <tr>
                <th>Parameter</th>
                <th>Value ..Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Blower Name</td>
                <td>${blowerName}</td>
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