<template>
    <form class="form-container" @submit.prevent="handleSubmit" autocomplete="off">
        <div class="form-wrap profile-wrap">
            <span @click="handleUploadClick">
                <img :src="imagePreviewUrl ? imagePreviewUrl : profile_base" alt="profile" />
            </span>
            <input type="file" name="photoURL" accept="image/*" ref="profileImgRef" @change.prevent="handleUpload" />
            <label htmlFor="photoURL">프로필 이미지</label>
        </div>
        <div class="form-wrap">
            <label htmlFor="usename">Username <span class="warnning">*</span></label>
            <input type="text" name="username" autocomplete="off" @change.prevent="handleChange" maxLength="20" required />
        </div>
        <div class="form-wrap">
            <label htmlFor="email">Email <span class="warnning">*</span></label>
            <input type="email" name="email" autocomplete="off" inputMode="email" @change.prevent="handleChange" required />
        </div>
        <div class="form-wrap">
            <span class="inWarnning">
                <label htmlFor="password">Password <span class="warnning">*</span></label>
                <span class="warnning" style="font-size: small" v-if="isValid1.invalid">{{ isValid1.msg }}</span>
            </span>
            <input type="password" name="password" autocomplete="off" placeholder="최소 6자 이상" @keyup.prevent="validator"
                @change.prevent="handleChange" required />

        </div>
        <div class="form-wrap">
            <span class="inWarnning">
                <label htmlFor="password-confirm">Password Confirm <span class="warnning">*</span></label>
                <span class="warnning" style="font-size: small" v-if="isValid2.invalid">{{ isValid2.msg }}</span>
            </span>
            <input type="password" name="password-confirm" autocomplete="off" placeholder="최소 6자 이상"
                @keyup.prevent="validator" @change.prevent="setPwdConfirm" required />

        </div>
        <div class="btn-wrap">
            <button type="submit">가입</button>
            <router-link to="/">로그인</router-link>
        </div>
    </form>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from "vue-router";
import http from '@/http-common'

import profile_base from '@/assets/images/profile_base.png'


export default {
    setup() {
        const router = useRouter();

        const userInfo = ref({});
        const pwdConfirm = ref('');

        const file = ref();
        const profileImgRef = ref(null);
        const imagePreviewUrl = ref();

        const initValid = { invalid: false, msg: '' }
        const isValid1 = ref(initValid);
        const isValid2 = ref(initValid);

        const handleChange = (e) => {
            Object.assign(userInfo.value, {
                [e.target.name]: e.target.value
            });
        }

        const handleSubmit = async () => {
            const formData = new FormData();
            formData.append('file', file.value);
            formData.append('user', JSON.stringify(userInfo.value));

            try {
                await http.post('/user/signup', formData)

                const email = userInfo.value.email;
                setTimeout(() => {
                    alert("회원 가입을 환영합니다.")

                    router.push({
                        name: "Login",
                        params: {
                            email: email,
                        },
                    });
                }, 1500)
            } catch (error) {
                console.log(error);
                alert('에러가 발생했습니다. 관리자에게 문의하세요.')
            }
        }
        const setPwdConfirm = (e) => {
            pwdConfirm.value = e.target.value;
        }

        const handleUpload = (e) => {
            const reader = new FileReader();
            const file = e.target.files && e.target.files[0]

            reader.onloadend = () => {
                file.value = file;
                if (reader.result) {
                    imagePreviewUrl.value = reader.result.toString();
                }
            };
            reader.readAsDataURL(file); // by Blob
        }


        const handleUploadClick = () => {
            profileImgRef.value.click();
        }

        const validator = (e) => {
            let name = e.target.name;
            let value = e.target.value;

            if (name === 'password') {
                let { invalid, msg } = initValid
                if (value.length >= 1 && value.length < 6) {
                    invalid = true;
                    msg = "6자 이상이 되어야합니다."
                }
                isValid1.value = { invalid: invalid, msg: msg }
                console.log(isValid1.value)
            }
            if (name === 'password-confirm') {
                let { invalid, msg } = initValid

                if (pwdConfirm.value.length && (userInfo.value.password !== pwdConfirm.value)) {
                    invalid = true
                    msg = "비밀번호가 일치하지 않습니다."
                }
                isValid2.value = { invalid: invalid, msg: msg }
            }
        }

        return {
            handleChange,
            handleSubmit,
            setPwdConfirm,
            file,
            profile_base,
            imagePreviewUrl,
            profileImgRef,
            handleUploadClick,
            handleUpload,
            validator,
            isValid1,
            isValid2,
        }
    }
}
</script>

<style>
.user-wrap .form-container .form-wrap .inWarnning {
    display: flex;
    align-items: center;
}
</style>