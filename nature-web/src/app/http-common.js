import axios from "axios";

const http = axios.create({
  baseURL: process.env.REACT_APP_API_DOMAIN,
  timeout: 1000,
  // `transformResponse`는 응답 데이터가 then/catch로 전달되기 전에 변경할 수 있게 해줍니다.
  transformResponse: [function (data) {
    // 데이터를 변환하려는 작업 수행

    return data;
  }],

  // `headers`는 사용자 지정 헤더입니다.
  headers: { 'Content-type': 'application/json' },
  // `withCredentials`은 자격 증명을 사용하여 사이트 간 액세스 제어 요청을 해야 하는지 여부를 나타냅니다.
  withCredentials: true, // 기본값
});

export default http;

