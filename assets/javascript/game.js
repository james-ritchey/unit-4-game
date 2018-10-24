$(document).ready(function() {


var sledge = {
    name: "Sledge",
    image: "assets/images/sledge.png",
    health: 120,
    baseAP: 16,
    attackPower: 16,
    counterAP: 12,
}

var ash = {
    name: "Ash",
    image: "assets/images/ash.png",
    health: 100,
    baseAP: 20,
    attackPower: 20,
    counterAP: 16,
}

var blitz = {
    name: "Blitz",
    image: "assets/images/blitz.png",
    health: 125,
    baseAP: 18,
    attackPower: 18,
    counterAP: 14,
}

var monty = {
    name: "Monty",
    image: "assets/images/monty.png",
    health: 150,
    baseAP: 15,
    attackPower: 15,
    counterAP: 10,
}

var fuze = {
    name: "Fuze",
    image: "assets/images/fuze.png",
    health: 130,
    baseAP: 15,
    attackPower: 15,
    counterAP: 13,
}

var gameManager = {
    characters: [ash, sledge, blitz, fuze, monty],
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
        $("#player-damage").text(this.playerCharacter.attackPower);
        $("#defender-damage").text(this.selectedCharacter.counterAP);
        this.playerCharacter.health -= this.selectedCharacter.counterAP;
        this.selectedCharacter.health -= this.playerCharacter.attackPower;
        this.playerCharacter.attackPower += this.playerCharacter.baseAP;
        if(this.playerCharacter.health < 0) {this.playerCharacter.health = 0;}
        if(this.selectedCharacter.health < 0) {this.selectedCharacter.health = 0;}
        $("#" + this.selectedCharacter.name.toLowerCase() + "-health").text(this.selectedCharacter.health);
        $("#" + this.playerCharacter.name.toLowerCase() + "-health").text(this.playerCharacter.health);
        if(this.playerCharacter.health <= 0) {
            this.lose();
        }
        else if(this.selectedCharacter.health <= 0) {
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
            $("#opponent").css("display", "inline-block");
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
                $(".character").css("border", "2px solid #ffffff");
                $(gameManager.selectedCharacterDiv).css("border", "4px solid green");
            }
            else{
                $(".character").css("border", "2px solid #ffffff");
                $(gameManager.selectedCharacterDiv).css("border", "4px solid red");
            }
        }
});

$("button").on("click", function(){
    switch($(this).attr("id")){
        case "select":
            if(gameManager.selectedCharacter !== null) {
                gameManager.choosePlayer();
                $("#player-character").css("display", "inline-block");
                $("#defenders").css("display", "block");
                $(".character").css("border", "2px solid #ffffff");
                $("#select").css("display", "none");
                $("#defender-select").css("display", "inline");
            }
            break;

        case "defender-select":
            if(gameManager.selectedCharacter !== null && !gameManager.gameEnd) {
                gameManager.chooseDefender();
                $(".character").css("border", "2px solid #ffffff");
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