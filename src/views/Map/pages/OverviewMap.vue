<template>
  <div class="overview-map">
    <LayoutMapView>
      <template #left-tool>
        <OverviewMapLeftToolBar />
      </template>

      <template #right-tool> 
        <OverviewMapRightToolBar />
      </template>
    </LayoutMapView>
    <TheRunningDomOverlay :showWindowInfos="false"></TheRunningDomOverlay>
  </div>
</template>

<script></script>

<style lang="less" scoped></style>
