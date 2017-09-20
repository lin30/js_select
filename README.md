## 选项选择器select

### usage
```
  import jsSel from './components/js_select'
```

```
        <js-sel title="居住地址" :show="show" :datas="marriageType" :selVal="sel" @get-val="addressPick"></js-sel>
```


### props
| 名字 | 类型 | 默认 | 描述
|:-|-|-|-|
|title |String | '居住地址' |左侧标题
|datas| Array |无| 数据源
|item| String  |object| 区分数据源的格式 ['', ''] 或 [{id:'',name:''}]
|selVal |Object | 无 | 可设置默认地址，格式对应 item 值 分别为'' 或 {id:'',name:''} 
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
