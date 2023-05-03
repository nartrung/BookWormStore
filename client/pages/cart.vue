<template>
    <div>
        <Navbar />
        <main style="min-height: 83vh;">
            <div class="shopping-cart mt-3">
                <div class="container-fluid c-section">
                    <div class="row">
                        <div class="col-lg-9 col-md-8 col-sm-7">
                            <div class="c-section a-spacing-top-base">
                                <div class="a-row sc-cart-header sc-compact-bottom">
                                    <h2>Giỏ hàng</h2>
                                </div>
                                <div class="sc-list-head">
                                    <div class="text-right a-spacing-top-micro">
                                        <span class="a-color-secondary">Giá</span>
                                    </div>
                                </div>
                                <div class="sc-list-body" v-for="product in getCart" :key="product._id">
                                    <div class="sc-list-item-border">
                                        <div class="a-row a-spacing-top-base a-spacing-large">
                                            <div class="row">
                                                <div class="col-sm-2 col-2">
                                                    <nuxt-link :to="`/products/${product._id}`" class="a-link-normal">
                                                        <img :src="product.photo" class="img-fluid w-100" >
                                                    </nuxt-link>
                                                </div>
                                                <div class="col-sm-8 col-8">
                                                    <div class="a-spacing-mini">
                                                        <a href="#"
                                                            class="a-link-normal a-size-medium a-text-bold">{{product.title}}</a>
                                                        <span class="a-size-base sc-product-creator">viết bởi
                                                            {{product.owner.name}}</span>
                                                    </div>
                                                    <div>
                                                        <span
                                                            class="a-size-small a-color-secondary sc-product-binding">Bìa mềm</span>
                                                    </div>
                                                    <div class="a-spacing-large"></div>
                                                    <div>
                                                        <span
                                                            class="a-size-small a-color-success sc-product-availability">Còn hàng</span>
                                                    </div>
                                                    <div class="a-spacing-large"></div>
                                                    <div class="sc-action-links">
                                                        <select @change="onChangeQuantity($event, product)">
                                                            <option v-for="i in 5" :key="i" :value="i" :selected="checkQty(product.quantity, i)">Số lượng: &nbsp;{{ i }}</option>
                                                        </select>
                                                        &nbsp;&nbsp;
                                                        <span>|</span>
                                                        &nbsp;
                                                        <span class="a-size-small">
                                                            <a href="#" @click="$store.commit('removeProduct', product)">Xóa khỏi giỏ hàng</a>
                                                        </span>
                                                        &nbsp;
                                                        &nbsp;
                                                    </div>
                                                </div>
                                                <div class="col-sm-2 col-2 tr sm-txt-r">
                                                    <p class="a-spacing-small">
                                                        <span
                                                            class="a-size-medium a-color-price sc-price sc-white-space-nowrap sc-product-price sc-price-sign a-text-bold">${{product.price * product.quantity}}</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="text-right">
                                    <p class="a-spacing-none a-spacing-top-mini">
                                        <span class="a-size-medium">Tổng số ({{ getCartLength }} sản phẩm)</span>
                                        <span class="a-color-price a-text-bold">
                                            <span class="a-size-medium a-color-price">${{ getCartTotalPrice }}</span>
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-4 col-sm-5">
                            <div class="a-box-group" style="margin-bottom: 14px;">
                                <div class="a-box a-color-alternate-background">
                                    <div class="a-box-inner">
                                        <div class="a-spacing-large">
                                            <p class="a-spacing-none a-spacing-top-none">
                                                <span class="a-size-medium">
                                                    <span>Tổng số ({{ getCartLength }} sản phẩm):</span>
                                                    <span class="a-color-price a-text-bold">
                                                        <span class="a-size-medium a-color-price">${{ getCartTotalPrice }}</span>
                                                    </span>
                                                </span>
                                            </p>
                                        </div>
                                        <div>
                                            <span class="a-spacing-small a-button-primary a-button-icon">
                                                <span class="a-button-inner">
                                                    <nuxt-link to="/login" class="a-button-text">Thanh toán</nuxt-link>
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
        <Footer />
    </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
    computed: {
        ...mapGetters(["getCart", "getCartTotalPrice", "getCartLength"])
    },
    methods: {
    onChangeQuantity(event, product) {
      let qty = parseInt(event.target.value);
      this.$store.commit("changeQty", { product, qty });
    },
    checkQty(prodQty, qty) {
      if (parseInt(prodQty) === parseInt(qty)) {
        return true;
      } else {
        return false;
      }
    }
  }
}
</script>
  
  
  