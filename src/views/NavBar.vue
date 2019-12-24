<template>
  <div class="layout">
    <Layout>
      <Sider ref="side" hide-trigger collapsible :collapsible-width="78" :style="{'min-height': '800px'}" v-model="isCollapsed">
        <Menu ref="side_menu" theme="dark" width="auto" :active-name="activeName" @on-select="onSelect">
          <Submenu v-for="(item, index) in items" :name="'submenu' + index" :key="'submenu' + index" v-show="item.subItems || item.subItems.length > 0">
            <template slot="title">
              <Icon :type="item.icon"></Icon>
              <span>{{item.title}}</span>
            </template>
            <menu-item v-for="subItem in item.subItems" :key="subItem.name" :name="subItem.name">
              <Icon :type="subItem.icon"></Icon>
              <span>{{subItem.title}}</span>
            </menu-item>
          </Submenu>
        </Menu>
      </Sider>
      <Layout>
        <Header class="layout-header-bar" :style="{'padding': 0}">
          <Row type="flex" justify="center" align="middle">
            <Icon @click.native="collapsedSider" :class="rotateIcon" type="navicon-round" size="30" :style="{'margin': '20px'}"></Icon>
            <Breadcrumb :style="{'margin-left':'20px'}">
              <BreadcrumbItem>{{this.$route.matched[0].meta.parentTitle}}</BreadcrumbItem>
              <BreadcrumbItem :to="$route.path">{{this.$route.meta.title}}</BreadcrumbItem>
            </Breadcrumb>
          </Row>
          <Row type="flex" justify="center" align="middle" :style="{'margin': '0 20px 0 0'}">
            <Dropdown :style="{'padding': '0 20px', 'font-size': '14px', 'line-height': '20px'}" @on-click="handleOpen">
              <a href="javascript:void(0)">
                <span>{{this.accountInfo.username}}</span>
                <Icon type="md-arrow-dropdown" size="27"></Icon>
              </a>
              <DropdownMenu slot="list">
                <dropdownItem name="logout">退出登录</dropdownItem>
              </DropdownMenu>
            </Dropdown>
            <Avatar size="large" :style="{'background': '#19b36b'}" icon="ios-person"></Avatar>
          </Row>
        </Header>
        <Content :style="{'padding': '20px 20px'}">
          <router-view></router-view>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>
<script>
  import loginApi from '../api/loginApi'
  import navigation from '../../constant/nav'

  export default {
    data () {
      return {
        isCollapsed: false,
        accountInfo: {},
        items: navigation
      }
    },
    created () {
      this.getAccountInfo();
    },
    computed: {
      activeName () {
        return this.$router.name
      },
      rotateIcon () {
        return ['menu-icon', this.isCollapsed ? 'rotate-icon' : '']
      }
    },
    methods: {
      handleOpen (name) {
        this.onSelect(name)
      },
      collapsedSider () {
        this.$ref.side1.toggleCollapse()
      },
      onSelect (name) {
        if (name === 'logout') {
          return this.showLogoutModal()
        }
        this.$router.push({name: name})
      },
      showLogoutModal () {
        const _this = this;
        this.$Modal.confirm({
          title: '退出',
          content: '<p>您确定要退出登录么</p>',
          onOk: () => {
            _this.logout()
          }
        })
      },
      logout () {
        loginApi.logout().then(res => {
          if (res.errorCode === 0) {
            this.$Message.success('登出成功');
            this.$router.push({name:'Login'});
          }
        })
      },
      getAccountInfo () {
        const _this = this;
        loginApi.getAccountInfo().then(res => {
          _this.accountInfo = res.data;
        })
      }
    }
  }
</script>
<style scoped>
  .layout {
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
  }
  .layout-header-bar {
    background: #fff;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
    justify-content: space-between;
    display: flex;
  }
  .MenuItem span {
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: bottom;
    transition: width 0.2s ease 0.2s;
  }
  .MenuItem i {
    transform: translateX(0px);
    transition: font-size 0.2s ease, transform 0.2s ease;
    vertical-align: middle;
    font-size: 16px;
  }
  .collapsed-menu span {
    width: 0;
    transition: width 0.2s ease;
  }
  .collapsed-menu i {
    transform: translateX(5px);
    transition: font-size 0.2s ease, transform 0.2s ease 0.2s;
    vertical-align: middle;
    font-size: 22px;
  }
</style>
