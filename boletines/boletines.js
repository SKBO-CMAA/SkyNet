pdfjsLib.GlobalWorkerOptions.workerSrc =
"https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

const boletines = document.querySelectorAll(".boletin");

boletines.forEach(async boletin => {

const url = boletin.dataset.pdf;
const canvas = boletin.querySelector("canvas");
const ctx = canvas.getContext("2d");

const pdf = await pdfjsLib.getDocument(url).promise;
const page = await pdf.getPage(1);

const viewport = page.getViewport({ scale: 1.2 });

canvas.width = viewport.width;
canvas.height = viewport.height;

await page.render({
canvasContext: ctx,
viewport: viewport
}).promise;

/* descarga al hacer clic */
boletin.onclick = () => {

const link = document.createElement("a");
link.href = url;
link.download = "";
link.click();

};

});