<template>
  <div className="gov-container">
    <table>
      <colgroup>
        <col className="sido" />
        <col className="sigun" />
        <col className="remarks" />
        <col className="shel-nm" />
        <col className="address" />
        <col className="shel-av" />
        <col className="lenth" />
        <col className="shel-div-type" />
        <col className="height" />
      </colgroup>
      <caption>행정안전부_지진해일 긴급대피장소</caption>
      <thead>
        <tr>
          <th>시도명</th>
          <th>시군구명</th>
          <th>대피지구명</th>
          <th>대피장소명</th>
          <th>주소</th>
          <th>수용가능인원수</th>
          <th>해변으로부터거리</th>
          <th>대피소 분류명</th>
          <th>해발높이</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="data in list" :key="data.id">
          <td>{{ data.sido_name }}</td>
          <td>{{ data.sigungu_name }}</td>
          <td>{{ data.remarks }}</td>
          <td>{{ data.shel_nm }}</td>
          <td className="address"><a @click.prevent="showMap(data)">{{ data.address }}</a></td>
          <td>{{ data.shel_av }}</td>
          <td>{{ data.lenth }}</td>
          <td>{{ data.shel_div_type }}</td>
          <td>{{ data.height }}</td>
        </tr>
      </tbody>
    </table>
    <!-- pagenation -->
    <Pagination ref="paginationRef" :totalCnt="totalCnt" :cntPerList="cntPerList" @goPage="getTsunamiShelter" />

  </div>
  <teleport to="#modal">
    <KakaoMapModal v-if="showModal" @close="closeModal" :title="title" :lat="lat" :lon="lon" />
  </teleport>
</template>

<script>
import { ref, onMounted, computed, watch } from 'vue'
import http from '@/http-common'
import Pagination from '@/components/Pagination.vue'
import KakaoMapModal from '@/components/gov/KakaoMapModal.vue'

export default {
  components: {
    Pagination,
    KakaoMapModal
  },
  setup() {
    const list = ref([]) // 데이터 목록
    // pagination 설정값
    const totalCnt = ref(0) // 총 데이터 건수
    const cntPerList = ref(10) // 조회 건수
    const paginationRef = ref(null);
    // modal 설정값
    const showModal = ref(false);
    const title = ref('') // modal 창 title ( 주소 )
    const lat = ref() // 위도
    const lon = ref() // 경도

    const getTsunamiShelter = async (pageNo) => {
      try {
        const res = await http.get('gov/getTsunamiShelter1List', { params: { pageNo: pageNo, cntPerList: cntPerList.value } })

        totalCnt.value = res.data.TsunamiShelter[0].head[0].totalCount;
        if (paginationRef.value) {
          paginationRef.value.setTotalCnt(totalCnt.value)

        }

        list.value = res.data.TsunamiShelter[1].row
      } catch (error) {
        console.log(error)
      }
    }

    getTsunamiShelter(1)

    const showMap = (data) => {
      title.value = data.address
      lat.value = data.lat
      lon.value = data.lon

      openModal()
    }
    const openModal = () => {
      showModal.value = true;
    };

    const closeModal = () => {
      showModal.value = false;
    };



    return {
      list,
      totalCnt,
      cntPerList,
      // pageNo,
      // numOfPages,
      // numOfNavigation,
      getTsunamiShelter,
      showMap,
      showModal,
      closeModal,
      title,
      lat,
      lon,
      paginationRef,
    }
  }
}
</script>

<style scoped>
.gov-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 10px;
  overflow-x: auto;
}

caption {
  padding: 10px;
  font-weight: 900;
  font-size: 2rem;
}

table,
td,
th {
  border: 1px solid #ddd;
  text-align: left;
  font-size: 1rem;
  text-size-adjust: auto
}

@media (min-width: 360px) {
  caption {
    font-size: 1rem;
  }

  td,
  th {
    font-size: 0.5rem;
  }
}

@media (min-width: 767px) {
  caption {
    font-size: 1.5rem;
  }

  td,
  th {
    font-size: 1rem;
  }
}

@media (min-width: 1024) {
  caption {
    font-size: 2rem;
  }

  td,
  th {
    font-size: 1.5rem;
  }
}

th,
td {
  padding: 5px;
}

th {
  background-color: #f2f2f2;
}

table {
  /* width: 100%; */
  max-height: 100%;
  overflow: auto;
  border-collapse: collapse;
  display: block;
  border: none;
}

.address:hover {
  text-decoration: underline;
  cursor: pointer;
  color: var(--color-active);
  /* text-decoration-line: underline overline; */
}
</style>