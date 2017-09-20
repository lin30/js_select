<template>
    <!--<div class="cell_box">-->
      <!--<div class="pec-item-head" :class="titleStyle">
        <p style="font-size:0.3rem; color: #666;">{{title}}</p>
      </div>
      <div class="pec-item-body" @click.stop="showPicker" >
        <span :id="'name-box-' + uuid" style="border:none;font-size:0.3rem;color: #b2b2b2;" >请选择</span>
      </div>
      <div class="pec-item-foot click-icon-area icon-arrow-abs" @click.stop="showPicker">
          <i class="icon-arrow"></i>
      </div>-->
      <div :class='gearAreaa' class="gearAreaa" v-show="show" @touchstart.prevent></div>
    <!--</div>-->
</template>

<script>
  import Picker from './slt.js'
  export default {
    name: 'c-select',
    props: {
      datas: {
        type: Array
      },
      show: false,
      selVal: {
        type: [Object, String]
      },
      item: {
        type: String,
        default: 'object'
      }
    },
    data() {
      return {
        uuid: Math.random().toString(36).substring(3, 8)
      }
    },
    computed: {
      gearAreaa() {
        return `gearAreaa${this.uuid}`
      }
    },
    watch: {
      selVal(v) {
        if (!v) return
        this.setLocation()
      }
    },
    mounted() {
      this.render()
      this.setLocation()
      document.addEventListener('input', (e) => { this.getVal(e) })
    },
    methods: {
      setLocation() {
        const val = this.selVal
        if (typeof val === 'string') {
          const obj = {
            id: val,
            name: val
          }
          this.picker.setLocation(obj)
          return
        }
        if (typeof val === 'object' && val.id) {
          this.picker.setLocation(val)
        }
      },
      getVal(e) {
        this.$emit('get-val', e.detail)
      },
      destroyed () {
        document.removeEventListener('input', (e) => { this.getVal(e) })
      },
      render() {
        const _this = this
        // 根据传入的 item 类型,区分数据源是 Array<String>或 Array<Object>
        let keys = {
          id: 'id',
          name: 'name'
        }, datas = []
        if (this.item === 'string') {
          _this.datas.forEach((one) => {
            datas.push({
              id: one,
              name: one
            })
          })
        } else {
          datas = _this.datas
        }
        this.picker = new Picker()
        this.picker.init({
          'keys': keys,
          'data': datas,
          'uuid': _this.uuid
        })
      }
    }
  }

</script>

<style src="../../style/select.css"></style>
<style>
  input:active {
    background: #ececec;
  }
</style>