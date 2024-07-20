export const downloadAsJPG = (svgImage: any, fileName: string) => {
  const canvas: HTMLCanvasElement = document.createElement("canvas");
  canvas.width = 1000; // Adjust according to your SVG size
  canvas.height = 1000;

  // Step 2: Get the SVG content and create an Image element
  const svgBlob: Blob = new Blob([svgImage], {
    type: "image/svg+xml;charset=utf-8",
  });
  const url: string = URL.createObjectURL(svgBlob);

  const img: HTMLImageElement = new Image();
  img.onload = function () {
    // Step 3: Draw the SVG image onto the canvas
    const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(img, 0, 0);

      // Step 4: Convert the canvas to a data URL and download
      canvas.toBlob(function (blob) {
        if (blob) {
          const url: string = URL.createObjectURL(blob);

          // Step 5: Create a link element and trigger download
          const a: HTMLAnchorElement = document.createElement("a");
          a.style.display = "none";
          a.href = url;
          a.download = fileName;
          document.body.appendChild(a);
          a.click();

          // Step 6: Clean up
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);
        }
      }, "image/jpeg");
    }
  };
  // Load the SVG into the Image element
  img.src = url;
};
