<template>
  <div>
    <com-tab-title title="我的通知"></com-tab-title>

    <ul class="notice-list">
      <li v-for="(item, index) in dataList" :key="index">
        <div class="title">{{item.title}}</div>
        <div>{{item.content}}</div>
        <div class="date">{{item.createAt | formatDate}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import {getMessages} from '@/api/message'
export default {
  data () {
    return {
      dataList: []
    }
  },

  created () {
    this.getMessages()
  },

  methods: {
    async getMessages () {
      const data = await getMessages()
      console.log('message list', data)
      this.dataList = data.results
    }
  }
  
}
</script>

<style lang="scss" scoped>
.notice-list {
  padding-top: 50px;
  background: #fff;
  .title {
    font-weight: bold;
  }
  li {
    font-family: PingFangSC-Regular;
    padding: 12px 15px;
  }
  li + li {
    border-top: 1px solid rgba(0,0,0,.05)
  }
  .date {
    margin-top: 10px;
    font-size: 12px;
    color: #B0B0B0;
  }
}
</style>

