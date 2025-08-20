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
      localStorage.clear();
      location.reload();
    });
 (function () { 
    let width = window.innerWidth;
    let item = 4;
    if(width<768){
      item = 1;
    }else if(width<992){
      item = 2;
    }else{
      item = 4;
    }
    let url  = new URL(window.location.href);
    if(url.searchParams.get('itm') != item.toString()){
      url.searchParams.set('itm',item);
      window.location.href = url.toString();
    }})();