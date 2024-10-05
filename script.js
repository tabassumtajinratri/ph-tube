function getTimeString(time){
   
  const hour = parseInt(time /3600) 
  let remaningSecond = (time%3600)
  const minuete = parseInt(remaningSecond/60) 
  remaningSecond = remaningSecond %60;
  return `${hour} hour ${minuete} min ${remaningSecond} secomd ago`

}

const removeActiveButton=()=>{
  const buttons = document.getElementsByClassName("catagory-btn")
  console.log(buttons)

  for(let btn of buttons){
    btn.classList.remove("active")
  }

}

const loadCatagoryVideos = (id)=>{
  // alert(id)
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res)=> res.json())
    .then((data)=>{

      removeActiveButton()
      const activeBtn =document.getElementById(`btn-${id}`)
      activeBtn.classList.add("active")
      console.log(activeBtn)
      displayVideos(data.category)
    })
    .catch((error) => console.log(error));


}



const loadCatagories =()=>{ //arrow-function
    console.log('load Catagories')
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then((res)=> res.json())
    .then((data)=>displayCatagories(data.categories))
    .catch((error) => console.log(error));
    
}
const loadvideos =(searchText = "")=>{ //arrow-function
    console.log('load Catagories')
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
    .then((res)=> res.json())
    .then((data)=>displayVideos(data.videos))
    .catch((error) => console.log(error));
    
}

const loadDetails = async (videoId) =>{
  console.log(videoId)
  const uri = ` https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`
  const res = await fetch(uri)
  const data = await res.json();
  displayDetails(data.video)

}

const displayDetails=(video)=>{
  console.log(video)
  const detailcontainer = document.getElementById("modal-contant")

  detailcontainer.innerHTML =`

  <img src=${video.thumbnail}>
  <p>${video.description}</p>
  
  
  `

  // document.getElementById('showModalData').click();
  document.getElementById('custom').showModal();
}



const displayVideos =(videos)=>{ //arrow-function
    
    const catagories_video =  document.getElementById("videos")
    catagories_video.innerHTML ='';

    if(videos.length ==0){
      catagories_video.classList.remove("grid")
      catagories_video.innerHTML =`
      
  <div class="min-h-[300px] flex flex-col gap-5 justify-center items-center">
        <img class="" src="icon.png"/>
        <h2>No Content Here in this category</h2>
   </div>
      `;
      return;
    }

    else{
      catagories_video.classList.add("grid")
    }




    videos.forEach((video) => {
        console.log(video)

        const card = document.createElement("div")
        card.classList="card bg-base-100"
        card.innerHTML =`
        
        <figure class="h-[200px] relative">
    <img
      src=" ${video.thumbnail}" class="h-full w-full object-cover"
      alt="Shoes"/>

      ${
        video.others.posted_date?.length == 0? "":` <span class="absolute right-2 bottom-2 bg-black text-white rounded p-1">${getTimeString(video.others.posted_date)}</span>`
      }



     
  </figure>
  <div class="px-0 py-2 flex gap-2"></div>

  <div>

  <img class="w-10 h-10 rounded-full object-cover" src="${video.authors[0].profile_picture}"/>

  </div>

  <h2 class="font-bold">${video.title}</h2>

<div class="flex items-center gap-2">
  <p class="text-gray-400">${video.authors[0].profile_name}</p><br>

  ${video.authors[0].verified==true ? `<img class="w-5" src="https://img.icons8.com/?size=96&id=D9RtvkuOe31p&format=png"/>` :""
  }




 
</div>
  
  <p><button onClick="loadDetails('${video.video_id}')" class="btn btn-sm btn-error">Details</button></p>
    
    </div>
  </div>
        
        
        `
        catagories_video.append(card)

     



        
    });
  
         
  
  
  
          
      
  }






const displayCatagories =(categories)=>{ //arrow-function
  const catagories_container =  document.getElementById("catagories")
    categories.forEach((item) => {
        console.log(item)

        const buttonContainer = document.createElement('div')
        buttonContainer.innerHTML=`
        <button id="btn-${item.category_id}"  onclick="loadCatagoryVideos(${item.category_id})" class="btn catagory-btn">
        ${item.category}
        </button>
        `
       

        catagories_container.append(buttonContainer)
        
    });
}


document.getElementById("search-input").addEventListener("keyup", (e)=>{
  loadvideos(e.target.value)

})

loadCatagories()
loadvideos()