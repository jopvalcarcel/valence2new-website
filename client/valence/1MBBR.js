function resetForm() {
    document.querySelectorAll('input[type="number"]').forEach(input => {
        if (!input.hasAttribute('readonly')) {
            input.value = '';
        }
    });
    document.getElementById('results').innerHTML = '';
}

function fillExample() {
    // Flow parameters
    document.getElementById('iFlowrate').value = 480;
    document.getElementById('iTemp').value = 30;
    document.getElementById('iNBVSS').value = 42;
    document.getElementById('iVSSin').value = 165;
    document.getElementById('iAlkalinityin').value = 100;
    document.getElementById('iBODin').value = 220;
    document.getElementById('iNH4Nin').value = 25;
    document.getElementById('iNO3Nin').value = 0;
    document.getElementById('iTSSin').value = 220;
    document.getElementById('iTKN').value = 40;
    document.getElementById('iSALR').value = 7.5;
    document.getElementById('iBODremoval').value = 95;
    document.getElementById('iSSA').value = 500;
    document.getElementById('iMediaFillVol').value = 50;
    document.getElementById('i1mediavoid').value = 60;
    document.getElementById('iSRT').value = 6;
    document.getElementById('ibCODBOD').value = 1.6;
    document.getElementById('itxtSolidsContent').value = 2;
    document.getElementById('itxtSGSludgeperm3Sludge').value = 1.001;
    document.getElementById('i1txtelev').value = 500;
    document.getElementById('i1txtTemp').value = 30;
    document.getElementById('i1txtLD').value = 4.94;
    document.getElementById('i1txtDDfromBottom').value = 0.54;
    document.getElementById('i1txtde').value = 0.4;
    document.getElementById('i1txtOCS').value = 9.09;
    document.getElementById('i1txtOCT').value = 10.78;
    document.getElementById('i1txta').value = 0.5;
    document.getElementById('i1txtb').value = 0.95;
    document.getElementById('i1txtf').value = 0.9;
    document.getElementById('i1txtDO').value = 2;
    document.getElementById('i1txtDA').value = 1.1633;
    document.getElementById('i1txtO2').value = 0.5;
    document.getElementById('i1OTEpersubmerged').value = 2.5;
    document.getElementById('iSLR').value =24;
   



}

