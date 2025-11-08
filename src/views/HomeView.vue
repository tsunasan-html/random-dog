<template>
  <div class="container">
    <h1 class="title">Random Dog</h1>

    <div class="card">
      <button
        v-if="canPrev"
        class="arrow-btn left"
        :disabled="isLoading"
        @click="prev"
      >
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
          <path d="M15 18l-6-6 6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>

      <div
        class="img-wrap"
        @touchstart="onTouchStart"
        @touchmove.prevent
        @touchend="onTouchEnd"
      >
        <transition name="fade">
          <img v-if="currentImg" :src="currentImg" class="dog-img" />
        </transition>

        <!-- お気に入り -->
        <button
          v-if="currentImg"
          class="heart-btn"
          :class="{ active: isDone }"
          :disabled="isLoading || isDone"
          @click="emitFavorite"
        >
          <svg viewBox="0 0 24 24" width="22" height="22">
            <path
              d="M12.1 21.1c-.3.2-.6.2-.9 0C6.3 17.6 3 14.7 3 10.8 3 8 5.2 6 7.8 6c1.5 0 2.9.7 3.7 1.9C12.3 6.7 13.7 6 15.2 6 17.8 6 20 8 20 10.8c0 3.9-3.3 6.8-7 10.3l-.9.7z"
              stroke="currentColor"
              stroke-width="1.8"
              fill="none"
            />
          </svg>
        </button>

        <!-- ローディング/スケルトン -->
        <div v-if="isLoading" class="loading-overlay">
          <div class="loader"></div>
        </div>
        <div v-if="isLoading && !currentImg" class="skeleton"></div>
      </div>

      <!-- 右矢印（常に次へ可能。末尾なら取得） -->
      <button
        class="arrow-btn right"
        :disabled="isLoading"
        @click="next"
      >
        <svg viewBox="0 0 24 24" width="22" height="22">
          <path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>

    <p class="hint hint--pc">Tip: ← / → でも操作できます</p>
    <p class="hint">Powered by dog.ceo</p>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      images: [],
      index: -1,
      isLoading: false,
      isDone: false,
      touchStartX: 0,
      touchDeltaX: 0,
    }
  },
  computed: {
    currentImg() {
      return this.images[this.index] || null
    },
    canPrev() {
      return this.index > 0
    }
  },
  methods: {
    emitFavorite() {
      if (!this.currentImg) return
      this.isDone = true

      this.$store.commit('favoriteDog', {
        id: Date.now() + Math.floor(Math.random() * 100),
        url: this.currentImg,
      })
    },
    async randomDogImg() {
      this.isLoading = true
      try {
        const res = await fetch("https://dog.ceo/api/breeds/image/random")
        const data = await res.json()
        return data.message
      } catch (e) {
        console.error(e)
        return null
      } finally {
        this.isLoading = false
      }
    },
    async next() {
      if (this.isLoading) return
      if (this.index < this.images.length - 1) {
        this.index++
        this.isDone = false
        return
      }
      
      const url = await this.randomDogImg()
      if (!url) return
      this.images.push(url)
      this.index++
      this.isDone = false
    },
    prev() {
      if (this.isLoading || !this.canPrev) return
      this.index--
      this.isDone = false
    },

    onKey(e) {
      if (e.key === 'ArrowRight') this.next()
      if (e.key === 'ArrowLeft') this.prev()
    },
   
    onTouchStart(e) {
      this.touchStartX = e.changedTouches[0].clientX
      this.touchDeltaX = 0
    },
    onTouchEnd(e) {
      this.touchDeltaX = e.changedTouches[0].clientX - this.touchStartX
      const threshold = 40
      if (this.touchDeltaX > threshold) this.prev()
      else if (this.touchDeltaX < -threshold) this.next()
      this.touchStartX = 0
      this.touchDeltaX = 0
    },
  },
  async mounted() {
    const first = await this.randomDogImg()
    if (first) {
      this.images = [first]
      this.index = 0
    }
    window.addEventListener('keydown', this.onKey)
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.onKey)
  }
}
</script>

<style>
@media (min-width: 768px) {
  #app{
    padding: 24px
  }
}
/* ========== 矢印ボタン（共通） ========== */
.arrow-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 3;
  width: 48px;
  height: 48px;
  border: none;
  border-radius: 50%;
  background: rgba(255,255,255,0.9);
  box-shadow: 0 4px 16px rgba(0,0,0,0.15);
  display: grid;
  place-items: center;
  cursor: pointer;
  color: #111827;
  backdrop-filter: blur(6px);
  transition: transform .12s ease, opacity .2s ease;
}
.arrow-btn.left  { left: 16px; }
.arrow-btn.right { right: 16px; }
.arrow-btn:hover { transform: translateY(-50%) scale(1.08); }
.arrow-btn:disabled { opacity: .5; cursor: not-allowed; }

/* ========== スマホ調整 ========== */
@media (max-width: 767px) {
  .arrow-btn {
    width: 38px;          /* ← 少し小さく */
    height: 38px;
    box-shadow: 0 3px 10px rgba(0,0,0,0.1);
    background: rgba(255,255,255,0.85);
  }
  .arrow-btn svg {
    width: 22px;          /* ← アイコンも小さく */
    height: 22px;
  }
  .arrow-btn.left  { left: 6px; }
  .arrow-btn.right { right: 6px; }

  /* hover効果はスマホでは不要に */
  .arrow-btn:hover { transform: translateY(-50%) scale(1); }

  /* ヒント非表示（既にOK） */
  .hint--pc { display: none; }
}
</style>
