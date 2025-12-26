# AI Image Caption Generator

A web application that generates captions for images using AI models, powered by Transformer.js.

## Demo 

- [Demo URL](https://iepratiyush.github.io/image-caption-transformerjs/)

## Features

- Upload images via drag-and-drop or file picker
- AI-powered caption generation using vit-gpt2-image-captioning model
- Copy generated captions to clipboard
- Runs entirely in the browser without server-side processing

## Tech Stack

- HTML/CSS/JavaScript
- Transformer.js for AI model inference
- Model: Xenova/vit-gpt2-image-captioning

## Prerequisites

- Python 3.x
- Modern web browser with WebAssembly support

## Installation

1. Clone or download this repository

2. Navigate to the project directory:
```bash
cd TransfomerJS
```

3. Start a local HTTP server:
```bash
python3 -m http.server 8000
```

4. Open your browser and navigate to:
```
http://localhost:8000
```

## Usage

1. Upload an image by clicking the upload area or dragging and dropping a file
2. Supported formats: PNG, JPG, WEBP (max 10MB)
3. Click "Generate Caption" button
4. Wait for the AI model to process the image
5. View the generated caption and optionally copy it to clipboard

## Technical Details

The application uses the image-to-text pipeline from Transformer.js to generate captions. The AI model runs entirely in the browser using WebAssembly and ONNX Runtime. On first load, the model (approximately 500MB) is downloaded and cached locally.

## File Structure

```
TransfomerJS/
├── index.html      # Main HTML structure
├── style.css       # Styling
├── app.js          # Application logic and AI integration
└── README.md       # Documentation
```

## Performance Notes

- First load requires downloading the model, which may take time depending on network speed
- Caption generation typically takes 2-10 seconds depending on hardware
- All processing is done client-side for privacy

## Browser Compatibility

- Chrome/Edge 90+
- Firefox 89+
- Safari 16+

## License

MIT
