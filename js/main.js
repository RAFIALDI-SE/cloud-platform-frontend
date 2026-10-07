(function () {
  const navbar = document.getElementById("navbar");
  const navToggle = document.getElementById("nav-toggle");
  const loginWrap = document.getElementById("login-wrap");
  const loginMenu = document.getElementById("login-menu");
  const client = document.getElementById("client");
  const clientPortal = document.getElementById("client-portal");
  const clientLogin = document.getElementById("client-login");

  const menuButtons = document.querySelectorAll("[data-menu]");

  function closeMenus() {
    document.querySelectorAll(".mega").forEach((menu) => {
      menu.hidden = true;
    });
    document.querySelectorAll(".nav-item").forEach((item) => {
      item.classList.remove("is-open");
      const trigger = item.querySelector(".nav-trigger");
      if (trigger) trigger.setAttribute("aria-expanded", "false");
    });
    loginMenu.hidden = true;
    loginWrap.classList.remove("is-open");
    document.getElementById("login-btn").setAttribute("aria-expanded", "false");
  }

  function closeMobile() {
    navbar.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  }

  function showClient(visible) {
    client.hidden = !visible;
    document.body.classList.toggle("client-open", visible);
    if (!visible) showLogin(false);
  }

  function showLogin(on) {
    clientPortal.hidden = on;
    clientLogin.hidden = !on;
  }

  menuButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const item = button.closest(".nav-item");
      const menu = document.getElementById(button.dataset.menu);
      const willOpen = menu.hidden;
      closeMenus();
      if (willOpen) {
        menu.hidden = false;
        item.classList.add("is-open");
        button.setAttribute("aria-expanded", "true");
      }
    });
  });

  document.querySelectorAll("[data-tabs]").forEach((group) => {
    const tabs = group.querySelectorAll("[data-tab]");
    const panels = group.querySelectorAll("[data-panel]");
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const id = tab.dataset.tab;
        tabs.forEach((item) => {
          const active = item === tab;
          item.classList.toggle("is-active", active);
          item.setAttribute("aria-selected", active ? "true" : "false");
        });
        panels.forEach((panel) => {
          panel.hidden = panel.dataset.panel !== id;
        });
      });
    });
  });

  document.getElementById("login-btn").addEventListener("click", () => {
    const willOpen = loginMenu.hidden;
    closeMenus();
    if (willOpen) {
      loginMenu.hidden = false;
      loginWrap.classList.add("is-open");
      document.getElementById("login-btn").setAttribute("aria-expanded", "true");
    }
  });

  function openClient() {
    closeMenus();
    closeMobile();
    if (location.hash !== "#client") location.hash = "client";
    else showClient(true);
  }

  document.querySelectorAll("[data-open-client]").forEach((el) => {
    el.addEventListener("click", openClient);
  });

  document.getElementById("client-close").addEventListener("click", () => {
    if (location.hash === "#client") history.back();
    else showClient(false);
  });

  document.getElementById("show-login").addEventListener("click", () => showLogin(true));
  document.getElementById("back-portal").addEventListener("click", () => showLogin(false));
  document.getElementById("signup-link").addEventListener("click", () => {
    alert("Halaman pendaftaran akun akan dibuka di sini.");
  });
  document.getElementById("register-link").addEventListener("click", () => {
    alert("Halaman pendaftaran akun akan dibuka di sini.");
  });
  document.getElementById("order-btn").addEventListener("click", () => {
    alert("Halaman pemesanan domain & hosting akan dibuka di sini.");
  });
  document.getElementById("help-link").addEventListener("click", () => {
    alert("Halaman bantuan akan dibuka di sini.");
  });
  document.getElementById("forgot-btn").addEventListener("click", () => {
    alert("Fitur lupa password akan dibuka.");
  });

  document.getElementById("login-form").addEventListener("submit", (event) => {
    event.preventDefault();
    alert("Login berhasil diproses.");
  });

  document.querySelectorAll(".mega-card").forEach((card) => {
    card.addEventListener("click", () => {
      closeMenus();
      closeMobile();
    });
  });

  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      closeMenus();
      closeMobile();
    });
  });

  navToggle.addEventListener("click", () => {
    const open = !navbar.classList.contains("is-open");
    navbar.classList.toggle("is-open", open);
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    if (!open) closeMenus();
  });

  document.addEventListener("click", (event) => {
    if (event.target.closest(".nav-item, .login-wrap, .nav-toggle, .mega")) return;
    closeMenus();
    if (!event.target.closest(".navbar")) closeMobile();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenus();
      closeMobile();
    }
  });

  window.addEventListener("hashchange", () => {
    showClient(location.hash === "#client");
  });

  if (location.hash === "#client") showClient(true);

  const cpu = document.getElementById("cpu");
  const ram = document.getElementById("ram");
  const storage = document.getElementById("storage");
  const cpuLabel = document.getElementById("cpu-label");
  const ramLabel = document.getElementById("ram-label");
  const storageLabel = document.getElementById("storage-label");
  const monthLabel = document.getElementById("month-price");
  const hourLabel = document.getElementById("hour-price");

  function rupiah(value) {
    return value.toLocaleString("id-ID");
  }

  function updatePrice() {
    const cpuValue = Number(cpu.value);
    const ramValue = Number(ram.value);
    const storageValue = Number(storage.value);
    const monthly = cpuValue * 25000 + ramValue * 18000 + storageValue * 500;
    const hourly = Math.round(monthly / 720);
    cpuLabel.textContent = cpuValue + " Core";
    ramLabel.textContent = ramValue + " GB";
    storageLabel.textContent = storageValue + " GB";
    monthLabel.textContent = "Rp " + rupiah(monthly);
    hourLabel.textContent = "Rp " + rupiah(hourly) + " /Jam";
  }

  [cpu, ram, storage].forEach((input) => {
    input.addEventListener("input", updatePrice);
  });
  updatePrice();

  document.getElementById("brand").addEventListener("click", (event) => {
    if (location.hash === "#client") {
      event.preventDefault();
      history.back();
    }
    closeMenus();
    closeMobile();
  });
})();
