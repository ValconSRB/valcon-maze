const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");

export function checkInputs() {
  const usernameValue = username.value.trim();
  const emailValue = email.value.trim();
  let formCheck = true;

  if (usernameValue === "") {
    setErrorFor(username, "Full name cannot be blank");
    formCheck = false;
  } else {
    setSuccessFor(username);
  }

  if (emailValue === "") {
    setErrorFor(email, "Email cannot be blank");
    formCheck = false;
  } else if (!isEmail(emailValue)) {
    setErrorFor(email, "Not a valid email");
    formCheck = false;
  } else {
    setSuccessFor(email);
  }
  return formCheck;
}

function setErrorFor(input, message) {
  const formControl = input.parentElement;

  // find element and add error message
  const small = formControl.querySelector("small");
  small.innerText = message;
  formControl.className = "form-control error";
}

function setSuccessFor(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

function isEmail(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}
