<template>
  <div class="user-container">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'UserLayout',
  
}
</script>
<style>
.user-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.user-wrap {
  width: 424px;
  min-width: 430px;
  height: 100vh;
  background: #020024;
  background: linear-gradient(188deg, rgba(var(--color-rgb-base), 1) 0%, rgba(var(--color-rgb-mid), 1) 35%, rgba(var(--color-rgb-last), 1) 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.user-wrap h3 {
  margin-bottom: 30px;
  font-size: 30px;
  color: white;
}

.user-wrap .form-container {
  border: 1px solid white;
  display: flex;
  flex-direction: column;
  font-size: calc(9px + 1vmin);
  min-width: 350px;
  background-color: #fff;
  text-align: center;
  border-radius: 3px;
}

.user-wrap .form-container .form-wrap {
  padding: 5px;
}

.user-wrap .form-container .form-wrap.profile-wrap {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.user-wrap .form-container .form-wrap.profile-wrap input[type="file"] {
  display: none;
}

.form-wrap.profile-wrap span {
  cursor: pointer;
  overflow: hidden;
  border-radius: 70%;
  width: 110px;
  height: 110px;
}

.form-wrap.profile-wrap img {
  position: relative;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.form-wrap.profile-wrap label {
  text-align: center;
  top: 5px;
  position: relative;
}

.user-wrap .form-container .form-wrap label {
  padding: 5px;
  display: block;
  text-align: left;
  /* font-size: 16px; */
  /* color: white; */
}

.user-wrap .form-container .form-wrap input {
  width: 90%;
  margin: 3px;
  border-radius: 5px;
  line-height: 26px;
  border: 1px solid #ccc;
  padding: 2px 10px;
}


.user-wrap .form-container .btn-wrap {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding: 15px 0px;
}

.btn-wrap button,
.btn-wrap a {
  background-color: white;
  color: rgb(72, 69, 70);
  padding: 8px;
  margin: 5px;
  font-weight: 500;
  font-size: 15px;
  border-radius: 15px;
  border: 1px solid rgb(72, 69, 70);
  cursor: pointer;
  width: auto;
}

.btn-wrap button {
  width: 56%;
}

.btn-wrap a {
  padding: 10px;
}

.btn-wrap button:hover,
.btn-wrap a:hover {
  border-color: #eb822c;
  background-color: #eb822c;
  color: #fff;
}

.app-logo {
  height: 40vmin;
  pointer-events: none;
  padding-bottom: 30px;
}
</style>