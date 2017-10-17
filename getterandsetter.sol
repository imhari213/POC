pragma solidity ^0.4.0;

contract Hello {
    string public h = "hello .!!!!!!!!!";


function getword() constant returns(string){
    return h;
}

function setword(string newWord) returns(string){
    h = newWord;
    return h;
}
}