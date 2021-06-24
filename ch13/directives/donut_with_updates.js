angular.module('dashboardApp')
  .directive('donutView', function () {
    return {
      restrict: 'E',
      scope: { data: '=' },
      link: renderView
    };

    function renderView($scope, $elements, $attrs) {
      var parent = $scope.$parent;
      parent.$watch('selectedItem', updatePath, true);
      
      var data = parent.items;

      var width = $attrs.width,
	  height = $attrs.height,
	  radius = Math.min(width, height) / 2;

      var pie = d3.layout.pie()
	  .value(function (d) { return d.Value; })
	  .sort(null);

      var arc = d3.svg.arc()
	  .innerRadius(radius - 70)
	  .outerRadius(radius - 10);

      var svg = d3.select($elements[0])
	  .append('svg')
	  .attr({
	    width: width,
	    height: height
	  });

      var graphGroup = svg.append('g')
	  .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

      var colors = d3.scale.category20();
      var path = graphGroup
	.datum(data)
	.selectAll('path')
	.data(pie)
	.enter()
	.append('path')
	.attr('fill', function(d, i) {
	  return colors(i);
	})
	.attr('d', arc)
	.each(function(d) {
	  this._current = d;
	});

      function updatePath() {
	path = path.data(pie);
	path.transition()
	  .duration(750)
	  .attrTween('d',
		     function(d) {
		       var i = d3.interpolate(d.startAngle, d.endAngle);
		       return function(t) {
			 d.endAngle = i(t);
			 return arc(d);
		       };
		     });
      }      
    }
  });
