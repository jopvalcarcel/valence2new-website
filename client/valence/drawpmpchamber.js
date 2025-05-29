document.addEventListener('DOMContentLoaded', function () {
    // ==================== TANK VISUALIZATION ====================
    const tankCanvas = document.getElementById('tankCanvas');
    const tankCtx = tankCanvas.getContext('2d');
    const drawTankBtn = document.getElementById('draw-tank-btn'); // Changed ID
    const volumeDisplay = document.getElementById('volume');
    const areaDisplay = document.getElementById('area');
    const cylindricalInputs = document.getElementById('cylindrical-inputs');

    // Tank Visualization Functions
    function resizeTankCanvas() {
        const container = document.querySelector('.canvas-container');
        tankCanvas.width = Math.min(container.clientWidth, 800);
        tankCanvas.height = Math.min(container.clientWidth * 0.6, 500);
        drawTank();
    }

    function updateTankCalculations() {
        const diameter = parseInt(document.getElementById('diameter').value) || 0;
        const depth = parseInt(document.getElementById('cyl-depth').value) || 0;
        const radius = diameter / 2;
        const area = Math.PI * radius * radius;
        const volume = area * depth;

        areaDisplay.textContent = Math.round(area).toLocaleString();
        volumeDisplay.textContent = Math.round(volume).toLocaleString();
        return { area, volume };
    }

    function drawTank() {
        tankCtx.clearRect(0, 0, tankCanvas.width, tankCanvas.height);
        drawCylindricalTank();
    }

    function drawCylindricalTank() {
        const diameter = parseInt(document.getElementById('diameter').value) || 60;
        const depth = parseInt(document.getElementById('cyl-depth').value) || 40;
        const radius = diameter / 2;

        updateTankCalculations();

        const maxDimension = Math.max(diameter * 2, depth * 2);
        const scale = Math.min(tankCanvas.width, tankCanvas.height) / (maxDimension * 1.5);
        const centerX = tankCanvas.width / 2;
        const centerY = tankCanvas.height / 2 + 50;

        const angle = Math.PI / 6;
        const cosAngle = Math.cos(angle);
        const sinAngle = Math.sin(angle);

        function project(x, y, z) {
            const isoX = (x - z) * cosAngle;
            const isoY = y + (x + z) * sinAngle;
            return {
                x: centerX + isoX * scale,
                y: centerY - isoY * scale
            };
        }

        tankCtx.strokeStyle = '#333';
        tankCtx.lineWidth = 2;
        const segments = 36;

        // Draw top ellipse
        tankCtx.beginPath();
        for (let i = 0; i <= segments; i++) {
            const theta = (i / segments) * Math.PI * 2;
            const x = Math.cos(theta) * radius;
            const z = Math.sin(theta) * radius;
            const y = depth / 2;
            const point = project(x, y, z);
            i === 0 ? tankCtx.moveTo(point.x, point.y) : tankCtx.lineTo(point.x, point.y);
        }
        tankCtx.stroke();

        // Draw bottom ellipse
        tankCtx.beginPath();
        for (let i = 0; i <= segments; i++) {
            const theta = (i / segments) * Math.PI * 2;
            const x = Math.cos(theta) * radius;
            const z = Math.sin(theta) * radius;
            const y = -depth / 2;
            const point = project(x, y, z);
            i === 0 ? tankCtx.moveTo(point.x, point.y) : tankCtx.lineTo(point.x, point.y);
        }
        tankCtx.stroke();

        // Draw vertical edges
        for (let i = 0; i < segments; i += segments / 4) {
            const theta = (i / segments) * Math.PI * 2;
            const x = Math.cos(theta) * radius;
            const z = Math.sin(theta) * radius;

            const topPoint = project(x, depth / 2, z);
            const bottomPoint = project(x, -depth / 2, z);

            tankCtx.beginPath();
            tankCtx.moveTo(topPoint.x, topPoint.y);
            tankCtx.lineTo(bottomPoint.x, bottomPoint.y);
            tankCtx.stroke();
        }

        // Draw filled side view
        tankCtx.fillStyle = 'rgba(100, 150, 255, 0.3)';
        tankCtx.beginPath();
        for (let i = 0; i <= segments / 2; i++) {
            const theta = (i / segments) * Math.PI * 2;
            const x = Math.cos(theta) * radius;
            const z = Math.sin(theta) * radius;
            const y = depth / 2;
            const point = project(x, y, z);
            i === 0 ? tankCtx.moveTo(point.x, point.y) : tankCtx.lineTo(point.x, point.y);
        }
        for (let i = segments / 2; i >= 0; i--) {
            const theta = (i / segments) * Math.PI * 2;
            const x = Math.cos(theta) * radius;
            const z = Math.sin(theta) * radius;
            const y = -depth / 2;
            const point = project(x, y, z);
            tankCtx.lineTo(point.x, point.y);
        }
        tankCtx.closePath();
        tankCtx.fill();
        tankCtx.stroke();

        // Labels
        tankCtx.fillStyle = '#333';
        tankCtx.font = '14px Arial';
        tankCtx.textAlign = 'center';

        const diameterLabelPos = project(0, -depth / 2 - 10, 0);
        tankCtx.fillText(`Diameter: ${diameter}`, diameterLabelPos.x, diameterLabelPos.y);

        const depthLabelPos = project(-radius - 15, 0, -radius - 10);
        tankCtx.fillText(`Depth: ${depth}`, depthLabelPos.x, depthLabelPos.y);
    }

    // ==================== PLAN VISUALIZATION ====================
    const planCanvas = document.getElementById('planCanvas');
    const planCtx = planCanvas.getContext('2d');
    const drawPlanBtn = document.getElementById('draw-plan-btn'); // Changed ID
    const pumpSpacingInput = document.getElementById('pump-spacing');
    const pumpToEdgeInput = document.getElementById('pump-to-edge');

    function resizePlanCanvas() {
        const container = document.querySelector('.form-container');
        planCanvas.width = container.clientWidth - 40;
        planCanvas.height = 500;
    }

    function drawPlan() {
        const diameter = parseFloat(document.getElementById('circle-diameter').value) || 1.3;
        const rectLength = parseFloat(document.getElementById('rect-length').value) || 0.9;
        const rectWidth = parseFloat(document.getElementById('rect-width').value) || 0.6;
        const pumpLength = parseFloat(document.getElementById('pump-length').value) || 0.3;
        const pumpWidth = parseFloat(document.getElementById('pump-width').value) || 0.3;
        const numPumps = parseInt(document.getElementById('num-pumps').value) || 2;

        // Calculate distances
        const spacing = numPumps > 1 ? (rectLength - numPumps * pumpLength) / (numPumps + 1) : 0;
        const pumpToEdge = (diameter - rectLength) / 2;

        // Update readonly inputs
        pumpSpacingInput.value = numPumps > 1 ? spacing.toFixed(2) : 'N/A';
        pumpToEdgeInput.value = pumpToEdge.toFixed(2);

        planCtx.clearRect(0, 0, planCanvas.width, planCanvas.height);

        // Calculate scale to fit entire circle with padding
        const padding = 50;
        const scale = Math.min(
            (planCanvas.width - padding * 2) / diameter,
            (planCanvas.height - padding * 2) / diameter
        );
        const centerX = planCanvas.width / 2;
        const centerY = planCanvas.height / 2;
        const radius = (diameter / 2) * scale;

        // Draw Grid
        const gridStep = 0.1 * scale;
        planCtx.beginPath();
        planCtx.strokeStyle = '#e0e0e0';
        planCtx.lineWidth = 0.5;
        for (let x = centerX - radius; x <= centerX + radius; x += gridStep) {
            planCtx.moveTo(x, centerY - radius);
            planCtx.lineTo(x, centerY + radius);
        }
        for (let y = centerY - radius; y <= centerY + radius; y += gridStep) {
            planCtx.moveTo(centerX - radius, y);
            planCtx.lineTo(centerX + radius, y);
        }
        planCtx.stroke();

        // Draw Axes
        planCtx.beginPath();
        planCtx.strokeStyle = '#000000';
        planCtx.lineWidth = 1;
        planCtx.moveTo(centerX - radius, centerY);
        planCtx.lineTo(centerX + radius, centerY);
        planCtx.moveTo(centerX, centerY - radius);
        planCtx.lineTo(centerX, centerY + radius);
        planCtx.stroke();

        // Draw Axis Labels
        planCtx.font = '12px Arial';
        planCtx.fillStyle = '#000000';
        planCtx.textAlign = 'center';
        planCtx.textBaseline = 'top';
        for (let x = -diameter / 2; x <= diameter / 2; x += 0.1) {
            const canvasX = centerX + x * scale;
            planCtx.fillText(x.toFixed(1), canvasX, centerY + 5);
        }
        planCtx.textAlign = 'right';
        planCtx.textBaseline = 'middle';
        for (let y = -diameter / 2; y <= diameter / 2; y += 0.1) {
            const canvasY = centerY - y * scale;
            planCtx.fillText(y.toFixed(1), centerX - 5, canvasY);
        }

        // Draw Circle
        planCtx.beginPath();
        planCtx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        planCtx.strokeStyle = '#0077cc';
        planCtx.lineWidth = 2;
        planCtx.stroke();

        // Draw Rectangle
        const rectScaledLength = rectLength * scale;
        const rectScaledWidth = rectWidth * scale;
        const rectLeft = centerX - rectScaledLength / 2;
        const rectTop = centerY - rectScaledWidth / 2;
        planCtx.beginPath();
        planCtx.rect(rectLeft, rectTop, rectScaledLength, rectScaledWidth);
        planCtx.strokeStyle = '#cc3300';
        planCtx.lineWidth = 2;
        planCtx.stroke();

        // Draw Pumps
        const pumpScaledLength = pumpLength * scale;
        const pumpScaledWidth = pumpWidth * scale;
        const spacingScaled = spacing * scale;

        for (let i = 0; i < numPumps; i++) {
            const pumpX = rectLeft + spacingScaled * (i + 1) + pumpScaledLength * i;
            const pumpY = centerY - pumpScaledWidth / 2;
            planCtx.beginPath();
            planCtx.rect(pumpX, pumpY, pumpScaledLength, pumpScaledWidth);
            planCtx.fillStyle = 'rgba(0, 150, 0, 0.5)';
            planCtx.fill();
            planCtx.strokeStyle = '#006600';
            planCtx.stroke();
        }
    }

    // ==================== INITIALIZATION ====================
    // Tank Visualization Setup
    cylindricalInputs.style.display = 'flex';
    updateTankCalculations();
    resizeTankCanvas();
    window.addEventListener('resize', resizeTankCanvas);
    drawTankBtn.addEventListener('click', drawTank);
    document.getElementById('diameter').addEventListener('input', updateTankCalculations);
    document.getElementById('cyl-depth').addEventListener('input', updateTankCalculations);

    // Plan Visualization Setup
    resizePlanCanvas();
    drawPlan();
    drawPlanBtn.addEventListener('click', () => {
        resizePlanCanvas();
        drawPlan();
    });
    window.addEventListener('resize', () => {
        resizePlanCanvas();
        drawPlan();
    });
});