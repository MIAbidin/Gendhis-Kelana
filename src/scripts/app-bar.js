const AppBar = () => {

  const toggleDrawer = () => {
    const drawer = document.getElementById('drawer');
    drawer.classList.toggle('open');
  };

  return `
    <header class="app-bar">
      <a id="hamburger" href="#" tabindex="0">>☰</a>
      <div class="app-bar__brand">
        <a href="#restaurant-container" class="app-bar__brand-link" tabindex="-1">Gendhis Kelana</a>
      </div>
      <nav id="drawer" class="app-bar__nav">
        <ul class="app-bar__nav-list">
          <li class="app-bar__nav-item"><a href="/" class="app-bar__nav-link" tabindex="0">Home</a></li>
          <li class="app-bar__nav-item"><a href="#" class="app-bar__nav-link" tabindex="0">Favorite</a></li>
          <li class="app-bar__nav-item"><a href="#" class="app-bar__nav-link" tabindex="0">About</a></li>
        </ul>
      </nav>
    </header>
  `;
};

export default AppBar;
