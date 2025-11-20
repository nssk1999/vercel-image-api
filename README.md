# Vercel Image API

API endpoint that adds custom text to a PNG image template in real-time.

## Features

- Loads PNG image template from `public/template.png`
- Adds custom name from header (`x-name`) or query param (`?name=`)
- Returns modified image instantly as PNG
- Fully customizable font, color, position, and styling

## Setup

### 1. Add Your Image Template

Place your PNG image template:
```
public/template.png
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Deploy to Vercel

```bash
npm i -g vercel
vercel login
vercel --prod
```

## Usage

```bash
https://your-app.vercel.app/api/generate-image?name=YourName
```

## Customization

Edit `api/generate-image.js`:
- Font: Change line 28
- Color: Change line 29
- Position: Change line 37