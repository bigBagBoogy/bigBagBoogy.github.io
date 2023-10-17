const fileInput = document.getElementById("fileInput");
const previewImage = document.getElementById("previewImage");
const density = "Ñ@#W$9876543210?!abc;:=-,._M";
let blobURL;

console.log("starting script!");

// Custom map function to map a value from one range to another
function map(value, start1, stop1, start2, stop2) {
  return ((value - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
}

// Define a function to generate ASCII art from the "before" image
function generateAsciiArt(beforeImage) {
  console.log("Generating ASCII art...");
  const canvas = document.createElement("canvas");
  canvas.width = beforeImage.width;
  canvas.height = beforeImage.height;
  const ctx = canvas.getContext("2d");

  ctx.drawImage(beforeImage, 0, 0);

  const picture = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const pixels = picture.data;

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  svg.setAttribute("width", picture.width);
  svg.setAttribute("height", picture.height);

  const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
  text.setAttribute("font-size", "12");
  text.setAttribute("font-family", "monospace");
  text.setAttribute("fill", "white");
  text.setAttribute("xml:space", "preserve");

  let maxWidth = 0;
  let totalHeight = 0;

  for (let y = 0; y < picture.height; y++) {
    let row = "";
    for (let x = 0; x < picture.width; x++) {
      let pixelIndex = (x + y * picture.width) * 4;
      let r = pixels[pixelIndex + 0];
      let g = pixels[pixelIndex + 1];
      let b = pixels[pixelIndex + 2];
      const avg = (r + g + b) / 3;
      const length = density.length;
      const charIndex = Math.floor(map(avg, 0, 255, length, 0));
      const c = density.charAt(charIndex);

      if (c == "M") {
        row += '<tspan style="opacity: 0.0;">' + c + "</tspan>";
      } else if (c == "") {
        row += " ";
      } else {
        row += c;
      }
      maxWidth += 0.1;
    }

    totalHeight += 7;
    const tspan = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "tspan"
    );
    tspan.setAttribute("x", "0");
    tspan.setAttribute("y", totalHeight);
    tspan.innerHTML = row;
    text.appendChild(tspan);
  }

  let growRatio = totalHeight / picture.height;
  maxWidth = picture.width * growRatio;

  svg.setAttribute("width", maxWidth);
  svg.setAttribute("height", totalHeight);

  const backgroundRect = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "rect"
  );
  if (maxWidth >= totalHeight) {
    totalHeight = maxWidth;
  } else {
    maxWidth = totalHeight;
  }
  backgroundRect.setAttribute("width", maxWidth);
  backgroundRect.setAttribute("height", totalHeight);
  backgroundRect.setAttribute("fill", "black");
  svg.appendChild(backgroundRect);

  svg.appendChild(text);

  const blob = new Blob([new XMLSerializer().serializeToString(svg)], {
    type: "image/svg+xml",
  });

  blobURL = URL.createObjectURL(blob);

  const imageContainer2 = document.getElementById("imageContainer2");
  imageContainer2.innerHTML = ""; // Clear any previous content

  // Create an img element to display the SVG
  const svgImage = document.createElement("img");

  // Convert the blob URL to a data URL
  fetch(blobURL)
    .then((response) => response.blob())
    .then((blob) => {
      const reader = new FileReader();
      reader.onload = () => {
        svgImage.src = reader.result;
      };
      reader.readAsDataURL(blob);
    });

  svgImage.style.maxWidth = "100%";
  svgImage.style.maxHeight = "100%";
  svgImage.style.transition = "transform 0.2s"; // Add transition for a smoother effect

  // Add a click event listener to enable zoom on click
  svgImage.addEventListener("click", () => {
    svgImage.classList.toggle("zoomed");
  });

  // Add the img element to the container
  imageContainer2.appendChild(svgImage);
}

const AsciiButton = document.getElementById("AsciiButton");

AsciiButton.addEventListener("click", async () => {
  console.log("AsciiButton clicked!");
  const previewImage = document.getElementById("previewImage");
  if (previewImage.src !== "") {
    console.log(previewImage.src);
    const beforeImage = new Image();
    beforeImage.src = previewImage.src;
    beforeImage.onload = function () {
      console.log("Before Image is loaded.");
      generateAsciiArt(beforeImage);
    };
  } else {
    console.log("No image selected.");
  }
});

fileInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;

      img.onload = () => {
        const maxWidth = 500; // Maximum width for the resized image
        const aspectRatio = img.width / img.height;
        let newWidth, newHeight;

        if (img.width > maxWidth) {
          newWidth = maxWidth;
          newHeight = newWidth / aspectRatio;
        } else {
          // If the image is already smaller than the maximum width, keep its original dimensions
          newWidth = img.width;
          newHeight = img.height;
        }

        const canvas = document.createElement("canvas");
        canvas.width = newWidth;
        canvas.height = newHeight;
        const ctx = canvas.getContext("2d");

        // Draw the image onto the canvas
        ctx.drawImage(img, 0, 0, newWidth, newHeight);

        // Apply contrast to the canvas
        const imageData = ctx.getImageData(0, 0, newWidth, newHeight);
        const data = imageData.data;
        const contrastFactor = 1.5; // Adjust this value to control the contrast

        for (let i = 0; i < data.length; i += 4) {
          data[i] = data[i] * contrastFactor; // Red channel
          data[i + 1] = data[i + 1] * contrastFactor; // Green channel
          data[i + 2] = data[i + 2] * contrastFactor; // Blue channel
        }

        ctx.putImageData(imageData, 0, 0);

        // You can use canvas.toDataURL() to get the resized and contrast-adjusted image as a data URL
        const resizedImageURL = canvas.toDataURL("image/jpeg"); // Change the format if needed

        // Set the resized and contrast-adjusted image as the source for the preview
        previewImage.src = resizedImageURL;
        console.log("Image file loaded, resized, and contrast adjusted");
      };
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
const downloadButton = document.getElementById("downloadButton");
downloadButton.addEventListener("click", () => {
  // Create the "a" element and trigger the download
  const a = document.createElement("a");
  a.href = blobURL;
  a.download = "ascii_art.svg";
  a.click();

  // Revoke the object URL
  URL.revokeObjectURL(blobURL);
});
