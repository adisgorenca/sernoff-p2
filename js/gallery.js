// requestAnim shim layer by Paul Irish
    window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       ||
              window.webkitRequestAnimationFrame ||
              window.mozRequestAnimationFrame    ||
              window.oRequestAnimationFrame      ||
              window.msRequestAnimationFrame     ||
              function(/* function */ callback, /* DOMElement */ element){
                window.setTimeout(callback, 1000 / 60);
              };
    })();


// example code from mr doob : http://mrdoob.com/lab/javascript/requestanimationframe/

animate();

var mLastFrameTime = 0;
var mWaitTime = 5000; //time in ms

function animate() {
    requestAnimFrame( animate );
	var currentTime = new Date().getTime();
	if (mLastFrameTime === 0) {
		mLastFrameTime = currentTime;
	}

	if (currentTime - mLastFrameTime) > mWaitTime) {
		swapPhoto();
		mLastFrameTime = currentTime;
	}
}

/************* DO NOT TOUCH CODE ABOVE THIS LINE ***************/

function swapPhoto() {

  if(mCurrentIndex >= mImages.length)
  {
    mCurrentIndex = 0;
  }

  if(mCurrentIndex < 0) {
    mCurrentIndex = mImages.length-1;
  }

  document.getElementById('photo').src = mImages[mCurrentIndex].img;

  var location = document.getElementsByClassName('location')[0];
  location.innerHTML = "Location: " + mImages[mCurrentIndex].location;

  var description = document.getElementsByClassName('description')[0];
  description.innerHTML = "Description: " + mImages[mCurrentIndex].description;

  var date = document.getElementsByClassName('date')[0];
  date.innerHTML = "Date: " + mImages[mCurrentIndex].date;

  mLastFrameTime = 0;
  mCurrentIndex += 1;
	console.log('swap photo');
}

// Counter for the mImages array
var mCurrentIndex = 0

var mJson;

var mUrl = 'images.json';

// XMLHttpRequest variable
var mRequest = new XMLHttpRequest();
function retJson(){

  mRequest.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          mJson = JSON.parse(mRequest.responseText);
          iterateJSON();
      }
  };
  mRequest.open("GET", "images.json", true);
  mRequest.send();
}

// Array holding GalleryImage objects (see below).
var mImages = [];

// Holds the retrived JSON information






// URL for the JSON to load by default
// Some options for you are: images.json, images.short.json; you will need to create your own extra.json later



//You can optionally use the following function as your event callback for loading the source of Images from your json data (for HTMLImageObject).
//@param A GalleryImage object. Use this method for an event handler for loading a gallery Image object (optional).
function makeGalleryImageOnloadCallback(galleryImage) {
	return function(e) {
		galleryImage.img = e.target;
		mImages.push(galleryImage);
	}
}

$(document).ready( function() {
  if(
	retJSON();
	$('.details').eq(0).hide();
});

window.addEventListener('load', function() {

console.log('window loaded');
}, false);

ffunction iterateJSON() {
  for(x = 0; x < mJson.images.length; x++)
  {
    mImages[x] = new GalleryImage();
    mImages[x].location = mJson.images[x].imgLocation;
    mImages[x].description = mJson.images[x].description;
    mImages[x].date = mJson.images[x].date;
    mImages[x].img = mJson.images[x].imgPath;
  }
}

function GalleryImage() {
	var location;
	var description;
	var date;
  var img;
}
