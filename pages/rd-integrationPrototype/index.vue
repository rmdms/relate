<template>
  <main class="story">
    <section class="introduction">
      <div class="header">
        <p>You can adapt the story to your needs and moods here →</p>
        <button class="btn-setting" @click="modal = !modal">
          <img :src="[modal ? close : burger]" />
        </button>
      </div>
      <o-settings v-if="modal"></o-settings>
      <div class="cover">
        <img
          src="~/assets/images/img-title.png"
          alt="Title balancing two culture"
        />
        <div class="resume">
          <p>
            <span>Told by Jane,</span> a french artist who grew up in a
            cambodgian household
          </p>
        </div>
      </div>
      <div class="interaction">
        <p>Scroll to read jane’s story</p>
        <img
          src="~/assets/images/icon-arrowBottom.svg"
          alt="Icon arrow bottom"
        />
      </div>
    </section>
    <section class="beginning">
      <p><span>First episode</span><span>3 min</span> - Original in french</p>
    </section>
    <section class="chapter">
      <div
        v-for="index in 8"
        :key="index"
        class="container"
        :class="getContainerClass(index)"
        :style="getContainerStyle(index)"
        :data-sound-index="getSoundIndex(index)"
      >
        <img :src="getImageSrc(index)" :alt="getImageAlt(index)" />
      </div>
      <nuxt-link to="/mt-context" class="link"><span></span></nuxt-link>
    </section>
  </main>
</template>

