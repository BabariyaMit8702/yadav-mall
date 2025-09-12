
let form = document.getElementById('myform');

form.addEventListener('submit',function(e) {
    e.preventDefault();

    let uname =  document.getElementById('username').value;
    let pass = document.getElementById('password').value;
    
    async function get_tkn() {
    try{
        let response = await fetch('https://yadav-mall-1.onrender.com/app/api/get-access/',
            {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    username : uname,
                    password: pass
                 })
            }
        )
        if(!response.ok){   
            alert('Your data is invalid');
        }else{
        let data = await response.json();
        console.log(data.access);
        console.log(data.refresh);
        localStorage.setItem('access',data.access);
        localStorage.setItem('refresh',data.refresh);
        window.location.href = '/app/profile/';
        }
    }catch(err){
        console.log(err)
    }
}
    get_tkn()
    
})