<template>
    <div>
        <template v-if="$auth.$state.loggedIn">
            <Navbar />
            <main>
            <div class="container-fluid">
                <div class="row">
                    <div class="col-sm-3"></div>
                    <div class="col-sm-6">
                        <div class="a-section">
                            <div class="a-spacing-top-medium"></div>
                            <h3 class="text-center">Cập nhật thông tin sách</h3>
                            <form>
                                <div class="a-spacing-top-medium">
                                    <label for="category">Thể loại</label>
                                    <select id="category" class="a-select-option text-left" v-model="categoryID">
                                        <option v-for="category in categories" :value="category._id" :key="category._id">{{ category.type }}</option>
                                    </select>
                                </div>
                                <div class="a-spacing-top-medium">
                                    <label for="owner">Tác giả</label>
                                    <select id="owner" class="a-select-option text-left" v-model="ownerID">
                                        <option v-for="owner in owners" :value="owner._id" :key="owner._id">{{ owner.name }}</option>
                                    </select>
                                </div>
                                <div class="a-spacing-top-medium">
                                    <label for="title">Tựa</label>
                                    <input type="text" id="title" class="a-input-text w-100" v-model="title" :placeholder="product.title">
                                </div>
                                <div class="a-spacing-top-medium">
                                    <label for="price">Giá</label>
                                    <input type="number" step="0.1" id="price" class="a-input-text w-100" v-model="price" :placeholder="product.price">
                                </div>
                                <div class="a-spacing-top-medium">
                                    <label for="stockQuantity">Số lượng tồn:</label>
                                    <input type="number" id="price" class="a-input-text w-100" v-model="stockQuantity" :placeholder="product.stockQuantity">
                                </div>
                                <div class="a-spacing-top-medium">
                                    <label for="desc">Chi tiết</label>
                                    <textarea rows="3" id="desc"
                                        class="a-input-text w-100"
                                        v-model="description"
                                        :placeholder="product.description"
                                        style="height: 10em !important;"
                                        ></textarea>
                                </div>
                                <div class="a-spacing-top-medium">
                                    <label>Thêm hình ảnh</label>
                                    <div class="a-row a-spacing-top-medium">
                                        <label for="photo" class="choosefile-button">
                                            <i class="fal fa-plus"></i>
                                            <input type="file" id="photo" @change="onFileSelected">
                                            <p style="margin-top: -70px;">{{ fileName }}</p>
                                        </label>
                                    </div>
                                </div>
                                <hr>
                                <div class="a-spacing-top-medium">
                                    <span class="a-button-register">
                                        <span class="a-button-inner">
                                            <span class="a-button-text" @click="onUpdateProduct">Cập nhật thông tin</span>
                                        </span>
                                    </span>
                                </div>
                                <div class="a-spacing-top-medium"></div>
                            </form>
                        </div>
                    </div>
                    <div class="col-sm-3"></div>
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
    async asyncData({ $axios, params }) {
        try {
            let categories = $axios.$get("http://localhost:3000/api/categories");
            let owners = $axios.$get("http://localhost:3000/api/owners");
            let product = $axios.$get(`http://localhost:3000/api/products/${params.id}`);
            const [categoriesResp, ownersResp, productRespone] = await Promise.all([
                categories,
                owners,
                product
            ]);

            return {
                categories: categoriesResp.categories,
                owners: ownersResp.owners,
                product: productRespone.product
            };
        } catch (err) {
            console.log(err);
        }
    },
    data(){
        return{
            categoryID: null,
            ownerID: null,
            title: "",
            price: "",
            stockQuantity: "",
            description: "",
            selectedFile: null,
            fileName: "",
        }
    },
    methods:{
        onFileSelected(event){
            this.selectedFile = event.target.files[0];
            this.fileName = event.target.files[0].name;
        },
        async onUpdateProduct(){
            let data = new FormData();
            data.append("title", this.title);
            data.append("price", this.price);
            data.append("stockQuantity", this.stockQuantity);
            data.append("description", this.description);
            data.append("ownerID", this.ownerID);
            data.append("categoryID", this.categoryID);
            data.append("photo", this.selectedFile, this.selectedFile.name);

            let result = await this.$axios.$put(`http://localhost:3000/api/products/${this.$route.params.id}`, data);
            this.$router.push('/');
        }
    }

};
</script>