
document.addEventListener('DOMContentLoaded',function(){
    async function get_id() {
        try{
            let access = localStorage.getItem('access');
            let response = await fetch('http://127.0.0.1:8000/app/custom-apis/user_pk/',
                {
                    method : 'GET',
                    headers:{
                    'Authorization':'Bearer ' + access,
                    'Content-Type':'application/json'
                    }
                }
            )
            if(!response.ok){
                throw new Error('HTTPS!!!' + response.status)
            }
            let data = await response.json();
            return data.id
        }catch(e){
            console.log(e);
        }
    }
    
    async function profile_info(pi) {
        try{
            let access = localStorage.getItem('access');
            let response = await fetch(`http://127.0.0.1:8000/app/custom-apis/profile-details/${pi}/`,
                {
                    method:'GET',
                    headers:{
                        'authorization':'Bearer ' + access,
                        "Content-Type":'application/json'
                    }
                }
            )
            if(!response.ok){
                throw new Error("the new one");
            }
            let data = await response.json();
            console.log(data);
        }catch(e){
            console.log(e);
        }
    }

    async function exe() {
        let my_id = await get_id();        
        await profile_info(my_id);
    }
    exe();
})