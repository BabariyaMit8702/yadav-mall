
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
        if(pic !== "" || pic !== null){
        pics.style.backgroundImage = `url(${pic})`;
        }
        if(pic == null){
          pics.style.backgroundImage = `url("https://wallpapers.com/images/hd/user-profile-placeholder-icon-jiv4adftoq5dhj54.png")`;  
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

let dp = document.getElementById('profile_pic_now');
function delete_dp(){
    let full = document.getElementById('custom-model');
    let wraper = document.getElementById('card');
    full.style.display = 'block';
    wraper.style.opacity = '0.3';
}
dp.addEventListener('click',delete_dp)

let cancel = document.getElementById('model-cancel');
function cancel_cb(){
    let full = document.getElementById('custom-model');
    let wraper = document.getElementById('card');
    full.style.display = 'none';
    wraper.style.opacity = '1';
}
cancel.addEventListener('click',cancel_cb)

let ok = document.getElementById('model-ok');
function ok_cb(){
    let the_id = localStorage.getItem('profile_id');
    async function api(id) {
        try{
            let access = localStorage.getItem('access');
            let dic = {
                profile_pic:null
            }
            let response = await fetch(`http://127.0.0.1:8000/app/custom-apis/profile-details/${id}/`,
                {
                    method:'PATCH',
                    headers:{
                        'Authorization':'Bearer ' + access,
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify(dic)
                }
            )
            if(!response.ok){
                throw new Error('the new one');
            }
            let data = await response.json();
            location.reload();            

        }catch(e){
            console.log(e);
        }
    }
    api(the_id);
}
ok.addEventListener('click',ok_cb)
