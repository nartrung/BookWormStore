<template>
  <div>
    <header class="">
      <div class="container-fluid dekstop-nav">
        <div class="row align-items-center">
          <div class="col-sm-2 col-4">
            <div class="logo-area">
              <nuxt-link to="/">
                <img src="/img/logo.png" alt="" class="img-fluid" style="min-width: 100px;">
              </nuxt-link>
            </div>
          </div>
          <div class="col-sm-6 col-8">
            <nuxt-link to="/" class="a-button-buy-again mr-3 my-4">
              Quản lý sách
            </nuxt-link>
            <nuxt-link to="/category" class="a-button-buy-again mr-3 my-4">
              Quản lý danh mục
            </nuxt-link>
            <nuxt-link to="/owner" class="a-button-buy-again mr-3 my-4">
              Quản lý tác giả
            </nuxt-link>
          </div>
          <div class="col-sm-4 col-12 pt-0 d-flex justify-content-end justify-content-sm-start">
            <div class="nav-tools">
              <span class="icp-nav-link-border"></span>
              <nuxt-link to="/" class="nav-a nav-a-2" id="nav-link-accountList" tabindex="0">
                <span class="nav-line-1">Xin chào,</span>
                <span class="nav-line-2">
                  Quản trị viên
                </span>
              </nuxt-link>
              <span class="nav-a nav-a-2 nav-single-row-link">
                <span class="nav-line-1"></span>
                <span class="nav-line-2" style="text-decoration: underline; cursor: pointer;" @click="onLogout">Đăng
                  xuất</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  methods: {
    async onLogout() {
      await this.$auth.logout();
    }
  },
}
</script>
