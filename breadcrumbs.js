// Build breadcrumb trail relative to the folder containing this script so local file paths still resolve.
document.addEventListener("DOMContentLoaded", function () {
  const breadcrumbContainer = document.getElementById("breadcrumbs-container");
  if (!breadcrumbContainer) return;

  const arrowIcon = `<svg class="crumb-separator" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M471.1 297.4C483.6 309.9 483.6 330.2 471.1 342.7L279.1 534.7C266.6 547.2 246.3 547.2 233.8 534.7C221.3 522.2 221.3 501.9 233.8 489.4L403.2 320L233.9 150.6C221.4 138.1 221.4 117.8 233.9 105.3C246.4 92.8 266.7 92.8 279.2 105.3L471.2 297.3z"/></svg>`;

  // Normalize current path relative to the site root (folder containing this script)
  const scriptBase = new URL("./", document.currentScript?.src || window.location.href);
  const rootPath = scriptBase.pathname.endsWith("/")
    ? scriptBase.pathname.slice(0, -1)
    : scriptBase.pathname;
  const relativePath = window.location.pathname.startsWith(rootPath)
    ? window.location.pathname.slice(rootPath.length)
    : window.location.pathname;

  let pathArray = relativePath
    .split("/")
    .filter((item) => item !== "");

  // Logic loại bỏ file trùng tên folder
  if (pathArray.length >= 2) {
    const lastItem = pathArray[pathArray.length - 1].toLowerCase();
    const folderName = pathArray[pathArray.length - 2].toLowerCase();
    if (lastItem.replace(".html", "") === folderName) {
      pathArray.pop();
    }
  }

  // Loại bỏ index.html nếu có
  if (
    pathArray.length > 0 &&
    pathArray[pathArray.length - 1] === "index.html"
  ) {
    pathArray.pop();
  }

  const homeHref = new URL("./index.html", scriptBase).href;
  let breadcrumbsHTML = `<a href="${homeHref}">Home</a>`;
  const currentSegments = [];

  pathArray.forEach((part, index) => {
    currentSegments.push(part);

    // Xử lý tên cơ bản từ URL
    let lowerName = part.replace(".html", "").replace(/-/g, " ").toLowerCase();
    let displayName = lowerName.charAt(0).toUpperCase() + lowerName.slice(1);

    breadcrumbsHTML += arrowIcon;

    // --- ĐOẠN CODE MỚI THÊM VÀO ĐÂY ---
    // Nếu là phần tử cuối cùng (trang hiện tại)
    if (index === pathArray.length - 1) {
      // 1. Thử tìm thẻ có id="page-title" trong HTML
      const pageTitleEl = document.getElementById("page-title");

      // 2. Nếu tìm thấy, lấy nội dung của thẻ đó làm tên Breadcrumb
      if (pageTitleEl) {
        displayName = pageTitleEl.innerText;
      }

      breadcrumbsHTML += `<span class="current">${displayName}</span>`;
    }
    // -----------------------------------
    else {
      // Logic fix link folder cho các trang danh mục
      const folderSegments = [...currentSegments];
      if (["blogs", "people"].includes(displayName.toLowerCase())) {
        folderSegments.push(`${displayName.toLowerCase()}.html`);
      }
      const folderLink = new URL(folderSegments.join("/"), scriptBase).href;
      breadcrumbsHTML += `<a href="${folderLink}">${displayName}</a>`;
    }
  });

  breadcrumbContainer.innerHTML = breadcrumbsHTML;
});
