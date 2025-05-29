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
    document.getElementById('iSLR').value = 24;
    
    // Stage 2 example values
    document.getElementById('iSALR2').value = 5;
    document.getElementById('iBODremoval2').value = 90;
    document.getElementById('iSSA2').value = 500;
    document.getElementById('iMediaFillVol2').value = 50;
    document.getElementById('i2mediavoid').value = 60;
}

function calculate() {
    try {
        // Get input values for stage 1
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
        const i1txtde= parseFloat(document.getElementById('i1txtde').value) || 0;
        const i1txtOCS= parseFloat(document.getElementById('i1txtOCS').value) || 0;
        const i1txtOCT= parseFloat(document.getElementById('i1txtOCT').value) || 0;
        const i1txta= parseFloat(document.getElementById('i1txta').value) || 0;
        const i1txtb= parseFloat(document.getElementById('i1txtb').value) || 0;
        const i1txtf= parseFloat(document.getElementById('i1txtf').value) || 0;
        const i1txtDO= parseFloat(document.getElementById('i1txtDO').value) || 0;
        const i1txtDA= parseFloat(document.getElementById('i1txtDA').value) || 0;
        const i1txtO2= parseFloat(document.getElementById('i1txtO2').value) || 0;
        const i1OTEpersubmerged= parseFloat(document.getElementById('i1OTEpersubmerged').value) || 0;
        const iSLR= parseFloat(document.getElementById('iSLR').value) || 0;
        
        // Get input values for stage 2
        const iSALR2 = parseFloat(document.getElementById('iSALR2').value) || 0;
        const iBODremoval2 = parseFloat(document.getElementById('iBODremoval2').value) || 0;
        const iSSA2 = parseFloat(document.getElementById('iSSA2').value) || 0;
        const iMediaFillVol2 = parseFloat(document.getElementById('iMediaFillVol2').value) || 0;
        const i2mediavoid = parseFloat(document.getElementById('i2mediavoid').value) || 0;

        // Validate inputs
        if (iTKN === 0) throw new Error("TKN value cannot be zero (division by zero)");
        if (iSALR === 0) throw new Error("SALR value cannot be zero (division by zero)");

        // Stage 1 calculations
        const iBODTKN = iBODin / iTKN;
        const iSARR = iSALR * (iBODremoval * 0.01);
        const i1Mediaarea = (iFlowrate * iBODin) / iSALR;
        const i1Mediavolume = i1Mediaarea / iSSA;
        const i1tankvol = i1Mediavolume / (iMediaFillVol * 0.01);
        const i1Mediadisplacedvolume = i1Mediavolume * (1 - (i1mediavoid * 0.01));
        let iHRTstage1 = 24 * (i1tankvol - i1Mediadisplacedvolume) / iFlowrate;
        iHRTstage1 = Math.round(iHRTstage1 * 100) / 100;
        const is1BODLoading = iFlowrate * iBODin * 0.001;
        const iBODeff1 = iBODin * (1 - iBODremoval * 0.01);
        
        // Stage 2 calculations (using effluent from stage 1 as influent)
        const iBODin2 = iBODeff1;
        const iSARR2 = iSALR2 * (iBODremoval2 * 0.01);
        const i2Mediaarea = (iFlowrate * iBODin2) / iSALR2;
        const i2Mediavolume = i2Mediaarea / iSSA2;
        const i2tankvol = i2Mediavolume / (iMediaFillVol2 * 0.01);
        const i2Mediadisplacedvolume = i2Mediavolume * (1 - (i2mediavoid * 0.01));
        let iHRTstage2 = 24 * (i2tankvol - i2Mediadisplacedvolume) / iFlowrate;
        iHRTstage2 = Math.round(iHRTstage2 * 100) / 100;
        const is2BODLoading = iFlowrate * iBODin2 * (1 - iBODremoval2 * 0.01) * 0.001;
        
        const iYH = 0.45;
        const iYn = 0.15;
        const ifd = 0.15;

        const temp = parseFloat(document.getElementById('iTemp').value);
        let ibh = (0.12) * Math.pow(1.04, temp - 20);
        ibh = Math.round(ibh * 100) / 100;
        
        let ibn = (0.17) * Math.pow(1.029, temp - 20);
        ibn = Math.round(ibn * 100) / 100;

        // Solids production calculations
        const ipxbioHET = iFlowrate * 0.001 * (
            (iYH * ibCODBOD * (iBODin - iBODeff1) * (1 + ifd * ibh * iSRT)) /
            (1 + ibh * iSRT));
        
        const ipxbio = ipxbioHET;
        const ipxvss = ipxbio + iFlowrate * (1 / 1000) * iNBVSS;
        const ipxtss = (ipxbio / 0.85) + iFlowrate * (1 / 1000) * iNBVSS + iFlowrate * (1 / 1000) * (iTSSin - iVSSin);

        // Sludge flowrate
        const itxtSludgeflowrate = ipxtss / ((itxtSolidsContent / 100) * 1000 * itxtSGSludgeperm3Sludge);

        // Air flowrate
        const iOTRBOD = (is1BODLoading - is2BODLoading) * ibCODBOD - 1.42 * ipxbio;
        let i1txtOUR = iOTRBOD / 24;
        const itxtTemp = parseFloat(document.getElementById('i1txtTemp').value) || 0;
        let i1txtRP = Math.exp((-9.81 * 28.97 * i1txtelev) / (8314 * (itxtTemp + 273.15)));
        let i1txtDD = i1txtLD - i1txtDDfromBottom;
        let i1txtOCSd = i1txtOCS * (1 + i1txtde * (i1txtDD / 10.33));

        let i1txtSOTR = i1txtOUR * (1 / (i1txta * i1txtf)) * i1txtOCSd * 
                        (1 / (i1txtb * (i1txtOCT / i1txtOCS) * i1txtRP * i1txtOCSd - i1txtDO)) *
                        Math.pow(1.024, 20 - itxtTemp);

        let i1txtE = (i1OTEpersubmerged) * (i1txtDD);
        let i1txtAF = i1txtSOTR * (1 / (i1txtE * 0.01)) * (1 / i1txtO2) * (1 / 60);
        let iClarifiersize = iFlowrate / iSLR;

        // Output results
        const outputFields = {
            iSARR,
            iBODeff1,
            iBODin2,
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
            iClarifiersize,
            // Stage 2 outputs
            iSARR2,
            i2Mediaarea,
            i2Mediavolume,
            i2tankvol,
            i2Mediadisplacedvolume,
            iHRTstage2
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