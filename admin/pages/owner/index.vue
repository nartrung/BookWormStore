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
                            <h3>Thêm tác giả</h3>
                            <form>
                                <div class="a-spacing-top-medium">
                                    <label for="type">Tên</label>
                                    <input type="text" id="type" class="a-input-text w-100" v-model="name">
                                </div>
                                <div class="a-spacing-top-medium">
                                    <label for="type">Tiểu sử</label>
                                    <input type="text" id="type" class="a-input-text w-100" v-model="about">
                                </div>
                                <div class="a-spacing-top-medium">
                                    <label>Hình ảnh</label>
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
                                            <span class="a-button-text" @click="onAddOwner">Thêm tác giả</span>
                                        </span>
                                    </span>
                                </div>
                            </form>
                            <br>
                            <hr>
                            <div>
                                <h3>Danh sách tác giả</h3>
                                <table class="table table-bordered table-striped">
                                    <thead class="thead-dark">
                                        <tr>
                                            <th scope="col">STT</th>
                                            <th scope="col" class=" w-50">Tên tác giả</th>
                                            <th scope="col" colspan="2" class="text-center">Tùy chỉnh</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(owner, index) in owners" :key="owner._id">
                                            <td>{{ index + 1 }}</td>
                                            <td>{{ owner.name }}</td>
                                            <td class=" text-center">
                                                <nuxt-link :to="`/owner/${owner._id}`" class="a-button-history mx-auto">Sửa</nuxt-link>
                                            </td>
                                            <td class=" text-center">
                                                <a class="a-button-history mx-auto"
                                                    @click="onDeleteOwner(owner._id, index)">Xóa</a>
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
            let respone = await $axios.$get('http://localhost:3000/api/owners');
            return {
                owners: respone.owners
            }
        } catch (err) {
            console.log(err);
        }
    },
    data() {
        return {
            name: "",
            about: "",
            selectedFile: null,
            fileName: ""
        }
    },
    methods: {
        onFileSelected(event) {
            this.selectedFile = event.target.files[0];
            this.fileName = event.target.files[0].name;
        },
        async onAddOwner() {
            try {
                let data = new FormData();
                data.append("name", this.name);
                data.append("about", this.about);
                data.append("photo", this.selectedFile, this.selectedFile.name);
                let respone = await this.$axios.$post('http://localhost:3000/api/owners', data);
                this.owners.push(this.name);
                this.$router.go();
            } catch (err) {
                console.log(err);
            }
        },
        async onDeleteOwner(id, index) {
            try {
                let respone = await this.$axios.$delete(`/api/owners/${id}`);
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