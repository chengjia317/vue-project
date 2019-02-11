<template>
  <div class="op-search-wrapper">
    <form action="javascript:return true">
      <div class="op-search flex-sb">
        <i class="op-icon-search"></i>
          <input type="search" :placeholder="placeholder" v-model="data" @input="change" @keyup.enter="submit">
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    },

    placeholder: {
      type: String,
      default: ''
    }
  },

  data () {
    return {
      data: this.value
    }
  },

  methods: {
    change () {
      this.$emit('input', this.data)
    },

    submit () {
      this.$emit('search')
    }
  }
}
</script>

<style lang="scss" scoped>
.op-search-wrapper {
  padding: 6px 15px;
  background: #fff;
}
.op-search {
  background: #EFF3F6;
  border-radius: 2px;
  padding: 0 11px;
  input {
    margin-left: 13px;
    height: 35px;
    flex: 1;
    background: transparent;
    outline: none;
    border: none;
  }
  input::input-placeholder{
    color: #C9C9C9;
  }
  input::-webkit-input-placeholder,
  textarea::-webkit-input-placeholder {
    color: #C9C9C9;
  }
  input::-moz-placeholder, textarea::-moz-placeholder {
    color: #C9C9C9;
  }
  input:-ms-input-placeholder, textarea:-ms-input-placeholder {
    color: #C9C9C9;
  }
}
</style>
