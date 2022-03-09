<template lang="">
  <footer class="bg-primary">
    <div class="container">
      <div class="row align-items-center justify-content-center">
        <div class="col-6 col-md-3">
          <img src="@/assets/images/logo.jpeg" alt="logo" class="img-fluid">
        </div>
        <div class="col-12 col-md-5 mb-5 mb-md-0">
          <h3>Let's Stay Connected</h3>
          <p>Enter your email to unlock 10% OFF.</p>
          <div class="row align-items-center">
            <div class="col-md-11 mb-3 mb-md-0">
              <div class="form-floating">
                <input type="email" class="form-control" id="sub-email"
                placeholder="Your Email">
                <label for="sub-email">Your Email</label>
              </div>
            </div>
            <div class="col-md-1">
              <a href="#" class="c-btn">
                <span class="c-btn__text">SUBMIT</span>
              </a>
            </div>
          </div>
        </div>
        <div class="col-md-4 ps-md-7 mb-5 mb-md-0">
          <h3>Follow us</h3>
          <ul class="nav justify-content-center">
            <li>
              <a href="#" class="nav-link text-secondary social__hover">
                <BIconGithub width="24px" height="24px" />
              </a>
            </li>
            <li>
              <a href="#" class="nav-link text-secondary social__hover">
                <BIconFacebook width="24px" height="24px" />
              </a>
            </li>
            <li>
              <a href="#" class="nav-link text-secondary social__hover">
                <BIconTwitter width="24px" height="24px" />
              </a>
            </li>
            <li>
              <a href="#" class="nav-link text-secondary social__hover">
                <BIconInstagram width="24px" height="24px" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="bg-success bg-opacity-25">
      <p class="text-mute mb-0 py-3">© 2022 Nature Gift. All rights reserved</p>
    </div>
  </footer>
</template>
<script>
export default {
  name: 'Footer',
};
</script>
<style lang="scss">
  .social__hover {
  transition: all .45s cubic-bezier(.05,.2,.1,1);
    &:hover {
      transform: translateY(-10px);
      color: #f9faee!important;
    }
  }
</style>
