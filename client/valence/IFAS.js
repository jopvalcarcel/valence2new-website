function resetForm() {
    document.querySelectorAll('input[type="number"]').forEach(input => {
        if (!input.hasAttribute('readonly')) {
            input.value = '';
        }
    });
    document.getElementById('results').innerHTML = '';
}

function fillExample() {
 // Influent Parameters
document.getElementById('IFAStxtFlowrate').value = 22700;
document.getElementById('IFASBODin').value = 140;
document.getElementById('IFAStxtbCODin').value = 224;
document.getElementById('IFASbCODBODratio').value = 1.6;
document.getElementById('IFASTKN').value = 35;

document.getElementById('IFASnbVSS').value = 20;
document.getElementById('IFASiTSS').value = 10;
document.getElementById('IFASTEMP').value = 12;

// Effluent
document.getElementById('IFASBODOut').value = 0.2;

// rbCOD
document.getElementById('IFASrbCOD').value = 80;
document.getElementById('IFASCOD').value = 267;


// preDN Tank - Biological
document.getElementById('IFASpercentanoxictankvolume').value = 20;
document.getElementById('IFASNe').value = 6;

// Anoxic Tank Mixing
document.getElementById('IFASMixingEnergy').value = 0.008;


// Aeration Tank
document.getElementById('IFASVmV').value = 0.4;
document.getElementById('IFASHRT').value = 0.233;


// Aeration Tank - Biological Parameters
document.getElementById('IFAStxtYH').value = 0.45;
document.getElementById('FASxh').value = 1860;
document.getElementById('IFAStxtfd').value = 0.15;
document.getElementById('IFAStxtYN').value = 0.15;
document.getElementById('IFAStxtbn').value = 0.135;
document.getElementById('IFASumax').value = 0.516;
document.getElementById('IFASSNH4').value = 0.5;
document.getElementById('IFASKNH4').value = 0.5;
document.getElementById('IFASKOAOB').value = 0.5;
document.getElementById('IFASSRT').value = 21;
document.getElementById('IFASNH4Peakfactor').value = 1.5;
document.getElementById('IFASSRTbf').value = 6;
document.getElementById('IFASSSA').value = 500;
document.getElementById('IFASSDO').value = 2;



// Food to Mass Ratio
document.getElementById('IFASMLSSAeration').value = 3000;

// Alkalinity Dosing
document.getElementById('IFASResAlkalinity').value = 70;
document.getElementById('IFASInfAlkalinity').value = 140;

// Clarifier Sizing
document.getElementById('IFASXclarfier').value = 3000;
document.getElementById('IFASXRAS').value = 8000;

document.getElementById('IFASHAR').value = 24;


// Sludge Wasting
document.getElementById('IFAStxtSolidsContent').value = 1.3;
document.getElementById('IFAStxtSGSludgeperm3Sludge').value = 1.001;


// Air Requirements


// Efficiencies
document.getElementById('IFASiv1txtelev').value = 500;
document.getElementById('IFASiv1txtTemp').value = 12;
document.getElementById('IFASiv1txtLD').value = 4.94;
document.getElementById('IFASiv1txtDDfromBottom').value = 0.54;
document.getElementById('IFASiv1txtde').value = 0.4;
document.getElementById('IFASiv1txtOCS').value = 9.09;
document.getElementById('IFASiv1txtOCT').value = 10.78;
document.getElementById('IFASiv1txta').value = 0.5;
document.getElementById('IFASiv1txtb').value = 0.95;
document.getElementById('IFASiv1txtf').value = 0.9;
document.getElementById('IFASiv1txtDO').value = 4;
document.getElementById('IFASiv1txtDA').value = 1.1633;
document.getElementById('IFASiv1txtO2').value = 0.27;
document.getElementById('IFASiv1OTEpersubmerged').value = 2.2;
}

