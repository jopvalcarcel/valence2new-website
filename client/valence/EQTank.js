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
    'txtflowrate3': 450,
    'txttf3': 4,
    'txtPeakRatio3': 1.5,
    'txtPeakHour3': 1.5,
    'txtEQ1qty': 1,
    'txtEQ1wl': 4,
    'txtEQ1fb': 0.5,
    'txtEQ1width': 6,
    'txtEQ1Length': 5,
    'Airrequirementpervol':0.01,
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
const txtflowrate3 = getValue('txtflowrate3');
const txttf3 = getValue('txttf3');
const txtPeakRatio3 = getValue('txtPeakRatio3');
const txtPeakHour3 = getValue('txtPeakHour3');
const txtEQ1qty = getValue('txtEQ1qty');
const txtEQ1wl = getValue('txtEQ1wl');
const txtEQ1fb = getValue('txtEQ1fb');
const txtEQ1width = getValue('txtEQ1width');
const txtEQ1Length = getValue('txtEQ1Length');
const Airrequirementpervol = getValue('Airrequirementpervol');



    // Perform all calculations
// Calculate vs (settling velocity)
// Calculate total volume
const txtEQ1Totalvolume = parseFloat(txtflowrate3) * (1 / 24) * (parseFloat(txtPeakRatio3) - 1) * parseFloat(txtPeakHour3);

// Calculate volume per tank
const txtEQ1volumetank = parseFloat(txtEQ1Totalvolume) / parseFloat(txtEQ1qty);

// Calculate total depth
const txtEQ1td = parseFloat(txtEQ1wl) + parseFloat(txtEQ1fb);

// Calculate surface area
const txtEQ1sa = parseFloat(txtEQ1volumetank) / parseFloat(txtEQ1wl);

// Calculate length based on surface area
const txtEQ1Lengthcalc = parseFloat(txtEQ1sa) / parseFloat(txtEQ1width);

// Calculate actual volume
const txtEQ1Actualvolume = parseFloat(txtEQ1Length) * parseFloat(txtEQ1width) * parseFloat(txtEQ1wl);


const Airrequirement = parseFloat(Airrequirementpervol) * parseFloat(txtEQ1Actualvolume);



    // Prepare all output values
    const outputFields = {
    

    txtEQ1Totalvolume: txtEQ1Totalvolume,
    txtEQ1volumetank: txtEQ1volumetank,
    txtEQ1td: txtEQ1td,
    txtEQ1sa: txtEQ1sa,
    txtEQ1Lengthcalc: txtEQ1Lengthcalc,
    txtEQ1Actualvolume: txtEQ1Actualvolume,
    Airrequirement:Airrequirement,
    };

    // Update DOM with results
    for (const [id, value] of Object.entries(outputFields)) {
      const el = document.getElementById(id);
      if (el) {
        // Use appropriate decimal places
        if (['txtl6', 'txtv', 'txtR', 'txtnr', 'txtcd', 'txtdn', 
             'txtva', 'txtRa', 'txtnra', 'txtcda', 'txtdna'].includes(id)) {
          el.value = value.toFixed(5);
        } else {
          el.value = value.toFixed(2);
        }
      } else {
        console.warn(`Output element ${id} not found`);
        document.getElementById('results').innerHTML += 
          `<div class="result">${id}: ${value}</div>`;
      }
    }

  } catch (error) {
    console.error("Calculation error:", error);
    document.getElementById('results').innerHTML = `
      <div class="error">Error in calculations: ${error.message}</div>
    `;
  }
}

// Initialize event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('calculate-btn').addEventListener('click', calculate);
  document.getElementById('reset-btn').addEventListener('click', resetForm);
  document.getElementById('example-btn').addEventListener('click', fillExample);
});











