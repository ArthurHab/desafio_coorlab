<template>
  <div class="title">
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand class="ml-2">
        <b>{{ appName }}</b>
      </b-navbar-brand>
    </b-navbar>
    <main class="main">
      <section class="content">
      <header class="transportHeader">
        <b-icon icon="truck" class="iconeTruck"></b-icon>
        <span>Melhor Frete</span>
      </header>
      <section class="transportContainer">
        <BaseSearch/>
        <BaseSearchResult/>
      </section>
    </section>
    </main>

  </div>

</template>

<script>
import {
  BNavbar,
  BNavbarBrand,
  BIcon
} from 'bootstrap-vue'
import BaseSearch from './BaseSearch.vue'
import BaseSearchResult from './BaseSearchResult.vue'

export default {
  components: {
    BNavbar,
    BNavbarBrand,
    BaseSearch,
    BaseSearchResult,
    BIcon
},
  data() {
    const appName = ''

    return {
      appName,
    }
  },
  created() {
    this.getTransport();
    this.appName = 'Melhor Frete'
  },
  methods: {
    getTransport(){
      fetch('http://localhost:3000/transport')
      .then((response) => response.json())
      .then((transport) => this.$store.dispatch('setDataApi', transport))
    }
  },
}
</script>

<style scoped>
.title .navbar {
  background-color: #00aca6 !important;
}

.title .navbar-brand {
  margin-left: 20px;
}

.content{
  display: flex;
  flex-direction: column;
  border-radius: 12px;
}
.transportHeader{
  background-color:#00aca6;
  padding: 10px 20px;
  border-radius: 10px 10px 0px 0px;
  display: flex;
  align-items: center;
  gap: 20px;
  font-weight: 700;
}
.iconeTruck{
  height: 25px;
  width: 25px;
}
.main{
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
}
.transportContainer{
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  width: 830px;
  padding: 25px 10px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
</style>
