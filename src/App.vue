<template>
  <div class="container text-center">
    
    <div class="row header">
      <div class="game-title">Killer</div>
    </div>
    
    <router-view></router-view>
  </div>
</template>

<script>
'use strict'
import {mapActions} from 'vuex';
import StorageService from './services/storageService'

export default {
  created() {
    if (!StorageService.isExist()) {
      return;
    }

    this.loadGameData()
        .then(() => {
          this.$router.push({name: this.$store.getters.lastPage})
        });
  },
  methods: {
      ...mapActions(['loadGameData'])
  }
}
</script>

<style lang="scss">

  .header {
    margin: 20px 0;
  }

</style>
