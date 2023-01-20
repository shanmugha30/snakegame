
var canvas=document.getElementById('mycanvas')
var score=document.getElementById('score')
//set context to 2d and get height and width of canvas
var cxt=canvas.getContext("2d")
var game_over=false;
width=canvas.width;
height=canvas.height;
//our first task is to create snake 
//next create food for snake
food=foodforSnake();

function snakeInfo(){
    snake={
        //set intiallength of snake and color of snake as well and array
        //basic idea is to traverse through back and push element 
        //Assume cells has 2 atrributes height=x,width=y
        intial_len:5,
        color:"yellow",
        cells:[],
        direction:"right",
        score:0,
        //funciton to create snake and draw snake
        //first time call food fuction here

        createSnake:function(){
            for(let i=this.intial_len-1; i >= 0; i--){
                this.cells.push({x:i,y:0});
            }
        },
        drawSnake:function(){
            for(let i=0; i < this.intial_len; i++){
                cxt.fillStyle=this.color;
                //set values of stroke to represents cells
                cxt.strokeStyle="red";
                cxt.strokeRect(this.cells[i].x*15,this.cells[i].y*15,15,15);
                //x-ordinate for upper left corner ,y-ordinate,
                cxt.fillRect(this.cells[i].x*15,this.cells[i].y*15,15,15);
            }
        },
        //Now task is to update snake funciton based on diretion i.e, right,left,up,bottom
        updateSnake:function(){
            var headX=this.cells[0].x;
            var headY=this.cells[0].y;
            
            if(headX == food.x && headY == food.y){
                this.score++;
                score.innerHTML=this.score;
                this.intial_len++;
                food=foodforSnake();
            }else{
                this.cells.pop();
            }
            if(this.direction == "right"){
                this.cells.unshift({x:headX+1,y:headY});
            }
            else if(this.direction == "down"){
                this.cells.unshift({x:headX,y:headY+1});
            }
            else if(this.direction == "left"){
                this.cells.unshift({x:headX-1,y:headY});
            }
            else if(this.direction == "up"){
                this.cells.unshift({x:headX,y:headY-1});
            }
          var last_x = Math.round(width/5);
          var last_y = Math.round(height/5);
            
         if(this.cells[0].y < 0 || this.cells[0].x < 0|| this.cells[0].x > last_x || this.cells[0].y > last_y){
               alert("GameOver");
               game_over=true;
            }
        },
        
    };
    snake.createSnake();
    //have event listener for handling buttons as keydown and have funciton as keypressed
}


function updateDraw(){
    //we need to clear previous cell that is drawn in canvas and update the cells
    cxt.clearRect(0,0,width,height);
    snake.drawSnake();
    //create food after each update value
    cxt.fillStyle=food.color;
    cxt.fillRect(food.x*15,food.y*15,15,15);
    //and update value
    snake.updateSnake();
    if(game_over == true){
        clearInterval(f);
    }
}

//food funciton -we can create food any where in canvas randomly
function foodforSnake(){
    //height and widht of food should have same size as of snake
    //for which we have to divide with height and width of snake
    var foodX=Math.round(Math.random()*(width-15)/15);
    var foodY=Math.round(Math.random()*(height-15)/15);
    //better to differentiate color of food from snake;
    color=["orange","red","aqua","skyblue","voilet","green","white"]
    var num=Math.round(Math.random()*color.length);
    food={
        x:foodX,
        y:foodY,
        color:color[num],
    };
    return food;
}

snakeInfo();
f=setInterval(updateDraw,200);



function keypressed(e){
    //console.log(e);
    if(e.key == "ArrowUp"){
        snake.direction="up";
    }
    else if(e.key == "ArrowDown"){
        snake.direction="down";
    }
    else if(e.key == "ArrowRight"){
        snake.direction="right";
    }
    else if(e.key == "ArrowLeft"){
        snake.direction="left";
    }
}

document.addEventListener("keydown",keypressed);



