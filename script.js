

document.getElementById('showArticle').addEventListener('click', showArticle);
function showArticle(e) {
    
    var xhttp = new XMLHttpRequest();
    xhttp.open('GET','/products',true);
    xhttp.setRequestHeader('Content-type', 'application/json');
    xhttp.onload= function(){
        if(this.status==200){
            var products = JSON.parse(this.responseText);
            output='';
            for(i in products){
                output +='<tr><td>'+ products[i].id + '</td><td>'+ products[i].name + '</td>'+
                '<td><button type="button" onclick="updateArticle('+products[i].id+')" value="Update">Update</button></td><td><button type="button" value="Deleted" onclick="deleteArticle('+products[i].id+')">Deleted</button></td></tr>';
            }
            document.getElementById('tbodyEl').innerHTML= output;
        }else {
            console.log("Error...");
        }
    }
    xhttp.send();
   // e.preventDefault();
}
document.getElementById('frm').addEventListener('submit', addArticle);
function addArticle(e){
    console.log('Add Article');
var xhttp= new XMLHttpRequest();
xhttp.open('POST', '/products', true);
xhttp.setRequestHeader('Content-Type','application/json');
xhttp.onload= function() {
    if(this.status==200){
        document.getElementById('message').innerHTML=this.responseText;
    }
   
}
var article = document.getElementById('article').value;
xhttp.send(JSON.stringify({name:article}));
document.getElementById('showArticle').click();
e.preventDefault();
}


function updateArticle(id){
var xhttp = new XMLHttpRequest();
var article = prompt("Please modify your article");
xhttp.open('PUT','/products/'+id,true);
xhttp.setRequestHeader('Content-Type','application/json');

xhttp.onload= function(){
    if(this.status==200){
        document.getElementById('message').innerHTML=this.responseText;
    }
}
xhttp.send(JSON.stringify({name:article}));
document.getElementById('showArticle').click();
}

function deleteArticle(id){
    var xhttp = new XMLHttpRequest();
    xhttp.open('delete','/products/'+id, true);
    xhttp.setRequestHeader('Content-type','application/json');

    xhttp.onload= function (){
        if(this.status==200){
            document.getElementById('message').innerHTML=this.statusText;
        }
    }
    xhttp.send();
    document.getElementById('showArticle').click();
}
document.getElementById('showArticle').click();