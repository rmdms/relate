<template lang="html">
  <div v-if="load && !isDesktop" class="loading-page">
    <div class="cont">
      <p>{{ name }}</p>
      <p class="subtitle">{{ subtitle }}</p>
    </div>
    <img src="~/assets/images/icon-loading.svg" alt="Icon boucle d'une ficelle qui entoure le titre de l'épisode." />
  </div>
  <div v-else-if="load && isDesktop" class="loading-page">
    <div class="cont">
      <p>Oops</p>
      <p class="subtitle">This project is only available on mobile, please change your device.</p>
    </div>
    <img src="~/assets/images/icon-loading.svg" alt="Icon boucle d'une ficelle qui entoure le titre de l'épisode." />
  </div>
</template>

<script>
export default {
  data() {
    return {
      isDesktop: false,
      name: undefined,
      load: false,
    }
  },
  created() {
    if (this.$route.name === "index") {
      this.name = "Episode 1";
    } else {
      this.name = this.$route.name.charAt(0).toUpperCase() + this.$route.name.slice(1);
      this.name = this.name.replace('-', ' ');
    }

    if (this.name === "Episode 1") {
      this.subtitle = "Présentation";
    } else if (this.name === "Context 1") {
      this.name = "Contexte 1";
      this.subtitle = "";
    } else if (this.name === "Chapter 3") {
      this.name = "Episode 3";
      this.subtitle = "Héritage culturel";
    }
    this.$data.load = true;
  },
  mounted() {
    // console.log('ok')
    // this.$el.classList.add('appear');
    if (window.innerWidth > 800) {
      this.$data.isDesktop = true;
    }
  },
  watch: {
    "$store.state.loader.isLoading": function() {
      if (!this.$store.state.loader.isLoading) {
        setTimeout(() => {
          this.$el.classList.add('remove');
        }, 3500);
        setTimeout(() => {
          this.$data.load = this.$store.state.loader.isLoading;
        }, 5000);
      } else {
        if (this.$route.name === "index") {
          this.name = "Episode 1";
        } else {
          this.name = this.$route.name.charAt(0).toUpperCase() + this.$route.name.slice(1);
          this.name = this.name.replace('-', ' ');
        }

        if (this.name === "Episode 1") {
          this.subtitle = "Présentation";
        } else if (this.name === "Context 1") {
          this.name = "Contexte 1";
          this.subtitle = "";
        } else if (this.name === "Chapter 3") {
          this.name = "Episode 3";
          this.subtitle = "Héritage culturel";
        }
        this.$data.load = this.$store.state.loader.isLoading;
      }
    }
  }
}
</script>

<style scoped lang="css">
.loading-page {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background: #0F0E21;
  color: #FFF;
  z-index: 999999;
}

.loading-page.appear {
  opacity: 1;
  transition: opacity 1s linear;
}

.loading-page.appear .cont,
.loading-page.appear img {
  opacity: 1;
  transition: opacity .5s linear;
}

.loading-page.remove {
  opacity: 0;
  transition: opacity 1s linear .5s;
}

.loading-page.remove .cont,
.loading-page.remove img {
  opacity: 0;
  transition: opacity .5s linear;
}

.loading-page .cont {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
}

.loading-page p {
  font-family: 'Source Sans Pro', sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 22px;
  line-height: 28px;
  text-align: center;
  color: #FAF2ED;
}

.loading-page .subtitle {
  font-family: 'Source Sans Pro', sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 18px;
  text-align: center;
  color: #FAF2ED;
}

.loading-page img {
  width: 65vw;
  height: 65vw;
}
</style>


<!-- <template lang="html">
  <div v-if="loading" class="loading-page">
    <p>Loading ...</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ressourceLoaded: 0,
      errors: [],
      status: 0,
      loading: false
    }
  },
  mounted() {
  },
  methods: {
    loadRessources() {
      this.$store.state.loader.ressourcesURL.forEach(url => {
        this.loadImage(url);
      });
    },
    loadImage(url) {
      this.$data.loading = true;
      const img = new Image();
      img.src = url;
      img.onload = () => {
        this.$data.ressourceLoaded++;
        this.checkLoaded();
      };
      img.addEventListener("error", (e) => {
        this.$store.commit('setRessourcesNumber', { value: this.$store.state.loader.ressourcesNumber - 1 });
        this.$data.errors.push([url, e]);
        this.checkLoaded();
      });
      return img;
    },
    checkLoaded() {
      if(!this.$data.loading) return null;
      this.$data.status = (this.$data.ressourceLoaded) / (this.$store.state.loader.ressourcesNumber + this.$data.errors.length);
      console.log(this.$data.status * 100);
      if(this.$data.ressourceLoaded + this.$data.errors.length >= this.$store.state.loader.ressourcesNumber) {
        this.$store.commit('setRessourcesNumber', { value: 0 });
        this.$data.ressourceLoaded = 0;
        this.$data.loading = false;
      }
    }
  },
  watch: {
    "$store.state.loader.ressourcesURL": function () {
      if (this.$store.state.loader.ressourcesNumber === this.$store.state.loader.ressourcesURL.length) {
        this.loadRessources();
      }
    }
  }
}
</script>

<style scoped lang="scss">
.loading-page {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background: rgba(255, 255, 255, 1);
  z-index: 999999;
  &.remove {
    opacity: 0;
    transition: opacity 1s linear;
    p {
      display: none;
    }
  }
}
</style> -->

