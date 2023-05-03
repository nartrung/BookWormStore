<template>
    <div>
        <template v-if="$auth.$state.loggedIn">
            <Navbar />
            <main>
                <div class="container-fluid c-section">
                    <div class="row">
                        <div class="col-sm-3"></div>
                        <div class="col-sm-6">
                            <div class="a-spacing-top-medium"></div>
                            <h3>Thêm danh mục sách mới</h3>
                            <form>
                                <div class="a-spacing-top-medium">
                                    <label for="type">Loại</label>
                                    <input type="text" id="type" class="a-input-text w-100" v-model="type">
                                </div>
                                <hr>
                                <div class="a-spacing-top-medium">
                                    <span class="a-button-register">
                                        <span class="a-button-inner">
                                            <span class="a-button-text" @click="onAddCategory">Thêm danh mục</span>
                                        </span>
                                    </span>
                                </div>
                            </form>
                            <br>
                            <div>
                                <h3>Danh sách các danh mục</h3>
                                <table class="table table-bordered table-striped">
                                    <thead class="thead-dark">
                                        <tr>
                                            <th scope="col">STT</th>
                                            <th scope="col">Loại</th>
                                            <th scope="col" class="text-center">Tùy chỉnh</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(category, index) in categories" :key="category._id">
                                            <th scope="row" class="w-25">{{ index + 1 }}</th>
                                            <td>{{ category.type }}</td>
                                            <td class="w-25 text-center">
                                                <a class="a-button-history mx-auto"
                                                    @click="onDeleteCategory(category._id, index)">Xóa</a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
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
            let respone = await $axios.$get('http://localhost:3000/api/categories');
            return {
                categories: respone.categories
            }
        } catch (err) {
            console.log(err);
        }
    },
    data() {
        return {
            type: ""
        }
    },
    methods: {
        async onAddCategory() {
            try {
                let data = { type: this.type }
                let respone = await this.$axios.$post('http://localhost:3000/api/categories', data);
                this.categories.push(data);
                this.$router.go();
            } catch (err) {
                console.log(err);
            }
        },
        async onDeleteCategory(id, index) {
            try {
                let respone = await this.$axios.$delete(`/api/categories/${id}`);
                this.$router.go();
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