// Function to generate the report
function generateReport() {
  try {
    // Helper to copy values from one input to another
    const copyValue = (fromId, toId) => {
      const fromEl = document.getElementById(fromId);
      const toEl = document.getElementById(toId);
      if (fromEl && toEl) {
        toEl.value = fromEl.value;
      }
    };

    // Map of source (input) IDs to target (report) IDs
    const mappings = [
      ['txtflowrate3', 'txtFlowrate2'],
      ['txtPeakRatio3', 'txtPeakratio2'],
      ['txtPeakHour3', 'txtpeakhour2'],
      ['txtEQ1Totalvolume', 'txtEQ1Totalvolume2'],
      ['txtEQ1qty', 'txtEQ1qty2'],
      ['Airrequirement', 'txtAirRequirement2'],
      ['txtEQ1Actualvolume', 'txtTankDimensions']
    ];

    // Copy all mapped input values
    mappings.forEach(([sourceId, targetId]) => copyValue(sourceId, targetId));

    // Calculate Peak Flowrate (m³/hr)
    const flowrate = getValue('txtflowrate3');
    const peakRatio = getValue('txtPeakRatio3');
    const peakFlowrate = flowrate * peakRatio;

    const peakFlowEl = document.getElementById('txtPeakFlowrate2');
    if (peakFlowEl) {
      peakFlowEl.value = peakFlowrate.toFixed(2);
    }

    // Set current date if it's empty
    const dateField = document.getElementById('projectDate');
    if (dateField && !dateField.value) {
      const today = new Date();
      dateField.value = today.toISOString().substr(0, 10);
    }

    // Display and scroll to the report section
    const reportSection = document.getElementById('reportSection');
    if (reportSection) {
      reportSection.style.display = 'block';
      reportSection.scrollIntoView({ behavior: 'smooth' });
    }

  } catch (error) {
    console.error("Error generating report:", error);
    const resultsEl = document.getElementById('results');
    if (resultsEl) {
      resultsEl.innerHTML = `
        <div class="error">Error generating report: ${error.message}</div>
      `;
    }
  }
}

// Function to print the report (without print button in output)
// Function to print the report (without duplicate project info)
function printReport() {
  // First ensure all report values are up-to-date
  generateReport();

  // Create a clone of the report section
  const reportClone = document.getElementById('reportSection').cloneNode(true);
  
  // Remove elements we don't want in print
  const elementsToRemove = [
    reportClone.querySelector('.print-button'),
    reportClone.querySelector('.project-info') // Remove the duplicate project info
  ];
  
  elementsToRemove.forEach(element => {
    if (element) element.remove();
  });

  // Replace all readonly inputs with plain text for printing
  const readonlyInputs = reportClone.querySelectorAll('input[readonly]');
  readonlyInputs.forEach(input => {
    const span = document.createElement('span');
    span.textContent = input.value;
    span.style.display = 'inline-block';
    span.style.width = '100%';
    span.style.padding = '5px';
    span.style.textAlign = 'center';
    input.parentNode.replaceChild(span, input);
  });

  // Project details (we'll add these only once at the top)
  const projectName = document.getElementById('projectName').value || 'Unnamed Project';
  const projectNumber = document.getElementById('projectNumber').value || 'N/A';
  const projectDate = document.getElementById('projectDate').value || new Date().toISOString().substr(0, 10);
  const projectVersion = document.getElementById('projectVersion').value || '1.0';

  // Create print window content
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
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }

        .project-header {
          margin-bottom: 20px;
          padding-bottom: 15px;
        }

        .project-details-container {
          display: flex;
          justify-content: space-between;
          margin-top: 10px;
        }

        .project-details-left,
        .project-details-right {
          display: flex;
          flex-direction: column;
        }

        .project-details-left div,
        .project-details-right div {
          margin: 3px 0;
        }

        @page { size: auto; margin: 10mm; }
      </style>
    </head>
    <body>
      <div class="project-header">
        <h1></h1>
        <div class="project-details-container">
          <div class="project-details-left">
            <div><strong>Project:</strong> ${projectName}</div>
            <div><strong>Date:</strong> ${projectDate}</div>
          </div>
          <div class="project-details-right">
            <div><strong>Number:</strong> ${projectNumber}</div>
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
  // Set default date on page load
  document.addEventListener('DOMContentLoaded', function () {
    const today = new Date();
    document.getElementById('projectDate').value = today.toISOString().substr(0, 10);
  });