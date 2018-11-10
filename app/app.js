'use strict';

var productApp = angular.module('productApp', ['chart.js']);

productApp.controller('ProductController', function ProductController($scope, $http) {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
  })
  var retailSales = [];
  var wholesaleSales = [];
  $http.get('Webdev_data2.json').then(function(response) {
    
    $scope.product = (response.data[0]);
    $scope.headers = Object.keys(response.data[0]['sales'][0])
    var sales = response.data[0]['sales'];
    $scope.dash = []
    for (var i=0; i<sales.length; i++){
      var item = {}
      var parts = sales[i]['weekEnding'].split('-');
      item['weekEnding'] = [parts[2],parts[1],parts[0].slice(2)].join("-");
      item['retailSales'] = formatter.format(sales[i]['retailSales']);
      item['wholesaleSales'] = formatter.format(sales[i]['wholesaleSales']);
      item['retailerMargin'] = formatter.format(sales[i]['retailerMargin']);
      item['unitsSold'] = sales[i]['unitsSold'];
      retailSales.push(sales[i]['retailerMargin']);
      wholesaleSales.push(sales[i]['wholesaleSales']);
      $scope.dash.push(item);
    }
    
  });
  $scope.labels = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  $scope.series = ['Series A', 'Series B'];
  // $scope.data = [
  //   [65, 59, 80, 81, 56, 55, 40],
  //   [28, 48, 40, 19, 86, 27, 90]
  // ];
  $scope.data = [retailSales, wholesaleSales];
});
