document.addEventListener('DOMContentLoaded', function() {
    const calculateBtn = document.getElementById('calculateBtn');
    const diffuserTypeSelect = document.getElementById('diffuserType');
    
    // Toggle input fields based on diffuser type
    diffuserTypeSelect.addEventListener('change', function() {
        const isCircular = this.value === 'circular';
        document.querySelectorAll('.diffuser-circular').forEach(el => {
            el.style.display = isCircular ? 'block' : 'none';
        });
        document.querySelectorAll('.diffuser-tubular').forEach(el => {
            el.style.display = isCircular ? 'none' : 'block';
        });
    });
    
    calculateBtn.addEventListener('click', calculateLayout);
    
    // Initial calculation and input field setup on page load
    calculateLayout();
    diffuserTypeSelect.dispatchEvent(new Event('change'));
});

function calculateLayout() {
    // Get input values
    const tankLength_m = parseFloat(document.getElementById('tankLength').value);
    const tankWidth_m = parseFloat(document.getElementById('tankWidth').value);
    const diffuserType = document.getElementById('diffuserType').value;
    const diffuserDiameter = parseFloat(document.getElementById('diffuserDiameter').value); // mm
    const diffuserLength = parseFloat(document.getElementById('diffuserLength').value); // mm
    const diffuserWidth = parseFloat(document.getElementById('diffuserWidth').value); // mm
    const diffuserCount = parseInt(document.getElementById('diffuserCount').value);
    const spacing = parseFloat(document.getElementById('spacing').value); // mm

    // Convert tank dimensions from meters to millimeters
    const tankLength = tankLength_m * 1000;
    const tankWidth = tankWidth_m * 1000;

    // Validate inputs
    if (isNaN(tankLength) || isNaN(tankWidth) || isNaN(diffuserCount) || isNaN(spacing)) {
        alert('Please enter valid numbers for all fields');
        return;
    }
    
    if (diffuserType === 'circular' && (isNaN(diffuserDiameter) || diffuserDiameter <= 0)) {
        alert('Please enter a valid positive diffuser diameter');
        return;
    }
    
    if (diffuserType === 'tubular' && (isNaN(diffuserLength) || isNaN(diffuserWidth) || diffuserLength <= 0 || diffuserWidth <= 0)) {
        alert('Please enter valid positive diffuser dimensions');
        return;
    }
    
    if (tankLength <= 0 || tankWidth <= 0) {
        alert('Tank dimensions must be positive numbers');
        return;
    }
    
    if (diffuserCount <= 0) {
        alert('Number of diffusers must be at least 1');
        return;
    }
    
    // Use the larger dimension for layout calculations (similar to diameter for circular)
    const effectiveSize = diffuserType === 'circular' ? diffuserDiameter : Math.max(diffuserLength, diffuserWidth);
    
    // Calculate maximum possible diffusers that can fit
    const maxPerRow = Math.floor((tankLength + spacing) / (effectiveSize + spacing));
    const maxPerCol = Math.floor((tankWidth + spacing) / (effectiveSize + spacing));
    const maxDiffusers = maxPerRow * maxPerCol;
    
    // Calculate actual layout
    const actualPerRow = Math.min(maxPerRow, diffuserCount);
    const actualRows = Math.ceil(diffuserCount / actualPerRow);
    
    // Check if all diffusers fit
    const allFit = diffuserCount <= maxDiffusers;
    
    // Display results
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <h3>Layout Results</h3>
        <p><strong>Diffuser Type:</strong> ${diffuserType === 'circular' ? 'Circular' : 'Tubular'}</p>
        <p><strong>Maximum diffusers that can fit:</strong> ${maxDiffusers}</p>
        <p><strong>Your configuration:</strong> ${diffuserCount} diffusers</p>
        <p><strong>Fit status:</strong> <span style="color: ${allFit ? 'green' : 'red'}; font-weight: bold;">
            ${allFit ? 'All diffusers fit!' : 'Diffusers DO NOT fit!'}
        </span></p>
        <p><strong>Layout:</strong> ${actualPerRow} diffusers per row × ${actualRows} rows</p>
        <p><strong>Total spacing used:</strong> ${(actualPerRow - 1) * spacing}mm (length) × ${(actualRows - 1) * spacing}mm (width)</p>
    `;
    
    // Visualize the tank and diffusers
    visualizeTank(tankLength, tankWidth, diffuserType, diffuserDiameter, diffuserLength, diffuserWidth, diffuserCount, spacing);
}

function visualizeTank(tankLength, tankWidth, diffuserType, diffuserDiameter, diffuserLength, diffuserWidth, diffuserCount, spacing) {
    const visualization = document.getElementById('tankVisualization');
    visualization.innerHTML = '';

    const scaleFactor = calculateScaleFactor(tankLength, tankWidth, visualization);
    const displayLength = tankLength * scaleFactor;
    const displayWidth = tankWidth * scaleFactor;
    const displaySize = diffuserType === 'circular' ? diffuserDiameter * scaleFactor : Math.max(diffuserLength, diffuserWidth) * scaleFactor;
    const displayDiffuserLength = diffuserType === 'circular' ? diffuserDiameter * scaleFactor : diffuserLength * scaleFactor;
    const displayDiffuserWidth = diffuserType === 'circular' ? diffuserDiameter * scaleFactor : diffuserWidth * scaleFactor;
    const displaySpacing = spacing * scaleFactor;

    visualization.style.width = `${displayLength}px`;
    visualization.style.height = `${displayWidth}px`;

    // Set margin to avoid touching edges
    const margin = displaySize / 2 + displaySpacing / 2;
    const usableWidth = displayLength - 2 * margin;
    const usableHeight = displayWidth - 2 * margin;

    const maxPerRow = Math.floor((usableWidth + displaySpacing) / (displaySize + displaySpacing));
    const maxRows = Math.floor((usableHeight + displaySpacing) / (displaySize + displaySpacing));

    const actualPerRow = Math.min(maxPerRow, diffuserCount);
    const actualRows = Math.ceil(diffuserCount / actualPerRow);

    for (let i = 0; i < diffuserCount; i++) {
        const row = Math.floor(i / actualPerRow);
        const col = i % actualPerRow;

        const x = margin + col * (displaySize + displaySpacing);
        const y = margin + row * (displaySize + displaySpacing);

        const fits = (x + displayDiffuserLength <= displayLength) && (y + displayDiffuserWidth <= displayWidth);

        const diffuser = document.createElement('div');
        diffuser.className = `diffuser ${diffuserType}`;
        diffuser.style.width = `${displayDiffuserLength}px`;
        diffuser.style.height = `${displayDiffuserWidth}px`;
        diffuser.style.left = `${x}px`;
        diffuser.style.top = `${y}px`;
        diffuser.style.backgroundColor = fits ? 'rgba(0, 150, 255, 0.7)' : 'rgba(255, 0, 0, 0.7)';
        diffuser.title = `Diffuser ${i + 1} - ${fits ? 'Fits' : 'Does not fit'}`;
        diffuser.textContent = i + 1;

        visualization.appendChild(diffuser);
    }
}

function calculateScaleFactor(tankLength, tankWidth, container) {
    // Get container dimensions (subtracting padding)
    const containerWidth = container.clientWidth - 20;
    const containerHeight = 300; // Fixed height for visualization
    
    // Calculate scale factors for both dimensions
    const widthScale = containerWidth / tankLength;
    const heightScale = containerHeight / tankWidth;
    
    // Use the smaller scale factor to ensure everything fits
    return Math.min(widthScale, heightScale);
}