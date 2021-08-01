const invoiceAmt = document.querySelector("#bill-amt");
const cashAmt = document.querySelector("#cash-amt");
const cashGivenDiv = document.querySelector(".cashGivenInput");
const errorDiv = document.querySelector(".errorMsg");
const checkButton = document.querySelector("#check-btn");
const nextButton = document.querySelector("#next-btn");
const noOfNotes = document.querySelectorAll(".notes");
const changeReturnDiv = document.querySelector(".changeReturn");

const notesArray = [2000,500,100,50,20,10,1];

cashGivenDiv.style.display = "none";
changeReturnDiv.style.display = "none";
nextButton.addEventListener("click", validateInput)

function validateInput(params) { 
      hideError();      
      
    if (Number(invoiceAmt.value) > 0) {
        cashGivenDiv.style.display = "block";
    } else {
        displayErrorMsg("Enter the valid amount");
    }
}



checkButton.addEventListener("click", ()=> {
     
    let invoiceAmtValue = Number(invoiceAmt.value);
    let cashAmtValue = Number(cashAmt.value); 

    clearNoOfNotes();
    if(invoiceAmtValue > 0  && cashAmtValue > 0){
        // displayErrorMsg("Bill amount is less than cash given");

        if(invoiceAmtValue < cashAmtValue ){
            changeReturnDiv.style.display = "block";
            calculateChange(invoiceAmtValue,cashAmtValue);
        }else if(invoiceAmtValue == cashAmtValue) {
            displayErrorMsg("No Amount to be returned");
        }

    }else{
        displayErrorMsg("Enter the valid Bill Amount and Cash Given Amount");
    }
    

})



function calculateChange(bill,cash){
  
   let balanceAmt = cash - bill;
   let numberOfNotes = 0;
 
   for (let i = 0; i < notesArray.length; i++) {
       const note = notesArray[i];
       numberOfNotes = Math.floor(balanceAmt/note);
       balanceAmt = balanceAmt % note
       noOfNotes[i].innerText = numberOfNotes; 
       
   }
}

function displayErrorMsg(msg) {
    errorDiv.style.display = "block";
    errorDiv.innerText = msg;
    cashGivenDiv.style.display="none";    
}


function clearNoOfNotes(){
    noOfNotes.forEach( note => {
        note.innerText = "";
    });
}


function hideError() {
    errorDiv.style.display = "none";
}