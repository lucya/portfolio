<template>
  <div class="user-wrap">
    <img src="@/assets/logo.png" class="app-logo" alt="logo" />
    <LoginForm @handle-change="handleChange" @login="login"/>
  </div>
</template>

<script>
import LoginForm from '@/components/LoginForm.vue';

export default {
  components: {
    LoginForm,
  },
  settup() {

    return {
 
    }
  }
}

</script>

<sctyle>
  .error {
  color: red;
}
</sctyle>