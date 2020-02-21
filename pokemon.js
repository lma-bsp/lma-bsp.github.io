// Your code here!
///////////////////////////////
// Alexis Reyes
// ASC Technical Assessment
// February 20, 2020
///////////////////////////////
function Pokemon(name,attack,defense,health,type){
	this.name = name
	this.attack = attack
	this.defense = defense
	this.health = health
	this.type = type
	this.original_health = health

	this.attackOpponent = function(pokemon_obj){
		let intended = this.attack - pokemon_obj.defense
		if(intended<1){
			pokemon_obj.takeDamage(1)
		}
		else{
			pokemon_obj.takeDamage(this.attack - pokemon_obj.defense)
		}

	}

	this.takeDamage = function(x){
		let intended  = this.health-=x
		if(intended <= 0){
			this.health = 0
		}else{
			this.health = intended
		}
	}

	this.display =  function(){
		let name = this.name.toUpperCase()
		return name + ' ('+this.type.toUpperCase() +') ' + this.health+'/'+this.original_health
	}

}

// Don't edit this line!
module.exports = Pokemon;
