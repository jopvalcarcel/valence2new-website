document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const planView = document.getElementById('planView');
    const areaWidthInput = document.getElementById('areaWidth');
    const areaHeightInput = document.getElementById('areaHeight');
    const tankShapeSelect = document.getElementById('tankShape');
    const rectangleDimensions = document.getElementById('rectangleDimensions');
    const circleDimensions = document.getElementById('circleDimensions');
    const tankWidthInput = document.getElementById('tankWidth');
    const tankHeightInput = document.getElementById('tankHeight');
    const tankDiameterInput = document.getElementById('tankDiameter');
    const tankLabelInput = document.getElementById('tankLabel');
    const rotationAngleInput = document.getElementById('rotationAngle');
    const updateAreaBtn = document.getElementById('updateArea');
    const addTankBtn = document.getElementById('addTank');
    const clearAllBtn = document.getElementById('clearAll');
    const copyTankBtn = document.getElementById('copyTank');
    const pasteTankBtn = document.getElementById('pasteTank');
    const deleteTankBtn = document.getElementById('deleteTank');
    const savePdfBtn = document.getElementById('savePdf');
    const totalAreaSpan = document.getElementById('totalArea');
    const usedAreaSpan = document.getElementById('usedArea');
    const availableAreaSpan = document.getElementById('availableArea');
    const tankCountSpan = document.getElementById('tankCount');
    const modal = document.getElementById('editLabelModal');
    const closeModal = document.querySelector('.close');
    const editLabelInput = document.getElementById('editLabelInput');
    const saveLabelBtn = document.getElementById('saveLabelBtn');

    // Variables
    let areaWidth = parseInt(areaWidthInput.value);
    let areaHeight = parseInt(areaHeightInput.value);
    let tankWidth = parseInt(tankWidthInput.value);
    let tankHeight = parseInt(tankHeightInput.value);
    let tankDiameter = parseInt(tankDiameterInput.value);
    let rotationAngle = parseInt(rotationAngleInput.value);
    let tankShape = 'rectangle';
    let tanks = [];
    let isDragging = false;
    let isRotating = false;
    let currentTank = null;
    let offsetX, offsetY;
    let currentlyEditingTank = null;
    let copiedTank = null;
    let selectedTank = null;

    // Initialize the plan view
    function initPlanView() {
        updateAreaDimensions();
        updateStats();
        
        // Shape selection
        tankShapeSelect.addEventListener('change', function() {
            tankShape = this.value;
            rectangleDimensions.style.display = tankShape === 'rectangle' ? 'block' : 'none';
            circleDimensions.style.display = tankShape === 'circle' ? 'block' : 'none';
        });

        // Modal events
        closeModal.addEventListener('click', () => modal.style.display = 'none');
        window.addEventListener('click', (e) => e.target === modal && (modal.style.display = 'none'));
        saveLabelBtn.addEventListener('click', saveTankLabel);

        // Button events
        updateAreaBtn.addEventListener('click', updateAreaDimensions);
        addTankBtn.addEventListener('click', addTank);
        clearAllBtn.addEventListener('click', clearAllTanks);
        copyTankBtn.addEventListener('click', copySelectedTank);
        pasteTankBtn.addEventListener('click', pasteTank);
        deleteTankBtn.addEventListener('click', deleteSelectedTank);
        savePdfBtn.addEventListener('click', saveAsPdf);
        
        // Rotation input
        rotationAngleInput.addEventListener('input', updateSelectedTankRotation);
    }

    // Update area dimensions
    function updateAreaDimensions() {
        areaWidth = parseInt(areaWidthInput.value) || 1000;
        areaHeight = parseInt(areaHeightInput.value) || 1000;
        
        const scale = calculateScale();
        planView.style.width = (areaWidth * scale) + 'px';
        planView.style.height = (areaHeight * scale) + 'px';
        
        updateStats();
    }

    // Add new tank
    function addTank() {
        const scale = calculateScale();
        const label = tankLabelInput.value.trim() || `Tank ${tanks.length + 1}`;
        rotationAngle = parseInt(rotationAngleInput.value) || 0;
        
        if (tankShape === 'rectangle') {
            tankWidth = parseInt(tankWidthInput.value) || 50;
            tankHeight = parseInt(tankHeightInput.value) || 50;
            
            if (tankWidth <= 0 || tankHeight <= 0) {
                alert('Tank dimensions must be positive values');
                return;
            }
            
            createRectangleTank(tankWidth, tankHeight, scale, label, undefined, undefined, rotationAngle);
        } else {
            tankDiameter = parseInt(tankDiameterInput.value) || 50;
            
            if (tankDiameter <= 0) {
                alert('Tank diameter must be a positive value');
                return;
            }
            
            createCircleTank(tankDiameter, scale, label, undefined, undefined, rotationAngle);
        }
        
        updateStats();
    }

    // Create rectangular tank
    function createRectangleTank(width, height, scale, label, x, y, angle = 0) {
        const tank = document.createElement('div');
        tank.className = 'tank';
        
        const scaledWidth = width * scale;
        const scaledHeight = height * scale;
        const left = x !== undefined ? x * scale : (parseInt(planView.style.width) - scaledWidth) / 2;
        const top = y !== undefined ? y * scale : (parseInt(planView.style.height) - scaledHeight) / 2;
        
        tank.style.width = scaledWidth + 'px';
        tank.style.height = scaledHeight + 'px';
        tank.style.left = left + 'px';
        tank.style.top = top + 'px';
        tank.style.transform = `rotate(${angle}deg)`;
        
        // Add elements
        tank.appendChild(createSelectionIndicator());
        tank.appendChild(createRotationHandle());
        tank.appendChild(createTankLabel(label, `${width}m × ${height}m`));
        
        // Add event listeners
        tank.addEventListener('dblclick', () => editTankLabel(tank));
        setupTankSelection(tank);
        tank.addEventListener('mousedown', startDrag);
        
        planView.appendChild(tank);
        tanks.push({
            element: tank,
            width, height,
            diameter: null,
            shape: 'rectangle',
            x: left / scale,
            y: top / scale,
            area: width * height,
            label,
            rotation: angle
        });
        
        return tank;
    }

    // Create circular tank
    function createCircleTank(diameter, scale, label, x, y, angle = 0) {
        const tank = document.createElement('div');
        tank.className = 'tank circle';
        
        const scaledDiameter = diameter * scale;
        const radius = diameter / 2;
        const left = x !== undefined ? x * scale : (parseInt(planView.style.width) - scaledDiameter) / 2;
        const top = y !== undefined ? y * scale : (parseInt(planView.style.height) - scaledDiameter) / 2;
        
        tank.style.width = scaledDiameter + 'px';
        tank.style.height = scaledDiameter + 'px';
        tank.style.left = left + 'px';
        tank.style.top = top + 'px';
        tank.style.transform = `rotate(${angle}deg)`;
        
        // Add elements
        tank.appendChild(createSelectionIndicator());
        tank.appendChild(createRotationHandle());
        tank.appendChild(createTankLabel(label, `⌀ ${diameter}m`));
        
        // Add event listeners
        tank.addEventListener('dblclick', () => editTankLabel(tank));
        setupTankSelection(tank);
        tank.addEventListener('mousedown', startDrag);
        
        planView.appendChild(tank);
        tanks.push({
            element: tank,
            width: diameter,
            height: diameter,
            diameter,
            shape: 'circle',
            x: left / scale,
            y: top / scale,
            area: Math.PI * Math.pow(radius, 2),
            label,
            rotation: angle
        });
        
        return tank;
    }

    // Helper function to create tank label
    function createTankLabel(label, dimensions) {
        const labelElement = document.createElement('div');
        labelElement.className = 'tank-label';
        labelElement.textContent = `${label}\n${dimensions}`;
        return labelElement;
    }

    // Helper function to create selection indicator
    function createSelectionIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'selection-indicator';
        return indicator;
    }

    // Helper function to create rotation handle
    function createRotationHandle() {
        const handle = document.createElement('div');
        handle.className = 'rotation-handle';
        return handle;
    }

    // Edit tank label
    function editTankLabel(tankElement) {
        currentlyEditingTank = tankElement;
        const tankIndex = tanks.findIndex(t => t.element === tankElement);
        if (tankIndex !== -1) {
            editLabelInput.value = tanks[tankIndex].label;
            modal.style.display = 'block';
            editLabelInput.focus();
        }
    }

    // Save tank label
    function saveTankLabel() {
        if (currentlyEditingTank) {
            const label = currentlyEditingTank.querySelector('.tank-label');
            const parts = label.textContent.split('\n');
            label.textContent = `${editLabelInput.value}\n${parts[1]}`;
            
            const tankIndex = tanks.findIndex(t => t.element === currentlyEditingTank);
            if (tankIndex !== -1) {
                tanks[tankIndex].label = editLabelInput.value;
            }
            
            modal.style.display = 'none';
        }
    }

    // Setup tank selection
    function setupTankSelection(tank) {
        tank.addEventListener('click', function(e) {
            if (e.target.classList.contains('tank-label') || e.target.classList.contains('rotation-handle')) return;
            
            document.querySelectorAll('.tank').forEach(t => t.classList.remove('selected'));
            this.classList.add('selected');
            selectedTank = this;
            
            // Update rotation input to match selected tank
            const tankIndex = tanks.findIndex(t => t.element === this);
            if (tankIndex !== -1) {
                rotationAngleInput.value = tanks[tankIndex].rotation;
            }
        });
    }

    // Update selected tank rotation
    function updateSelectedTankRotation() {
        if (!selectedTank) return;
        
        const angle = parseInt(rotationAngleInput.value) || 0;
        selectedTank.style.transform = `rotate(${angle}deg)`;
        
        const tankIndex = tanks.findIndex(t => t.element === selectedTank);
        if (tankIndex !== -1) {
            tanks[tankIndex].rotation = angle;
        }
    }

    // Setup rotation handle
    function setupRotationHandle(tank, handle) {
        handle.addEventListener('mousedown', function(e) {
            e.stopPropagation();
            isRotating = true;
            
            const rect = tank.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const startAngle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI);
            const currentRotation = parseInt(tank.style.transform.replace('rotate(', '').replace('deg)', '')) || 0;
            
            function rotateTank(e) {
                if (!isRotating) return;
                
                const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI);
                const newRotation = (currentRotation + (angle - startAngle)) % 360;
                
                tank.style.transform = `rotate(${newRotation}deg)`;
                rotationAngleInput.value = Math.round(newRotation);
                
                const tankIndex = tanks.findIndex(t => t.element === tank);
                if (tankIndex !== -1) {
                    tanks[tankIndex].rotation = newRotation;
                }
            }
            
            function stopRotate() {
                isRotating = false;
                document.removeEventListener('mousemove', rotateTank);
                document.removeEventListener('mouseup', stopRotate);
            }
            
            document.addEventListener('mousemove', rotateTank);
            document.addEventListener('mouseup', stopRotate);
        });
    }

    // Copy selected tank
    function copySelectedTank() {
        if (!selectedTank) {
            alert('Please select a tank first by clicking on it');
            return;
        }
        
        const tankIndex = tanks.findIndex(t => t.element === selectedTank);
        if (tankIndex !== -1) {
            copiedTank = JSON.parse(JSON.stringify(tanks[tankIndex]));
            const transform = selectedTank.style.transform;
            const rotationMatch = transform.match(/rotate\((\d+)deg\)/);
            copiedTank.rotation = rotationMatch ? parseInt(rotationMatch[1]) : 0;
            alert('Tank copied to clipboard!');
        }
    }

    // Paste tank
    function pasteTank() {
        if (!copiedTank) {
            alert('No tank has been copied yet');
            return;
        }
        
        const scale = calculateScale();
        const offset = 20 * scale;
        
        if (copiedTank.shape === 'rectangle') {
            createRectangleTank(
                copiedTank.width,
                copiedTank.height,
                scale,
                copiedTank.label + ' (copy)',
                copiedTank.x + offset,
                copiedTank.y + offset,
                copiedTank.rotation
            );
        } else {
            createCircleTank(
                copiedTank.diameter,
                scale,
                copiedTank.label + ' (copy)',
                copiedTank.x + offset,
                copiedTank.y + offset,
                copiedTank.rotation
            );
        }
    }

    // Delete selected tank
    function deleteSelectedTank() {
        if (!selectedTank) {
            alert('Please select a tank first by clicking on it');
            return;
        }
        
        if (confirm('Are you sure you want to delete this tank?')) {
            planView.removeChild(selectedTank);
            tanks = tanks.filter(t => t.element !== selectedTank);
            selectedTank = null;
            updateStats();
        }
    }

    // Drag functionality
    function startDrag(e) {
        if (e.target.classList.contains('tank-label') || e.target.classList.contains('rotation-handle')) return;
        
        isDragging = true;
        currentTank = e.currentTarget;
        
        const rect = currentTank.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
        
        currentTank.style.zIndex = '100';
        
        document.addEventListener('mousemove', dragTank);
        document.addEventListener('mouseup', stopDrag);
        
        e.preventDefault();
    }

    function dragTank(e) {
        if (!isDragging) return;
        
        const scale = calculateScale();
        const planRect = planView.getBoundingClientRect();
        
        let left = e.clientX - planRect.left - offsetX;
        let top = e.clientY - planRect.top - offsetY;
        
        const tankWidthPx = parseInt(currentTank.style.width);
        const tankHeightPx = parseInt(currentTank.style.height);
        
        left = Math.max(0, Math.min(left, planRect.width - tankWidthPx));
        top = Math.max(0, Math.min(top, planRect.height - tankHeightPx));
        
        currentTank.style.left = left + 'px';
        currentTank.style.top = top + 'px';
        
        const tankIndex = tanks.findIndex(t => t.element === currentTank);
        if (tankIndex !== -1) {
            tanks[tankIndex].x = left / scale;
            tanks[tankIndex].y = top / scale;
        }
    }

    function stopDrag() {
        if (!isDragging) return;
        
        isDragging = false;
        if (currentTank) currentTank.style.zIndex = '1';
        currentTank = null;
        
        document.removeEventListener('mousemove', dragTank);
        document.removeEventListener('mouseup', stopDrag);
    }

    // Clear all tanks
    function clearAllTanks() {
        tanks.forEach(tank => planView.removeChild(tank.element));
        tanks = [];
        updateStats();
    }

    // Update statistics
    function updateStats() {
        const totalArea = areaWidth * areaHeight;
        let usedArea = tanks.reduce((sum, tank) => sum + tank.area, 0);
        
        totalAreaSpan.textContent = totalArea.toLocaleString();
        usedAreaSpan.textContent = Math.round(usedArea).toLocaleString();
        availableAreaSpan.textContent = Math.round(totalArea - usedArea).toLocaleString();
        tankCountSpan.textContent = tanks.length;
    }

    // Save as PDF
