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
    'DensitySludge': 1000,
    'k': 0.05,
    's': 1.25,
    'g': 9.81,
    'd': 100 * 0.000001,
    'f': 0.025,
    'txtpsW': 6,
    'txtpsORa': 40,
    'txttnkqty': 2,
    'txtpsWL': 4,
    'txtBODa': 0.018,
    'txtBODb': 0.02,
    'txtTSSa': 0.0075,
    'txtTSSb': 0.014,
    'txtPSFB': 0.5,
    'txtpsqa': 3800,
    'txtpspkfctor': 1.2,
    'BODin': 220,
    'TSSin': 220,
    'Dryness': 3,
    'ActualtxtpsSTL': 4
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
    const k = getValue('k');
    const s = getValue('s');
    const g = getValue('g');
    const d = getValue('d');
    const f = getValue('f');
    const txtpsW = getValue('txtpsW');
    const txtpsORa = getValue('txtpsORa');
    const txttnkqty = getValue('txttnkqty');
    const txtpsWL = getValue('txtpsWL');
    const txtBODa = getValue('txtBODa');
    const txtBODb = getValue('txtBODb');
    const txtTSSa = getValue('txtTSSa');
    const txtTSSb = getValue('txtTSSb');
    const txtPSFB = getValue('txtPSFB');
    const txtpsqa = getValue('txtpsqa');
    const txtpspkfctor = getValue('txtpspkfctor');
    const BODin = getValue('BODin');
    const TSSin = getValue('TSSin');
    const Dryness = getValue('Dryness');
    const DensitySludge = getValue('DensitySludge');
    const ActualtxtpsSTL = getValue('ActualtxtpsSTL');

    // Perform all calculations
    // Calculate vs (settling velocity)
    const vs = Math.pow((8 * k * (s - 1) * g * d) / f, 0.5);
    const roundedVs = parseFloat(vs.toFixed(3));

    // Primary sedimentation calculations
    const txtpsSA = txtpsqa / txtpsORa;
    let txtpsSTL = txtpsSA / (txttnkqty * txtpsW);
    txtpsSTL = parseFloat(txtpsSTL.toFixed(2));

    const txtpsTD = txtpsWL + txtPSFB;
    const txtpsTVper = ActualtxtpsSTL * txtpsW * txtpsWL;
    const txtpsTV = txtpsTVper * txttnkqty;
    const txtpsqp = txtpspkfctor * txtpsqa;

    const txtpsORp = txtpsqp / (ActualtxtpsSTL * txtpsW * txttnkqty);
    const roundedORp = parseFloat(txtpsORp.toFixed(2));

    const txtpsaveDT = txtpsTV * 24 / txtpsqa;
    const txtpspeakDT = txtpsTV * 24 / txtpsqp;

    const vp = (txtpsqp * (1 / 24) * (1 / 3600)) / (txtpsWL * txtpsW * txttnkqty);
    const ActualtxtpsSA = txtpsSA / txttnkqty;
    const roundedVp = parseFloat(vp.toFixed(5));

    // Removal calculations
    const txtBODremovalav = (txtpsaveDT / (txtBODa + txtBODb * txtpsaveDT)) ;
    const roundedBODremovalav = parseFloat(txtBODremovalav.toFixed(2));

    const txtTSSremovalav = (txtpsaveDT / (txtTSSa + txtTSSb * txtpsaveDT)) ;
    const roundedTSSremovalav = parseFloat(txtTSSremovalav.toFixed(2));

    const txtBODremovalpk = (txtpspeakDT / (txtBODa + txtBODb * txtpspeakDT));
    const roundedBODremovalpk = parseFloat(txtBODremovalpk.toFixed(2));

    const txtTSSremovalpk = (txtpspeakDT / (txtTSSa + txtTSSb * txtpspeakDT)) ;
    const roundedTSSremovalpk = parseFloat(txtTSSremovalpk.toFixed(2));

    // Effluent calculations
    const BODout = (1 - (roundedBODremovalav / 100)) * BODin;
    const TSSout = (1 - (roundedTSSremovalav / 100)) * TSSin;

    // Sludge calculations
    const DSkgd = TSSout * 0.001 * txtpsqa * (roundedTSSremovalav / 100);
    const sludgekgd = DSkgd / (Dryness * 0.01);
    const Sludgeflowrate = sludgekgd / DensitySludge;

   const txtTankDimensions = `${ActualtxtpsSTL.toFixed(2)}m × ${txtpsW.toFixed(2)}m × ${txtpsTD.toFixed(2)}m`;

    // Prepare all output values
    const outputFields = {
      vs: roundedVs,
      txtpsSA: txtpsSA,
      txtpsSTL: txtpsSTL,
      txtpsTD: txtpsTD,
      txtpsTVper: txtpsTVper,
      txtpsTV: txtpsTV,
      txtpsqp: txtpsqp,
      txtpsORp: roundedORp,
      txtpsaveDT: txtpsaveDT,
      txtpspeakDT: txtpspeakDT,
      vp: roundedVp,
      txtBODremovalav: roundedBODremovalav,
      txtTSSremovalav: roundedTSSremovalav,
      txtBODremovalpk: roundedBODremovalpk,
      txtTSSremovalpk: roundedTSSremovalpk,
      BODout: BODout,
      TSSout: TSSout,
      DSkgd: DSkgd,
      sludgekgd: sludgekgd,
      Sludgeflowrate: Sludgeflowrate,
      ActualtxtpsSA: ActualtxtpsSA,
      txtTankDimensions: txtTankDimensions,

    };

    // Update DOM with results
    for (const [id, value] of Object.entries(outputFields)) {
      const el = document.getElementById(id);
      if (el) {
        el.value = value.toFixed(id === 'vp' ? 5 : 2);
      } else {
        console.warn(`Output element ${id} not found`);
      }
    }

  } catch (error) {
    console.error("Calculation error:", error);
    const resultsEl = document.getElementById('results');
    if (resultsEl) {
      resultsEl.innerHTML = `<div class="error">Error in calculations: ${error.message}</div>`;
    }
  }
}

