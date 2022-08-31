// URL Format: https://openapi.programming-hero.com/api/phones?search=${searchText}

// Example: https://openapi.programming-hero.com/api/phones?search=iphone

// Phone detail url:
// URL Format: https://openapi.programming-hero.com/api/phone/${id}

// Example: https://openapi.programming-hero.com/api/phone/apple_iphone_13_pro_max-11089
// 1 Load data using Phone Hunter API


// 2 Display phones and implement search functionality


// 3 Toggle no phone found message based on search result


// 4 Show and hide loading spinner while loading API data

const loadPhones = async(search) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${search}`
    const res = await fetch(url);
    const data = await res.json();
    display(data.data)

}
// Load Dta
 const display= (data) =>{
      const phoneRow = document.getElementById('phone-row');
      phoneRow.textContent =""

    //   Checking Conditon for array length for saying sorry
      if(data.length === 0){
        const nothing = document.getElementById('nothing-text')
        nothing.classList.remove('d-none')
      }else{
        const nothing = document.getElementById('nothing-text')
        nothing.classList.add('d-none')
      }

    //   Slice data array for reduce display file
      data =data.slice(0,6)

    //   itterating for getting each phone and innerhtml
      data.forEach(element => {
        console.log(element)
         const phoneCol = document.createElement('div');
         phoneCol.classList.add('col');
         phoneCol.innerHTML = `<div class="card px-4 py-4">
         <img src="${element.image}" class="card-img-top w-50 ms-5 " alt="...">
         <div class="card-body">
           <h5 class="card-title">${element.phone_name}</h5>
           <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
         </div>
       </div>`
//   append the child to the parent div
       phoneRow.appendChild(phoneCol)
      });
 }

//  Input Button Event Handler for pass searh text
document.getElementById('search-btn').addEventListener('click' ,()=> {
    const input = document.getElementById('input-field');
    const searchText = input.value;
    loadPhones(searchText);
    input.value =""
})
