const scrollTop = {
  data () {
    return {
      pathTo: '', // route 跳转目标地址
      pathFrom: '', // route 来源地址
    }
  },
  beforeRouteLeave (to, from, next) {
    // 如果在window中出现的滚动条
    // this.scroll = window.scrollTop;
    try {
      let scrollPos = from.meta.scrollPos || [] // 要求每个页面都有scrollPos属性
      scrollPos.map(item => {
        item.type = item.type || 0
        if (item.ref) {
          let position = 0
          // type: 默认0,指当前元素的scrollTop，1：table的bodyWrapper的scrollTop，2：当前组件的子组件的指定ref元素的scrollTop
          if (item.type === 2) {

          } else if (item.type === 1) {
            let bodyRef = this.$refs[item.ref]
            if (bodyRef && bodyRef.bodyWrapper) { position = bodyRef.bodyWrapper.scrollTop }
          } else {
            position = this.$refs[item.ref] ? this.$refs[item.ref].scrollTop : 0
          }
          item.position = position || 0
        }
      })
      //  如果在某个指的元素中出现的滚动条 就在该素中添加ref属性，如：ref="listBox"
      from.meta.scrollPos = scrollPos
    } catch (e) {
      console.log(e)
    }
    next()
  },
  // 进入路由之前执行的函数
  beforeRouteEnter (to, from, next) {
    next(vm => {
      // 如果在window中出现的滚动条
      // window.scrollTop = vm.scroll;
      // 如果在某个指的元素中出现的滚动条 就在该素中添加ref属性，如：ref="listBox"
      try {
        let scrollPos = to.meta.scrollPos || []
        setTimeout(() => {
          if (scrollPos && scrollPos.length) {
            scrollPos.forEach(pos => {
              let ref = pos.ref
              let type = pos.type
              let position = pos.position
              if (vm.$refs[ref]) {
                // type: 1,表格
                if (type === 1) {
                  let bodyRef = vm.$refs[ref]
                  if (bodyRef && bodyRef.bodyWrapper) {
                    vm.$refs[ref].bodyWrapper.scrollTop = position
                  }
                } else {
                  vm.$refs[ref] && (vm.$refs[ref].scrollTop = position)
                }
              }
            })
          }
        }, 0)

        // 页面来源+页面target
        vm.pathTo = to.fullPath
        vm.pathFrom = from.path

      } catch (e) {
        console.log(e)
      }
    })
  }
}

export scrollTop
