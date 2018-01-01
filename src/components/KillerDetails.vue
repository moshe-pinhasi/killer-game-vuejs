<template>
    <div class="killer-details task-desc box" v-if="killer">
        <span class="highlight">{{killer.name}}</span> Your task is to kill <br />
        <span class="highlight">{{killer.target.name}}</span> With the word <br />
        <span class="highlight">{{killer.target.killedWord}}</span>
    </div>
</template>

<script>
'use strict'

import { mapActions } from 'vuex';
import { GameReadyPage, GameOnPage } from '../router'
import GameService from '../services/gameService'

export default {
    props: ['killer'],
    created() {
        
    },
    methods: {
        ...mapActions(['setPageView']),
        onDone() {
            this.$emit('onDone');
        }
    }
}
</script>

<style lang="scss" scoped>

    .btn {
        margin: 30px 0 0 0;
        cursor: pointer;
    }

    .highlight {
        color: #ffc13d;
    }
</style>


