import axios from "axios";

const http = axios.create({
  baseURL: process.env.REACT_APP_API_DOMAIN,
  // `withCredentials`은 자격 증명을 사용하여 사이트 간 액세스 제어 요청을 해야 하는지 여부를 나타냅니다.
  withCredentials: true, // 기본값
  timeout: 5000,
  responseType: 'json',
  // `headers`는 사용자 지정 헤더입니다.
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
    'Access-Control-Allow-Origin': `${process.env.REACT_APP_API_DOMAIN}`,
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Headers': '*',
  },
  // method: ['POST', 'GET', 'OPTIONS', 'DELETE', 'PUT'],
  // `transformResponse`는 응답 데이터가 then/catch로 전달되기 전에 변경할 수 있게 해줍니다.
  // transformResponse: [(data) => {
  //   // 데이터를 변환하려는 작업 수행
  //   console.log('transformResponse', data);
  //   return data;
  // }],
});

// Request interceptors
// http.interceptors.request.use(
//   error => {
//     return Promise.reject({ ...error })
//   },
// )

// Store requests
let responseChk: boolean = true;

// Response interceptors
http.interceptors.response.use(
  response => response,
  error => {
    const status = error.response ? error.response.status : null;
    if (status === 401 && responseChk) {
      alert('로그인이 필요합니다.');
      responseChk = false;
      window.location.href = "/";
    }
    return Promise.reject({ ...error })
  },
)

export default http;

