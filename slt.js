var MobileArea = function() {
  this.gearArea
  this.data
    // this.value = [0, 0, 0]
}
MobileArea.prototype = {
  init: function(params) {
    this.params = params
    this.data = params.data
    this.uuid = params.uuid
    // this.trigger = document.querySelector(params.trigger)
    this.keys = params.keys
    this.bindEvent()
  },
  bindEvent: function() {
    var _self = this
      // 呼出插件
    function popupArea(e) {
      _self.gearArea = document.querySelector(`.gearAreaa${_self.uuid}`)
      _self.gearArea.innerHTML = `
      <div class="areaaCtr slideInUp">
        <div class="areaaBtnBox">
          <div class="areaaBtn lareaCancel">取消</div>
          <div class="areaaBtn lareaFinish">确定</div>
        </div>
        <div class="lareaaRollMask">
          <div class="areaaRoller">
            <div class="mid">
              <div class="gear areaProvince" data-areatype="areaProvince"></div>
              <div class="areaaGrid"></div>
            </div>
          </div>
        </div>
      </div>`
      areaCtrlInit()
      var lareaCancel = _self.gearArea.querySelector('.lareaCancel')
      lareaCancel.addEventListener('touchstart', function(e) {
        _self.close(e)
      })
      var lareaFinish = _self.gearArea.querySelector('.lareaFinish')
      lareaFinish.addEventListener('touchstart', function(e) {
        _self.finish(e)
      })
      var areaProvince = _self.gearArea.querySelector('.areaProvince')
      areaProvince.addEventListener('touchstart', gearTouchStart)
      areaProvince.addEventListener('touchmove', gearTouchMove)
      areaProvince.addEventListener('touchend', gearTouchEnd)
    }
    // 初始化插件默认值
    function areaCtrlInit() {
      _self.gearArea.querySelector('.areaProvince').setAttribute('val', 0)
      _self.setGearTooth(_self.data)
    }
    // 触摸开始
    function gearTouchStart(e) {
      e.preventDefault()
      var target = e.target
      while (true) {
        if (!target.classList.contains('gear')) {
          target = target.parentElement
        } else {
          break
        }
      }
      clearInterval(target['int_' + target.id])
      target['old_' + target.id] = e.targetTouches[0].screenY
      target['o_t_' + target.id] = (new Date()).getTime()
      var top = target.getAttribute('top')
      if (top) {
        target['o_d_' + target.id] = parseFloat(top.replace(/em/g, ''))
      } else {
        target['o_d_' + target.id] = 0
      }
      target.style.webkitTransitionDuration = target.style.transitionDuration = '0ms'
    }
    // 手指移动
    function gearTouchMove(e) {
      e.preventDefault()
      var target = e.target
      while (true) {
        if (!target.classList.contains('gear')) {
          target = target.parentElement
        } else {
          break
        }
      }
      target['new_' + target.id] = e.targetTouches[0].screenY
      target['n_t_' + target.id] = (new Date()).getTime()
      var f = (target['new_' + target.id] - target['old_' + target.id]) * 30 / window.innerHeight
      target['pos_' + target.id] = target['o_d_' + target.id] + f
      target.style['-webkit-transform'] = 'translate3d(0,' + target['pos_' + target.id] + 'em,0)'
      target.setAttribute('top', target['pos_' + target.id] + 'em')
      if (e.targetTouches[0].screenY < 1) {
        gearTouchEnd(e)
      }
    }
    // 离开屏幕
    function gearTouchEnd(e) {
      e.preventDefault()
      var target = e.target
      while (true) {
        if (!target.classList.contains('gear')) {
          target = target.parentElement
        } else {
          break
        }
      }
      var moveDiff = target['new_' + target.id] - target['old_' + target.id]
      var flag = moveDiff / (target['n_t_' + target.id] - target['o_t_' + target.id])
      if (Math.abs(flag) <= 0.2) {
        target['spd_' + target.id] = (flag < 0 ? -0.08 : 0.08)
      } else {
        if (Math.abs(flag) <= 0.5) {
          target['spd_' + target.id] = (flag < 0 ? -0.16 : 0.16)
        } else {
          target['spd_' + target.id] = flag / 2
        }
      }
      if (!target['pos_' + target.id]) {
        target['pos_' + target.id] = 0
      }
      rollGear(target)
    }
    // 缓动效果
    function rollGear(target) {
      var d = 0
      var stopGear = false

      function setDuration() {
        target.style.webkitTransitionDuration = target.style.transitionDuration = '200ms'
        stopGear = true
      }
      clearInterval(target['int_' + target.id])
      target['int_' + target.id] = setInterval(function() {
        var pos = target['pos_' + target.id]
        var speed = target['spd_' + target.id] * Math.exp(-0.03 * d)
        pos += speed
        if (Math.abs(speed) > 0.1) {} else {
          var b = Math.round(pos / 2) * 2
          pos = b
          setDuration()
        }
        if (pos > 0) {
          pos = 0
          setDuration()
        }
        var minTop = -(target.dataset.len - 1) * 2
        if (pos < minTop) {
          pos = minTop
          setDuration()
        }
        if (stopGear) {
          var gearVal = Math.abs(pos) / 2
          setGear(target, gearVal)
          clearInterval(target['int_' + target.id])
        }
        target['pos_' + target.id] = pos
        target.style['-webkit-transform'] = 'translate3d(0,' + pos + 'em,0)'
        target.setAttribute('top', pos + 'em')
        d++
      }, 30)
    }
    // 控制插件滚动后停留的值
    function setGear(target, val) {
      val = Math.round(val)
      target.setAttribute('val', val)
      _self.setGearTooth(_self.data)
    }
    popupArea()
  },
  // 重置节点个数
  setGearTooth: function(data) {
    var _self = this
    var item = data || []
    var l = item.length
    var gearChild = _self.gearArea.querySelectorAll('.gear')
    var gearVal = gearChild[0].getAttribute('val')
    var maxVal = l - 1
    if (gearVal > maxVal) {
      gearVal = maxVal
    }
    gearChild[0].setAttribute('data-len', l)
    if (l > 0) {
      var itemStr = '', item_id = '', item_name = ''
      for (let i = 0; i < l; i++) {
        item_id = item[i][this.keys['id']]
        item_name = item[i][this.keys['name']]
        itemStr += "<div class='tooth' ref='" + item_id
        itemStr += "'>" + item_name + '</div>'
      }
      gearChild[0].innerHTML = itemStr
      gearChild[0].style['-webkit-transform'] = 'translate3d(0,' + (-gearVal * 2) + 'em,0)'
      gearChild[0].setAttribute('top', -gearVal * 2 + 'em')
      gearChild[0].setAttribute('val', gearVal)
    } else {
      gearChild[0].innerHTML = "<div class='tooth'></div>"
      gearChild[0].setAttribute('val', 0)
    }
  },
  finish: function(e) {
    e.preventDefault()
    var _self = this
    var areaProvince = _self.gearArea.querySelector('.areaProvince')
    var provinceVal = parseInt(areaProvince.getAttribute('val'))
    var provinceText = areaProvince.childNodes[provinceVal].textContent
    var provinceCode = areaProvince.childNodes[provinceVal].getAttribute('ref')
    // _self.value = [provinceVal]
      // 记录当前选择的地区
    this.selVal = {
      name: provinceText,
      id: provinceCode
    }

    // var evt = new CustomEvent('input')
    var evt = document.createEvent('CustomEvent')
    evt.initCustomEvent('input', true, true, { name: provinceText, code: provinceCode })
    document.dispatchEvent(evt)
  },
  close: function(e) {
    e.preventDefault()
    var _self = this
    // var evt = new CustomEvent('input')
    var evt = document.createEvent('CustomEvent')
    evt.initCustomEvent('input', true, true, '')
    if (this.selVal) {
      _self.setLocation(this.selVal)
    }
    document.dispatchEvent(evt)
  },
  setGear: function(target, val) {
    const _self = this
    val = Math.round(val)
    target.setAttribute('val', val)
    _self.setGearTooth(_self.data)
  },
  setLocation(selVal) {
    const val = selVal.id
    const arr = val.split(' ')
    const provArr = this.data.filter((one) => {
      return one.id === arr[0]
    })
    const provInd = this.data.indexOf(provArr[0])
    this.setPos(provInd)
      // 记录当前选择的地区
    this.selVal = selVal
  },
  setPos: function(pInd) {
    const areaProvince = document.querySelector('.areaProvince')
    areaProvince.style.transform = `translate3d(0px, ${-2 * pInd}em, 0px)`
    areaProvince.setAttribute('top', `${-2 * pInd}em)`)
    areaProvince.setAttribute('val', pInd)
    this.setGear(areaProvince, pInd)
  }
}
export default MobileArea
