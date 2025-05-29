   document.addEventListener('DOMContentLoaded', function() {
            const canvas = document.getElementById('tankCanvas');
            const ctx = canvas.getContext('2d');
            const drawBtn = document.getElementById('draw-btn');
            const volumeDisplay = document.getElementById('volume');
            const areaDisplay = document.getElementById('area');
            const rectangularBtn = document.getElementById('rectangular-btn');
            const cylindricalBtn = document.getElementById('cylindrical-btn');
            const rectangularInputs = document.getElementById('rectangular-inputs');
            const cylindricalInputs = document.getElementById('cylindrical-inputs');
            
            // Set initial canvas size
            resizeCanvas();
            window.addEventListener('resize', resizeCanvas);
            
            drawBtn.addEventListener('click', drawTank);
            
            // Add input event listeners for calculations
            document.getElementById('length').addEventListener('input', updateCalculations);
            document.getElementById('width').addEventListener('input', updateCalculations);
            document.getElementById('depth').addEventListener('input', updateCalculations);
            document.getElementById('diameter').addEventListener('input', updateCalculations);
            document.getElementById('cyl-depth').addEventListener('input', updateCalculations);
            
            // Tank type selection
            rectangularBtn.addEventListener('click', function() {
                rectangularBtn.classList.add('active');
                cylindricalBtn.classList.remove('active');
                rectangularInputs.style.display = 'flex';
                cylindricalInputs.style.display = 'none';
                updateCalculations();
                drawTank();
            });
            
            cylindricalBtn.addEventListener('click', function() {
                cylindricalBtn.classList.add('active');
                rectangularBtn.classList.remove('active');
                cylindricalInputs.style.display = 'flex';
                rectangularInputs.style.display = 'none';
                updateCalculations();
                drawTank();
            });
            
            // Draw tank on initial load with default values
            drawTank();
            
            function resizeCanvas() {
                const container = document.querySelector('.canvas-container');
                canvas.width = Math.min(container.clientWidth, 800);
                canvas.height = Math.min(container.clientWidth * 0.6, 500);
                drawTank();
            }
            
            function updateCalculations() {
                let area, volume;
                if (rectangularBtn.classList.contains('active')) {
                    const length = parseInt(document.getElementById('length').value) || 0;
                    const width = parseInt(document.getElementById('width').value) || 0;
                    const depth = parseInt(document.getElementById('depth').value) || 0;
                    area = length * width;
                    volume = length * width * depth;
                } else {
                    const diameter = parseInt(document.getElementById('diameter').value) || 0;
                    const depth = parseInt(document.getElementById('cyl-depth').value) || 0;
                    const radius = diameter / 2;
                    area = Math.PI * radius * radius;
                    volume = area * depth;
                }
                // Format with thousands separator
                areaDisplay.textContent = Math.round(area).toLocaleString();
                volumeDisplay.textContent = Math.round(volume).toLocaleString();
                return { area, volume };
            }
            
            function drawTank() {
                // Clear canvas
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                
                if (rectangularBtn.classList.contains('active')) {
                    drawRectangularTank();
                } else {
                    drawCylindricalTank();
                }
            }
            
            function drawRectangularTank() {
                // Get dimensions from inputs
                const length = parseInt(document.getElementById('length').value) || 100;
                const width = parseInt(document.getElementById('width').value) || 60;
                const depth = parseInt(document.getElementById('depth').value) || 40;
                
                // Calculate and display volume and area
                updateCalculations();
                
                // Calculate scaling factor to fit the tank in the canvas
                const maxDimension = Math.max(length + width, depth * 2);
                const scale = Math.min(canvas.width, canvas.height) / (maxDimension * 1.5);
                
                // Center the drawing
                const centerX = canvas.width / 2;
                const centerY = canvas.height / 2 + 50;
                
                // Isometric projection angles (30 degrees)
                const angle = Math.PI / 6;
                const cosAngle = Math.cos(angle);
                const sinAngle = Math.sin(angle);
                
                // Function to convert 3D to isometric 2D
                function project(x, y, z) {
                    const isoX = (x - z) * cosAngle;
                    const isoY = y + (x + z) * sinAngle;
                    return {
                        x: centerX + isoX * scale,
                        y: centerY - isoY * scale
                    };
                }
                
                // Define all 8 corners of the rectangular tank
                const corners = [
                    project(-length/2, -depth/2, -width/2),
                    project(length/2, -depth/2, -width/2),
                    project(length/2, -depth/2, width/2),
                    project(-length/2, -depth/2, width/2),
                    project(-length/2, depth/2, -width/2),
                    project(length/2, depth/2, -width/2),
                    project(length/2, depth/2, width/2),
                    project(-length/2, depth/2, width/2)
                ];
                
                // Draw the tank faces
                ctx.strokeStyle = '#333';
                ctx.lineWidth = 2;
                
                // Draw bottom face
                drawFace([corners[0], corners[1], corners[2], corners[3]]);
                
                // Draw top face
                drawFace([corners[4], corners[5], corners[6], corners[7]]);
                
                // Draw vertical edges
                drawEdge(corners[0], corners[4]);
                drawEdge(corners[1], corners[5]);
                drawEdge(corners[2], corners[6]);
                drawEdge(corners[3], corners[7]);
                
                // Draw front face (semi-transparent)
                ctx.fillStyle = 'rgba(100, 150, 255, 0.3)';
                drawFace([corners[0], corners[1], corners[5], corners[4]], true);
                
                // Draw side face (semi-transparent)
                ctx.fillStyle = 'rgba(100, 255, 150, 0.3)';
                drawFace([corners[1], corners[2], corners[6], corners[5]], true);
                
                // Add labels
                ctx.fillStyle = '#333';
                ctx.font = '14px Arial';
                ctx.textAlign = 'center';
                
                const lengthLabelPos = project(0, -depth/2 - 10, 0);
                ctx.fillText(`Length: ${length}`, lengthLabelPos.x, lengthLabelPos.y);
                
                const widthLabelPos = project(length/2 + 15, -depth/2, 0);
                ctx.fillText(`Width: ${width}`, widthLabelPos.x, widthLabelPos.y);
                
                const depthLabelPos = project(-length/2 - 15, 0, -width/2 - 10);
                ctx.fillText(`Depth: ${depth}`, depthLabelPos.x, depthLabelPos.y);
                
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
                
                function drawEdge(p1, p2) {
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            }
            
            function drawCylindricalTank() {
                // Get dimensions from inputs
                const diameter = parseInt(document.getElementById('diameter').value) || 60;
                const depth = parseInt(document.getElementById('cyl-depth').value) || 40;
                const radius = diameter / 2;
                
                // Calculate and display volume and area
                updateCalculations();
                
                // Calculate scaling factor to fit the tank in the canvas
                const maxDimension = Math.max(diameter * 2, depth * 2);
                const scale = Math.min(canvas.width, canvas.height) / (maxDimension * 1.5);
                
                // Center the drawing
                const centerX = canvas.width / 2;
                const centerY = canvas.height / 2 + 50;
                
                // Isometric projection angles (30 degrees)
                const angle = Math.PI / 6;
                const cosAngle = Math.cos(angle);
                const sinAngle = Math.sin(angle);
                
                // Function to convert 3D to isometric 2D
                function project(x, y, z) {
                    const isoX = (x - z) * cosAngle;
                    const isoY = y + (x + z) * sinAngle;
                    return {
                        x: centerX + isoX * scale,
                        y: centerY - isoY * scale
                    };
                }
                
                // Draw the cylindrical tank
                ctx.strokeStyle = '#333';
                ctx.lineWidth = 2;
                
                // Number of segments for the ellipse
                const segments = 36;
                
                // Draw top ellipse
                ctx.beginPath();
                for (let i = 0; i <= segments; i++) {
                    const theta = (i / segments) * Math.PI * 2;
                    const x = Math.cos(theta) * radius;
                    const z = Math.sin(theta) * radius;
                    const y = depth/2;
                    const point = project(x, y, z);
                    if (i === 0) {
                        ctx.moveTo(point.x, point.y);
                    } else {
                        ctx.lineTo(point.x, point.y);
                    }
                }
                ctx.stroke();
                
                // Draw bottom ellipse
                ctx.beginPath();
                for (let i = 0; i <= segments; i++) {
                    const theta = (i / segments) * Math.PI * 2;
                    const x = Math.cos(theta) * radius;
                    const z = Math.sin(theta) * radius;
                    const y = -depth/2;
                    const point = project(x, y, z);
                    if (i === 0) {
                        ctx.moveTo(point.x, point.y);
                    } else {
                        ctx.lineTo(point.x, point.y);
                    }
                }
                ctx.stroke();
                
                // Draw side lines (front and back)
                for (let i = 0; i < segments; i += segments/4) {
                    const theta = (i / segments) * Math.PI * 2;
                    const x = Math.cos(theta) * radius;
                    const z = Math.sin(theta) * radius;
                    
                    const topPoint = project(x, depth/2, z);
                    const bottomPoint = project(x, -depth/2, z);
                    
                    ctx.beginPath();
                    ctx.moveTo(topPoint.x, topPoint.y);
                    ctx.lineTo(bottomPoint.x, bottomPoint.y);
                    ctx.stroke();
                }
                
                // Draw front semi-ellipse (semi-transparent)
                ctx.fillStyle = 'rgba(100, 150, 255, 0.3)';
                ctx.beginPath();
                for (let i = 0; i <= segments/2; i++) {
                    const theta = (i / segments) * Math.PI * 2;
                    const x = Math.cos(theta) * radius;
                    const z = Math.sin(theta) * radius;
                    const y = depth/2;
                    const point = project(x, y, z);
                    if (i === 0) {
                        ctx.moveTo(point.x, point.y);
                    } else {
                        ctx.lineTo(point.x, point.y);
                    }
                }
                for (let i = segments/2; i >= 0; i--) {
                    const theta = (i / segments) * Math.PI * 2;
                    const x = Math.cos(theta) * radius;
                    const z = Math.sin(theta) * radius;
                    const y = -depth/2;
                    const point = project(x, y, z);
                    ctx.lineTo(point.x, point.y);
                }
                ctx.closePath();
                ctx.fill();
                ctx.stroke();
                
                // Add labels
                ctx.fillStyle = '#333';
                ctx.font = '14px Arial';
                ctx.textAlign = 'center';
                
                const diameterLabelPos = project(0, -depth/2 - 10, 0);
                ctx.fillText(`Diameter: ${diameter}`, diameterLabelPos.x, diameterLabelPos.y);
                
                const depthLabelPos = project(-radius - 15, 0, -radius - 10);
                ctx.fillText(`Depth: ${depth}`, depthLabelPos.x, depthLabelPos.y);
            }
        });