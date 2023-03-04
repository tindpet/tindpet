function like(event, petId) {
  fetch(`/pets/${petId}/like`, { method: "POST" })
    .then((res) => res.json())
    .then((data) => {
      const btn = document.getElementById(`btn-like-${petId}`);

      const btnClass = btn.querySelector("#heart").classList.contains("cls-3");

      if (btnClass) {
        btn.querySelector("#heart").classList.replace("cls-3", "cls-1");
      } else {
        btn.querySelector("#heart").classList.replace("cls-1", "cls-3");
      }
    });
}
