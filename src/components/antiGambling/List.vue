<template>
  <div>
    List
  </div>
  </div>
</template>
<script>
  import moment from "moment";
  import {getAntiList} from "@/api/api";

  export default {
    data() {
      return {
        loading: true,
        modal_loading: false,
        params: {
          kw: "",
          pn: 1,
          ps: 10
        },
        data: {
          list: [],
          total: 0
        }
      };
    },
    mounted() {
      //this.query(1);
    },
    methods: {}
  };
</script>
