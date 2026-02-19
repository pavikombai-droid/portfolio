const frameCount = 240;
const canvas = document.getElementById("animationCanvas");
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Generate frame path
const currentFrame = (index) => {
    return `frames/ezgif-frame-${index.toString().padStart(3, '0')}.jpg`;
};

const images = [];
let loadedImages = 0;

// Preload images
for (let i = 1; i <= frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
    img.onload = () => {
        loadedImages++;
        if (loadedImages === 1) {
            context.drawImage(img, 0, 0, canvas.width, canvas.height);
        }
    };
    images.push(img);
}

// Scroll Animation
window.addEventListener("scroll", () => {
    const scrollTop = document.documentElement.scrollTop;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

    const scrollFraction = scrollTop / maxScroll;
    const frameIndex = Math.min(
        frameCount - 1,
        Math.floor(scrollFraction * frameCount)
    );

    requestAnimationFrame(() => {
        const img = images[frameIndex];
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
    });
});

// Resize Handling
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
