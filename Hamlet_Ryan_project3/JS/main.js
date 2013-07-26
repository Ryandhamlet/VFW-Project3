//Ryan Hamlet
//VFW 1307
//VFW Project 3


//Start when DOM is loaded.

window.addEventListener("DOMContentLoaded", function(){
	
//ID function	
	
	function walk(x){
	var theE = document.getElementById(x);	
		return theE;
		
	}
	
	 

	
// create select field element 
	
	function mCat(){
		var itemCategories = ["All","Auto","Electronics","Clothes","Jewelry","Furniture","Pets","Household","Collectables","Books"];
		var formTag = document.getElementsByTagName("form");// form tag is an array of all form tags
			mSelect = document.createElement("select");
			selectLi = walk("select"),
			
			
			
			mSelect.setAttribute("id", "SearchCategory");
		for(var i=0, c=itemCategories.length; i<c; i++){
			var mOption = document.createElement("option");
			var optText = itemCategories[i];
			mOption.setAttribute("value", optText);
			mOption.innerHTML = optText;
			mSelect.appendChild(mOption);
		}
		selectLi.appendChild(mSelect);
	}

//Find value of selected radio.

	function activeRadio(){
		var cRadio = document.forms[0].condition;
		for(var i = 0; i < cRadio.length; i++){
		  	if(cRadio[i].checked){
				conditionValue = cRadio[i].value;
			}
		}
		
	}

//Finds the value of the checked box	
	
	function activeCheckedbox(){
		if(walk("repostOption").checked){
			repostValue = walk("repostOption").value;
		}else{
			repostValue = "No"
		}
	}

//Turns on and off the view of the displayed or non displayed data.

	function togControls(n){
	switch(n){

//form id , clear data, display link, add new.

		case "on":
			walk("itemApp").style.display = "none";
			walk("clear").style.display = "inline";
			walk("show").style.display = "inline";
			walk("newItem").style.display = "inline";
			break;

//form id, clear data, display link, add new, items.
		
		case "off":
			walk("itemApp").style.display = "block";
			walk("clear").style.display = "inline";
			walk("show").style.display = "inline";
			walk("newItem").style.display = "none";
			walk("items").style.display = "none";
			break;
		default:
			return false;
		}
	}

//Stores the data in the local Storage.	

	function keepData(key){
	if(!key){
		var id           = Math.floor(Math.random()*100000001);
	}else{
		id = key;
	}
	
		activeRadio();
		activeCheckedbox();
	
		var itemNum          = {};
			itemNum.title		 = ["Title: ", walk("title").value];
			itemNum.price		 = ["Price: ", walk("price").value];
			itemNum.category		 = ["Category: ", walk("searchCategory").value];
			itemNum.conditionScale		 = ["Condition Scale: ", walk("condition").value];
			
			itemNum.itemCondition		 = ["Item Condition: ", conditionValue];
			itemNum.repostOption		 = ["Repost Option: ", repostValue];
			
			itemNum.description		 = ["Description: ", walk("description").value];
			itemNum.sellDate		 = ["Sell by date: ", walk("sellDate").value];
			itemNum.email		 = ["Seller Email:", walk("email").value];
		
		localStorage.setItem(id, JSON.stringify(itemNum));
		alert("Item Saved!");
	}

//Displays Data by the click of the link on the page.	
	
	function showData(){
		togControls("on");
		var mDiv = document.createElement("div");
		mDiv.setAttribute("id", "items");
		var mList = document.createElement("ul");
		mDiv.appendChild(mList);
		document.body.appendChild(mDiv);
		
//change to the right section
		
		walk("items").style.display = "block";
		
		for(var i=0, lSl=localStorage.length; i<lSl;i++){
			var mLi = document.createElement("li");
			var liLinks = document.createElement("li");
			mList.appendChild(mLi);
			var key = localStorage.key(i);
			var val =localStorage.getItem(key)
			var thing = JSON.parse(val);
			var mSl = document.createElement("ul");
			mLi.appendChild(mSl);
			for(var g in thing){
				var mSLi = document.createElement("li");
				mSl.appendChild(mSLi);
				var oSt = thing[g][0]+""+thing[g][1];
				mSLi.innerHTML = oSt;
				mSl.appendChild(liLinks);
			}
			mItemLink(key, liLinks); // buttons for eit and delete
		}
		
	}

// Make Item links Function
// Create  the edit and delete links for each stored item when displayed
	
	function mItemLink(key, liLinks){
		var eLink= document.createElement("a");
		eLink.href = "#";
		eLink.key = key;
		var eText = "Edit Item";
		eLink.addEventListener("click", eItem);
		eLink.innerHTML = eText;
		liLinks.appendChild(eLink);
		
// add a line break 
		
		var breakTag = document.createElement("br");
		liLinks.appendChild(breakTag);
	
		
// add delete single Item link
		
		var dLink = document.createElement("a");
		dLink.href = "#"
		dlink.key = key;
		var dText = "Delete Item";
		dLink.addEventListener("click", dItem);
		dLink.innerHTML = dText;
		liLinks.appendChild(dLink);
		
	}

// Allows you to edit the item you have just entered into the LS.	
	
	function eItem(){

// grab the data of item for LS
	
		var value = localStorage.getItem(this.key);
		var itemNum = JSON.parse(value);
		
		togControls("off");
		
		walk("title").value = itemNum.title[1];
		walk("price").value = itemNum.price[1];
		walk("searchCategory").value = itemNum.category[1];
		walk("condition").value = itemNum.conditionScale[1];
		
		var cRadio = document.forms[0].condition;
		for(var i=0; i< cRadio.length; i++){
			if(cRadio[i].value == "New" && itemNum.itemCondition[1] == "New"){
				cRadio[i].setAttribute("checked", "checked");
			}else if(cRadio[i].value == "Used" && itemNum.itemCondition[1] == "Used"){
				cRadio[i].setAttribute("checked", "checked");
			}
		}
		if(itemNum.repostOption[1] == "Yes"){
			walk("repostOption").setAttribute("checked","checked");
		}
		walk("condition").value = itemNum.itemCondition[1];
		walk("sellDate").value = itemNum.sellDate[1];
		
		walk("repostOption").value = itemNum.repostOption[1];  //Repost this is a checkbox

		walk("description").value = itemNum.description[1];
		walk("sellDate").value = itemNum.sellDate[1];
		walk("email").value = itemNum.email[1];
// This changes the submit button to utilize the validation function.
		
		submitButton.removeEventListener("click", keepData);
		var eSubmit = walk("submit");
		eSubmit.addEventListener("click", validation);
		eSubmit.key = this.key;
		
}
	function validation(eventData){

//elements that are being checked.
	var findTitle = walk("title");
	var findPrice = walk("price");
	var findDescription = walk("description");
	var findEmail = walk("email");

//error Reset

eM.innerHTML = " ";


//error message	
	var errM = [];
	//title validation
	if(findTitle.value === " "){
		var titleErr = "Please enter the Title of the post.";
		findTitle.style.border = "2px solid yellow";
		errM.push(titleErr); 
	}
		
	if(findPrice.value === " "){
		var priceErr = "Please enter the price of the item.";
		findPrice.style.border = "2px solid yellow";
		errM.push(priceErr); 
	}
	
	if(findDescription.value === " "){
		var dErr = "Please provide a breif description of your item.";
		findDescription.style.border = "2px solid yellow";
		errM.push(dErr); 
	}
	
	var regE = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
	if(!(regE.exec(findEmail.value))){
		var emailErr = "Please enter a vaild email address.";
		findEmail.style.border = "2px solid yellow";
		errM.push(emailErr); 
	}
		
		if(errM.length >= 1 ){
			for(var i=0, j=errM.length; i < j; i++){
				var tx = document.createElement("li");
				tx.innerHTML = errM[i];
				eM.appendChild(tx);
			}
			eventData.preventDefault();
				return false;
		}else{
		
			keepData(this.key);
		}
		
	}
	function dItem(){
		var wait = confirm(" Do you really want to delete this item?");
		if(wait){
			localStorage.removeItem(this.key);
			alert("The item was Deleted.");
			window.location.reload();
		}else{
			alert("Item was NOT deleted.")
		}
	}
	
	
// Allows you to clear LS.
	
	function cLocal(){
		if(localStorage.length === 0){
			alert("Please complete the applcation.")
		}else{
			localStorage.clear();
			alert("Application Cleared!");
			window.location.reload();
			return false;
		}
	}
	//LOOK
	
	var repostValue = "No",
		conditionValue,
		eM = walk("errorMessages"),
		elink;
		
		//mCat();
		
		 
	//Click Events
   
    var clearData = walk("clear");
	clearData.addEventListener("click", cLocal);
	
	var submitButton = walk("submit");
	submitButton.addEventListener("click", validation);
	
	var dlink = walk("show");
	dlink.addEventListener("click", showData);
	

	
		
	
});