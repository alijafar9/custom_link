(function () {
  try {
    var cfg = window.REDIRECT_CONFIG || {};
    var iosUrl = cfg.iosAppStoreUrl || '';
    var androidUrl = cfg.androidPlayStoreUrl || '';
    var fallbackUrl = cfg.fallbackUrl || '';

    if (!iosUrl && !androidUrl) {
      // Nothing to do
      return;
    }

    var ua = navigator.userAgent || navigator.vendor || window.opera || '';
    var isAndroid = /Android/i.test(ua);
    var isIOS = /iPhone|iPad|iPod/i.test(ua);
    // iPadOS 13+ may present as macOS; detect via touch capability
    var isIPadOS = /Macintosh/i.test(ua) && (navigator.maxTouchPoints || 0) > 1;
    if (isIPadOS) {
      isIOS = true;
    }

    // If running inside some in-app webviews that block store, still attempt redirect.
    if (isAndroid && androidUrl) {
      window.location.replace(androidUrl);
      return;
    }

    if (isIOS && iosUrl) {
      window.location.replace(iosUrl);
      return;
    }

    // Fallback: desktop or unsupported => show a landing page or both links
    if (fallbackUrl) {
      window.location.replace(fallbackUrl);
    }
  } catch (e) {
    // Swallow errors to avoid blocking Flutter bootstrap
  }
})();


