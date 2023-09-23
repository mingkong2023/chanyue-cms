<template>
  <h1 class="logo">
    <IconLogo class="icon mr-10"></IconLogo>
    <span v-show="!isCollapse">禅悦系统cms</span>
  </h1>
</template>

<script name="Logo">
import { defineComponent } from "vue";
import IconLogo from "@/components/icons/IconLogo.vue";
export default defineComponent({
  components: { IconLogo },
  props: {
    isCollapse: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {};
  },
  created() {},
  methods: {},
});
</script>

<style scoped>
.icon {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: #f9f9f9;
  padding: 3px;
}
.logo {
  background-image: linear-gradient(300deg, #778cca, #65de83);
  padding: 10px;
  color: #fff;
  font-size: 20px;
  font-weight: lighter;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  transition: width 0.3s linear;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
