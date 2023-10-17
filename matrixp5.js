const fileInput = document.getElementById("fileInput");
const previewImage = document.getElementById("previewImage");
const density = "Ñ@#W$9876543210?!abc;:=-,._M";
let picture;

function setup() {
  console.log("setup function called!");
  noCanvas();
  // Register the mouseClicked event function
  const button = createButton("AsciiButton");
  button.mouseClicked(onAsciiButtonClick);
  console.log(button);
}

console.log("starting script!");

// Define a function to generate ASCII art from the "before" image
function generateAsciiArt(beforeImage) {
  console.log("Generating ASCII art...");
  // Create an off-screen canvas to draw the ASCII art
  const canvas = document.createElement("canvas");
  canvas.width = beforeImage.width;
  canvas.height = beforeImage.height;
  const ctx = canvas.getContext("2d");

  // Draw the "before" image onto the canvas
  ctx.drawImage(beforeImage, 0, 0);

  // Now, you can use the canvas to create ASCII art as before
  const picture = createImage(canvas.width, canvas.height);
  picture.loadPixels();

  // Perform the ASCII art creation here...
  document
    .getElementById("downloadButton")
    .addEventListener("click", function () {
      // Create an SVG element
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
      // Set the width and height of the SVG to match your ASCII art size
      svg.setAttribute("width", picture.width);
      svg.setAttribute("height", picture.height);

      // Create an SVG text element to hold your ASCII art
      const text = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "text"
      );

      text.setAttribute("font-size", "12"); // Set the font size
      text.setAttribute("font-family", "monospace"); // Set the font family

      // Set the text fill color to red
      text.setAttribute("fill", "white");

      // Set the xml:space attribute to "preserve" to ensure spaces are preserved
      text.setAttribute("xml:space", "preserve");

      let maxWidth = 0; // To store the maximum row width
      let totalHeight = 0; // To store the total height for all rows
      let rowWidth = 0;

      for (let y = 0; y < picture.height; y++) {
        let row = "";
        for (let x = 0; x < picture.width; x++) {
          let pixelIndex = (x + y * picture.width) * 4;
          let r = picture.pixels[pixelIndex + 0];
          let g = picture.pixels[pixelIndex + 1];
          let b = picture.pixels[pixelIndex + 2];
          const avg = (r + g + b) / 3;
          const length = density.length;
          const charIndex = floor(map(avg, 0, 255, length, 0));
          const c = density.charAt(charIndex);

          if (c == "M") {
            // Use dot for empty space with reduced alpha.
            row += '<tspan style="opacity: 0.0;">' + c + "</tspan>";
          } else if (c == "") {
            row += " "; // Use a space for empty spaces
          } else {
            row += c;
          }
          rowWidth += 0.1; // Adjust this value to control character width
        }

        totalHeight += 7; // Adjust this value to control line spacing
        const tspan = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "tspan"
        );
        tspan.setAttribute("x", "0"); // Set the X position
        tspan.setAttribute("y", totalHeight); // Set the Y position
        tspan.innerHTML = row; // Set the content of the tspan
        text.appendChild(tspan); // Append the tspan to the text element
      }

      // Set the width and height attributes of the SVG based on maxWidth and totalHeight
      growRatio = totalHeight / picture.height;
      maxWidth = picture.width * growRatio;
      console.log(`growRatio: ${growRatio}`);
      svg.setAttribute("width", maxWidth); // Add extra space for padding
      console.log(`svg maxWidth: ${maxWidth}`);
      svg.setAttribute("height", totalHeight); // Add extra space for padding
      console.log(`svg totalHeight: ${totalHeight}`);

      // Create a black background
      const backgroundRect = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "rect"
      );
      // Set the width and height of the background to make it a squire
      if (maxWidth >= totalHeight) {
        totalHeight = maxWidth;
      } else {
        maxWidth = totalHeight;
      }

      backgroundRect.setAttribute("width", maxWidth);
      console.log(`ending maxWidth: ${maxWidth}`);
      backgroundRect.setAttribute("height", totalHeight);
      console.log(`ending totalHeight: ${totalHeight}`);
      backgroundRect.setAttribute("fill", "black"); // Set the background color to black
      svg.appendChild(backgroundRect); // Append the background to the SVG

      // Append the text element to the SVG
      svg.appendChild(text);

      // Create a Blob from the SVG data
      const blob = new Blob([new XMLSerializer().serializeToString(svg)], {
        type: "image/svg+xml",
      });

      // Create a URL for the Blob
      const blobURL = URL.createObjectURL(blob);

      // Create a new img element to display the SVG
      const svgImage = document.createElement("img");
      svgImage.src = blobURL;

      // Append the SVG image to imageContainer2
      const imageContainer2 = document.getElementById("imageContainer2");
      imageContainer2.innerHTML = ""; // Clear any previous content
      imageContainer2.appendChild(svgImage);

      // Create a download link for the SVG
      const a = document.createElement("a");
      a.href = blobURL;
      a.download = "ascii_art.svg"; // Set the name for the downloaded SVG file

      // Trigger a click event on the download link to initiate the download
      a.click();

      // Clean up by revoking the Blob URL
      URL.revokeObjectURL(blobURL);
    });
}

export function onAsciiButtonClick() {
  console.log("AsciiButton clicked!");
  const previewImage = document.getElementById("previewImage");
  if (previewImage.src !== "") {
    console.log(previewImage.src);
    const beforeImage = new Image();
    beforeImage.src = previewImage.src;
    beforeImage.onload = function () {
      // The "before" image is now fully loaded and can be used
      console.log("Before Image is loaded.");

      // Call the function to generate ASCII art
      generateAsciiArt(beforeImage);
    };
  }
}

fileInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      previewImage.src = event.target.result;
      console.log("Image file loaded");
    };
    reader.readAsDataURL(file);
  }
});

const imageContainer1 = document.getElementById("imageContainer1");

imageContainer1.addEventListener("dragover", (e) => {
  e.preventDefault();
  imageContainer1.classList.add("drag-over");
});

imageContainer1.addEventListener("dragleave", () => {
  imageContainer1.classList.remove("drag-over");
});

imageContainer1.addEventListener("drop", (e) => {
  e.preventDefault();
  imageContainer1.classList.remove("drag-over");
  const file = e.dataTransfer.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      previewImage.src = event.target.result;
    };
    reader.readAsDataURL(file);
  }
});
