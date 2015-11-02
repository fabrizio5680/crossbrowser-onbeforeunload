(function (window, document) {
	angular.module('crossbrowser-onbeforeunload', [])

		.factory('refreshPrevent', function ($window) {

			var message = "Are you sure ?";

			var onbeforeunload = function (e) {

				var firefox = /Firefox[\/\s](\d+)/.test(navigator.userAgent);
				if (firefox) {
					//Add custom dialog
					//Firefox does not accept window.showModalDialog(), window.alert(), window.confirm(), and window.prompt() furthermore
					var dialog = document.createElement("div");
					document.body.appendChild(dialog);
					dialog.id = "dialog";
					dialog.style.visibility = "hidden";
					dialog.innerHTML = message;
					var left = document.body.clientWidth / 2 - dialog.clientWidth / 2;
					dialog.style.left = left + "px";
					dialog.style.visibility = "visible";
					var shadow = document.createElement("div");
					document.body.appendChild(shadow);
					shadow.id = "shadow";
					//tip with setTimeout
					setTimeout(function () {
						document.body.removeChild(document.getElementById("dialog"));
						document.body.removeChild(document.getElementById("shadow"));
					}, 0);
				}
				return message;
			};


			this.bind = function (customMsg) {

				message = customMsg;

				if ($window.attachEvent) {
					$window.attachEvent('onbeforeunload', onbeforeunload);
				} else if ($window.addEventListener) {
					$window.addEventListener('beforeunload', onbeforeunload);
				}
			};

			this.unbind = function () {
				if ($window.detachEvent) {
					$window.detachEvent('onbeforeunload', onbeforeunload);
				} else if ($window.removeEventListener) {
					$window.removeEventListener('beforeunload', onbeforeunload);
				}
			}
		});
}(window, document));