
let form = document.getElementById('the_form');
form.addEventListener('submit', function (e) {
    e.preventDefault();

    async function put() {
        
        try{
        let pr_id = localStorage.getItem('profile_id');
        let access = localStorage.getItem('access');
        
        let address = document.getElementById('address').value;
        let email = document.getElementById('email').value;
        let phone = document.getElementById('phone').value;
        let the_pic = document.getElementById('profile_pic');

        let formdata = new FormData();
            
        if(address !== ""){
        formdata.append('address',address);
        }
        if(email !== ""){
            formdata.append('email',email);
        }
        if(phone !== ""){
            formdata.append('phone_no',phone);
        }
        if(the_pic.value !== "" || the_pic.value !== null){
            formdata.append('profile_pic',the_pic.files[0]);
        }
        let response = await fetch(`https://yadav-mall-1.onrender.com/app/custom-apis/profile-details/${pr_id}/`,
            {
                method:'PATCH',
                headers:{
                    'Authorization':'Bearer ' + access,
                    // 'Content-Type':'application/json'
                },
                body: formdata
            }
        )
        if(!response.ok){
            throw new Error('the new one generated');
        }

        let data = await response.json();

        window.location.href = '/app/profile/';

        }catch(e){
            console.log(e);
        }
    }

    put();

})

