<template>
    <section class="game-ready-page">
        
        <div class="description-container" v-if="showDesc">
            <div class="page-title">Killers-Chain is Ready!</div>
            <div class="page-description">
                I will now call each player in a random order and reveal his task.
            </div>

            <button class="btn btn-success btn-lg" @click="hideDesc">OK, Do it!</button>
        </div>

        <transition name="fade" mode="out-in">
            <div v-if="revealing">
                <div class="page-title">Revealing Tasks</div>

                <transition name="fade" mode="out-in">
                    <div class="killer" v-if="!showDesc && callToKiller">
                        <div class="killer-name box">{{killers[index].name}}</div>
                        <button class="btn btn-success btn-lg" @click="onShowTaskClicked">I'm here!</button>
                    </div>
                </transition>
                
                <transition name="fade" mode="out-in">
                    <div class="task" v-if="showTask">
                        <div class="task-desc box">
                            <span class="highlight">{{killers[index].name}}</span> Your task is to kill <br />
                            <span class="highlight">{{killers[targetIndex].name}}</span> With the word <br />
                            <span class="highlight">{{killers[targetIndex].killedWord}}</span>
                        </div>
                        <button class="btn btn-success btn-lg" @click="onNextKillerClicked">Got it!</button>
                    </div>
                </transition>
            </div>
        </transition>
        
        <transition name="fade" mode="out-in">
            <div v-if="finished" >
                <div><img src="../assets/images/killer2.png" height="200px;" alt=""></div>
                <button class="btn btn-success btn-lg btn-finished"
                        @click="startGame">Start!</button>
            </div>
        </transition>
        
        
    </section>
</template>

<script>
'use strict'

import { mapActions } from 'vuex';
import { GameReadyPage, GameOnPage } from '../router'
import GameService from '../services/gameService'

export default {
    data() {
        return {
            showDesc: true,
            killers: [],
            index: 0,
            targetIndex: 1,
            callToKiller: false,
            showTask: false,
            finished: false,
            revealing: false
        }
    },
    created() {
        this.setPageView(GameReadyPage);

        var players = this.$store.getters.players;
        if (!players || players.length === 0) {
            this.$router.push('/');
        }
        
        this.killers = GameService.shuffle(players);
    },
    methods: {
        ...mapActions(['setPageView']),
        hideDesc() {
            this.showDesc = false;
            this.revealing = true;
            this.callToKiller = true;
        },
        onShowTaskClicked() {
            this.callToKiller = false;

            setTimeout( () => {
                this.showTask = true;
            }, 1010);
        },
        onNextKillerClicked() {
            this.index++;
            this.showTask = false;
            if (this.index >= this.killers.length) {
                
                this.revealing = false;

                setTimeout( () => {
                    this.finished = true;    
                }, 1010);
                return
            }

            setTimeout( () => {
                this.callToKiller = true;
            }, 1010);
            
            this.targetIndex = (this.index + 1) >= this.killers.length ? 0 : (this.index + 1);
        },
        startGame() {
            this.$router.push({ name: GameOnPage });
        }
    }
}
</script>

<style lang="scss" scoped>
    .game-ready-page {
        display: flex;
        justify-content: center;
    }
    
    .page-title {
        margin: 0 0 30px 0;
        font-size: 30px;
    }
    
    .page-description {
        font-size: 20px;
    }

    .killer, .task {
        width: 300px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        font-size: 20px;
    }

    .killer-name {
        height: 124px;
        font-size: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .box {
        width: 100%;
        padding: 20px;
        background-color: white;
        box-shadow: 0px 0px 39px 4px rgba(0,0,0,0.75);
    }

    .btn {
        margin: 30px 0 0 0;
        cursor: pointer;
    }

    .btn-finished {
        width: 100px;
    }

    .highlight {
        color: #ffc13d;
    }
</style>


