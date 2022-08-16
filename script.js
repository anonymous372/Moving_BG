const bg = document.querySelector("div")
document.body.style.margin="0";
let bgs = bg.style;
let POINT_COUNT=150;
let pointsArray = [];
let LEVELS = 5
let id = -1;
function generatePoint(x,y,z){
	// console.log(x,y,z);
	const dv = document.createElement("div");
	dv.classList.add("point_mbg")
	dv.style.left=`${x}px`
	dv.style.top=`${y}px`
	dv.style.transform=`scale(${z/10})`
	dv.style.filter=`brightness(${(z+10)/20})`
	bg.appendChild(dv);
	pointsArray.push({elem:dv,x:x,y:y,z:z});
}
function createPoints(){
	let xx=document.body.clientWidth;
	let yy=document.body.clientHeight;

	for(let i=0;i<POINT_COUNT;i++){
		var x = Math.floor(Math.random()*xx);
		var y = Math.floor(Math.random()*yy);
		var z = (Math.floor(Math.random()*LEVELS)+1);
		generatePoint(x,y,z);
	}
}

function correctPointPosition(point, wd,ht){
	const pad = 50
	// Correct X coordinate
	if(point.x<-pad){
		point.x = wd+pad;
		point.y = Math.floor(Math.random()*ht);
		point.z = Math.floor(Math.random()*LEVELS)+1;
		point.elem.style.transform = `scale(${point.z/10})`
		point.elem.style.filter = `brightness(${(point.z+10)/20})`
	} else if(point.x>wd+pad){
		point.x = -pad;
		point.y = Math.floor(Math.random()*ht);
		point.z = Math.floor(Math.random()*LEVELS)+1;
		point.elem.style.transform = `scale(${point.z/10})`
		point.elem.style.filter = `brightness(${(point.z+10)/20})`
	}

	// Correct Y coordinate
	if(point.y<-pad){
		point.y = ht+pad;
		point.x = Math.floor(Math.random()*wd);
		point.z = Math.floor(Math.random()*LEVELS)+1;
		point.elem.style.transform = `scale(${point.z/10})`
		point.elem.style.filter = `brightness(${(point.z+10)/20})`
	} else if(point.y>ht+pad){
		point.y = -pad;
		point.x = Math.floor(Math.random()*wd);
		point.z = Math.floor(Math.random()*LEVELS)+1;
		point.elem.style.transform = `scale(${point.z/10})`
		point.elem.style.filter = `brightness(${(point.z+10)/20})`
	}
}

// Handle movement of mouse
document.onmousemove = function(event)
{
	const speedFactor = 50;
	//Height and Width of Screen
	let wd = document.body.clientWidth;
	let ht = document.body.clientHeight;
	
	// Clear Interval on next mouse move
	if(id!==-1) clearInterval(id);
	let xx = Math.floor(wd/2);
	let yy = Math.floor(ht/2);

	// Calculate mouse position in 2d plane
	// with center of screen as origin
	let mx = event.pageX - xx;
 	let my = event.pageY - yy;

 	// Calculate the speed
 	// using Mouses's distance from origin 
 	let sx = -(mx*speedFactor/xx);
 	let sy = -(my*speedFactor/yy);
 	
 	// console.log(sx,sy);
 	id = setInterval(()=>{
 		for(let i=0;i<POINT_COUNT;i++){
 			//Add speed to the current position
 			pointsArray[i].x += sx/(10-pointsArray[i].z);
 			pointsArray[i].y += sy/(10-pointsArray[i].z);
 			
 			// pointsArray[i].x += sx/(pointsArray[i].z);
 			// pointsArray[i].y += sy/(pointsArray[i].z);

 			// pointsArray[i].x += sx;
 			// pointsArray[i].y += sy;

 			//Correct the current position
 			// if it's out of the screen
 			correctPointPosition(pointsArray[i],wd,ht);
 			
 			pointsArray[i].elem.style.left = `${pointsArray[i].x}px`
 			pointsArray[i].elem.style.top = `${pointsArray[i].y}px`
 		}
 	},10)
}

createPoints();