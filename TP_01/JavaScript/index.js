////////////////// Obtenez le modal d'inscription ///////////////////////

// Fonction pour gérer la connexion de l'utilisateur
function userInfo() {
  const username = document.getElementById('uname').value;
  const password = document.getElementById('login-psw').value;

  // Récupère le mot de passe stocké en utilisant l'identifiant de l'utilisateur
  const storedPassword = localStorage.getItem('user_' + username);

  if (password && password === storedPassword) {
    localStorage.setItem('currentUser', username);
    document.location = 'accueil.html';
  } else {
    alert("Nom d'utilisateur ou mot de passe incorrect.");
  }
}

// Fonction pour gérer l'inscription de l'utilisateur
function register() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('register-psw').value;
  const passwordRepeat = document.getElementById('psw-repeat').value;

  if (password !== passwordRepeat) {
    alert("Les mots de passe ne correspondent pas.");
    return;
  }

  if (!email || localStorage.getItem('user_' + email)) {
    alert("Un compte avec cet e-mail existe déjà ou l'email est invalide.");
    return;
  }

  localStorage.setItem('user_' + email, password);
  alert("Inscription réussie. Vous pouvez maintenant vous connecter.");
  document.getElementById('id01').style.display = 'none';
}

// Gestion des fenêtres modales pour l'inscription et la connexion
window.onclick = function(event) {
  const modal = document.getElementById('id01');
  const modal2 = document.getElementById('id02');

  if (event.target == modal) {
    modal.style.display = "none";
  } else if (event.target == modal2) {
    modal2.style.display = "none";
  }
}
