var Promise = require('promise');
// var readFile = Promise.denodeify(require('fs').readFile);
/*
* @Class: Marco class
* @Param: {String} keyword
* @return: {Object}
* @this: Marco
*/

class Marco {
  constructor (dataURL) {
    if(!dataURL || dataURL === '') {
      return new Error('Missing with the JSON URL');
    }

    this.dataURL = dataURL;

    // Based on promise's accept/reject set the data in a property
    // Else raise an eror
    // this.dataJSON = this.prefetchJSON(this.dataURL);
    this.dataJSON = this.prefetchJSON(this.dataURL);

    // Once you have the data handy, call renderCard()
    if(!this.dataJSON || this.dataJSON === '') {
      return new Error('Missing with the promise object');
    } else {
      renderCard();
    }
  }

  // Make AJAX Call and have the data ready.
  prefetchJSON ()  {
    var stat;
    let xhrObj = new xmlHTTPRequest();
    xhrObj.open("GET",this.dataURL,true);
    xhrObj.send();
    return new Promise((fulfill, reject)=>
    {
      xhrObj.onreadystatechange = function() {
      if(this.readyState == 4 && this.status == 200) {
         stat = "success";
        fulfill(status);
      } else {
        stat = "fail";
        reject(status);
      }
    }
    });

    // readJsonFile: (fileName)=> {
    //   return readFile(fileName, 'utf-8').then((response) => {
    //     return JSON.parse(response);
    //   });
    // }
    // Make an AJAX call with the dataURL
    // Once the data is received
    // return a Promise object
  }

  /*
  * @Method: Filter items based on keyword (e.g. dish name, category etc.)
  * @Param: {String} keyword
  * @return: {Object} Filtered array of dish items
  */
  filterMenuItem(keyword) {
    // Perform filter from this.menuJSON
    // and then do a renderCard()
    this.menuJSON = JSON.parse('')

  }

  /*
  * @Method: Displays a card on the page
  * @Param: {Array} list of filtered or all menu item
  * @return: {null}
  */
  renderCard(items) {
    // Perform filter from this.menuJSON
  }


}

new Marco('/data/data.json');
var obj = new Marco('/data/data.json');



// require(data.json);

// class menuCard {
//   // const cardContainer = "__row pad abc";
//   this.cardItem = "__col-mobile-12 __col-tab-12 __col-desk-6 border-decoration bg-white __menu-list";
//   this.cardHeading = "__col-mobile-10 __col-tab-10 __col-desk-10 no-pad";
//   this.cardPrice = "__col-mobile-2 __col-tab-2 __col-desk-2 text-red";
//   this.cardDescription = "__col-mobile-12 __col-tab-12 __col-desk-12 text-gray";
//   addElements() {
//     var parentElement = document.getElementById('food-menu-nav');
//
//     var li = document.createElement('li');
//     li.classList.add(cardItem);
//
//     for(var i=0; i<dishes.length; i++) {
//       var h4 = document.createElement('h4');
//       h4.classList.add(cardHeading);
//       h4.innerHtml = dishes[i].dish_name;
//       li.appendChild(h4);
//
//       var span = document.createElement('span');
//       span.classList.add(cardPrice);
//       h4.innerHtml = dishes[i].dish_price;
//       li.appendChild(span);
//
//       var p = document.createElement('p');
//       span.classList.add(cardDescription);
//       h4.innerHtml = dishes[i].dish_desc;
//       li.appendChild(p);
//
//       parentElement.appendChild(li);
//     }
//   }
// }
