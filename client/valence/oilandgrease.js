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

    'txtOilFlowrate': 76000,
    'txtinOilconc': 40,
    'txteffOilconc': 5,
    'txtOilConc': 100,
    'txtOilqty': 1,
    'txtOilDT': 10,
    'txtOilW': 5.5,
    'txtOilWL': 2,
    'txtOilActL': 3,
    'txtOILFB': 0.5
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
      txtOilFlowrate: getValue('txtOilFlowrate'),
      txtinOilconc: getValue('txtinOilconc'),
      txteffOilconc: getValue('txteffOilconc'),
      txtOilConc: getValue('txtOilConc'),
      txtOilqty: getValue('txtOilqty'),
      txtOilDT: getValue('txtOilDT'),
      txtOilW: getValue('txtOilW'),
      txtOilWL: getValue('txtOilWL'),
      txtOilActL: getValue('txtOilActL'),
      txtOILFB: getValue('txtOILFB')
    };

    // Calculate water level difference
    const txtSepOilFlowkgd = inputs.txtOilFlowrate * (inputs.txtinOilconc - inputs.txteffOilconc) / 1000;
    const txtSepOilFlowcmd = (txtSepOilFlowkgd / ((inputs.txtOilConc * 0.01) * 1000));
    const txtNecVolume = inputs.txtOilDT * txtSepOilFlowcmd;
    let txtOilNecL = txtNecVolume / (inputs.txtOilqty * inputs.txtOilW * inputs.txtOilWL);
    
    txtOilNecL = parseFloat(txtOilNecL.toFixed(2)); // Equivalent to Round in VBA
    const txtOilActVol = inputs.txtOilActL * inputs.txtOilW * inputs.txtOilWL;
    let txtOilActDT = txtOilActVol / (txtSepOilFlowcmd * inputs.txtOilqty);
    txtOilActDT = parseFloat(txtOilActDT.toFixed(2)); // Equivalent to Round in VBA
    const txtOILTD = inputs.txtOILFB + inputs.txtOilWL
    // BOD Oxygen Transfer Rate calculations



    // Prepare output values
    const outputFields = {
      txtSepOilFlowkgd,
      txtSepOilFlowcmd,
      txtNecVolume,
      txtOilNecL,
      txtOilActVol,
      txtOilActDT,
      txtOILTD



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
      'txtOilFlowrate': 'txtOilFlowrate2',
      'txtinOilconc': 'txtinOilconc2',
      'txteffOilconc': 'txteffOilconc2',
      'txtOilActDT': 'txtOilActDT2',
      'txtOilActVol': 'txtOilActVol2',


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