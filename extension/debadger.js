// TODO: this needs to run when twitter page is finished rendering, for now we just timeout

const removeTitleNotificationCount = () => {
  document.title = document.title.replace(/^\([0-9]*\) /g, '');
  new MutationObserver(function(mutations) {
    if (document.title.match(/^\([0-9]*\) /)) {
      document.title = document.title.replace(/^\([0-9]*\) /g, '');
    }
  }).observe(
    document.querySelector('title'),
    { characterData: true, attributes: true, childList: true, subtree: true }
  );
}

const handleTwitter = () => {
  document.querySelector('[data-testid=AppTabBar_Notifications_Link] svg').parentElement.querySelector('div').style.display = 'none';
  removeTitleNotificationCount();
}

const handleYoutube = () => {
  document.querySelectorAll('#notification-count').forEach(el => el.style.display = 'none')
  removeTitleNotificationCount();
}

const handleLinkedIn = () => {
  document.querySelector('.nav-item__badge').style.display = 'none'
  removeTitleNotificationCount();
}

setTimeout(() => {
  try {
    console.log('firing');

    if (window.location.href.includes('twitter')) {
      handleTwitter();
    } else if (window.location.href.includes('youtube')) {
      handleYoutube();
    } else if (window.location.href.includes('linkedin')) {
      handleLinkedIn();
    }

  } catch (err) {
    console.error('unable to remove twitter badges, page not ready?');
    console.error(err);
  }
}, 1000)
