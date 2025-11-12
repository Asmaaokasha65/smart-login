// Html elements (هيكونوا موجودين حسب الصفحة)
const emailinput = document.getElementById("emailinput");
const passinput = document.getElementById("passinput");
const nameinput = document.getElementById("nameinput");   
const registerBtn = document.getElementById("registerBtn"); 
const loginBtn = document.getElementById("loginBtn");    
const logoutBtn = document.getElementById("logoutBtn"); 
const username = document.getElementById("username");      



// Regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passRegex = /^.{5,}$/; 



// Data


let allData = JSON.parse(localStorage.getItem('allData')) || []; 
function saveAll() {
  localStorage.setItem("allData", JSON.stringify(allData));
}

// ========== Registration ==========


function registerUser() {
  const email = (emailinput?.value || "").trim().toLowerCase();
  const pass = (passinput?.value || "").trim();
  const name = (nameinput?.value || "").trim() || email.split("@")[0];



  // validation
  if (!emailRegex.test(email)) { alert("Please enter a valid email address"); return; }
  if (!passRegex.test(pass)) { alert("Password must be at least 6 characters"); return; }



  // unique email
  const exists = allData.some(u => u.email === email);
  if (exists) { alert("This email is already registered. Please use another email."); return; }



  // save
  allData.push({ email, password: pass, name });
  saveAll();




  // login session + redirect to home
  sessionStorage.setItem("currentUserEmail", email);
  window.location.href = "../pages/home.html";
}





// ========== Login ==========
function loginUser() {
  const email = (emailinput?.value || "").trim().toLowerCase();
  const pass = (passinput?.value || "").trim();

  if (!emailRegex.test(email)) { alert("Please enter a valid email address"); return; }
  if (!passRegex.test(pass)) { alert("Password must be at least 6 characters"); return; }

  const idx = allData.findIndex(u => u.email === email);
  if (idx === -1) { alert("Email is not registered."); return; }

  if (allData[idx].password === pass) {
    sessionStorage.setItem("currentUserEmail", email);

    window.location.href = "pages/home.html";

  } else {
    alert("Incorrect password. Please try again.");
  }
}



// ========== Home  + welcome ==========
function requireAuthAndWelcome() {
  const current = sessionStorage.getItem("currentUserEmail");
  if (!current) {

    window.location.href = "../index.html";
    return;
  }
 
  const user = allData.find(u => u.email === current);
  const name = (user && user.name) || current.split("@")[0];
  if (username) username.textContent = name;
}



// ========== Logout ==========
function logout() {
  sessionStorage.removeItem("currentUserEmail");
  window.location.href = "../index.html";
}




// ========== Wire events (حسب الصفحة) ==========
if (registerBtn) registerBtn.addEventListener("click", function (e) { e.preventDefault(); registerUser(); });
if (loginBtn) loginBtn.addEventListener("click", function (e) { e.preventDefault(); loginUser(); });
if (logoutBtn) logoutBtn.addEventListener("click", function () { logout(); });



// لو احنا في صفحة الهوم، نفعل الحماية وعرض الاسم
if (username) requireAuthAndWelcome();
