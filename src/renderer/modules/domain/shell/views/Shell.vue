<template>
  <h1>Shell</h1>
  <router-link to="/de-DE">To DE</router-link>
  <router-link to="/en-US">To EN</router-link>
  <arrow-button
</template>

<script lang="ts">
import ArrowButton from '@/modules/uikit/components/form/button/arrow-button/ArrowButton.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Shell',
});
</script>
ArrowButton

<style lang="scss"></style>
