var data = [];
var dom = document.getElementById('chart-container');
var myChart = echarts.init(dom);
var option;





// 创建垂线数据
var linesData = data.map(function (item) {
  return [
    [item[0], item[1], 0],
    [item[0], item[1], item[2]]
  ];
});


var originalVisualMap = {
  // ...原始的 visualMap 配置
  type: 'continuous',
  min: 0,
  max: 100, // 使用计算后的气压值
  dimension: 2, // 使用计算后的气压值
  inverse: true,
  inRange: {
    color: ['#30f39a', '#eac763', '#f92e3d']
  },
  text: ['低', '高'], // 文本标签
  calculable: true,
  right: 5, // 将色带放在右边
  bottom: 5, // 将色带放在底部
  formatter: function (value) {
    // 这里是一个示例，你需要根据你的具体情况来计算原始的气压值
    var originalPressure = 1010 - value;
    return originalPressure;
  }
};


// 新的 visualMap 配置
var newVisualMap = {
  type: 'piecewise',
  dimension: 3,
  pieces: [
    { value: 6, label: '超强台风', color: '#f92e3d' },
    { value: 5, label: '强台风', color: '#FF00FF' },
    { value: 4, label: '台风', color: '#FF9A00' },
    { value: 3, label: '强热带风暴', color: '#DEFF00' },
    { value: 2, label: '热带风暴', color: '#0900FF' },
    { value: 1, label: '热带低压', color: '#09FF00' },
    { value: 0, label: '弱于热带低压', color: '#FFFFFF' },
    { value: 9, label: '变性', color: '#808080' }
  ],
  outOfRange: {
    color: '#808080'
  },
  calculable: true,
  selectedMode: false,
  showLabel: true,
  right: 5, // 将色带放在右边
  bottom: 5, // 将色带放在底部
};

myChart.setOption({
  backgroundColor: '#cdcfd9',
  tooltip: {
    formatter: function (params) {
      // 将日期字符串转化为YYYY年MM月DD日HH时格式
      var dateStr = params.value[5];
      var year = dateStr.slice(0, 4);
      var month = dateStr.slice(4, 6);
      var day = dateStr.slice(6, 8);
      var hour = dateStr.slice(8, 10);
      var formattedDate =
        year + '年' + month + '月' + day + '日，' + hour + '时(世界时)';

      // 获取强度标记
      var intensity = params.value[3];
      var intensityLabel;
      switch (intensity) {
        case 0:
          intensityLabel = '弱于热带低压';
          break;
        case 1:
          intensityLabel = '热带低压';
          break;
        case 2:
          intensityLabel = '热带风暴';
          break;
        case 3:
          intensityLabel = '强热带风暴';
          break;
        case 4:
          intensityLabel = '台风';
          break;
        case 5:
          intensityLabel = '强台风';
          break;
        case 6:
          intensityLabel = '超强台风';
          break;
        case 9:
          intensityLabel = '变性';
          break;
        default:
          intensityLabel = '未知强度';
          break;
      }

      return (
        '台风名称: ' +
        params.value[4] +
        '<br>日期: ' +
        formattedDate +
        '<br>强度: ' +
        intensityLabel +
        '<br>风速: ' +
        params.value[6] +
        ' m/s' +
        '<br>气压: ' +
        params.value[7] +
        ' hPa'
      );
    }
  },
  visualMap: originalVisualMap,

  geo3D: {
    map: 'world',
    shading: 'lambert',
    light: {
      main: {
        intensity: 3,
        shadow: true,
        shadowQuality: 'high',
        alpha: 30
      },
      ambient: {
        intensity: 0
      },
      ambientCubemap: {
        texture: 'data-gl/asset/canyon.hdr',
        exposure: 1,
        diffuseIntensity: 0.5
      }
    },
    viewControl: {
      distance: 50,
      panMouseButton: 'left',
      rotateMouseButton: 'right'
    },
    groundPlane: {
      show: true,
      color: '#7facad' //海洋
    },
    postEffect: {
      enable: true,
      bloom: {
        enable: false
      },
      SSAO: {
        radius: 1,
        intensity: 1,
        enable: true
      },
      depthOfField: {
        enable: false,
        focalRange: 10,
        blurRadius: 10,
        fstop: 1
      }
    },
    temporalSuperSampling: {
      enable: true
    },
    itemStyle: {
      color: '#999'
    },
    label: {
      show: false // 确保标签不显示
    },
    emphasis: {
      disabled: true, // 使用布尔值来禁用高亮
      label: {
        show: false // 确保高亮时也不显示标签
      },
      itemStyle: {
        color: '#999'
      }
    },
    regionHeight: 0.9
  },

  series: [] //开始时不显示任何数据
});


