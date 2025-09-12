function changes() {
  let ri = document.getElementById('review_input').value;
  let btn = document.getElementById('submitbtn');
  if (ri !== "") {
    btn.style.opacity = '1';
  }else{
    btn.style.opacity = '0.33'
  }
}

document.addEventListener('DOMContentLoaded',async function () {
  async function list() {
    try{
      let response = await fetch('https://yadav-mall-1.onrender.com/app/custom-apis/review/',
        {
          method:'GET',
          headers:{
            'Content-Type':'application/json'
          }
        }
      )
        if(!response.ok){
          throw new Error('the new one');
        }
        let data = await response.json();
        
        let product = document.getElementById('h3').innerText;
        let final_data = data.filter((dt) =>  dt.product_name == `${product}`)
        
        final_data.map((fd) => {
          let ul_access =  document.getElementById('ul_list');
          let spa = document.createElement('span');
          let li = document.createElement('li');
          let hr = document.createElement('hr');
          
          hr.classList.add('the_hr');
          spa.innerText = `User:-  ${fd.user_name}`;
          li.innerText = `Review:- ${fd.the_review}`;
          ul_access.appendChild(hr);
          ul_access.appendChild(spa);
          ul_access.appendChild(li);
        })
        
        
    }catch(e){
      console.log(e);
      
    }
  }
  await list();
 
  
  

})

let add = document.getElementById('form');

add.addEventListener('submit',async function (e) {
    e.preventDefault();
    if(!localStorage.getItem('access')){
      window.location.href = '/app/login/';
      return;
    }
    try{
      let val = document.getElementById('review_input').value;
      let access = localStorage.getItem('access');
      let product = document.getElementById('h3').innerText;
      let user = localStorage.getItem('my_currunt_name');
      let dic = {
        the_review:val,
        user_name:user,
        product_name:product
      }
      let response = await fetch(`https://yadav-mall-1.onrender.com/app/custom-apis/review/`,
        {
          method:'POST',
          headers:{
            'Authorization':'Bearer ' + access,
            'Content-Type':'application/json'
          },
          body:JSON.stringify(dic)
        }
      )
      if(!response.ok){
        throw new Error('the new one');
      }else{
        location.reload();
        
      }
      
      
    }catch(e){
      console.log(e);
      
    }
    
})

