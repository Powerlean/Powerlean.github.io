(() => {
  const origin = 'https://jwc.jxnu.edu.cn';
  window.menuGroupSwitch = id => {
    const group = document.getElementById(`menuGroup${id}`);
    const parent = document.getElementById(`menuParent_${id}`);
    const expanded = group.style.display === 'none';
    group.style.display = expanded ? 'block' : 'none';
    parent.className = expanded ? 'menuParent' : 'menuParentOut';
    parent.setAttribute('aria-expanded', String(expanded));
  };
  window.OpenWindow = control => window.open(`${origin}/MyControl/All_Display.aspx?UserControl=${control}`, '_blank', 'noopener');
  window.OpenURL = url => window.open(new URL(url, origin).href, '_blank', 'noopener');
  window.__doPostBack = () => {
    document.getElementById('lblUserInfor').textContent = '您已退出本地预览';
    document.getElementById('lbtExit').hidden = true;
  };
  document.querySelector('form').addEventListener('submit', event => event.preventDefault());
  document.querySelectorAll('[id^="menuParent_"]').forEach(parent => {
    parent.tabIndex = 0;
    parent.setAttribute('role', 'button');
    parent.setAttribute('aria-expanded', 'true');
    parent.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); parent.click(); }
    });
  });
  const shortcuts = document.querySelectorAll('#top_right a');
  shortcuts[1].onclick = event => { event.preventDefault(); alert('请按 Ctrl+D 收藏本页面。'); };
  shortcuts[2].onclick = event => { event.preventDefault(); alert('请在浏览器设置中将本页面设置为主页。'); };
  document.querySelectorAll('a[href^="http"]').forEach(link => {
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  });
  document.querySelectorAll('#nav > li').forEach(item => {
    if (item.querySelector('ul')) {
      const trigger = item.querySelector('a');
      if (trigger.getAttribute('href') === '#') {
        trigger.removeAttribute('target');
        trigger.addEventListener('click', event => { event.preventDefault(); item.classList.toggle('preview-open'); });
      }
    }
  });
  const date = new Date();
  document.getElementById('lblDate').textContent = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日 星期${'日一二三四五六'[date.getDay()]}\u00a0`;
  const banners = ['015-banner1.jpg', '016-banner2.jpg', '001-banner3.jpg', '013-banner4.jpg'];
  const image = document.getElementById('bannerimg');
  let current = Math.max(0, banners.findIndex(name => image.src.endsWith(name)));
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
    setInterval(() => {
      current = (current + 1) % banners.length;
      image.src = `/assets/${banners[current]}`;
      image.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 600 });
    }, 8000);
  }
})();
