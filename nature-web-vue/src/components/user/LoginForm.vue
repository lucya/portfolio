<template>
  <h3>
    로그인</h3>
  <form class="form-container" autocomplete="off" @submit.prevent="handleSubmit">
    <div class="form-wrap">
      <label for="email">Email</label>
      <input type="email" name="email" inputmode="email" ref="emailRef" @change.prevent="handleChange"
        @keyup.enter="handleSubmit" />
    </div>
    <div class="form-wrap">
      <label for="password">Password</label>
      <input type="password" name="password" ref="pwdRef" @change.prevent="handleChange" @keyup.enter="handleSubmit" />
    </div>
    <div class="btn-wrap">
      <button type="button" @click.prevent="handleSubmit">로그인</button>
      <router-link to="/signup">회원 가입</router-link>
    </div>
  </form>
  <p v-if="error" class="error">
    {{ error }}
  </p>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import http from '@/http-common'
import { useUser } from "@/composables/user";

export default {
  setup() {
    const router = useRouter()
    const emailRef = ref(null);
    const pwdRef = ref(null);
    const userInfo = ref({});
    const { doLogin } = useUser();

    onMounted(() => {
      emailRef.value.focus()
    })

    const handleChange = (e) => {
      userInfo.value = { ...userInfo.value, [e.target.name]: e.target.value }
    }

    const handleSubmit = async () => {
      if (!userInfo.value.email) {
        emailRef.value.focus()
        return;
      } else if (!userInfo.value.password) {
        pwdRef.value.focus()
        return;
      }

      await http.post('/api/user/login', { email: userInfo.value.email, password: userInfo.value.password })
        .then(({ data }) => {
          doLogin(data)
          router.push({
            name: "Home",
          });
        })
        .catch((error) => {
          alert("가입된 이메일 또는 비밀번호 확인후 입력해주세요.")
          console.log(error)
        })
    }
    return {
      emailRef,
      pwdRef,
      handleChange,
      handleSubmit,
    }
  },
}

</script>

<style></style>