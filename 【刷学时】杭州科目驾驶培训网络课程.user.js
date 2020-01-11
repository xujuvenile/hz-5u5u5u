// ==UserScript==
// @name         【刷学时】杭州科目驾驶培训网络课程
// @namespace    https://github.com/xujuvenile
// @version      0.1
// @description  快速通过杭州科目驾驶培训网络课程，俗称【刷学时】
// @author       xujuvenile
// @match        https://*.5u5u5u5u.com/studyOnLine.action*
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  if (!("Notification" in window)) {
    alert("请更新浏览器至最新版本");
  }

  Notification.requestPermission();
  var notification = new Notification("验证通知已打开");

  function sendNotification() {
    if (Notification.permission === "granted") {
      notification = new Notification("【驾驶培训】请完成提示框验证！");
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission(function(permission) {
        if (permission === "granted") {
          notification = new Notification("【驾驶培训】请完成提示框验证！");
        }
      });
    }
  }

  var oldInspect = window.inspect;
  window.inspect = function() {
    oldInspect();
    sendNotification();
  };

  // 检查浏览器页面被遮挡自动定时
  // 提示框文字：您已离开当前页面,计时停止.
  var timerCheckId;

  function pageHideHandaler() {
    if (!timerCheckId) {
      timerCheckId = setInterval(() => {
        var alertText = document.getElementsByClassName('xubox_text')[ 0 ];
        var confirmBtn = document.getElementsByClassName('xubox_botton1')[ 0 ];
        if (alertText && alertText.textContent && alertText.textContent.includes('计时停止') && confirmBtn) confirmBtn.click();
      }, 1000);
      console.log('设置每隔1s检查成功,id=', timerCheckId);
    }
  }

  pageHideHandaler();
})();
