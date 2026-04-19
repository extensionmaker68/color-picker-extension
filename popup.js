
// 1. Color Names List (Simplified)
// We use a small list of basic colors to name the picked color.
const colorNames = {
  "#000000": "Black",
  "#FFFFFF": "White",
  "#FF0000": "Red",
  "#00FF00": "Lime",
  "#0000FF": "Blue",
  "#FFFF00": "Yellow",
  "#00FFFF": "Cyan",
  "#FF00FF": "Magenta",
  "#C0C0C0": "Silver",
  "#808080": "Gray",
  "#800000": "Maroon",
  "#808000": "Olive",
  "#008000": "Green",
  "#800080": "Purple",
  "#008080": "Teal",
  "#000080": "Navy",
  "#FFA500": "Orange",
  "#FFD700": "Gold",
  "#FFC0CB": "Pink",
  "#B76E79": "Rose Gold",
  "#40E0D0": "Turquoise",
  "#FA8072": "Salmon",
  "#E6E6FA": "Lavender",
  "#F0E68C": "Khaki"
};

// Start the app when the popup opens
document.addEventListener('DOMContentLoaded', () => {

  // Setup Button Listeners
  const btn1 = document.getElementById('btn-pick-1');
  const btn2 = document.getElementById('btn-pick-2');
  const copy1 = document.getElementById('copy-1');
  const copy2 = document.getElementById('copy-2');

  // Logic for "Pick Color 1"
  btn1.addEventListener('click', async () => {
    pickColor(1);
  });

  // Logic for "Pick Color 2"
  btn2.addEventListener('click', async () => {
    pickColor(2);
  });

  // Copy Logic
  copy1.addEventListener('click', () => copyToClipboard(1));
  copy2.addEventListener('click', () => copyToClipboard(2));
});

// The Main Function that picks the color
async function pickColor(boxNumber) {
  // Check if browser supports this feature
  if (!window.EyeDropper) {
    alert("Your browser does not support the EyeDropper API. Please update Google Chrome.");
    return;
  }

  const eyeDropper = new EyeDropper();

  try {
    // This opens the magnifier to pick a color
    const result = await eyeDropper.open();
    const hexCode = result.sRGBHex;

    // Update the screen with the new color
    updateBox(boxNumber, hexCode);

  } catch (e) {
    // User cancelled selection (pressed Esc), do nothing
    console.log("User cancelled selection");
  }
}

// Function to update the HTML with the new color
function updateBox(num, hex) {
  const preview = document.getElementById(`preview-${num}`);
  const hexText = document.getElementById(`hex-${num}`);
  const nameText = document.getElementById(`name-${num}`);

  // 1. Change background color
  preview.style.backgroundColor = hex;

  // 2. Change text code
  hexText.textContent = hex.toUpperCase();

  // 3. Find and change color name
  const name = findColorName(hex);
  nameText.textContent = name;
}

// Function to copy text to clipboard
function copyToClipboard(num) {
  const hexText = document.getElementById(`hex-${num}`).textContent;
  
  navigator.clipboard.writeText(hexText).then(() => {
    // Show a little alert or visual change?
    // Let's just change the button icon briefly
    const btn = document.getElementById(`copy-${num}`);
    const original = btn.textContent;
    btn.textContent = "✅"; // Checkmark
    setTimeout(() => {
      btn.textContent = original;
    }, 1500);
  });
}

// Simple logic to find the closest color name
// (Note: This is a very basic helper for beginners. Real apps use big math here!)
function findColorName(hex) {
  // If exact match
  if (colorNames[hex.toUpperCase()]) {
    return colorNames[hex.toUpperCase()];
  }
  
  // If not exact, we just return the Hex code or "Custom Color" 
  // because doing math for 'nearest color' is too complex for a beginners tutorial code.
  // But to be helpful, let's just say "Lovely Color" or keep it simple.
  
  // Actually, let's at least try some basic detection
  return "Custom Color";
}
