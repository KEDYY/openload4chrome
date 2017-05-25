/**
 * Useful functions
 */


String.prototype.format = function (args) {
  var result = this;
  if (arguments.length > 0) {
    if (arguments.length == 1 && typeof (args) == "object") {
      for (var key in args) {
        if (args[key] != undefined) {
          var reg = new RegExp("({" + key + "})", "g");
          result = result.replace(reg, args[key]);
        }
      }
    }
    else {
      for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] != undefined) {
          var reg = new RegExp("({[" + i + "]})", "g");
          result = result.replace(reg, arguments[i]);
        }
      }
    }
  }
  return result;
};

function getElseEmpty(v) {
  if (typeof(v) == "undefined") {
    return "";
  } else if (v == null) {
    return "";
  } else {
    return v;
  }
}

function isValid(v) {
  if (typeof(v) == "undefined") {
    return false;
  } else if (v == null) {
    return false;
  } else if (v == '') {
    return false;
  } else if (v.value == '') {
    return false;
  }
  return true;
}

function extend(destination, source) {
  for (var property in source)
    destination[property] = source[property];
  return destination;
}

/**
 * @return {boolean}
 */
function isLink(str_url) {
  var strRegex = "^((https|http|ftp)?://)"
    + "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" //ftp的user@
    + "(([0-9].)[0-9]" // IP形式的URL- 199.194.52.184
    + "|" // 允许IP和DOMAIN（域名）
    + "([0-9a-z_!~*'()-]+.)*" // 域名-
    + "([0-9a-z][0-9a-z-])?[0-9a-z]." // 二级域名
    + "[a-z])" // first level domain- .com or .museum
    + "(:[0-9])?" // 端口- :80
    + "((/?)|" // a slash isn't required if there is no file name
    + "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";
  var re = new RegExp(strRegex);
  return re.test(str_url);
}

var version = `v${chrome.runtime.getManifest().version}`;


var notification = {};
notification.create = function (text, textType, button, buttonType) {

  var newButton = "";
  if (button && buttonType) {
    if (buttonType == "icon") {
      newButton = '<span class="mc-button mc-button-' + buttonType + ' mc-clickable mc-color-white" mc-action="' + button + '"></span>';

    } else if (buttonType == "text") {
      newButton = '<span class="mc-button mc-button-' + buttonType + ' mc-clickable mc-color-white" >' + button + '</span>';

    } else {
      newButton = '<span class="mc-button mc-button-' + buttonType + ' mc-clickable mc-color-white" mc-action="' + button + '">' + button + '</span>';
    }
  }
  document.addEventListener('click', function (e) {
    notification.close(e.target);
  });

  var newText = "";
  if (textType) {
    newText = '<p class="' + textType + '">' + text + '</p>';
  }

  $(".mc-notification-container").append('<div class="mc-notification">' + newButton + newText + '</div>');

  mc.updateFloatingButtons();
};

notification.notify = function (text) {
  notification.create(text, 'mc-text', 'clean-all', 'icon');
};

notification.close = function (e) {
  $(e).parent(".mc-notification").remove();
  mc.updateFloatingButtons();
};
var parseDomain=function (str) {
  if (!str) return '';
  if (str.indexOf('://') != -1) str = str.substr(str.indexOf('://') + 3);
  var topLevel = ['com', 'net', 'org', 'gov', 'edu', 'mil', 'biz', 'name', 'info', 'mobi', 'pro', 'travel', 'museum', 'int', 'areo', 'post', 'rec'];
  var domains = str.split('.');
  if (domains.length <= 1) return str;
  if (!isNaN(domains[domains.length - 1])) return str;
  var i = 0;
  while (i < topLevel.length && topLevel[i] != domains[domains.length - 1]) i++;
  if (i != topLevel.length) return domains[domains.length - 2] + '.' + domains[domains.length - 1];
  else {
    i = 0;
    while (i < topLevel.length && topLevel[i] != domains[domains.length - 2]) i++;
    if (i == topLevel.length) return domains[domains.length - 2] + '.' + domains[domains.length - 1];
    else return domains[domains.length - 3] + '.' + domains[domains.length - 2] + '.' + domains[domains.length - 1];
  }
};
