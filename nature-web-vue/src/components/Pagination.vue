<template>
  <div className="page navigation">
    <ul className="pagination">
      <li :class="pageNo === 1 ? 'disabled' : ''" @click.prevent="goFirst">
        <span>«</span>
      </li>
      <li :class="pageNo === 1 ? 'disabled' : ''" @click.prevent="goPrev">
        <span>‹</span>
      </li>
      <li v-for="page in pages" :key="page" :class="pageNo === page ? 'active' : ''"
        @click.prevent="() => { pageNo = page; goPage() }">
        <span>{{ page }}</span>
      </li>
      <li :class="pageNo === totalPages ? 'disabled' : ''" @click.prevent="goNext">
        <span>›</span>
      </li>
      <li :class="pageNo === totalPages ? 'disabled' : ''" @click.prevent="goLast">
        <span>»</span>
      </li>
    </ul>
    <span v-if="usePageGo">
      <label>페이지</label>
      <input type="text" style="width: 40px;" v-model.number="pageNo" @keyup.enter="goPage()">
      <span> / {{ totalPages }}</span>
    </span>
  </div>
</template>

<script>
import { ref, toRefs, onMounted } from 'vue'

export default {
  props: [
    'cntPerList', 'usePageGo',
  ],
  setup(props, context) {
    const {
      cntPerList, usePageGo } = toRefs(props)
    const pageNo = ref(1)
    const totalPages = ref(1) // 총 페이지수
    const numOfNavigation = ref(10) // 페이징 갯수
    let pages = ref([])
    const totalCnt = ref(props.totalCnt)

    const getPageNumbers = () => {
      totalPages.value = Math.ceil(totalCnt.value / cntPerList.value) // 65

      let currentRange = Math.floor((pageNo.value - 1) / numOfNavigation.value); // 0 or 1 or 2 or 3 ... 앞자리 
      let startRange = (currentRange * numOfNavigation.value) + 1;
      let endRange = (currentRange + 1) * numOfNavigation.value

      pages.value = []
      for (let i = startRange; i <= endRange; i++) {
        if (i <= totalPages.value)
          pages.value.push(i)
      }
    }

    const goPage = () => {
      getPageNumbers();
      context.emit('goPage', pageNo.value)
    }
    const goFirst = () => {
      pageNo.value = 1;
      goPage()
    }
    const goPrev = () => {
      pageNo.value = pageNo.value - 1;
      goPage()
    }
    const goLast = () => {
      pageNo.value = totalPages.value
      goPage()
    }
    const goNext = () => {
      pageNo.value = pageNo.value + 1;
      goPage()
    }

    const resetPagination = () => {
      let width = window.innerWidth;
      if (width <= 767) {
        numOfNavigation.value = 5
        getPageNumbers()
      } else {
        numOfNavigation.value = 10
        getPageNumbers()
      }
    }
    // onMounted(() => {
    window.addEventListener(`resize`, resetPagination);
    // })

    const setTotalCnt = (cnt) => {
      totalCnt.value = cnt;
      getPageNumbers()
    }
    return {
      goPage,
      pageNo,
      totalPages,
      setTotalCnt,
      pages,
      goFirst,
      goPrev,
      goLast,
      goNext,
    }
  }
}
</script>
<style scoped>
.page.navigation {
  margin: 10px;
}
ul.pagination {
  display: flex
}

ul.pagination li {
  cursor: pointer;
}

ul.pagination li.active {
  color: orange;
}

ul.pagination li {
  text-align: center;
  margin-left: -1px;
  line-height: 1.25;
  color: #007bff;
  background-color: #fff;
  border: 1px solid #dee2e6;
  display: block;
  padding: 0.5rem 0.75rem;
}

ul.pagination li:hover {
  z-index: 2;
  color: #0056b3;
  text-decoration: none;
  background-color: #e9ecef;
  border-color: #dee2e6;
}

ul.pagination li.disabled {
  color: #6c757d;
  pointer-events: none;
  cursor: auto;
  background-color: #fff;
  border-color: #dee2e6;
}
</style>