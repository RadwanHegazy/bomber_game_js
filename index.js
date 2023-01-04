// catch elements

var user = document.querySelector('.user');
var bomb = document.querySelector('.bomb')
var final = document.querySelector('.final')
var container = document.querySelector('.container');
var points = document.querySelector('.points')


// reactions
var video_container = document.createElement('div')
video_container.className = 'video_cont' ;

var bravo = new Audio('mems/bravo.mp4')

bravo.play()
var video = document.createElement('video')
video.src = 'mems/lose.mp4'
video_container.append(video)

container.appendChild(video_container)

// user settings
let user_top = 0;
let user_left = 0;

// points
let pts = 0;

// bomber settings
let bomb_top = 0;
let bomb_right = 1300 ;

// all Y
var Y = [0,50,100,150,200,250,300,350,400,450,500,550];
var rand = Math.floor(Math.random() * Y.length )

// display
let max_width = screen.width - 100 ;



// Movements functions
function Move (dir){


    // move up
    if (dir == 'w'){
        if (user_top > 0){
            user_top = user_top - 50;
        }
    }
    
    // move down
    if (dir == 's'){
        if (user_top <= 550){
            user_top = user_top + 50;
        }
    }



    user.style.top = user_top + 'px';
    user.style.left = user_left + 'px';
}

document.addEventListener('keypress',key=>{
    Move(key.key)
})



// move the bomber



setInterval(function(){


    
    // write changes
    if (bomb_right > 0 ){
        bomb_right = bomb_right - 50; 
        bomb.style.left =  bomb_right + 'px';
        bomb.style.top = bomb_top + 'px';
    }

},150)


function CreateBombers(){
    
    

    

    var a = Y[Math.floor(Math.random() * Y.length)]
    bomb_right = 1300;
    bomb_top = a;

    
    bomb.style.top = a + "px";
    bomb.style.left = bomb_right + 'px';

        


}

// check if user touch the bomber
setInterval(function (){

    
    var user_dirs = user.getBoundingClientRect()
    var bomb_dirs = bomb.getBoundingClientRect()
    

    if (user_dirs.top == bomb_dirs.top && bomb_dirs.right == user_dirs.right){
        pts++
        points.textContent = pts;
        bravo.play()
        CreateBombers()
    }
    
},1)


video.addEventListener('ended',function(){
    video_container.classList.remove('play')
    CreateBombers()
})

// create new bombers
setInterval(function(){
    
    if (bomb_right == 0){

        // play lose video
        video_container.classList.add('play')
        video.play()

    }
},1)