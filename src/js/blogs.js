/*
* @Class: Marco class
* @Param: {String, Array, String}
* @return: {Object}
* @this: Marco
*/
class MarcoBlogs {

  constructor(jsonURL) {

    if(!jsonURL || jsonURL === '') {
      return new Error('URL not found');
    }

    this.jsonURL = jsonURL;

    //call to prefetch
    this.jsonData = this.prefetchJSON(this.jsonURL);

    if(!this.jsonData || this.jsonData === '') {
      return new Error('Missing with the promise object');
    } else {
      console.log("Blogs record found");
    }
  }

  /*
  * @Method: parseString to JSON (Blog entries)
  * @Param: {String} json in string format
  * @return: {JSON}
  * @this: Marco
  */
  parseString(data, arrayName) {
      var parsedData = JSON.parse(data);
      return parsedData[arrayName];
    }


  /*
  * @Method: renderBlog (Blog entries)
  * @Param: {String} json in string format
  * @return: {JSON}
  * @this: Marco
  */
  renderBlog(card) {
    console.log(card);
    // <li class="__row __col-mobile-12 __col-tab-6 __col-desk-3">
    //   <a href="#"><img src="img/b1.jpg" alt="Check out our article on Cooking Perfect Fried Rice in minutes" class="__col-mobile-12 __col-tab-12 __col-desk-12"/></a>
    //   <date class="date mar-left bg-dark-gray text-white text-light text-center __col-mobile-6 __col-tab-6 __col-desk-6">10 Jan 2018</date>
    //   <h3 class="__col-mobile-12 __col-tab-12 __col-desk-12 text-left __col--nest"><a class="text-black" href="#">Cooking Perfect Fried Rice in minutes</a></h3>
    //   <p class="text-light text-gray text-left __col-mobile-12 __col-tab-12 __col-desk-12">inappropriate behavior ipsum dolor sit amet, consectetur.</p>
    //   <p class="text-light text-gray text-left __col-mobile-12 __col-tab-12 __col-desk-12"><span class="flaticon-heart">15 Likes</span> <span class="text-right flaticon-comment">02 Comments</span></p>
    // </li>
    let parent = document.querySelector('#blogParent');
    let template = document.getElementById("blogCard");

    for(let i=0; i<card.length; i++)
    {
      let blogCard = document.importNode(template.content, true);
      let blogImg = blogCard.querySelector('img');
      let blogDate = blogCard.querySelector('date');
      let blogTitle = (blogCard.querySelector('h3')).querySelector('a.text-black');
      let blogContent = blogCard.querySelector('p');
      let blogStats = blogCard.querySelectorAll('span');

      blogImg.src = card[i].img;
      blogImg.alt = "Check out our article on " + card[i].title;
      blogDate.textContent = card[i].date;
      blogTitle.textContent = card[i].title;
      blogContent.textContent = card[i].desc;
      blogStats[0].textContent = card[i].likes + " Likes";
      blogStats[1].textContent = card[i].comments + " Comments";

      parent.appendChild(blogCard);
    }

  }


  /*
  * @Method: renderBlog (Blog entries)
  * @Param: {String} json in string format
  * @return: {JSON}
  * @this: Marco
  */
  renderReview(card) {
    let parent = document.querySelector('#reviewParent');
    let template = document.getElementById("reviewCard");
    let carControl = document.querySelector('#carousel-control');
    let dotNav = document.getElementById("dotNav");

    for(let i=0; i<card.length; i++)
    {
      let reviewCard = document.importNode(template.content, true);
      let dot = document.importNode(dotNav.content, true);
      let uImg = reviewCard.querySelector('img');
      let uName = reviewCard.querySelector('h2');
      let uRate = reviewCard.querySelectorAll('span.flaticon-star');
      let uPos = "star--active";
      let uNeg = "star--inactive";
      let uCmts = reviewCard.querySelector('q');
      let r = 0;

      uImg.src = card[i].img;
      uImg.alt = card[i].name;
      uName.textContent = card[i].name;

      for(r=0; r<card[i].rating; r++)
      {
        uRate[r].classList.add(uPos);
      }

      for(; r<5; r++)
      {
        uRate[r].classList.add(uNeg);
      }

      uCmts.textContent = card[i].cmnt;
      parent.appendChild(reviewCard);
      carControl.appendChild(dot);
    }

  }



  /*
  * @Method: Fetching JSON file through AJAX request
  * @Param: none
  * @return: {promise}
  * @this: Marco
  */
  prefetchJSON (url)  {
    var stat;
    let xhrObj = new XMLHttpRequest();
    xhrObj.open("GET",url,true);
    xhrObj.responseType = 'json';
    xhrObj.send();

    var promise = new Promise((fulfill, reject)=>
    {
      xhrObj.onreadystatechange = function() {
        if(this.readyState === 4 && this.status === 200) {
           stat = "JSON file fetched successfully";
           fulfill([JSON.stringify(xhrObj.response), stat]);
        }
      }
      xhrObj.onerror = function() {
        stat = "JSON file fetching failed";
        reject(stat);
      }
    });
    promise.then(([data, status])=> {
      console.log(status);
      let blogJson = this.parseString(data, "blogs");
      let reviewJson = this.parseString(data, "reviews");
      this.renderBlog(blogJson);
      this.renderReview(reviewJson);
    });
  }
}

new MarcoBlogs('/data/data.json');
