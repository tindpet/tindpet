function like(event, petId) {
  fetch(`/pets/${petId}/like`, { method: "POST" })
    .then((res) => res.json())
    .then((data) => {
      event.target; // TODO: modify styles based on data.likes
      console.log(event.target);
    });
}
