const commonConfig = {
    method: 'GET',
    mode: 'cors',
    redirect: 'follow',
    credentials: "include",
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Cookie': 'Hello'
    }
}

// Travis Head
let headButton = document.getElementById('fetch-btn-head');
headButton.addEventListener('click', (e) => {
    fetch('https://images.pexels.com/photos/2854693/pexels-photo-2854693.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        {...commonConfig, method: 'HEAD', mode: 'no-cors'});
});


// Fetch api methods
let getButton = document.getElementById('fetch-btn-get');

const renderData = (data) => {
console.log(data, renderData);
console. log (data, 'renderData');
let containerEle = document.getElementById('content');
containerEle.innerHTML = '';
data.forEach (ele => {
let itemElement = document. createElement('div');
let idEle = document.createElement('h3');
idEle.innerHTML = ele.id;
let titleEle = document. createElement('p');
titleEle.innerHTML = ele.title;
itemElement.appendChild (idEle);
itemElement.appendChild(titleEle) ;
itemElement.id = ele.id;
itemElement.style.padding = '10px';
itemElement.style.borderBottom = '1px solid black';
containerEle.appendChild(itemElement);

    });
}


getButton.addEventListener('click', (e) => {
    fetch('http://localhost:3000/data', commonConfig)
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        renderData(data.data);
    });

});


// POST 
let postButton = document.getElementById('fetch-btn-post') ;
postButton.addEventListener('click', (e) => {
    e.preventDefault();
    fetch('http://localhost:3000/create/data', {...commonConfig, method: 'POST', body: JSON.stringify({
        userId: 15,
        id: 15,
        title: 'Paul entry',
        completed: false
    }) 
})
.then((res) => res. json ())
.then((data) => {
    console.log(data);
    renderData(data.data) ;
    });
});


//PUT
let putButton = document.getElementById('fetch-btn-put');
putButton.addEventListener ('click', (e) => {
e.preventDefault();
fetch('http://localhost:3000/update/data/8', {...commonConfig, method: 'PUT', body: JSON.stringify({
"userId": 1,
"id": 8,
"title": "New entry",
"completed": false
    }) 
})
.then((res) = res.json())
.then((data) => {
    console.log(data);
    renderData(data.data);
    });
});
  
//DELETE
let deleteButton=document.getElementById('fetch-btn-delete');
deleteButton.addEventListener('click',(e) => {
    e.preventDefault();
    fetch('http://localhost:3000/remove/data/15',{...commonConfig,method:'DELETE'})
    .then((res)=>res.json())
    .then((data)=>{
        console.log(data);
        renderData(data.data);
    });
});