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
                                <h3 class="text-center">Thêm sách mới</h3>
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
                                        <input type="text" id="title" class="a-input-text w-100" v-model="title">
                                    </div>
                                    <div class="a-spacing-top-medium">
                                        <label for="price">Giá</label>
                                        <input type="number" step="0.1" id="price" class="a-input-text w-100" v-model="price">
                                    </div>
                                    <div class="a-spacing-top-medium">
                                        <label for="stockQuantity">Số lượng thêm</label>
                                        <input type="number" id="price" class="a-input-text w-100" v-model="stockQuantity">
                                    </div>
                                    <div class="a-spacing-top-medium">
                                        <label for="desc">Chi tiết</label>
                                        <textarea rows="3" id="desc"
                                            placeholder="Chi tiết về sách"
                                            class="a-input-text w-100"
                                            v-model="description">
                                        </textarea>
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
                                                <span class="a-button-text" @click="onAddProduct">Thêm sách</span>
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
    async asyncData({ $axios }) {
        try {
            let categories = $axios.$get("http://localhost:3000/api/categories");
            let owners = $axios.$get("http://localhost:3000/api/owners");
            const [categoriesResp, ownersResp] = await Promise.all([
                categories,
                owners
            ]);

            return {
                categories: categoriesResp.categories,
                owners: ownersResp.owners
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
            price: 0,
            stockQuantity: 1,
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
        async onAddProduct(){
            let data = new FormData();
            data.append("title", this.title);
            data.append("price", this.price);
            data.append("stockQuantity", this.stockQuantity);
            data.append("description", this.description);
            data.append("ownerID", this.ownerID);
            data.append("categoryID", this.categoryID);
            data.append("photo", this.selectedFile, this.selectedFile.name);

            let result = await this.$axios.$post('http://localhost:3000/api/products', data);
            this.$router.push('/');
        }
    }

};
</script>