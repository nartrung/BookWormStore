<template>
  <div>
    <hr />
    <div class="reviewsMedley">
      <div class="row">
        <div class="col-lg-4 col-md-5 col-sm-12">
          <!-- Total Customer reviews -->
          <a href="#" class="a-color-base">
            <h2>{{ product.reviews.length }} người đã đánh giá</h2>
          </a>

          <div class="clearfix">
            <div class="float-left">
            </div>
          </div>
          <template v-if="$auth.$state.loggedIn">
            <h3 class="a-spacing-micro">Thêm đánh giá cho sách này</h3>
            <div class="a-row a-spacing-large">Chia sẻ cảm nhận của bạn với những người khác</div>
            <div class="a-row">
              <!-- Link to another Review page -->
              <span class="a-button-base writeReviewButton cm-cr-button-wide">
                <span class="a-button-inner">
                  <nuxt-link :to="`/reviews/${product._id}`" class="a-button-text">Viết đánh giá</nuxt-link>
                </span>
              </span>
            </div>
          </template>
          <div class="clearfix">
            <div class="float-left">
              <hr class="mt-4 a-spacing-large" />
            </div>
          </div>
        </div>
        <div class="col-lg-6 col-md-7 col-sm-12">
          <div class="cr-lighthut">
            <h3>Đọc những bình luận với từ khóa liên quan</h3>
            <div class="cr-lighthouse-terms">
              <span class="cr-lighthouse-span">
                <a href="#">
                  <span class="cr-lighthouse-term">phải đọc</span>
                </a>
              </span>
              <span class="cr-lighthouse-span">
                <a href="#">
                  <span class="cr-lighthouse-term">sách hay</span>
                </a>
              </span>
              <span class="cr-lighthouse-span">
                <a href="#">
                  <span class="cr-lighthouse-term">được đề xuất</span>
                </a>
              </span>
              <br />
              <span class="cr-lighthouse-span">
                <a href="#">
                  <span class="cr-lighthouse-term">sách hay</span>
                </a>
              </span>
            </div>
          </div>
          <div class="cr-widget-focalreviews">
            <div class="card-padding">
              <div class="review-header">
                <h3>
                  <span class="a-size-base">Hiển thị 1-8 của {{ product.reviews.length }} đánh giá</span>
                </h3>
              </div>
              <div class="review-sort-type">
                <span class="a-dropdown-container">
                  <span class="a-button a-button-dropdown">
                    <span class="a-button-inner">
                      <span class="a-button-text">
                        <span class="a-dropdown-prompt">Top Đánh giá</span>
                      </span>
                      <i class="a-icon a-icon-dropdown"></i>
                    </span>
                  </span>
                </span>
              </div>
              <div class="review-body" v-for="review in reviews" :key="review._id">
                <div class="genome-widget">
                  <a href="#">
                    <div class="profile-avatar">
                      <img src="/img/avatar.png" style="max-width: 50px;" />
                    </div>
                    <div class="profile-content">
                      <span class="a-profile-name">{{ review.user.name }}</span>
                    </div>
                  </a>
                </div>
                <div class="a-row">
                  <a href="#">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                  </a>
                  <span class="a-letter-space"></span>
                  <a href="#" class="review-title">{{ review.headline }}</a>
                </div>
                <div class="review-data">
                  <span class="a-color-secondary">Format: Bìa mềm</span>
                  <div
                    style="width: 1px !important; height: 15px !important; background-color: #ddd; display: inline-block; margin: 0px 5px -3px 5px;">
                  </div>
                  <span class="avp-badge a-color-state">Đã mua</span>
                </div>
                <div class="review-body">
                  Chi tiết: 
                  <span>{{ review.body }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-2 col-md-0 col-sm-0"></div>
      </div>
    </div>
  </div>
</template>
  
<script>
export default {
  props: [
    "product",
    "reviews"
  ]
};
</script>