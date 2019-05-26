
/*Vuex store for dice, Scorekeeping, throw count and score count*/ 
const store = new Vuex.Store({
    state: {
        totalScore: 0,
        throwCount: 0,
        dice: [
            {
                number:1,
                locked: false,
            },
            {
                number:1,
                locked: false,               
            },
            {
                number:1,
                locked: false,
            },
            {
                number:1,
                locked: false,
            },
            {
                number:1,
                locked: false,
            }
        ],
        scoreCount:{
            /*Score count starts att undefined with no value */
            ones: undefined,
            twos: undefined,
            threes: undefined,
            fours: undefined,
            fives: undefined,
            sixes: undefined,
            bonus: undefined,
            pair: undefined,
            twoPair: undefined,
            tripple: undefined,
            quad: undefined,
            littleStair: undefined,
            bigStair: undefined,
            house: undefined,
            chance: undefined,
            yatzy: undefined
        }
    },
    /* Getters for the different choices calculating the score */
    getters:{
        ones: function(state){
            let x = 0;
            for(let i = 0; i < 5; i++){
                if(state.dice[i].number == 1){
                    x += 1;
                }
            }
            return x;
        },
        twos: function(state){
            let x = 0;
            for(let i = 0; i < 5; i++){
                if(state.dice[i].number == 2){
                    x += 2;
                }
            }
            return x;
        },
        threes: function(state){
            let x = 0;
            for(let i = 0; i < 5; i++){
                if(state.dice[i].number == 3){
                    x += 3;
                }
            }
            return x;
        },
        fours: function(state){
            let x = 0;
            for(let i = 0; i < 5; i++){
                if(state.dice[i].number == 4){
                    x += 4;
                }
            }
            return x;
        },
        fives: function(state){
            let x = 0;
            for(let i = 0; i < 5; i++){
                if(state.dice[i].number == 5){
                    x += 5;
                }
            }
            return x;
        },
        sixes: function(state){
            let x = 0;
            for(let i = 0; i < 5; i++){
                if(state.dice[i].number == 6){
                    x += 6;
                }
            }
            return x;
        },
        bonus: function(state){
            if(state.scoreCount.ones + state.scoreCount.twos + state.scoreCount.threes + state.scoreCount.fours + state.scoreCount.fives + state.scoreCount.sixes >= 63){
                return 50;
            }
            else{
                return 0;
            }
        },
        pair: function(state){
            let number = 0;

            for(let diceNum = 6; diceNum > 0; diceNum--){
                for(let i = 0; i < 5; i++){
                    if(state.dice[i].number == diceNum){
                        number++;
                        if(number == 2){
                            return diceNum * 2;
                        }
                    }
                }
                number = 0;
            }
            return 0;
        },
        twoPair: function(state){
            let x = 0;
            let number = 0;
            let pairs = 0;

            for(let diceNum = 6; diceNum > 0; diceNum--){
                for(let i = 0; i < 5; i++){
                    if(state.dice[i].number == diceNum){
                        number++;
                        if(number == 2){
                            x += diceNum * 2;
                            pairs++;
                            number = 0;
                            break;
                        }
                    }
                }
                number = 0;
            }

            if(pairs == 2){
                return x;
            }
            return 0;
        },
        tripple: function(state){
            let score = 0;

            for(let diceNum = 6; diceNum > 0; diceNum--){
                for(let i = 0; i < 5; i++){
                    if(state.dice[i].number == diceNum){
                        score++;
                        if(score == 3){
                            return diceNum * 3;
                        }
                    }
                }
                score = 0;
            }
            return 0;
        },
        quad: function(state){
            let score = 0;

            for(let diceNum = 6; diceNum > 0; diceNum--){
                for(let i = 0; i < 5; i++){
                    if(state.dice[i].number == diceNum){
                        score++;
                        if(score == 4){
                            return score * 4;
                        }
                    }
                }
                score = 0;
            }
            return 0;
        },
        littleStairs: function(state){
            for(let i = 0; i < 5; i++){
                if(state.dice[i].number == 1){
                    for(let i = 0; i < 5; i++){
                        if(state.dice[i].number == 2){
                            for(let i = 0; i < 5; i++){
                                if(state.dice[i].number == 3){
                                    for(let i = 0; i < 5; i++){
                                        if(state.dice[i].number == 4){
                                            for(let i = 0; i < 5; i++){
                                                if(state.dice[i].number == 5){
                                                    return 15;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return 0;
        },
        bigStairs: function(state){
            for(let i = 0; i < 5; i++){
                if(state.dice[i].number == 2){
                    for(let i = 0; i < 5; i++){
                        if(state.dice[i].number == 3){
                            for(let i = 0; i < 5; i++){
                                if(state.dice[i].number == 4){
                                    for(let i = 0; i < 5; i++){
                                        if(state.dice[i].number == 5){
                                            for(let i = 0; i < 5; i++){
                                                if(state.dice[i].number == 6){
                                                    return 20;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return 0;
        },
        house: function(state){
            let v = 0;
            let counter = 0;
            let tripple = false;
            let pair = false;
            let valueOfTripple = 0;

            for(let check = 6; check > 0; check--){
                for(let i = 0; i < 5; i++){
                    if(state.dice[i].number == check){
                        counter++;
                        if(counter == 3){
                            v += check * 3;
                            valueOfTripple = check;
                            tripple = true;
                            counter = 0;
                            break;
                        }
                    }
                }
                counter = 0;
            
                if(tripple){
                    break;
                }
            }

            if(tripple){
                for(let check = 6; check > 0; check--){
                    for(let i = 0; i < 5; i++){
                        if(state.dice[i].number == check && state.dice[i].number != valueOfTripple){
                            counter++;
                            if(counter == 2){
                                v += check * 2;
                                pair = true;
                                counter = 0;
                                break;
                            }
                        }
                    }
                    counter = 0;
            
                    if(pair){
                        break;
                    }
                }
            }

            if(tripple && pair){
                return v;
            }
            else{
                return 0;
            }
        },
        chance: function(state){
            let v = 0;
            for(let i = 0; i < 5; i++){
                v += state.dice[i].number;
            }
            return v;
        },
        yatzy: function(state){
            if(state.dice[0].number == state.dice[1].number == state.dice[2].number == state.dice[3].number == state.dice[4].number){
                return 50;
            }
            else{
                return 0;
            }
        }
    },
    mutations:{
        /* Mutation that changes the number of all dice that are not locked to a random number */
        changeNumber(state){
              for(let i=0; i<5; i++){
                  if(!state.dice[i].locked){
                    state.dice[i].number = Math.floor(Math.random()* 6 +1);
                }     
            }
        },
        changeLock(state, index){
            /*Mutation that changes the state of the dice to locked true/false depending on the state */
            for(let i = 0; i<5; i++){
                if(state.dice[index].locked){
                    state.dice[index].locked=false;
                }
                else{
                    state.dice[index].locked=true;
                }
            }
        }
    }   
})

/* Dice-holder for the dice that gives the dice a class depending on number for display also locks the dice first round */
Vue.component("dice-holder", {
    props:["dice", "index"],
    template: `<div class= 'dice'
                    v-on:click="changeLock(index)"
                    v-bind:class='{
                    dice1: dice.number == 1,
                    dice2: dice.number == 2,
                    dice3: dice.number == 3,
                    dice4: dice.number == 4,
                    dice5: dice.number == 5,
                    dice6: dice.number == 6,
                    locked: this.$store.state.dice[index].locked
            }'>
                    
                </div>`,
    methods:{
        changeLock(index){
            /*Method that calls on the mutation for locking dice */
            if(store.state.throwCount > 0){
                this.$store.commit("changeLock", index)
            }
        }
    }
})

const app = new Vue({
    el: "#app",
    store,
    computed:{
        /*Fetches the dice */
        getDice(){
            return this.$store.state.dice;
        }
    },    
    methods:{
        throwDice(){
            /*Method for throwing dice that calls the changeNumber mutation */
            if(store.state.throwCount<3){
                store.commit('changeNumber')
                store.state.throwCount++;
            }
        },
        unlockDices(){
            /*Unlocks all dice */
            for(let i = 0; i < 5; i++){
                store.state.dice[i].locked =false;
            }
        },

        /*Choices for the different score counts */
        checkBonus(){
            if(store.state.scoreCount.bonus == undefined){
                if(store.getters.bonus == 50){
                    store.state.scoreCount.bonus = 50;
                    store.state.totalScore += 50;
                }
            }
        },
        chooseOnes(){
            if(store.state.throwCount > 0 && store.state.scoreCount.ones == undefined){
                store.state.scoreCount.ones = store.getters.ones;
                store.state.totalScore += store.getters.ones;
                store.state.throwCount = 0;
                this.unlockDices();
                this.checkBonus();
            }
        },
        chooseTwos(){
            if(store.state.throwCount > 0 && store.state.scoreCount.twos == undefined){
                store.state.scoreCount.twos = store.getters.twos;
                store.state.totalScore += store.getters.twos;
                store.state.throwCount = 0;
                this.unlockDices();
                this.checkBonus();
            }
        },
        chooseThrees(){
            if(store.state.throwCount > 0 && store.state.scoreCount.threes == undefined){
                store.state.scoreCount.threes = store.getters.threes;
                store.state.totalScore += store.getters.threes;
                store.state.throwCount = 0;
                this.unlockDices();
                this.checkBonus();
            }
        },
        chooseFours(){
            if(store.state.throwCount > 0 && store.state.scoreCount.fours == undefined){
                store.state.scoreCount.fours = store.getters.fours;
                store.state.totalScore += store.getters.fours;
                store.state.throwCount = 0;
                this.unlockDices();
                this.checkBonus();
            }
        },
        chooseFives(){
            if(store.state.throwCount > 0 && store.state.scoreCount.fives == undefined){
                store.state.scoreCount.fives = store.getters.fives;
                store.state.totalScore += store.getters.fives;
                store.state.throwCount = 0;
                this.unlockDices();
                this.checkBonus();
            }
        },
        chooseSixes(){
            if(store.state.throwCount > 0 && store.state.scoreCount.sixes == undefined){
                store.state.scoreCount.sixes = store.getters.sixes;
                store.state.totalScore += store.getters.sixes;
                store.state.throwCount = 0;
                this.unlockDices();
                this.checkBonus();
            }
        },
        choosePair(){
            if(store.state.throwCount > 0 && store.state.scoreCount.pair == undefined){
                store.state.scoreCount.pair = store.getters.pair;
                store.state.totalScore += store.getters.sixes;
                store.state.throwCount = 0;
                this.unlockDices();
            }
        },
        chooseTwoPair(){
            if(store.state.throwCount > 0 && store.state.scoreCount.twoPair == undefined){
                store.state.scoreCount.twoPair = store.getters.twoPair;
                store.state.totalScore += store.getters.twoPair;
                store.state.throwCount = 0;
                this.unlockDices();
            }
        },
        chooseTripple(){
            if(store.state.throwCount > 0 && store.state.scoreCount.tripple == undefined){
                store.state.scoreCount.tripple = store.getters.tripple;
                store.state.totalScore += store.getters.tripple;
                store.state.throwCount = 0;
                this.unlockDices();
            }
        },
        chooseQuad(){
            if(store.state.throwCount > 0 && store.state.scoreCount.quad == undefined){
                store.state.scoreCount.quad = store.getters.quad;
                store.state.totalScore += store.getters.quad;
                store.state.throwCount = 0;
                this.unlockDices();
            }
        },
        chooseLittleStairs(){
            if(store.state.throwCount > 0 && store.state.scoreCount.littleStairs == undefined){
                store.state.scoreCount.littleStairs = store.getters.littleStairs;
                store.state.totalScore += store.getters.littleStairs;
                store.state.throwCount = 0;
                this.unlockDices();
            }
        },
        chooseBigStairs(){
            if(store.state.throwCount > 0 && store.state.scoreCount.bigStairs == undefined){
                store.state.scoreCount.bigStairs = store.getters.bigStairs;
                store.state.totalScore += store.getters.bigStairs;
                store.state.throwCount = 0;
                this.unlockDices();
            }
        },
        chooseHouse(){
            if(store.state.throwCount > 0 && store.state.scoreCount.house == undefined){
                store.state.scoreCount.house = store.getters.house;
                store.state.totalScore += store.getters.house;
                store.state.throwCount = 0;
                this.unlockDices();
            }
        },
        chooseChance(){
            if(store.state.throwCount > 0 && store.state.scoreCount.chance == undefined){
                store.state.scoreCount.chance = store.getters.chance;
                store.state.totalScore += store.getters.chance;
                store.state.throwCount = 0;
                this.unlockDices();
            }
        },
        chooseYatzy(){
            if(store.state.throwCount > 0 && store.state.scoreCount.yatzy == undefined){
                store.state.scoreCount.yatzy = store.getters.yatzy;
                store.state.totalScore += store.getters.yatzy;
                store.state.throwCount = 0;
                this.unlockDices();
            }
        }

    }

})