<script>
import subtitles from "~/assets/datas/Jane-sub.json";
export default {
  data() {
    return {
      fr: subtitles.fr,
      currentSoundTime: 0,
      currentIndexSound: 0,
      modal: false,
      burger: require("~/assets/images/icon-burger.svg"),
      close: require("~/assets/images/close.svg"),
      IndexAudio: 0,
      default: {
        width: 300,
      },
      images: [
        {
          top: 1105.69,
          left: 109.67,
          width: 162.63,
          height: 193.55,
        },
        {
          top: 1583.44,
          left: 105.12,
          width: 67.09,
          height: 101.29,
        },
        {
          top: 1881.18,
          left: 138.66,
          width: 110.63,
          height: 110.18,
        },
        {
          top: 2230.18,
          left: 0,
          width: 300,
          height: 1126.43,
        },
        {
          top: 2832,
          left: 0,
          width: 300,
          height: 585.28,
        },
        {
          top: 3735.95,
          left: 25.07,
          width: 249.86,
          height: 223.22,
        },
        {
          top: 4402.93,
          left: 0,
          width: 300,
          height: 833.68,
        },
        {
          top: 4629,
          left: 192.74,
          width: 75.55,
          height: 103.17,
        },
      ],
    };
  },
  mounted() {
    this.$el.style.display = "none";
    this.$nuxt.$on("update", this.update);
    this.load();
  },
  methods: {
    update() {
      if (this.$data.currentSound) {
        this.$data.currentSoundTime = this.$data.currentSound.currentTime;
        const sousTitre = subtitles.fr[this.$data.currentIndexSound];
        for (let i = 0; i < sousTitre.length; i++) {
          let phrase = sousTitre[i];
          if (
            phrase.start <= this.$data.currentSoundTime &&
            phrase.end > this.$data.currentSoundTime
          ) {
            //console.log(this.$data.currentSoundTime);
            this.$el.querySelector(".subtitles").innerHTML = phrase.text;
          } else {
            //console.log("else");
            //this.$el.querySelector(".subtitles").innerHTML = "";
          }
        }
      }
      //console.log(sousTitre);
    },
    getImageSrc(index) {
      return require(`~/assets/images/${index}.png`);
    },
    getImageAlt(index) {
      return `Image ${index}`;
    },
    getContainerClass(index) {
      if (index !== 3 && index !== 5) {
        if (index > 3 && index < 5) {
          return `sound sound-${index - 1}`;
        } else if (index > 5) {
          return `sound sound-${index - 2}`;
        } else {
          return `sound sound-${index}`;
        }
      } else {
        return "";
      }
    },
    getSoundIndex(index) {
      if (index !== 3 && index !== 5) {
        if (index > 3 && index < 5) {
          return index - 1;
        } else if (index > 5) {
          return index - 2;
        } else {
          return index;
        }
      } else {
        return "";
      }
    },
    getContainerStyle(index) {
      index = index - 1;
      return `
        top: ${this.convertPxToVw(this.$data.images[index].top)}vw;
        left: ${this.convertPxToVw(this.$data.images[index].left)}vw;
        width: ${this.convertPxToVw(this.$data.images[index].width)}vw;
        height: ${this.convertPxToVw(this.$data.images[index].height)}vw;
      `;
    },
    convertPxToVw(value) {
      return (value * 100) / this.$data.default.width;
    },
    initializeTrigger() {
      const sounds = this.$el.querySelectorAll(".sound");
      this.$data.soundsAudio = [];
      sounds.forEach((sound) => {
        const el = sound;
        const indexSound = sound.dataset.soundIndex;
        const soundSrc = require(`~/assets/sounds/${indexSound}.mp3`).default;
        //const trackSrc = require(`~/assets/datas/soustitre.vtt`).default;
        const soundAudio = new Audio(soundSrc);
        const current = soundAudio.currentTime;
        this.$data.soundsAudio.push(soundAudio);
      });
      this.$data.timelines = [];
      sounds.forEach((sound) => {
        this.$data.timelines.push(
          this.$gsap.to(sound, {
            scrollTrigger: {
              trigger: sound,
              start: "20px 80%",
              end: "bottom 100px",
              toggleActions: "restart pause reverse pause",
              onEnter: (self) => {
                this.$data.soundsAudio.forEach((soundAudio) => {
                  soundAudio.pause();
                  soundAudio.currentTime = 0;
                  //console.log(soundAudio);
                });
                if (this.isSoundEnabled) {
                  this.$data.soundsAudio[
                    self.trigger.dataset.soundIndex - 1
                  ].play();
                  this.$data.currentSound = this.$data.soundsAudio[
                    self.trigger.dataset.soundIndex - 1
                  ];
                  this.$data.currentIndexSound =
                    self.trigger.dataset.soundIndex - 1;
                }

                //console.log(soundsAudio[self.trigger.dataset.soundIndex-1]);
                //console.log(self.trigger.dataset.soundIndex);
              },
            },
            duration: 3,
          })
        );
      });
      this.$data.timelines.forEach((timeline) => {
        timeline.scrollTrigger.enable();
      });
    },
    load() {
      const sounds = this.$el.querySelectorAll(".sound");
      this.assetsLoad = sounds.length;
      this.$data.soundsAudio = [];
      sounds.forEach((sound) => {
        const el = sound;
        const indexSound = sound.dataset.soundIndex;
        let soundSrc = "";
        soundSrc = require(`~/assets/sounds/${indexSound}.mp3`).default;
        const soundAudio = new Audio(soundSrc);
        soundAudio.addEventListener(
          "canplaythrough",
          () => {
            this.assetsLoad -= 1;
            if (this.assetsLoad === 0) {
              console.log("kokok");
              window.addEventListener("touchstart", this.toto);
              this.$el.style.display = "block";
            }
          },
          false
        );
        this.$data.soundsAudio.push(soundAudio);
      });
    },
    toto() {
      console.log("ok");
      this.initializeTrigger();
      this.$store.commit("initializeSound");
      window.removeEventListener("touchstart", this.toto);
    },
  },
  watch: {
    "$store.state.isSoundEnabled": function () {
      if (this.$data.soundsAudio) {
        this.$data.soundsAudio.forEach((soundAudio) => {
          soundAudio.pause();
          soundAudio.currentTime = 0;
        });
      }
    },
  },
  computed: {
    isSoundEnabled() {
      return this.$store.state.isSoundEnabled;
    },
  },
  beforeDestroy() {
    this.$data.timelines.forEach((timeline) => {
      timeline.scrollTrigger.disable();
    });
    this.$data.soundsAudio.forEach((soundAudio) => {
      soundAudio.pause();
      soundAudio.currentTime = 0;
    });
  },
};
</script>

