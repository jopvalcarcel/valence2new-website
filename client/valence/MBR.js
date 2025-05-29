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
    document.getElementById('txtFlowrate').value = 22700;
    document.getElementById('TEMP').value = 12; // for testing purposes
    document.getElementById('BODin').value = 140;
    document.getElementById('BODOut').value = 0.2;
    document.getElementById('txtYH').value = 0.45;
    document.getElementById('MBRNH4Ninf').value = 28;
    document.getElementById('MBRNH4Neff').value = 0.5;
    document.getElementById('txtSRT').value = 21;
    document.getElementById('txtfd').value = 0.15;
    document.getElementById('txtFlowrate').value = 22700;
    document.getElementById('txtbCODin').value = 224;
    document.getElementById('txtYN').value = 0.15;
    document.getElementById('TKN').value = 35;
    document.getElementById('nbVSS').value = 20;
    document.getElementById('iTSS').value = 10;
    document.getElementById('flux').value = 16.1;
    document.getElementById('Membraneseparationtankratio').value = 0.025;
    document.getElementById('Xmbr').value = 12000;
    document.getElementById('reflux').value = 6;
    document.getElementById('percentanoxictankvolume').value = 20;
    document.getElementById('TEMP').value = 12;
    document.getElementById('ResAlkalinity').value = 70;
    document.getElementById('InfAlkalinity').value = 140;
    document.getElementById('PercentPreaer').value = 60;
    document.getElementById('txtSolidsContent').value = 1.3;
    document.getElementById('txtSGSludgeperm3Sludge').value = 1.001;
    document.getElementById('rbCOD').value = 80;
    document.getElementById('COD').value = 267;
    document.getElementById('iv1txtelev').value = 500;
    document.getElementById('iv1txtLD').value =4.94;
    document.getElementById('iv1txtDDfromBottom').value =0.54;
    document.getElementById('iv1txtde').value =0.4;
    document.getElementById('iv1txtOCS').value =9.09;
    document.getElementById('iv1txtOCT').value =10.78;
    document.getElementById('iv1txta').value =0.9;
    document.getElementById('iv1txtb').value =0.9;
    document.getElementById('iv1txtf').value =0.9;
    document.getElementById('iv1txtDO').value =0.9;
    document.getElementById('iv1txtDA').value =0.9;
    document.getElementById('iv1txtO2').value =0.9;
    document.getElementById('iv1OTEpersubmerged').value =0.9;
    document.getElementById('iv2txtelev').value = 500;
    document.getElementById('iv2txtLD').value = 4.94;
    document.getElementById('iv2txtDDfromBottom').value = 0.54;
    document.getElementById('iv2txtde').value = 0.4;
    document.getElementById('iv2txtOCS').value = 9.09;
    document.getElementById('iv2txtOCT').value = 10.78;
    document.getElementById('iv2txta').value = 0.9;
    document.getElementById('iv2txtb').value = 0.9;
    document.getElementById('iv2txtf').value = 0.9;
    document.getElementById('iv2txtDO').value = 0.9;
    document.getElementById('iv2txtDA').value = 0.9;
    document.getElementById('iv2txtO2').value = 0.9;
    document.getElementById('iv2OTEpersubmerged').value = 0.9;
    document.getElementById('Nitrateeff').value = 6;
  
  
}

