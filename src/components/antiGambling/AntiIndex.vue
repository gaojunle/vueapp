<template>
  <div>
    <el-table v-loading="loading" :data="data.list" border stripe>
      <el-table-column label="姓名" width="120">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.gender === 'male' ? 'primay' : 'danger'"
            close-transition>{{scope.row.name}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="email" label="邮箱" width="160"></el-table-column>
      <el-table-column prop="phone" label="电话" width="120"></el-table-column>
      <el-table-column label="创建时间" width="160">
        <template slot-scope="scope">{{ formatDate(scope.row.createTime) }}</template>
      </el-table-column>
      <el-table-column prop="desc" label="描述"></el-table-column>
      <el-table-column label="操作" fixed="right" width="100">
        <template slot-scope="scope">
          <el-button type="text"
                     @click="edit(scope.row._id)">编辑
          </el-button>
          <el-button type="text"
                     @click="remove(scope.row._id)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin: 10px;overflow: hidden">
      <el-pagination
        @size-change="changePageSize"
        @current-change="query"
        :current-page="params.pn"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="params.ps"
        layout="total, sizes, prev, pager, next, jumper"
        :total="data.total">
      </el-pagination>
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
    methods: {
      query(pn) {
        pn !== undefined && (this.params.pn = pn);
        this.tableData1 = [];
        this.loading = true;

        getAntiList(this.params)
          .then(data => {
            // 处理成功的结果
            this.data.list = data.list;
            this.data.total = data.total;
          })
          .finally(() => {
            this.loading = false;
          });
      },
      changePageSize(ps) {
        this.params.ps = ps;
        this.query(1);
      },
      edit(id) {
        this.$router.push("/user/edit_" + id);
      },
      remove(id) {
        this.modal_id = id;
        this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.del(id);
          })
          .catch(err => {
            console.log(err);
            this.$message("已取消删除");
          });
      },
      del(id) {
        this.modal_loading = true;
        api.userDelete(id).then(data => {
          this.modal_loading = false;
          this.modal = false;
          this.$message.success("删除成功！");
          this.query(1);
        });
      },
      add() {
        this.$router.push("/user/add");
      },
      formatDate(time) {
        return moment(parseInt(time)).format("YYYY/MM/DD HH:mm:ss");
      }
    }
  };
</script>
