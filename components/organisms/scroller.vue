<template>
  <div :class="$options._componentTag" class="component organism">
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Object,
      default: () => {
        return {
          // effect: "parallax",
          // direction: -1,
          // gap: 100
        }
      },
      require: false
    },
  },
  methods: {
    init() {
      this.$data.gap = this.$el.offsetHeight > this.$props.options.gap ? this.$props.options.gap : this.$el.offsetHeight;
      this.$data.gap *= this.$props.options.direction;
      this.$data.from = {};
      this.$data.to = {};
      this.$data.scrollTrigger = {
        id: this._uid,
        markers: false,
        trigger: this.$el,
        scrub: true,
        start: 'top 85%',
        end: `${ (this.$el.offsetHeight - this.$props.options.gap) <= 0 ? 0 : this.$el.offsetHeight + this.$data.gap }px 15%`
      };
      // ---
      this.$children.forEach(child => {
        switch(child.$options._componentTag) {
          case "o-sound":
            this.$data.scrollTrigger = {
              ...this.$data.scrollTrigger,
              ...{
                start: 'top 85%',
                end: `bottom 85%`,
                onEnter: () => {
                  child.setPlaying(true);
                },
                onLeave: () => {
                  child.setPlaying(false);
                },
                onLeaveBack: () => {
                  child.setPlaying(false);
                },
                onEnterBack: () => {
                  child.setPlaying(true);
                }
              }
            }
            break;
          case "o-animation":
            if (typeof child.$options.propsData.options.scroll !== "undefined") {
              this.$data.scrollTrigger = {
                ...this.$data.scrollTrigger,
                ...{
                  pin: true,
                  pinSpacing: false,
                  start: `top ${ this.$el.offsetHeight > window.innerHeight ? '0' : '15%'}`,
                  end: `bottom ${ this.$el.offsetHeight > window.innerHeight ? '100%' : '15%'}`,
                  onUpdate: (self) => {
                    child.scroll(self.progress * 100);
                  }
                }
              }
            }
            break;
        }
      });
      // ---
      switch(this.$props.options.effect) {
        case "parallax":
          // console.log('ok')
          this.$data.from = {
            ...this.$data.from,
            ...{ y: 0 }
          }
          this.$data.to = {
            ...this.$data.to,
            ...{ y: this.$data.gap }
          }
          this.$data.scrollTrigger = {
            ...this.$data.scrollTrigger,
            ...{
              start: 'top 100%',
              end: `${ (this.$el.offsetHeight - this.$props.options.gap) <= 0 ? 0 : this.$el.offsetHeight + this.$data.gap }px 0%`
            }
          }
          break;
      }
      // ---
      this.$data.to.scrollTrigger = this.$data.scrollTrigger;
      this.$gsap.fromTo(this.$el, this.$data.from, this.$data.to);
    }
  },
  data() {
    return {
      responseChild: false,
    }
  },
  mounted() {
    this.$nextTick(()=>{
      this.$children.forEach(child => {
        if (child.$options._componentTag !== "o-animation" || child.$options._componentTag !== "o-sound") {
          this.init()
          // console.log('oki')
        }
      });
    })
  },
  watch: {
    "responseChild": function() {
      this.$nextTick(()=>{
        this.init();
      })
    }
  }
}
</script>

<style lang="css">
.o-scroller {}
</style>
