<template>
  <div id="app" class="container" ref="app">
    <div class="row">
      <div class="heading col-12">
        <h1 class="align-center">Vue &infin; Scroll Example</h1>
        <md-button @click="clear" class="md-raised md-primary">Reload</md-button>
      </div>
      <div v-for="(profile,i) in profiles" :key="i" class="profile col-md-6 col-xl-4">
        <transition name="fade">
          <div class="card" :class="profile | visible(show)">
            <div class="row no-gutters">
              <div class="picture col-xs-5 col-md-6 col-lg-5 col-xl-6">
                <img :src="profile.picture.large" :alt="profile.name">
              </div>
              <div class="info col-xs-7 col-md-6 col-lg-7 col-xl-6">
                <div class="name">{{ profile | fullName }}</div>
                <div class="username">{{ profile.login.username }}</div>
                <div class="address-1">{{ profile.location.street }}</div>
                <div class="address-2">{{ profile | address2 }}</div>
                <div class="email">{{ profile.email }}</div>
                <div class="phone">{{ profile.cell }}</div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <div class="spinner-container col-12">
        <md-spinner v-if="loading" md-indeterminate :md-size="120"></md-spinner>
      </div>
    </div>
  </div>
</template>

<script>
  import Axios from 'axios';

  export default {
    data() {
      return {
        loading: false,
        page: 1,
        results: 6,
        profiles: [],
        show: []
      }
    },
    computed: {
      apiUrl() {
        return `https://randomuser.me/api/?page=${this.page}&results=${this.results}`;
      }
    },
    filters: {
      fullName(profile) {
        return `${profile.name.first} ${profile.name.last}`
      },
      address2(profile) {
        return `${profile.location.postcode} ${profile.location.city}`
      },
      visible(profile, showList) {
        return showList.includes(profile.id.value) ? 'show' : 'hide';
      },
    },
    methods: {
      async fetchProfiles() {
        if (!this.loading) {
          this.loading = true;
          try {
            let newProfiles = (await Axios.get(this.apiUrl)).data.results;
            this.loading = false;
            this.profiles.push(...newProfiles)
            newProfiles.forEach((profile, i) => {
              setTimeout(() => { this.show.push(profile.id.value) }, (i + 1) * 250);
            })
            this.page++;
          } catch (err) {
            console.error(err);
            this.loading = false;
          }
        }
      },
      scrollCallback(event) { // watch for when user reaches bottom of the page
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
          this.fetchProfiles()
        };
      },
      clear() {
        this.profiles = [];
        this.fetchProfiles();
      }
    },
    created() {
      this.fetchProfiles();
      window.onscroll = this.scrollCallback;
    },
    updated() {
      if (!this.loading && this.$refs['app'].offsetHeight < window.innerHeight) {
        this.fetchProfiles();
      }
    }
  }
</script>