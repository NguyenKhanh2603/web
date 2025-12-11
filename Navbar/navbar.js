document.addEventListener("DOMContentLoaded", async () => {
  const nav = await injectNavbar();
  if (nav) {
    initNavbar(nav);
  }
});

async function injectNavbar() {
  const existingSlot = document.getElementById("navbar-root");
  const slot =
    existingSlot ||
    (() => {
      const placeholder = document.createElement("div");
      placeholder.id = "navbar-root";
      document.body.prepend(placeholder);
      return placeholder;
    })();

  try {
    const response = await fetch("/Navbar/navbar.html", { cache: "no-cache" });
    if (!response.ok) {
      throw new Error(`Navbar fetch failed with status ${response.status}`);
    }

    const html = await response.text();
    const wrapper = document.createElement("div");
    wrapper.innerHTML = html.trim();
    const nav = wrapper.querySelector("header.nav");

    if (!nav) {
      throw new Error("Navbar markup missing in Navbar/navbar.html");
    }

    if (slot.parentNode) {
      slot.replaceWith(nav);
    } else {
      document.body.prepend(nav);
    }

    return nav;
  } catch (error) {
    console.error("Failed to load navbar:", error);
    return null;
  }
}

function initNavbar(nav) {
  const navLinks = nav.querySelectorAll(".nav__links a");
  const navToggle = nav.querySelector(".nav__toggle");
  const navLinksContainer = nav.querySelector(".nav__links");
  // const sections = document.querySelectorAll("section[id]"); // Không cần dùng nữa
  const navCurrent = document.body.dataset.navCurrent || "home";

  const pageOverrides = {
    blogs: "blog.html",
    people: "people.html",
  };

  const overrideHref = pageOverrides[navCurrent];
  if (overrideHref) {
    const targetLink = nav.querySelector(
      `.nav__links a[data-nav="${navCurrent}"]`
    );
    targetLink?.setAttribute("href", overrideHref);
  }

  if (navCurrent === "home") {
    const anchorMap = {
      // about: "#about", // Đã bỏ theo yêu cầu
      // blogs: "#blogs",
      // people: "#people",
      // contact: "#contact",
    };

    Object.entries(anchorMap).forEach(([key, value]) => {
      const link = nav.querySelector(`.nav__links a[data-nav="${key}"]`);
      link?.setAttribute("href", value);
    });
  }

  const setActiveLink = (key) => {
    navLinks.forEach((link) => {
      const isActive = link.dataset.nav === key;
      link.classList.toggle("active", isActive);
      if (isActive) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  };

  // --- PHẦN ĐÃ SỬA ---
  const handleScroll = () => {
    // 1. Logic Active Link: Luôn set theo navCurrent (Home), không đổi khi cuộn
    setActiveLink(navCurrent);

    // 2. Logic Shadow: Giữ nguyên hiệu ứng bóng đổ khi cuộn
    if (window.pageYOffset > 10) {
      nav.style.boxShadow = "0 4px 12px rgba(15, 23, 42, 0.12)";
    } else {
      nav.style.boxShadow = "0 2px 8px rgba(15, 23, 42, 0.06)";
    }
  };
  // -------------------

  if (navToggle && navLinksContainer) {
    navToggle.addEventListener("click", () => {
      const isActive = navToggle.classList.toggle("active");
      navLinksContainer.classList.toggle("active", isActive);
      navToggle.setAttribute("aria-expanded", isActive ? "true" : "false");
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navToggle.classList.remove("active");
        navLinksContainer.classList.remove("active");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  if (navCurrent === "home") {
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        const key = link.dataset.nav || "home";
        setActiveLink(key);
      });
    });
  }

  window.addEventListener("scroll", handleScroll);
  window.addEventListener("load", handleScroll);

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      navToggle?.classList.remove("active");
      navLinksContainer?.classList.remove("active");
      navToggle?.setAttribute("aria-expanded", "false");
    }
  });
}