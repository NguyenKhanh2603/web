/* ==========================================================================
   PHẦN 1: DỮ LIỆU (DATA) - Thông tin thành viên
   ========================================================================== */
const peopleData = {
  "quan-thanh-tho": {
    name: "Quan Thanh Tho",
    nameVN: "(Quản Thành Thơ)",
    title: "ASSOC. PROF.",
    image: "assets/Tho.jpg",
    about: {
      admission: "-",
      graduation: "-",
      email: "quan.thanh.tho@hcmut.edu.vn",
      interests: [
        "Artificial Intelligence",
        "Natural Language Processing",
        "Intelligent Systems",
        "Formal Methods",
      ],
      topic: "AI and NLP Research",
    },
    papers: [
      "Publication 1: Advanced NLP Methods",
      "Publication 2: AI Systems Architecture",
      "Publication 3: Formal Logic in AI",
    ],
    support: [
      {
        name: "Team Member 1",
        role: "Research Associate",
        contact: "member1@hcmut.edu.vn",
      },
      {
        name: "Team Member 2",
        role: "Research Associate",
        contact: "member2@hcmut.edu.vn",
      },
    ],
  },
  "dung-cam-quang": {
    name: "Dung Cam Quang",
    nameVN: "(Dung Cẩm Quang)",
    title: "PhD Student",
    image: "assets/Quang.jpg",
    about: {
      admission: "2025",
      graduation: "-",
      email: "quang.dungcse@hcmut.edu.vn",
      interests: [
        "Machine Learning",
        "Large Language Model",
        "Graph Neural Networks",
      ],
      topic: "Event Extraction in Vietnamese Corpus",
    },
    papers: [
      '[1] Author et al. "Paper Title 1" Conference 2025',
      '[2] Author et al. "Paper Title 2" Conference 2024',
    ],
    support: [
      {
        name: "Vo Quang Vinh",
        role: "PhD Student",
        contact: "voquangvinh@gmail.com",
      },
      {
        name: "Cao Nguyen Thien Hoang",
        role: "PhD Student at MBZUAI",
        contact: "",
      },
      { name: "Truong Van Khang", role: "PhD Student at RMIT", contact: "" },
    ],
  },
};

/* ==========================================================================
   PHẦN 2: SCROLL SPY (Highlight Menu khi cuộn)
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

  function activateLink(id) {
    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${id}`) {
        link.classList.add("active");
      }
    });
  }

  function isAtBottom() {
    return (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 200
    );
  }

  // Observer cho ScrollSpy (đặt tên riêng là spyObserver)
  const spyOptions = { root: null, rootMargin: "0px", threshold: 0.5 };

  const spyObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !isAtBottom()) {
        activateLink(entry.target.getAttribute("id"));
      }
    });
  }, spyOptions);

  sections.forEach((section) => spyObserver.observe(section));

  // Logic riêng cho Contact khi hết trang
  window.addEventListener("scroll", () => {
    if (isAtBottom()) {
      // Thay vì tìm link cuối cùng, ta ép nó active ID "contact" luôn
      // Đảm bảo section của bạn có id="contact" và link menu là href="#contact"
      activateLink("contact");
    }
  });
}

/* ==========================================================================
   PHẦN 3: BIO MODAL (Popup thông tin)
   ========================================================================== */
const modal = document.getElementById("bioModal");
const modalOverlay = document.querySelector(".bio-modal__overlay");
const closeBtn = document.querySelector(".bio-modal__close");
const tabButtons = document.querySelectorAll(".bio-tabs__btn");
const tabPanes = document.querySelectorAll(".bio-tabs__pane");

