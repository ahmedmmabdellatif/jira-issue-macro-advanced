// Simple Jira icon for the macro
const canvas = document.createElement('canvas');
canvas.width = 80;
canvas.height = 80;
const ctx = canvas.getContext('2d');

// Background
ctx.fillStyle = '#0052CC';
ctx.fillRect(0, 0, 80, 80);

// Jira logo (simplified)
ctx.fillStyle = 'white';
ctx.beginPath();
ctx.moveTo(20, 40);
ctx.lineTo(35, 20);
ctx.lineTo(50, 40);
ctx.lineTo(35, 60);
ctx.closePath();
ctx.fill();

// Export as PNG
const dataURL = canvas.toDataURL('image/png');
const img = new Image();
img.src = dataURL;
document.body.appendChild(img);

// Download instructions:
// Right-click on the image and select "Save Image As..."
// Save as "jira-icon.png" in the public/images directory
