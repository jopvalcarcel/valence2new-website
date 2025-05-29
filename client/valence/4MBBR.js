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
document.getElementById('ivCODkgkgNremoved').value = 3.1;
document.getElementById('ivEthkgkgNremoved').value = 1.48;
document.getElementById('ivtxtSolidsContent').value = 1.3;
document.getElementById('ivtxtSGSludgeperm3Sludge').value = 1.001;
document.getElementById('ivFlowrate').value = 22700;
document.getElementById('ivTKN').value = 87;
document.getElementById('ivSRT').value = 21;
document.getElementById('ivTemp').value = 12;
document.getElementById('ivBODin').value = 140;
document.getElementById('ivNH4Nin').value = 25;
document.getElementById('ivNO3Nin').value = 0;
document.getElementById('ivNBVSS').value = 20;
document.getElementById('ivbCODBOD').value = 1.6;
document.getElementById('ivVSSin').value = 60;
document.getElementById('ivTSSin').value = 70;
//BOD
document.getElementById('ivSALR').value = 7.5;
document.getElementById('ivBODremoval').value = 95;
document.getElementById('ivSSA').value = 600;
document.getElementById('ivMediaFillVol').value = 40;
document.getElementById('ivDO').value = 4;
document.getElementById('ivAlkalinityin').value = 140;
document.getElementById('ivResAlkalinity').value = 70;
document.getElementById('ivSLR').value = 24;
document.getElementById('ivrbcod').value = 10;
//NH4N
document.getElementById('ivMediaFillVolNH4N').value = 40;
document.getElementById('ivNH4NSSA').value = 600;

//anoxic mixer
document.getElementById('ivkwperm3').value = 5 / 1000;

//NO3N effluent
document.getElementById('ivNO3Neff').value = 3.1;

document.getElementById('ivNO3Nremoval').value = 70;
document.getElementById('ivSALRNO3N').value = 0.9;
document.getElementById('ivNO3NSSA').value = 600;
document.getElementById('ivMediaFillVolNO3N').value = 40;
document.getElementById('ivs4NO3NLoading').value = 0;


//Media void
document.getElementById('iv1mediavoid').value = 60;
document.getElementById('iv2mediavoid').value = 60;
document.getElementById('iv3mediavoid').value = 60;

//air flowrate
//BOD
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

document.getElementById('iv1txtDA').value = 1.1633;
document.getElementById('iv1txtO2').value = 0.27;

document.getElementById('iv1OTEpersubmerged').value = 2.2;

//NH4N
document.getElementById('iv2txtelev').value = 500;
document.getElementById('iv2txtLD').value = 4.94;
document.getElementById('iv2txtDDfromBottom').value = 0.54;
document.getElementById('iv2txtde').value = 0.4;
document.getElementById('iv2txtOCS').value = 9.09;
document.getElementById('iv2txtOCT').value = 10.78;

document.getElementById('iv2txta').value = 0.5;
document.getElementById('iv2txtb').value = 0.95;
document.getElementById('iv2txtf').value = 0.9;
document.getElementById('iv2txtDO').value = 4;

document.getElementById('iv2txtDA').value = 1.1633;
document.getElementById('iv2txtO2').value = 0.27;

document.getElementById('iv2OTEpersubmerged').value = 2.2;



//ethanol dosing

}

