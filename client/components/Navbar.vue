<template>
    <div>
        <header class="">
            <div class="container-fluid dekstop-nav">
                <div class="row">
                    <div class="col-sm-2 col-4">
                        <div class="logo-area">
                            <nuxt-link to="/">
                                <img src="/img/logo.png" alt="" class="img-fluid" style="min-width: 100px;">
                            </nuxt-link>
                        </div>
                    </div>
                    <div class="col-sm-6 col-8 pt-0">
                        <Search />
                    </div>
                </div>
                <div class="row">
                    <div class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2 pl-2">
                        <div class="nav-global-location">
                            <nuxt-link to="/" class="nav-a nav-a-2">
                                <div class="nav-sprite" id="nav-packard-glow-loc-icon"></div>
                                <div id="glow-ingress-block">
                                    <span class="nav-line-1" id="glow-ingress-line1">Giao đến</span>
                                    <span class="nav-line-2" id="glow-ingress-line2">Cần Thơ</span>
                                </div>
                            </nuxt-link>
                        </div>
                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-4 col-sm-6 p-0 d-none d-md-block">
                        <div class="nav-fill">
                            <div class="nav-shop">
                                <nuxt-link to="/" class="nav-a nav-a-2 nav-single-row-link">
                                    <span class="nav-line-2">
                                        Trang chủ
                                        <span class="nav-icon nav-arrow" style="visibility: visible;"></span>
                                    </span>
                                </nuxt-link>
                            </div>
                            <div class="nav-xshop-container">
                                <div class="nav-xshop">
                                    <nuxt-link to="/" class="nav-a" style="cursor: pointer;">Sách bán chạy</nuxt-link>
                                    <nuxt-link to="/" class="nav-a" style="cursor: pointer;" >Sách mới</nuxt-link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-4 col-lg-4 col-md-6 col-sm-7 ml-auto col-10 p-0 offset-">
                        <div class="nav-tools">
                            <span class="icp-nav-link-border"></span>
                            <template v-if="$auth.$state.loggedIn">
                                <nuxt-link to="/profile" class="nav-a nav-a-2" id="nav-link-accountList" tabindex="0">
                                    <span class="nav-line-1">Xin chào,</span>
                                    <span class="nav-line-2">
                                        {{ $auth.$state.user.name }}
                                    </span>
                                </nuxt-link>
                                <span class="nav-a nav-a-2 nav-single-row-link">
                                    <span class="nav-line-1"></span>
                                    <span class="nav-line-2" style="text-decoration: underline; cursor: pointer;" @click="onLogout" >Đăng xuất</span>
                                </span>
                            </template>
                            <template v-else>
                                <nuxt-link to="/login" class="nav-a nav-a-2" id="nav-link-accountList" tabindex="0">
                                <span class="nav-line-1">Xin chào, Khách</span>
                                <span class="nav-line-2">
                                    Account &amp; Lists
                                    <span class="nav-icon nav-arrow" style="visibility: visible;"></span>
                                </span>
                            </nuxt-link>
                            </template>
                            <nuxt-link to="/cart" class="nav-a nav-a-2" id="nav-cart">
                                <span aria-hidden="true" class="nav-line-1"></span>
                                <span aria-hidden="true" class="nav-line-2">Giỏ hàng</span>
                                <span class="nav-cart-icon nav-sprite"></span>
                                <span id="nav-cart-count" aria-hidden="true" class="nav-cart-count nav-cart-0">{{ getCartLength }}</span>
                            </nuxt-link>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    </div>
</template>

<script>
import {mapGetters} from "vuex";
export default {
    methods:{
        async onLogout() {
            await this.$auth.logout();
        }
    },
    computed:{
        ...mapGetters(["getCartLength"])
    }
}
</script>
