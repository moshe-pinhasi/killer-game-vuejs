<template>
    <div class="container">
            <div class="row justify-content-center">
                <div v-for="killer in killers" 
                    :key="killer.id" 
                    :class="colChosen">

                    <div class="killer" 
                        @click="killerClicked(killer.id)" 
                        :disabled="!killer.isAlive">
                        
                        <img src="../assets/images/x.png" 
                             v-if="!killer.isAlive"
                             class="out-of-game"/>
                        <img :src="`https://robohash.org/${killer.id}?set=set3`" height="100px" />
                        <h4>{{killer.name}}</h4>
                    </div>
                    
                </div>
            </div>

        </div>
</template>

<script>
'use strict'

import { GameOnPage, KillerDetails } from '../router'
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

        this.killers = this.$store.getters.killersToDisplay;
        (this.killers.length === 0) && this.$router.push('/');
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
                        this.$router.push({name: KillerDetails, params: { id: killer.id}});
                    }
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
        position: relative;
        background-color: #337ab7;
        color: #fff;
        border-radius: 15px;
        margin: 0 0 20px 0;
        cursor: pointer;

        &[disabled="disabled"] {
            pointer-events: none;
        }
    }

    .out-of-game {
        position: absolute;
        height: 100px;
        top: 10px;
        left: 27px;
    }

</style>

