// alert("Linked successfully!");

var buttonColors=["red","blue","green","yellow"];

var gamePattern=[];
var userClickedPattern=[];


var level=0;
var startToggle=false;


$(document).keypress(function(){
    
    if(!startToggle){
        $("#level-title").text("Level "+level);
        nextSequence();
        startToggle=true;
    }
});




$(".btn").click(function(){
    // alert("button clicked");
    
    var userChosenColor=$(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length-1);
    
});



function checkAnswer(currentLevel)
{
    if(gamePattern[currentLevel]==userClickedPattern[currentLevel] ){
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        $("#level-title").text("Game Over , Press Any key to Restart");
        
        
        startOver();
        
    }
    
}



function nextSequence(){
    //reset userClickedPattern array once nextSequence is triggered
    userClickedPattern=[];

    level++;
    $("#level-title").text("Level "+level);
    var randomNumber=Math.random();
    randomNumber=randomNumber*4;
    randomNumber=Math.floor(randomNumber);


    var randomChoosenColor=buttonColors[randomNumber];
    gamePattern.push(randomChoosenColor);

    
    $("#"+randomChoosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChoosenColor);

}


function playSound(name){
    var audio=new Audio("./sounds/"+name+".mp3");
    audio.play();
}


function animatePress(currentColor){
    $("#"+currentColor+"").addClass("pressed");

    setTimeout(function()
    {
        $("#"+currentColor+"").removeClass("pressed");
    },100);
    
}



function startOver()
{
    level=0;
    gamePattern=[];
    startToggle=false;
}















