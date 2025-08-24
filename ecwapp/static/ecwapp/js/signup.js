document.querySelector("form").addEventListener("submit", function (event) {
    const password = document.getElementById("password").value;
    const password2 = document.getElementById("password2").value;
    const errorDiv = document.getElementById("password-error");

    if (password !== password2) {
        event.preventDefault();
        errorDiv.style.display = "block";
    } else {
        errorDiv.style.display = "none";
    }
});

let thedv = document.getElementById('closediv');
let thebtn = document.getElementById('closebtn');

thebtn.addEventListener('click',() => {
    thedv.style.display = 'none';
})