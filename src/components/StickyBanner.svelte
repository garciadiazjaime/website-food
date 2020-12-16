<style>
.sticky-banner {
  background-image: url('/banner_bkg_mobile.svg');
  background-size: auto 100%;
  background-position: top right;
  background-repeat: no-repeat;
  padding: 30px 20px;
  background-color: #dff7f6;
  min-height: 156px;
}

@media (min-width: 600px) {
  .sticky-banner {
    background-image: url("/banner_bkg.svg");
  }
}

.content {
  text-align: center;
}

@media (min-width: 600px) {
  .content {
    margin-right: 200px;
  }
}
</style>

<div class="sticky-banner">
  <div class="content">
    <slot></slot>
  </div>
</div>