<style lang="css">/* Import Source Sans Pro font */
@import url("https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;600;700&display=swap");

/* Import Bayon and Source Sans Pro fonts */
@import url("https://fonts.googleapis.com/css2?family=Bayon&family=Source+Sans+Pro:wght@400;700&display=swap");

/* Import Poppins and Volkhov fonts */
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200;700&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Volkhov:wght@700&display=swap");

.story {
  position: relative;
  width: 100vw;
  height: auto;
}

.story .introduction {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: calc(100vw - 16vw);
  min-height: calc(667px - 16vw - 120px);
  margin: 8vw;
}

.story .introduction .header {
  display: flex;
}

.story .introduction .header p {
  margin-right: 4vw;
  font-family: "Source Sans Pro";
  font-style: normal;
  font-weight: normal;
  font-size: 4vw;
  letter-spacing: 0.1em;
  line-height: 5vw;
  text-align: right;
}

.story .introduction .cover {
  display: flex;
  flex-direction: column;
  margin: 8vw;
}

.story .introduction .cover img {
  position: relative;
  left: 50%;
  width: 105vw;
  height: 42vw;
  transform: translate3d(-50%, 0, 0);
}

.story .introduction .cover .resume {
  display: flex;
  justify-content: center;
}

.story .introduction .cover .resume p {
  width: 77vw;
  font-family: Source Sans Pro;
  font-style: normal;
  font-weight: normal;
  font-size: 4.66vw;
  line-height: 130%;
  text-align: center;
}

.story .introduction .cover .resume p span {
  display: block;
  font-weight: 600;
  text-transform: uppercase;
}

.story .introduction .interaction {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.story .introduction .interaction p {
  width: 34.66vw;
  margin-bottom: 8vw;
  font-family: "Source Sans Pro";
  font-style: normal;
  font-weight: normal;
  font-size: 4vw;
  letter-spacing: 0.1em;
  line-height: 5vw;
  text-align: center;
  text-transform: uppercase;
}

.story .introduction .interaction img {
  width: 4.66vw;
  height: 4.66vw;
}

.story .beginning {
  display: flex;
  justify-content: center;
  margin: 290px 0;
}

.story .beginning p {
  width: 77vw;
  font-family: "Source Sans Pro";
  font-style: normal;
  font-weight: normal;
  font-size: 4vw;
  line-height: 5vw;
  text-align: center;
  text-transform: uppercase;
}

.story .beginning p span {
  font-weight: bold;
}

.story .beginning p span:first-child {
  display: block;
  font-size: 6.66vw;
  line-height: 8.33vw;
}

.story .chapter {
  width: 100vw;
  height: auto;
}

.story .container img {
  width: 100%;
  height: auto;
}

.story .link {
  position: absolute;
  top: 830vw;
  left: 70.66vw;
  display: block;
  width: 18vw;
  height: 18vw;
  background-color: #fff;
  border-radius: 100%;
}

.story .link span {
  position: relative;
  top: 50%;
  left: 50%;
  display: block;
  width: 20vw;
  height: 20vw;
  border: 2px solid #fff;
  border-radius: 100%;
  transform: translate3d(-50%, -50%, 0);
}

.story .link:before,
.story .link:after {
  position: absolute;
  top: 50%;
  left: 50%;
  content: " ";
  height: 9vw;
  width: 1vw;
  background-color: #474747;
  transform: translate3d(-50%, -50%, 0);
}

.story .link:after {
  transform: translate3d(-50%, -50%, 0) rotate(90deg);
}

.story .subtitles {
  background-image: url("~/assets/images/bksubtitles.png");
  height: 218px;
  width: 100%;
  color: #faf2ed;
  font-family: "Source Sans Pro";
  text-align: center;
  line-height: 20px;
  font-size: 16px;
  padding: 10px 70px;
  font-weight: 400;
  position: fixed;
  top: 0;
}

.story .btn-setting {
  text-decoration: none;
  border: none;
  background: none;
  z-index: 3;
}
</style>
