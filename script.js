/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */
const imageContainer=document.getElementById('image-container');
const loader=document.getElementById('loader');
let ready=false;
let imagesLoaded=0;
let totalImages=0;
let photosArray=[];

const count=30;
const apiKey='Og9-qW57RBuO9NZL2fZ1dAS508ehQigrZUuQ87pWCd4';
const apiUrl=`https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;


//helper function to set attribute
function imageLoaded(){
    console.log(imagesLoaded);
    imagesLoaded++;
    if(imagesLoaded===totalImages){
        ready=true;
        console.log('ready=',ready);
        
    }
}

//display photos
async function displayPhotos(){
    photosArray.forEach((photo) => {
        //create <a> to link to unsplash
        imagesLoaded=0;
        totalImages=photosArray.length;
        console.log('total images=',totalImages);
        const item=document.createElement('a');
        item.setAttribute('href',photo.links.html);
        item.setAttribute('target',`_blank`);
        
        //create <img> for photo
        const img=document.createElement('img');
        img.setAttribute('src',photo.urls.regular);
        img.setAttribute('alt',photo.alt_description);
        img.setAttribute('title',photo.alt_description);
        
        img.addEventListener('load',imageLoaded);
        //put <img> inside <a>, then put both inside imageContainer element
        item.appendChild(img);
        imageContainer.appendChild(item);
        
    });
}
//get photos
async function getPhotos(){
    try{
        const response=await fetch(apiUrl);
        photosArray=await response.json();
        displayPhotos();
        
    }catch(error){
        
    }
}


window.addEventListener('scroll',() => {
   if(window.innerHeight + window.scrollY >= document.body.offsetHeight-1000 && ready){
       //console.log("load more");
       
       
       getPhotos();
       ready=false;
   }
    
});
getPhotos();