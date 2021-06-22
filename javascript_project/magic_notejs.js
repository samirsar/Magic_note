console.log("hii");

shownnote();
var title=[];
document.querySelector("#add_new_note").addEventListener("click",function()
{
  
  let text_area=document.querySelector("#text_area");
  let add_title=document.querySelector("#add_title");
  if((add_title.value).length==0)
  add_title.value="unknown";


  let notes=localStorage.getItem("notes");
  if(notes==null)
  noteobj=[];
  else
  noteobj=JSON.parse(notes);
  //now noteobj is array of object
 let myobj={
   title:add_title.value,
   yaade:text_area.value
 }
  noteobj.push(myobj);
  localStorage.setItem("notes",JSON.stringify(noteobj));
  text_area.value="";
  add_title.value="unknown";
  console.log(noteobj);
  shownnote();




})

function shownnote()
{

  let notes=localStorage.getItem("notes");
  if(notes==null)
  nodeobj=[];
  else
  nodeobj=JSON.parse(notes);

  let html="";
  nodeobj.forEach(function(element,index){
  html+=` <div class="notecard">
  <div class="card-header">
    My note
  </div>
  <div class="card-body">
    <h5 class="card-title"> ${element.title}</h5>
    
    <div class="add_note">
    <p class="card-text">${element.yaade}</p>
    <button id="${index}" onclick="deleteNote(${index})" class="btn btn-primary">Delete note</button>
    <button    onclick="Edit(${index})" class="btn btn-primary">Edit</button>
    </div>

  </div>
</div>`;
  })
  let note_col=document.querySelector(".demo");
  if(nodeobj.length!=0)
  note_col.innerHTML=html;
  else
  note_col.innerHTML="kuchh to likh bhaii";

  
}

function deleteNote(index)
{
  let notes=localStorage.getItem("notes");
  if(notes==null)
  noteobj=[];
  else
  noteobj=JSON.parse(notes);

  noteobj.splice(index,1);

  localStorage.setItem("notes",JSON.stringify(noteobj));
  shownnote();
}


// Now for searchin element in search bar 

let searchtext=document.querySelector(".form-control");
searchtext.addEventListener("input",function(){
  let inputval=searchtext.value.toLowerCase();
  let notecard=document.getElementsByClassName("notecard");
  // console.log(notecard);
  let count=0;
  Array.from(notecard).forEach(function(element){
    let cardtext=element.getElementsByTagName("p")[0].innerText;
    // console.log(cardtext);
    if(cardtext.includes(inputval))
    {
      element.style.display="block";
    }
    else
    {
      element.style.display="none";
      count++;
      

    }
  })
  // if(count==notecard.length)
  // confirm("kuchh nahi mila");

})

// code for edit note 
function Edit(index)
{
  let notecard=document.getElementsByClassName("notecard");
  let edit=notecard[index].getElementsByTagName("p")[0];
  let text=edit.innerText;
  // console.log(text);
  edit.innerHTML=`<textarea id="text_area" name="w3review" rows="4" cols="50">
  ${text}
  </textarea>`;
  let p=edit.querySelector("#text_area");
  p.addEventListener("blur",function(){
    edit.innerText=p.value;
    let notes=localStorage.getItem("notes");
    if(notes==null)
    noteobj=[];
    else
    noteobj=JSON.parse(notes);

    noteobj[index]=p.value;
    localStorage.setItem("notes",JSON.stringify(noteobj));
  })
  
  
}