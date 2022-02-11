const desc = document.getElementById('task_description_input');
const dueDate = document.getElementById('duedate_input');
const dueTime = document.getElementById('duetime_input');
const taskList = document.getElementById('task_list')

function addTask(task, time){

    if (time == false){
        taskList.innerHTML+= `<li id=${task.value}>${task.value}<button class='btn btn-sm btn-outline-danger done' type='button'>Done</button></li>`
    }else{
        const dateObject = new Date(time);
        const due = dateObject.toLocaleString('en-US', { timeZone: 'EST' }).replace('-','/');
        taskList.innerHTML+= `<li id=${task.value}>${task.value}<span class='due'>due ${due} </span><button class='btn btn-sm btn-outline-danger done' type='button'>Done</button></li>`
    }
    

}

function dateAndTimeToTimestamp(dateInputElement, timeInputElement) {
    const dueDate = dateInputElement.valueAsNumber; // Returns the timestamp at midnight for the given date
    const dueTime = timeInputElement.valueAsNumber; // Returns the number of milliseconds from midnight to the time
    

    if(dueDate && dueTime) { // The user specified both a due date & due time
        //Add the timezone offset to account for the fact that timestamps are specified by UTC
        const timezoneOffset =  (new Date()).getTimezoneOffset() * 60 * 1000;
        
        return dueDate + dueTime + timezoneOffset;
    } else {
        // if the user did not specify both a due date and due time, return false
        console.log("hi")
        return false;
    }
}

const add = document.getElementById('add_task');
add.addEventListener("click",()=>{
    addAndDelete();
    
})
desc.addEventListener("keydown",(e)=>{
    if (e.code === "Enter"){
        addAndDelete();
    }
})

function addAndDelete(){
    stamp = dateAndTimeToTimestamp(dueDate,dueTime)
        
    addTask(desc, stamp);
    desc.value = ''
    let del =  document.getElementsByClassName('done');
        
    for (let i =0 ; i<del.length; i++){
        del[i].addEventListener('click', e=>{
            e.currentTarget.parentNode.remove()
        })
    }
    }




