<template>
  <div class="login-footer flex-row flex-center">
    <span class="copyright">Copyright ©广东省广州市教育局</span>
    <!-- <div class="security-code flex-row flex-align-center">
      <img src="@/assets/images/login/badge.png" alt="">
      <span>粤公网安备 440xxxxxxxx号</span>
    </div> -->
  </div>
</template>

<script>
export default {
  name: "LoginFooter",
};
</script>

<style lang="less" scoped>
.login-footer {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 0;
  height: .35rem;
  width: 100%;
  border-top: 1px solid #d8eafd;
  z-index: 9;

  .copyright {
    font-size: .12rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #9b9ea7;
  }

  .security-code {
    margin-left: .24rem;

    img {
      width: .17rem;
      height: .18rem;
    }

    span {
      margin-left: .07rem;
      font-size: .12rem;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #9b9ea7;
    }
  }
}
</style>
