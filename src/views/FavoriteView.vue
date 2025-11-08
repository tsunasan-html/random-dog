<template>
  <div class="favorite">
    <h2 v-if="storeDogs.length === 0" class="empty-message">
      Your favorites list is empty<br>
      <router-link to="/" class="back-link">Back to Home</router-link>
    </h2>
    
    <ul class="gallery">
      <li v-for="dog in storeDogs" :key="dog.id" class="gallery-item">
        <div class="img-wrapper">
          <img :src="dog.url" alt="" loading="lazy" />
          <button class="delete-btn" @click="deleteImg(dog.id)">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </li>
    </ul>
     
  </div>
</template>

<script>
export default {
  computed: {
    storeDogs () {
      return this.$store.state.dogs
    }
  },
  methods: {
    deleteImg(id) {
      this.$store.commit("deleteImgId", id);
    }
  }
}
</script>

<style>
.empty-message {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  font-size: 1.25rem;
  color: #111827;
  text-align: center;
  gap: 12px;
}
.back-link {
  display: inline-block;
  margin-top: 8px;
  padding: 10px 16px;
  font-size: 1rem;
  font-weight: 700;
}
.gallery {
  list-style: none;
  padding: 0;
  margin: 16px 0 0;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr)); 
  gap: 12px;
}
@media (min-width: 768px){
.favorite {
  width: min(96vw, 960px);
  margin: 0 auto;
  padding: 0 12px 40px;
}

/* ========= 画像ギャラリー ========== */
.gallery {
  list-style: none;
  padding: 0;
  margin: 24px 0 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); /* ← 自動調整でHomeのカード感に近い */
  gap: 20px;
}

/* ========= 各画像カード ========== */
.gallery-item {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(17,24,39,0.08);
  overflow: hidden;
  position: relative;
  transition: transform 0.2s ease, box-shadow 0.3s ease;
}
.gallery-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 28px rgba(17,24,39,0.12);
}

.img-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
}

.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.3s ease;
}
.gallery-item:hover img {
  transform: scale(1.04);
}

/* ========= 削除ボタン ========== */
.delete-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(255,255,255,0.8);
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  color: #111827;
  font-size: 16px;
  cursor: pointer;
  display: grid;
  place-items: center;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  transition: background 0.2s ease, transform 0.1s ease;
}
.delete-btn:hover {
  
  transform: scale(1.08);
}

}

.gallery-item {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 6px 16px rgba(0,0,0,.08);
  overflow: hidden;
  position: relative;
}

.img-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
}

.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.delete-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  background: rgba(0,0,0,0.6);
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease;
}
</style>
