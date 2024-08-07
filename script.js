document.addEventListener('DOMContentLoaded', function() {
  const container = document.getElementById('rain-container');
  const numberOfImages = 200; // Adjust this value to increase or decrease density
  const colors = generateColors();

  for (let i = 0; i < numberOfImages; i++) {
      const img = document.createElement('img');
      img.src = `images/image${(i % 7) + 1}.svg`;
      img.alt = `Image ${(i % 7) + 1}`;
      img.className = 'rain-image';
      container.appendChild(img);
      resetImage(img, colors);
      img.addEventListener('animationend', () => resetImage(img, colors));
  }

  window.addEventListener('resize', () => {
      const images = document.querySelectorAll('.rain-image');
      images.forEach(img => resetImage(img, colors));
  });
});

function resetImage(img, colors) {
  const containerWidth = window.innerWidth;
  const containerHeight = window.innerHeight;
  const minSize = containerWidth < 600 ? 20 : 40; // Minimum size based on viewport width
  const maxSize = containerWidth < 600 ? 60 : 100; // Maximum size based on viewport width
  const size = Math.random() * (maxSize - minSize) + minSize; // Random size between minSize and maxSize
  const left = Math.random() * containerWidth; // Random horizontal position
  const top = Math.random() * -containerHeight; // Random start position above the viewport
  const baseDuration = Math.random() < 0.1 ? 2 : 5; // 10% chance to be faster
  const durationVariance = Math.random() * 7; // Random variance between 0s and 7s (slower speed)
  const duration = baseDuration + durationVariance; // Calculate final duration
  const colorIndex = Math.floor(Math.random() * colors.length);
  const baseColor = colors[colorIndex];
  const primeVariance = getPrimeVariance(); // Use prime numbers for variance
  const color = (baseColor + primeVariance) % 360; // Calculate final color

  img.style.width = `${size}px`;
  img.style.height = `${size}px`;
  img.style.left = `${left}px`;
  img.style.top = `${top}px`;
  img.style.animationDuration = `${duration}s`;
  img.style.animationName = 'none';
  img.style.filter = `hue-rotate(${color}deg)`; // Apply color filter

  // Trigger reflow to restart animation
  img.offsetHeight;
  img.style.animationName = 'fall';
}

function generateColors() {
  // Base hue values for original 7 colors, primary, and secondary colors
  const baseColors = [
      0,   // Red
      30,  // Orange
      60,  // Yellow
      90,  // Lime
      120, // Green
      150, // Aquamarine
      180, // Cyan
      210, // Azure
      240, // Blue
      270, // Violet
      300, // Magenta
      330  // Rose
  ];

  // Primary colors
  const primaryColors = [
      0,   // Red
      60,  // Yellow
      240  // Blue
  ];

  // Secondary colors
  const secondaryColors = [
      30,  // Orange
      90,  // Lime
      150, // Aquamarine
      210, // Azure
      270, // Violet
      330  // Rose
  ];

  // Combine primary and secondary colors with an 80/20 distribution and randomness
  const colors = [];
  for (let i = 0; i < 80; i++) {
      colors.push(primaryColors[i % primaryColors.length]);
  }
  const secondaryCount = Math.floor(Math.random() * 21); // Random number between 0 and 20
  for (let i = 0; i < secondaryCount; i++) {
      colors.push(secondaryColors[i % secondaryColors.length]);
  }
  return baseColors.concat(colors);
}

function getPrimeVariance() {
  // Prime numbers for variance
  const primes = [1, 2, 3, 5, 7, 11];
  return primes[Math.floor(Math.random() * primes.length)];
}
