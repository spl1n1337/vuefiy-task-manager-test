<template>
  <v-app class="layout">
    <slot />
  </v-app>
</template>

<style scoped>
.layout {
    background: rgb(37, 37, 37);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
}
</style>