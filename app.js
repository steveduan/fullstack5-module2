(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var tobuy=this;
  tobuy.toBuyList = ShoppingListCheckOffService.getItemsToBuy();
  tobuy.buyIt=function (inx){
    try{
        ShoppingListCheckOffService.removeItem(inx);
    }catch(error){
      tobuy.errorMsg="Everything is bought!";
    };
  };
};


AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var bought = this;

  bought.boughtList =  function(){
    
    var boughtItems=ShoppingListCheckOffService.getItemsBought();
    //check the length of the bought list, if there is at least one
    // element in bought list , we let the errorMsg defined!
      if(boughtItems.length <=0){
        bought.errorMsg="Nothing bought yet.";
      }else{
        bought.errorMsg=undefined;
      }
    return boughtItems;
  }
  
 
}


function ShoppingListCheckOffService() {
  var service = this;

  // List of shopping items
  var toBuyItems = [{name:"cookies",quantity:10},
                    {name:"bismol",quantity:20},
                    {name:"cokes",quantity:12},
                    {name:"chips",quantity:11},
                    {name:"burgers",quantity:7},
                    {name:"fishes",quantity:2},
                    {name:"cakes",quantity:5}
                   ];
  var boughtItems = [];
  
  service.removeItem = function (itemIndex) {
     var p=toBuyItems.pop(itemIndex);
     boughtItems.push(p);
     if(toBuyItems.length<=0){
       throw new Error("There is no more items!");
     };
  };

  service.getItemsToBuy = function () {
    return toBuyItems;
  };

  service.getItemsBought = function () {
    return boughtItems;
  }
  
}

})();
