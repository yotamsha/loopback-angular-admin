'use strict'
import angular from 'angular'

function CoreService (ENV, SweetAlert) {

  this.env = ENV

  this.alert = (title, text) => {
    console.log(title, text)
    // SweetAlert.swal(title, text)
  }

  this.alertSuccess = (title, text) => {
    console.log(title, text, 'success')
    // SweetAlert.swal(title, text, 'success')
  }

  this.alertError = (title, text) => {
    console.log(title, text, 'error')
    // SweetAlert.swal(title, text, 'error')
  }

  this.alertWarning = (title, text) => {
    console.log(title, text, 'warning')
    // SweetAlert.swal(title, text, 'warning')
  }

  this.alertInfo = (title, text) => {
    console.log(title, text, 'info')
    // SweetAlert.swal(title, text, 'info')
  }

  this.confirm = (title, text, successCb, cancelCb) => {
    const config = {
      title: title,
      text: text,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
    }
    this._swal(config, successCb, cancelCb)
  }

  this._swal = (config, successCb, cancelCb) => {
    return window.confirm(config.title, successCb)
    // SweetAlert.swal(config, (confirmed) => {
    //   if (confirmed) {
    //     successCb()
    //   } else {
    //     cancelCb()
    //   }
    // })
  }

  this.toastSuccess = (title, text) => {
    console.log('FIXME TOAST: ', title, text)
    // toasty.pop.success({
    //   title: title,
    //   msg: text,
    //   sound: false
    // })
  }

  this.toastError = (title, text) => {
    console.log('FIXME TOAST: ', title, text)
    // toasty.pop.error({
    //   title: title,
    //   msg: text,
    //   sound: false
    // })
  }

  this.toastWarning = (title, text) => {
    console.log('FIXME TOAST: ', title, text)
    // toasty.pop.warning({
    //   title: title,
    //   msg: text,
    //   sound: false
    // })
  }

  this.toastInfo = (title, text) => {
    console.log('FIXME TOAST: ', title, text)
    // toasty.pop.info({
    //   title: title,
    //   msg: text,
    //   sound: false
    // })
  }
}

angular
  .module('com.module.core.services.core', [])
  .service('CoreService', CoreService)
