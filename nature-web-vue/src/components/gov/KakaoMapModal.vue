<template>
  <Modal>
    <template #title> {{ title }} </template>
    <template #body>
      <div id="map" style="width:100%;height:100%;"></div>
    </template>
    <template #footer>
      <button type="button" @click="onClose">
        Close
      </button>
    </template>
  </Modal>
</template>

<script>
import Modal from "@/components/Modal.vue";
import { onMounted, toRefs } from "vue";

export default {
  props: [
    'title',
    'lat',
    'lon'
  ],
  components: {
    Modal,
  },
  setup(props, context) {
    const { title, lat, lon } = toRefs(props)

    const onClose = () => {
      context.emit("close");
    };

    const onLoadKakaoMap = () => {
      window.kakao.maps.load(() => {
        const mapContainer = document.getElementById('map');
        const mapOption = {
          center: new window.kakao.maps.LatLng(lat.value, lon.value), // 지도의 중심좌표
          level: 3, // 지도의 확대 레벨
        };
        let map = new window.kakao.maps.Map(mapContainer, mapOption);
        // 마커가 표시될 위치입니다 
        var markerPosition = new kakao.maps.LatLng(lat.value, lon.value);

        // 마커를 생성합니다
        var marker = new kakao.maps.Marker({
          position: markerPosition
        });

        // 마커가 지도 위에 표시되도록 설정합니다
        marker.setMap(map);

        // 아래 코드는 지도 위의 마커를 제거하는 코드입니다
        // marker.setMap(null); 
      });
    };

    onMounted(() => {
      const mapScript = document.createElement('script');

      mapScript.async = true;
      mapScript.src = `http://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.VUE_APP_KAKAO_MAP_KEY}&autoload=false`;

      document.head.appendChild(mapScript);
      mapScript.addEventListener('load', onLoadKakaoMap);
    })

    return {
      onClose,
    };
  },
};
</script>