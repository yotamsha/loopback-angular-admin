(function () {
  'use strict';
  angular
    .module('com.module.notes')
    .config(function ($stateProvider) {
      $stateProvider
        .state('app.notes', {
          abstract: true,
          url: '/notes',
          templateUrl: 'app/notes/views/main.html'
        })
        .state('app.notes.list', {
          url: '',
          templateUrl: 'app/notes/views/list.html',
          controllerAs: 'ctrl',
          controller: function (notes) {
            this.notes = notes;
          },
          resolve: {
            notes: function (NotesService) {
              return NotesService.getNotes();
            }
          }
        })
        .state('app.notes.add', {
          url: '/add',
          templateUrl: 'app/notes/views/form.html',
          controllerAs: 'ctrl',
          controller: function ($state, NotesService, note) {
            this.note = note;
            this.formFields = NotesService.getFormFields();
            this.formOptions = {};
            this.submit = function () {
              NotesService.upsertNote(this.note).then(function () {
                $state.go('^.list');
              });
            };
          },
          resolve: {
            note: function () {
              return {};
            }
          }
        })
        .state('app.notes.edit', {
          url: '/:id/edit',
          templateUrl: 'app/notes/views/form.html',
          controllerAs: 'ctrl',
          controller: function ($state, NotesService, note) {
            this.note = note;
            this.formFields = NotesService.getFormFields();
            this.formOptions = {};
            this.submit = function () {
              NotesService.upsertNote(this.note).then(function () {
                $state.go('^.list');
              });
            };
          },
          resolve: {
            note: function ($stateParams, NotesService) {
              return NotesService.getNote($stateParams.id);
            }
          }
        })
        .state('app.notes.view', {
          url: '/:id',
          templateUrl: 'app/notes/views/view.html',
          controllerAs: 'ctrl',
          controller: function (note) {
            this.note = note;
          },
          resolve: {
            note: function ($stateParams, NotesService) {
              return NotesService.getNote($stateParams.id);
            }
          }
        })
        .state('app.notes.delete', {
          url: '/:id/delete',
          template: '',
          controllerAs: 'ctrl',
          controller: function ($state, NotesService, note) {
            NotesService.deleteNote(note.id, function () {
              $state.go('^.list');
            }, function () {
              $state.go('^.list');
            });
          },
          resolve: {
            note: function ($stateParams, NotesService) {
              return NotesService.getNote($stateParams.id);
            }
          }
        });
    });

})();
