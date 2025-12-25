import { pipeline } from 'https://cdn.jsdelivr.net/npm/@xenova/transformers';

let captioner = null;
let selectedImage = null;

const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');
const previewSection = document.getElementById('previewSection');
const previewImage = document.getElementById('previewImage');
const clearBtn = document.getElementById('clearBtn');
const generateBtn = document.getElementById('generateBtn');
const btnText = document.getElementById('btnText');
const btnLoader = document.getElementById('btnLoader');
const statusMessage = document.getElementById('statusMessage');
const captionSection = document.getElementById('captionSection');
const captionText = document.getElementById('captionText');
const copyBtn = document.getElementById('copyBtn');

async function initializeModel() {
    showStatus('Loading AI model...', 'info');
    try {
        captioner = await pipeline('image-to-text', 'Xenova/vit-gpt2-image-captioning');
        showStatus('Model loaded! Upload an image to begin.', 'info');
        setTimeout(() => hideStatus(), 3000);
    } catch (error) {
        showStatus('Error loading model: ' + error.message, 'error');
        console.error(error);
    }
}

function showStatus(message, type) {
    statusMessage.textContent = message;
    statusMessage.className = `status-message ${type}`;
    statusMessage.style.display = 'block';
}

function hideStatus() {
    statusMessage.style.display = 'none';
}

function setLoading(isLoading) {
    generateBtn.disabled = isLoading;
    btnText.style.display = isLoading ? 'none' : 'inline';
    btnLoader.style.display = isLoading ? 'inline-block' : 'none';
}

function handleImageUpload(file) {
    if (!file || !file.type.startsWith('image/')) {
        showStatus('Please upload a valid image file', 'error');
        return;
    }

    if (file.size > 10 * 1024 * 1024) {
        showStatus('Image too large! Maximum size is 10MB', 'error');
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        selectedImage = e.target.result;
        previewImage.src = selectedImage;
        uploadArea.style.display = 'none';
        previewSection.style.display = 'block';
        generateBtn.style.display = 'flex';
        captionSection.style.display = 'none';
        hideStatus();
    };
    reader.readAsDataURL(file);
}

uploadArea.addEventListener('click', () => {
    fileInput.click();
});

uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.style.borderColor = '#667eea';
    uploadArea.style.background = '#f0f4ff';
});

uploadArea.addEventListener('dragleave', () => {
    uploadArea.style.borderColor = '#d1d5db';
    uploadArea.style.background = '#f9fafb';
});

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.style.borderColor = '#d1d5db';
    uploadArea.style.background = '#f9fafb';

    const file = e.dataTransfer.files[0];
    handleImageUpload(file);
});

fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    handleImageUpload(file);
});

clearBtn.addEventListener('click', () => {
    selectedImage = null;
    previewImage.src = '';
    fileInput.value = '';
    uploadArea.style.display = 'block';
    previewSection.style.display = 'none';
    generateBtn.style.display = 'none';
    captionSection.style.display = 'none';
    hideStatus();
});

generateBtn.addEventListener('click', async () => {
    if (!selectedImage) {
        showStatus('Please upload an image first', 'error');
        return;
    }

    if (!captioner) {
        showStatus('Model is still loading. Please wait...', 'error');
        return;
    }

    setLoading(true);
    showStatus('Generating caption...', 'info');
    captionSection.style.display = 'none';

    try {
        const result = await captioner(selectedImage);
        const caption = result[0].generated_text;

        captionText.textContent = caption;
        captionSection.style.display = 'block';
        showStatus('Caption generated successfully!', 'info');
        setTimeout(() => hideStatus(), 3000);
    } catch (error) {
        showStatus('Error generating caption: ' + error.message, 'error');
        console.error('Caption generation error:', error);
    } finally {
        setLoading(false);
    }
});

copyBtn.addEventListener('click', () => {
    const text = captionText.textContent;
    navigator.clipboard.writeText(text).then(() => {
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        copyBtn.style.background = '#10b981';
        setTimeout(() => {
            copyBtn.textContent = originalText;
            copyBtn.style.background = '#667eea';
        }, 2000);
    }).catch(err => {
        showStatus('Failed to copy text', 'error');
        console.error(err);
    });
});

initializeModel();
