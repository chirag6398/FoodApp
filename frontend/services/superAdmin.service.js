///<reference path="../module/module.js"/>

app.service(
  "superAdminService",
  function (adminApi, $timeout, superAdminDashBoardApi) {
    var obj = {};
    var months = [
      "Jan",
      "Feb",
      "March",
      "April",
      "May",
      "June",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    var timeout1 = null;
    var timeout2 = null;
    var timeout3 = null;
    var timeout4 = null;
    obj.debouncing = function (searchUser, cb) {
      if (timeout1) {
        $timeout.cancel(timeout1);
      }
      timeout1 = $timeout(function () {
        adminApi.searchUserBySearchText(searchUser, cb);
      }, 800);
    };

    obj.outletDebouncing = function (searchOutlet, cb) {
      if (timeout2) {
        $timeout.cancel(timeout2);
      }
      timeout2 = $timeout(function () {
        adminApi.searchOutletBySearchText(searchOutlet, cb);
      }, 800);
    };

    obj.searchBrandDebouncing = function (searchBrand, cb) {
      if (timeout3) {
        $timeout.cancel(timeout3);
      }
      timeout3 = $timeout(function () {
        adminApi.searchBrandBySearchText(searchBrand, cb);
      }, 800);
    };

    obj.searchDashboardBrandDebouncing = function (searchBrand, cb) {
      if (timeout4) {
        $timeout.cancel(timeout4);
      }
      timeout4 = $timeout(function () {
        adminApi.searchDashBoardBrandBySearchText(searchBrand, cb);
      }, 800);
    };

    obj.getBasicData = function (cb) {
      superAdminDashBoardApi.getBasicData(function (err, result) {
        console.log(result);
        if (result && result.data) {
          var data = result.data;
          var brandCnt = data[0][0].count;
          var outletCnt = data[1][0].count;
          var userCnt = data[2][0].count;
          var brands = data[3];
          var totalRevenue = data[5][0].lastMonthRevenue;
          var topBrands = data[4];
          var topBrandOutletCnt = data[9];
          var topBrandEmployeeCnt = data[10];
          var topSecondBrandOutletCnt = data[12];
          var topSecondBrandEmployeeCnt = data[13];
          var topBrandName = data[8][0].name;
          var topSecondBrandName = data[11][0].name;

          var outletsRanking = obj.outletRanking(result.data[6]);
          var userPerBrand = obj.userPerBrand(result.data[7]);

          var graphData = obj.createGraphData(result.data[8]);

          var dates = graphData.dates;
          var revenue = graphData.revenue;

          var graphData = obj.createGraphData(result.data[11]);

          var topSecondBrandDates = graphData.dates;
          var topSecondBrandRevenue = graphData.revenue;

          cb(null, {
            brandCnt,
            outletCnt,
            userCnt,
            brands,
            totalRevenue,
            topBrandEmployeeCnt,
            topBrandName,
            topBrandOutletCnt,
            topBrands,
            topSecondBrandDates,
            topSecondBrandOutletCnt,
            topSecondBrandEmployeeCnt,
            topSecondBrandName,
            outletsRanking,
            userPerBrand,
            dates,
            revenue,
            topSecondBrandRevenue,
            months,
          });
        } else {
          cb(err, null);
        }
      });
    };

    obj.getUsers = function (filter, limit, page, cb) {
      adminApi.getUsers(filter, limit, page, cb);
    };

    obj.getOutlets = function (filter, limit, page, cb) {
      adminApi.getOutlets(filter, limit, page, cb);
    };

    obj.getPages = function (totalCount, limit) {
      var totalPage = Math.ceil(totalCount / limit);
      var pages = new Array(totalPage).fill(0);

      return pages;
    };

    obj.changeLogo = function (brandId, logo, cb) {
      var formData = new FormData();
      formData.append("_id", brandId);
      formData.append("file", logo);
      adminApi.changeLogo(formData, cb);
    };

    obj.updateName = function (brandId, name, cb) {
      adminApi.updateBrandName({ _id: brandId, name: name }, cb);
    };

    obj.updateLocation = function (location, brandId, cb) {
      adminApi.updateLocation({ location: location, _id: brandId }, cb);
    };

    obj.updateContactInfo = function (contactInfo, brandId, cb) {
      adminApi.updateContactInfo(
        { contactInfo: contactInfo, _id: brandId },
        cb
      );
    };

    obj.userPerBrand = function (data) {
      var names = [];
      var cnts = [];
      data.forEach(function (value) {
        names.push(value.name);
        cnts.push(value.employeeCnt);
      });

      return {
        names,
        cnts,
      };
    };

    obj.displayGraph = function (dates, revenue, name, ctx, chart) {
      chart = new Chart(ctx, {
        type: "line",
        data: {
          labels: dates,
          datasets: [
            {
              data: revenue,
              label: name,
              borderColor: "rgb(75, 192, 192)",
              tension: 0.3,
            },
          ],
        },
      });
      return chart;
    };

    obj.getBrands = function (limit, page, cb) {
      adminApi.getBrands({ limit: limit, page: page }, cb);
    };

    obj.createBrand = function (brand, cb) {
      var brandData = new FormData();

      brandData.append("name", brand.name);
      brandData.append("file", brand.logo);
      brandData.append("number", brand.number);
      brandData.append("email", brand.email);
      brandData.append("address", brand.address);
      brandData.append("city", brand.city);
      brandData.append("description", brand.description);
      brandData.append("pinCode", brand.pinCode);

      adminApi.createBrand(brandData, cb);
    };

    obj.displayMap = function () {
      var map = L.map("map").setView([28.6425088, 77.185024], 10);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors",
        maxZoom: 18,
      }).addTo(map);

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          var latitude = position.coords.latitude;
          var longitude = position.coords.longitude;

          console.log("Latitude: " + latitude);
          console.log("Longitude: " + longitude);
          var marker = L.marker([latitude, longitude]).addTo(map);
          marker.bindPopup("Your Location");
        });
      } else {
        var marker = L.marker([37.7749, -122.4194]).addTo(map);
        marker.bindPopup("Mc Donalds");
      }
    };

    var monthDetails = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    obj.createGraphData = function (data, month) {
      console.log(data);
      var dates = [0];
      var revenue = [0];
      var month = new Date().getMonth();
      for (var i = 1; i <= monthDetails[month]; i++) {
        dates.push(i);
        revenue.push(0);
      }
      data.forEach(function (value) {
        var date = +value._id.substr(0, 2);
        revenue[date] = value.totalRevenue;
      });
      return {
        dates,
        revenue,
      };
    };

    obj.compareGraph = function (d1, r1, name1, d2, r2, name2, ctx, chart) {
      chart = new Chart(ctx, {
        type: "line",
        data: {
          labels: d1,
          datasets: [
            {
              data: r1,
              label: name1,
              borderColor: "red",
              tension: 0.2,
            },
            {
              data: r2,
              label: name2,
              borderColor: "green",
              fill: true,
              tension: 0.2,
            },
          ],
        },
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
        },
      });
      return chart;
    };

    obj.outletRanking = function (data) {
      var names = [];
      var revenue = [];

      data.forEach(function (value) {
        names.push(value.name);
        revenue.push(value.totalRevenue);
      });
      return {
        names,
        revenue,
      };
    };

    obj.displayTypeGraph = function (names, revenue, type, name, ctx, chart) {
      console.log("names", names);
      chart = new Chart(ctx, {
        type: type,
        data: {
          labels: names,
          datasets: [
            {
              data: revenue,
              label: name,
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(255, 159, 64, 0.2)",
                "rgba(255, 205, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(201, 203, 207, 0.2)",
              ],
              borderColor: [
                "rgb(255, 99, 132)",
                "rgb(255, 159, 64)",
                "rgb(255, 205, 86)",
                "rgb(75, 192, 192)",
                "rgb(54, 162, 235)",
                "rgb(153, 102, 255)",
                "rgb(201, 203, 207)",
              ],
            },
          ],
        },
      });
      return chart;
    };

    return obj;
  }
);
