
let tasker ={
    //call funcation
    construct: function(){
        this.selectElement();
        this.bindEvents();
        this.scanList();
      // this.refreshPage();
    },
    //define the elements
selectElement: function(){
   this.clear = document.getElementsByClassName('fa-sync-alt'),
   this.ulList = document.getElementById('list'),
   this.inputField = document.getElementById('input'),
   this.addIcone = document.getElementById('add'),
   this.errorMessage = document.getElementById('error');
   this.textList = this.ulList.children;
},

//function to add to-do list from user
 addTodo:function(){
    let listItem, checkBox, listValue , deleteButton ,trashIcon;
    //creat li elment and add class to it 
    listItem = document.createElement('li');
    listItem.setAttribute('class','task');
    // create input type checkbox elment
    checkBox = document.createElement('input');
    checkBox.setAttribute('type','checkbox');
    // creat list value which come from the input
    listValue = document.createTextNode(this.inputField.value);
    //creat  button to delete items
    deleteButton = document.createElement('button');
    // creat trach icon
    trashIcon = document.createElement('i');
    trashIcon.setAttribute('class','fa fa-trash');
    //insert the trash icone to the button
    deleteButton.appendChild(trashIcon);
    //appand button and checkbox and trash icon to list item <li> checkbox Listvalue  and deletbutton </li>
    listItem.appendChild(checkBox);
    listItem.appendChild(listValue);
    listItem.appendChild(deleteButton);
    //appand li to ul
    this.ulList.appendChild(listItem); 
},
// function for error message
 errorInput:function() {
    this.errorMessage.style.display = 'block';
},
//function to add the new value from user to list
addTask:function(){
    let listValue = this.inputField.value;
    this.errorMessage.style.display = 'none';
    if(listValue == ""){
       this.errorInput();
    } else{
        this.addTodo();
        this.inputField.value = '';
        this.scanList();
    }
    
},
//function to do when the the user click the button enter
 enterKey:function(event){
     if(event.keyCode === 13 || event.which === 13){
        this.addTask();
     }
},
// bind function
bindEvents:function(){
    //add click event to button
    this.addIcone.onclick = this.addTask.bind(this);
    //add enter key to task text box
    this.inputField.onkeypress = this.enterKey.bind(this);
    localStorage.setItem('todo', JSON.stringify(this.ulList))
},
//scan list item
 scanList:function(){
    let taskList , listCheck , listButton;
    //loop through all list item
    for(i = 0 ; i<this.textList.length; i++){
        taskList = this.textList[i];
        listCheck = taskList.getElementsByTagName('input')[0];
        listButton =taskList.getElementsByTagName('i')[0];
          //bind on click event to the checkbox
          listCheck.onclick = this.compeleteTask.bind(this,taskList , listCheck);
          // add click event to the delete button 
          listButton.onclick = this.deleteElement.bind(this , i);
       
    
    }
},
 deleteElement:function(i){
    this.textList[i].remove();
    this.scanList();
},
 compeleteTask:function(taskList,listCheck){
    if(listCheck.checked){
        taskList.className = 'task completed'
    }else{
        this.iscompletedTask(taskList);
    }
},
 incompleteTask:function(taskList){
    taskList.className = 'task';
},
refreshPage: function(){
    //check if data empty or no
    let data = localStorage.getItem('todo');
    if(data){
        ulList = JSON.parse(data)
        let id = ulList.length;
        this.loadList(ulList)

    }else{
        listItem='';
        id= 0
    }
},
loadList: function(array){
     array.forEach(eLement => {
         
         this.eLement.ulList();
         
         
     });
}
};
