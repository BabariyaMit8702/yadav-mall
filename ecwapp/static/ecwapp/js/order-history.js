const user_name =  localStorage.getItem('my_currunt_name');
let header = document.getElementById('user');
header.innerText = `Welcome ${user_name} - Order History`;

document.addEventListener('DOMContentLoaded',async function(){
    const tableBody = document.getElementById("table_body");
    function addOrderRow(items, amount, phone, address, payment) {
    const row = document.createElement("tr");

    row.innerHTML = `
        <td id='items' data-label="Ordered Items">${items}</td>
        <td data-label="Total Amount">${amount}</td>
        <td data-label="Phone No">${phone}</td>
        <td data-label="Address">${address}</td>
        <td data-label="Payment Method">${payment}</td>
    `;

    tableBody.appendChild(row);
}

    try{
        let response = await fetch(`http://127.0.0.1:8000/app/custom-apis/order-history/?name=${user_name}`,
            {
                method:'GET',
            }
        )
        if(!response.ok){
            throw new Error('the new one!');
        }
        let data = await response.json();
        console.log(data);
        data.map((od) => 
            addOrderRow(od.selected_items,od.total_amount,od.phone_no,od.address,od.payment_method)
        );

    }catch(e){
        console.log(e);
    }
});
