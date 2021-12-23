var localDisplay=document.getElementById('ls');
var sessionDisplay=document.getElementById('ss');

if(localStorage.getItem('Local')==null){
    localStorage.setItem('Local',0);
    localDisplay.textContent='0';
}else{
    localDisplay.textContent=localStorage.getItem('Local');
}

if(sessionStorage.getItem('Session')==null){
    sessionStorage.setItem('Session',0);
    sessionDisplay.textContent='0';
}
else{
    sessionDisplay.textContent=sessionStorage.getItem('Session');
}

var localStorageBtn=document.getElementById('localStorageadd');
var sessionStorageBtn=document.getElementById('sessionStorageadd');


localStorageBtn.addEventListener('click',()=>{
let currentLS=localStorage.getItem('Local');
currentLS++;
localStorage.setItem('Local',currentLS);
localDisplay.textContent=currentLS;
});

sessionStorageBtn.addEventListener('click',()=>{
    let currentSS=sessionStorage.getItem('Session');
    currentSS++;
    sessionStorage.setItem('Session',currentSS);
    sessionDisplay.textContent=currentSS;
})


var deleteLS=document.getElementById('deleteLocal');
var deleteSS=document.getElementById('deleteSession');


deleteLS.addEventListener('click',()=>{
    localStorage.setItem('Local',0);
    localDisplay.textContent='0';
})

deleteSS.addEventListener('click',()=>{
    sessionStorage.setItem('Session',0);
    sessionDisplay.textContent='0';
})