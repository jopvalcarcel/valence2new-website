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
    // Flow and velocity parameters
    'txtpipingflowratecmmin': 13.92,
    'txtpipingvelocity': 12,
    'txtpipingvelocity2': 12,
    'txtpipingvelocity3': 12,

    // Pipe segments
    'txtpipe1segment': 2,
    'txtpipe2segment': 1,
    'txtpipe3segment': 2,

    // Aeration tank specifications
    'txtDiffuserSpecification': 100,
    'txtDiameterperdiffuser': 0.2,
    'widthAerationTank': 4,
    'LenghtAerationTank': 4,
    'noaerationtank': 1
  };

  // Set all values in the form
  for (const [id, value] of Object.entries(exampleValues)) {
    const element = document.getElementById(id);
    if (element) {
      element.value = value;
    }
  }

  // Optional: Calculate results after filling example data
  // calculate(); // Uncomment if you want automatic calculation
}

// Main calculation function
function calculate() {
  try {
    // Get all input values
    const inputs = {
      txtpipingflowratecmmin: getValue('txtpipingflowratecmmin'),
      txtpipingvelocity: getValue('txtpipingvelocity'),
      txtpipingvelocity2: getValue('txtpipingvelocity2'),
      txtpipingvelocity3: getValue('txtpipingvelocity3'),
      txtpipe1segment: getValue('txtpipe1segment'),
      txtpipe2segment: getValue('txtpipe2segment'),
      txtpipe3segment: getValue('txtpipe3segment'),
      
      // Aeration tank parameters
      txtDiffuserSpecification: getValue('txtDiffuserSpecification'),
      txtDiameterperdiffuser: getValue('txtDiameterperdiffuser'),
      widthAerationTank: getValue('widthAerationTank'),
      LenghtAerationTank: getValue('LenghtAerationTank'),
      noaerationtank: getValue('noaerationtank')
    };

    // Calculate values
    const txtoption1Area1 = (1 / inputs.txtpipe1segment) * Math.round((inputs.txtpipingflowratecmmin / 60) / inputs.txtpipingvelocity * 1000) / 1000;
    const txtoption1Area2 = (1 / inputs.txtpipe2segment) * Math.round(((inputs.txtpipingflowratecmmin / 60) / inputs.txtpipingvelocity2) * 1000) / 1000;
    const txtoption1Area3 = (1 / inputs.txtpipe3segment) * Math.round(((inputs.txtpipingflowratecmmin / 60) / inputs.txtpipingvelocity3) * 1000) / 1000;
    
    let txtoption1Pipesize1 = "DN 400";
    if (txtoption1Area1 < 0.0013134) txtoption1Pipesize1 = "DN 40";
    else if (txtoption1Area1 < 0.0021648) txtoption1Pipesize1 = "DN 50";
    else if (txtoption1Area1 < 0.0030889) txtoption1Pipesize1 = "DN 65";
    else if (txtoption1Area1 < 0.0047696) txtoption1Pipesize1 = "DN 80";
    else if (txtoption1Area1 < 0.0063787) txtoption1Pipesize1 = "DN 90";
    else if (txtoption1Area1 < 0.008213) txtoption1Pipesize1 = "DN 100";
    else if (txtoption1Area1 < 0.012907) txtoption1Pipesize1 = "DN 125";
    else if (txtoption1Area1 < 0.018639) txtoption1Pipesize1 = "DN 150";
    else if (txtoption1Area1 < 0.032275) txtoption1Pipesize1 = "DN 200";
    else if (txtoption1Area1 < 0.050871) txtoption1Pipesize1 = "DN 250";
    else if (txtoption1Area1 < 0.072193) txtoption1Pipesize1 = "DN 300";
    else if (txtoption1Area1 < 0.09) txtoption1Pipesize1 = "DN 350";


        let txtoption1Pipesize2 = "DN 400";
    if (txtoption1Area2 < 0.0013134) txtoption1Pipesize2 = "DN 40";
    else if (txtoption1Area2 < 0.0021648) txtoption1Pipesize2 = "DN 50";
    else if (txtoption1Area2 < 0.0030889) txtoption1Pipesize2 = "DN 65";
    else if (txtoption1Area2 < 0.0047696) txtoption1Pipesize2 = "DN 80";
    else if (txtoption1Area2 < 0.0063787) txtoption1Pipesize2 = "DN 90";
    else if (txtoption1Area2 < 0.008213) txtoption1Pipesize2 = "DN 100";
    else if (txtoption1Area2 < 0.012907) txtoption1Pipesize2 = "DN 125";
    else if (txtoption1Area2 < 0.018639) txtoption1Pipesize2 = "DN 150";
    else if (txtoption1Area2 < 0.032275) txtoption1Pipesize2 = "DN 200";
    else if (txtoption1Area2 < 0.050871) txtoption1Pipesize2 = "DN 250";
    else if (txtoption1Area2 < 0.072193) txtoption1Pipesize2 = "DN 300";
    else if (txtoption1Area2 < 0.09) txtoption1Pipesize2 = "DN 350";

        let txtoption1Pipesize3 = "DN 400";
    if (txtoption1Area3 < 0.0013134) txtoption1Pipesize3 = "DN 40";
    else if (txtoption1Area3 < 0.0021648) txtoption1Pipesize3 = "DN 50";
    else if (txtoption1Area3 < 0.0030889) txtoption1Pipesize3 = "DN 65";
    else if (txtoption1Area3 < 0.0047696) txtoption1Pipesize3 = "DN 80";
    else if (txtoption1Area3 < 0.0063787) txtoption1Pipesize3 = "DN 90";
    else if (txtoption1Area3 < 0.008213) txtoption1Pipesize3 = "DN 100";
    else if (txtoption1Area3 < 0.012907) txtoption1Pipesize3 = "DN 125";
    else if (txtoption1Area3 < 0.018639) txtoption1Pipesize3 = "DN 150";
    else if (txtoption1Area3 < 0.032275) txtoption1Pipesize3 = "DN 200";
    else if (txtoption1Area3 < 0.050871) txtoption1Pipesize3 = "DN 250";
    else if (txtoption1Area3 < 0.072193) txtoption1Pipesize3 = "DN 300";
    else if (txtoption1Area3 < 0.09) txtoption1Pipesize3 = "DN 350";





    let txtoption1Actualvelocity1 = 0;
    let txtoption1Actualvelocity2 = 0;
    let txtoption1Actualvelocity3 = 0;

    const pipeAreas = {
        "DN 40": 0.0013134,
        "DN 50": 0.0021648,
        "DN 65": 0.0030889,
        "DN 80": 0.0047696,
        "DN 90": 0.0063787,
        "DN 100": 0.008213,
        "DN 125": 0.012907,
        "DN 150": 0.01839,
        "DN 200": 0.032275,
        "DN 250": 0.050871,
        "DN 300": 0.072193,
        "DN 350": 0.09,
        "DN 400": 0.11
    };


    txtoption1Actualvelocity1 = (1 / inputs.txtpipe1segment) * (inputs.txtpipingflowratecmmin / 60) / pipeAreas[txtoption1Pipesize1];

    txtoption1Actualvelocity2 = (1 / inputs.txtpipe2segment) * (inputs.txtpipingflowratecmmin / 60) / pipeAreas[txtoption1Pipesize2];

    txtoption1Actualvelocity3 = (1 / inputs.txtpipe3segment) * (inputs.txtpipingflowratecmmin / 60) / pipeAreas[txtoption1Pipesize3];


    //number of diffusers

   const txtnoofDiffuser = Math.round((inputs.txtpipingflowratecmmin * 1000) / inputs.txtDiffuserSpecification / inputs.noaerationtank
);
    const Areaofonediffuser = Math.round(Math.PI * (1 / 4) * Math.pow(inputs.txtDiameterperdiffuser, 2) * 1000) / 1000;
    const AreaofTotaldiffusers = Math.round(txtnoofDiffuser * Areaofonediffuser * 100) / 100;
    const Areareactor = inputs.widthAerationTank * inputs.LenghtAerationTank;
    // Prepare output values
    const outputFields = {

      txtoption1Area1: txtoption1Area1,
      txtoption1Area2: txtoption1Area2,
      txtoption1Area3: txtoption1Area3,
      txtoption1Pipesize1: txtoption1Pipesize1,
      txtoption1Pipesize2:txtoption1Pipesize2,
      txtoption1Pipesize3:txtoption1Pipesize3,
      txtoption1Actualvelocity1:txtoption1Actualvelocity1,
      txtoption1Actualvelocity2:txtoption1Actualvelocity2,
      txtoption1Actualvelocity3:txtoption1Actualvelocity3,
      txtnoofDiffuser:txtnoofDiffuser,
      Areaofonediffuser:Areaofonediffuser,
      AreaofTotaldiffusers:AreaofTotaldiffusers,
      Areareactor:Areareactor,
      

     
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

function generateReport() {
  try {
    // Map input fields to report fields
    const valueMap = {
      'txtpipingflowratecmmin': 'txtpipingflowratecmmin2',
      'txtoption1Pipesize1': 'txtoption1Pipesize12',
      'txtoption1Pipesize2': 'txtoption1Pipesize22',
      'txtoption1Pipesize3': 'txtoption1Pipesize32',
      'noaerationtank': 'noaerationtank2',
      'txtnoofDiffuser': 'txtnoofDiffuser2',

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

    // Get project and diffuser details BEFORE creating the clone
    const projectName = document.getElementById('projectName').value || 'Unnamed Project';
    const projectNumber = document.getElementById('projectNumber').value || 'N/A';
    const projectDate = document.getElementById('projectDate').value || new Date().toISOString().slice(0, 10);
    const projectVersion = document.getElementById('projectVersion').value || '1.0';
    const diffuserName = document.getElementById('diffuserName') ? document.getElementById('diffuserName').value || 'N/A' : 'N/A';
    const diffuserType = document.getElementById('diffuserType') ? document.getElementById('diffuserType').value || 'N/A' : 'N/A';
    const diffuserBrand = document.getElementById('diffuserBrand') ? document.getElementById('diffuserBrand').value || 'N/A' : 'N/A';

    // Create a clone of the report section
    const reportClone = reportSection.cloneNode(true);

    // Remove elements we don't want in print
    const elementsToRemove = [
      reportClone.querySelector('.print-button'),
      reportClone.querySelector('.project-info'),
      reportClone.querySelector('.diffuser-info'),
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
          <!-- Diffuser Details Table -->
          <h3>Diffuser Details</h3>
          <table border="1" cellpadding="5" cellspacing="0">
            <thead>
              <tr>
                <th>Parameter</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Diffuser Name</td>
                <td>${diffuserName}</td>
              </tr>
              <tr>
                <td>Diffuser Type</td>
                <td>${diffuserType}</td>
              </tr>
              <tr>
                <td>Diffuser Brand</td>
                <td>${diffuserBrand}</td>
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