**meteor发布和订阅（angular版本）**

-   publish，在collection的定义文件中加入绿色部分代码

```
import { Mongo } from 'meteor/mongo';

export const Tasks = new Mongo.Collection('tasks');

if (Meteor.isServer) {

// This code only runs on the server

Meteor.publish('tasks', function tasksPublication() {

return Tasks.find();

});

}

```

-   subscribe，在component的构造函数中加入订阅代码

```
import angular from 'angular';

import angularMeteor from 'angular-meteor';

import { Tasks } from '../imports/api/tasks.js';

class SampleCtrl {

constructor(\$scope) {

\$scope.viewModel(this);

this.subscribe('tasks');

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

angular.module('simple-todos', \[

angularMeteor

\]).component('myFunc', {

templateUrl: 'client/myfunc.html',

controllerAs: 'myFunc',

controller:\['\$scope','\$reactive',SampleCtrl\],

});
```

**注意：**如果要使用reactive，需要更改结构体最初的代码如下【添加reactive依赖，绑定scope】

constructor(\$scope,\$reactive) {

// \$scope.viewModel(this);

\$reactive(this).attach(\$scope);

参考：

[*https://www.meteor.com/tutorials/angular/publish-and-subscribe*](https://www.meteor.com/tutorials/angular/publish-and-subscribe)

**meteor使用methods增加安全性**

以下代码可以在发布订阅的代码基础上实验，也可以独立于发布订阅进行测试。

步骤如下：

-   移除insecure包

meteor remove insecure

-   定义methods

在collection文件中定义methods，将数据库操作再次封装在一个函数中

```
Meteor.methods({

'tasks.insert'(){

Tasks.insert({title: "new", author:"mart",createdAt: new Date()});

},//注意此处的标点

});
```

-   调用methods

> 在component的构造函数中调用methods，使用Meteor.call('methodsName')格式，直接替换原有操作代码

```
myAdd() {

// Tasks.insert({title: "new", author:"mart",createdAt: new Date()});

Meteor.call('tasks.insert');

}
```

**参考：**

[*https://www.meteor.com/tutorials/angular/security-with-methods*](https://www.meteor.com/tutorials/angular/security-with-methods)
