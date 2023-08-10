const inputPassword = document.querySelector("#password");

inputPassword.addEventListener("keypress", () => {
  inputPassword.type = "text";

  setTimeout(() => {
    inputPassword.type = "password";
  }, 500);
});
