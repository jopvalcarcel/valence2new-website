function resetForm() {
    document.querySelectorAll('input[type="number"]').forEach(input => {
        if (!input.hasAttribute('readonly')) {
            input.value = '';
        }
    });
    document.getElementById('results').innerHTML = '';
}

function fillExample() {
    // Kinetic Parameters
    document.getElementById('SNH4').value = 0.5;
    document.getElementById('SDO').value = 2;
    document.getElementById('KOAOB').value = 0.5;
    document.getElementById('KNH4').value = 0.5;
    document.getElementById('NH4Peakfactor').value = 1.5;

    // Flow Parameters
    document.getElementById('txtFlowrate').value = 22700;
    document.getElementById('BODin').value = 140;
    document.getElementById('BODOut').value = 0.2;
    document.getElementById('txtbCODin').value = 224;
    document.getElementById('rbCOD').value = 80;
    document.getElementById('COD').value = 267;
    document.getElementById('bCODBODratio').value = 1.6;

    // Biological Parameters
    document.getElementById('txtYH').value = 0.45;
    document.getElementById('SRT').value = 21;
    document.getElementById('txtfd').value = 0.15;
    document.getElementById('txtYN').value = 0.15;


    // Aeration System
    document.getElementById('iv1txtelev').value = 500;
    document.getElementById('iv1txtLD').value = 4.94;
    document.getElementById('iv1txtDDfromBottom').value = 0.54;
    document.getElementById('iv1txtde').value = 0.4;
    document.getElementById('iv1txtOCS').value = 9.09;
    document.getElementById('iv1txtOCT').value = 10.78;
    document.getElementById('iv1txta').value = 0.5;
    document.getElementById('iv1txtb').value = 0.95;
    document.getElementById('iv1txtf').value = 0.9;
    document.getElementById('iv1txtDO').value = 2;
    document.getElementById('iv1txtO2').value = 0.27;
    document.getElementById('iv1OTEpersubmerged').value = 2.2;

    // Nutrients
    document.getElementById('TKN').value = 35;
    document.getElementById('Nin').value = 23.45; // 0.67 * TKN
    document.getElementById('Neffluent').value = 4;
    document.getElementById('Ne').value = 6;
    document.getElementById('NO3Nout').value = 6;

    // Solids
    document.getElementById('nbVSS').value = 20;
    document.getElementById('iTSS').value = 10;
    document.getElementById('MLSSAeration').value = 3000;
    document.getElementById('Xclarifier').value = 3000;
    document.getElementById('XRAS').value = 8000;
    document.getElementById('txtSolidsContent').value = 1.3;
    document.getElementById('txtSGSludgeperm3Sludge').value = 1.001;

    // Environment
    document.getElementById('TEMP').value = 12;
    document.getElementById('MLEResAlkalinity').value = 70;
    document.getElementById('MLEInfAlkalinity').value = 140;
    document.getElementById('MixingEnergy').value = 0.008;

    // Clarifier
    document.getElementById('HAR').value = 24;

    // Preanoxic
    document.getElementById('percentanoxictankvolume').value = 20;
    
}

