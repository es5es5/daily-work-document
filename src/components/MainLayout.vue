<template>
  <div>
    <main class="main">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </main>
  </div>
</template>

<script>
export default {
  name: 'MainLayout',
}
</script>

<style lang="scss" scoped>
.main {
  max-width: 1024px;
  margin: 0 auto;
}
</style>
