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
                            <h3>Chỉnh sửa thông tin tác giả</h3>
                            <div class="a-alert-content text-success font-weight-bold">{{ message }}</div>
                            <form>
                                <div class="a-spacing-top-medium">
                                    <label for="type">Tên</label>
                                    <input type="text" id="type" class="a-input-text w-100" v-model="name" :placeholder="owner.name">
                                </div>
                                <div class="a-spacing-top-medium">
                                    <label for="type">Tiểu sử</label>
                                    <textarea type="text" id="type" class="a-input-text w-100" v-model="about" :placeholder="owner.about" style="height: 10em !important;"></textarea>
                                </div>
                                <hr>
                                <div class="a-spacing-top-medium">
                                    <span class="a-button-register">
                                        <span class="a-button-inner">
                                            <span class="a-button-text" @click="onUpdateOwner">Cập nhật</span>
                                        </span>
                                    </span>
                                </div>
                            </form>
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
            let respone = await $axios.$get(`http://localhost:3000/api/owners/${params.id}`);
            return {
                owner: respone.owner
            };
        } catch (err) {
            console.log(err);
        }
    },
    data(){
        return{
            name: "",
            about: "",
            message: ""
        }
    },
    methods:{
        async onUpdateOwner(){
            try{
                let data = {
                name: this.name,
                about: this.about,
            };
            let result = await this.$axios.$put(`/api/owners/${this.$route.params.id}`, data);
            this.message = "Thông tin tác giả đã được cập nhật"
            }
            catch(err){
                console.log(err);
            }
        }
    }

};
</script>