<template>
    <div class='user-wrap'>
        <h3>회원 가입</h3>

        <SignupForm />
    </div>
</template>

<script>
import SignupForm from '@/components/user/SignupForm.vue'

export default {
    components: {
        SignupForm,
    },
}
</script>

<style></style>