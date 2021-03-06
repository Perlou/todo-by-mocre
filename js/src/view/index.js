// Generated by CoffeeScript 1.10.0

/**
 * todo MVC
 * @date 2016-01-29 15:44:12
 * @author vfasky <vfasky@gmail.com>
 * @link http://vfasky.com
 */
'use strict';
var $, Index, View, model, ref, util,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ref = require('mcoreApp'), View = ref.View, util = ref.util;

model = require('../app/model');

$ = require('jquery');

Index = (function(superClass) {
  extend(Index, superClass);

  function Index() {
    return Index.__super__.constructor.apply(this, arguments);
  }

  Index.prototype.run = function(selected) {
    this.selected = selected != null ? selected : 'all';
    return this.render(require('../tpl/index.html'), {
      todos: model.list(this.selected),
      selected: this.selected,
      allTodos: model.list()
    });
  };

  Index.prototype.updateTodos = function() {
    this.set('todos', model.list(this.selected));
    return this.set('allTodos', model.list());
  };

  Index.prototype.editTodo = function(event, el, todo) {
    todo.isEdit = true;
    model.update(todo);
    this.updateTodos();
    return util.nextTick(function() {
      return $(el).next().focus();
    });
  };

  Index.prototype.saveTodo = function(event, el, todo) {
    if (false === todo.isEdit) {
      return false;
    }
    if (el.value) {
      todo.title = el.value;
    }
    todo.isEdit = false;
    model.update(todo);
    return this.updateTodos();
  };

  Index.prototype.unsaveTodo = function(event, el, todo) {
    var oldTodo;
    todo.isEdit = false;
    oldTodo = model.get(todo.id);
    el.value = oldTodo.title;
    model.update(todo);
    this.updateTodos();
    return false;
  };

  Index.prototype.removeTodo = function(event, el, id) {
    model.remove(id);
    this.updateTodos();
    return false;
  };

  Index.prototype.removeCompleted = function() {
    var data, todos;
    data = [];
    todos = model.list();
    $.each(todos, function(k, v) {
      if (v.visibility === 'active') {
        return data.push(v);
      }
    });
    model.write(data);
    this.updateTodos();
    return false;
  };

  Index.prototype.addTodo = function(event, el) {
    var todo;
    todo = {
      title: $.trim(el.value),
      visibility: 'active'
    };
    if (todo.title.length === 0) {
      return;
    }
    model.add(todo);
    this.updateTodos();
    el.value = '';
    return false;
  };

  Index.prototype.changeAllVisibility = function(event, el) {
    var isCompleted, todos;
    isCompleted = el.checked;
    todos = model.list(this.selected);
    $.each(todos, function(k, v) {
      return v.visibility = isCompleted && 'completed' || 'active';
    });
    model.write(todos);
    return this.updateTodos();
  };

  Index.prototype.changeTodoVisibility = function(event, el, todo) {
    todo.visibility = el.checked && 'completed' || 'active';
    model.update(todo);
    return this.updateTodos();
  };

  return Index;

})(View);

module.exports = Index;

module.exports.viewName = 'index';
