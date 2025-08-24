
let form = document.getElementById('myform');

form.addEventListener('submit',function(e) {
    e.preventDefault();

    let uname =  document.getElementById('username').value;
    let pass = document.getElementById('password').value;
    
    async function get_tkn() {
    try{
        let response = await fetch('http://127.0.0.1:8000/app/api/get-access/',
            {
                method: 'POST',
                headers:{
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ 
                    username : uname,
                    password: pass
                 })
            }
        )
        if(!response.ok){   
            throw new Error('login failed');
        }
        let data = await response.json();
        console.log(data.access);
        console.log(data.refresh);
    }catch(err){
        console.log(err)
    }
}
    get_tkn()
    
})