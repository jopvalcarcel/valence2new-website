function getVal(id) {
  return parseFloat(document.getElementById(id)?.value) || 0;
}

function setVal(id, value, decimals = 2) {
  const el = document.getElementById(id);
  if (el) {
    // Only animate if the value is changing
    if (el.value !== value.toFixed(decimals)) {
      el.value = value.toFixed(decimals);
      
      // Add animation class
      el.classList.add('calculated-animation');
      
      // Remove animation class after animation completes
      setTimeout(() => {
        el.classList.remove('calculated-animation');
      }, 500);
    }
  }
}

function calculate() {
  // Get all input values first
  const temperature = getVal('txttemperature');
  const oilandgrease = getVal('txtoilandgrease');
  const Alkalinity = getVal('txtalkalinity');
  const COD = getVal('txtCOD');
  const BODCOD = getVal('txtBODCOD');
  const tkn = getVal('txtTKN');
  const fNUI = getVal('txtfNui');
  const flow = getVal('txtFlowrate');
  const ratio = getVal('txtPeakratio');
  const peakhour = getVal('txtpeakhour');
  const peakflow = getVal('txtPeakFlowrate');
  const nh4ntkn = getVal('txtNH4NTKN');
  const bCODBOD = getVal('txtbCODBOD');
  const tknVSS = getVal('txtTKNVSS');
  const VSSTSS = getVal('txtVSSTSS');
  const TP = getVal('txtTotalphosphorus');
  const frbCOD = getVal('txtfrbCOD');
  const fnbsCOD = getVal('txtfnbsCOD');
  const fnbpCOD = getVal('txtfnbpCOD');
  const sCOD = getVal('txtsCOD');
  const NOX = getVal('txtNOX');
  const sBOD = getVal('txtsBOD');


  // Calculate in proper dependency order
  // 1. Basic parameters
  const BOD = COD * BODCOD;
  const VSS = tkn / tknVSS;
  const TSS = VSS / VSSTSS;
  const iTSS = TSS - VSS;
  const NH4N = tkn * nh4ntkn;
  
  // 2. COD fractions
  const rbCOD = COD * frbCOD;
  const sbCOD = COD * (1 - frbCOD - fnbsCOD - fnbpCOD);
  const nbCOD = COD * (fnbsCOD + fnbpCOD);
  const nbsCOD = COD * fnbsCOD;
  const nbpCOD = COD * fnbpCOD;
  const SCODCOD = sCOD / COD;
  const pCOD = COD * (1 - SCODCOD);
  const bCOD = COD * (1 - fnbsCOD - fnbpCOD);
  
  // 3. COD particulate/soluble breakdown
  const psbCOD = pCOD - nbpCOD;
  const csbCOD = sCOD - rbCOD - nbsCOD;
  const sCOD2 = csbCOD + rbCOD + nbsCOD;
  const pCOD2 = psbCOD + nbpCOD;
  
  // 4. Nitrogen fractions
  const fNai = nh4ntkn;
  const Nai = tkn * fNai;
  const On = tkn - Nai;
  const Nui = On * fNUI;
  const nbON = On - Nui;
  const Noi = nbON * 0.5; // Assuming equal split
  const Npi = nbON * 0.5; // Assuming equal split
  const totalsNo = Noi+Npi
  const sbON = Nui * 0.6; // Example ratio
  const pbON = Nui - sbON;
  const bTKN = Nai + Nui;
  const pON = tkn - Nai - (sbON + Noi);
  const nbpON = tkn - bTKN 
 

  // 5. VSS related calculations
  const VSScod = (COD - sCOD2) / VSS;
  const nbVSS = nbpCOD / VSScod;
  
  // 6. Ratios and fractions
  const TKNCOD = tkn / COD;
  const TPCOD = TP / COD;
  const fsbCOD = 1 - frbCOD - fnbsCOD - fnbpCOD;
  const fN = pON / VSS;
  const fNPI = Npi / tkn;
  const fNAI = nh4ntkn;
  const fNOI = Noi / tkn;

  // Set all values in one pass
  // Flow parameters
  setVal('txtPeakFlowrate', flow * ratio);
  
  // Influent parameters
  setVal('txtBOD', BOD);
  setVal('txtVSS', VSS);
  setVal('txtTSS', TSS);
  setVal('txtiTSS', iTSS);
  setVal('txtNH4N', NH4N);
  
  // COD calculations
  setVal('txtrbCOD', rbCOD);
  setVal('txtrbCOD2', rbCOD);
  setVal('txtsbCOD2', sbCOD);
  setVal('txtbCOD', bCODBOD * BOD);
  setVal('txtfsbCOD', fsbCOD);
  setVal('txtnbCOD', nbCOD);
  setVal('txtnbsCOD', nbsCOD);
  setVal('txtnbpCOD', nbpCOD);
  setVal('txtSCODCOD', SCODCOD);
  setVal('txtpCOD', pCOD);
  setVal('txtbCOD2', bCOD);
  setVal('txtpsbCOD', psbCOD);
  setVal('txtcsbCOD', csbCOD);
  setVal('txtsCOD2', sCOD2);
  setVal('txtpCOD2', pCOD2);
  setVal('txtCOD2', COD);
  setVal('txtCOD3', sCOD2 + pCOD2);
  
  // VSS related
  setVal('txtVSScod', VSScod);
  setVal('txtnbVSS', nbVSS);
  
  // Nitrogen calculations
  setVal('txtTKNCOD', TKNCOD);
  setVal('txtTKN2', tkn);
  setVal('txtTKN3', tkn);
  setVal('txtTKN4', tkn);
  setVal('txtTKN5', tkn);
  setVal('txtfNai', fNai);
  setVal('txtNai', Nai);
  setVal('txtNpi', Npi);
  setVal('txtOn', On);
  setVal('txtNui', Nui);
  setVal('txtnbON', nbON);
  setVal('txtnbpON', nbpON);
  setVal('txtNoi', Noi);
  setVal('txtsbON', sbON);
  setVal('txtpbON', pbON);
  setVal('txtbTKN', bTKN);
  setVal('txtnbsON2', Noi);
  setVal('txtpON', pON);
  setVal('txtNai2', Nai);
  setVal('txttotalsON', totalsNo);





  
  // Ratios
  setVal('txtTPCOD', TPCOD);
  setVal('txtfN', fN);
  setVal('txtfNPI', fNPI);
  setVal('txtfNAI', fNAI);
  setVal('txtfNOI', fNOI);

  // Get the values from the input boxes
  setVal('txtFlowrate2', flow);
  setVal('txtpeakhour2', peakhour);
  setVal('txtPeakFlowrate2', peakflow);
  setVal('txtPeakratio2', ratio);

  setVal('txttemperature2', temperature);
  setVal('txtpH2', ratio);
  setVal('txtOG2', oilandgrease);
  setVal('txtAlkalinity2', Alkalinity);
  setVal('txtBOD2', BOD);
  setVal('txtsBOD2', sBOD);
  setVal('txtbCODBOD2', bCODBOD);
  setVal('txtCOD7', COD);
  setVal('txtsCOD7', COD);
  setVal('txtTSS2', TSS);
  setVal('txtVSS2', VSS);
  setVal('txtVSS2', VSS);
  setVal('txtnbVSS2', nbVSS);
  setVal('txtTKN7', tkn);
  setVal('txtNH4N7', NH4N);
  setVal('txtTP2', TP);
  setVal('txtTC2', 10000);
  setVal('txtNO3N2', NOX);


  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //













  // Example: maybe calculate peak flowrate if needed
  // peakflowrate = flowrate * peakratio;
  // document.getElementById("txtPeakFlowrate").value = peakflowrate.toFixed(2);




}

