<template>
  <div>
    <Form :model="filterData" inline>
      <FormItem>
        <span>ID</span>
        <Input :value="filterData.id" @input="updateId" placeholder="文章ID" clearable style="width: 130px"/>
      </FormItem>
      <FormItem>
        <Button shape="circle" icon="ios-search" @click="articleList">搜索</Button>
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
      ...mapGetters('article', {
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
            title: '标题',
            key: 'title',
            minWidth: 105
          },
          {
            title: '内容',
            key: 'content',
            minWidth: 300
          }
        ]
      }
    },
    created() {
      this.articleList();
    },
    methods: {
      ...mapActions('article', [
        'articleList',
        'updateId',
        'updateTitle',
        'pageChange'
      ])
    }
  }
</script>