// Function to generate the report
function generateReport() {
  try {
    // Recalculate tank dimensions
    const ActualtxtpsSTL = getValue('ActualtxtpsSTL');
    const txtpsW = getValue('txtpsW');
    const txtpsWL = getValue('txtpsWL');
    const txtPSFB = getValue('txtPSFB');
    const txtpsTD = txtpsWL + txtPSFB;
    const dimensionString = `${ActualtxtpsSTL.toFixed(2)}m × ${txtpsW.toFixed(2)}m × ${txtpsTD.toFixed(2)}m`;

    // Set dimensions string directly
    const dimensionField = document.getElementById('txtTankDimensions2');
    if (dimensionField) {
      dimensionField.value = dimensionString;
    } else {
      console.warn("txtTankDimensions2 not found in the DOM");
    }

    // Map and copy other fields
    const valueMap = {
      'txtpsqa': 'txtpsqa2',
      'txtpsqp': 'txtpsqp2',
      'txtpsSA': 'txtpsSA2',
      'txttnkqty': 'txttnkqty2',
      'ActualtxtpsSA': 'ActualtxtpsSA2',
      'BODin': 'BODin2',
      'TSSin': 'TSSin2',
      'BODout': 'BODout2',
      'TSSout': 'TSSout2',
      'txtpsORa':'txtpsORa2',

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


// Function to print the report
function printReport() {
  // First update the report
  generateReport();

  // Create a clone of the report section
  const reportClone = document.getElementById('reportSection').cloneNode(true);
  
  // Remove elements we don't want in print
  const elementsToRemove = [
    reportClone.querySelector('.print-button'),
    reportClone.querySelector('.project-info')
  ];
  
  elementsToRemove.forEach(element => {
    if (element) element.remove();
  });

  // Replace inputs with spans for printing
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

  // Get project details
  const projectName = document.getElementById('projectName').value || 'Unnamed Project';
  const projectNumber = document.getElementById('projectNumber').value || 'N/A';
  const projectDate = document.getElementById('projectDate').value || new Date().toISOString().substr(0, 10);
  const projectVersion = document.getElementById('projectVersion').value || '1.0';

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
}
printWindow.document.close();
// Initialize event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('calculate-btn').addEventListener('click', calculate);
  document.getElementById('reset-btn').addEventListener('click', resetForm);
  document.getElementById('example-btn').addEventListener('click', fillExample);
});