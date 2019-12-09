<template>
  <div>
    <Form :model="filterData" inline>
      <FormItem>
        <span>ID</span>
        <Input :value="filterData.id" @input="updateId" placeholder="图片ID" clearable style="width: 130px"/>
      </FormItem>
      <FormItem>
        <Button shape="circle" icon="ios-search" @click="imageList">搜索</Button>
      </FormItem>
    </Form>
    <Table border :loading="loading" :data="tableData" :columns="tableColumns" ref="table"></Table>
    <div style="margin: 10px; overflow: hidden">
      <div style="float: right">
        <Page :total="total" :current="current" :page-size="pageSize" @on-change="pageChange"></Page>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapGetters, mapActions} from 'vuex';
  export default {
    computed: {
      ...mapGetters('image', {
        loading: 'loading',
        tableData: 'tableData',
        filterData: 'filterData',
        total: 'total',
        current: 'current',
        pageSize: 'pageSize',
      })
    },
    data() {
      return {
        tableColumns: [
          {
            title: '序号',
            key: 'id',
            minWidth: 80
          },
          {
            title: '简介',
            key: 'remark',
            minWidth: 300
          },
          {
            title: '图片地址',
            key: 'url',
            minWidth: 105
          },
          {
            title: '状态',
            key: 'status',
            minWidth: 85,
            render: (h, params) => {
              if (params.row.status === 0) {
                return h(
                  "span",
                  { style: { color: "#ed4014", "font-weight": "bold" } },
                  "已停用"
                );
              } else if (params.row.status === 1) {
                return h(
                  "span",
                  { style: { color: "#19be6b", "font-weight": "bold" } },
                  "启用中"
                );
              }
            }
          },
          {
            title: '操作',
            width: 150,
            fixed: 'right',
            render: (h, params) => {
              const text = params.row.status === 1? '禁用' : '启用';
              const type = params.row.status === 1? 'error' : 'success';
              let buttonList = [
                h(
                  "Button",
                  {
                    props: {
                      type: type,
                      size: "small",
                    },
                    style: {
                      marginRight: "5px",
                    },
                    on: {
                      click: () => {
                        // this.detail(params.row.id);
                      }
                    }
                  },
                  text
                ),
                h(
                  "Button",
                  {
                    props: {
                      type: 'primary',
                      size: "small",
                    },
                    style: {
                      marginRight: "5px",
                    },
                    on: {
                      click: () => {
                        // this.detail(params.row.id);
                      }
                    }
                  },
                  '编辑'
                )
              ];
              return h("div", buttonList);
            }
          }
        ]
      }
    },
    created() {
      this.imageList();
    },
    methods: {
      ...mapActions('image', [
        'imageList',
        'updateId',
        'updateRemark',
        'pageChange'
      ])
    }
  }
</script>
