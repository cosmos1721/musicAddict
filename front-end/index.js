document.addEventListener("DOMContentLoaded", function() {
  const loginText = document.querySelector(".title-text .login");
  const loginForm = document.querySelector("form.login");
  const loginBtn = document.querySelector("label.login");
  const signupBtn = document.querySelector("label.signup");
  const signupForm = document.querySelector("form.signup");
  const signupLink = document.querySelector("form .signup-link a");

  signupBtn.onclick = (()=>{
      loginForm.style.marginLeft = "-50%";
      loginText.style.marginLeft = "-50%";
  });

  loginBtn.onclick = (()=>{
      loginForm.style.marginLeft = "0%";
      loginText.style.marginLeft = "0%";
  });

  signupLink.onclick = (()=>{
      signupBtn.click();
      return false;
  });

 // For the signup form submission
signupForm.onsubmit = async (e) => {
  e.preventDefault();
  const email = signupForm.querySelector('input[type="text"]').value;
  const password = signupForm.querySelector('input[type="password"]').value;
  const confirmPassword = signupForm.querySelectorAll('input[type="password"]')[1].value;

  if(password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
  }

  const params = new URLSearchParams({ email, password });

  try {
      const response = await fetch("https://musicaddict.onrender.com/signup?" + params, {
          method: 'POST',
      });

      const data = await response.json(); // Since the response is text
      saveResponseToFile(data); // Save response in a way that's possible in the browser
    } catch (error) {
      console.error("Error during signup:", error);
    }
};

// For the login form submission
loginForm.onsubmit = async (e) => {
  e.preventDefault();
  const email = loginForm.querySelector('input[type="text"]').value;
  const password = loginForm.querySelector('input[type="password"]').value;

  const params = new URLSearchParams({ email, password });

  try {
      const response = await fetch("https://musicaddict.onrender.com/login?" + params, {
          method: 'POST',
      });
      
      const data = await response.json(); // Since the response is text
      saveResponseToFile(data); // Save response in a way that's possible in the browser
  } catch (error) {
      console.error("Error during login:", error);
  }
};

// Function to save data
function saveResponseToFile(data) {
  // Save data to localStorage
  localStorage.setItem('musicAddictResponse', JSON.stringify(data));
}

});