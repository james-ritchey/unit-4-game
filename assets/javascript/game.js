$(document).ready(function() {


var sledge = {
    name: "Sledge",
    image: "assets/images/sledge.png",
    health: 100,
    baseAP: 12,
    attackPower: 12,
    counterAP: 12,
}

var ash = {
    name: "Ash",
    image: "assets/images/ash.png",
    health: 137,
    baseAP: 24,
    attackPower: 24,
    counterAP: 24,
}

var blitz = {
    name: "Blitz",
    image: "assets/images/ash.png",
    health: 125,
    baseAP: 18,
    attackPower: 18,
    counterAP: 18,
}

var gameManager = {
    characters: [ash, sledge, blitz],
    characterDivs: [],
    playerCharacter: null,
    playerCharacterDiv: null,
    characterSelected: false,
    defenders: [],
    selectedCharacter: null,
    selectedCharacterDiv: null,
    fighting: false,
    gameEnd: false,
    wins: 0,

    startGame: function() {
        for(var i = 0; i < this.characters.length; i++) {
            $("#characters").append(this.createCharacter(this.characters[i]));
        }
    },

    createCharacter: function(c) {
            var newDiv = $("<div>");
            newDiv.attr("id", c.name);
            newDiv.addClass("character");
            newDiv.append("<p>" + c.name + "</p>")
            newDiv.append("<img src= " + c.image + " height='200px'>");
            newDiv.append("<p id='" + c.name.toLowerCase() + "-health'>" + c.health + "</p>");
            this.characterDivs.push(newDiv);
            return newDiv;
    },

    selectCharacter: function(c) {
        if(($(c).attr("id") !== $(this.playerCharacterDiv).attr("id")) &&
            ($(c).attr("id") !== $(this.selectedCharacterDiv).attr("id") && !this.fighting)){
            for(var i = 0; i < this.characters.length; i++) {
                if($(c).attr("id") === $(this.characterDivs[i]).attr("id")) {
                    this.selectedCharacterDiv = this.characterDivs[i];
                    this.selectedCharacter = this.characters[i];
                }
            }
            console.log(this.selectedCharacter);
        }
    },

    choosePlayer: function() {
        var characterIndex = this.characterDivs.indexOf(this.selectedCharacterDiv);
        for(var i = 0; i < this.characters.length; i++) {
            if(i !== characterIndex) {
                this.defenders.push(this.characterDivs[i]);
            }
            else {
                this.playerCharacterDiv = this.characterDivs[i];
                this.playerCharacter = this.characters[i];
            }
        }
        this.selectedCharacter = null;
        console.log("Player: " + this.playerCharacter.name);
        console.log("Defenders: " + this.defenders);
        $("#player-character").append(this.playerCharacterDiv);
        for(var i = 0; i < this.defenders.length; i++) {
            $("#defenders").append(this.defenders[i]);
        }
    },

    chooseDefender: function() {
        this.fighting = true;
        $("#opponent").append(this.selectedCharacterDiv);
        $("#opponent-name").text(this.selectedCharacter.name);
    },

    fight: function() {
        this.playerCharacter.health -= this.selectedCharacter.counterAP;
        this.selectedCharacter.health -= this.playerCharacter.attackPower;
        this.playerCharacter.attackPower += this.playerCharacter.baseAP;
        if(this.playerCharacter.health < 0) {this.playerCharacter.health = 0;}
        if(this.selectedCharacter.health < 0) {this.selectedCharacter.health = 0;}
        $("#" + this.selectedCharacter.name.toLowerCase() + "-health").text(this.selectedCharacter.health);
        $("#" + this.playerCharacter.name.toLowerCase() + "-health").text(this.playerCharacter.health);
        $("#player-damage").text(this.playerCharacter.attackPower);
        $("#defender-damage").text(this.selectedCharacter.counterAP);
        if(this.playerCharacter.health <= 0) {
            this.lose();
        }
        if(this.selectedCharacter.health <= 0) {
            this.defeatOpponent();
        }
    },

    defeatOpponent: function() {
        $(this.selectedCharacterDiv).css("display", "none");
        $("#defenders").append(this.selectedCharacterDiv);
        this.selectedCharacter = null;
        this.fighting = false;
        this.wins++;
        if(this.wins === this.defenders.length) {
            this.win();
        }
        else {
            $("#defender-select").css("display", "inline");
        }
    },

    lose: function() {
        this.fighting = false;
        this.gameEnd = true;
        console.log("o no");
    },
    
    win: function() {
        this.gameEnd = true;
        console.log("U won boi");
    }
}



gameManager.startGame();

$(".character").on("click", function() {
        gameManager.selectCharacter(this);
        if(!gameManager.fighting && !gameManager.gameEnd) {
            if(gameManager.playerCharacter === null) {
                $(".character").css("border", "2px solid black");
                $(gameManager.selectedCharacterDiv).css("border", "4px solid green");
            }
            else{
                $(".character").css("border", "2px solid black");
                $(gameManager.selectedCharacterDiv).css("border", "4px solid red");
            }
        }
});

$("button").on("click", function(){
    switch($(this).attr("id")){
        case "select":
            if(gameManager.selectedCharacter !== null) {
                gameManager.choosePlayer();
                $(".character").css("border", "2px solid black");
                $("#select").css("display", "none");
                $("#defender-select").css("display", "inline");
            }
            break;

        case "defender-select":
            if(gameManager.selectedCharacter !== null && !gameManager.gameEnd) {
                gameManager.chooseDefender();
                $(".character").css("border", "2px solid black");
                $("#defender-select").css("display", "none");
                $("#attack-stats").css("display", "inline-block");
                $("#opponent").css("display", "inline-block");
            }
            break;

        case "attack":
            if(gameManager.fighting){
                gameManager.fight();
            }
    }
});

});