<!-- <template lang="html">
  <div v-if="loading" class="loading-page">
    <p>Loading ...</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ressourceURL: [],
      ressourceNumber: 0,
      ressourceLoaded: 0,
      errors: [],
      status: 0,
      loading: false
    }
  },
  mounted() {
    // this.loadContent();
  },
  methods: {
    loadContent() {
      this.$data.ressourceNumber = this.$data.ressourceURL.length;
      this.$data.ressourceURL.forEach(url => {
        this.loadImage(url);
      });
    },
    loadImage(url) {
      this.$data.loading = true;
      const img = new Image();
      img.src = url;
      this.$data.resNumber++;
      img.onload = () => {
        this.$data.ressourceLoaded++;
        this.checkLoaded();
      };
      img.addEventListener("error", (e) => {
        this.$data.ressourceNumber--;
        this.$data.errors.push([url, e]);
        this.checkLoaded();
      });
      return img;
    },
    checkLoaded() {
      if(!this.$data.loading) return null;
      this.$data.status = (this.$data.ressourceLoaded) / (this.$data.ressourceNumber + this.$data.errors.length);
      console.log(this.$data.status * 100);
      if(this.$data.ressourceLoaded + this.$data.errors.length >= this.$data.ressourceNumber) {
        this.$data.ressourceNumber = 0;
        this.$data.ressourceLoaded = 0;
        this.$data.loading = false;
      }
    }
  }
}
</script>

<style scoped lang="scss">
.loading-page {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background: rgba(255, 255, 255, 1);
  z-index: 999999;
  &.remove {
    opacity: 0;
    transition: opacity 1s linear;
    p {
      display: none;
    }
  }
}
</style>-->

<!-- <template lang="html">
  <div v-if="$store.state.loading" class="loading-page">
    <p>Loading...</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ressourceLoaded: 0,
      errors: [],
      status: 0,
      loading: false,
    };
  },
  mounted() {},
  methods: {
    loadRessources() {
      this.$store.state.loader.ressourcesURL.forEach((url) => {
        this.loadImage(url);
      });
    },
    loadImage(url) {
      this.$data.loading = true;
      const img = new Image();
      img.src = url;
      img.onload = () => {
        this.$data.ressourceLoaded++;
        this.checkLoaded();
      };
      img.addEventListener("error", (e) => {
        this.$store.commit("setRessourcesNumber", {
          value: this.$store.state.loader.ressourcesNumber - 1,
        });
        this.$data.errors.push([url, e]);
        this.checkLoaded();
      });
      return img;
    },
    checkLoaded() {
      if (!this.$data.loading) return null;
      this.$data.status =
        this.$data.ressourceLoaded /
        (this.$store.state.loader.ressourcesNumber + this.$data.errors.length);
      console.log(this.$data.status * 100);
      if (
        this.$data.ressourceLoaded + this.$data.errors.length >=
        this.$store.state.loader.ressourcesNumber
      ) {
        this.$store.commit("setRessourcesNumber", { value: 0 });
        this.$data.ressourceLoaded = 0;
        this.$data.loading = false;
      }
    },
  },
  watch: {
    "$store.state.loader.ressourcesURL": function () {
      if (
        this.$store.state.loader.ressourcesNumber ===
        this.$store.state.loader.ressourcesURL.length
      ) {
        this.loadRessources();
      }
    },
  },
};
</script>

<style scoped lang="scss">
.loading-page {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background: rgba(255, 255, 255, 1);
  z-index: 999999;
  &.remove {
    opacity: 0;
    transition: opacity 1s linear;
    p {
      display: none;
    }
  }
}
</style>

<!-- <template lang="html">
  <div v-if="loading" class="loading-page">
    <p>Loading ...</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ressourceURL: [],
      ressourceNumber: 0,
      ressourceLoaded: 0,
      errors: [],
      status: 0,
      loading: false
    }
  },
  mounted() {
    // this.loadContent();
  },
  methods: {
    loadContent() {
      this.$data.ressourceNumber = this.$data.ressourceURL.length;
      this.$data.ressourceURL.forEach(url => {
        this.loadImage(url);
      });
    },
    loadImage(url) {
      this.$data.loading = true;
      const img = new Image();
      img.src = url;
      this.$data.resNumber++;
      img.onload = () => {
        this.$data.ressourceLoaded++;
        this.checkLoaded();
      };
      img.addEventListener("error", (e) => {
        this.$data.ressourceNumber--;
        this.$data.errors.push([url, e]);
        this.checkLoaded();
      });
      return img;
    },
    checkLoaded() {
      if(!this.$data.loading) return null;
      this.$data.status = (this.$data.ressourceLoaded) / (this.$data.ressourceNumber + this.$data.errors.length);
      console.log(this.$data.status * 100);
      if(this.$data.ressourceLoaded + this.$data.errors.length >= this.$data.ressourceNumber) {
        this.$data.ressourceNumber = 0;
        this.$data.ressourceLoaded = 0;
        this.$data.loading = false;
      }
    }
  }
}
</script>
<style scoped lang="scss">
.loading-page {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background: rgba(255, 255, 255, 1);
  z-index: 999999;
  &.remove {
    opacity: 0;
    transition: opacity 1s linear;
    p {
      display: none;
    }
  }
}
</style>-->

<!-- <template lang="html">
  <div v-if="$store.state.loading" class="loading-page">
    <p>Loading...</p>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      // setTimeout(() => this.$nuxt.$loading.finish(), 3000)
      // this.$store.state.loading = false
    })
  },
  methods: {
    ...mapMutations([
      'setLoading'
    ]),
    start() {
      this.setLoading(true);
      // this.loading = true
    },
    finish() {
      this.setLoading(false);
      setTimeout(() => this.$store.state.loading = false, 1000)
    }
  }
}
</script>
<style scoped lang="scss">
.loading-page {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background: rgba(255, 255, 255, 1);
  z-index: 99;
  &.remove {
    opacity: 0;
    transition: opacity 1s linear;
    p {
      display: none;
    }
  }
}
</style>
-->
