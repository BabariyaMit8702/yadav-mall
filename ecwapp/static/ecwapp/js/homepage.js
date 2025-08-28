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

function go_to_cart(){
  let access = localStorage.getItem('access');
  if(access !== null){
      window.location.href = 'showcart/';
  }else{
      window.location.href = 'app/login/';
  }
}


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
      localStorage.clear();
      location.reload();
  }
  // else{
  //   return;
  // }
  } catch (err) {
    console.log(err);
  }
}

async function pic_now() {
  try{
    let access = localStorage.getItem('access');
    let response = await fetch(`http://127.0.0.1:8000/app/custom-apis/profile-details/`,
      {
        method:'GET',
        headers:{
          'Authorization':'Bearer ' + access,
          // 'Content-Type':'application/json'
        }
      }
    )
    if(!response.ok){
      throw new Error('the new one yet')
    }
    let data = await response.json();

    data.map((dp) => {
      localStorage.setItem('homepage_dp',dp.profile_pic);
    })
        

  }catch(e){
    console.log(e);
    
  }
}

document.addEventListener("DOMContentLoaded",async function () {
  const accessToken = localStorage.getItem("access");
  const Btn1 = document.getElementById("lgspin");
  const Btn2 = document.getElementById("lgspup");
  const the_icon = document.getElementById('profile_icon');

  if (isTokenValid(accessToken) == true) {
    Btn1.style.visibility = "hidden";
    Btn2.style.visibility = "hidden";
    the_icon.style.visibility = 'visible';
    
    await pic_now();
    
    let dp_location = localStorage.getItem('homepage_dp');
    
    if(dp_location !== "" && dp_location !=="null"){
    the_icon.style.setProperty("background-image",`url(${dp_location})`,"important")
    the_icon.style.border = '0px white solid';
    the_icon.style.borderRadius = '50%';
    }else{
      the_icon.style.setProperty("background-image",`url("https://static.vecteezy.com/system/resources/previews/010/056/184/non_2x/people-icon-sign-symbol-design-free-png.png")`)
    }
  } else {
    if (isTokenValid(accessToken) == false) {
      Btn1.style.visibility = "visible";
      Btn2.style.visibility = "visible";
      the_icon.style.visibility = 'hidden';
    }else{
      getrefresh(accessToken);
    }
  }

  const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.getElementById('navbarSupportedContent');

    navbarToggler.addEventListener('click', function () {
      if (navbarCollapse.classList.contains('show')) {
        location.reload();
      }
    });
});