function calculate() {
    try {
        // Get all input values with defaults
        const inputs = {
            // Influent Parameters
            IFAStxtFlowrate: parseFloat(document.getElementById('IFAStxtFlowrate').value) || 22700,
            IFASBODin: parseFloat(document.getElementById('IFASBODin').value) || 140,
            IFAStxtbCODin: parseFloat(document.getElementById('IFAStxtbCODin').value) || 224,
            IFASbCODBODratio: parseFloat(document.getElementById('IFASbCODBODratio').value) || 1.6,
            IFASTKN: parseFloat(document.getElementById('IFASTKN').value) || 35,
            IFASnbVSS: parseFloat(document.getElementById('IFASnbVSS').value) || 20,
            IFASiTSS: parseFloat(document.getElementById('IFASiTSS').value) || 10,
            IFASTEMP: parseFloat(document.getElementById('IFASTEMP').value) || 12,

            // Effluent
            IFASBODOut: parseFloat(document.getElementById('IFASBODOut').value) || 0.2,
            // Removed IFASNeffluent from here since it will be calculated
            
            // rbCOD
            IFASrbCOD: parseFloat(document.getElementById('IFASrbCOD').value) || 80,
            IFASCOD: parseFloat(document.getElementById('IFASCOD').value) || 267,

            // preDN Tank - Biological
            IFASpercentanoxictankvolume: parseFloat(document.getElementById('IFASpercentanoxictankvolume').value) || 20,
            IFASNe: parseFloat(document.getElementById('IFASNe').value) || 6,

            // Anoxic Tank Mixing
            IFASMixingEnergy: parseFloat(document.getElementById('IFASMixingEnergy').value) || 0.008,

            // Aeration Tank
            IFASVmV: parseFloat(document.getElementById('IFASVmV').value) || 0.4,
            IFASHRT: parseFloat(document.getElementById('IFASHRT').value) || 0.233,
            
            // Aeration Tank - Biological Parameters
            IFAStxtYH: parseFloat(document.getElementById('IFAStxtYH').value) || 0.45,
            IFASxh: parseFloat(document.getElementById('FASxh').value) || 1860,
            IFAStxtfd: parseFloat(document.getElementById('IFAStxtfd').value) || 0.15,
            IFAStxtYN: parseFloat(document.getElementById('IFAStxtYN').value) || 0.15,
            IFAStxtbn: parseFloat(document.getElementById('IFAStxtbn').value) || 0.135,
            IFASumax: parseFloat(document.getElementById('IFASumax').value) || 0.516,
            IFASSNH4: parseFloat(document.getElementById('IFASSNH4').value) || 0.5,
            IFASKNH4: parseFloat(document.getElementById('IFASKNH4').value) || 0.5,
            IFASKOAOB: parseFloat(document.getElementById('IFASKOAOB').value) || 0.5,
            IFASSRT: parseFloat(document.getElementById('IFASSRT').value) || 21,
            IFASNH4Peakfactor: parseFloat(document.getElementById('IFASNH4Peakfactor').value) || 1.5,
            IFASSRTbf: parseFloat(document.getElementById('IFASSRTbf').value) || 6,
            IFASSSA: parseFloat(document.getElementById('IFASSSA').value) || 500,
            IFASSDO: parseFloat(document.getElementById('IFASSDO').value) || 2,

            // Food to Mass Ratio
            IFASMLSSAeration: parseFloat(document.getElementById('IFASMLSSAeration').value) || 3000,

            // Alkalinity Dosing
            IFASResAlkalinity: parseFloat(document.getElementById('IFASResAlkalinity').value) || 70,
            IFASInfAlkalinity: parseFloat(document.getElementById('IFASInfAlkalinity').value) || 140,

            // Clarifier Sizing
            IFASXclarfier: parseFloat(document.getElementById('IFASXclarfier').value) || 3000,
            IFASXRAS: parseFloat(document.getElementById('IFASXRAS').value) || 8000,
            IFASHAR: parseFloat(document.getElementById('IFASHAR').value) || 24,

            // Sludge Wasting
            IFAStxtSolidsContent: parseFloat(document.getElementById('IFAStxtSolidsContent').value) || 1.3,
            IFAStxtSGSludgeperm3Sludge: parseFloat(document.getElementById('IFAStxtSGSludgeperm3Sludge').value) || 1.001,

            // Efficiencies
            IFASiv1txtelev: parseFloat(document.getElementById('IFASiv1txtelev').value) || 500,
            IFASiv1txtTemp: parseFloat(document.getElementById('IFASiv1txtTemp').value) || 12,
            IFASiv1txtLD: parseFloat(document.getElementById('IFASiv1txtLD').value) || 4.94,
            IFASiv1txtDDfromBottom: parseFloat(document.getElementById('IFASiv1txtDDfromBottom').value) || 0.54,
            IFASiv1txtde: parseFloat(document.getElementById('IFASiv1txtde').value) || 0.4,
            IFASiv1txtOCS: parseFloat(document.getElementById('IFASiv1txtOCS').value) || 9.09,
            IFASiv1txtOCT: parseFloat(document.getElementById('IFASiv1txtOCT').value) || 10.78,
            IFASiv1txta: parseFloat(document.getElementById('IFASiv1txta').value) || 0.5,
            IFASiv1txtb: parseFloat(document.getElementById('IFASiv1txtb').value) || 0.95,
            IFASiv1txtf: parseFloat(document.getElementById('IFASiv1txtf').value) || 0.9,
            IFASiv1txtDO: parseFloat(document.getElementById('IFASiv1txtDO').value) || 2,
            IFASiv1txtDA: parseFloat(document.getElementById('IFASiv1txtDA').value) || 1.1633,
            IFASiv1txtO2: parseFloat(document.getElementById('IFASiv1txtO2').value) || 0.27,
            IFASiv1OTEpersubmerged: parseFloat(document.getElementById('IFASiv1OTEpersubmerged').value) || 2.2
        };

        // Calculate temperature-dependent parameters
        let IFAStxtbH = 0.12 * Math.pow(1.04, (inputs.IFASTEMP - 20));
        IFAStxtbH = Math.round(IFAStxtbH * 10000) / 10000;
        
        let IFAStxtbn = 0.17 * Math.pow(1.029, (inputs.IFASTEMP - 20));
        IFAStxtbn = Math.round(IFAStxtbn * 10000) / 10000;

        const IFASumax = 0.9 * Math.pow(1.072, (inputs.IFASTEMP - 20));
        const IFASbaob = 0.17 * Math.pow(1.029, (inputs.IFASTEMP - 20));

        // Calculate IFASu and related parameters
        const IFASu = IFASumax * (inputs.IFASSNH4 / (inputs.IFASSNH4 + inputs.IFASKNH4)) * 
                     (inputs.IFASSDO / (inputs.IFASSDO + inputs.IFASKOAOB));
        const IFASNecSRT = 1 / IFASu;
        const IFASSRT = inputs.IFASNH4Peakfactor * IFASNecSRT;

        // First, solve for IFASSRTas
        const IFASSRTas = solveForIFASSRTas();
        console.log("Calculated IFASSRTas:", IFASSRTas);

        // Then solve for IFAS variables including IFASNeffluent
        const ifasResults = solveForIFASVariables({
            ...inputs,
            IFASxh: inputs.IFASxh,
            IFAStxtbH: IFAStxtbH,
            IFAStxtbn: IFAStxtbn,
            IFASumax: IFASumax,
            IFASSRTas: IFASSRTas
        });

        // Now use the calculated IFASNeffluent in subsequent calculations
        const IFASNeffluent = ifasResults.IFASNeffluent;
        console.log("Calculated IFASNeffluent:", IFASNeffluent);

        // Calculate biomass production with the calculated IFASNeffluent
        let IFASNOXX = inputs.IFASTKN - IFASNeffluent;
        
        let IFAStxtHBkgd = (0.001) * inputs.IFAStxtFlowrate * inputs.IFAStxtYH * 
                          (inputs.IFASBODin - inputs.IFASBODOut) * 
                          inputs.IFASbCODBODratio / ((1 + IFAStxtbH * IFASSRT));

        let IFAStxtCDkgd = (0.001) * inputs.IFAStxtfd * IFAStxtbH * inputs.IFAStxtFlowrate * 
                          inputs.IFAStxtYH * (inputs.IFASBODin - inputs.IFASBODOut) * 
                          inputs.IFASbCODBODratio * IFASSRT / ((1 + IFAStxtbH * IFASSRT));

        let IFAStxtNBkgd = (0.001) * inputs.IFAStxtFlowrate * inputs.IFAStxtYN * IFASNOXX / 
                          (1 + IFAStxtbn * IFASSRT);

        let IFASpxbio = IFAStxtHBkgd + IFAStxtCDkgd + IFAStxtNBkgd;

        // Recalculate NOXX with updated biomass
        IFASNOXX = (inputs.IFASTKN - IFASNeffluent) - 0.12 * IFASpxbio * 1000 / inputs.IFAStxtFlowrate;

        // Recalculate biomass with updated NOXX
        IFAStxtHBkgd = (0.001) * inputs.IFAStxtFlowrate * inputs.IFAStxtYH * 
                      (inputs.IFASBODin - inputs.IFASBODOut) * 
                      inputs.IFASbCODBODratio / ((1 + IFAStxtbH * IFASSRT));

        IFAStxtCDkgd = (0.001) * inputs.IFAStxtfd * IFAStxtbH * inputs.IFAStxtFlowrate * 
                      inputs.IFAStxtYH * (inputs.IFASBODin - inputs.IFASBODOut) * 
                      inputs.IFASbCODBODratio * IFASSRT / ((1 + IFAStxtbH * IFASSRT));

        IFAStxtNBkgd = (0.001) * inputs.IFAStxtFlowrate * inputs.IFAStxtYN * IFASNOXX / 
                      (1 + IFAStxtbn * IFASSRT);

        IFASpxbio = IFAStxtHBkgd + IFAStxtCDkgd + IFAStxtNBkgd;

        const IFASpxvss = IFASpxbio + (0.001) * inputs.IFAStxtFlowrate * inputs.IFASnbVSS;
        const IFASpxtss = (IFASpxbio / 0.85) + inputs.IFAStxtFlowrate * 
                         inputs.IFASnbVSS * (0.001) + 
                         inputs.IFAStxtFlowrate * inputs.IFASiTSS * (0.001);

        // Aeration Tank Sizing
        let IFASVaer = inputs.IFASHRT * inputs.IFAStxtFlowrate;
        IFASVaer = Math.round(IFASVaer * 100) / 100;

        const IFASfractionMLVSS = IFASpxvss / IFASpxtss;
        const IFASMLVSS = IFASfractionMLVSS * inputs.IFASMLSSAeration;

        const IFASFMRatio = inputs.IFAStxtFlowrate * inputs.IFASBODin / (IFASVaer * IFASMLVSS);
        const IFASBODloading = inputs.IFAStxtFlowrate * inputs.IFASBODin / 1000;
        const IFASBODremoved = inputs.IFAStxtFlowrate * 
                              (inputs.IFASBODin - inputs.IFASBODOut) * 
                              (1 / 1000);
        const IFASBODloadingout = IFASBODloading - IFASBODremoved;
        const IFASYOBS = IFASpxtss / IFASBODremoved;

        // Calculate IFASNo with the calculated IFASSRTas
        const IFASNo = inputs.IFASTKN - 0.12 * ((inputs.IFASxh) * inputs.IFASHRT * (1 - inputs.IFASVmV)) / IFASSRTas;
        const IFASXclarfier = inputs.IFASMLSSAeration;

     
        const IFASR = IFASXclarfier / (inputs.IFASXRAS - IFASXclarfier);
        const IFASRAS = IFASR * (inputs.IFAStxtFlowrate);

        const IFASClarifierAreaRequired = inputs.IFAStxtFlowrate / inputs.IFASHAR;

       const IFASfractionxb = (inputs.IFAStxtFlowrate) * IFASSRT * (inputs.IFAStxtYH) * (inputs.IFASBODin) * (inputs.IFASbCODBODratio) / (IFASVaer * (1 + IFAStxtbH * IFASSRT));
       const IFASIR = (IFASNOXX)/(inputs.IFASNe)- 1 - IFASR;
       const IFASInternalRecycle = IFASIR * (inputs.IFAStxtFlowrate) + IFASR * (inputs.IFAStxtFlowrate);
        const IFASNOXfeed = IFASInternalRecycle * (inputs.IFASNe);

        const IFASAnoxicTankVolume = (inputs.IFASpercentanoxictankvolume) * 0.01 * IFASVaer;
        const IFASFMb = (inputs.IFAStxtFlowrate) * (inputs.IFASBODin) / (IFASAnoxicTankVolume * IFASfractionxb);
        const IFASpercentrbCOD = 100 * (inputs.IFASrbCOD) / (inputs.IFASCOD);

        // Determine bo value based on percentrbCOD
        let IFASbo;
        if (IFASpercentrbCOD < 15) {
        IFASbo = 0.186;
        } else if (IFASpercentrbCOD < 25) {
        IFASbo = 0.213;
        } else if (IFASpercentrbCOD < 35) {
         IFASbo = 0.235;
        } else if (IFASpercentrbCOD < 45) {
         IFASbo = 0.242;
        } else if (IFASpercentrbCOD < 55) {
         IFASbo = 0.27;
        }

        // Determine b1 value based on percentrbCOD
        let IFASb1;
        if (IFASpercentrbCOD < 15) {
         IFASb1 = 0.078;
        } else if (IFASpercentrbCOD < 25) {
          IFASb1 = 0.118;
        } else if (IFASpercentrbCOD < 35) {
         IFASb1 = 0.141;
        } else if (IFASpercentrbCOD < 45) {
          IFASb1 = 0.152;
        } else if (IFASpercentrbCOD < 55) {
         IFASb1 = 0.162;
        }

       // Preanoxic Part Calculations
        let IFASSDNR;
        if (IFASFMb > 0.5) {
         IFASSDNR = IFASbo + IFASb1 * Math.log(IFASFMb);
        } else if (IFASFMb < 0.5) {
          IFASSDNR = 0.24 * IFASFMb;
        }
       
        const IFASSDNRT = IFASSDNR * Math.pow(1.026, ((inputs.IFASTEMP) - 20));

        let IFASSDNRadj;
        if (IFASIR < 2.5) {
        IFASSDNRadj = IFASSDNRT - 0.0166 * Math.log(IFASFMb) - 0.078;
        } else if (IFASIR > 2.5) {
        IFASSDNRadj = IFASSDNRT - 0.029 * Math.log(IFASFMb) - 0.012;
        }


        const IFASXMLVSSpreanox = (IFASpxvss / IFASpxtss) * IFASMLVSS;
        let IFASSDNRoverall = IFASSDNRadj * (IFASfractionxb / IFASXMLVSSpreanox);
        IFASSDNRoverall = Math.round(IFASSDNRoverall * 100) / 100;

        const IFASNOXremoval = IFASAnoxicTankVolume * IFASSDNRadj * IFASfractionxb;


        const IFASAnoxicTankVolumeperphase = IFASAnoxicTankVolume;

        const IFASPreanoxHRT = IFASAnoxicTankVolume * 24 / (inputs.IFAStxtFlowrate);


        const IFASMixingPower = (inputs.IFASMixingEnergy) * IFASAnoxicTankVolume;


        //Alkalinity Removal

        const IFASAlkalinityProduced = 3.57 * (IFASNOXX - inputs.IFASNe);
        const IFASAlkalinityUsed = 7.14 * IFASNOXX;
        const IFASAlkalinitytobeAdded = (inputs.IFASResAlkalinity) - (inputs.IFASInfAlkalinity) + IFASAlkalinityUsed - IFASAlkalinityProduced;
        const IFASMassAlkalinity = IFASAlkalinitytobeAdded * (inputs.IFAStxtFlowrate) / 1000;
        
        
        //Air Requirements
        const IFASivOTRBOD = (IFASBODloading - IFASBODloadingout) * (inputs.IFASbCODBODratio) - 1.42 * IFASpxbio;
        const IFASivOTRNH4N = 4.57 * IFASNOXX * (inputs.IFAStxtFlowrate) / 1000;
        const IFASivOTRCredit = -(IFASNOXX - inputs.IFASNe) * (inputs.IFAStxtFlowrate) / 1000 * 2.86;
        const IFASivOTR = IFASivOTRBOD + IFASivOTRNH4N + IFASivOTRCredit;



        //Efficiencies
        const IFASiv1txtTemp = inputs.IFASTEMP;
        const IFASiv1txtOUR = IFASivOTR / 24;
        const IFASiv1txtRP = Math.exp((-9.81) * 28.97 * (inputs.IFASiv1txtelev) / (8314 * (IFASiv1txtTemp + 273.15)));
        const IFASiv1txtDD = inputs.IFASiv1txtLD - inputs.IFASiv1txtDDfromBottom;
        const IFASiv1txtOCSd = inputs.IFASiv1txtOCS * (1 + inputs.IFASiv1txtde * (IFASiv1txtDD / 10.33));


        const IFASiv1txtSOTR = IFASiv1txtOUR * (1 / (inputs.IFASiv1txta * inputs.IFASiv1txtf)) * IFASiv1txtOCSd * 
                      (1 / (inputs.IFASiv1txtb * (inputs.IFASiv1txtOCT / inputs.IFASiv1txtOCS) * IFASiv1txtRP * IFASiv1txtOCSd - inputs.IFASiv1txtDO)) * 
                      Math.pow(1.024, (20 - IFASiv1txtTemp));

        const IFASiv1txtE = inputs.IFASiv1OTEpersubmerged * IFASiv1txtDD;

        let IFASiv1txtAF = (IFASiv1txtSOTR * (1 / (IFASiv1txtE * 0.01)) * (1 / inputs.IFASiv1txtO2)) / 60;
      
        IFASiv1txtAF = Math.round(IFASiv1txtAF * 100) / 100;

        const IFASivtxtAFTOT = IFASiv1txtAF;

        let IFAStxtSludgeflowrate = (IFASpxtss / (inputs.IFAStxtSolidsContent / 100) / 1000) / inputs.IFAStxtSGSludgeperm3Sludge;
        IFAStxtSludgeflowrate = Math.round(IFAStxtSludgeflowrate * 100) / 100;

        const IFASNO3Nout = (IFASNOXfeed-IFASNOXremoval)/inputs.IFAStxtFlowrate;


        // Output results
        const outputFields = {
            IFASNO3Nout,
            IFAStxtbH,
            IFASumax,
            IFASbaob,
            IFASu,
            IFASNecSRT,
            IFASSRT,
            IFAStxtHBkgd,
            IFAStxtCDkgd,
            IFASNOXX,
            IFAStxtNBkgd,
            IFASpxbio,
            IFASpxvss,
            IFASpxtss,
            IFASVaer,
            IFASfractionMLVSS,
            IFASMLVSS,
            IFASFMRatio,
            IFASBODloading,
            IFASBODremoved,
            IFASBODloadingout,
            IFASYOBS,
            IFASSRTas,
            IFASNo,
            IFASXclarfier,
            IFASR,
            IFASRAS,
            IFASClarifierAreaRequired,
            IFASfractionxb,
            IFASIR,
            IFASInternalRecycle,
            IFASNeffluent: ifasResults.IFASNeffluent,
            IFASNOXfeed,
            IFASAnoxicTankVolume,
            IFASFMb,
            IFASpercentrbCOD,
            IFASbo,
            IFASb1,
            IFASSDNR,
            IFASSDNRT,
            IFASSDNRadj,
            IFASXMLVSSpreanox,
            IFASSDNRoverall,
            IFASNOXremoval,
            IFASPreanoxHRT,
            IFASMixingPower,
            IFASAlkalinityUsed,
            IFASAlkalinityProduced,
            IFASAlkalinitytobeAdded,
            IFASMassAlkalinity,
            IFASivOTRBOD,
            IFASivOTRNH4N,
            IFASivOTRCredit,
            IFASivOTR,
            IFASiv1txtTemp,
            IFASiv1txtOUR,
            IFASiv1txtRP,
            IFASiv1txtDD,
            IFASiv1txtOCSd,
            IFASiv1txtSOTR,
            IFASiv1txtE,
            IFASiv1txtAF,
            IFASivtxtAFTOT,
            IFAStxtSludgeflowrate,
            IFASPercentNOxidized,

            IFASXn: ifasResults.IFASXn,
            IFASXBF: ifasResults.IFASXBF,
            tIFASNo: ifasResults.IFASNo,
            IFAS_converged: ifasResults.converged,
            IFAS_iterations: ifasResults.iterations,
       
            
       
  
           
            
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

function solveForIFASSRTas() {
    // Initialize given values
    const IFASxh = 1860;
    const IFAStxtbH = 0.088;
    const IFASHRT = 0.233;
    const IFAStxtYH = 0.45;
    const IFAStxtbCODin = 224;
    const IFASVmV = 0.4;

    // Set initial guess for IFASSRTas
    let IFASSRTas = 3.34; // Initial guess
    const tolerance = 0.00001; // Define small tolerance for higher accuracy
    const maxIterations = 1000; // Maximum iterations to avoid infinite loop
    let adjustmentFactor = 0.01; // Small adjustment factor for smoother convergence

    // Initialize previous error
    let previousError = 0;
    let result, errorValue;

    // Start iteration
    for (let iteration = 1; iteration <= maxIterations; iteration++) {
        // Calculate the result of the equation
        result = (IFAStxtYH * IFAStxtbCODin * IFASSRTas) / 
                ((1 + IFAStxtbH * IFASSRTas) * ((1 - IFASVmV) * IFASHRT));

        // Calculate the error
        errorValue = IFASxh - result;

        // Debugging output (console.log can be removed in production)
        console.log(`Iteration: ${iteration}, IFASSRTas: ${IFASSRTas}, Result: ${result}, Error: ${errorValue}`);

        // Check if the result is close enough to the target (IFASxh)
        if (Math.abs(errorValue) < tolerance) {
            return IFASSRTas; // Return the calculated value
        }

        // Adjust the guess for IFASSRTas based on the error
        // Use a damping factor to make gradual changes
        if (Math.abs(errorValue) > Math.abs(previousError)) {
            adjustmentFactor = adjustmentFactor * 0.5; // Reduce step if error increases
        } else {
            adjustmentFactor = adjustmentFactor * 1.1; // Slightly increase step if error decreases
        }

        // Adjust IFASSRTas based on error value
        IFASSRTas = IFASSRTas + errorValue * adjustmentFactor;

        // Ensure IFASSRTas is never negative
        if (IFASSRTas <= 0) {
            IFASSRTas = 0.0001; // Set a minimum positive value
        }

        // Store the current error for comparison in the next iteration
        previousError = errorValue;
    }

    // If no solution is found, return the last IFASSRTas value
    console.log(`No precise solution found within ${maxIterations} iterations. Last calculated value of IFASSRTas = ${IFASSRTas}`);
    return IFASSRTas;
}

function solveForIFASVariables(inputs) {
    const {
        IFASSSA = 500,
        IFASVmV = 0.4,
        IFASSRTbf = 6,
        IFASSDO = 4,
        IFASKOAOB = 0.5,
        IFASKNH4 = 0.5,
        IFAStxtbn = 0.135,
        IFASxh = 1860,
        IFAStxtbH = 0.088,
        IFAStxtYN = 0.15,
        IFASumax = 0.516,
        IFASSRTas = 3.34,
        
        IFASHRT = 0.233,
        IFASTKN = 35,
        IFASXn: initialIFASXn = 18,
        IFASXBF: initialIFASXBF = 0.2,
        IFASNeffluent: initialIFASNeffluent = 0.01, // More realistic initial guess
        debug = true
    } = inputs;

    // 1. Calculate maximum possible nitrogen available for removal
    const IFASNo = IFASTKN - 0.12 * (IFASxh * IFASHRT * (1 - IFASVmV)) / IFASSRTas;

    // 2. Initialize variables for iteration
    let IFASXn = initialIFASXn;
    let IFASXBF = initialIFASXBF;
    let IFASNeffluent = initialIFASNeffluent;

    const tolerance = 0.01;
    const maxIterations = 1000;
    let iteration = 0;
    let converged = false;

    while (iteration < maxIterations && !converged) {
        iteration++;

        const prevNeff = IFASNeffluent;

        // 3. Calculate biofilm biomass (XBF)
        IFASXBF = (IFAStxtYN * (IFASNeffluent / (2.2 + IFASNeffluent)) * 3.3) / 
                  (IFAStxtbn + (1/IFASSRTbf));

        // 4. Calculate suspended biomass (Xn)
        const numeratorXn = IFASSSA * IFASVmV * (IFASXBF/IFASSRTbf);
        const denomXn = IFAStxtbn*(1-IFASVmV) + 
                       ((1-IFASVmV)/IFASSRTas) - 
                       (IFASumax*IFASNeffluent*IFASSDO*(1-IFASVmV))/
                       ((IFASNeffluent+IFASKNH4)*(IFASKOAOB+IFASSDO));
        
        IFASXn = numeratorXn / Math.max(denomXn, 0.00001);

        // 5. Update effluent nitrogen
        const nitrificationTerm = (IFASumax/IFAStxtYN) * 
                                 (IFASNeffluent*IFASSDO*IFASXn*IFASHRT)/
                                 ((IFASKNH4+IFASNeffluent)*(IFASKOAOB+IFASSDO));
        
        const denitrificationTerm = (IFASNeffluent*3.3*IFASVmV*IFASSSA*IFASHRT)/
                                   (2.2+IFASNeffluent);
        
        const decayTerm = 0.12*IFAStxtbH*IFASxh*(1-IFASVmV)*IFASHRT;

        const alpha = 0.3; // Relaxation factor
        const newNeffluent = IFASNo - nitrificationTerm - denitrificationTerm + decayTerm;
        const clampedNeffluent = Math.max(0.1, Math.min(newNeffluent, IFASTKN));
        

        // Apply bounds (effluent nitrogen can't be negative or exceed influent)
        IFASNeffluent = (1 - alpha) * IFASNeffluent + alpha * clampedNeffluent;

        // 6. Check convergence
        if (Math.abs(IFASNeffluent - prevNeff) < tolerance) {
            converged = true;
        }

        if (debug && iteration % 10 === 0) {
            console.log(`Iter ${iteration}: Neff=${IFASNeffluent.toFixed(2)}, Xn=${IFASXn.toFixed(1)}, XBF=${IFASXBF.toFixed(3)}`);
        }
    }

    return {
        IFASXn,
        IFASXBF,
        IFASNeffluent,
        IFASNo,
        iterations: iteration,
        converged
    };
}


function getValue(id) {
  const element = document.getElementById(id);
  return element ? parseFloat(element.value) || 0 : 0;
}

function generateReport() {
  try {
    // Map input fields to report fields
    const valueMap = {
      'IFAStxtFlowrate': 'IFAStxtFlowrate2',
      'IFASBODin': 'IFASBODin2',
      'IFASTKN': 'IFASTKN2',
      'IFASBODOut': 'IFASBODOut2',
      'IFASNeffluent': 'IFASNeffluent2',
      'IFASNO3Nout': 'IFASNO3Nout2',
      'IFASAnoxicTankVolume': 'IFASAnoxicTankVolume2',
      'IFASVaer': 'IFASVaer2',
      'IFASClarifierAreaRequired': 'IFASClarifierAreaRequired2',
    
      'IFASiv1txtTemp': 'IFASiv1txtTemp2',
      
      'IFASMLSSAeration': 'IFASMLSSAeration2',

      'IFASFMRatio': 'IFASFMRatio2',
      
      'IFASSRTas': 'IFASSRTas2',

      'IFASVmV': 'IFASVmV2',

      'IFASIR': 'IFASIR2',

      'IFASSSA': 'IFASSSA2',

      'IFASMLSSAeration': 'IFASMLSSAeration2',

      'IFASSRTas': 'IFASSRTas2',


      'IFASClarifierAreaRequired': 'IFASClarifierAreaRequired2',


      'IFASivOTR': 'IFASivOTR2',

      'IFASiv1txtDO': 'IFASiv1txtDO2',

      'IFASiv1txtE': 'IFASiv1txtE2',
      
      'IFASiv1txtAF': 'IFASiv1txtAF2',

      'IFASiv1txtLD': 'IFASiv1txtLD2',


     'IFAStxtSludgeflowrate': 'IFAStxtSludgeflowrate2',

     'IFASHRT': 'IFASHRT2',




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