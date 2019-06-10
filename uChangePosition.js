;(function (global, fn, plugin) {
  global[plugin] = fn.call(plugin);
})(window, function () {
  var _callback,
      _isContinue,
      _CORE = {
        bindDrop: function(elem) {
          var list = [].slice.call(document.querySelectorAll(elem));
          list.forEach(function (l, index) {
            l.setAttribute('draggable', true);
            // 如果没有加入唯一ID，就
            if (l.id === '' || l.id === null) {
              l.id = 'udrop-' + index;
            }
            l.addEventListener('dragstart', _CORE.drag); // 拖拽开始
            l.addEventListener('dragover', _CORE.dropOver); // 拖动
            l.addEventListener('drop', _CORE.drop); // 放入
            l.parentNode.addEventListener('dragover', _CORE.dropOver); // 拖动到父级
          });
        },
        drag: function(e) {
          e.dataTransfer.setData("Text", e.target.id);
        },
        drop: function(e) {
          e.preventDefault();
          e.stopPropagation();
          var l = e.dataTransfer.getData('Text');
          var dragElem = document.getElementById(l); // 拖动的元素
          var dropElem = e.target; // 拖入的元素
          var parentElem = dropElem.parentNode; // 父元素
          var dragIndex; // 获取拖动的元素下标
          var bool = true;
          // 判断是否有相同的父级元素
          while (bool) {
            if (parentElem.isEqualNode(dragElem.parentNode)) {
              dragIndex = _CORE.getIndex(parentElem, dropElem);
              bool = false;
            } else {
              dropElem = parentElem;
              parentElem = parentElem.parentNode;
            }
            if (dragElem.parentNode === null) {
              bool = false;
              console.error('ERROR: 拖动元素的DOM结构好像有点问题哦');
            }
          }
          var dropElemIndex = _CORE.getIndex(parentElem, dragElem); // 获取拖动元素下标
          // callback回调
          _callback(dragElem, dropElem);
          if (!_isContinue) {
            return false;
          }
          // 如果是从后往前改变位置
          if (dropElemIndex > dragIndex) {
            parentElem.insertBefore(dropElem, parentElem.childNodes[dropElemIndex]);
            parentElem.insertBefore(dragElem, parentElem.childNodes[dragIndex]);
          } else {
            parentElem.insertBefore(dragElem, parentElem.childNodes[dragIndex]);
            parentElem.insertBefore(dropElem, parentElem.childNodes[dropElemIndex]);
          }
        },
        dropOver: function (e) {
          e.preventDefault();
          e.stopPropagation();
        },
        // 获取相对于父级元素的位置
        getIndex: function (parent, child) {
          var index;
          for (var x = 0; x < parent.childNodes.length; x++) {
            if (parent.childNodes[x].id === child.id) {
              index = x;
              break;
            }
          }
          return index;
        }
      };

  return {
    init: function (elem, callback, isContinue) {
      _callback = callback;
      _isContinue = isContinue === undefined ? true : isContinue;
      _CORE.bindDrop(elem);
    }
  };
}, 'uChangePosition');
