<template>
  <LayoutBase>
    <template #header>
      <MapHeader />
    </template>
    <template #sidebar>
      <MapSideBar />
    </template>
    <template #content> 
      <TheMap />
      <router-view></router-view>
    </template>
  </LayoutBase>
</template>

<script></script>

<style lang="less" scoped></style>
