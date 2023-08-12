
const form = document.getElementById("form");
const content = document.querySelector("#content");
const container = document.querySelector(".container");
console.log( content);
let newCountry=document.getElementById("input-country");
form.addEventListener("submit", searchCountry);

function searchCountry(e){
     e.preventDefault();
    let countryName= newCountry.value.trim();
  //  console.log(countryName)
showInfoCountry(countryName)
}
async function showInfoCountry(countryName){
    try{
    let response = await fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`);
    if (response.status == 200) {
        content.innerHTML=""
        container.classList.replace("mt-52","mt-8")
        //container.classList.remove("mt-52")
        //container.classList.add("mt-24")
        let infoCounty = await response.json();
        return  content.append(test(infoCounty));
      }
    
     
    // console.log(response.status);
    throw new Error(response.status);
   
    
}
catch(err){
    //console.log(err.response.status);
    // if (err.response.status == 404) {
    //     alert("No such user, please reenter.");
      
    //   } else {
       // alert(err);
     // }
     if(err==404)
     {
       
        alert(err +"insert your country correctly"); 

     }
    alert(err); 

}

}
 
function test(infoCounty){
    // container.lastElementChild.innerHTML=""
    return El({
        element:'div',
        className:'',
        child:[
            El({
                element:'div',
                className:'text-center flex flex-col gap-2 justify-center items-center',
                child:[
                    El({
                        element:'img',
                        className:'',
                        src:`${infoCounty[0].flags.png}`
                       // child:''

                    }),
                    El({
                        element:'span',
                        className:'',
                        child:`${infoCounty[0].capital[0]}`

                    }),
                ]
            }),
            El({
                element:'div',
                className:'flex flex-col gap-2',
                child:[
                    El({
                        element:'div',
                        className:'flex flex-col gap-2',
                        child:[
                            El({
                                element:'p',
                                className:'',
                                child:[
                                    "Capital:",
                                    El({
                                        element:'span',
                                        className:'text-gray-600',
                                        child:`${infoCounty[0].capital[0]}`
                                    })
                                ]
                            }) 
                        ]
                    }),
                    El({
                        element:'div',
                        className:'flex flex-col gap-2',
                        child:[
                            El({
                                element:'p',
                                className:'',
                                child:[
                                    "Continent:",
                                    El({
                                        element:'span',
                                        className:'text-gray-600',
                                        child:`${infoCounty[0].continents[0]}`
                                    })
                                ]
                            }) 
                        ]
                    }),
                    El({
                        element:'div',
                        className:'flex flex-col gap-2',
                        child:[
                            El({
                                element:'p',
                                className:'',
                                child:[
                                    "Popoulation:",
                                    El({
                                        element:'span',
                                        className:'text-gray-600',
                                        child:`${infoCounty[0].population}`
                                    })
                                ]
                            }) 
                        ]
                    }),
                    El({
                        element:'div',
                        className:'flex flex-col gap-2',
                        child:[
                            El({
                                element:'p',
                                className:'',
                                child:[
                                    "Currency:",
                                    El({
                                        element:'span',
                                        className:'text-gray-600',
                                        child:returnValue(infoCounty[0].currencies)
                                    })
                                ]
                            }) 
                        ]
                    }),
                    El({
                        element:'div',
                        className:'flex flex-col gap-2',
                        child:[
                            El({
                                element:'p',
                                className:'',
                                child:[
                                    "Common Language:",
                                    El({
                                        element:'span',
                                        className:'text-gray-600',
                                       // child:returnValue(infoCounty[0].languages)
                                        child: languages(infoCounty[0].languages)
                                    })
                                ]
                            }) 
                        ]
                    }), 
                ]
            }),
            
        ]
         
    })

}


const El = ({ element,child,restAttrs, ...rest }) => {
    const el = document.createElement(element);
    //console.log(rest)
    for (const key in rest) {
      el[key] = rest[key];
    }
    for (const key in restAttrs) {
     el.setAttribute(key, restAttrs[key])
    }
  
    if (child && Array.isArray(child)) {
     
     el.append(...child)
  
    } else if (child) {
      el.append(child)
    }
    
    return el
  }
function languages(objectLanguages){
    console.log(objectLanguages);
    let arrayLang=[]
    for(let item in objectLanguages)
    {
        arrayLang.push(objectLanguages[item])  
    }
    console.log(arrayLang);
      return arrayLang.toString()

}
function returnValue(objectItem){
    console.log('objectItem');
    console.log(objectItem);
    let arrayItem=[]
    let arrayItem2=[]
       console.log("ghabl");
       console.log(objectItem);
    for(let item in objectItem)
    {
        arrayItem.push(objectItem[item])  
    }
console.log(arrayItem);
console.log(arrayItem[0]);
    for(let item in  arrayItem[0])
    {
        arrayItem2.push( arrayItem[0][item])  
    }
    console.log("currency");
      return arrayItem2.join('-')

}
function returnValue2(objectItem){
    console.log('objectItem');
    console.log(objectItem);
    let arrayItem=[]
    
    for(let item in objectItem)
    {
        arrayItem.push(objectItem[item])  
    }
    
      return arrayItem.toString()

}

