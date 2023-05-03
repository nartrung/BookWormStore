<template>
    <div>
    <Navbar />
      <div class="registerPage">
        <div class="container">
          <div class="row">
            <div class="col-sm-4"></div>
            <div class="col-sm-4">
              <div class="text-center">
                <nuxt-link to="/">
                  <img src="/img/logo-black.png" />
                </nuxt-link>
              </div>
              <form class="mt-4">
                <div class="a-box a-spacing-extra-large">
                  <div class="a-box-inner">
                    <h1 class="a-spacing-small">Đăng nhập</h1>
                    <div class="a-alert-content text-danger font-weight-bold">{{ message }}</div>
                    <div class="a-row a-spacing-base">
                      <label for="ap_customer_name" class="a-form-label">Email</label>
                      <input
                        type="email"
                        id="ap_customer_name"
                        class="a-input-text form-control auth-autofocus auth-required-field auth-contact-verification-request-info"
                        v-model="email"
                      />
                    </div>
                    <div class="a-row a-spacing-base">
                      <label for="ap_customer_name" class="a-form-label">Mật khẩu</label>
                      <input
                        type="password"
                        id="ap_customer_name"
                        class="a-input-text form-control auth-autofocus auth-required-field auth-contact-verification-request-info"
                        v-model="password"
                      />
                    </div>
                    <div class="a-row a-spacing-extra-large mb-4">
                      <span class="a-button-primary">
                        <span class="a-button-inner">
                          <span class="a-button-text" @click="onLogin">Đăng nhập</span>
                        </span>
                      </span>
                      <div class="a-row a-spacing-top-medium a-size-small">
                        <b>
                          Với việc đăng ký tài khoản, đồng nghĩa với bạn đã đồng ý với 
                          <span class="acrCustomerReviewLink">Điều khoản sử dụng</span> và
                          <span class="acrCustomerReviewLink">Chính sách riêng tư</span> của BookWorm
                        </b>
                      </div>
                    </div>
                    <hr />
                    <div class="a-row">
                      <b>
                        Chưa có tài khoản?
                        <nuxt-link to="/signup" class="a-link-emphasis">Đăng ký ngay</nuxt-link>
                      </b>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
  
  <script>
  export default {
    middleware: "auth",
    auth: "guest",
    data() {
      return {
        email: "",
        password: "",
        message: ""
      };
    },
    methods: {
      async onLogin() {
        try {
          this.$auth.loginWith("local", {
            data: {
              email: this.email,
              password: this.password,
            }
          });
          setTimeout(()=>{
            this.message= "Email hoặc mật khẩu không đúng"
          }, 600);
        } catch (err) {
          console.log(err);
        }
      }
    }
  };
  </script>