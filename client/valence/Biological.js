document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.circle-button');
    const descriptionBox = document.getElementById('description');
    
    const descriptions = {
        sbr: "Sequencing Batch Reactor - A fill-and-draw activated sludge system for wastewater treatment",
        mbr: "Membrane Bioreactor - Combines membrane filtration with biological treatment",
        mbbr: "Moving Bed Biofilm Reactor - Uses plastic carriers to support biofilm growth",
        mle: "Modified Ludzack-Ettinger - A nitrogen removal process for wastewater",
        ifas: "Integrated-Fixed Film Activated Sludge - Hybrid system combining suspended and attached growth"
    };
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            descriptionBox.textContent = descriptions[this.id];
        });
        
        button.addEventListener('mouseleave', function() {
            descriptionBox.textContent = '';
        });
    });
});