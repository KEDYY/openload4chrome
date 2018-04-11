/**
 * Options 页面对象绑定
 */
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('extension_version').textContent = version;
  /**
   * 1.优先从chrome中配置列表获取配置
   * 2. 没有获取到，则从本地获取
   * 3. 没有获取到从默认获取
   */
    // 1. 元素获取
  var reverse_list_input = document.getElementById('reverse_list');
  var hide_data_input = document.getElementById('hide_data');
  var chrome_sync_input = document.getElementById('sync');
  var uid_input = document.getElementById('user_id');
  var key_input = document.getElementById('user_token');
  var save_button = document.getElementById('save');
  // 2. 从chrome中获取配置
  chrome.storage.sync.get(["login", "token", "reverse_list", "hide_data", "sync"], function (items) {
    reverse_list_input.checked = items.reverse_list;
    hide_data_input.checked = items.hide_data;
    uid_input.value = getElseEmpty(items.login);
    key_input.value = getElseEmpty(items.token);
    localStorage.login = uid_input.value;
    localStorage.token = key_input.value;
  });

  save_button.addEventListener('click', function () {
    if (!$("form")[0].checkValidity()) {
      notification.notify("Please Enter Login ID and Key");
      return;
    }
    var new_options = {
      reverse_list: reverse_list_input.checked,
      hide_data: hide_data_input.checked,
      chrome_sync: chrome_sync_input.checked,
      login: uid_input.value,
      token: key_input.value
    };

    chrome.storage.sync.set(new_options, function () {
      notification.notify('Options saving ...');
      setTimeout(function () {
        notification.notify('Error, Timeout when save to chrome');
      }, 5000);
      chrome.runtime.sendMessage({action: 'update-options', options: new_options});
    });
    localStorage.login = uid_input.value;
    localStorage.token = key_input.value;
    chrome.storage.sync.get(["login", "token"], function (item) {
      console.log(item.login);
      console.log(item.token);
    });
  });

  document.getElementById('reset').addEventListener('click', function () {
    reverse_list_input.checked = false;
    hide_data_input.checked = false;
    chrome_sync_input.checked = true;
    chrome.storage.sync.clear(function () {
      notification.notify('Options resetting ...');
      setTimeout(function () {
        notification.notify('Error, Timeout when save to chrome');
      }, 5000);
      chrome.runtime.sendMessage({action: 'update-options', options: default_options});
    });
  });

  if (isConfigLogin()) {
    $("#config").hide();
    $("#save").hide();
    $("#info").show();
    $("#logout").show();
    getAccountInfo(function (result) {
      $("body").removeClass("mc-noscroll");

      $('#user_email').text(result.result.email);
      $('#user_apiId').text(result.result.extid);
      $('#user_date').text(result.result.signup_at);
      $('#user_storage').text(result.result.storage_used);
      $('#user_balance').text(result.result.balance);
    });

  } else {
    $("#config").show();
    $("#save").show();
    $("#info").hide();
    $("#logout").hide();
  }
});
