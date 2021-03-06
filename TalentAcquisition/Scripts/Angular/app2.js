﻿(function () {
    'use strict';

    var app = angular.module("NormalApp2", ["ngCkeditor", "ui.router"])
        .directive('ckEditor', function () {
             return {
            require: '?ngModel',
            link: function (scope, elm, attr, ngModel) {
                var ck = CKEDITOR.replace(elm[0]);
                if (!ngModel) return;
                ck.on('instanceReady', function () {
                    ck.setData(ngModel.$viewValue);
                });
                function updateModel() {
                    scope.$apply(function () {
                        ngModel.$setViewValue(ck.getData());
                    });
                }
                ck.on('change', updateModel);
                ck.on('key', updateModel);
                ck.on('dataReady', updateModel);

                ngModel.$render = function (value) {
                    ck.setData(ngModel.$viewValue);
                };
            }
        };
    });
    app.constant("appSetting", {
        apiBaseUrl: "http://localhost:54105"
        //apiBaseUrl: "https://talenthrm.azurewebsites.net"
    });

})();