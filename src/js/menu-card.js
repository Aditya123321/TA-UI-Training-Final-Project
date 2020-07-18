/*
* @Class: Marco class
* @Param: {String, Array, String}
* @return: {Object}
* @this: Marco
*/
class Marco {
  /*
  * @Method: class constructor
  * @Param: jsonURL, arrayname and category
  * @return: {none}
  * @this: Marco
  */
  constructor(jsonURL, arrayName, category) {

    if(!jsonURL || jsonURL === '') {
      return new Error('URL not found');
    }
    if(!arrayName || arrayName === '') {
      return new Error('Array Name not found');
    }
    this.arrayName = arrayName;
    this.category = category;
    this.jsonURL = jsonURL;
    //call to prefetch
    this.jsonData = this.prefetchJSON(this.jsonURL,this.arrayName,this.category);
    // this.prefetchJSON(this.jsonURL,this.arrayName,this.category)
    // .then(this.onJSONSuccess).error(()=>{
    //   // Handle the error.
    // });

    // this.filter = [];
    if(!this.jsonData || this.jsonData === '') {
      return new Error('Missing with the promise object');
    } else {
      console.log("Data found");
    }
  }
  /*
  * @Method: filterJSON
  * @Param: {String} json in string format
  * @return: {JSON}
  * @this: Marco
  */
  parseString(data,arrayName) {
    // console.log(arrayName);
    var parsedData = JSON.parse(data);
    // console.log(parsedData[arrayName]);
    return parsedData[arrayName];
  }

