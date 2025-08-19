if (localStorage.getItem('cart') == null) {
      cart = {};
    }
    else {
      cart = JSON.parse(localStorage.getItem('cart'));
      document.getElementById("cart_calc").innerHTML = Object.keys(cart).length;
    }

    $('.cart').click(function () {
      console.log("clicked");
      var idst = this.id.toString();
      console.log(idst);
      if (cart[idst] != undefined) {
        console.log(cart[idst] = cart[idst] + 1);
      }
      else {
        console.log(cart[idst] = 1);
      }
      console.log(cart);
      localStorage.setItem('cart', JSON.stringify(cart));
      document.getElementById("cart_calc").innerHTML = Object.keys(cart).length;
    });