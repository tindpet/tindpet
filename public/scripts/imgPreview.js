function previewImage(event, idImage) {
  const input = event.target;

  const imgPreview = document.querySelector(idImage);

  if (!input.files.length) return;

  const file = input.files[0];

  const objectURL = URL.createObjectURL(file);

  imgPreview.src = objectURL;
}