function calculate() {
    try {
        // Get input values
        const iFlowrate = parseFloat(document.getElementById('iFlowrate').value) || 0;
        const iBODin = parseFloat(document.getElementById('iBODin').value) || 0;
        const iTKN = parseFloat(document.getElementById('iTKN').value) || 0;
        const iSALR = parseFloat(document.getElementById('iSALR').value) || 0;
        const iBODremoval = parseFloat(document.getElementById('iBODremoval').value) || 0;
        const iSSA = parseFloat(document.getElementById('iSSA').value) || 0;
        const iMediaFillVol = parseFloat(document.getElementById('iMediaFillVol').value) || 0;
        const i1mediavoid = parseFloat(document.getElementById('i1mediavoid').value) || 0;
        const iSRT= parseFloat(document.getElementById('iSRT').value) || 0;
        const ibCODBOD= parseFloat(document.getElementById('ibCODBOD').value) || 0;
        const iNBVSS= parseFloat(document.getElementById('iNBVSS').value) || 0;
        const iVSSin= parseFloat(document.getElementById('iVSSin').value) || 0;
        const iTSSin= parseFloat(document.getElementById('iTSSin').value) || 0;
        const itxtSolidsContent= parseFloat(document.getElementById('itxtSolidsContent').value) || 0;
        const itxtSGSludgeperm3Sludge= parseFloat(document.getElementById('itxtSGSludgeperm3Sludge').value) || 0;
        const i1txtelev= parseFloat(document.getElementById('i1txtelev').value) || 0;
        const i1txtLD= parseFloat(document.getElementById('i1txtLD').value) || 0;
        const i1txtDDfromBottom= parseFloat(document.getElementById('i1txtDDfromBottom').value) || 0;
        const i1txtde= parseFloat(document.getElementById('i1txtde').value) || 0
        const i1txtOCS= parseFloat(document.getElementById('i1txtOCS').value) || 0
        const i1txtOCT= parseFloat(document.getElementById('i1txtOCT').value) || 0
        const i1txta= parseFloat(document.getElementById('i1txta').value) || 0
        const i1txtb= parseFloat(document.getElementById('i1txtb').value) || 0
        const i1txtf= parseFloat(document.getElementById('i1txtf').value) || 0
        const i1txtDO= parseFloat(document.getElementById('i1txtDO').value) || 0
        const i1txtDA= parseFloat(document.getElementById('i1txtDA').value) || 0
        const i1txtO2= parseFloat(document.getElementById('i1txtO2').value) || 0
        const i1OTEpersubmerged= parseFloat(document.getElementById('i1OTEpersubmerged').value) || 0
        const iSLR= parseFloat(document.getElementById('iSLR').value) || 0
        






        // Validate inputs



        if (iTKN === 0) throw new Error("TKN value cannot be zero (division by zero)");
        if (iSALR === 0) throw new Error("SALR value cannot be zero (division by zero)");

        // Flow calculations
        const iBODTKN = iBODin / iTKN;
        const iSARR = iSALR * (iBODremoval * 0.01);
        const i1Mediaarea = (iFlowrate * iBODin) / iSALR;
        const i1Mediavolume = i1Mediaarea / iSSA;
        const i1tankvol = i1Mediavolume / (iMediaFillVol * 0.01);
        const i1Mediadisplacedvolume = i1Mediavolume * (1 - (i1mediavoid * 0.01));
        let iHRTstage1 = 24 * (i1tankvol - i1Mediadisplacedvolume) / iFlowrate;
        iHRTstage1 = Math.round(iHRTstage1 * 100) / 100;
        const is1BODLoading = iFlowrate * iBODin * 0.001;
        const iBODeff = iBODin*(1-iBODremoval * 0.01)
        const is2BODLoading = iFlowrate * iBODin * (1 - iBODremoval * 0.01) * 0.001;
        const iYH = 0.45;
        const iYn = 0.15;
        const ifd = 0.15;



        const temp = parseFloat(iTemp.value);
        let ibh = (0.12) * Math.pow(1.04, temp - 20);
        ibh = Math.round(ibh * 100) / 100;
        
        let ibn = (0.17) * Math.pow(1.029, temp - 20);
        ibn = Math.round(ibn * 100) / 100;



     // Solids production calculations
     const ipxbioHET = iFlowrate * 0.001 * (
        (iYH * ibCODBOD * (iBODin - iBODeff) * (1 + ifd * ibh * iSRT)) /
        (1 + ibh * iSRT)
    );

    
const ipxbio = ipxbioHET;
const ipxvss = ipxbio+ iFlowrate* (1 / 1000)*iNBVSS ;
const ipxtss = (ipxbio / 0.85) + iFlowrate * (1 / 1000) *iNBVSS+ iFlowrate * (1 / 1000) *(iTSSin-iVSSin);


// Sludge flowrate

const itxtSludgeflowrate = ipxtss / ( (itxtSolidsContent / 100) * 1000 * itxtSGSludgeperm3Sludge );



//Air flowrate



const iOTRBOD = (is1BODLoading- is2BODLoading) * ibCODBOD- 1.42 *ipxbio;
let i1txtOUR = iOTRBOD / 24;
const itxtTemp= parseFloat(document.getElementById('i1txtTemp').value) || 0;
let i1txtRP = Math.exp((-9.81 * 28.97 * i1txtelev) / (8314 * (itxtTemp + 273.15)));
let i1txtDD = i1txtLD-i1txtDDfromBottom;
let i1txtOCSd = i1txtOCS * (1 + i1txtde * (i1txtDD/10.33));


let i1txtSOTR = i1txtOUR * (1 / (i1txta * i1txtf)) * i1txtOCSd * 
                (1 / (i1txtb * (i1txtOCT / i1txtOCS) * i1txtRP * i1txtOCSd - i1txtDO)) *
                Math.pow(1.024, 20 -itxtTemp);

let i1txtE = (i1OTEpersubmerged)*(i1txtDD);
let i1txtAF = i1txtSOTR * (1 / (i1txtE * 0.01)) * (1 / i1txtO2) * (1 / 60);
let iClarifiersize = iFlowrate/iSLR;


// Air flowrate for BOD removal
//let i1txtTemp = Number(iTemp.value);



//let i1txtDD = i1txtLD - i1txtDDfromBottom;
//let i1txtOCSd = i1txtOCS * (1 + i1txtde * (i1txtDD / 10.33));
//

//let i1txtE = Number(i1OTEpersubmerged.value) * Number(i1txtDD);

//let i1txtAF = i1txtSOTR * (1 / (i1txtE * 0.01)) * (1 / i1txtO2) * (1 / 60);
//i1txtAF = Math.round(i1txtAF * 100) / 100; // round to 2 decimal places

// Clarifier Size
//let iClarifiersize = Number(iFlowrate.value) / Number(iSLR.value);






        // Output results
        const outputFields = {
            iSARR,
            iBODeff,
            iBODTKN,
            is2BODLoading,
            i1Mediaarea,
            i1Mediavolume,
            i1tankvol,
            i1Mediadisplacedvolume,
            iHRTstage1,
            is1BODLoading,
            ibh,
            ibn,
            iYH,
            iYn,
            ifd,
            ipxbioHET,
            ipxbio,
            ipxvss,
            ipxtss,
            itxtSludgeflowrate,
            iOTRBOD,
            i1txtOUR,
            i1txtRP,
            i1txtDD,
            i1txtOCSd,
            i1txtSOTR,
            i1txtE,
            i1txtAF,
            iClarifiersize


        

        };





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


function generateReport() {
  try {
    // Map input fields to report fields
    const valueMap = {
      'iFlowrate': 'iFlowrate2',
      'iTemp': 'iTemp2',
      'iBODin': 'iBODin2',
      'iBODeff': 'iBODeff2',
        'iSALR': 'iSALR2',
        'iBODremoval': 'iBODremoval2',
        'iSSA': 'iSSA2',
        'iMediaFillVol': 'iMediaFillVol2',
        'i1txtOUR': 'i1txtOUR2',
        'i1txtDO': 'i1txtDO2',
        'i1txtLD': 'i1txtLD2',
        'i1txtAF': 'i1txtAF2',
        'iClarifiersize': 'iClarifiersize2',
         'iSRT': 'iSRT2',
         'itxtSludgeflowrate': 'itxtSludgeflowrate2',
          'i1txtE': 'i1txtE2',

   
     
      


    
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

    // Get project and MBBR media details BEFORE creating the clone
    const projectName = document.getElementById('projectName').value || 'Unnamed Project';
    const projectNumber = document.getElementById('projectNumber').value || 'N/A';
    const projectDate = document.getElementById('projectDate').value || new Date().toISOString().slice(0, 10);
    const projectVersion = document.getElementById('projectVersion').value || '1.0';
    const mediaBrand = document.getElementById('mediaBrand') ? document.getElementById('mediaBrand').value || 'N/A' : 'N/A';
    const mediaName = document.getElementById('mediaName') ? document.getElementById('mediaName').value || 'N/A' : 'N/A';

    // Create a clone of the report section
    const reportClone = reportSection.cloneNode(true);

    // Remove elements we don't want in print
    const elementsToRemove = [
      reportClone.querySelector('.print-button'),
      reportClone.querySelector('.project-info'),
      reportClone.querySelector('.mbbr-media-info'),
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
          <title>MBBR Design Report</title>
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
            <h1>MBBR Design Report</h1>
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
          <!-- MBBR Media Details Table -->
          <h3>MBBR Media Details</h3>
          <table border="1" cellpadding="5" cellspacing="0">
            <thead>
              <tr>
                <th>Parameter</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Media Brand</td>
                <td>${mediaBrand}</td>
              </tr>
              <tr>
                <td>Media Name</td>
                <td>${mediaName}</td>
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


