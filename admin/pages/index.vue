<template>
  <div>
    <template v-if="$auth.$state.loggedIn">
      <Navbar />
      <main>
        <div class="a-spacing-large"></div>
        <div class="container-fluid browsing-history">
          <div class="row">
            <div class="col-sm-8 col-8">
              <h1 class="a-size-large a-spacing-none a-text-normal">Tất cả sách</h1>
              <div class="a-spacing-large"></div>
              <!-- Button -->
              <nuxt-link to="/products" class="a-button-buy-again">Thêm sách mới</nuxt-link>
              <!-- Listing page -->
            </div>
          </div>
        </div>
        <div class="a-spacing-large"></div>
        <div class="container-fluid browsing-history">
          <div class="row">
            <div v-for="(product, index) in products" :key="product._id"
              class="col-xl-2 col-lg-2 col-md-3 col-sm-6 col-6 br bb">
              <div class="history-box">
                <a href="#" class="a-link-normal">
                  <img :src="product.photo" class="img-fluid" alt="" style="min-height: 280px;">
                </a>
                <div class="a-spacing-top-base asin-title">
                  <span class="a-text-normal">
                    <div class="p13n-sc-truncated">{{ product.title }}</div>
                  </span>
                </div>
                <div class="a-row">
                  <a href="">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                  </a>
                  <span class="a-letter-space"></span>
                </div>
                <div class="a-row">
                  <span class="a-size-base a-color-price">
                    <span class="p13n-sc-price">${{ product.price }}</span>
                  </span>
                </div>
                <div class="a-row">
                  <nuxt-link :to="`/products/${product._id}`" class="a-button-history margin-right-10">Cập nhật thông tin</nuxt-link>
                  <a href="#" class="a-button-history margin-right-10"
                    @click="onDeleteProduct(product._id, index)">Xóa</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </template>
    <template v-else>
      <Login />
    </template>


  </div>
</template>

<script>
export default {
  async asyncData({ $axios }) {
    try {
      let respone = await $axios.$get("/api/products");
      return {
        products: respone.products
      };
    } catch (err) {

    }
  },
  methods: {
    async onDeleteProduct(id, index) {
      try {
        let respone = await this.$axios.$delete(`/api/products/${id}`);
        if (respone.status) {
          this.products.splice(index, 1)
        }
      } catch (err) {
        console.log(err);
      }
    }

  }
}
</script>
