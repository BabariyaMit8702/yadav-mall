 let discount = 0;
        function thefunc(mtd) {
            if(mtd=='upi'){
                discount = 5;
            }else{
                discount = 0;
            }
                updatet();
        }


        if (localStorage.getItem('cart') == null) {
            cart = {};
        }
        else {
            fetched_cart = JSON.parse(localStorage.getItem('cart'));
            cart = JSON.stringify(fetched_cart);
            // document.getElementById("citems").innerText = cart
            let table = document.createElement('table');
            table.border = '1';
            table.classList.add('my_table');
            let head = document.createElement('th');
            let header = table.createTHead();
            let headerRow = header.insertRow();
            let th1 = document.createElement('th');
            th1.textContent = 'PRODUCT NAME';
            let th2 = document.createElement('th');
            th2.textContent = 'PRICE';
            let th3 = document.createElement('th');
            th3.textContent = 'QUANTITY';
            headerRow.appendChild(th1);
            headerRow.appendChild(th2);
            headerRow.appendChild(th3);

            for(key in fetched_cart){
                let part = key.split('|| Rs.');
                let prod_name = part[0].trim();
                let prod_price = part[1].trim();
                let prod_quantity = fetched_cart[key];

                let myrow = table.insertRow();
                let cell1 = myrow.insertCell();
                let cell2 = myrow.insertCell();
                let cell3 = myrow.insertCell();
                cell1.textContent = `${prod_name}`;
                cell2.textContent = `${prod_price}`;
                cell3.textContent = `${prod_quantity}`;
            }
            
            document.getElementById("citems").innerHTML = "";
            document.getElementById("citems").appendChild(table);
            document.getElementById("selected_items").value = cart

        }

        let cartData = JSON.parse(localStorage.getItem('cart'));
        function updatet(){
        let total = 0;

        for (let key in cartData) {
            let quantity = cartData[key];

            let parts = key.split('|| Rs. ');
            if (parts.length === 2) {
                let price = parseFloat(parts[1]); // Convert string to float (in case decimal)
                total += price * quantity;
                localStorage.setItem('cart_total', JSON.stringify(total));
            }
                let l_total = JSON.parse(localStorage.getItem('cart_total'));
                if(discount==5){
                    let pers = (l_total * discount) / 100;
                    let fvl = l_total - pers;
                    l_total = fvl;
                }
                document.getElementById('total-price').innerHTML = l_total;
                document.getElementById('total_amount').value = Math.ceil(l_total);
            
        }
    }
    updatet();
               
        $("#sb").click(function () {
            localStorage.removeItem('cart');
            location.reload();
        })

let the_getting_name = (localStorage.getItem('my_currunt_name'));
let the_value_is = document.getElementById('fullname');
the_value_is.value = the_getting_name;