function calculate() {
    try {
        // Get input values
const ivtxtSolidsContent = parseFloat(document.getElementById('ivtxtSolidsContent').value) || 0;
const ivtxtSGSludgeperm3Sludge = parseFloat(document.getElementById('ivtxtSGSludgeperm3Sludge').value) || 0;
const ivFlowrate = parseFloat(document.getElementById('ivFlowrate').value) || 0;
const ivTKN = parseFloat(document.getElementById('ivTKN').value) || 0;
const ivSRT = parseFloat(document.getElementById('ivSRT').value) || 0;
const ivTemp = parseFloat(document.getElementById('ivTemp').value) || 0;
const ivBODin = parseFloat(document.getElementById('ivBODin').value) || 0;
const ivNH4Nin = parseFloat(document.getElementById('ivNH4Nin').value) || 0;
const ivNO3Nin = parseFloat(document.getElementById('ivNO3Nin').value) || 0;
const ivNBVSS = parseFloat(document.getElementById('ivNBVSS').value) || 0;
const ivbCODBOD = parseFloat(document.getElementById('ivbCODBOD').value) || 0;
const ivVSSin = parseFloat(document.getElementById('ivVSSin').value) || 0;
const ivTSSin = parseFloat(document.getElementById('ivTSSin').value) || 0;
//BOD
const ivSALR = parseFloat(document.getElementById('ivSALR').value) || 0;
const ivBODremoval = parseFloat(document.getElementById('ivBODremoval').value) || 0;
const ivSSA = parseFloat(document.getElementById('ivSSA').value) || 0;
const ivMediaFillVol = parseFloat(document.getElementById('ivMediaFillVol').value) || 0;
const ivDO = parseFloat(document.getElementById('ivDO').value) || 0;
const ivAlkalinityin = parseFloat(document.getElementById('ivAlkalinityin').value) || 0;
const ivResAlkalinity = parseFloat(document.getElementById('ivResAlkalinity').value) || 0;
const ivSLR = parseFloat(document.getElementById('ivSLR').value) || 0;
const ivrbcod = parseFloat(document.getElementById('ivrbcod').value) || 0;
//NH4N
const ivMediaFillVolNH4N = parseFloat(document.getElementById('ivMediaFillVolNH4N').value) || 0;
const ivNH4NSSA = parseFloat(document.getElementById('ivNH4NSSA').value) || 0;

//anoxic mixer
const ivkwperm3 = parseFloat(document.getElementById('ivkwperm3').value) || 0;

//NO3N effluent
const ivNO3Neff = parseFloat(document.getElementById('ivNO3Neff').value) || 0;

const ivNO3Nremoval = parseFloat(document.getElementById('ivNO3Nremoval').value) || 0;
const ivSALRNO3N = parseFloat(document.getElementById('ivSALRNO3N').value) || 0;
const ivNO3NSSA = parseFloat(document.getElementById('ivNO3NSSA').value) || 0;
const ivMediaFillVolNO3N = parseFloat(document.getElementById('ivMediaFillVolNO3N').value) || 0;



//Media void
const iv1mediavoid = parseFloat(document.getElementById('iv1mediavoid').value) || 0;
const iv2mediavoid = parseFloat(document.getElementById('iv2mediavoid').value) || 0;
const iv3mediavoid = parseFloat(document.getElementById('iv3mediavoid').value) || 0;

//air flowrate
//BOD
const iv1txtelev = parseFloat(document.getElementById('iv1txtelev').value) || 0;
const iv1txtLD = parseFloat(document.getElementById('iv1txtLD').value) || 0;
const iv1txtDDfromBottom = parseFloat(document.getElementById('iv1txtDDfromBottom').value) || 0;
const iv1txtde = parseFloat(document.getElementById('iv1txtde').value) || 0;
const iv1txtOCS = parseFloat(document.getElementById('iv1txtOCS').value) || 0;
const iv1txtOCT = parseFloat(document.getElementById('iv1txtOCT').value) || 0;

const iv1txta = parseFloat(document.getElementById('iv1txta').value) || 0;
const iv1txtb = parseFloat(document.getElementById('iv1txtb').value) || 0;
const iv1txtf = parseFloat(document.getElementById('iv1txtf').value) || 0;
const iv1txtDO = parseFloat(document.getElementById('iv1txtDO').value) || 0;

const iv1txtDA = parseFloat(document.getElementById('iv1txtDA').value) || 0;
const iv1txtO2 = parseFloat(document.getElementById('iv1txtO2').value) || 0;

const iv1OTEpersubmerged = parseFloat(document.getElementById('iv1OTEpersubmerged').value) || 0;

//NH4N
const iv2txtelev = parseFloat(document.getElementById('iv2txtelev').value) || 0;
const iv2txtLD = parseFloat(document.getElementById('iv2txtLD').value) || 0;
const iv2txtDDfromBottom = parseFloat(document.getElementById('iv2txtDDfromBottom').value) || 0;
const iv2txtde = parseFloat(document.getElementById('iv2txtde').value) || 0;
const iv2txtOCS = parseFloat(document.getElementById('iv2txtOCS').value) || 0;
const iv2txtOCT = parseFloat(document.getElementById('iv2txtOCT').value) || 0;
const iv2txta = parseFloat(document.getElementById('iv2txta').value) || 0;
const iv2txtb = parseFloat(document.getElementById('iv2txtb').value) || 0;
const iv2txtf = parseFloat(document.getElementById('iv2txtf').value) || 0;
const iv2txtDO = parseFloat(document.getElementById('iv2txtDO').value) || 0;
const iv2txtDA = parseFloat(document.getElementById('iv2txtDA').value) || 0;
const iv2txtO2 = parseFloat(document.getElementById('iv2txtO2').value) || 0;
const iv2OTEpersubmerged = parseFloat(document.getElementById('iv2OTEpersubmerged').value) || 0;



//ethanol dosing
const ivCODkgkgNremoved = parseFloat(document.getElementById('ivCODkgkgNremoved').value) || 0;
const ivEthkgkgNremoved = parseFloat(document.getElementById('ivEthkgkgNremoved').value) || 0;



        // Validate inputs

 const ivBODTKN = ivBODin / ivTKN;


 let ivNH4Nflux;
switch(ivDO) {
    case 2: ivNH4Nflux = 0.61; break;
    case 2.5: ivNH4Nflux = 0.75; break;
    case 3: ivNH4Nflux = 0.88; break;
    case 3.5: ivNH4Nflux = 0.9; break;
    case 4: ivNH4Nflux = 1.03; break;
    case 4.5: ivNH4Nflux = 1.5; break;
    case 5: ivNH4Nflux = 1.23; break;
    case 5.5: ivNH4Nflux = 1.3; break;
    case 6: ivNH4Nflux = 1.41; break;
    default: ivNH4Nflux = 0.9; // default value
}


let ivNH4Neff;
switch(ivDO) {
    case 2: ivNH4Neff = 0.5; break;
    case 2.5: ivNH4Neff = 0.75; break;
    case 3: ivNH4Neff = 0.8; break;
    case 3.5: ivNH4Neff = 0.9; break;
    case 4: ivNH4Neff = 1; break;
    case 4.5: ivNH4Neff = 1.5; break;
    case 5: ivNH4Neff = 1.3; break;
    case 5.5: ivNH4Neff = 1.4; break;
    case 6: ivNH4Neff = 1.65; break;
    default: ivNH4Neff = 1; // default value
}


const ivNH4Ne = ivNH4Neff;
let ivNH4Nfluxcor = ivNH4Nflux * Math.pow(1.058, -15) * Math.pow(1.058, ivTemp);
ivNH4Nfluxcor = Math.round(ivNH4Nfluxcor * 100) / 100;
const ivIR = (ivNH4Nin - ivNH4Neff) / ivNO3Neff;
const ivs1NH4NLoading = ivNH4Nin * ivFlowrate / 1000;
const ivs2NH4NLoading = ivs1NH4NLoading + ivIR * ivFlowrate * ivNH4Neff / 1000;
const ivs3NH4NLoading = ivs2NH4NLoading;
const ivs4NH4NLoading = ivs3NH4NLoading;
const ivs5NH4NLoading = ivNH4Neff * (ivFlowrate + ivFlowrate * ivIR) / 1000;
const ivs6NH4NLoading = ivIR * ivFlowrate * ivNH4Neff / 1000;
const ivs7NH4NLoading = ivs5NH4NLoading - ivs6NH4NLoading;
const ivNH4Nremoval = (ivNH4Nin - ivNH4Neff) * 100 / ivNH4Nin;
const ivSALRNH4N = ivNH4Nfluxcor / (ivNH4Nremoval * 0.01);
const ivMediaareaNH4N = (ivs4NH4NLoading - ivs5NH4NLoading) * 1000 / ivSALRNH4N;
const iv2Mediavolume = ivMediaareaNH4N / ivSSA;
const iv2tankvol = iv2Mediavolume / (ivMediaFillVolNH4N * 0.01);
const iv2Mediadisplacedvolume = iv2Mediavolume * (1 - (iv2mediavoid * 0.01));
let ivHRTstage2 = 24 * (iv2tankvol - iv2Mediadisplacedvolume) / (ivFlowrate + ivFlowrate * ivIR);
ivHRTstage2 = Math.round(ivHRTstage2 * 100) / 100;


// NO3N Loading Calculations
const ivs1NO3NLoading = ivNO3Nin * ivFlowrate / 1000;
const ivs2NO3NLoading = ivs1NO3NLoading + ivNO3Neff * ivIR * ivFlowrate / 1000;
const ivs3NO3NLoading = (1 - ivNO3Nremoval * 0.01) * ivs2NO3NLoading;
const ivs4NO3NLoading = ivs3NO3NLoading;
const ivs5NO3NLoading = ivNO3Neff * (ivIR * ivFlowrate + ivFlowrate) / 1000;
const ivs6NO3NLoading = ivNO3Neff * ivIR * ivFlowrate / 1000;
const ivs7NO3NLoading = ivs5NO3NLoading - ivs6NO3NLoading;

// BOD Loading Calculations
const ivs1BODLoading = ivBODin * ivFlowrate / 1000;
const ivs2BODLoading = ivs1BODLoading;
const ivs3BODLoading = ivs2BODLoading - ((ivNO3Nremoval * 0.01) * ivs2NO3NLoading) * 2.86;
const ivs4BODLoading = ivs3BODLoading * (1 - ivBODremoval * 0.01);
const ivs5BODLoading = ivs4BODLoading;
const ivBODeff = ivs5BODLoading * 1000 / (ivIR * ivFlowrate + ivFlowrate);
const ivs6BODLoading = ivBODeff * (ivIR * ivFlowrate) / 1000;
const ivs7BODLoading = ivs5BODLoading - ivs6BODLoading;

// NO3N Media Calculations

const ivSARRNO3N = ivSALRNO3N * (ivNO3Nremoval * 0.01);
let ivMediaareaNO3N = ivFlowrate * ivNO3Nin / ivSALRNO3N;
ivMediaareaNO3N = Math.round(ivMediaareaNO3N);
ivMediaareaNO3N = ivs2NO3NLoading * 1000 / ivSALRNO3N;
const iv3Mediavolume = ivMediaareaNO3N / ivNO3NSSA;
const iv3tankvol = iv3Mediavolume / (ivMediaFillVolNO3N * 0.01);
const iv3Mediadisplacedvolume = iv3Mediavolume * (1 - (iv3mediavoid * 0.01));
let ivHRTstage3 = 24 * (iv3tankvol - iv3Mediadisplacedvolume) / (ivFlowrate + ivFlowrate * ivIR);
ivHRTstage3 = Math.round(ivHRTstage3 * 100) / 100;


// BOD Media Calculations
const ivSARR = ivSALR * (ivBODremoval * 0.01);
const iv1Mediaarea = ivFlowrate * ivBODin / ivSALR;
const iv1Mediavolume = iv1Mediaarea / ivSSA;
const iv1tankvol = iv1Mediavolume / (ivMediaFillVol * 0.01);
const iv1Mediadisplacedvolume = iv1Mediavolume * (1 - (iv1mediavoid * 0.01));
let ivHRTstage1 = 24 * (iv1tankvol - iv1Mediadisplacedvolume) / (ivFlowrate + ivFlowrate * ivIR);
ivHRTstage1 = Math.round(ivHRTstage1 * 100) / 100;
let ivbh = 0.12 * Math.pow(1.04, ivTemp - 20);
ivbh = Math.round(ivbh * 100) / 100;
let ivbn = 0.17 * Math.pow(1.029, ivTemp - 20);
ivbn = Math.round(ivbn * 100) / 100;

const ivYH = 0.45;
const ivYn = 0.15;
const ivfd = 0.15;

// PXTSS Calculations
let ivpxbio = ivFlowrate * 0.001 * ((ivYH * ivbCODBOD * (ivBODin - ivBODeff) * (1 + ivfd * ivbh * ivSRT)) / (1 + ivbh * ivSRT)) + (ivFlowrate * 0.001 * ivYn * (ivNH4Nin - ivNH4Neff)) / (1 + ivbn * ivSRT);
ivpxbio = Math.round(ivpxbio * 100) / 100;

const ivpxbioHET = ivFlowrate * 0.001 * ((ivYH * ivbCODBOD * (ivBODin - ivBODeff) * (1 + ivfd * ivbh * ivSRT)) / (1 + ivbh * ivSRT));

const ivpxbioAOB = (ivFlowrate * 0.001 * ivYn * (ivNH4Nin - ivNH4Neff)) / (1 + ivbn * ivSRT);


const ivpxvss = ivpxbio + ivFlowrate * (1 / 1000) * ivNBVSS;
const ivpxtss = (ivpxbio / 0.85) + ivFlowrate * (1 / 1000) * ivNBVSS + ivFlowrate * (1 / 1000) * (ivTSSin - ivVSSin);

const ivOTR = (ivs3BODLoading - ivs4BODLoading) * ivbCODBOD - 1.42 * ivpxbio + 4.57 * (ivs2NH4NLoading - ivs5NH4NLoading);

const ivOTRBOD = (ivs3BODLoading - ivs4BODLoading) * ivbCODBOD - 1.42 * ivpxbio;
const ivOTRNH4N = 4.57 * (ivs2NH4NLoading - ivs5NH4NLoading);

const iv1txtTemp = ivTemp;
const iv1txtOUR = ivOTRBOD / 24;

const iv1txtRP = Math.exp(-9.81 * 28.97 * iv1txtelev / (8314 * (iv1txtTemp + 273.15)));
const iv1txtDD = iv1txtLD - iv1txtDDfromBottom;
const iv1txtOCSd = iv1txtOCS * (1 + iv1txtde * (iv1txtDD / 10.33));
const iv1txtSOTR = iv1txtOUR * (1 / (iv1txta * iv1txtf)) * iv1txtOCSd * (1 / (iv1txtb * (iv1txtOCT / iv1txtOCS) * iv1txtRP * iv1txtOCSd - iv1txtDO)) * Math.pow(1.024, 20 - iv1txtTemp);
const iv1txtE = iv1OTEpersubmerged * iv1txtDD;
let iv1txtAF = iv1txtSOTR * (1 / (iv1txtE * 0.01)) * (1 / iv1txtO2) / 60;
iv1txtAF = Math.round(iv1txtAF * 100) / 100;

// Air Flowrate for NH4N Removal
const iv2txtTemp = ivTemp;
const iv2txtOUR = ivOTRNH4N / 24;
const iv2txtRP = Math.exp(-9.81 * 28.97 * iv2txtelev / (8314 * (iv2txtTemp + 273.15)));
const iv2txtDD = iv2txtLD - iv2txtDDfromBottom;
const iv2txtOCSd = iv2txtOCS * (1 + iv2txtde * (iv2txtDD / 10.33));
const iv2txtSOTR = iv2txtOUR * (1 / (iv2txta * iv2txtf)) * iv2txtOCSd * (1 / (iv2txtb * (iv2txtOCT / iv2txtOCS) * iv2txtRP * iv2txtOCSd - iv2txtDO)) * Math.pow(1.024, 20 - iv2txtTemp);
const iv2txtE = iv2OTEpersubmerged * iv2txtDD;
let iv2txtAF = iv2txtSOTR * (1 / (iv2txtE * 0.01)) * (1 / iv2txtO2) / 60;
iv2txtAF = Math.round(iv2txtAF * 100) / 100;

const iv1airreq = iv1txtAF;
const iv2airreq = iv2txtAF;
const ivtxtAFTOT = iv1txtAF + iv2txtAF;
const ivkw = ivkwperm3 * iv3tankvol;


// Alkalinity Calculations
const ivInfAlkalinity = ivAlkalinityin;
const ivAlkalinityProduced = 3.57 * (ivNH4Nin - ivNH4Neff);
const ivAlkalinityUsed = 7.14 * (ivNH4Nin - ivNH4Neff);
const ivAlkalinitytobeAdded = ivResAlkalinity - ivInfAlkalinity + ivAlkalinityUsed;
const ivMassAlkalinity = ivAlkalinitytobeAdded * ivFlowrate / 1000;
const ivNaHCO3 = ivMassAlkalinity * (84 / 50);

// Sludge Flowrate
let ivtxtSludgeflowrate = (ivpxtss / (ivtxtSolidsContent / 100) / 1000) / ivtxtSGSludgeperm3Sludge;
ivtxtSludgeflowrate = Math.round(ivtxtSludgeflowrate * 100) / 100;



//clarifier Sizing

const  ivClarifiersize = (ivFlowrate)/(ivSLR);


//Carbon dosing
const ivRNO3 = ivs2NO3NLoading - ivs3NO3NLoading;
const ivCODdosing = ivCODkgkgNremoved * ivRNO3 - ivrbcod * ivFlowrate * (1 / 1000);
const ivEthdosing = ivEthkgkgNremoved * ivRNO3 - (ivrbcod * ivFlowrate * (1 / 1000) * (1.48 / 3.1));
        // Output results
        const outputFields = {
          
                ivtxtSludgeflowrate,
            iv3Mediadisplacedvolume,
            ivHRTstage3,
            ivHRTstage1,
            ivSARR,
            ivHRTstage1,
            iv1Mediadisplacedvolume,
            iv1tankvol,
            iv1Mediavolume,
            iv1Mediaarea,
            ivBODTKN,
            ivNH4Nflux,
            ivNH4Neff,
            ivNH4Ne,
            ivNH4Nfluxcor,
            ivIR,
            ivs1NH4NLoading,
            ivs2NH4NLoading,
            ivs3NH4NLoading,
            ivs4NH4NLoading,
            ivs5NH4NLoading,
            ivs6NH4NLoading,
            ivs7NH4NLoading,
            ivNH4Nremoval,
            ivSALRNH4N,
            ivMediaareaNH4N,
            iv2Mediavolume,
            iv2tankvol,
            iv2Mediadisplacedvolume,
            ivHRTstage2,
            ivs1NO3NLoading,
            ivs2NO3NLoading,
            ivs3NO3NLoading,
            ivs5NO3NLoading,
            ivs6NO3NLoading,
            ivs7NO3NLoading,
            ivs1BODLoading,
            ivs2BODLoading,
            ivs3BODLoading,
            ivs4BODLoading,
            ivs5BODLoading,
            ivBODeff,
            ivs6BODLoading,
            ivs7BODLoading,
            ivSARRNO3N,
            ivMediaareaNO3N,
            iv3Mediavolume,
            iv3Mediavolume,
            iv3tankvol,
            ivbh,
            ivbn,
            ivYH,
            ivYn,
            ivfd,
            ivpxbio,
            ivpxbioHET,
            ivpxbioAOB,
            ivpxvss,
            ivpxtss,
            ivOTR,
            ivOTRBOD,
            ivOTRNH4N,
            iv1txtTemp,
            iv1txtOUR,
            iv1txtRP,
            iv1txtDD,
            iv1txtOCSd,
            iv1txtSOTR,
            iv1txtE,
            iv1txtAF,
            iv2txtTemp,
            iv2txtOUR,
            iv2txtRP,
            iv1txtDD,
            iv2txtOCSd,
            iv2txtSOTR,
            iv2txtE,
            iv2txtAF,
            iv1airreq,
            iv2airreq,
            ivtxtAFTOT,
            iv2txtDD,
            ivkw,
            ivInfAlkalinity,
            ivAlkalinityProduced,
            ivAlkalinityUsed,
            ivAlkalinitytobeAdded,
            ivMassAlkalinity,
            ivClarifiersize,
            ivRNO3,
            ivCODdosing,
            ivEthdosing,
                ivNaHCO3,






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
      'ivFlowrate': 'ivFlowrate2',
      'ivBODin': 'ivBODin2',
       'ivTemp': 'ivTemp2',

      'ivTKN': 'ivTKN2',
      'ivBODeff': 'ivBODeff2',
      'ivNH4Neff': 'ivNH4Neff2',
      'ivNO3Neff': 'ivNO3Neff2',
      'iv3tankvol': 'iv3tankvol2',
      'iv1tankvol': 'iv1tankvol2',
      'iv2tankvol': 'iv2tankvol2',

      'iv1tankvol': 'iv1tankvol2',
    
      'iv2tankvol': 'iv2tankvol2',
    
      'ivMediaFillVolNO3N': 'ivMediaFillVolNO3N2',
    
      'ivMediaFillVol': 'ivMediaFillVol2',
    
      'ivMediaFillVolNH4N': 'ivMediaFillVolNH4N2',
    
    
      'ivSALRNO3N': 'ivSALRNO3N2',

      'ivSALR': 'ivSALR2',
      'ivSALRNH4N': 'ivSALRNH4N2',
      'ivMediaFillVolNH4N': 'ivMediaFillVolNH4N2',
      'ivNO3Nremoval': 'ivNO3Nremoval2',
      'ivBODremoval': 'ivBODremoval2',
      'ivNH4Nremoval': 'ivNH4Nremoval2',



  'ivNO3NSSA': 'ivNO3NSSA2',
      'ivSSA': 'ivSSA2',
      'ivNH4NSSA': 'ivNH4NSSA2',


      

      'iv1txtDO': 'iv1txtDO2',
      'iv2txtDO': 'iv2txtDO2',
   


        'ivOTRBOD': 'ivOTRBOD2',
      'ivOTRNH4N': 'ivOTRNH4N2',
   

        'iv1txtLD': 'iv1txtLD2',
      'iv2txtLD': 'iv2txtLD2',


      'iv1txtE': 'iv1txtE2',
      'iv2txtE': 'iv2txtE2',



            
      'iv1txtAF': 'iv1txtAF2',
      'iv2txtAF': 'iv2txtAF2',

      'ivkw': 'ivkw2',

      'ivClarifiersize': 'ivClarifiersize2',
            
      'ivEthdosing': 'ivEthdosing2',

      'ivNaHCO3': 'ivNaHCO32',

      'ivResAlkalinity': 'ivResAlkalinity2',

     'ivtxtSludgeflowrate': 'ivtxtSludgeflowrate2',

      'ivSRT': 'ivSRT2',

      'ivIR': 'ivIR2',



    
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