<template>
  <div>
    <Navbar />
    <main class="listingPage">
      <div class="container-fluid">
        <div class="row">
          <div class="col-xl-10 col-lg-10 col-md-8 col-sm-8 offset-lg-1 offset-sm-2">
            <FeaturedProduct />
            <div class="mainResults">
              <ul class="s-result-list">
                <li class="s-result-item celwidget" v-for="product in products" :key="product._id">
                  <div class="s-item-container">
                    <div class="a-spacing-micro">
                      <div class="bestSeller">
                        <a href="#">Bán chạy</a>
                      </div>
                    </div>

                    <div>
                      <div class="row">
                        <div class="col-sm-3 text-center">
                          <nuxt-link :to="`/products/${product._id}`">
                            <img :src="product.photo" alt="" class="img-fluid" style="width: 150px;">
                          </nuxt-link>
                        </div>
                        <div class="col-sm-9">
                          <div class="a-row a-spacing-small">
                            <nuxt-link :to="`/products/${product._id}`" class="a-link-normal">
                              <h2 class="a-size-medium">
                                {{ product.title }}
                                <span class="a-letter-space"></span>
                                <span class="a-letter-space"></span>
                              </h2>
                            </nuxt-link>
                          </div>
                          <div class="a-row a-spacing-small">
                            <span class="a-size-small a-color-secondar">Tác giả</span>
                            <span class="a-size-small a-color-secondar">
                              <a href="#" class="a-link-normal a-text-normal">{{product.owner.name}}</a>
                            </span>
                          </div>
                          <div class="a-row">
                            <span class="a-size-small">Giá</span>
                          </div>
                          <div class="row">
                            <div class="col-sm-7">
                              <div class="a-row a-spacing-none">
                                <a href="#" class="a-link-normal a-text-normal">
                                  <span class="a-color-base sx-zero-spacing">
                                    <span class="sx-price sx-price-large">
                                      <sup class="sx-price-currency">$</sup>
                                      <span class="sx-price-whole">{{product.price}}</span>
                                    </span>
                                  </span>
                                </a>
                                <span class="a-letter-space"></span>
                              </div>
                              <div class="a-row a-spacing-none">
                                <span class="a-size-small a-color-secondary">Đọc thử với Audible</span>
                              </div>
                              <hr>
                              <span class="a-size-small a-color-secondary">
                                Xem ngay với:
                                <span class="a-letter-space"></span>
                                <a href="#" class="a-size-small a-link-normal a-text-normal">Audio CD</a>
                              </span>
                            </div>
                            <div class="col-sm-5">
                              <div class="a-row a-spacing-mini"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
    <Footer />
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  async asyncData({$axios}) {
    try{
      let respone = await $axios.$get("/api/products");
      return{
        products: respone.products
      }
    }catch(err){
      console.log(err);
    }
  },
}
</script>
<style>
body{
  font-size: 13px;
  line-height: 19px;
  color: #111;
}
</style>
