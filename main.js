"use strict";

const SCREEN_WIDTH = 400;
const SCREEN_HEIGHT = 400;
const NUM_OF_CELL = 50;
const CELL_SIZE = SCREEN_WIDTH / NUM_OF_CELL;
const FPS = 10;
let canvas;
let context;

window.onload = function(){
    let field = new Array(SCREEN_WIDTH);
    let tempField = new Array(SCREEN_WIDTH);

    for(let i = 0; i < SCREEN_WIDTH; i++){
        field[i] = new Array(SCREEN_HEIGHT);
    }

    for(let i = 0; i < SCREEN_WIDTH; i++){
        for(let j = 0; j < SCREEN_HEIGHT; j++){
            field[i][j] = Math.floor(Math.random()*2);
        }
    }

    canvas = document.getElementById("canvas");
    canvas.width = SCREEN_WIDTH;
    canvas.height = SCREEN_HEIGHT;
    context = canvas.getContext("2d");
    context.fillStyle = "rgb(100, 100, 0)";
    update(field, tempField);
}

function update(field, tempField){
    let existLife = 0;
    tempField = field.slice();
    
    for(let i = 0; i < SCREEN_WIDTH; i++){
        for(let j = 0; j < SCREEN_HEIGHT; j++){
            existLife = 0;
            for(let x = -1; x < 2; x++){
                for(let y = -1; y < 2; y++){
                    if(x == 0 && y == 0) continue;
                    if(i + x < SCREEN_WIDTH && j + y < SCREEN_HEIGHT && 
                       i + x >= 0           && j + y >= 0){
                        if(tempField[i+x][j+y] == 1){
                            existLife++;
                        }
                    }
                }
            }

            if(tempField[i][j] && (existLife == 2 || existLife == 3)){
                field[i][j] = 1;
            }else if(!tempField[i][j] && existLife == 3){
                field[i][j] = 1;
            }else{
                field[i][j] = 0;
            }
        } 
    }
    draw(field);
    setTimeout(update, 1000/FPS, field, tempField);
    
}

function draw(field){
    context.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    for(let i = 0; i < SCREEN_WIDTH; i++){
        for(let j = 0; j < SCREEN_HEIGHT; j++){
            if(field[i][j]) context.fillRect(i * CELL_SIZE, j * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        }
    }
}