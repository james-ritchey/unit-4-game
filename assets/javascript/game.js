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
    playerCharacter: NaN,
    characterSelected: false,
    defenders: [],
    selectedCharacter: NaN,
    fighting: false,

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
            newDiv.append("<p>" + c.health + "</p>");
            this.characterDivs.push(newDiv);
            return newDiv;
    },

    selectCharacter: function(c) {
        if(($(c).attr("id") !== $(this.playerCharacter).attr("id")) &&
            ($(c).attr("id") !== this.selectedCharacter.name && !this.fighting)){
            for(var i = 0; i < this.characters.length; i++) {
                if($(c).attr("id") === $(this.characterDivs[i]).attr("id")) {
                    this.selectedCharacter = this.characterDivs[i];
                }
            }
            console.log(this.selectedCharacter);
        }
    },

    choosePlayer: function() {
        var characterIndex = this.characterDivs.indexOf(this.selectedCharacter);
        for(var i = 0; i < this.characters.length; i++) {
            if(i !== characterIndex) {
                this.defenders.push(this.characterDivs[i]);
            }
            else {
                this.playerCharacter = this.characterDivs[i];
            }
        }
        console.log(characterIndex);
        console.log("Player: " + this.playerCharacter.name);
        console.log("Defenders: " + this.defenders);
        $("#player-character").append(this.playerCharacter);
        this.characterSelected = true;
        for(var i = 0; i < this.defenders.length; i++) {
            $("#defenders").append(this.defenders[i]);
        }
    },

    chooseDefender: function() {
        this.fighting = true;
        $("#opponent").append(this.selectedCharacter);
    }
}



gameManager.startGame();

$(".character").on("click", function() {
        gameManager.selectCharacter(this);
});

$("button").on("click", function(){
    switch($(this).attr("id")){
        case "select":
            gameManager.choosePlayer();
            $("#select").css("display", "none");
            $("#defender-select").css("display", "inline");
            break;
        case "defender-select":
            gameManager.chooseDefender();
            $("#defender-select").css("display", "none");
            $("#attack-stats").css("display", "inline-block");
            $("#opponent").css("display", "inline-block");
            break;

    }

});

});