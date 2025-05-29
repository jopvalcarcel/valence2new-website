document.addEventListener('DOMContentLoaded', function() {
    const diagramContainer = document.getElementById('diagramContainer');
    const connectionsSvg = document.getElementById('connections');
    const addBlockBtn = document.getElementById('addBlock');
    const connectModeBtn = document.getElementById('connectMode');
    const deleteModeBtn = document.getElementById('deleteMode');
    
    let blocks = [];
    let connections = [];
    let selectedBlock = null;
    let isConnectMode = false;
    let isDeleteMode = false;
    let blockCounter = 1;
    
    // Add a new block to the diagram
    addBlockBtn.addEventListener('click', function() {
        const block = document.createElement('div');
        block.className = 'block';
        block.textContent = `Block ${blockCounter++}`;
        block.dataset.id = Date.now(); // Unique ID
        
        // Position blocks vertically
        const topPosition = blocks.length * 100 + 20;
        block.style.top = `${topPosition}px`;
        block.style.left = '50px';
        
        // Make blocks draggable
        makeDraggable(block);
        
        // Select block on click
        block.addEventListener('click', function(e) {
            e.stopPropagation();
            
            if (isDeleteMode) {
                deleteBlock(block);
                return;
            }
            
            if (isConnectMode) {
                if (!selectedBlock) {
                    selectBlock(block);
                } else {
                    createConnection(selectedBlock, block);
                    deselectAllBlocks();
                }
            } else {
                selectBlock(block);
            }
        });
        
        diagramContainer.appendChild(block);
        blocks.push(block);
    });
    
    // Toggle connect mode
    connectModeBtn.addEventListener('click', function() {
        isConnectMode = !isConnectMode;
        isDeleteMode = false;
        connectModeBtn.style.backgroundColor = isConnectMode ? '#FF9800' : '#4CAF50';
        deleteModeBtn.style.backgroundColor = '#4CAF50';
        deselectAllBlocks();
    });
    
    // Toggle delete mode
    deleteModeBtn.addEventListener('click', function() {
        isDeleteMode = !isDeleteMode;
        isConnectMode = false;
        deleteModeBtn.style.backgroundColor = isDeleteMode ? '#f44336' : '#4CAF50';
        connectModeBtn.style.backgroundColor = '#4CAF50';
        deselectAllBlocks();
    });
    
    // Click on container to deselect all
    diagramContainer.addEventListener('click', function() {
        if (!isConnectMode && !isDeleteMode) {
            deselectAllBlocks();
        }
    });
    
    // Make a block draggable
    function makeDraggable(block) {
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        
        block.onmousedown = dragMouseDown;
        
        function dragMouseDown(e) {
            if (isConnectMode || isDeleteMode) return;
            
            e = e || window.event;
            e.preventDefault();
            // get the mouse cursor position at startup:
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            // call a function whenever the cursor moves:
            document.onmousemove = elementDrag;
        }
        
        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            // calculate the new cursor position:
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            // set the element's new position:
            block.style.top = (block.offsetTop - pos2) + "px";
            block.style.left = (block.offsetLeft - pos1) + "px";
            
            // Update any connections involving this block
            updateConnections();
        }
        
        function closeDragElement() {
            // stop moving when mouse button is released:
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }
    
    // Select a block
    function selectBlock(block) {
        deselectAllBlocks();
        block.classList.add('selected');
        selectedBlock = block;
    }
    
    // Deselect all blocks
    function deselectAllBlocks() {
        blocks.forEach(block => block.classList.remove('selected'));
        selectedBlock = null;
    }
    
    // Create a connection between two blocks
    function createConnection(sourceBlock, targetBlock) {
        if (sourceBlock === targetBlock) return;
        
        const connectionId = `${sourceBlock.dataset.id}-${targetBlock.dataset.id}`;
        
        // Check if connection already exists
        if (connections.some(conn => conn.id === connectionId)) {
            return;
        }
        
        const connection = {
            id: connectionId,
            source: sourceBlock,
            target: targetBlock
        };
        
        connections.push(connection);
        updateConnections();
    }
    
    // Update all connections in the diagram
    function updateConnections() {
        // Clear existing connections
        connectionsSvg.innerHTML = '';
        
        // Add arrow marker definition
        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        const marker = document.createElementNS('http://www.w3.org/2000/svg', 'marker');
        marker.setAttribute('id', 'arrowhead');
        marker.setAttribute('markerWidth', '10');
        marker.setAttribute('markerHeight', '7');
        marker.setAttribute('refX', '9');
        marker.setAttribute('refY', '3.5');
        marker.setAttribute('orient', 'auto');
        
        const arrow = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        arrow.setAttribute('points', '0 0, 10 3.5, 0 7');
        arrow.setAttribute('class', 'arrow');
        
        marker.appendChild(arrow);
        defs.appendChild(marker);
        connectionsSvg.appendChild(defs);
        
        // Draw each connection
        connections.forEach(connection => {
            const sourceRect = connection.source.getBoundingClientRect();
            const targetRect = connection.target.getBoundingClientRect();
            
            const containerRect = diagramContainer.getBoundingClientRect();
            
            const sourceX = sourceRect.left - containerRect.left + sourceRect.width / 2;
            const sourceY = sourceRect.top - containerRect.top + sourceRect.height;
            
            const targetX = targetRect.left - containerRect.left + targetRect.width / 2;
            const targetY = targetRect.top - containerRect.top;
            
            // Create SVG path for the connection
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('class', 'connection');
            path.setAttribute('marker-end', 'url(#arrowhead)');
            
            // Create a curved path
            const controlY = sourceY + (targetY - sourceY) / 2;
            path.setAttribute('d', `M${sourceX},${sourceY} C${sourceX},${controlY} ${targetX},${controlY} ${targetX},${targetY}`);
            
            connectionsSvg.appendChild(path);
        });
    }
    
    // Delete a block and its connections
    function deleteBlock(block) {
        // Remove all connections involving this block
        connections = connections.filter(conn => 
            conn.source !== block && conn.target !== block
        );
        
        // Remove the block from the array and DOM
        blocks = blocks.filter(b => b !== block);
        diagramContainer.removeChild(block);
        
        // Update connections display
        updateConnections();
    }
    
    // Handle window resize
    window.addEventListener('resize', updateConnections);
});