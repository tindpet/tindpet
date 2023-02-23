function previewImage(event, idImage) {  
  const input = event.target;
  if (!input.files.length) return;
  
  const file = input.files[0];
  const objectURL = URL.createObjectURL(file);
  
  const imgPreview = document.querySelector(idImage);
  imgPreview.src = objectURL;
}