function openBioModal(personId) {
  const person = peopleData[personId];
  if (!person) return;

  // Điền thông tin cơ bản
  document.getElementById("bioName").textContent = person.name;
  document.getElementById("bioNameVN").textContent = person.nameVN;
  document.getElementById("bioTitle").textContent = person.title;

  const imgEl = document.getElementById("bioImage");
  imgEl.src = person.image;
  imgEl.alt = person.name;
  imgEl.onerror = function () {
    this.src = "assets/default-avatar.jpg";
  };

  // Render Tab About
  document.getElementById("bioAbout").innerHTML = `
    <div class="bio-detail-row"><span class="bio-detail-label">Year of Admission</span><span>${
      person.about.admission
    }</span></div>
    <div class="bio-detail-row"><span class="bio-detail-label">Year of Graduation</span><span>${
      person.about.graduation
    }</span></div>
    <div class="bio-detail-row"><span class="bio-detail-label">Email</span><a href="mailto:${
      person.about.email
    }">${person.about.email}</a></div>
    <div class="bio-detail-row"><span class="bio-detail-label">Research Interest</span><div class="bio-interests">${person.about.interests
      .map((i) => `<div>${i}</div>`)
      .join("")}</div></div>
    <div class="bio-detail-row"><span class="bio-detail-label">Specific Research Topic</span><span>${
      person.about.topic
    }</span></div>
  `;

  // Render Tab Papers
  document.getElementById("bioPaper").innerHTML = person.papers
    .map((p) => `<p>${p}</p>`)
    .join("");

  // Render Tab Support
  document.getElementById("bioSupport").innerHTML = `
    <div class="bio-members-grid">
      ${person.support
        .map(
          (m) => `
        <div class="bio-member-card">
          <div class="bio-member-avatar"></div><h3>${
            m.name
          }</h3><p class="bio-member-role">${m.role}</p>${
            m.contact ? `<p class="bio-member-contact">${m.contact}</p>` : ""
          }
        </div>
      `
        )
        .join("")}
    </div>
  `;

  // Reset tabs
  tabButtons.forEach((btn) => btn.classList.remove("active"));
  tabPanes.forEach((pane) => pane.classList.remove("active"));
  if (tabButtons[0]) tabButtons[0].classList.add("active");
  if (tabPanes[0]) tabPanes[0].classList.add("active");

  if (modal) modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeBioModal() {
  if (modal) modal.classList.remove("active");
  document.body.style.overflow = "";
}

// Xử lý chuyển tab
tabButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const tabName = e.target.dataset.tab;
    tabButtons.forEach((b) => b.classList.remove("active"));
    tabPanes.forEach((p) => p.classList.remove("active"));
    e.target.classList.add("active");
    const targetPane = document.getElementById(
      tabName.charAt(0).toUpperCase() + tabName.slice(1) + "Tab"
    );
    if (targetPane) targetPane.classList.add("active");
  });
});

if (closeBtn) closeBtn.addEventListener("click", closeBioModal);
if (modalOverlay) modalOverlay.addEventListener("click", closeBioModal);
if (document.querySelector(".bio-modal__content")) {
  document
    .querySelector(".bio-modal__content")
    .addEventListener("click", (e) => e.stopPropagation());
}
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal && modal.classList.contains("active"))
    closeBioModal();
});

/* ==========================================================================
   PHẦN 4: UI ANIMATIONS (Code bạn vừa gửi)
   ========================================================================== */
function initAnimations() {
  // 1. Fade-in Animation Observer (đổi tên thành fadeObserver)
  const fadeOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (!entry.target.classList.contains("fade-in-up")) {
          entry.target.classList.add("fade-in-up");
        }
        fadeObserver.unobserve(entry.target);
      }
    });
  }, fadeOptions);

  const animatedElements = document.querySelectorAll(
    ".sec, .section, .fade-in-up, .card, .blog, .founder__photo"
  );
  animatedElements.forEach((el) => fadeObserver.observe(el));

  // 2. Smooth Hover
  document.querySelectorAll("a").forEach((link) => {
    link.addEventListener("mouseenter", function () {
      this.style.transition = "color 0.3s ease, text-decoration 0.3s ease";
    });
  });

  // 3. Form Input Focus
  const form = document.querySelector(".form");
  if (form) {
    form.querySelectorAll(".inp, .ta").forEach((input) => {
      input.addEventListener("focus", function () {
        this.style.transition = "all 0.3s ease";
      });
    });
  }

  // 4. Navbar Scroll Shadow
  const nav = document.querySelector(".nav"); // Đảm bảo class navbar của bạn là .nav hoặc sửa lại thành .navbar
  if (nav) {
    window.addEventListener("scroll", function () {
      if (window.pageYOffset > 10) {
        nav.style.boxShadow = "0 4px 12px rgba(15, 23, 42, 0.12)";
      } else {
        nav.style.boxShadow = "0 2px 8px rgba(15, 23, 42, 0.06)";
      }
    });
  }

  // 5. Button Ripple Effect
  const buttons = document.querySelectorAll(".btn, .btn-sm, .btn-send");
  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      const ripple = document.createElement("span");
      // Style cho ripple
      Object.assign(ripple.style, {
        position: "absolute",
        width: "20px",
        height: "20px",
        background: "rgba(255, 255, 255, 0.5)",
        borderRadius: "50%",
        pointerEvents: "none",
        animation: "rippleEffect 0.6s ease-out",
      });

      this.style.position = "relative";
      this.style.overflow = "hidden";
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });

  // Inject Keyframes cho Ripple
  const style = document.createElement("style");
  style.textContent = `
    @keyframes rippleEffect {
      from { transform: scale(0); opacity: 1; }
      to { transform: scale(4); opacity: 0; }
    }
  `;
  document.head.appendChild(style);
}

/* ==========================================================================
   MAIN INITIALIZATION (Chạy tất cả khi load trang)
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  // Khởi chạy ScrollSpy
  initScrollSpy();

  // Khởi chạy UI Animations
  initAnimations();

  // Gán sự kiện click mở Modal
  document
    .querySelectorAll('.link a[href="#"], .read-more-btn')
    .forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const card = link.closest(".card") || link.closest(".founder");
        if (!card) return;
        const nameEl = card.querySelector(".name");
        if (!nameEl) return;

        const name = nameEl.textContent
          .trim()
          .toLowerCase()
          .replace(/\s+/g, "-");
        openBioModal(name);
      });
    });
});
