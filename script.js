// updating live time and date and day
function updateTime(){
    const date=new Date();
    const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][date.getDay()];
    const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    const hours=date.getHours();
    const min=date.getMinutes();
    const sec=date.getSeconds();
    const currentDay=document.getElementById('day');
    const clock=document.getElementById('clock');
    const timePeriod = hours >= 12 ? 'PM' : 'AM';
    currentDay.textContent= `${dayOfWeek}, ${month} ${day}, ${year}`
    clock.textContent=`${hours}:${min}:${sec} ${timePeriod}`;
}

const setAlarmButton=document.getElementById('set-alarm');
setAlarmButton.addEventListener('click',handleButtonClickPress);
function handleButtonClickPress(event){
    const hours=parseInt(document.getElementById('hours').value);
    const min=parseInt(document.getElementById('min').value);
    const sec=parseInt(document.getElementById('sec').value);
    const timePeriod=document.getElementById('time-period').value;
    // console.log(hours,min,sec);
    if(isNaN(hours)|| isNaN(min) || isNaN(sec) || hours < 0 || hours > 12 || min < 0 || min >= 60 ||sec < 0 || sec >= 60) {
        showNotifications("Please enter valid timer values");
        return;
    }
    const alarmTime=new Date();

    if(timePeriod==='pm'){
        alarmTime.setHours(hours+12);
    }
    
    else{
        alarmTime.setHours(hours);
    }
    alarmTime.setMinutes(min);
    alarmTime.setSeconds(sec);
    addAlarm(alarmTime);
    
}

// array to store alarm objects
let alarmList=[];
const listOfAlarms=document.getElementById('list');

// adding alarm to the list
function addAlarm(alarmTime){
    if(alarmTime){
        console.log("tq",alarmList);
        const newAlarm = {
            id:Date.now().toString(),
            alarmTime: alarmTime,
          };
        alarmList.push(newAlarm);
        console.log("h",newAlarm);
        console.log("h1",newAlarm.alarmTime);
        renderList();
        showNotifications('Alarm added succesfully to the list');
        ringAlarm(newAlarm.alarmTime,newAlarm.id);
        // console.log("h",newAlarm);
        // console.log("h1",newAlarm.alarmTime);
        // console.log("hey",alarmTime);
        return;

    }
    showNotifications('failed to add alarm to the list');
    

}

// alert when the alarm time is up
function ringAlarm(alarmTime,alarmId){
    const currentTime=new Date();
    const timeforAlarm=alarmTime-currentTime;
    if(timeforAlarm>0){
       
        setTimeout(function (){
            const hours=alarmTime.getHours();
            const min=alarmTime.getMinutes();
            const sec=alarmTime.getSeconds();
            alert(`Time Up It's ${hours}:${min}:${sec}sec`);
            deleteAlarm(alarmId);
            
        },timeforAlarm);
    }
}

// rendering the list of alarms
function renderList(){
    listOfAlarms.innerHTML='';
    // console.log("P1",alarmList);
    for(let i=0;i<alarmList.length;i++){
        // console.log("P2",alarmList[i]);
        addAlarmToDOM(alarmList[i]);
    }

}

// adding the alarm item to the DOM
function addAlarmToDOM(alarmItem){
    const li=document.createElement('li');
    // console.log("t1",alarmItem);
    // console.log("t2",alarmItem.alarmTime);
    // console.log("t3",alarmItem.id);
    const alarmItemTime=alarmItem.alarmTime;
    const hours=alarmItemTime.getHours();
    const min=alarmItemTime.getMinutes();
    const sec=alarmItemTime.getSeconds();

    // const deleteButton = document.createElement('img');
    // deleteButton.src = 'bin.png';
    // deleteButton.classList.add('delete');

    // deleteButton.addEventListener('click', function () {
    //     handleDeleteClickPress(alarmItemTime);
    //     console.log("clicked");
    //     // alarmList.removeChild(alarmItem);
    // });
    li.innerHTML=
    `
    <label class="row-data" >${hours}:${min}:${sec}</label>
    <img src="bin1.png" class="delete" data-id="${alarmItem.id}" />

    `;
    // li.appendChild(deleteButton);
    li.querySelector('.delete').addEventListener('click',handleDeleteClickPress);
    listOfAlarms.append(li);
 

}
// const deleteButton=document.getElementById('btn');
// deleteButton.addEventListener('click',handleDeleteClickPress);

function handleDeleteClickPress(event){
    const target=event.target;
    if(target.className==='delete'){
        // const ItemId=target.dataset.id;
        const ItemId=target.getAttribute('data-id');
        deleteAlarm(ItemId);
    } 
}

// deleting the alarm from the list
function deleteAlarm(AlarmListId){
    alarmList=alarmList.filter(function(alarmItem){
       return alarmItem.id !== AlarmListId;
    });
    renderList();
    // showNotifications("alarm deleted succesfully");
}

// funstion to show notifications
function showNotifications(text){
    alert(text);
}

const clearInputsButton = document.getElementById('set-alarm');
clearInputsButton.addEventListener('click', clearInputValues);
clearInputsButton.addEventListener('click', function(){
    clearInputValues();
    document.querySelector(".alarmList").classList.add("show");
    
});

// Clear input values and initialize the input boxes
function clearInputValues() {
    document.getElementById('hours').value = '';
    document.getElementById('min').value = '';
    document.getElementById('sec').value = '';
    document.getElementById('time-period').value = 'am';
}

// Initialize the app and start updating time
function initializeApp(){
    updateTime();
    setInterval(updateTime,1000);
    // document.addEventListener('click',handleDeleteClickPress);
}
initializeApp();









