const { createCanvas, loadImage, registerFont } = require('canvas');
const fs = require('fs');
const path = require('path');

module.exports = async (req, res) => {
  try {
    // Get the name from the header
    const name = req.headers['x-name'] || req.query.name || 'Guest';
    
    // Load the template image
    const templatePath = path.join(process.cwd(), 'public', 'template.png');
    
    if (!fs.existsSync(templatePath)) {
      return res.status(404).json({ error: 'Template image not found' });
    }
    
    const image = await loadImage(templatePath);
    
    // Create canvas with same dimensions as template
    const canvas = createCanvas(image.width, image.height);
    const ctx = canvas.getContext('2d');
    
    // Draw the template image
    ctx.drawImage(image, 0, 0);
    
    // Configure text styling
    ctx.font = 'bold 48px Arial'; // Adjust font size and family as needed
    ctx.fillStyle = '#FFFFFF'; // White text (change as needed)
    ctx.strokeStyle = '#000000'; // Black outline (optional)
    ctx.lineWidth = 2;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Calculate position (centered horizontally, adjust Y position as needed)
    const x = canvas.width / 2;
    const y = 100; // Adjust this to position text vertically
    
    // Draw text with outline (optional)
    ctx.strokeText(name, x, y);
    ctx.fillText(name, x, y);
    
    // Convert canvas to buffer
    const buffer = canvas.toBuffer('image/png');
    
    // Set response headers
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Content-Length', buffer.length);
    
    // Send the image
    res.status(200).send(buffer);
    
  } catch (error) {
    console.error('Error generating image:', error);
    res.status(500).json({ 
      error: 'Failed to generate image',
      details: error.message 
    });
  }
};