<template>
    <div>
        <Navbar />
        <main>
            <div class="container-fluid c-section">
                <div class="row">
                    <div class="col-sm-3"></div>
                    <div class="col-sm-6">
                        <div class="a-spacing-top-medium"></div>
                        <h2>Profile Page</h2>
                        <form>
                            <!-- Name -->
                            <div class="a-spacing-top-medium">
                                <label>Name</label>
                                <input class="a-input-text w-100" v-model="name" :placeholder="$auth.$state.user.name" />
                            </div>
                            <!-- Email -->
                            <div class="a-spacing-top-medium">
                                <label>Email</label>
                                <input class="a-input-text w-100" v-model="email" :placeholder="$auth.$state.user.email" />
                            </div>
                            <!-- Password -->
                            <div class="a-spacing-top-medium">
                                <label>Password</label>
                                <input class="a-input-text w-100" v-model="password" />
                            </div>
                            <!-- Button -->
                            <hr />
                            <div class="row">
                                <div class="a-spacing-top-large">
                                    <span class="a-button-register ml-3">
                                        <span class="a-button-inner">
                                            <span class="a-button-text" @click="onUpdateProfile">Update Profile</span>
                                        </span>
                                    </span>
                                </div>
                                <div class="a-spacing-top-large">
                                    <span class="a-button-logout ml-3">
                                        <span class="a-button-inner">
                                            <span class="a-button-text" @click="onLogout">Logout</span>
                                        </span>
                                    </span>
                                </div>
                            </div>
                        </form>
                        <br />
                    </div>
                    <div class="col-sm-3"></div>
                </div>
            </div>
        </main>
    </div>
</template>
      
<script>
export default {
    data() {
        return {
            name: "",
            email: "",
            password: ""
        };
    },
    methods: {
        async onUpdateProfile() {
            let data = {
                name: this.name,
                email: this.email,
                password: this.password
            };
            try {
                let response = await this.$axios.$put("/api/auth/user", data);
                if (response.success) {
                    this.name = "";
                    this.email = "";
                    this.password = "";
                    await this.$auth.fetchUser();
                }
                this.$router.push("/");
            } catch (err) {
                console.log(err);
            }
        },
        async onLogout() {
            await this.$auth.logout();
        }
    }
};
</script>