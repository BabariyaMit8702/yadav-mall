
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
            return data.username;
        }catch(e){
            console.log(e);
        }
    }
    
    async function profile_info(its_name) {
        try{
            let access = localStorage.getItem('access');
            
            
            let response = await fetch(`http://127.0.0.1:8000/app/custom-apis/profile-details/`,
                {
                    method:'GET',
                    headers:{
                        'Authorization':'Bearer ' + access,
                        "Content-Type":'application/json'
                    }
                }
            )
            if(!response.ok){
                throw new Error("the new one");
            }
            let data = await response.json();
            
            data.map((p) => 
            {   
                localStorage.setItem('profile_id',p.profile_id);
                
                localStorage.setItem('profile_email',p.email);
                localStorage.setItem('profile_phone_no',p.phone_no);
                localStorage.setItem('profile_address',p.address);
                localStorage.setItem('profile_pic',p.profile_pic);
            }
)
        let email = localStorage.getItem('profile_email');
        let phone_no = localStorage.getItem('profile_phone_no');
        let address = localStorage.getItem('profile_address');
        let pic = localStorage.getItem('profile_pic');    
               
        let pics = document.getElementById('profile_pic_now');
        if(pic !== ""){
        pics.style.backgroundImage = `url(${pic})`;
        }

        let the_email = document.getElementById('theemail');
        let the_address = document.getElementById('theaddress');
        let the_phone = document.getElementById('thephone');

        the_email.innerHTML = email;
        the_address.innerHTML = address;
        the_phone.innerHTML = phone_no;

        let the_name = document.getElementById('myname');
        the_name.innerHTML = its_name;

        }catch(e){
            console.log(e);
        }
        
    }
    
    
    async function exe() {
        let name_now = await get_id();
        await profile_info(name_now);
        }
    exe();
})