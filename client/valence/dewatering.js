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

// Utility function to get input value as a number
function getValue(id) {
  const element = document.getElementById(id);
  if (!element) {
    throw new Error(`Element with ID '${id}' not found`);
  }
  const value = parseFloat(element.value);
  if (isNaN(value)) {
    throw new Error(`Invalid value for '${id}'`);
  }
  return value;
}

// Function to fill example values
function fillExample() {
  const exampleValues = {
    txtKGDSday: 211,
    txtwetsludgeday: 3.41,
    txtFSComp:20 ,
    txtDriedandDigestedDrysolidscomp: 20,
    txtFSSG: 2.5,
    txtVSSG: 1,
    txtWaterSG: 1,
    polymerdosingrate: 15,
    DissolvingConcentration: 0.1,
    DensityWater: 1,
    txtSludgeDSComp: 6,
    txtVSSdestroyed: 0,
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
      txtKGDSday: getValue('txtKGDSday'),
      txtwetsludgeday: getValue('txtwetsludgeday'),
      txtFSComp: getValue('txtFSComp'),
      txtDriedandDigestedDrysolidscomp: getValue('txtDriedandDigestedDrysolidscomp'),
      txtFSSG: getValue('txtFSSG'),
      txtVSSG: getValue('txtVSSG'),
      txtWaterSG: getValue('txtWaterSG'),
      polymerdosingrate: getValue('polymerdosingrate'),
      DissolvingConcentration: getValue('DissolvingConcentration'),
      DensityWater: getValue('DensityWater'),
      txtSludgeDSComp: getValue('txtSludgeDSComp'),
      txtVSSdestroyed: getValue('txtVSSdestroyed'),
    };

    // Perform calculations
    const txtVSComp = 100 - inputs.txtFSComp;
    const txtDSSG = 1 / ((inputs.txtFSComp / 100) / inputs.txtFSSG + (txtVSComp / 100) / inputs.txtVSSG);
    const txtSludgeWaterComp = 100 - inputs.txtSludgeDSComp;
    const txtSludgeSG = 1 / ((inputs.txtSludgeDSComp / 100) / txtDSSG + (txtSludgeWaterComp / 100) / inputs.txtWaterSG);

    let txtDigesteddewateredVSScomp =
      (100 * (txtVSComp / 100) * inputs.txtKGDSday * (1 - inputs.txtVSSdestroyed / 100)) /
      (inputs.txtKGDSday - inputs.txtKGDSday * (txtVSComp / 100) * (inputs.txtVSSdestroyed / 100));
    txtDigesteddewateredVSScomp = parseFloat(txtDigesteddewateredVSScomp.toFixed(2));

    const txtDigesteddewateredFScomp = 100 - txtDigesteddewateredVSScomp;
    const txtDriedandDigestedDrywatercomp = 100 - inputs.txtDriedandDigestedDrysolidscomp;
    const txtDDFSSG = 2.5;
    const txtDDVSSG = 1;
    const txtDDWaterSG = inputs.txtWaterSG;

    let txtDDDSSG = 1 / (
      (txtDigesteddewateredFScomp / 100) / txtDDFSSG +
      (txtDigesteddewateredVSScomp / 100) / txtDDVSSG
    );
    txtDDDSSG = parseFloat(txtDDDSSG.toFixed(2));

    const txtDDSludgeSG = 1 / (
      (inputs.txtDriedandDigestedDrysolidscomp / 100) / txtDDDSSG +
      (txtDriedandDigestedDrywatercomp / 100) / txtDDWaterSG
    );

    let txtDriedandDigestedDSday = inputs.txtKGDSday * (1 - (txtVSComp / 100) * (inputs.txtVSSdestroyed / 100));
    let txtDriedandDigestedsludgeday = (inputs.txtKGDSday - inputs.txtKGDSday * txtVSComp * 0.01 * inputs.txtVSSdestroyed * 0.01) /(1000 * txtDDSludgeSG*0.01*(inputs.txtDriedandDigestedDrysolidscomp)) ;
                       
            
    // 
    
    
                                       let txtDriedandDigestedsludgedayremoved = inputs.txtwetsludgeday - txtDriedandDigestedsludgeday;
    const txtDriedandDigestedsludgedayremovedpercent = (100 * txtDriedandDigestedsludgedayremoved) / inputs.txtwetsludgeday;

    txtDriedandDigestedDSday = parseFloat(txtDriedandDigestedDSday.toFixed(3));
    txtDriedandDigestedsludgeday = parseFloat(txtDriedandDigestedsludgeday.toFixed(3));
    txtDriedandDigestedsludgedayremoved = parseFloat(txtDriedandDigestedsludgedayremoved.toFixed(3));

    const polymermassdosingrate = (inputs.txtKGDSday * inputs.polymerdosingrate) / 1000;
    const WaterRequired = (inputs.txtwetsludgeday)*(1/1000)*(polymermassdosingrate * (100 / inputs.DissolvingConcentration)) / inputs.DensityWater;

    // Prepare output values
    const outputFields = {
      txtVSComp,
      txtDSSG,
      txtSludgeWaterComp,
      txtSludgeSG,
      txtDigesteddewateredVSScomp,
      txtDigesteddewateredFScomp,
      txtDriedandDigestedDrywatercomp,
      txtDDFSSG,
      txtDDVSSG,
      txtDDWaterSG,
      txtDDDSSG,
      txtDDSludgeSG,
      txtDriedandDigestedDSday,
      txtDriedandDigestedsludgeday,
      txtDriedandDigestedsludgedayremoved,
      txtDriedandDigestedsludgedayremovedpercent,
      polymermassdosingrate,
      WaterRequired,
    };

    // Update DOM with results
    for (const [id, value] of Object.entries(outputFields)) {
      const el = document.getElementById(id);
      if (el) {
        el.value = Number.isFinite(value) ? value.toFixed(2) : 'N/A';
      } else {
        document.getElementById('results').innerHTML += `<div class="result">${id}: ${
          Number.isFinite(value) ? value.toFixed(2) : 'N/A'
        }</div>`;
      }
    }
  } catch (error) {
    console.error('Calculation error:', error);
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
      'txtKGDSday': 'txtKGDSday2',
      'txtwetsludgeday': 'txtwetsludgeday2',
      'txtSludgeDSComp': 'txtSludgeDSComp2',
      'txtDriedandDigestedsludgeday': 'txtDriedandDigestedsludgeday2',
      'txtDriedandDigestedDrysolidscomp': 'txtDriedandDigestedDrysolidscomp2',
      'polymermassdosingrate': 'polymermassdosingrate2',
       'DissolvingConcentration': 'DissolvingConcentration2',
        'WaterRequired': 'WaterRequired2',


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

    // Get project and sludge dewatering details BEFORE creating the clone
    const projectName = document.getElementById('projectName').value || 'Unnamed Project';
    const projectNumber = document.getElementById('projectNumber').value || 'N/A';
    const projectDate = document.getElementById('projectDate').value || new Date().toISOString().slice(0, 10);
    const projectVersion = document.getElementById('projectVersion').value || '1.0';
    const sludgeDewateringBrand = document.getElementById('sludgeDewateringBrand') ? document.getElementById('sludgeDewateringBrand').value || 'N/A' : 'N/A';
    const sludgeDewateringModel = document.getElementById('sludgeDewateringModel') ? document.getElementById('sludgeDewateringModel').value || 'N/A' : 'N/A';

    // Create a clone of the report section
    const reportClone = reportSection.cloneNode(true);

    // Remove elements we don't want in print
    const elementsToRemove = [
      reportClone.querySelector('.print-button'),
      reportClone.querySelector('.project-info'),
      reportClone.querySelector('.sludge-dewatering-info'),
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
          <title>Sludge Dewatering Design Report</title>
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
            <h1>Sludge Dewatering Design Report</h1>
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
          <!-- Sludge Dewatering Details Table -->
          <h3>Sludge Dewatering Details</h3>
          <table border="1" cellpadding="5" cellspacing="0">
            <thead>
              <tr>
                <th>Item</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Sludge Dewatering Brand</td>
                <td>${sludgeDewateringBrand}</td>
              </tr>
              <tr>
                <td>Sludge Dewatering Model</td>
                <td>${sludgeDewateringModel}</td>
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