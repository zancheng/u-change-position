# uChangePosition
拖放元素进行调换位置

## 使用方式

uChangePosition.init(elements, callback, isContinue);

- elements 拖动元素

- callback 回调

``` bash

callback(dragElement, dropToElement, dragIndex, dropElemIndex) { // dragElement 拖动元素 dropToElement 放入的元素 dragIndex 拖动元素的下下标 dropElemIndex 放入元素的下标

}

```

- isContinue 结束后是否继续执行拖放调换位置，默认true。设置false后，虽然有拖动，但是没有换位。
## 示例

[示例](https://jsbin.com/wiqenab/edit?html,js,output)
