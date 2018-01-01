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
                        <killer-details :killer="killers[index]"></killer-details>
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
import KillerDetails from '../components/KillerDetails'

export default {
    data() {
        return {
            showDesc: true,
            killers: [],
            index: 0,
            callToKiller: false,
            showTask: false,
            finished: false,
            revealing: false
        }
    },
    components: {
        KillerDetails
    },
    created() {
        this.setPageView(GameReadyPage);
        this.killers = this.$store.getters.killersToDisplay;
        (this.killers.length === 0) && this.$router.push('/');
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

    .btn {
        margin: 30px 0 0 0;
        cursor: pointer;
    }

    .btn-finished {
        width: 100px;
    }
</style>


