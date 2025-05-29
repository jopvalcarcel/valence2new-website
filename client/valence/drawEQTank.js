document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('tankCanvas');
    const ctx = canvas.getContext('2d');
    const drawBtn = document.getElementById('draw-btn');
    const volumeDisplay = document.getElementById('volume');
    
    // Set initial canvas size
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    drawBtn.addEventListener('click', drawTank);
    
    // Add input event listeners for volume calculation
    document.getElementById('length').addEventListener('input', updateVolume);
    document.getElementById('width').addEventListener('input', updateVolume);
    document.getElementById('depth').addEventListener('input', updateVolume);
    
    // Draw tank on initial load with default values
    drawTank();
    
    function resizeCanvas() {
        const container = document.querySelector('.canvas-container');
        canvas.width = Math.min(container.clientWidth, 800);
        canvas.height = Math.min(container.clientWidth * 0.6, 500);
        drawTank();
    }
    
    function calculateAndDisplayVolume(length, width, depth) {
        const volume = length * width * depth;
        // Format with thousands separator
        volumeDisplay.textContent = volume.toLocaleString();
        return volume;
    }
    
    function updateVolume() {
        const length = parseInt(document.getElementById('length').value) || 0;
        const width = parseInt(document.getElementById('width').value) || 0;
        const depth = parseInt(document.getElementById('depth').value) || 0;
        calculateAndDisplayVolume(length, width, depth);
    }
    
    function drawTank() {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Get dimensions from inputs
        const length = parseInt(document.getElementById('length').value) || 6;
        const width = parseInt(document.getElementById('width').value) || 10;
        const depth = parseInt(document.getElementById('depth').value) || 4;
        
        // Calculate and display volume
        calculateAndDisplayVolume(length, width, depth);
        
        // Calculate scaling factor to fit the tank in the canvas
        // We consider the isometric projection in our scaling calculation
        const maxDimension = Math.max(length + width, depth * 2);
        const scale = Math.min(canvas.width, canvas.height) / (maxDimension * 1.5);
        
        // Center the drawing
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2 + 50; // Added offset for better centering
        
        // Isometric projection angles (30 degrees)
        const angle = Math.PI / 6; // 30 degrees in radians
        const cosAngle = Math.cos(angle);
        const sinAngle = Math.sin(angle);
        
        // Function to convert 3D to isometric 2D
        function project(x, y, z) {
            // In isometric projection:
            // x becomes (x - z) * cos(angle)
            // y becomes y + (x + z) * sin(angle)
            const isoX = (x - z) * cosAngle;
            const isoY = y + (x + z) * sinAngle;
            return {
                x: centerX + isoX * scale,
                y: centerY - isoY * scale // Subtract because canvas Y increases downward
            };
        }
        
        // Define all 8 corners of the rectangular tank
        const corners = [
            project(-length/2, -depth/2, -width/2), // 0: bottom-front-left
            project(length/2, -depth/2, -width/2),  // 1: bottom-front-right
            project(length/2, -depth/2, width/2),   // 2: bottom-back-right
            project(-length/2, -depth/2, width/2),  // 3: bottom-back-left
            project(-length/2, depth/2, -width/2),  // 4: top-front-left
            project(length/2, depth/2, -width/2),   // 5: top-front-right
            project(length/2, depth/2, width/2),    // 6: top-back-right
            project(-length/2, depth/2, width/2)    // 7: top-back-left
        ];
        
        // Draw the tank faces
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 2;
        
        // Draw bottom face
        drawFace([corners[0], corners[1], corners[2], corners[3]]);
        
        // Draw top face
        drawFace([corners[4], corners[5], corners[6], corners[7]]);
        
        // Draw vertical edges
        drawEdge(corners[0], corners[4]); // front-left
        drawEdge(corners[1], corners[5]); // front-right
        drawEdge(corners[2], corners[6]); // back-right
        drawEdge(corners[3], corners[7]); // back-left
        
        // Draw front face (semi-transparent)
        ctx.fillStyle = 'rgba(100, 150, 255, 0.3)';
        drawFace([corners[0], corners[1], corners[5], corners[4]], true);
        
        // Draw side face (semi-transparent)
        ctx.fillStyle = 'rgba(100, 255, 150, 0.3)';
        drawFace([corners[1], corners[2], corners[6], corners[5]], true);
        
        // Helper function to draw a face
        function drawFace(points, fill = false) {
            ctx.beginPath();
            ctx.moveTo(points[0].x, points[0].y);
            for (let i = 1; i < points.length; i++) {
                ctx.lineTo(points[i].x, points[i].y);
            }
            ctx.closePath();
            if (fill) {
                ctx.fill();
            }
            ctx.stroke();
        }
        
        // Helper function to draw an edge
        function drawEdge(p1, p2) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
        }
        
        // Add labels
        ctx.fillStyle = '#333';
        ctx.font = '14px Arial';
        ctx.textAlign = 'center';
        
        // Length label (x-axis)
        const lengthLabelPos = project(0, -depth/2 - 10, 0);
        ctx.fillText(`Length: ${length}`, lengthLabelPos.x, lengthLabelPos.y);
        
        // Width label (z-axis)
        const widthLabelPos = project(length/2 + 15, -depth/2, 0);
        ctx.fillText(`Width: ${width}`, widthLabelPos.x, widthLabelPos.y);
        
        // Depth label (y-axis)
        const depthLabelPos = project(-length/2 - 15, 0, -width/2 - 10);
        ctx.fillText(`Depth: ${depth}`, depthLabelPos.x, depthLabelPos.y);
    }
});

function updateSpaceDimensions() {
    const width = parseInt(spaceWidthInput.value);
    const depth = parseInt(spaceDepthInput.value);
    
    // Calculate pixel dimensions with scale factor
    const widthPx = width * scaleFactor;
    const depthPx = depth * scaleFactor;
    
    // Set minimum dimensions so the view remains visible
    isometricView.style.width = `${Math.max(widthPx, 400)}px`;
    isometricView.style.height = `${Math.max(depthPx, 400)}px`;
    
    calculateAvailableSpace();
    
    // Center any existing tanks
    if (tanks.length === 0) {
        // If no tanks, add one in the center if desired
        // addTank();
    } else {
        // Re-render tanks to ensure they're positioned correctly
        renderTanks();
    }
}