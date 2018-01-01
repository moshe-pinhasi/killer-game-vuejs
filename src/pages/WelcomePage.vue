<template>
  <section>
    <div class="welcome-page">
      <div class="page-title">Take yourself out of it</div>
      <img src="../assets/images/killer.png" height="200px;" alt="">

      <form @submit.prevent="onSubmit">
        <div class="prepare">
          Prepare a Game for 
          <input type="text" 
                id="numPlayers"
                @blur="$v.numPlayers.$touch()"
                :class="{ invalid: $v.numPlayers.$error }"
                v-model.number="numPlayers"
                /> players
        </div>

        <div class="actions-container">
          <button type="button"
                  class="btn btn-success btn-lg"
                  :disabled="$v.numPlayers.$error"
                  @click="onSubmit">Continue</button>
        </div>
      </form>

    </div>
  </section>
</template>

<script>
'use strict'

import {mapActions} from 'vuex';
import { required, numeric, minValue } from 'vuelidate/lib/validators'
import { SetPlayersPage } from '../router'

export default {
    data() {
      return {
        numPlayers: null
      }
    },
    methods: {
      ...mapActions(['setNumOfPlayers']),
      onSubmit() {
        this.setNumOfPlayers(this.numPlayers);
        this.$router.push({ name: SetPlayersPage });
      }
    },
    validations: {
      numPlayers: {
        required,
        numeric,
        minVal: minValue(3)
      }
    }
}
</script>

<style lang="scss" scoped>
  input {
    border: 1px solid transparent;
  }

  .invalid {
    border: 1px solid red;
  }

</style>