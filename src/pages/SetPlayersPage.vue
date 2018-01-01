<template>
    <section class="set-players">
        <div class="page-title">Add the Players:</div>

        <ul class="list-group">
            <transition-group name="fade" mode="out-in">
                <li class="list-group-item"
                    v-for="(player, index) in playersNames" :key="player.id">

                    <label>Player {{index + 1}}</label>
                    <input type="text" v-model="player.name" />
                    <span class="btn btn-link btn-remove" @click="removePlayer(index)">x</span>
                </li>        
            </transition-group>
        </ul>

        <div class="add-player-container">
            <button class="btn btn-link" @click="addPlayer">Add Player</button>
        </div>

         <div class="actions-container">
          <button class="btn btn-success btn-lg" @click="submit">Continue</button>
        </div>
    </section>
</template>

<script>
'use strict'
import shortid from 'shortid';
import {mapActions} from 'vuex';
import { SetPlayersPage, GameReadyPage } from '../router'

export default {
    data() {
        return {
            playersNames: []
        }
    },
    created() {
        this.setPageView(SetPlayersPage);
        const playersCount = this.$store.getters.playersCount;
        if (!playersCount) {
            this.$router.push('/');
        }

        this.playersNames = Array(playersCount).fill().map( (player, ind) => ({id: shortid.generate(), name: ''}))
    },
    methods: {
        ...mapActions(['createPlayers', 'setNumOfPlayers', 'setPageView']),
        submit() {
            this.createPlayers(this.playersNames);
            this.$router.push({ name: GameReadyPage });
        },
        addPlayer() {
            this.playersNames.push({id: new Date().getTime(), name: ''});
            this.setNumOfPlayers(this.playersNames.length);
        },
        removePlayer(index) {
            this.playersNames.splice(index, 1);
            this.setNumOfPlayers(this.playersNames.length);
        }
    }
}
</script>

<style lang="scss" scoped>
    .set-players {
        .list-group {
            margin-bottom: 0;
        }

        .list-group-item {
            border: none;
            background-color: transparent;

            label {
                width: 90px;
                margin: 0 7px 0 0;
            }
        }

        .btn-link {
            color: white;
            text-decoration: underline;
        }

        .add-player-container {
            text-align: right;
        }

        .btn-remove {
            font-size: 20px;
            margin: 0 0 0 5px;
            color: black;
            text-decoration: none;

            &:hover, &:active {
                text-decoration: none;
            }
        }  
    }
    
</style>