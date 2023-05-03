<template>
    <div>
        <Navbar />
        <main>
            <div class="reviewPage mt-3">
                <div class="container-fluid c-section">
                    <div class="row">
                        <div class="col-sm-2"></div>
                        <div class="col-sm-8">
                            <div class="a-spacing-top-medium">
                                <h1 class="a-spacing-base">
                                    <b>Viết Đánh Giá</b>
                                </h1>
                                <div class="row">
                                    <div class="col-md-2 col-sm-3 col-3">
                                        <img :src="product.photo" style="width: 80px" />
                                    </div>
                                    <div class="col-md-10 col-sm-9 col-9 m-auto">
                                        <h4>
                                            <b>{{ product.title }}</b>
                                        </h4>
                                    </div>
                                </div>
                                <div class="a-spacing-top-medium"></div>
                                <hr />
                                <div class="a-spacing-top-large"></div>
                                <div class="headline a-spacing-large">
                                    <h2 class="a-spacing-base">Thêm đề mục</h2>
                                    <input type="text" class="a-input-text" style="width: 70%;"
                                        placeholder="Thêm đề mục" v-model="headline">
                                </div>
                                <div class="a-spacing-base">
                                    <h2 class="a-spacing-base">Thêm đánh giá của bạn ở đây</h2>
                                    <textarea 
                                        placeholder="Điều gì bạn thích, không thích ở cuốn sách này"
                                        style="height:6em; width: 100%;"
                                        v-model="body"
                                    ></textarea>
                                </div>
                            </div>
                            <br />
                            <hr />
                            <div class="a-row text-right a-spacing-top-large">
                                <span class="a-button-register">
                                    <span class="a-button-inner">
                                        <span class="a-button-text" @click="onAddReview">Thêm đánh giá</span>
                                    </span>
                                </span>
                            </div>
                        </div>
                        <div class="col-sm-2"></div>
                    </div>
                    <div class="a-spacing-large pb-5"></div>
                    <hr />
                </div>
            </div>
        </main>
        <Footer />
    </div>
</template>

<script>
export default {
    async asyncData({ $axios, params }) {
        try {
            let response = await $axios.$get(`/api/products/${params.id}`);
            return {
                product: response.product
            };
        } catch (err) {
            console.log(err);
        }
    },
    data() {
        return {
            body: "",
            headline: "",
        };
    },
    methods: {
        async onAddReview() {
            try {
                let data = {
                    headline: this.headline,
                    body: this.body
                }
                let response = await this.$axios.$post(
                    `/api/reviews/${this.$route.params.id}`,
                    data
                ); 
                if (response.success) {
                    this.$router.push(`/products/${this.$route.params.id}`);
                }
            } catch (err) {
                console.log(err);
            }
        }
    }
}
</script>