if (option && typeof option === 'object') {
  myChart.setOption(option);
}

window.addEventListener('resize', myChart.resize);

var isOriginal = true;

// 切换按钮的点击事件
$('#toggleButton').click(function () {
  if (isOriginal) {
    // 切换到新的 visualMap 配置
    myChart.setOption({
      visualMap: newVisualMap
    });
  } else {
    // 切换回原始的 visualMap 配置
    myChart.setOption({
      visualMap: originalVisualMap
    });
  }

  // 更新配置状态
  isOriginal = !isOriginal;
});

// 书签按钮的点击事件
$('#bookmark').click(function () {
  $('#sidebar').toggleClass('collapsed');
});


// 添加路径
$('#add').click(function () {
  var selectedNames = $('.select-name:checked').map(function () {
    return this.value;
  }).get();
  $.ajax({
    url: 'http://127.0.0.1:5000/get-selected-data',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({ names: selectedNames }),
    success: function (returnedData) {
      // 将服务器返回的数据赋值给 data
      var ndata = returnedData;
      // 将选中的名字添加到 "地图上显示的台风路径有：" 后面
      var text = '地图上显示的台风路径有：' + selectedNames.join(', ');
      $('p').text(text);

      // 更新 ECharts 的数据
      myChart.setOption({
        series: [
          {
            type: 'lines3D',
            coordinateSystem: 'geo3D',
            effect: {
              show: true
            },
            lineStyle: {
              width: 2
            },
            data: ndata.map(function (item) {
              return [
                [item[0], item[1], 0],
                [item[0], item[1], item[2]]
              ];
            }),
            emphasis: {
              lineStyle: {
                width: 4, // 鼠标悬停时显示线
                opacity: 1
              }
            }
          },
          {
            type: 'scatter3D',
            coordinateSystem: 'geo3D',
            data: ndata,
            symbolSize: function (value) {
              return Math.log(value[6]) * 5 - 6;
            },
            itemStyle: {
              borderWidth: 0.5,
              borderColor: '#494949',
              opacity: 0.85
            },
            emphasis: {
              focus: 'self',
              scale: true,
              itemStyle: {
                color: '#00BCFF', // 设置鼠标悬停时点的颜色为
                opacity: 1,
                borderColor: '#FFF446',
                borderWidth: 3,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              },
              label: {
                show: false
              }
            },
            animation: false, // 关闭动画效果
            animationThreshold: 2000,
            animationDuration: 1000,
            animationEasing: 'cubicOut',
            animationDelay: function (idx) {
              return idx * 15;
            }
          }
        ]
      });
    }
  });
});


// 清除所有路径
$('#clear').click(function () {
  $('p').text('地图上没有显示台风路径');
  var edata = [];
  myChart.setOption({
    series: [
      {
        type: 'lines3D',
        coordinateSystem: 'geo3D',
        data: edata.map(function (item) {
          return [
            [item[0], item[1], 0],
            [item[0], item[1], item[2]]
          ];
        })
      },
      {
        type: 'scatter3D',
        coordinateSystem: 'geo3D',
        data: edata
      }
    ]
  });
});


// 搜索台风名
$('#search-btn').click(function () {
  var typhoonName = $('#search').val();
  $.ajax({
    url: 'http://127.0.0.1:5000/get-name',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({ name: typhoonName }),
    success: function (data) {
      if (data.length > 0) {
        // 如果服务器返回了数据，将其添加到表格中
        var tbody = $('#result-table tbody');
        tbody.empty(); // 清空表格
        for (var i = 0; i < data.length; i++) {
          var tr = $('<tr></tr>');
          var td1 = $('<td></td>');
          var checkbox = $('<input>');
          checkbox.attr('type', 'checkbox');
          checkbox.addClass('select-name');
          checkbox.val(data[i]);
          td1.append(checkbox);
          var td2 = $('<td></td>');
          td2.text(data[i]);
          tr.append(td1);
          tr.append(td2);
          tbody.append(tr);
        }
      }
    }
  });
});

$(document).ready(function () {
  // 页面加载完成后，模拟点击搜索按钮，获取所有台风名
  $('#search-btn').trigger('click');
});