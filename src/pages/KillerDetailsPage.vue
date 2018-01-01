<template>
    <section class="killer-details-page">
        <div class="killer-details-container">
            <div v-if="!gameFinished">
                <killer-details :killer="killer" @onDone="backClicked"></killer-details>
                <div class="killer-details-footer">
                    <button class="btn btn-success btn-lg" 
                            @click="getNewTarget"
                            :disabled="isNewTaget">
                            I did it!
                    </button>
                    <button class="btn btn-warning btn-lg" @click="backClicked">Go Back</button>      
                </div>
            </div>
            <div v-else>
                <div>You did it!</div>
                <div class="killer-details-footer">
                    <button class="btn btn-success btn-lg" @click="newGameClicked">New Game</button>
                </div>
            </div>
            
        </div>
    </section>
</template>

<script>
'use strict'

import { GameOnPage } from '../router'
import { mapActions } from 'vuex';
import KillerDetails from '../components/KillerDetails'

export default {
    data() {
        return {
            killer: null,
            isNewTaget: false
        }
    },
    components: {
        KillerDetails
    },
    created() {
        this.killer = this.$store.getters.killer(this.$route.params.id);
        (!this.killer) && this.$router.push('/');
    },
    methods: {
        ...mapActions(['killerIsOutOfGame', 'resetGame']),
        backClicked () {
            this.$router.push({ name: GameOnPage });
        },
        getNewTarget() {
            this.killerIsOutOfGame(this.killer.target.id)
            this.isNewTaget = true;
        },
        newGameClicked() {
            this.resetGame()
            this.$router.push('/');
        }
    },
    computed: {
        killerDisplay() {
            return this.killer;
        },
        gameFinished() {
            return this.$store.getters.gameFinished
        }
    }
}
</script>

<style lang="scss" scoped>
    .killer-details-page {
        display: flex;
        justify-content: center;
    }

    .killer-details-footer {
        margin: 15px 0 0 0;
    }
</style>

