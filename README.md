## 选项选择器select

### usage

```
        <sel title="居住地址" @get-val="sel" :show="showpkr" @show-picker="showPicker" :datas="selData"></sel>
```


### props
| 名字 | 类型 | 默认 | 描述
|:-|-|-|-|
|title |String | '居住地址' |左侧标题
|datas| Array |无| 数据源
|selVal |Object | 无 | 可设置默认地址，格式为{id:'',name:''} 
|show |Boolean | false | 表示选择框显示或隐藏


### 设置默认地址
```data中初始化location
    selVal: {
      id: '140000',
      name: '山西省'
    }
```

### methods
|名字 |参数 |描述
|:-|-|-|
|getVal | 无 | 选择省市后,返回选中值value,key的回调函数
|show-picker | 无 | 点击表单 控制选择框的隐显
