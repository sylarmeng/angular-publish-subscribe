/*import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';*/

import angular from 'angular';
import angularMeteor from 'angular-meteor';
// import { Article } from '../imports/api/dbsource.js';
import { Tasks } from '../imports/api/tasks.js';

class SampleCtrl {
  constructor($scope) {
    $scope.viewModel(this);
 
    this.helpers({
      tasks() {
        return Tasks.find({});
      }
    })
  }
  myAdd() {
          console.log('click');
          Tasks.insert({title: "new", author:"mart",createdAt: new Date()});
        }
}

angular.module('simple-todos', [
  angularMeteor//,
  // todosList.name
]).component('myFunc', {
    templateUrl: 'client/myfunc.html',
    controllerAs: 'myFunc',
    controller:['$scope','$reactive',SampleCtrl],
  });


/*myAdd() {
          console.log('click');
          Tasks.insert({title: "new", author:"mart",createdAt: new Date()});
        };*/


