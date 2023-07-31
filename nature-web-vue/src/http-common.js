import axios from "axios";

const http = axios.create({
  baseURL: process.env.VUE_APP_API_DOMAIN,
  // `withCredentials`은 자격 증명을 사용하여 사이트 간 액세스 제어 요청을 해야 하는지 여부를 나타냅니다.
  withCredentials: true, // 기본값
  timeout: 5000,
  responseType: 'json',
  // `headers`는 사용자 지정 헤더입니다.
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
    'Access-Control-Allow-Origin': `${process.env.VUE_APP_API_DOMAIN}`,
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Headers': '*',
  },
  
});

export default http;