function resetForm() {
  document.querySelectorAll('input').forEach(input => input.value = '');
}

function fillExample() {
  const exampleValues = {
    txtFlowrate: 1000,
    txtPeakratio: 2.5,
    txtpeakhour: 3,
    txtalkalinity:140,
    txtoilandgrease:105,
    txttemperature:30,
    txtph:7,
    txtCOD: 420,
    txtBODCOD: 0.5,
    txtsCOD: 170,
    txtTKN: 40,
    txtTotalphosphorus: 10,
    txtVSSTSS: 0.6,
    txtNH4NTKN: 0.65,
    txtTKNVSS: 0.2,
    txtfrbCOD: 0.1905,
    txtfnbsCOD: 0.07,
    txtfnbpCOD: 0.1667,
    txtfNui: 0.2305,
    txtnbsON: 1.2,
    txtbCODBOD: 1.6,
    txtNOX: 0,
    txtTotalColiform:1000000,
    txtOrthophosphate:5,
    txtsBOD:110,
  };

  for (let id in exampleValues) {
    const el = document.getElementById(id);
    if (el) el.value = exampleValues[id];
  }
  calculate();
}

//Generate report



// Function to generate the report
 function generateReport() {
  // Show the report section
  document.getElementById('reportSection').style.display = 'block';
  
  // Copy values from input form to report
  document.getElementById('txtFlowrate2').value = document.getElementById('txtFlowrate').value;
  document.getElementById('txtPeakratio2').value = document.getElementById('txtPeakratio').value;
  document.getElementById('txtpeakhour2').value = document.getElementById('txtpeakhour').value;
  document.getElementById('txtPeakFlowrate2').value = document.getElementById('txtPeakFlowrate').value;
  document.getElementById('txttemperature2').value = document.getElementById('txttemperature').value;
  document.getElementById('txtph2').value = document.getElementById('txtph').value;
  document.getElementById('txtoilandgrease2').value = document.getElementById('txtoilandgrease').value;
  document.getElementById('txtBOD2').value = document.getElementById('txtBOD').value;
  document.getElementById('txtCOD9').value = document.getElementById('txtCOD').value;
  document.getElementById('txtTKN9').value = document.getElementById('txtTKN').value;
  document.getElementById('txtNH4N2').value = document.getElementById('txtNH4N').value;
  document.getElementById('txtNOX2').value = document.getElementById('txtNOX').value;
  document.getElementById('txtTotalphosphorus2').value = document.getElementById('txtTotalphosphorus').value;
  document.getElementById('txtOrthophosphate2').value = document.getElementById('txtOrthophosphate').value;
  document.getElementById('txtTSS2').value = document.getElementById('txtTSS').value;
  document.getElementById('txtVSS2').value = document.getElementById('txtVSS').value;
  document.getElementById('txtTotalColiform2').value = document.getElementById('txtTotalColiform').value;
  
  // Scroll to report section
  document.getElementById('reportSection').scrollIntoView({ behavior: 'smooth' });
}

