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
    'txtFBFlowrate': 1000,
    'txtFBBODin': 700,
    'txtBODout': 30,
    'txtNH4Nin': 50,
    'txtNH4Nout': 4,
    'txtFBWL': 4,
    'txtFBDDH': 0.4,
    'txtFBAOTRBOD': 1,
    'txtFBOTESub': (2 / 100) * 3.21,
    'txtFBOTESubNH4N': (2 / 100) * 3.21,
    'txtOUR': 36.73,
    'txtTemp': 12,
    'txtelev': 500,
    'txtLD': 4.94,
    'txtDDfromBottom': 0.4,
    'txtde': 0.4,
    'txtOCS': 9.09,
    'txtOCT': 10.78,
    'txta': 0.5,
    'txtb': 0.95,
    'txtf': 0.9,
    'txtDO': 2,
    'txtDA': 1.1633,
    'txtO2': 0.27,
    'txtE': 0.35,
    'txtqtyblower': 1
  };

  for (const [id, value] of Object.entries(exampleValues)) {
    const element = document.getElementById(id);
    if (element) {
      element.value = value;
    }
  }
}

// Main calculation function
function calculate() {
  try {
    // Get all input values
    const inputs = {
      txtFBBODin: getValue('txtFBBODin'),
      txtBODout: getValue('txtBODout'),
      txtNH4Nin: getValue('txtNH4Nin'),
      txtNH4Nout: getValue('txtNH4Nout'),
      txtFBWL: getValue('txtFBWL'),
      txtFBDDH: getValue('txtFBDDH'),
      txtFBAOTRBOD: getValue('txtFBAOTRBOD'),
      txtFBOTESub: getValue('txtFBOTESub'),
      txtFBOTESubNH4N: getValue('txtFBOTESubNH4N'),
      txtOUR: getValue('txtOUR'),
      txtTemp: getValue('txtTemp'),
      txtelev: getValue('txtelev'),
      txtLD: getValue('txtLD'),
      txtDDfromBottom: getValue('txtDDfromBottom'),
      txtde: getValue('txtde'),
      txtOCS: getValue('txtOCS'),
      txtOCT: getValue('txtOCT'),
      txta: getValue('txta'),
      txtb: getValue('txtb'),
      txtf: getValue('txtf'),
      txtDO: getValue('txtDO'),
      txtDA: getValue('txtDA'),
      txtO2: getValue('txtO2'),
      txtE: getValue('txtE'),
      txtqtyblower: getValue('txtqtyblower'),
      txtFBFlowrate: getValue('txtFBFlowrate')
    };

    // Calculate water level difference
    const txtDDWL = inputs.txtFBWL - inputs.txtFBDDH;

    // BOD Oxygen Transfer Rate calculations
    const txtFBAOTR = inputs.txtFBAOTRBOD * inputs.txtFBFlowrate * (inputs.txtFBBODin - inputs.txtBODout) / 1000;
    const txtFBSOTR = txtFBAOTR / 0.5;
    const txtFBSOTRmin = txtFBSOTR / 1440;
    const txtFBOTE = inputs.txtFBOTESub * txtDDWL;
    const txtFBSCFMBOD = txtFBSOTRmin / (1.16 * 0.23 * txtFBOTE);

    const txtFBAOTRNH4NRATIO = 4.6;
    const txtFBAOTRNH4N = txtFBAOTRNH4NRATIO * inputs.txtFBFlowrate * (inputs.txtNH4Nin - inputs.txtNH4Nout) / 1000;
    const txtFBSOTRNH4N = txtFBAOTRNH4N / 0.5;
    const txtFBSOTRNH4Nmin = txtFBSOTRNH4N / 1440;
    const txtFBOTENH4N = inputs.txtFBOTESubNH4N * txtDDWL;
    const txtFBSCFMNH4N = txtFBSOTRNH4Nmin / (1.16 * 0.23 * txtFBOTENH4N);

    const txtFBTotalAOTR = Math.round(txtFBAOTR * 100) / 100 + Math.round(txtFBAOTRNH4N * 100) / 100;
    const txtFBTotalSOTR = txtFBTotalAOTR / 24;
    const txtFBSCFMTOTAL = Math.round(txtFBSCFMBOD * 100) / 100 + Math.round(txtFBSCFMNH4N * 100) / 100;

    // Detailed Blower Calculations
    const txtRP = Math.exp((-9.81) * 28.97 * (inputs.txtelev - 0) / (8314 * (inputs.txtTemp + 273.15)));
    const txtDD = inputs.txtLD - inputs.txtDDfromBottom;
    const txtOCSd = inputs.txtOCS * (1 + inputs.txtde * (txtDD / 10.33));

    const ECoarseDiffuser = 2.4 * txtDD / 100;
    const EFineDiffuser = 6.4 * txtDD / 100;

    const txtSOTR = inputs.txtOUR * (1 / (inputs.txta * inputs.txtf)) * txtOCSd * 
                   (1 / (inputs.txtb * (inputs.txtOCT / inputs.txtOCS) * txtRP * txtOCSd - inputs.txtDO)) * 
                   Math.pow(1.024, (20 - inputs.txtTemp));

    const txtAF = txtSOTR * (1 / inputs.txtE) * (1 / inputs.txtO2) * (1 / 60);
    const txtafpb = txtAF / inputs.txtqtyblower;

    // Prepare output values
    const outputFields = {
      txtFBAOTR,
      txtFBOTE,
      txtFBSOTR,
      txtFBSCFMBOD,
      txtDDWL,
      txtFBSOTRmin,
      txtFBAOTRNH4NRATIO,
      txtFBAOTRNH4N,
      txtFBSOTRNH4N,
      txtFBSOTRNH4Nmin,
      txtFBOTENH4N,
      txtFBSCFMNH4N,
      txtFBTotalAOTR,
      txtFBTotalSOTR,
      txtFBSCFMTOTAL,
      txtRP,
      txtDD,
      txtOCSd,
      txtSOTR,
      txtAF,
      ECoarseDiffuser,
      EFineDiffuser,
      txtafpb
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