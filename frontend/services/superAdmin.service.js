///<reference path="../module/module.js"/>

app.service("superAdminService", function (adminApi, $timeout) {
  var timeout1 = null;
  var timeout2 = null;
  this.debouncing = function (searchUser, cb) {
    if (timeout1) {
      $timeout.cancel(timeout1);
    }
    timeout1 = $timeout(function () {
      adminApi.searchUserBySearchText(searchUser, cb);
    }, 800);
  };

  this.searchBrandDebouncing = function (searchBrand, cb) {
    if (timeout1) {
      $timeout.cancel(timeout1);
    }
    timeout1 = $timeout(function () {
      adminApi.searchBrandBySearchText(searchBrand, cb);
    }, 800);
  };

  this.getUsers = function (filter, limit, page, cb) {
    adminApi.getUsers(filter, limit, page, cb);
  };

  this.getPages = function (totalCount, limit) {
    var totalPage = Math.ceil(totalCount / limit);
    var pages = new Array(totalPage).fill(0);

    return pages;
  };

  this.changeLogo = function (brandId, logo, cb) {
    var formData = new FormData();
    formData.append("_id", brandId);
    formData.append("file", logo);
    adminApi.changeLogo(formData, cb);
  };

  this.updateName = function (brandId, name, cb) {
    adminApi.updateBrandName({ _id: brandId, name: name }, cb);
  };

  this.updateLocation = function (location, brandId, cb) {
    adminApi.updateLocation({ location: location, _id: brandId }, cb);
  };

  this.updateContactInfo = function (contactInfo, brandId, cb) {
    adminApi.updateContactInfo({ contactInfo: contactInfo, _id: brandId }, cb);
  };

  this.displayGraph = function (dates, revenue, name, ctx, chart) {
    chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: dates,
        datasets: [
          {
            data: revenue,
            label: name,
            fill: true,
            backgroundColor: "rgba(220,220,220,0.5)",
            borderColor: "rgba(220,220,220,1)",
            pointBackgroundColor: "rgba(220,220,220,1)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(220,220,220,1)",
          },
        ],
      },
    });
    return chart;
  };

  this.getBrands = function (limit, page, cb) {
    adminApi.getBrands({ limit: limit, page: page }, cb);
  };

  this.createBrand = function (brand, cb) {
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

  this.displayMap = function () {
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

  this.createGraphData = function (data, month) {
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

  this.compareGraph = function (d1, r1, name1, d2, r2, name2, ctx, chart) {
    chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: d1,
        datasets: [
          {
            data: r1,
            label: name1,
            borderColor: "red",
            borderWidth: 1,
            fill: true,
            lineTention: 0.5,
          },
          {
            data: r2,
            label: name2,
            borderColor: "green",
            borderWidth: 1,
            lineTention: 0.5,
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
});
