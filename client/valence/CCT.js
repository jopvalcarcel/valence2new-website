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
      'txtflowrate6': 4000,
      'txtdsnfqty': 2,
      'txtrt6': 90,
      'txtpk': 2,
      'txtw6': 2,
      'txtwl6': 3,
      'txtvisc': 0.0000008,
      'txtl6a': 41.9,
      'txtwb': 0.15,
      'txtnt': 3
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
      const txtflowrate6 = getValue('txtflowrate6');
      const txtdsnfqty = getValue('txtdsnfqty');
      const txtrt6 = getValue('txtrt6');
      const txtpk = getValue('txtpk');
      const txtw6 = getValue('txtw6');
      const txtwl6 = getValue('txtwl6');
      const txtvisc = getValue('txtvisc');
      const txtl6a = getValue('txtl6a');
      const txtwb = getValue('txtwb');
      const txtnt = getValue('txtnt');

      // Perform all calculations
      const txtl6 = txtpk * txtflowrate6 * (1 / txtdsnfqty) * (1 / 1440) * txtrt6 * (1 / txtw6) * (1 / txtwl6);
      let txtv = txtpk * txtflowrate6 * (1 / txtdsnfqty) * (1 / 1440) * (1 / txtw6) * (1 / txtwl6) * (1 / 60);
      txtv = parseFloat(txtv.toFixed(5));
      
      const txtR = (txtw6 * txtwl6) / (2 * txtwl6 + txtw6);
      const txtnr = 4 * txtv * txtR / txtvisc;
      
      let txtcd = 1.01 * txtvisc * Math.pow(txtnr, 0.875);
      txtcd = parseFloat(txtcd.toFixed(5));
      
      let txtdn = txtcd * txtrt6 * 60 / Math.pow(txtl6, 2);
      txtdn = parseFloat(txtdn.toFixed(5));
      
      let txtva = txtpk * txtflowrate6 * (1 / txtdsnfqty) * (1 / 1440) * (1 / txtw6) * (1 / txtwl6) * (1 / 60);
      txtva = parseFloat(txtva.toFixed(5));
      
      const txtRa = (txtw6 * txtwl6) / (2 * txtwl6 + txtw6);
      const txtnra = 4 * txtva * txtRa / txtvisc;
      
      let txtcda = 1.01 * txtvisc * Math.pow(txtnra, 0.875);
      txtcda = parseFloat(txtcda.toFixed(5));
      
      let txtdna = txtcda * txtrt6 * 60 / Math.pow(txtl6a, 2);
      txtdna = parseFloat(txtdna.toFixed(5));
      
      const txttw = txtw6 * txtnt + (1 - txtw6) * txtwb;
      let txttl = txtw6 + txtl6a / txtnt;
      txttl = parseFloat(txttl.toFixed(2));
      
      const txtvolume6 = txttw * txttl * txtwl6;
      const txtcctLP = txttl - txtw6;

      // Prepare all output values
      const outputFields = {
        txtl6: txtl6,
        txtv: txtv,
        txtR: txtR,
        txtnr: txtnr,
        txtcd: txtcd,
        txtdn: txtdn,
        txtva: txtva,
        txtRa: txtRa,
        txtnra: txtnra,
        txtcda: txtcda,
        txtdna: txtdna,
        txttw: txttw,
        txttl: txttl,
        txtvolume6: txtvolume6,
        txtcctLP: txtcctLP
      };

      // Update DOM with results
      for (const [id, value] of Object.entries(outputFields)) {
        const el = document.getElementById(id);
        if (el) {
          // Use appropriate decimal places
          if (['txtl6', 'txtv', 'txtR', 'txtnr', 'txtcd', 'txtdn', 
              'txtva', 'txtRa', 'txtnra', 'txtcda', 'txtdna'].includes(id)) {
            el.value = value.toFixed(5);
          } else {
            el.value = value.toFixed(2);
          }
        } else {
          console.warn(`Output element ${id} not found`);
          document.getElementById('results').innerHTML += 
            `<div class="result">${id}: ${value}</div>`;
        }
      }

    } catch (error) {
      console.error("Calculation error:", error);
      document.getElementById('results').innerHTML = `
        <div class="error">Error in calculations: ${error.message}</div>
      `;
    }
  }

  // Initialize event listeners when DOM is loaded
  document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('calculate-btn').addEventListener('click', calculate);
    document.getElementById('reset-btn').addEventListener('click', resetForm);
    document.getElementById('example-btn').addEventListener('click', fillExample);
  });


      // Visualization functions
      function drawTank() {
        // Get input values
        const pathwidth = parseFloat(document.getElementById('visPathwidth').value);
        const numberofpartitions = parseInt(document.getElementById('visPartitions').value);
        const partitionwidth = parseFloat(document.getElementById('visPartitionwidth').value);
        const totalflowpath = parseFloat(document.getElementById('visTotalflowpath').value);
        
        // Calculate overall dimensions
        const OW = (pathwidth * numberofpartitions) + ((numberofpartitions - 1) * partitionwidth);
        const OL = pathwidth + (totalflowpath / numberofpartitions);
        
        // Get canvas and context
        const canvas = document.getElementById('tankCanvas');
        const ctx = canvas.getContext('2d');
        
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Calculate scaling factors to fit the drawing
        const scaleX = (canvas.width * 0.8) / OL;
        const scaleY = (canvas.height * 0.8) / OW;
        const scale = Math.min(scaleX, scaleY);
        
        // Calculate offset to center the drawing
        const offsetX = (canvas.width - (OL * scale)) / 2;
        const offsetY = (canvas.height - (OW * scale)) / 2;
        
        // Function to convert coordinates to canvas position
        function toCanvasX(x) {
          return offsetX + x * scale;
        }
        
        function toCanvasY(y) {
          return offsetY + y * scale;
        }
        
        // Draw the main tank rectangle
        ctx.beginPath();
        ctx.rect(toCanvasX(0), toCanvasY(0), OL * scale, OW * scale);
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'black';
        ctx.stroke();
        
        // Draw partitions
        ctx.fillStyle = 'rgba(173, 216, 230, 0.5)'; // light blue with transparency
        ctx.strokeStyle = 'blue';
        ctx.lineWidth = 1;
        
        for (let i = 0; i < numberofpartitions; i++) {
          const yPos = i * (pathwidth + partitionwidth);
          
          if (i % 2 === 0) {
            // Start from left, leave gap on right
            ctx.beginPath();
            ctx.rect(
              toCanvasX(0), 
              toCanvasY(yPos), 
              (OL - pathwidth) * scale, 
              partitionwidth * scale
            );
          } else {
            // Start from right (pathwidth gap on left)
            ctx.beginPath();
            ctx.rect(
              toCanvasX(pathwidth), 
              toCanvasY(yPos), 
              (OL - pathwidth) * scale, 
              partitionwidth * scale
            );
          }
          ctx.fill();
          ctx.stroke();
        }
        
        // Draw dimensions
        ctx.fillStyle = 'black';
        ctx.font = '14px Arial';
        
        // Overall length
        ctx.fillText(`Overall Length: ${OL.toFixed(2)}m`, 
                    toCanvasX(OL/2) - 70, 
                    toCanvasY(OW) + 25);
        
        // Overall width
        ctx.save();
        ctx.translate(toCanvasX(OL) + 20, toCanvasY(OW/2));
        ctx.rotate(Math.PI/2);
        ctx.fillText(`Overall Width: ${OW.toFixed(2)}m`, 0, 0);
        ctx.restore();
      }
      
      // Draw the initial tank when page loads
      window.onload = function() {
        drawTank();
        // You can add your other initialization code here
      };

      
  // Function to generate the report
  function generateReport() {
    try {
      // Recalculate tank dimensions
  const txtflowrate6 = getValue('txtflowrate6');
  const txtdsnfqty = getValue('txtdsnfqty');
  const txtrt6 = getValue('txtrt6');
  const txtwl6 = getValue('txtwl6');
  const txtw6 = getValue('txtw6');
  const txtl6a = getValue('txtl6a');
  const txtnt = getValue('txtnt');
  const txtwb = getValue('txtwb');

  // Recalculate dimensions
  const txttw = txtw6 * txtnt + (1 - txtw6) * txtwb;
  const txttl = parseFloat((txtw6 + txtl6a / txtnt).toFixed(2));

  const dimensionString = `${txttl.toFixed(2)}m × ${txttw.toFixed(2)}m × ${txtwl6.toFixed(2)}m`;

      // Set dimensions string directly
      const dimensionField = document.getElementById('txtTankDimensions2');
      if (dimensionField) {
        dimensionField.value = dimensionString;
      } else {
        console.warn("txtTankDimensions2 not found in the DOM");
      }

      // Map and copy other fields
      const valueMap = {
        'txtflowrate6': 'txtflowrate7',
        'txtdsnfqty': 'txtdsnfqty2',
        'txtwl6': 'txtwl7',
        'txtrt6': 'txtrt7',


      };

      for (const [sourceId, targetId] of Object.entries(valueMap)) {
        const source = document.getElementById(sourceId);
        const target = document.getElementById(targetId);
        if (source && target) {
          target.value = source.value;
        }
      }

      // Show the report
      const reportEl = document.getElementById('reportSection');
      if (reportEl) {
        reportEl.style.display = 'block';
        reportEl.scrollIntoView({ behavior: 'smooth' });
      }

    } catch (error) {
      console.error("Error generating report:", error);
    }
  }


  // Function to print the report
  function printReport() {
    // First update the report
    generateReport();

    // Create a clone of the report section
    const reportClone = document.getElementById('reportSection').cloneNode(true);
    
    // Remove elements we don't want in print
    const elementsToRemove = [
      reportClone.querySelector('.print-button'),
      reportClone.querySelector('.project-info')
    ];
    
    elementsToRemove.forEach(element => {
      if (element) element.remove();
    });

    // Replace inputs with spans for printing
    const readonlyInputs = reportClone.querySelectorAll('input[readonly]');
    readonlyInputs.forEach(input => {
      const span = document.createElement('span');
      span.textContent = input.value;
      span.style.display = 'inline-block';
      span.style.width = '100%';
      span.style.padding = '5px';
      span.style.textAlign = 'center';
      input.parentNode.replaceChild(span, input);
    });

    // Get project details
    const projectName = document.getElementById('projectName').value || 'Unnamed Project';
    const projectNumber = document.getElementById('projectNumber').value || 'N/A';
    const projectDate = document.getElementById('projectDate').value || new Date().toISOString().substr(0, 10);
    const projectVersion = document.getElementById('projectVersion').value || '1.0';

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

  // Initialize event listeners when DOM is loaded
  document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('calculate-btn').addEventListener('click', calculate);
    document.getElementById('reset-btn').addEventListener('click', resetForm);
    document.getElementById('example-btn').addEventListener('click', fillExample);
  });