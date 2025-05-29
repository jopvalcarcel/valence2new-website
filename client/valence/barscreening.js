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
    'txtscav' :20000,
    'txtscpkfactor': 1.5,
    'txtvolscreeningspercum': 0.0375 / 1000,
    'txtscreenchambern': 30,
    'txtscLenghtogBar': 9,
    'txtscLenghtbetweenbar': 30,
    'txtscavevelocitynormal': 0.3,
    'txtscpkvelocitynormal': 0.75,
    'txtSCangle': 30,
    'txtscFBT': 0.3


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
      txtscav: getValue('txtscav'),
      txtscpkfactor: getValue('txtscpkfactor'),
      txtvolscreeningspercum: getValue('txtvolscreeningspercum'),
      txtscreenchambern: getValue('txtscreenchambern'),
      txtscLenghtogBar: getValue('txtscLenghtogBar'),
      txtscLenghtbetweenbar: getValue('txtscLenghtbetweenbar'),
      txtscavevelocitynormal: getValue('txtscavevelocitynormal'),
      txtscpkvelocitynormal: getValue('txtscpkvelocitynormal'),
      txtSCangle: getValue('txtSCangle'),
      txtscFBT: getValue('txtscFBT')

 };
    // Perform all calculations
// Calculate vs (settling velocity)
// Calculate total volume

    let txtscpk = inputs.txtscav * inputs.txtscpkfactor;
    
    let txtscavcms = inputs.txtscav / 24 / 60 / 60;
    txtscavcms = parseFloat(txtscavcms.toFixed(2));
    
      let txtscpkcms = txtscpk / 24 / 60 / 60;
    txtscpkcms = parseFloat(txtscpkcms.toFixed(5));

        let txtscNSAave = txtscavcms / parseFloat(txtscavevelocitynormal.value);
    txtscNSAave = parseFloat(txtscNSAave.toFixed(5));

        let txtscNSApk = txtscpkcms / parseFloat(txtscpkvelocitynormal.value);
    txtscNSApk = parseFloat(txtscNSApk.toFixed(5));

      const numerator = (inputs.txtscreenchambern + 1) * (inputs.txtscLenghtbetweenbar);
    const denominator = numerator + (inputs.txtscreenchambern) * (inputs.txtscLenghtogBar);
    const txtRatioopeninggrosswidth = numerator / denominator;


        let txtscGSAave = txtscNSAave / txtRatioopeninggrosswidth;
    txtscGSAave = parseFloat(txtscGSAave.toFixed(5));
        const angleRad = (inputs.txtSCangle / 180) * Math.PI;


            let txtscGSAaveVertical = txtscGSAave * Math.sin(angleRad);
    txtscGSAaveVertical = parseFloat(txtscGSAaveVertical.toFixed(5));
    const txtSCvelocityNormaltovertical = txtscavcms / txtscGSAaveVertical;
    const txtvolscreenings = (0.0375 / 1000) * (inputs.txtscav);
        const txtscW = ((inputs.txtscreenchambern + 1) * (inputs.txtscLenghtbetweenbar) + (inputs.txtscreenchambern) * (inputs.txtscLenghtogBar)) / 1000
        const txtscWL = txtscGSAaveVertical / txtscW;
        const txtscTD = parseFloat(txtscWL) + parseFloat(txtscFBT.value);
    // Return all calculated values
    const outputFields = {
         
       txtscpk: txtscpk,
        txtscavcms: txtscavcms,
        txtscpkcms:txtscpkcms,
        txtscNSAave:txtscNSAave,
        txtscNSApk:txtscNSApk,
         txtscGSAave: txtscGSAave,
          txtRatioopeninggrosswidth:txtRatioopeninggrosswidth,
          txtscGSAaveVertical:txtscGSAaveVertical,
          txtSCvelocityNormaltovertical:txtSCvelocityNormaltovertical,
          txtvolscreenings:txtvolscreenings,
          txtscW:txtscW,
          txtscWL:txtscWL,
          txtscTD:txtscTD,
      

 
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
      'txtscNSAave': 'txtscNSAave2',
      'txtscNSApk': 'txtscNSApk2',
      'txtscreenchambern': 'txtscreenchambern2',
      'txtscLenghtbetweenbar': 'txtscLenghtbetweenbar2',
      'txtscLenghtogBar': 'txtscLenghtogBar2',
      'txtscW': 'txtscW2',
      'txtscWL': 'txtscWL2',
      'txtscLenghtogBar': 'txtscLenghtogBar2',
      'txtscavevelocitynormal': 'txtscavevelocitynormal2',
       'txtSCangle': 'txtSCangle2',





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

  // Replace inputs with spans for printing - including the '2' fields
  const inputs = reportClone.querySelectorAll('input[readonly], select[readonly], input[id$="2"], select[id$="2"]');
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