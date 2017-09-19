<template>
    <div class="cell_box">
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
    </div>
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
      titleStyle: String,
      title: {
        type: String,
        default: '居住地址'
      },
      selVal: {
        type: Object
      },
      otitle: {
        type: String
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
      selVal() {
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
        if (this.selVal && this.selVal.id) {
          this.picker.setLocation(this.selVal)
        }
      },
      showPicker() {
        const inputArr = document.getElementsByTagName('input')
        for (var i = 0; i < inputArr.length; i++) { inputArr[i].blur() }
        this.show = true
      },
      getVal(e) {
        // this.show = false
        console.log(e.detail)
        this.$emit('get-val', e.detail)
      },
      hideArea() {
        this.show = false
      },
      destroyed () {
        document.removeEventListener('input', (e) => { this.getVal(e) })
      },
      render() {
        const _this = this
        this.picker = new Picker()
        this.picker.init({
          'trigger': `#name-box-${this.uuid}`,
          'keys': {
            id: 'id',
            name: 'name'
          },
          'data': _this.datas,
          'uuid': _this.uuid
        })
      }
    }
  }

</script>

<style src="styles/components/select"></style>
<style>
  input:active {
    background: #ececec;
  }
</style>