function calculate() {
    try {
        // Set and get input value for TEMP

        const TEMP = parseFloat(document.getElementById('TEMP').value);
        const txtFlowrate = parseFloat(document.getElementById('txtFlowrate').value) || 0;
        const txtYH = parseFloat(document.getElementById('txtYH').value) || 0.45;
        const BODin = parseFloat(document.getElementById('BODin').value) || 0;
        const BODOut = parseFloat(document.getElementById('BODOut').value) || 0;
        const bCODBODratio = parseFloat(document.getElementById('bCODBODratio').value) || 0;
        const txtfd = parseFloat(document.getElementById('txtfd').value) || 0.15;
        const txtSRT = parseFloat(document.getElementById('txtSRT').value) || 0;
        const txtYN = parseFloat(document.getElementById('txtYN').value) || 0.15;
        const TKN = parseFloat(document.getElementById('TKN').value) || 0;
        const nbVSS = parseFloat(document.getElementById('nbVSS').value) || 0;
        const iTSS = parseFloat(document.getElementById('iTSS').value) || 0;
        const flux = parseFloat(document.getElementById('flux').value) || 0;
        const Membraneseparationtankratio = parseFloat(document.getElementById('Membraneseparationtankratio').value) || 0;
        const reflux = parseFloat(document.getElementById('reflux').value) || 0;
        const Xmbr = parseFloat(document.getElementById('Xmbr').value) || 0;
        const MBRNH4Neff = parseFloat(document.getElementById('MBRNH4Neff').value) || 0;
        const percentanoxictankvolume = parseFloat(document.getElementById('percentanoxictankvolume').value) || 0;
        const rbCOD = parseFloat(document.getElementById('rbCOD').value) || 0;
        const COD = parseFloat(document.getElementById('COD').value) || 0;
        const ResAlkalinity = parseFloat(document.getElementById('ResAlkalinity').value) || 0;
        const InfAlkalinity = parseFloat(document.getElementById('InfAlkalinity').value) || 0;
         Nitrateeff = parseFloat(document.getElementById('Nitrateeff').value) || 6;
        const PercentPreaer = parseFloat(document.getElementById('PercentPreaer').value) || 0;
        const txtSolidsContent = parseFloat(document.getElementById('txtSolidsContent').value) || 0;
        const txtSGSludgeperm3Sludge = parseFloat(document.getElementById('txtSGSludgeperm3Sludge').value) || 0;
        const iv1txtelev = parseFloat(document.getElementById('iv1txtelev').value) || 0;
        const iv1txtLD = parseFloat(document.getElementById('iv1txtLD').value) || 0;
        const iv1txtDDfromBottom = parseFloat(document.getElementById('iv1txtDDfromBottom').value) || 0;
        const iv1txtOCS= parseFloat(document.getElementById('iv1txtOCS').value) || 0;
        const iv1txtOCT= parseFloat(document.getElementById('iv1txtOCT').value) || 0;
        const iv1txtde= parseFloat(document.getElementById('iv1txtde').value) || 0;
        const iv1txta= parseFloat(document.getElementById('iv1txta').value) || 0;
        const iv1txtb= parseFloat(document.getElementById('iv1txtb').value) || 0;
        const iv1txtf= parseFloat(document.getElementById('iv1txtf').value) || 0;
        const iv1txtDO= parseFloat(document.getElementById('iv1txtDO').value) || 0;
        const iv1txtDA= parseFloat(document.getElementById('iv1txtDA').value) || 0;
        const iv1txtO2= parseFloat(document.getElementById('iv1txtO2').value) || 0;
        const iv1OTEpersubmerged= parseFloat(document.getElementById('iv1OTEpersubmerged').value) || 0;
        const iv2txtelev = parseFloat(document.getElementById('iv2txtelev').value) || 0; 
        const iv2txtLD = parseFloat(document.getElementById('iv2txtLD').value) || 0;
        const iv2txtDDfromBottom = parseFloat(document.getElementById('iv2txtDDfromBottom').value) || 0;
        const iv2txtOCS = parseFloat(document.getElementById('iv2txtOCS').value) || 0;
        const iv2txtOCT = parseFloat(document.getElementById('iv2txtOCT').value) || 0;
        const iv2txtde = parseFloat(document.getElementById('iv2txtde').value) || 0;
        const iv2txta = parseFloat(document.getElementById('iv2txta').value) || 0;
        const iv2txtb = parseFloat(document.getElementById('iv2txtb').value) || 0;
        const iv2txtf = parseFloat(document.getElementById('iv2txtf').value) || 0;
        const iv2txtDO = parseFloat(document.getElementById('iv2txtDO').value) || 0;
        const iv2txtDA = parseFloat(document.getElementById('iv2txtDA').value) || 0;
        const iv2txtO2 = parseFloat(document.getElementById('iv2txtO2').value) || 0;
        const iv2OTEpersubmerged = parseFloat(document.getElementById('iv2OTEpersubmerged').value) || 0;




        // Biological Aeration
        let txtbH = 0.12 * Math.pow(1.04, TEMP - 20);
        txtbH = parseFloat(txtbH.toFixed(4));

        let txtbn = 0.17 * Math.pow(1.029, TEMP - 20);
        txtbn = parseFloat(txtbn.toFixed(4));

        const txtHBkgd = 0.001 * txtFlowrate * txtYH * (BODin - BODOut) * bCODBODratio / (1 + txtbH * txtSRT);
        const txtCDkgd = 0.001 * txtfd * txtbH * txtFlowrate * txtYH * (BODin - BODOut) * bCODBODratio * txtSRT / (1 + txtbH * txtSRT);
        const txtNBkgd = 0.001 * txtFlowrate * txtYN * TKN / (1 + txtbn * txtSRT);
        const pxbio = txtHBkgd + txtCDkgd + txtNBkgd;
        const pxvss = pxbio + 0.001 * txtFlowrate * nbVSS;
        const pxtss = (pxbio / 0.85) + txtFlowrate * nbVSS * 0.001 + txtFlowrate * iTSS * 0.001;


  // MBR system calculations
  const MembraneArea = txtFlowrate * (1 / 24) / (flux * (1 / 1000));
  const MembraneVolume = Membraneseparationtankratio * MembraneArea;
  const Xpreanox = (reflux / (reflux + 1)) * Xmbr;

  let PreaerationNecVol = (pxtss * txtSRT - Xmbr * MembraneVolume * (1 / 1000)) / (Xpreanox * (1 / 1000));

  PreaerationNecVol = parseFloat(PreaerationNecVol.toFixed(3));

  const fractionxb = txtHBkgd / pxtss;
  const Xpreaerb = fractionxb * Xpreanox;
  const NOx = (TKN - MBRNH4Neff) - 0.12 * pxbio * 1000 / txtFlowrate;
  const Ne = NOx / (1 + reflux);
  let NOXfeed = reflux * txtFlowrate * Ne;
  const AnoxicTankVolume = (PreaerationNecVol + MembraneVolume) * percentanoxictankvolume / 100;
  const percentrbCOD = 100 * rbCOD / COD;
  const FMb = txtFlowrate * BODin / (AnoxicTankVolume * Xpreaerb);



       // SDNR calculations
       let bo, b1;
       if (percentrbCOD < 15) {
           bo = 0.186;
           b1 = 0.078;
       } else if (percentrbCOD < 25) {
           bo = 0.213;
           b1 = 0.118;
       } else if (percentrbCOD < 35) {
           bo = 0.235;
           b1 = 0.141;
       } else if (percentrbCOD < 45) {
           bo = 0.242;
           b1 = 0.152;
       } else {
           bo = 0.27;
           b1 = 0.162;
       }

       let SDNR;
        if (FMb > 0.5) {
            SDNR = bo + b1 * Math.log(FMb);
        } else {
            SDNR = 0.24 * FMb;
        }

        
        const SDNRT = SDNR * Math.pow(1.026, TEMP - 20);
        let SDNRadj;
        if (reflux < 2.5) {
            SDNRadj = SDNRT - 0.0166 * Math.log(FMb) - 0.078;
        } else {
            SDNRadj = SDNRT - 0.029 * Math.log(FMb) - 0.012;
        }

        const XMLVSSpreanox = (pxvss / pxtss) * Xpreanox;
        let SDNRoverall = SDNRadj * (Xpreaerb / XMLVSSpreanox);
        SDNRoverall = parseFloat(SDNRoverall.toFixed(2));


        const NOXremoval = AnoxicTankVolume * SDNRadj * Xpreaerb;

        const AlkalinityProduced = 3.57 * (NOx - Ne);
        const AlkalinityUsed = 7.14 * NOx;
        const AlkalinitytobeAdded = ResAlkalinity - InfAlkalinity + AlkalinityUsed - AlkalinityProduced;
        const MassAlkalinity = AlkalinitytobeAdded * txtFlowrate * (1 / 1000);
        const ivOTRBOD = (txtFlowrate * (BODin - BODOut) * bCODBODratio * (1 / 1000)) - 1.42 * (txtHBkgd + txtCDkgd);
        const ivOTRNH4N = 4.57 * txtFlowrate * NOx * (1 / 1000);
        const ivOTRCredit = -(NOx - Nitrateeff) * txtFlowrate * (1 / 1000) * 2.86;
        const ivOTR = ivOTRBOD + ivOTRNH4N + ivOTRCredit;
        const Ro = ivOTR * (1 / 24);
        const PercentMembrane = 100 - PercentPreaer;
        const RoPreAer1 = PercentPreaer * Ro * 0.01;
        const RoMemb = PercentMembrane * Ro * 0.01;

        // Sludge production
        let txtSludgeflowrate = (pxtss / (txtSolidsContent / 100) / 1000) / txtSGSludgeperm3Sludge;
         txtSludgeflowrate = parseFloat(txtSludgeflowrate.toFixed(2));

        // Dimensions Preaeration
        const PreaerHRT = (PreaerationNecVol / txtFlowrate) * 24;

        // Dimension Membrane Reactor
        const MemHRT = (MembraneVolume / txtFlowrate) * 24;

        // Dimension Preanoxic Tank
        const PreDNHRT = (AnoxicTankVolume / txtFlowrate) * 24;

        const iv1txtTemp = TEMP;
        const iv1txtOUR = RoPreAer1;
        const iv1txtRP = Math.exp((-9.81) * 28.97 * (iv1txtelev - 0) / (8314 * (iv1txtTemp + 273.15)));
        const iv1txtDD = iv1txtLD - iv1txtDDfromBottom;
        const iv1txtOCSd = iv1txtOCS * (1 + iv1txtde * (iv1txtDD / 10.33));

        const iv1txtSOTR = (iv1txtOUR) * (1 / (iv1txta * iv1txtf)) * (iv1txtOCSd) * (1 / (iv1txtb * (iv1txtOCT / iv1txtOCS) * (iv1txtRP) * iv1txtOCSd - iv1txtDO)) * Math.pow(1.024, 20 - iv1txtTemp);
        const iv1txtE = iv1OTEpersubmerged * iv1txtDD;
        let iv1txtAF = iv1txtSOTR * (1 / (iv1txtE * 0.01)) * (1 / iv1txtO2) * (1 / 60);


        const iv2txtTemp = TEMP;
        const iv2txtOUR = RoMemb;
        const iv2txtRP = Math.exp((-9.81) * 28.97 * (iv2txtelev - 0) / (8314 * (iv2txtTemp + 273.15)));
        const iv2txtDD = iv2txtLD - iv2txtDDfromBottom;
        const iv2txtOCSd = iv2txtOCS * (1 + iv2txtde * (iv2txtDD / 10.33));
        const iv2txtSOTR =  (iv2txtOUR) * (1 / (iv2txta * iv2txtf)) * (iv2txtOCSd) * (1 / (iv2txtb * (iv2txtOCT / iv2txtOCS) * (iv2txtRP) * iv2txtOCSd - iv2txtDO)) * Math.pow(1.024, 20 - iv2txtTemp);
        const iv2txtE = iv2OTEpersubmerged * iv2txtDD;
        
        let iv2txtAF = iv2txtSOTR * (1 / (iv2txtE * 0.01)) * (1 / iv2txtO2) * (1 / 60);
        iv1txtAF = parseFloat(iv1txtAF.toFixed(2));
        iv2txtAF = parseFloat(iv2txtAF.toFixed(2));


        const iv1airreq = iv1txtAF;
        const iv2airreq =iv2txtAF;
        const ivtxtAFTOT =iv2airreq+iv1airreq;

       const Xpreaer = Xpreanox;
        const XMLVSSpreaer =XMLVSSpreanox;

        // Output results
        const outputFields = {
            
            iv1txtSOTR,
            txtbH,
            txtbn,
            txtHBkgd,
            txtCDkgd,
            txtNBkgd,
            pxbio,
            pxvss,
            pxtss,
            MembraneArea,
            MembraneVolume,
            Xpreanox,
            PreaerationNecVol,
            fractionxb,
            Xpreaerb,
            NOx,
            Ne,
            NOXfeed,
            AnoxicTankVolume,
            FMb,
            percentrbCOD,
            bo,
            b1,
            SDNR,
            SDNRT,
            SDNRadj,
            XMLVSSpreanox,
            SDNRoverall,
            NOXremoval,
            AlkalinityProduced,
            AlkalinityUsed,
            AlkalinitytobeAdded,
            MassAlkalinity,
            ivOTRBOD,
            ivOTRNH4N,
            ivOTRCredit,
            ivOTR,
            Ro,
            PercentMembrane,
            RoPreAer1,
            RoMemb,
            txtSludgeflowrate,
            PreaerHRT,
            MemHRT,
            PreDNHRT,
            iv1txtTemp,
            iv1txtOUR,
            iv1txtRP,
            iv1txtDD,
            iv1txtOCSd,
            iv1txtE,
            iv1txtAF,
            iv2txtTemp,
            iv2txtOUR,
            iv2txtRP,
            iv2txtDD,
            iv2txtOCSd,
            iv2txtE,
            iv2txtSOTR,
            iv2txtAF,
            iv1airreq,
            iv2airreq,
            ivtxtAFTOT,
            XMLVSSpreaer,
             Xpreaer,
            

            


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

function getValue(id) {
  const element = document.getElementById(id);
  return element ? parseFloat(element.value) || 0 : 0;
}

function generateReport() {
  try {
    // Map input fields to report fields
    const valueMap = {
      'txtFlowrate': 'txtFlowrate2',
      'BODin': 'BODin2',
      'TKN': 'TKN2',
      'BODOut': 'BODOut2',
      'MBRNH4Neff': 'MBRNH4Neff2',
      'Nitrateeff': 'Nitrateeff2',
      'AnoxicTankVolume': 'AnoxicTankVolume2',
      'PreaerationNecVol': 'PreaerationNecVol2',
      'MembraneVolume': 'MembraneVolume2',
      'Xmbr': 'Xmbr2',
      'txtSRT': 'txtSRT2',
      'ivtxtAFTOT': 'ivtxtAFTOT2',

         'MemHRT': 'MemHRT2',
          'ivtxtAFTOT': 'ivtxtAFTOT2',

          'Xmbr': 'Xmbr2',
          'iv1txtLD': 'iv1txtLD2',
          'iv1txtOUR': 'iv1txtOUR2',
          'iv1txtE': 'iv1txtE2',
          'iv1txtAF': 'iv1txtAF2',
          'reflux': 'reflux2',
          'Ne': 'Ne2',
               'flux': 'flux2',





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

    // Get project and MBBR membrane details BEFORE creating the clone
    const projectName = document.getElementById('projectName').value || 'Unnamed Project';
    const projectNumber = document.getElementById('projectNumber').value || 'N/A';
    const projectDate = document.getElementById('projectDate').value || new Date().toISOString().slice(0, 10);
    const projectVersion = document.getElementById('projectVersion').value || '1.0';
    const membraneBrand = document.getElementById('membraneBrand') ? document.getElementById('membraneBrand').value || 'N/A' : 'N/A';
    const membraneModel = document.getElementById('membraneModel') ? document.getElementById('membraneModel').value || 'N/A' : 'N/A';

    // Create a clone of the report section
    const reportClone = reportSection.cloneNode(true);

    // Remove elements we don't want in print
    const elementsToRemove = [
      reportClone.querySelector('.print-button'),
      reportClone.querySelector('.project-info'),
      reportClone.querySelector('.mbbr-membrane-info'),
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
          <title></title>
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
          <!-- MBBR Membrane Details Table -->
          <h3>MBBR Membrane Details</h3>
          <table border="1" cellpadding="5" cellspacing="0">
            <thead>
              <tr>
                <th>Parameter</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Membrane Brand</td>
                <td>${membraneBrand}</td>
              </tr>
              <tr>
                <td>Membrane Model</td>
                <td>${membraneModel}</td>
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