let gameValorant = {
    roundNumber: 0,
    attackRoundWin: 0,
    defenseRoundWin: 0,
    spikePlanted: false
}

let nameCharacters = [
    'Omen', 
    'Phoenix',
    'Fade',
    'Jett',
    'Chamber'
]

class Personnage {
    constructor (name, team){
        this.name = name,
        this.living = true,
        this.team = team
        this.smoke = false
    }
}

let attackTeam = {
    name: 'attaquants',
    playerLiving: 5,
    characters: []
}
let defenseTeam = {
    name: 'défenseurs',
    playerLiving: 5,
    characters: []
}

//Fonction qui crée les deux teams
function createTeam(team) {
    team.playerLiving = 5;
    if (team.characters.length != 0){
        team.characters.splice(0, team.characters.length)
    }
    for (let i = 0; i<5; i++){
        team.characters.push(new Personnage(nameCharacters[i], team.name));
    }
}


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

//Fonction pour avoir une team aléatoire avec une chance sur 2
function chooseRandomTeam(){
    if (Math.random() > 0.5){
        return attackTeam
    } else {
        return defenseTeam
    }
}

//Fonction pour avoir un joueur aléatoire dans la team choisie
function chooseRandomPlayer(team) {
    let randomPlayer = team.characters[getRandomInt(5)]
    if (randomPlayer.living){
        randomPlayer.living = false
        let randomPlayerName = randomPlayer.name
        return randomPlayerName
    } else {
        chooseRandomPlayer(team)
    }
}

//Fonction pour avoir un joueur aléatoire dans la team choisie
function firstFight(){
    let team = chooseRandomTeam();
    let playerDead = team.characters[getRandomInt(5)]
    team.playerLiving --
    playerDead.living = false
    console.log(`${team.characters[getRandomInt(5)].name} a tué ${playerDead.name} qui était avec les ${team.name}`)

    spikePlant(team)
}

//Fonction pour savoir si le spike est planté ou non
function spikePlant(team){
    let spikePlantingChance = Math.random();

    if (team.name === 'défenseurs' && spikePlantingChance > 0.6){
        gameValorant.spikePlanted = true;
        console.log(`Spike have been planted`)
    } else if(team.name === 'attaquants' && spikePlantingChance > 0.4){
        gameValorant.spikePlanted = true;
        console.log(`Spike have been planted`)
    } else {

        console.log(`Les attaquants n'ont pas réussi a planter`)
    }
}
//Fonction des combats du round
function teamFight(){
    let killChance = Math.random()
    if (gameValorant.spikePlanted){ 
        if (killChance > 0.3){ //70% de chance si le spike est planté de kill pour les attaquants
            kill(defenseTeam)
        } else {
            kill(attackTeam)
        }
    } else {
        if (killChance > 0.5){ //50% de chance si le spike est planté de kill
            kill(defenseTeam)
        } else {
            kill(attackTeam)
        }
    }
}

//Fonction pour kill un joueur dans l'équipe voulue
function kill(team){ 
    let playerChoosedName = chooseRandomPlayer(team)
    team.playerLiving --

    console.log(`${playerChoosedName} de l'équipe des ${team.name} est mort`)
    console.log(`attaquants : ${attackTeam.playerLiving} vs défenseurs : ${defenseTeam.playerLiving} `)
    console.log(`----`)
}


function playGame(){
    while (gameValorant.attackRoundWin != 13 && gameValorant.defenseRoundWin != 13){
        gameValorant.roundNumber ++

        console.log(`----`)
        console.log(`----`)
        console.log(`----`)
        console.log(`Début du tour ${gameValorant.roundNumber}`)
        console.log(`----`)

        gameValorant.spikePlanted = false;
                
        createTeam(attackTeam);
        createTeam(defenseTeam);

        firstFight()

        while (defenseTeam.playerLiving!= 0 && attackTeam.playerLiving != 0){
            teamFight()
        }

        if (defenseTeam.playerLiving === 0){
            gameValorant.attackRoundWin ++
        } else {
            gameValorant.defenseRoundWin ++
        }
    }
    if (gameValorant.attackRoundWin === 13){
        console.log(`L'attaque à gagné ${gameValorant.attackRoundWin} à ${gameValorant.defenseRoundWin}`)
    } else {
        console.log(`La défense à gagné ${gameValorant.defenseRoundWin} à ${gameValorant.attackRoundWin}`)
    }

}

playGame()