function saveAsPdf() {
    html2canvas(document.getElementById('planView'), {
        scale: 2,
        logging: false,
        useCORS: true,
        allowTaint: true
    }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');

        // Get metadata input values
        const projectName = document.getElementById('projectName').value || '';
        const projectNumber = document.getElementById('projectNumber').value || '';
        const version = document.getElementById('version').value || '';
        const date = document.getElementById('date').value || '';
        const notes = document.getElementById('notes').value || '';

        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
                <head>
                    <title>Print Tank Plan</title>
                    <style>
                        body {
                            margin: 20px;
                            font-family: Arial, sans-serif;
                            background-color: white;
                        }
                        .metadata {
                            text-align: left;
                            margin-bottom: 20px;
                            font-size: 14px;
                            border-bottom: 1px solid #ccc;
                            padding-bottom: 10px;
                        }
                        .notes {
                            margin-top: 10px;
                            white-space: pre-wrap;
                        }
                        img {
                            max-width: 100%;
                            height: auto;
                            display: block;
                            margin: 0 auto;
                        }
                    </style>
                </head>
                <body>
                    <div class="metadata">
                        <strong>Project Name:</strong> ${projectName}<br>
                        <strong>Project Number:</strong> ${projectNumber}<br>
                        <strong>Version:</strong> ${version}<br>
                        <strong>Date:</strong> ${date}<br>
                        <div class="notes"><strong>Notes:</strong><br>${notes}</div>
                    </div>
                    <img src="${imgData}" onload="window.print(); window.onafterprint = () => window.close();">
                </body>
            </html>
        `);
        printWindow.document.close(); // Required for some browsers
    });
}

// Add event listener for the save button
document.getElementById('savePdf').addEventListener('click', saveAsPdf);

    // Helper function to calculate scale
    function calculateScale() {
        return 1000 / Math.max(areaWidth, areaHeight);
    }

    // Initialize the app
    initPlanView();
});


document.getElementById('savePdf').addEventListener('click', saveAsPdf);
// Add this to your initialization code
function init() {
    // ... your existing initialization code ...
    
    // Set up PDF saving
    document.getElementById('savePdf').addEventListener('click', saveAsPdf);
    
    // Make sure the planView has a white background for printing
    document.getElementById('planView').style.backgroundColor = '#ffffff';
}

// Call init when DOM is loaded
document.addEventListener('DOMContentLoaded', init)