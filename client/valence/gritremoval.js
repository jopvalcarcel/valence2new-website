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
    'txtavecmd': 43200,
    'txtgritpkf': 2.75,
    'txtgritdt': 3,
    'txtgritWD': 1.2,
    'txtgritlvl': 3,
    'txtgritActLength': 11.5,
    'txtGritTanks': 2,
    'txtGritAirReqperL': 0.3,
    'txtvolumeofgritperm3': 0.05,
    'txtgrittankFB': 0.3
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
      txtavecmd: getValue('txtavecmd'),
      txtgritpkf: getValue('txtgritpkf'),
      txtgritdt: getValue('txtgritdt'),
      txtgritWD: getValue('txtgritWD'),
      txtgritlvl: getValue('txtgritlvl'),
      txtgritActLength: getValue('txtgritActLength'),
      txtGritTanks: getValue('txtGritTanks'),
      txtGritAirReqperL: getValue('txtGritAirReqperL'),
      txtvolumeofgritperm3: getValue('txtvolumeofgritperm3'),
      txtgrittankFB: getValue('txtgrittankFB')
    };

    // Calculate water level difference
    const txtgrittanklvl = inputs.txtgritlvl + inputs.txtgrittankFB;
    const txtavecms = inputs.txtavecmd / 24 / 60 / 60;
    const txtpkcmd = inputs.txtavecmd * inputs.txtgritpkf;
    const txtpkcms = txtpkcmd / 24 / 60 / 60;
    const txtgritvol = inputs.txtgritdt * (1 / 60) * (1 / 24) * txtpkcmd / inputs.txtGritTanks;
    const txtgritW = inputs.txtgritlvl * inputs.txtgritWD;
    let txtgritNecLength = txtgritvol / (inputs.txtgritlvl * txtgritW);
    
    txtgritNecLength = parseFloat(txtgritNecLength.toFixed(2));
    const txtActVol = txtgritW * inputs.txtgritlvl * inputs.txtgritActLength;
    let txtGritActDet = (txtActVol / txtavecms) * (1 / 60);
    txtGritActDet = parseFloat(txtGritActDet.toFixed(2));
    const txtGritAirReq = inputs.txtGritAirReqperL * inputs.txtgritActLength;
    const txtGritAirReqTot = txtGritAirReq * inputs.txtGritTanks;
    const txtVolumeofGritsperday = inputs.txtvolumeofgritperm3 * (inputs.txtavecmd) / 1000;

    // Prepare output values
    const outputFields = {
      txtgrittanklvl: txtgrittanklvl,
      txtavecms: txtavecms,
      txtpkcmd: txtpkcmd,
      txtpkcms: txtpkcms,
      txtgritvol: txtgritvol,
      txtgritW: txtgritW,
      txtgritNecLength: txtgritNecLength,
      txtActVol: txtActVol,
      txtGritActDet: txtGritActDet,
      txtGritAirReq: txtGritAirReq,
      txtGritAirReqTot: txtGritAirReqTot,
      txtVolumeofGritsperday: txtVolumeofGritsperday
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
    // Recalculate tank dimensions
    const txtgritActLengthL = getValue('txtgritActLength');
    const txtgritW = getValue('txtgritW');
    const txtpsWL = getValue('txtgritlvl');

    const dimensionString = `${txtgritActLengthL.toFixed(2)}m × ${txtgritW.toFixed(2)}m × ${txtpsWL.toFixed(2)}m`;

    // Set dimensions string directly
    const dimensionField = document.getElementById('txtTankDimensions2');
    if (dimensionField) {
      dimensionField.value = dimensionString;
    } else {
      console.warn("txtTankDimensions2 not found in the DOM");
    }

    // Map input fields to report fields
    const valueMap = {
      'txtavecmd': 'txtavecmd2',
      'txtpkcmd': 'txtpkcmd2',
      'txtGritTanks': 'txtGritTanks2',
      'txtGritTanksstandby': 'txtGritTanksstandby2',
      'txtGritAirReq': 'txtGritAirReq2',
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
  // First update the report
  generateReport();

  // Get project details BEFORE creating the clone
  const projectName = document.getElementById('projectName').value || 'Unnamed Project';
  const projectNumber = document.getElementById('projectNumber').value || 'N/A';
  const projectDate = document.getElementById('projectDate').value || new Date().toISOString().substr(0, 10);
  const projectVersion = document.getElementById('projectVersion').value || '1.0';

  // Create a clone of the report section
  const reportClone = document.getElementById('reportSection').cloneNode(true);
  
  // Remove print button and project info inputs
  const elementsToRemove = [
    reportClone.querySelector('.print-button'),
    reportClone.querySelector('.project-info')
  ];
  
  elementsToRemove.forEach(element => {
    if (element) element.remove();
  });

  // Replace inputs with spans for printing
  const inputs = reportClone.querySelectorAll('input[readonly]');
  inputs.forEach(input => {
    const span = document.createElement('span');
    span.textContent = input.value;
    span.style.display = 'inline-block';
    span.style.width = '100%';
    span.style.padding = '5px';
    span.style.textAlign = 'center';
    input.parentNode.replaceChild(span, input);
  });

  // Create print window
  const printWindow = window.open('', '_blank');
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
            <div><strong>Number:</strong> ${projectNumber}</div>
          </div>
          <div class="column">
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
            window.close();
          }, 200);
        };
      </script>
    </body>
  </html>
`);
printWindow.document.close();
}