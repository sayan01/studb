var sbar = document.querySelector('#sbar')
var sbut = document.querySelector('#sbut')
var ssel = document.querySelector('#ssel')
var students = document.querySelector('#students')
db = null

function loadFile(filePath) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", filePath, false);
    xmlhttp.send();
    db = xmlhttp.status == 200 ? xmlhttp.responseText : null;
}

function search(query){
    if(query == "") return db;
    rval = ""
    for(var i = 0; i < dblist.length; i++){
        entry = dblist[i]
        field = entry.split('\t')[ssel.selectedIndex]
        if(field.match(query)){
            rval += dblist[i] + "\n";
        }
    }
    return rval;
}

function searchcallback(){
    query = sbar.value;
    dval = search(query);
    students.innerHTML = dval;
}

loadFile('db/list')
while(db == null){
    setTimeout(loadFile('db/list'),100);
    console.log('db load failed, reloading');
}
console.log('db loaded');
if(db.endsWith('\n'))   db = db.slice(0,db.length-1)
dval = db;
dblist = db.split('\n')
students.innerHTML = dval;

sbut.addEventListener('click', searchcallback);
sbar.addEventListener("keyup", ({key}) => {
    if (key === "Enter") {
        searchcallback()
    }
})