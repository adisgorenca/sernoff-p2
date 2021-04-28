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
  if (mCurrentIndex >= mImages.length) {
        mCurrentIndex = 0;
    }
    if (mCurrentIndex < 0) {
        mCurrentIndex = mImages.length-1;
    }
    document.getELementById('photo').src = mImages[mCurrentIndex].img;
    var location=document.getElementsByClassName("location")[0].innerHTML = "location" + mImages[mCurrentIndex].location;
  	var description=document.getElementByClassName('description')[0].innerHTML = "description" + mImages[mCurrentIndex].description;
    var date=document.getElementByClassName('date')[0].innerHTML= "date" + mImages[mCurrentIndex].date;  	//4. either
	console.log('swap photo');
mLastFrameTime=0;
  mCurrentIndex += 1;
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

function iterateJSON(){
for(x=0; mJSON.images.length; x++)
{
mImages[x] = new GalleryImages();
mImages.location = mJson.images[x].imgLocation;
mImages.description = mJson.images[x].imgDescription;
mImages.date = mJson.images[x].imgDate;
mImages.img = mJson.images[x].imgPath;
}
}
function GalleryImage() {
	//implement me as an object to hold the following data about an image:
	var location;
	var description;
  var date;
  var img;
	//4. either a String (src URL) or an an HTMLImageObject (bitmap of the photo. https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement)
}