function printReport() {
  // First update the report
  generateReport();

  // Get project details BEFORE creating the clone
  const projectName = document.getElementById('projectName').value || 'Unnamed Project';
  const projectNumber = document.getElementById('projectNumber').value || 'N/A';
  const projectDate = document.getElementById('projectDate').value || new Date().toISOString().substr(0, 10);
  const projectVersion = document.getElementById('projectVersion').value || '1.0';

  // Get effluent values
  const effpH = document.getElementById('efftxtph').value || 'N/A';
  const effOilGrease = document.getElementById('efftxtoilandgrease').value || 'N/A';
  const effAlkalinity = document.getElementById('efftxtalkalinity').value || 'N/A';
  const effBOD = document.getElementById('efftxtBOD').value || 'N/A';
  const effCOD = document.getElementById('efftxtCOD').value || 'N/A';
  const effTSS = document.getElementById('efftxtTSS').value || 'N/A';
  const effNH4N = document.getElementById('efftxtNH4N').value || 'N/A';
  const effNOX = document.getElementById('efftxtNOX').value || 'N/A';
  const effTotalPhosphorus = document.getElementById('efftxtTotalphosphorus').value || 'N/A';
  const effTotalColiform = document.getElementById('efftxtTotalColiform').value || 'N/A';

  // Create print window
  const printWindow = window.open('', '_blank');
  printWindow.document.write(`
<html>
  <head>
    <title>Design Condition Report</title>
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
      .project-details div {
        flex: 1;
        min-width: 200px;
        margin: 5px 10px;
      }
      .project-column {
        display: flex;
        flex-direction: column;
      }
      .effluent-table {
        margin-top: 20px;
      }
      .page-break {
        page-break-before: always;
      }
      @page { size: auto; margin: 10mm; }
    </style>
  </head>
  <body>
    <div class="project-header">
      <h1>Design Condition</h1>
      <div class="project-details">
        <div class="project-column">
          <div><strong>Project:</strong> ${projectName}</div>
          <div><strong>Number:</strong> ${projectNumber}</div>
        </div>
        <div class="project-column">
          <div><strong>Date:</strong> ${projectDate}</div>
          <div><strong>Version:</strong> ${projectVersion}</div>
        </div>
      </div>
    </div>
    
    <h3>Influent Parameters</h3>
    <table border="1">
      <thead>
        <tr>
          <th>Parameter</th>
          <th>Unit</th>
          <th>Actual Value</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>Average Flow</td><td>m3/d</td><td>${document.getElementById('txtFlowrate').value}</td></tr>
        <tr><td>Peak Ratio</td><td>--</td><td>${document.getElementById('txtPeakratio').value}</td></tr>
        <tr><td>Peak Hour</td><td>hours</td><td>${document.getElementById('txtpeakhour').value}</td></tr>
        <tr><td>Peak Flow</td><td>m3/d</td><td>${document.getElementById('txtPeakFlowrate').value}</td></tr>
        <tr><td>Temperature</td><td>°C</td><td>${document.getElementById('txttemperature').value}</td></tr>
        <tr><td>pH</td><td>--</td><td>${document.getElementById('txtph').value}</td></tr>
        <tr><td>Oil and Grease</td><td>mg/L</td><td>${document.getElementById('txtoilandgrease').value}</td></tr>
        <tr><td>BOD</td><td>mg/L</td><td>${document.getElementById('txtBOD').value}</td></tr>
        <tr><td>COD</td><td>mg/L</td><td>${document.getElementById('txtCOD').value}</td></tr>
        <tr><td>TSS</td><td>mg/L</td><td>${document.getElementById('txtTSS').value}</td></tr>
        <tr><td>VSS</td><td>mg/L</td><td>${document.getElementById('txtVSS').value}</td></tr>
        <tr><td>NH4N</td><td>mg/L</td><td>${document.getElementById('txtNH4N').value}</td></tr>
        <tr><td>NO3N</td><td>mg/L</td><td>${document.getElementById('txtNOX').value}</td></tr>
        <tr><td>Total Phosphorus</td><td>mg/L</td><td>${document.getElementById('txtTotalphosphorus').value}</td></tr>
        <tr><td>Ortho Phosphate</td><td>mg/L</td><td>${document.getElementById('txtOrthophosphate').value}</td></tr>
        <tr><td>Total Coliform</td><td>MPN/100ml</td><td>${document.getElementById('txtTotalColiform').value}</td></tr>
      </tbody>
    </table>
    
    <div class="page-break"></div>
    <h3>Effluent Requirements</h3>
    <table border="1" class="effluent-table">
      <thead>
        <tr>
          <th>Parameter</th>
          <th>Unit</th>
          <th>Target Value</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>pH</td><td>--</td><td>${effpH}</td></tr>
        <tr><td>Oil and Grease</td><td>mg/L</td><td>${effOilGrease}</td></tr>
        <tr><td>Alkalinity</td><td>mg/L</td><td>${effAlkalinity}</td></tr>
        <tr><td>BOD</td><td>mg/L</td><td>${effBOD}</td></tr>
        <tr><td>COD</td><td>mg/L</td><td>${effCOD}</td></tr>
        <tr><td>TSS</td><td>mg/L</td><td>${effTSS}</td></tr>
        <tr><td>NH4N</td><td>mg/L</td><td>${effNH4N}</td></tr>
        <tr><td>NO3N</td><td>mg/L</td><td>${effNOX}</td></tr>
        <tr><td>Total Phosphorus</td><td>mg/L</td><td>${effTotalPhosphorus}</td></tr>
        <tr><td>Total Coliform</td><td>MPN/100ml</td><td>${effTotalColiform}</td></tr>
      </tbody>
    </table>
    
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