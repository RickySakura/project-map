<template>
  <div class="login-title flex-align-center">
    <img src="@/assets/img/login/logo.png" alt="" />
    <span class="title">广州教育资源地图</span>
  </div>
</template>

<style lang="less" scoped>
// #3B414F: #3B414F;
@font-face {
  font-family: "SourceHanSerifCN";
  src: url("@/assets/fonts/syst-CN-Heavy.woff2") format("woff2"),
    url("@/assets/fonts/syst-CN-Heavy.woff") format("woff"),
    url("@/assets/fonts/syst-CN-Heavy.ttf") format("truetype");
  font-weight: normal;
  font-style: normal;
}

.login-title {
  font-size: .2rem;
  font-weight: 500;
  font-family: "SourceHanSerifCN";
  margin-bottom: .30rem;
  margin-top: .34rem;
  margin-left: .44rem;
  float: left;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: #3b414f;
  z-index: 9;

  img {
    margin-right: .1rem;
    width: .26rem;
    height: .26rem;
    z-index: 9;
  }

  span {
    z-index: 9;
  }
}
</style>
