pragma solidity ^0.4.0;

contract Hello {
    address issuer;
    function Hello(){
     issuer = msg.sender; 
    }
    
    string public h = "hello .!!!!!!!!!";

modifier isisuer(){
     if(issuer!=msg.sender){
         throw;
     }
     else{
        _;
     }
}


function getword() constant returns(string){
    return h;
}

function setword(string newWord) isisuer returns(string){
   
    h = newWord;
    return "you are Authorised";
   
}
}