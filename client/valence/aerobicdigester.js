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
     'txtkgDSday': 18387,
    'txtSolidsContent': 1.3,
    'txtcoagulantdsperday': 2.48,
    'txtSolidsContentcoagulant': 6,
    'txtSGSludgcoageperm3Sludgecoag': 1.03,
    'txtSHTWL': 4,
    'txtSHTW': 12,
    'txtSHTFB': 0.5,
    'txtADperecentVSSreduced': 10,
    'txtADVSSTSSRatio': 0.92,
    'txtADAirTransefficiency': 10,
    'txtADCelsius': 30,
    'txtSHTActualL': 2.6,
    'txtSHTW': 10.5,
    'txtSHTWL': 5,
    'txtSHTFB': 0.5,
    'txtSHTRetentiontime':6
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
      txtkgDSday: getValue('txtkgDSday'),
      txtSolidsContent: getValue('txtSolidsContent'),
      txtcoagulantdsperday: getValue('txtcoagulantdsperday'),
      txtSolidsContentcoagulant: getValue('txtSolidsContentcoagulant'),
      txtSGSludgcoageperm3Sludgecoag: getValue('txtSGSludgcoageperm3Sludgecoag'),
      txtSHTWL: getValue('txtSHTWL'),
      txtSHTW: getValue('txtSHTW'),
      txtSHTFB: getValue('txtSHTFB'),
      txtADperecentVSSreduced: getValue('txtADperecentVSSreduced'),
      txtADVSSTSSRatio: getValue('txtADVSSTSSRatio'),
      txtADAirTransefficiency: getValue('txtADAirTransefficiency'),
      txtADCelsius: getValue('txtADCelsius'),
      txtSHTActualL: getValue('txtSHTActualL'),
      txtSHTW: getValue('txtSHTW'),
      txtSHTWL: getValue('txtSHTWL'),
      txtSHTFB: getValue('txtSHTFB'),
      txtSHTRetentiontime: getValue('txtSHTRetentiontime')

 };
    // Perform all calculations
// Calculate vs (settling velocity)
// Calculate total volume
const txtADSRTCelsius = 100;
const txtSGSludgeperm3Sludge = 1 / ((inputs.txtSolidsContent * 0.01 / 1.14) + 
                                      (1 - inputs.txtSolidsContent * 0.01) / 1);
let txtSludgeflowrate = inputs.txtkgDSday / (inputs.txtSolidsContent / 100) / 1000;
    txtSludgeflowrate = Math.round(txtSludgeflowrate * 100) / 100; // Round to 2 decima

    let txtCoagulantSludgeflowrate = (1 / inputs.txtSGSludgcoageperm3Sludgecoag) * 
                                    inputs.txtcoagulantdsperday / 
                                    (inputs.txtSolidsContentcoagulant / 100) / 1000;
    
    
    txtCoagulantSludgeflowrate = Math.round(txtCoagulantSludgeflowrate * 100) / 100;
    

    const txtTotalSludgeflowrate = txtCoagulantSludgeflowrate + txtSludgeflowrate;
                                    // Prepare all output values
    
    
    const txtSHTNecessaryVolume = inputs.txtSHTRetentiontime * txtTotalSludgeflowrate;

    const txtSHTL = txtSHTNecessaryVolume / (inputs.txtSHTWL * inputs.txtSHTW);

    const txtSHTTD = inputs.txtSHTFB + inputs.txtSHTWL;


     const txtSHTActualVolume = inputs.txtSHTActualL * inputs.txtSHTW * inputs.txtSHTWL;
     
     const txtADSRT = inputs.txtSHTRetentiontime;

    const txtADTSSperday = inputs.txtkgDSday;

    const txtADVSSperday = txtADTSSperday * inputs.txtADVSSTSSRatio;

      const txtVSSReducedperday = 0.01 * inputs.txtADperecentVSSreduced * txtADVSSperday;

    const txtADO2Requirement = 2.3 * txtVSSReducedperday;

    let txtADAirRequirement = txtADO2Requirement * (1 / 1.204) * (1 / 0.232) * 
                             (1 / (inputs.txtADAirTransefficiency * 0.01)) * (1 / 1440);


    txtADAirRequirement = Math.round(txtADAirRequirement * 100) / 100;
    
   
    const txtADvolume = txtSHTActualVolume;

    
    const outputFields = {
    

    txtSGSludgeperm3Sludge: txtSGSludgeperm3Sludge,
    txtSludgeflowrate:txtSludgeflowrate,
    txtCoagulantSludgeflowrate:txtCoagulantSludgeflowrate,
    txtTotalSludgeflowrate:txtTotalSludgeflowrate,
    txtSHTNecessaryVolume:txtSHTNecessaryVolume,
    txtSHTL:txtSHTL,
    txtSHTTD :txtSHTTD ,
    txtSHTActualVolume:txtSHTActualVolume,
    txtADSRT:txtADSRT,
    txtADTSSperday:txtADTSSperday,
    txtADVSSperday:txtADVSSperday,
    txtVSSReducedperday:txtVSSReducedperday,
    txtADO2Requirement:txtADO2Requirement,
    txtADAirRequirement:txtADAirRequirement,
    txtADSRTCelsius:txtADSRTCelsius,
    txtADvolume:txtADvolume,


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
    // Recalculate tank dimensions
    const txtSHTActualL = getValue('txtSHTActualL');
    const txtSHTW = getValue('txtSHTW');
    const txtSHTWL = getValue('txtSHTW');

    const dimensionString = `${txtSHTActualL.toFixed(2)}m × ${txtSHTW.toFixed(2)}m × ${txtSHTWL.toFixed(2)}m`;

    // Set dimensions string directly
    const dimensionField = document.getElementById('txtTankDimensions2');
    if (dimensionField) {
      dimensionField.value = dimensionString;
    } else {
      console.warn("txtTankDimensions2 not found in the DOM");
    }

    // Map and copy other fields
    const valueMap = {
      'txtkgDSday': 'txtkgDSday2',
      'txtcoagulantdsperday': 'txtcoagulantdsperday2',
      'txtTotalSludgeflowrate': 'txtTotalSludgeflowrate2',
      'txtSHTRetentiontime': 'txtSHTRetentiontime2',
      'txtADCelsius': 'txtADCelsius2',
      'txtADVSSperday': 'txtADVSSperday2',
      'txtADperecentVSSreduced': 'txtADperecentVSSreduced2',
      'txtADvolume': 'txtADvolume2',
      'txtADAirRequirement': 'txtADAirRequirement2'
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