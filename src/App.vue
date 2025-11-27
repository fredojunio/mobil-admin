<template>
  <router-view></router-view>
</template>

<script>
export default {
  setup() {},
  beforeMount() {
    this.checkLogin();
  },
  watch: {
    $route(to) {
      document.title = `Mama Jaya Bahagia - ${to.meta.title}`;
    },
  },
  methods: {},
  mounted() {
    this.getCurrentTime();
    setInterval(() => {
      this.getCurrentTime();
      this.checkSixPm();
      if (localStorage["role_id"] != 1 && this.isSixPm) {
        this.$router.push("/");
      }
    }, 1000);
  },
  data() {
    return {};
  },
};
</script>
