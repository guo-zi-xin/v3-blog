<script lang="ts" setup>
import AvatarLogo from '@/assets/image/logo.jpg'
import PersonalCard from '@/assets/image/personal-card-title.jpg'
</script>

<template>
  <div class="personal">
    <div class="personal-card">

      <div class="personal-card-box">
        <div class="img-box">
          <n-image :src="PersonalCard" alt="顶部" preview-disabled />
        </div>
      </div>

      <div class="personal-card-box">
        <div class="personal-card-box-content">
          <n-list hoverable clickable>
            <n-list-item>
              <n-thing title="我的胃来食" content-style="margin-top: 10px">
                <template #description>
                  <n-space size="small" style="margin-top: 4px">
                    <n-tag :bordered="false" type="info" size="small">
                      奇怪的人
                    </n-tag>
                    <n-tag :bordered="false" type="info" size="small">
                      天然呆
                    </n-tag>
                  </n-space>
                </template>
                奋勇呀然后休息呀<br>
                完成你伟大的人生
              </n-thing>
            </n-list-item>
          </n-list>
          <n-button>Follow</n-button>
        </div>
      </div>

      <div class="personal-card-circle">
        <div class="img-box personal-card-circle-image">
          <n-image :src="AvatarLogo" alt="头像" preview-disabled />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.personal {
  widows: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  position: relative;

  &-card {
    width: 100%;
    height: 100%;
    background-color: transparent;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    &-box {
      background-color: tomato;
      position: relative;
      width: 110%;
      height: 200px;
      /* 文本内容区域圆角 */
      border-radius: 20px;

      .img-box {
        border-radius: 15px;
      }

      &-content {
        position: absolute;
        inset: 0;
        padding: 30px 10px 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
      }
    }

    &-circle {
      width: 140px;
      height: 140px;
      position: absolute;
      left: -70px;
      top: 50%;
      transform: translateY(-50%);
      border-radius: 50%;
      background-image: linear-gradient(135deg, #81FFEF 10%, #F067B4 100%);
      border: 10px solid transparent;
      border-image: linear-gradient(135deg, #81FFEF 10%, #F067B4 100%) 30;
      clip-path: circle(78px at center);
    }
  }
}

.img-box {
  position: absolute;
  inset: 0;
  overflow: hidden;
  border-radius: 50%;
  background-color: #fff;
  width: 100%;
  height: 100%;
}
.n-list {
  background-color: transparent;
  .n-list-item {
    transition: background-color .3s transparent, border-color .3s transparent;
    &:hover {
      background-color: transparent;
      border-color: transparent;
    }
  }
}

.n-image {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover
}
</style>