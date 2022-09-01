// URL Format: https://openapi.programming-hero.com/api/phones?search=${searchText}

// Example: https://openapi.programming-hero.com/api/phones?search=iphone

// Phone detail url:
// URL Format: https://openapi.programming-hero.com/api/phone/${id}

// Example: https://openapi.programming-hero.com/api/phone/apple_iphone_13_pro_max-11089
// 1 Load data using Phone Hunter API


// 2 Display phones and implement search functionality


// 3 Toggle no phone found message based on search result


// 4 Show and hide loading spinner while loading API data

const loadPhones = async(search , dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${search}`
    const res = await fetch(url);
    const data = await res.json();
    display(data.data ,dataLimit)

}
// Load Dta
 const display= (data ,dataLimit) =>{
      const phoneRow = document.getElementById('phone-row');
      phoneRow.textContent =""
      const showAll = document.getElementById('show-all')
      if(dataLimit && data.length >10){
        data = data.slice(0,10);
        showAll.classList.remove('d-none')
      }else{
        
        showAll.classList.add('d-none')
      }
    //   Checking Conditon for array length for saying sorry-
      if(data.length === 0){
        const nothing = document.getElementById('nothing-text')
        nothing.classList.remove('d-none')
      }else{
        const nothing = document.getElementById('nothing-text')
        nothing.classList.add('d-none')
      }

    //   Slice data array for reduce display file
      // data =data.slice(0,6)

    //   itterating for getting each phone and innerhtml
      data.forEach(element => {
       
         const phoneCol = document.createElement('div');
         phoneCol.classList.add('col');
         phoneCol.innerHTML = `<div class="card px-4 py-4">
         <img src="${element.image}" class="card-img-top w-50  " alt="...">
         <div class="card-body">
           <h5 class="card-title">${element.phone_name}</h5>
           <p class="card-textt">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
         </div>
         <button onclick ="phoneDetails('${element.slug}')" type="button" class="btn btn-primary w-50 btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal">
Phone Details
</button>
       </div>`
       
//   append the child to the parent div
       phoneRow.appendChild(phoneCol)
      });
      loadergif(false)
 }

//  Input Button Event Handler for pass searh text
document.getElementById('search-btn').addEventListener('click' ,()=> {
  processSearch(10)
})

// Show all btn functionality

document.getElementById('show-all-btn').addEventListener('click' , ()=>{
    processSearch()
})

const loadergif =(isLoading) =>{
const loader = document.getElementById('loader')
  if( isLoading){
     loader.classList.remove('d-none')
  }else{
    loader.classList.add('d-none')
  }
}

// input addEventListener For enter
document.getElementById('input-field').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    processSearch(10);
  }
});


// Search Function
const processSearch =(datalimit) =>{
  loadergif(true)
  const input = document.getElementById('input-field');
  const searchText = input.value;
  loadPhones(searchText ,datalimit);
  input.value ="";
}

// phone details Function
const phoneDetails = (id) =>{
   const url =`https://openapi.programming-hero.com/api/phone/${id}` 
   fetch(url)
   .then(res => res.json())
   .then(data => showPhoneDetails(data.data))

}
// Phone Details from Api To ui
const showPhoneDetails =(data)=>{
console.log(data)
    const modalTitle =document.getElementById('modals-title');
    const modalBody = document.getElementById('modal-body')
    modalTitle.innerText =data.name;
    modalBody.innerHTML =`
    <p >Brand:${data.brand}</p>
    <p >Release Date:${data.releaseDate}</p>
    <p >Storage:${data.mainFeatures.storage}</p>
    <p >Display:${data.mainFeatures.displaySize}</p>
    <p >Chipset:${data.mainFeatures.chipSet}</p>
    <p >Memory:${data.mainFeatures.memory}</p>
    `
}
// Always load the apple phones first 
loadPhones('apple')


