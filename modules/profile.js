export function setupUserProfile() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const storedData = localStorage.getItem("userData");

  if (isLoggedIn && storedData) {
    const userData = JSON.parse(storedData);
    const userNameElem = document.querySelector(".user-name");
    const userEmailElem = document.querySelector(".user-email");
    const userAvatarElem = document.querySelector(".user-avatar");

    if (userNameElem) userNameElem.textContent = userData.name;
    if (userEmailElem) userEmailElem.textContent = userData.email;
    if (userAvatarElem) {
      userAvatarElem.style.backgroundImage = `url('${userData.photo}')`;
      userAvatarElem.style.backgroundSize = "cover";
      userAvatarElem.style.backgroundPosition = "center";
    }
  }
  console.log("Ejecutando setupUserProfile()");
}