function calculate() {
    try {
        // Get all input values with defaults
        const inputs = {
           
           // Tank Sizes
           percentanoxictankvolume: parseFloat(document.getElementById('percentanoxictankvolume').value) || 0.5,
           MixingEnergy: parseFloat(document.getElementById('MixingEnergy').value) || 0.5,


           // Alkalinity
           MLEResAlkalinity: parseFloat(document.getElementById('MLEResAlkalinity').value) || 70,
           MLEInfAlkalinity: parseFloat(document.getElementById('MLEInfAlkalinity').value) || 140,
          
           
            // Kinetic Parameters
            SNH4: parseFloat(document.getElementById('SNH4').value) || 0.5,
            SDO: parseFloat(document.getElementById('SDO').value) || 2,
            KOAOB: parseFloat(document.getElementById('KOAOB').value) || 0.5,
            KNH4: parseFloat(document.getElementById('KNH4').value) || 0.5,
            NH4Peakfactor: parseFloat(document.getElementById('NH4Peakfactor').value) || 1.5,
            
            // Flow Parameters
            txtFlowrate: parseFloat(document.getElementById('txtFlowrate').value) || 22700,
            BODin: parseFloat(document.getElementById('BODin').value) || 140,
            BODOut: parseFloat(document.getElementById('BODOut').value) || 0.2,
            txtbCODin: parseFloat(document.getElementById('txtbCODin').value) || 224,
            rbCOD: parseFloat(document.getElementById('rbCOD').value) || 80,
            COD: parseFloat(document.getElementById('COD').value) || 267,
            bCODBODratio: parseFloat(document.getElementById('bCODBODratio').value) || 1.6,
            
            // Biological Parameters
            txtYH: parseFloat(document.getElementById('txtYH').value) || 0.45,
            SRT: parseFloat(document.getElementById('SRT').value) || 21,
            txtfd: parseFloat(document.getElementById('txtfd').value) || 0.15,
            txtYN: parseFloat(document.getElementById('txtYN').value) || 0.15,
 
            
            // Aeration System
            iv1txtelev: parseFloat(document.getElementById('iv1txtelev').value) || 500,
            iv1txtLD: parseFloat(document.getElementById('iv1txtLD').value) || 4.94,
            iv1txtDDfromBottom: parseFloat(document.getElementById('iv1txtDDfromBottom').value) || 0.54,
            iv1txtde: parseFloat(document.getElementById('iv1txtde').value) || 0.4,
            iv1txtOCS: parseFloat(document.getElementById('iv1txtOCS').value) || 9.09,
            iv1txtOCT: parseFloat(document.getElementById('iv1txtOCT').value) || 10.78,
            iv1txta: parseFloat(document.getElementById('iv1txta').value) || 0.5,
            iv1txtb: parseFloat(document.getElementById('iv1txtb').value) || 0.95,
            iv1txtf: parseFloat(document.getElementById('iv1txtf').value) || 0.9,
            iv1txtDO: parseFloat(document.getElementById('iv1txtDO').value) || 2,
            iv1txtO2: parseFloat(document.getElementById('iv1txtO2').value) || 0.27,
            iv1OTEpersubmerged: parseFloat(document.getElementById('iv1OTEpersubmerged').value) || 2.2,
            
            // Nutrients
            TKN: parseFloat(document.getElementById('TKN').value) || 35,
            Nin: parseFloat(document.getElementById('Nin').value) || (0.67 * parseFloat(document.getElementById('TKN').value)) || 23.45,
            Ne: parseFloat(document.getElementById('Ne').value) || 6,
            Neffluent: parseFloat(document.getElementById('Neffluent').value) || 4,
            NO3Nout: parseFloat(document.getElementById('NO3Nout').value) || 6,
            
            // Solids
            nbVSS: parseFloat(document.getElementById('nbVSS').value) || 20,
            iTSS: parseFloat(document.getElementById('iTSS').value) || 10,
            MLSSAeration: parseFloat(document.getElementById('MLSSAeration').value) || 3000,
            Xclarifier: parseFloat(document.getElementById('Xclarifier').value) || 3000,
            XRAS: parseFloat(document.getElementById('XRAS').value) || 8000,
            txtSolidsContent: parseFloat(document.getElementById('txtSolidsContent').value) || 8000,
            txtSGSludgeperm3Sludge: parseFloat(document.getElementById('txtSGSludgeperm3Sludge').value) || 8000,





            // Environment
            TEMP: parseFloat(document.getElementById('TEMP').value) || 12,
            HAR: parseFloat(document.getElementById('HAR').value) || 24
        };




        let txtbH = 0.12 * Math.pow(1.04, inputs.TEMP - 20)
        let txtbn = 0.17 * Math.pow(1.029, inputs.TEMP - 20)


        let umax = 0.9 * Math.pow(1.072, inputs.TEMP - 20);
        let baob = 0.17 * Math.pow(1.029, inputs.TEMP - 20);

let u = umax * (inputs.SNH4 / (inputs.SNH4 + inputs.KNH4)) * (inputs.SDO / (inputs.SDO + inputs.KOAOB)) - baob;
let NecSRT = 1 / u;
let SRT = inputs.NH4Peakfactor * NecSRT;

      
        // Perform all calculations
        let txtHBkgd = (0.001) * inputs.txtFlowrate * inputs.txtYH * (inputs.BODin - inputs.BODOut) * inputs.bCODBODratio / ((1 + txtbH * SRT));

        let txtCDkgd = (0.001) * inputs.txtfd *txtbH * inputs.txtFlowrate * inputs.txtYH * (inputs.BODin - inputs.BODOut) * inputs.bCODBODratio * inputs.SRT / ((1 + inputs.txtbH * inputs.SRT));

 
       
       let NOXX = 0.8 * inputs.TKN;
let pxbio, txtNBkgd;
let maxIter = 10;
let tol = 0.001;
let converged = false;

for (let i = 0; i < maxIter; i++) {
    let txtHBkgd = (0.001) * inputs.txtFlowrate * inputs.txtYH * (inputs.BODin - inputs.BODOut) * inputs.bCODBODratio / ((1 + txtbH * SRT));
    let txtCDkgd = (0.001) * inputs.txtfd * txtbH * inputs.txtFlowrate * inputs.txtYH * (inputs.BODin - inputs.BODOut) * inputs.bCODBODratio * SRT / ((1 + txtbH * SRT));
    txtNBkgd = (0.001) * inputs.txtFlowrate * inputs.txtYN * NOXX / (1 + txtbn * SRT);

    pxbio = txtHBkgd + txtCDkgd + txtNBkgd;

    let NOXX_new = inputs.TKN - inputs.Neffluent - 0.12 * pxbio * 1000 / inputs.txtFlowrate;

    if (Math.abs(NOXX_new - NOXX) < tol) {
        NOXX = NOXX_new;
        converged = true;
        break;
    }

    NOXX = NOXX_new;
}

if (!converged) {
    console.warn("NOXX did not converge within " + maxIter + " iterations.");
}

        const pxvss = pxbio + (0.001) * inputs.txtFlowrate * inputs.nbVSS;

        const pxtss = (pxbio / 0.85) + inputs.txtFlowrate * inputs.nbVSS * (0.001) + inputs.txtFlowrate * inputs.iTSS * (0.001);

        let Vaer = pxtss * SRT * 1000 / inputs.MLSSAeration;

        Vaer = Math.round(Vaer * 100) / 100;

        const VaerHRT = Math.round(Vaer * 24 * 100) / 100 / inputs.txtFlowrate;
        const fractionMLVSS = pxvss / pxtss;
        const MLVSS = fractionMLVSS * inputs.MLSSAeration;

        const FMRatio = inputs.txtFlowrate * inputs.BODin / (Vaer * MLVSS);
        const BODloading = inputs.txtFlowrate * inputs.BODin * (1 / 1000);
        const BODremoved = inputs.txtFlowrate * (inputs.BODin - inputs.BODOut) * (1 / 1000);
        const BODloadingout = BODloading - BODremoved;
        const YOBS = pxtss / BODremoved;



           // Air Requirements - OTR
           const ivOTRBOD = (BODloading - BODloadingout) * inputs.bCODBODratio - 1.42 * pxbio;
           const ivOTRNH4N = 4.57 * NOXX * inputs.txtFlowrate * (1 / 1000);
           const ivOTRCredit = -(NOXX - inputs.NO3Nout) * inputs.txtFlowrate * (1 / 1000) * 2.86;
           const ivOTR = ivOTRBOD + ivOTRNH4N + ivOTRCredit;
       
       
       
           // Efficiencies
        const iv1txtTemp = inputs.TEMP;
        const iv1txtOUR = ivOTR / 24;
        const iv1txtRP = Math.exp((-9.81) * 28.97 * (inputs.iv1txtelev - 0) / (8314 * (iv1txtTemp + 273.15)));
        const iv1txtDD = inputs.iv1txtLD - inputs.iv1txtDDfromBottom;
        const iv1txtOCSd = inputs.iv1txtOCS * (1 + inputs.iv1txtde * (iv1txtDD / 10.33));
        const iv1txtSOTR = iv1txtOUR * (1 / (inputs.iv1txta * inputs.iv1txtf)) * iv1txtOCSd * 
                          (1 / (inputs.iv1txtb * (inputs.iv1txtOCT / inputs.iv1txtOCS) * iv1txtRP * iv1txtOCSd - inputs.iv1txtDO)) * 
                          Math.pow(1.024, (20 - iv1txtTemp));
                          
        const iv1txtE = inputs.iv1OTEpersubmerged * iv1txtDD;
        let iv1txtAF = (iv1txtSOTR * (1 / (iv1txtE * 0.01)) * (1 / inputs.iv1txtO2)) * (1 / 60);
        iv1txtAF = Math.round(iv1txtAF * 100) / 100;





          // Clarifier calculations
          const R = inputs.Xclarifier / (inputs.XRAS - inputs.Xclarifier);
          const RAS = R * inputs.txtFlowrate;
          const ClarifierAreaRequired = inputs.txtFlowrate / inputs.HAR;
  


          //Denitrification rate
          const fractionxb = inputs.txtFlowrate * SRT *inputs.txtYH* inputs.BODin * inputs.bCODBODratio / (Vaer * (1 +txtbH * SRT));
          const IR = (NOXX / inputs.Ne) - 1-R;
          const InternalRecycle = IR * inputs.txtFlowrate + R * inputs.txtFlowrate;
          const NOXfeed = InternalRecycle * inputs.Ne;
          const AnoxicTankVolume = inputs.percentanoxictankvolume * 0.01 * Vaer;
          const FMb = inputs.txtFlowrate * inputs.BODin / (AnoxicTankVolume * fractionxb);
          const percentrbCOD = 100 * inputs.rbCOD / inputs.COD;

          let bo;
          if (percentrbCOD < 15) {
              bo = 0.186;
          } else if (percentrbCOD < 25) {
              bo = 0.213;
          } else if (percentrbCOD < 35) {
              bo = 0.235;
          } else if (percentrbCOD < 45) {
              bo = 0.242;
          } else if (percentrbCOD < 55) {
              bo = 0.27;
          }
          
          // Determine b1 value based on percentrbCOD
          let b1;
          if (percentrbCOD < 15) {
              b1 = 0.078;
          } else if (percentrbCOD < 25) {
              b1 = 0.118;
          } else if (percentrbCOD < 35) {
              b1 = 0.141;
          } else if (percentrbCOD < 45) {
              b1 = 0.152;
          } else if (percentrbCOD < 55) {
              b1 = 0.162;
          }



          let SDNR;
        if (FMb > 0.5) {
         SDNR = bo + b1 * Math.log(FMb);
        } else if (FMb < 0.5) {
        SDNR = 0.24 * FMb;
        }


        const SDNRT = SDNR * Math.pow(1.026, (inputs.TEMP - 20));


        let SDNRadj;
        if (IR < 2.5) {
    SDNRadj = SDNRT - 0.0166 * Math.log(FMb) - 0.078;
        } else if (IR > 2.5) {
          SDNRadj = SDNRT - 0.029 * Math.log(FMb) - 0.012;
        }
        const XMLVSSpreanox = (pxvss / pxtss) * MLVSS;


        let SDNRoverall = SDNRadj * (fractionxb / XMLVSSpreanox);


        SDNRoverall = Math.round(SDNRoverall * 100) / 100;
        const NOXremoval = AnoxicTankVolume * SDNRadj * fractionxb;

        let PreanoxHRT = AnoxicTankVolume * 24 / inputs.txtFlowrate;
        PreanoxHRT = Math.round(PreanoxHRT * 100) / 100;

        const MixingPower = inputs.MixingEnergy * AnoxicTankVolume;

        const MLEAlkalinityProduced = 3.57 * (NOXX - inputs.Ne);
        const MLEAlkalinityUsed = 7.14 * NOXX;
        

        const MLEAlkalinitytobeAdded = inputs.MLEResAlkalinity - inputs.MLEInfAlkalinity + MLEAlkalinityUsed - MLEAlkalinityProduced;

        const MLEMassAlkalinity = MLEAlkalinitytobeAdded * inputs.txtFlowrate * (1 / 1000);

        // Sludge flow rate
        let txtSludgeflowrate = (pxtss / (inputs.txtSolidsContent / 100) / 1000) / inputs.txtSGSludgeperm3Sludge;
        txtSludgeflowrate = Math.round(txtSludgeflowrate * 100) / 100;

        const ivtxtAFTOT=iv1txtAF;
        // Output results
        const outputFields = {
         txtbH,
            txtbn,
            umax,
            baob,
            u,
            NecSRT,
            SRT,
            txtHBkgd,
            txtCDkgd,
            NOXX,
            txtNBkgd,
            pxbio,
            pxvss,
            pxtss,
            Vaer,
            VaerHRT,
            fractionMLVSS,
            MLVSS,
            FMRatio,
            BODloading,
            BODremoved,
            BODloadingout,
            YOBS,
            ivOTRBOD,
            ivOTRNH4N,
            ivOTRCredit,
            ivOTR,
            iv1txtTemp,
            iv1txtOUR,
            iv1txtRP,
            iv1txtDD,
            iv1txtOCSd,
            iv1txtSOTR,
            iv1txtE,
            iv1txtAF,
            R,
            RAS,
            ClarifierAreaRequired,
            fractionxb,
            IR,
            InternalRecycle,
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
            PreanoxHRT,
            MixingPower,
            MLEAlkalinityProduced,
            MLEAlkalinityUsed,
            MLEAlkalinitytobeAdded,
            MLEMassAlkalinity,
            txtSludgeflowrate,
            ivtxtAFTOT

        };

        // Update DOM elements with calculated values
        Object.keys(outputFields).forEach(key => {
            const element = document.getElementById(key);
            if (element) {
                element.value = outputFields[key].toFixed(2);
            } else {
                document.getElementById('results').innerHTML += `<div class="result">${key}: ${outputFields[key].toFixed(2)}</div>`;
            }
        });

        return outputFields;

    } catch (error) {
        console.error("Calculation error:", error);
        document.getElementById('results').innerHTML = `
            <div class="error">Error in calculations: ${error.message}</div>
        `;
        return null;
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
      'Neffluent': 'Neffluent2',
      'NO3Nout': 'NO3Nout2',
      'AnoxicTankVolume': 'AnoxicTankVolume2',
       'SRT': 'SRT2',
      'Vaer': 'Vaer2',
      'iv1txtTemp': 'iv1txtTemp2',
      'VaerHRT': 'VaerHRT2',
      'MLSSAeration': 'MLSSAeration2',
      'ClarifierAreaRequired': 'ClarifierAreaRequired2',
      'ivOTR': 'ivOTR2',
      'iv1txtDO': 'iv1txtDO2',
      'iv1txtLD': 'iv1txtLD2',
      'iv1txtE': 'iv1txtE2',
      'iv1txtAF': 'iv1txtAF2',
      'Nitrateeff': 'Nitrateeff2',
      'txtSludgeflowrate': 'txtSludgeflowrate2',
 

    
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
          <!-- Media Details Table -->
          <h3>Media Details</h3>
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