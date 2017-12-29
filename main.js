"use strict";

//定数
const SCREEN_WIDTH = 200;
const SCREEN_HEIGHT = 200;
const NUM_OF_CELL = 20;
const CELL_SIZE = SCREEN_WIDTH / NUM_OF_CELL;
const FPS = 10;

//
let canvas;
let context;

//load
window.onload = function(){
    //init field
    let field = new Array(NUM_OF_CELL);
    let tempField = new Array(NUM_OF_CELL);

    for(let i = 0; i <NUM_OF_CELL; i++){
        field[i] = new Array(NUM_OF_CELL);
        tempField[i] = new Array(NUM_OF_CELL);
    }
    

    for(let i = 0; i < NUM_OF_CELL; i++){
        for(let j = 0; j < NUM_OF_CELL; j++){
            field[i][j] = Math.floor(Math.random()*2);

            //テスト用
            //field[i][j] = j % 2;
        }
    }

    //init canvas
    canvas = document.getElementById("canvas");
    canvas.width = SCREEN_WIDTH;
    canvas.height = SCREEN_HEIGHT;
    context = canvas.getContext("2d");
    context.fillStyle = "rgb(100, 100, 0)";
 
    update(field, tempField);
    
}

//更新部分
function update(field, tempField){
    calc(field, tempField);
    draw(field);
    setTimeout(update, 1000/FPS, field, tempField);
}

//ロジック部分
function calc(field, tempField){
    let existLife = 0;
    tempField = field.slice();
    console.log(tempField == field);
    for(let i = 0; i < NUM_OF_CELL; i++){
        for(let j = 0; j < NUM_OF_CELL; j++){
            existLife = 0;
            for(let x = -1; x < 2; x++){
                for(let y = -1; y < 2; y++){
                    if(x == 0 && y == 0) continue;
                    if(0 <= i + x && i + x < NUM_OF_CELL && 0 <= j + y && j + y < NUM_OF_CELL){
                        if(tempField[i+x][j+y] == 1)existLife++;
                    }
                }
            }

            if(tempField[i][j] == 1 && (existLife == 2 || existLife == 3)){
                field[i][j] = 1;
            }else if(tempField[i][j] == 0 && existLife == 3){
                field[i][j] = 1;
            }else{
                field[i][j] = 0;
            }
        } 
    }
}

//描画部分
function draw(field){
    context.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    for(let i = 0; i < NUM_OF_CELL; i++){
        for(let j = 0; j < NUM_OF_CELL; j++){
            if(field[i][j]) context.fillRect(i * CELL_SIZE, j * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        }
    }
}