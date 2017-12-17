<template>
    <div class="container">
            <div class="row justify-content-center">
                <div v-for="killer in killers" 
                    :key="killer.id" 
                    :class="colChosen">

                    <div class="killer" @click="killerClicked(killer.id)" :disabled="!killer.isAlive">
                        <img :src="`https://robohash.org/${killer.id}?set=set3`" height="100px" />
                        <h4>{{killer.name}}</h4>
                    </div>
                    
                </div>
            </div>

        </div>
</template>

<script>
'use strict'

import { GameOnPage } from '../router'
import { mapActions } from 'vuex';
import GameService from '../services/gameService'
import swal from 'sweetalert';

const confirmBtn = {
    text: "Yes I swear I am!",
    value: true,
    visible: true,
    className: "btn btn-success",
    closeModal: true,
};
const cancelBtn = {
    text: "Go Back",
    value: false,
    visible: true,
    className: "btn btn-warning",
    closeModal: true,
};

export default {
    data() {
        return {
            killers: []
        }
    },
    created() {
        this.setPageView(GameOnPage);

        var players = this.$store.getters.players;
        if (!players || players.length === 0) {
            this.$router.push('/');
        }
        
        this.killers = GameService.shuffle(players);
    },
    methods: {
        ...mapActions(['setPageView']),
        killerClicked(killerId) {
            const killer = this.killers.filter( killer => killer.id === killerId)[0];
            swal(`${killer.name}?`, {
                    buttons: { 
                        confirm: confirmBtn,
                        cancel: cancelBtn 
                    }
                })
                .then( (confirm) => {
                    if (confirm) {
                        this.showKillerDetails(killer);
                    }
                    console.log("ok!", confirm);
                });
        },
        showKillerDetails(killer) {
            swal(`${killer.name}?`, {
                    buttons: { 
                        confirm: confirmBtn,
                        cancel: cancelBtn 
                    }
                })
                .then( (confirm) => {
                    if (confirm) {
                        
                    }
                    console.log("ok!", confirm);
                });
        }
    },
    computed: {
        colChosen() {
            return {
                'col-xs-6': true,
                'col-sm-4': this.killers.length === 3,
                'col-sm-3': this.killers.length >= 4
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .container {
        min-width: 365px;
    }

    .killer {
        width: 150px;
        height: 150px;
        background: white;
        border-radius: 15px;
        margin: 0 0 20px 0;
        cursor: pointer;
    }

</style>

