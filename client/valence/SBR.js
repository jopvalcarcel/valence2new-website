    // Reset form function
    function resetForm() {
        document.querySelectorAll('input[type="number"]').forEach(input => {
            if (!input.hasAttribute('readonly')) {
                input.value = '';
            }
        });
        document.getElementById('results').innerHTML = '';
    }

    // Toggle between 6 and 8 hour operation
    function toggleOption() {
        const isChecked = document.getElementById('toggleSwitch').checked;
        const hours = isChecked ? 8 : 6;
        console.log(`Selected operation time: ${hours} hours`);
        fillExample(hours);
    }

    // Fill example parameters based on selected hours
    function fillExample(hours) {
        // Validate input
        if (hours !== 6 && hours !== 8) {
            console.error('Invalid hours value. Must be 6 or 8.');
            return;
        }

        // Time parameters configuration
        const timeParams = {
            6: { ta: 2, tf: 3, tc: 6 },
            8: { ta: 3, tf: 4, tc: 8 }
        };

        // Common parameters configuration
        const commonParams = {
            // SBR Parameters
            'txtFlowrate2': 7570,
            'txtFillratio': 0.25,
            'txtSBRqty': 2,
            'txtts': 0.5,
            'txttd': 0.5,
            
            // Influent Parameters
            'txtSBRNH4NOUT': 1,
            'txtrbCOD': 95,
            'txtInfAlk': 100,
            'txtTKNin': 35,
            'txtSBRBOD': 220,
            'txtSBRbCOD': 352,
            'txtSBRnbVSS': 42,
            'txtSBRiTSS': 55,
            'txtTemp': 12,
            'BODOut': 0.2,
            'bCODBODratio': 1.6,
            'txtSBRSRT': 21,
            'txtResAlk': 70,
            
            // Kinetic Parameters
            'txtKNH4N': 0.5,
            'txtKNH4NO2': 0.5,
            'txtYH': 0.45,
            'txtYn': 0.15,
            
            // Aeration Parameters
            'SBR1txtelev': 500,
            'SBR1txtLD': 4.9,
            'SBR1txtDDfromBottom': 0.5,
            'SBR1txtde': 0.4,
            'SBR1txtOCS': 9.09,
            'SBR1txtOCT': 10.78,
            'SBR1txta': 0.5,
            'SBR1txtb': 0.95,
            'SBR1txtf': 0.9,
            'SBR1txtDO': 2,
            'SBR1txtTemp': 20,
            'SBR1txtDA': 1.1633,
            'SBR1txtO2': 0.27,
            'SBR1OTEpersubmerged': 2.2,
            'SBR1txtE': 9.68,
            
            // Solids Parameters
            'txtSolidsContent': 1.3,
            'txtSGSludgeperm3Sludge': 1.001
        };

        // Set all common parameters
        Object.entries(commonParams).forEach(([id, value]) => {
            setValue(id, value);
        });

        // Set time-specific parameters
        const currentTimeParams = timeParams[hours];
        Object.entries(currentTimeParams).forEach(([param, value]) => {
            setValue(`txt${param}`, value);
        });

        console.log(`Parameters set for ${hours}-hour operation`);
    }

    // Utility functions
    function setValue(id, value) {
        const element = document.getElementById(id);
        if (!element) {
            console.error(`Element with ID "${id}" not found.`);
            return;
        }
        element.value = round(value);
    }

    function getValue(id) {
        const element = document.getElementById(id);
        if (!element) {
            console.error(`Element with ID "${id}" not found.`);
            return 0;
        }
        const val = parseFloat(element.value);
        return isNaN(val) ? 0 : val;
    }

    function round(num, places = 2) {
        if (typeof num !== 'number' || isNaN(num)) {
            console.error(`Invalid number to round: ${num}`);
            return 0;
        }
        return Math.round(num * Math.pow(10, places)) / Math.pow(10, places);
    }

    function calculate() {







        
        // Input values
        const txtFlowrate2 = getValue('txtFlowrate2');
        const txtSBRqty = getValue('txtSBRqty');
        const txtFillratio = getValue('txtFillratio');
        const txtTKNin = getValue('txtTKNin');
        const txtTemp = getValue('txtTemp');
        const txtta = getValue('txtta');
        const txttc = getValue('txttc');
        const txtSBRSRT = getValue('txtSBRSRT');
        const txtSBRbCOD = getValue('txtSBRbCOD');
        const BODOut = getValue('BODOut');
        const bCODBODratio = getValue('bCODBODratio');
        const txtSBRNH4NOUT = getValue('txtSBRNH4NOUT');
        const txtSBRnbVSS = getValue('txtSBRnbVSS');
        const txtSBRiTSS = getValue('txtSBRiTSS');
        const txttf = getValue('txttf');
        const txtSBRBOD = getValue('txtSBRBOD');
        const txtrbCOD = getValue('txtrbCOD');
        const txtYH = getValue('txtYH');
        const txtYn = getValue('txtYn');
        const txtResAlk = getValue('txtResAlk');
        const txtInfAlk = getValue('txtInfAlk');
        const txtSolidsContent = getValue('txtSolidsContent');
        const txtSGSludgeperm3Sludge = getValue('txtSGSludgeperm3Sludge');
        const SBR1txtLD = getValue('SBR1txtLD');
        const SBR1txtDDfromBottom = getValue('SBR1txtDDfromBottom');
        const SBR1txtOCS = getValue('SBR1txtOCS');
        const SBR1txtde = getValue('SBR1txtde');
        const SBR1txtOCT = getValue('SBR1txtOCT');
        const SBR1txtDO = getValue('SBR1txtDO');
        const SBR1txta = getValue('SBR1txta');
        const SBR1txtf = getValue('SBR1txtf');
        const SBR1txtb = getValue('SBR1txtb');
        const SBR1txtTemp = getValue('SBR1txtTemp');
        const SBR1txtelev = getValue('SBR1txtelev');
        const SBR1OTEpersubmerged = getValue('SBR1OTEpersubmerged');
        const SBR1txtO2 = getValue('SBR1txtO2');
        const txtts = getValue('txtts');
        const txttd = getValue('txttd');
        const txtfmratiocheck = getValue('txtfmratiocheck');
        const txtMLVSSMLSS = getValue('txtMLVSSMLSS');
        const txtKNH4N = getValue('txtKNH4N');
        const txtKNH4NO2 = getValue('txtKNH4NO2');

        // Calculations

        // SBR Tank Dimension Calculation
        const txttotcyclesperday = (24/txttc)*(txtSBRqty);
        document.getElementById('txttotcyclesperday').value = txttotcyclesperday.toFixed(2); 

        const txtflowpercycle = txtFlowrate2/txttotcyclesperday;
        document.getElementById('txtflowpercycle').value = txtflowpercycle.toFixed(2); 

        const txtSBRVolume = txtflowpercycle/txtFillratio;
        document.getElementById('txtSBRVolume').value = txtSBRVolume.toFixed(2); 

        const txtSBRVolumeTotal = txtSBRqty*txtSBRVolume;
        document.getElementById('txtSBRVolumeTotal').value = txtSBRVolumeTotal.toFixed(2); 

        // Biological Parameters
        const txtFlowratepertank = txtSBRqty > 0 ? txtFlowrate2 / txtSBRqty : 0;
        document.getElementById('txtFlowratepertank').value = txtFlowratepertank.toFixed(2);

        const txtflowrateperfill = txtflowpercycle;
        document.getElementById('txtflowrateperfill').value = txtflowrateperfill.toFixed(2);

        const txtfillratiotest = txtFillratio;
        document.getElementById('txtfillratiotest').value = txtfillratiotest.toFixed(2);

        const txtTotalVolumetest = txtSBRVolume;
        document.getElementById('txtTotalVolumetest').value = txtTotalVolumetest.toFixed(2);

        const txtbH = round(0.12 * Math.pow(1.04, txtTemp - 20), 3);
        document.getElementById('txtbH').value = txtbH.toFixed(2);

        const txttatc = txttc > 0 ? txtta / txttc : 0;
        document.getElementById('txttatc').value = txttatc.toFixed(2);

        const txtNH4Numax = 0.9 * Math.pow(1.07, txtTemp - 20);
        const txtbnaerobic = 0.17 * Math.pow(1.029, txtTemp - 20);
        const txtbnanoxic = 0.07 * Math.pow(1.029, txtTemp - 20);
        const txtbnave = round((txttatc) * txtbnaerobic + (1 - txttatc) * txtbnanoxic, 3);

        document.getElementById('txtbnave').value = txtbnave.toFixed(2);
        document.getElementById('txtbnaerobic').value = txtbnaerobic.toFixed(2);
        document.getElementById('txtbnanoxic').value = txtbnanoxic.toFixed(2);
        document.getElementById('txtNH4Numax').value = txtNH4Numax.toFixed(2);
        
        const txtfd = 0.15;
        document.getElementById('txtfd').value = txtfd.toFixed(2);

        const txtHBkgd = 0.001 * txtFlowratepertank * txtYH * (txtSBRbCOD - BODOut * bCODBODratio) / (1 + txtbH * txtSBRSRT);
        document.getElementById('txtHBkgd').value = txtHBkgd.toFixed(2);
        
        const txtCDkgd = txtfd * txtbH * txtHBkgd * txtSBRSRT;
        document.getElementById('txtCDkg').value = txtCDkgd.toFixed(2);
    
        const txtNBkg = 0.001 * txtFlowratepertank * txtYn * 33 / (1 + txtbnave * txtSBRSRT);
        document.getElementById('txtNBkg').value = txtNBkg.toFixed(2);
        
        const txtPXBIO = txtHBkgd + txtCDkgd + txtNBkg;
        document.getElementById('txtPXBIO').value = txtPXBIO.toFixed(2);

        const txtSBRNOXactual = txtTKNin - txtSBRNH4NOUT - 0.12 * txtPXBIO * 1000 / txtFlowratepertank;
        document.getElementById('txtSBRNOXactual').value = txtSBRNOXactual.toFixed(2);
        
        const txtPXVSS = txtPXBIO + 0.001 * txtFlowratepertank * txtSBRnbVSS;
        const txtPXTSS = (txtPXBIO / 0.85) + (txtFlowratepertank * txtSBRnbVSS * 0.001) + (txtFlowratepertank * txtSBRiTSS * 0.001);
        
        document.getElementById('txtPXVSS').value = txtPXVSS.toFixed(2);
        document.getElementById('txtPXTSS').value = txtPXTSS.toFixed(2);

        const txtSBRxn = txtSBRVolume > 0 ? ((txtFlowratepertank * txtYn * txtSBRNOXactual * txtSBRSRT) / (1 + txtbnave * txtSBRSRT)) * (1 / txtSBRVolume) : 0;
        document.getElementById('txtSBRxn').value = txtSBRxn.toFixed(2);
        
        const txtoxizableN = txtSBRNOXactual * txtflowpercycle;
        document.getElementById('txtoxizableN').value = txtoxizableN.toFixed(2);
        
        const txttotalvolumetest = txtFillratio > 0 ? txtflowpercycle / txtFillratio : 0;
        
        
        const txtNremainingbeforefill = txtSBRNH4NOUT * (txttotalvolumetest - txtflowpercycle);
        document.getElementById('txtNremainingbeforefill').value = txtNremainingbeforefill.toFixed(2);

        const txtNinitialconcentration = txttotalvolumetest > 0 ? (txtNremainingbeforefill + txtoxizableN) / txttotalvolumetest : 0;
        document.getElementById('txtNinitialconcentration').value = txtNinitialconcentration.toFixed(2);

        const txtNH4Ntimereq =   24*(((0.5 * Math.log(txtNinitialconcentration / txtSBRNH4NOUT) + (txtNinitialconcentration - txtSBRNH4NOUT)) / ((txtSBRxn * (txtNH4Numax / 0.15)) * (2 / (0.5 + 2)))));
        document.getElementById('txtNH4Ntimereq').value = txtNH4Ntimereq.toFixed(3);
        
        
        const txtNOXproducedpercycle = txtflowpercycle * txtSBRNOXactual;
        document.getElementById('txtNOXproducedpercycle').value = txtNOXproducedpercycle.toFixed(2);

        const txtNO3Nconcentrationatendofaertankfull = txttotalvolumetest > 0 ? txtNOXproducedpercycle / txttotalvolumetest : 0;
        
        const txtvolumeafterdecanttest = txtSBRNOXactual * txtflowpercycle;
        document.getElementById('txtvolumeafterdecanttest').value = txtvolumeafterdecanttest.toFixed(2);
        


        console.log("Debug Values:");
        console.log("Nremainingbeforefill:", txtNremainingbeforefill);
        console.log("oxizableN:", txtoxizableN);
        console.log("totalvolumetest:", txttotalvolumetest);
        console.log("Ninitialconcentration:", txtNinitialconcentration);
        console.log("SBRNH4NOUT:", txtSBRNH4NOUT);
        console.log("SBRxn:", txtSBRxn);
        console.log("NH4Numax:", txtNH4Numax);


    //Sludge flowrate
        const txtSludgeflowrate = (txtPXTSS * txtSBRqty) / (txtSolidsContent / 100) / 1000;
        document.getElementById('txtSludgeflowrate').value = txtSludgeflowrate.toFixed(2);


        const txtNO3Npresentafterdecant = txtvolumeafterdecanttest * txtNO3Nconcentrationatendofaertankfull;
        const txtBiomassConcentration = txttotalvolumetest > 0 ? txtHBkgd * txtSBRSRT * 1000 / txttotalvolumetest : 0;
        const txtamountofbiomass = txtBiomassConcentration * txttotalvolumetest * 0.001;
        const txtratefilling = txttf > 0 ? (txtflowpercycle / txttf) * 24 : 0;
        const txtBODfeedrate = txtratefilling * txtSBRBOD * 0.001;
        const txtfractionrbCOD = txtSBRbCOD > 0 ? round(txtrbCOD / txtSBRbCOD, 1) : 0;
        const txtfoodtomassratio = txtamountofbiomass > 0 ? txtBODfeedrate / txtamountofbiomass : 0;
        


        //Air Requirement Summary

        const SBROTRBOD = ((txtSBRBOD - BODOut) * bCODBODratio * txtFlowratepertank / 1000) - (1.42 * txtPXBIO);
        document.getElementById('SBROTRBOD').value = SBROTRBOD.toFixed(2);
        const SBROTRNOX = 4.57 * txtSBRNOXactual * txtFlowratepertank / 1000;
        document.getElementById('SBROTRNOX').value = SBROTRNOX.toFixed(2);
        const ivOTR =  SBROTRNOX+SBROTRBOD;
        document.getElementById('ivOTR').value = ivOTR.toFixed(2);
        const ivOTRTotal =  ivOTR*txtSBRqty;
        document.getElementById('ivOTRTotal').value = ivOTRTotal.toFixed(2);

    //Air Requirement Details



    const SBR1txtOUR = ((SBROTRBOD + SBROTRNOX) / (txttc / txtSBRqty)) / txtta;
    document.getElementById('SBR1txtOUR').value = SBR1txtOUR.toFixed(2);


    const SBR1txtRP = Math.exp((-9.81 * 28.97 * SBR1txtelev) / (8314 * (SBR1txtTemp + 273.15)));
    document.getElementById('SBR1txtRP').value = SBR1txtRP.toFixed(2);

    const SBR1txtDD = SBR1txtLD - SBR1txtDDfromBottom;
    document.getElementById('SBR1txtDD').value = SBR1txtDD.toFixed(2);



    const SBR1txtOCSd = SBR1txtOCS * (1 + SBR1txtde * (SBR1txtDD/ 10.33));


    document.getElementById('SBR1txtOCSd').value = SBR1txtOCSd.toFixed(2);


    //const SBR1txtSOTR = SBR1txtOUR *(1 / (SBR1txta * SBR1txtf)) *SBR1txtOCSd *(1 / ((SBR1txtb * (SBR1txtOCT / SBR1txtOCS) * SBR1txtRP * SBR1txtOCSd) - SBR1txtDO)) *Math.pow(1.024, 20 - SBR1txtTemp);

    const SBR1txtSOTR = SBR1txtOUR * (1/(SBR1txta*SBR1txtf)) * SBR1txtOCSd * 
                    (1/((SBR1txtb*(SBR1txtOCT/SBR1txtOCS)*SBR1txtRP*SBR1txtOCSd) - SBR1txtDO)) * 
                    Math.pow(1.024, 20-SBR1txtTemp);
    document.getElementById('SBR1txtSOTR').value = SBR1txtSOTR.toFixed(2);

    const SBR1txtE = SBR1OTEpersubmerged * SBR1txtDD;
    document.getElementById('SBR1txtE').value = SBR1txtE.toFixed(2);



    let SBR1txtAF = SBR1txtSOTR * (1 / (SBR1txtE * 0.01)) * (1 / SBR1txtO2) * (1 / 60);
    SBR1txtAF = Math.round(SBR1txtAF * 100) / 100;

    document.getElementById('SBR1txtAF').value = SBR1txtAF.toFixed(2);



    const SBR1txtAFTotal = SBR1txtAF * txtSBRqty;
    document.getElementById('SBR1txtAFTotal').value = SBR1txtAFTotal.toFixed(2);


    const ivtxtAFTOT = SBR1txtAFTotal;
    document.getElementById('ivtxtAFTOT').value = ivtxtAFTOT.toFixed(2);



    // Output assignment example (optional)
    document.getElementById("ivtxtAFTOT").value = ivtxtAFTOT;
    document.getElementById("ivOTR").value = ivOTR;
    document.getElementById("ivOTRTotal").value = ivOTRTotal;
    document.getElemen


        let txtbetazero = 0, txtbetaone = 0;
        switch (txtfractionrbCOD) {
            case 0.5: txtbetazero = 0.27; txtbetaone = 0.162; break;
            case 0.4: txtbetazero = 0.242; txtbetaone = 0.152; break;
            case 0.3: txtbetazero = 0.235; txtbetaone = 0.141; break;
            case 0.2: txtbetazero = 0.213; txtbetaone = 0.118; break;
            case 0.1: txtbetazero = 0.186; txtbetaone = 0.078; break;
            default:
                txtbetazero = "rbCOD Over Range";
                txtbetaone = "rbCOD Over Range";
        }

        document.getElementById('txtbetazero').value = typeof txtbetazero === 'number' ? txtbetazero.toFixed(3) : txtbetazero;
        document.getElementById('txtbetaone').value = typeof txtbetaone === 'number' ? txtbetaone.toFixed(3) : txtbetaone;
        
        const txtSDNRS = txtbetazero * txtfoodtomassratio + txtbetaone;
        const txtSDNR = txtSDNRS * Math.pow(1.026, getValue('txtTemp') - 20);


        document.getElementById('txtfractionrbCOD').value = txtfractionrbCOD.toFixed(2);
        document.getElementById('txtfoodtomassratio').value = txtfoodtomassratio.toFixed(2);
        document.getElementById('txtSDNRS').value = txtSDNRS.toFixed(2);
        document.getElementById('txtSDNR').value = txtSDNR.toFixed(2);

        document.getElementById('txtNH4Numax').value = txtNH4Numax.toFixed(2);
        document.getElementById('txtNOXproducedpercycle').value = txtNOXproducedpercycle.toFixed(2);
        document.getElementById('txtNO3Nconcentrationatendofaertankfull').value = txtNO3Nconcentrationatendofaertankfull.toFixed(2);
        document.getElementById('txtvolumeafterdecanttest').value = txtvolumeafterdecanttest.toFixed(2);
        document.getElementById('txtNO3Npresentafterdecant').value = txtNO3Npresentafterdecant.toFixed(2);
        document.getElementById('txtBiomassConcentration').value = txtBiomassConcentration.toFixed(2);
        document.getElementById('txtamountofbiomass').value = txtamountofbiomass.toFixed(2);
        document.getElementById('txtratefilling').value = txtratefilling.toFixed(2);

        const txtNO3NRemovalCapacity = txtSDNR * txtBiomassConcentration * txtTotalVolumetest;
        // Calculate nitrate removal capacity
    document.getElementById('txtNO3NRemovalCapacity').value = txtNO3NRemovalCapacity.toFixed(2);


    const txtMLVSS = (txtPXVSS * 1000 * txtSBRSRT) / txttotalvolumetest;
    const txtMLSS = (txtPXTSS * 1000 * txtSBRSRT) / txttotalvolumetest;
document.getElementById('txtMLVSS').value = txtMLVSS.toFixed(2);
document.getElementById('txtMLSS').value = txtMLSS.toFixed(2);



    const txtUsedAlk = txtSBRNOXactual * 7.14;
    document.getElementById('txtUsedAlk').value = txtUsedAlk.toFixed(2);

    const txttoaddAlk = txtFlowratepertank * (txtResAlk - txtInfAlk + txtUsedAlk) * 0.001;
    document.getElementById('txttoaddAlk').value =txttoaddAlk.toFixed(2);

    const txtNaHCO3tobeadded = txttoaddAlk * (84 / 50);
    document.getElementById('txtNaHCO3tobeadded').value =txtNaHCO3tobeadded.toFixed(2);

    const txtNO3Nremovalduringfill = txtNO3NRemovalCapacity * txttf / 24;
    


    const txtCommentRemovalofNitrate = txtNO3Nremovalduringfill >= txtNO3Npresentafterdecant ? 

    
        "✔️ Nitrate removal capacity is sufficient" : 
        "❌ Nitrate removal capacity is insufficient";

    // Set textarea value (removed .toFixed(2) since it's text, not number)

    document.getElementById('txtCommentRemovalofNitrate').value = txtCommentRemovalofNitrate;

    // Check aeration time
    const txterationtimecheck = txtNH4Ntimereq <= txtta ? 
        "✔️ Aeration time is enough" : 
        "❌ Aeration time is not enough";
    document.getElementById('txterationtimecheck').value = txterationtimecheck;

    // Display output with enhanced formatting
    document.getElementById('results').innerHTML = `
<div class="result-header">
    <h3></h3>
</div>

<div class="result-item ${txtNH4Ntimereq <= txtta ? 'success' : 'error'}">
    <span class="result-label">NH₄-N Time Required:</span>
    <span class="result-value">${round(txtNH4Ntimereq)} hrs</span>
</div>

<div class="result-item ${txtNH4Ntimereq <= txtta ? 'success' : 'error'}">
    <span class="result-label">Aeration Status:</span>
    <span class="result-value">${txterationtimecheck}</span>
</div>

<div class="result-item ${txtNO3Nremovalduringfill >= txtNO3Npresentafterdecant ? 'success' : 'error'}">
    <span class="result-label">NO₃-N after decant:</span>
    <span class="result-value">${round(txtNO3Npresentafterdecant, 2)} g</span>
</div>

<div class="result-item ${txtNO3Nremovalduringfill >= txtNO3Npresentafterdecant ? 'success' : 'error'}">
    <span class="result-label">Nitrate Removal:</span>
    <span class="result-value">${txtCommentRemovalofNitrate}</span>
</div>
    `;}




function getValue(id) {
  const element = document.getElementById(id);
  return element ? parseFloat(element.value) || 0 : 0;
}

function generateReport() {
  try {
    // Map input fields to report fields
    const valueMap = {
      'txtFlowrate2': 'txtFlowrate3',
      'txtSBRBOD': 'txtSBRBOD2',
      'txtTKNin': 'txtTKNin2',
      'BODOut': 'BODOut2',
      'txtSBRNH4NOUT': 'txtSBRNH4NOUT2',
      'txtNO3Nconcentrationatendofaertankfull': 'txtNO3Nconcentrationatendofaertankfull2',
      'txttc': 'txttc2',
      'txtSBRqty': 'txtSBRqty2',
      'txtSBRVolume': 'txtSBRVolume2',
      'txtMLSS': 'txtMLSS2',
      'SBR1txtLD': 'SBR1txtLD2',
      'SBR1txtE': 'SBR1txtE2',
      'SBR1txtAF': 'SBR1txtAF2',

      'txttf': 'txttf2',
      'txtta': 'txtta2',
      'txtts': 'txtts2',
      'txttd': 'txttd2'


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

  // Replace inputs with spans for printing
  const inputs = reportClone.querySelectorAll('input[readonly]');
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
