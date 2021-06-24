angular.module('dashboardApp')
  .directive('barsView', function () {
    return {
      restrict: 'E',
      scope: { data: '=' },
      link: renderView
    };

    function renderView($scope, $elements, $attrs) {
      var data = $scope.$parent.items;

      var width = $attrs.width, height = $attrs.height;

      var svg = d3.select($elements[0])
	  .append("svg");

      svg.attr({
	width: width,
	height: height
      });

      var max = d3.max(data, function(d) {
	return d.Value;
      });

      var colors = d3.scale.category20();

      var barHeight = 30;
      var leftMargin = 15;
      var barTextOffsetY = 22;

      svg.selectAll('rect')
	.data(data)
	.enter()
	.append('rect')
	.attr({
	  height: barHeight,
	  width: 0,
	  x: 0,
	  y: function(d, i) {
	    return i * barHeight;
	  },
	  stroke: 'white'
	})
	.style('fill', function(d, i) {
	  return colors(i);
	})
	.transition()
	.duration(1000)
	.attr('width', function(d) {
	  return d.Value / (max / width);
	});

      svg.selectAll("rect")
	.data(data)
	.transition()
	.duration(1000)
	.attr("width", function(d, i) {
	  return d.Value / (max / width);
	});

      svg.selectAll('text')
	.data(data)
	.enter()
	.append('text')
	.attr({
	  fill: '#fff',
	  x: leftMargin,
	  y: function(d, i) {
	    return i * barHeight + barTextOffsetY;
	  }
	})
	.text(function(d) {
	  return d.Name + ' (' + d.value + ')';
	});

      svg.selectAll('text')
	.data(data)
	.attr({
	  fill: '#fff',
	  x: leftMargin,
	  y: function(d, i) {
	    return i * barHeight + barTextOffsetY;
	  }
	})
	.text(function(d) {
	  return d.Name + ' (' + d.Value + ')';
	});  
    }
  });
