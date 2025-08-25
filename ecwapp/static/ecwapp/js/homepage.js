let cart = {};

if (localStorage.getItem('cart') == null) {
  let cart = {};
}
else {
  cart = JSON.parse(localStorage.getItem('cart'));
  document.getElementById("cart_calc").innerHTML = Object.keys(cart).length;
}


$('.cart').click(function () {

  var idst = this.id.toString();


  if (cart[idst] != undefined) {
    cart[idst] = cart[idst] + 1;
  }
  else {
    cart[idst] = 1;
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  document.getElementById("cart_calc").innerHTML = Object.keys(cart).length;
});

let cl = document.getElementById('clear');
cl.addEventListener('click', function () {
  localStorage.removeItem('cart');
  location.reload();
});
(function () {
  let width = window.innerWidth;
  let item = 4;
  if (width < 768) {
    item = 1;
  } else if (width < 992) {
    item = 2;
  } else {
    item = 4;
  }
  let url = new URL(window.location.href);
  if (url.searchParams.get('itm') != item.toString()) {
    url.searchParams.set('itm', item);
    window.location.href = url.toString();
  }
})();

function isTokenValid(token) {
  if (!token) { return false; }
  if (token == null) { return false; }
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp > now) {
      return true;
    } else {
      return '-1';
    }
  } catch (e) {
    return false;
  }
}

async function getrefresh(a_tkn) {
  try {
    let refresh_tkn = localStorage.getItem('refresh');
    if(isTokenValid(refresh_tkn) == true){
    let response = await fetch('http://127.0.0.1:8000/app/api/get-refresh/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ refresh: refresh_tkn })
      }
    )
    if (!response.ok) {
      throw new Error('the errrorsss');
    }
    let data = await response.json();
    localStorage.setItem('access', data.access);
    location.reload();
  }
  if(isTokenValid(refresh_tkn) == '-1'){
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
      location.reload();
  }
  // else{
  //   return;
  // }
  } catch (err) {
    console.log(err);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const accessToken = localStorage.getItem("access");
  const Btn1 = document.getElementById("lgspin");
  const Btn2 = document.getElementById("lgspup");
  const the_icon = document.getElementById('profile_icon');

  if (isTokenValid(accessToken) == true) {
    Btn1.style.visibility = "hidden";
    Btn2.style.visibility = "hidden";
    the_icon.style.visibility = 'visible';
  } else {
    if (isTokenValid(accessToken) == false) {
      Btn1.style.visibility = "visible";
      Btn2.style.visibility = "visible";
      the_icon.style.visibility = 'hidden';
    }else{
       getrefresh(accessToken)
    }
  }
});