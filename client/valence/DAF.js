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
    'RecyclePressure': 275,
    'FS': 0.5,
    'ASratio': 0.008,
    'MLSS': 3000,
    'Qave': 400,
    'AirSolubility': 18.7,
    'SurfaceLoadingRate': 8,
    'PACdosingrate': 25,
    'PACDensity': 1.2,
    'FLoccDensity': 1,
    'Flocculantdosingrate': 0.1,
    'Dissolvingconcentration': 0.1,
    'DensitySludge': 1000,
    'Percentsolids': 0.8,
    'TSSin': 150,
    'BODRemoval': 50,
    'CODRemoval': 60,
    'TSSRemoval': 80,
    'DAFwidth': 2,
    'DAFActlength':10,


  
    // Additional parameters (duplicates with different values - keeping both)
    'Qave': 3800,
    'BODin': 210,
    'CODin': 420,
    'TSSin': 333    
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
 RecyclePressure: getValue('RecyclePressure'),
      FS: getValue('FS'),
      ASratio: getValue('ASratio'),
      MLSS: getValue('MLSS'),
      Qave: getValue('Qave'),
      AirSolubility: getValue('AirSolubility'),
      SurfaceLoadingRate: getValue('SurfaceLoadingRate'),
      PACdosingrate: getValue('PACdosingrate'),
      PACDensity: getValue('PACDensity'),
      FLoccDensity: getValue('FLoccDensity'),
      Flocculantdosingrate: getValue('Flocculantdosingrate'),
      Dissolvingconcentration: getValue('Dissolvingconcentration'),
      DensitySludge: getValue('DensitySludge'),
      Percentsolids: getValue('Percentsolids'),
      TSSin: getValue('TSSin'),
      BODRemoval: getValue('BODRemoval'),
      CODRemoval: getValue('CODRemoval'),
      TSSRemoval: getValue('TSSRemoval'),
      
      // Note: These will overwrite the previous values for Qave and TSSin
      Qave: getValue('Qave'),
      BODin: getValue('BODin'),
      CODin: getValue('CODin'),
      TSSin: getValue('TSSin'),
      DAFwidth: getValue('DAFwidth')
    };

    // Calculate water level difference
    const OP = (inputs.RecyclePressure + 101.325) / 101.325;
    const RecycleRate = inputs.ASratio * inputs.MLSS * inputs.Qave / 
                       (1.3 * inputs.AirSolubility * (inputs.FS * OP - 1));
    
    let RequiredSurfaceArea = RecycleRate * 1000 / (inputs.SurfaceLoadingRate * 1440);
    RequiredSurfaceArea = parseFloat(RequiredSurfaceArea.toFixed(2))
   const PACFlowrate = inputs.Qave * inputs.PACdosingrate * (1 / 1000) * (1 / inputs.PACDensity);
   const FloccFlowrate = inputs.Qave * inputs.Flocculantdosingrate * (1 / 1000) * 
                         (100 / inputs.Dissolvingconcentration) * (1 / inputs.FLoccDensity);


    const SolidsRemovalRate = inputs.TSSin * (1 / 1000) * inputs.Qave;

    const Sludgeflowrate = SolidsRemovalRate * (1 / inputs.DensitySludge)

      
    const BODout = (1 - inputs.BODRemoval * 0.01) * inputs.BODin;
    const CODout = (1 - inputs.CODRemoval * 0.01) * inputs.CODin;
    const TSSout = (1 - inputs.TSSRemoval * 0.01) * inputs.TSSin;
    const Flowrateout = inputs.Qave - Sludgeflowrate;

    const DAFNeclength = (RequiredSurfaceArea)/(inputs.DAFwidth);


    // Prepare output values
    const outputFields = {
      FloccFlowrate:FloccFlowrate,
      OP:OP,
      RecycleRate:RecycleRate,
      RequiredSurfaceArea:RequiredSurfaceArea,
      PACFlowrate:PACFlowrate,
      SolidsRemovalRate:SolidsRemovalRate,
      Sludgeflowrate,
      BODout,
      CODout,
      TSSout,
      Flowrateout,
      DAFNeclength,



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
    const DAFActlength = getValue('DAFActlength');
    const DAFwidth = getValue('DAFwidth');
    const DafWL = getValue('DafWL');

    const dimensionString = `${DAFActlength.toFixed(2)}m × ${DAFwidth.toFixed(2)}m × ${DafWL.toFixed(2)}m`;

    // Set dimensions string directly
    const dimensionField = document.getElementById('txtTankDimensions2');
    if (dimensionField) {
      dimensionField.value = dimensionString;
    } else {
      console.warn("txtTankDimensions2 not found in the DOM");
    }

    // Map input fields to report fields
    const valueMap = {
'Flowrateout': 'Flowrateout2',
      'BODin': 'BODin2',
      'CODin': 'CODin2',
      'TSSin': 'TSSin2',
      'BODout': 'BODout2',
      'CODout': 'CODout2',
      'TSSout': 'TSSout2',
      'RecyclePressure': 'RecyclePressure2',
      'SurfaceLoadingRate': 'SurfaceLoadingRate2',
      'RequiredSurfaceArea': 'RequiredSurfaceArea2',
      'PACFlowrate': 'PACFlowrate2',
       'FloccFlowrate': 'FloccFlowrate2',
       'Sludgeflowrate': 'Sludgeflowrate2',
       'BODRemoval': 'BODRemoval2',
        'CODRemoval': 'CODRemoval2',
        'TSSRemoval': 'TSSRemoval2',
        'Brand': 'Brand2',





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

    // Get project and DAF chemical dosing pump details BEFORE creating the clone
    const projectName = document.getElementById('projectName').value || 'Unnamed Project';
    const projectNumber = document.getElementById('projectNumber').value || 'N/A';
    const projectDate = document.getElementById('projectDate').value || new Date().toISOString().slice(0, 10);
    const projectVersion = document.getElementById('projectVersion').value || '1.0';
    const pumpName = document.getElementById('pumpName') ? document.getElementById('pumpName').value || 'N/A' : 'N/A';
    const dafPurpose = document.getElementById('dafPurpose') ? document.getElementById('dafPurpose').value || 'N/A' : 'N/A';
    const brand = document.getElementById('brand') ? document.getElementById('brand').value || 'N/A' : 'N/A';
    const model = document.getElementById('model') ? document.getElementById('model').value || 'N/A' : 'N/A';
    const powerConsumption = document.getElementById('powerConsumption') ? document.getElementById('powerConsumption').value || 'N/A' : 'N/A';

    // Create a clone of the report section
    const reportClone = reportSection.cloneNode(true);

    // Remove elements we don't want in print
    const elementsToRemove = [
      reportClone.querySelector('.print-button'),
      reportClone.querySelector('.project-info'),
      reportClone.querySelector('.daf-pump-info'),
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
          <!-- DAF Chemical Dosing Pump Details Table -->
          <h3>DAF Chemical Dosing Pump Details</h3>
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
                <td>DAF Purpose</td>
                <td>${dafPurpose}</td>
              </tr>
              <tr>
                <td>Brand</td>
                <td>${brand}</td>
              </tr>
              <tr>
                <td>Model</td>
                <td>${model}</td>
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