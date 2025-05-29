document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.circle-button');
    const descriptionBox = document.getElementById('description');
    
    const descriptions = {
        sbr: "Phosphorus removal - Process of eliminating phosphorus from wastewater to prevent eutrophication",
        mbr: "Chlorine Dosing - Addition of chlorine to water for disinfection and oxidation purposes",
        mbbr: "Alkalinity Dosing - Process of adding alkalinity to water to maintain proper pH levels",
        mle: "Polymer Dosing - Addition of polymers to improve solid-liquid separation in treatment processes",
        ifas: "Carbon Dosing - Addition of carbon sources to enhance biological treatment processes"
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