const avatar = document.querySelector(".avatar");
const submenuBtn = document.querySelector(".submenu");

let state = false;
avatar.addEventListener("click", () => {

  if (!state) {
    submenuBtn.style.left = -70 + "px";
    state = true;
  } else {
    submenuBtn.style.left = 190 + "px";
    state = false;
  }
});