  /*
  * @Method: Rendering the cards onload (required cards and images)
  * @Param: json{arrayname},category
  * @return: {none}
  * @this: Marco
  */
  renderAll(all) {
    let parent = document.querySelector('#menuParent');
    let template = document.getElementById("menuCard");
    for(let i=0; i<all['dishes'].length; i++)
    {
      let foodCard = document.importNode(template.content, true);

      let foodTitle = foodCard.querySelector('span')
      let foodPrice = (foodCard.querySelector('h3')).querySelector('span.text-red');
      let foodDesc = foodCard.querySelector('p');

      foodTitle.textContent = all['dishes'][i].title;
      foodPrice.textContent = "$" + all['dishes'][i].price;
      foodDesc.textContent = all['dishes'][i].desc;

      parent.appendChild(foodCard);
  }
  let galleryParent = document.querySelector('#galleryParent');
  let galleryCardTemp = document.getElementById('galleryCard');

  for(let j=0; j<all['dishes'].length; j++) {
    let galleryCard = document.importNode(galleryCardTemp.content, true);

    let galleryImg = galleryCard.querySelector('img');

    galleryImg.src = all['dishes'][j].img;

    galleryParent.appendChild(galleryCard);
  }
}
  /*
  * @Method: AJAX call for fetching JSON
  * @Param: none
  * @return: {promise}
  * @this: Marco
  */
  prefetchJSON (url, arrayName, category)  {
    var stat;
    let xhrObj = new XMLHttpRequest();
    xhrObj.open("GET",this.jsonURL,true);
    xhrObj.responseType = 'json';
    xhrObj.send();


    var promise = new Promise((fulfill, reject)=>
    { // Create a named function, and use it.
    xhrObj.onreadystatechange = function() {
      if(this.readyState === 4 && this.status === 200) {
         stat = xhrObj.response;
         fulfill([JSON.stringify(stat), arrayName, category]);
      }
    }
      xhrObj.onerror = function() {
        stat = "JSON data fetch failed";
        reject(stat);
      }
    });
    promise.then(([stat, arrayName, category])=> {
      let json = this.parseString(stat, arrayName);
      if((arrayName === 'dishes') && (category === 'Breakfast' || category === 'Lunch' || category === 'Dinner' || category === 'Budget' || category === 'Buffet')) {
        this.filterDishes(json,category);
      } else if(category === 'All') {
        this.renderAll(JSON.parse(stat));
      } else if((arrayName === 'gallery') && (category === 'Breakfast' || category === 'Lunch' || category === 'Dinner' || category === 'Budget' || category === 'Buffet')) {
        this.filterGallery(json,category);
      } else { this.renderAll(JSON.parse(stat));
      }
    });
  }
  /*
  * @Method: Rendering the dishes menu card
  * @Param: json{arrayname},category
  * @return: {none}
  * @this: Marco
  */
  filterDishes(json,category) {
    let parent = document.querySelector('#menuParent');
    let template = document.getElementById("menuCard");

    for(let i=0; i<json.length; i++)
    {
      for(let x =0 ; x<(json[i].cat).length; x++){
        if(json[i].cat[x] === category){
        let foodCard = document.importNode(template.content, true);

        let foodTitle = foodCard.querySelector('span')
        let foodPrice = (foodCard.querySelector('h3')).querySelector('span.text-red');
        let foodDesc = foodCard.querySelector('p');

        foodTitle.textContent = json[i].title;
        foodPrice.textContent = "$"+json[i].price
        foodDesc.textContent = json[i].desc;
        parent.appendChild(foodCard);
        }
      }

    }
  }
  /*
  * @Method: Rendering the dishes images menu
  * @Param: json{arrayname},category
  * @return: {none}
  * @this: Marco
  */
  filterGallery(json,category) {
    let galleryParent = document.querySelector('#galleryParent');
    let galleryCardTemp = document.getElementById('galleryCard');
    for(let j=0; j<json.length; j++) {
      for(let x= 0; x<json[j].cat.length; x++) {
        if(json[j].cat[x] === category) {
        let galleryCard = document.importNode(galleryCardTemp.content, true);
        let galleryImg = galleryCard.querySelector('img');
        galleryImg.src = json[j].img;
        galleryParent.appendChild(galleryCard);
        }
      }
    }
  }
  /*
  * @Method: Rendering the usr review
  * @Param: json
  * @return: {none}
  * @this: Marco
  */
  reviewCard(all) {
    let parent = document.querySelector('#reviewParent');
   let template = document.getElementById("reviewCard");

   for(let i=0; i<all['reviews'].length; i++)
   {
     let reviewCard = document.importNode(template.content, true);
     let uImg = reviewCard.querySelector('img');
     let uName = reviewCard.querySelector('h4');
     let uRate = reviewCard.querySelectorAll('span.flaticon-star');
     let uPos = "star--active";
     let uNeg = "star--inactive";
     let uCmts = reviewCard.querySelector('p');
     let r = 0;

     uImg.src = all['reviews'].img;
     uImg.alt = all['reviews'].name;
     uName.textContent = all['reviews'].name;

     for(r=0; r<all['reviews'].rating; r++)
     {
       uRate[r].classList.add(uPos);
     }

     for(; r<5; r++)
     {
       uRate[r].classList.add(uNeg);
     }

     uCmts.textContent = all['reviews'].cmnt;
     parent.appendChild(reviewCard);
   }
  }
}

//binding the event to call the renderAll functionality bu mocking a click onload
window.addEventListener('load', renderAll);

function renderAll() {
  document.getElementsByClassName('active')[0].click();
}

//binding the event to call the filtermenu functionality on click of an item
let menu = document.querySelector(".menu");
menu.addEventListener('click', filterMenu);

function filterMenu(e) {
  let ul = document.getElementById('menuParent');
  let nav = document.getElementsByClassName('menu')[0];
  // .console.log();
  let li = nav.querySelectorAll('li');
  for(let i=0;i<li.length;i++) {
    li[i].classList.remove('active');
  }

  ul.innerHTML = "";
  e.target.classList.add('active');
  new Marco('data/data.json',"dishes",e.target.getAttribute('data-cat'));
}

//binding the event to call the filterGallery functionality on click of an item
let gallery = document.querySelector(".gallery");
gallery.addEventListener('click',filterGallery);

function filterGallery(e) {
  let ul = document.getElementById('galleryParent');
  let nav = document.getElementsByClassName('gallery')[0];
  // .console.log();
  let li = nav.querySelectorAll('li');
  for(let i=0;i<li.length;i++) {
    li[i].classList.remove('active');
  }
  e.target.classList.add('active');
  ul.innerHTML = "";
  new Marco('data/data.json',"gallery",e.target.getAttribute('data-cat'));
}
