
<script>
export default {
  name: "Movieinfo",
  data(){},
  methods: {},
}
</script>

<template>
  <fragment>
    <ScrollToTop />
    <div class="movie-info goback">
      <span onClick="{handleBack}">🔙</span>
    </div>
    <div
      class="movie-info-popup"
      :style="[popupShow ? 'display:block' : 'display:none']"
    >
      <p>잠깐!<span class="blink">✋🏻</span></p>
      <br />
      <p>AI가 알려주는 영화 리뷰를 꼭 확인하세요!</p>
    </div>
    <div
      class="movie-info-container"
      :style="'{backgroundImage: `url(${backgroundImg})`}'"
    >
      <div class="movie-info-bg">
        <section class="movie-info-column">
          <div class="poster-wrap">
            <!-- <img
                :src={IMG_BASE_URL + movie.poster_path}
                alt={movie.title}
              /> -->
          </div>
          <div class="description-wrap">
            <section class="header poster">
              <h2 class="title header">
                <span class="title">{movie.title}</span>
                <span class="release_date"
                  >({movie.release_date ? movie.release_date?.substr(0, 4) :
                  '미정'})</span
                >
              </h2>
              <div class="facts">
                <span class="certification"> {movie.adult ? 19 : '전체'} </span>

                <div class="release">{movie.release_date}&nbsp;</div>
                <div class="genres">
                  { movie.genres.map((gen: any) => (
                  <span key="{gen.id}">{gen.name},&nbsp;</span>
                  )) }
                </div>
                <div class="runtime">
                  {movie.runtime > 0 ? (Math.floor(movie.runtime / 60) + '시간'
                  + movie.runtime % 60 + '분') : '개봉미정'}
                </div>
              </div>
              <div class="header-info">
                <h3 class="tagline">{movie.tagline}</h3>
                <h3>개요</h3>
                <div class="overview">
                  <p>{movie.overview || '-'}</p>
                </div>
              </div>
            </section>
            <section>
              <div class="ai-review">
                <h3>AI가 알려주는 영화 리뷰</h3>
                <MovieReview title="{movie.title}" />
              </div>
            </section>
            <section class="video">
              <h3>예고편</h3>
              <MovieVideo id="{movie.id}" />
            </section>
          </div>
        </section>
      </div>
    </div>
  </fragment>
</template>

<style scoped>
/* movie info */
.movie-info.goback {
  padding-bottom: 8px;
}

.movie-info.goback span {
  cursor: pointer;
  width: fit-content;
}

.movie-info-popup {
  display: none;
  width: 320px;
  height: 60px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -166px;
  margin-top: -150px;
  padding: 5px;
  background-color: #fff;
  border-radius: 5%;
}

.movie-info-popup p {
  text-align: center;
  font-weight: 600;
}

@keyframes blink-effect {
  50% {
    opacity: 0;
  }
}

.movie-info-popup span.blink {
  animation: blink-effect 1s step-end infinite;
}

.movie-info-container {
  /* background: linear-gradient(to bottom right, #4a3520, #4a3520d6); */
  background: rgb(0, 0, 0);
  background: radial-gradient(
    circle,
    rgba(0, 0, 0, 1) 0%,
    rgba(145, 105, 61, 1) 2%,
    rgba(74, 53, 32, 1) 100%
  );
}

div.movie-info-container {
  width: 100%;
  /* position: relative;
  z-index: 1;
   */
  height: calc(100% - 28px);
  /* overflow-y: scroll; */
}

div.movie-info-container {
  /* border-bottom: 1px solid rgba(73.5, 52.5, 31.5, 1); */
  /* background-position: left calc((50vw - 170px) - 340px) top; */
  background-size: cover;
  background-repeat: no-repeat;
  background-color: rgba(73.5, 52.5, 31.5, 1);
  background-blend-mode: multiply;
}

div.movie-info-bg {
  padding: 30px 40px;
  /* background-image: url(https://image.tmdb.org/t/p/w440_and_h660_face/vSUls0b7dNhC7tJoExF1MBYWWyh.jpg); */
  /* background-repeat: no-repeat;
  background-size: cover; */
}

.movie-info-column {
  display: flex;
  /* justify-content: space-around; */
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
}

.poster-wrap {
  height: auto;
  border-width: 0px;
  max-width: 300px;
  min-width: 200px;
  width: 300px;
  min-height: auto;
  max-width: fit-content;
  /* height: 450px; */
  overflow: hidden;
  border-radius: 8px;
}

.poster-wrap img {
  width: 100%;
  height: 100%;
  min-height: auto;
}

.description-wrap {
  color: #ffffff;
  /* display: flex; */
  padding-top: 20px;
  width: 100%;
}

.header.poster {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
  box-sizing: border-box;
  /* padding-left: 40px; */
}

.title.header,
div.ai-review {
  width: 100%;
  margin: 0;
  padding: 10px 0 10px 0;
  font-size: 1.5rem;
  font-weight: 600;
  border-top: 1px solid #fff;
}

.title.header .title {
  font-weight: 700;
}

.title.header .release_date {
  font-weight: 400;
  opacity: 0.8;
}

div.facts {
  display: flex;
  align-items: center;
  width: 100%;
}

div.facts span.certification {
  border: 1px solid rgba(255, 255, 255, 0.6);
  color: #ffffff;
  display: inline-flex;
  white-space: nowrap;
  align-items: center;
  /* align-content: center; */
  padding: 3px 4px 1px 4px;
  line-height: 1;
  border-radius: 2px;
  margin-right: 7px;
}

div.header-info h3.tagline {
  margin-bottom: 0;
  font-size: 1.1em;
  font-weight: 400;
  font-style: italic;
  opacity: 0.7;
  width: 100%;
  margin: 0 0 8px 0;
}

div.header-info h3.tagline {
  width: 100%;
  margin: 10px 0 8px 0;
}

div.ai-review {
  width: 100%;
}

div.header-info h3,
div.ai-review h3,
section.video h3 {
  margin: 10px 0 10px 0;
  font-weight: 600;
  font-size: 1.2em;
}

div.ai-review .movie-review {
  border: 1.2px dotted #fff;
  padding: 10px;
}

div.overview p,
div.ai-review p {
  line-height: 150%;
  padding-bottom: 10px;
}

div.ai-review p {
  font-size: 16px;
}

section.video {
  border-top: 1px solid #fff;
  margin-top: 30px;
}

section.video > div {
  position: relative;
  padding-top: 56%;
  width: 100%;
  height: 0;
  margin: 20px 0;
}

section.video > div > iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>