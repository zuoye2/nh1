/**
 * 组件加载函数：读取组件 html 并注入容器，实现全站复用
 * @param {string} selector      容器选择器
 * @param {string} componentPath 组件文件路径
 */
async function loadComponent(selector, componentPath) {
  const dom = document.querySelector(selector);
  if (!dom) return;
  try {
    const res = await fetch(componentPath);
    if (!res.ok) throw new Error("组件加载失败");
    const html = await res.text();
    dom.innerHTML = html;
  } catch (err) {
    console.error("组件加载异常：", err);
  }
}
 
// 页面 DOM 加载完成后，载入组件并绑定汉堡菜单事件
document.addEventListener('DOMContentLoaded', async () => {
  // 加载组件
  await loadComponent('#nav-container', 'components/nav.html');
  await loadComponent('#header-container', 'components/header.html');
  await loadComponent('#footer-container', 'components/footer.html');
 
  // 汉堡菜单交互
  const hamburgerBtn = document.querySelector('.nav__hamburger');
  const menuDom = document.querySelector('.nav__menu');
  if (hamburgerBtn && menuDom) {
    hamburgerBtn.addEventListener('click', () => {
      menuDom.classList.toggle('active');
    });
  }
});