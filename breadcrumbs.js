// Build breadcrumb trail relative to the folder containing this script so local file paths still resolve.
const breadcrumbScriptBase = new URL(
  "./",
  document.currentScript?.src || window.location.href
);
const breadcrumbRootPath = breadcrumbScriptBase.pathname.endsWith("/")
  ? breadcrumbScriptBase.pathname.slice(0, -1)
  : breadcrumbScriptBase.pathname;

document.addEventListener("DOMContentLoaded", function () {
  const breadcrumbContainer = document.getElementById("breadcrumbs-container");
  if (!breadcrumbContainer) return;

  const arrowIcon = `<svg class="crumb-separator" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M471.1 297.4C483.6 309.9 483.6 330.2 471.1 342.7L279.1 534.7C266.6 547.2 246.3 547.2 233.8 534.7C221.3 522.2 221.3 501.9 233.8 489.4L403.2 320L233.9 150.6C221.4 138.1 221.4 117.8 233.9 105.3C246.4 92.8 266.7 92.8 279.2 105.3L471.2 297.3z"/></svg>`;

  // Normalize current path relative to the site root (folder containing this script)
  const relativePath = window.location.pathname.startsWith(breadcrumbRootPath)
    ? window.location.pathname.slice(breadcrumbRootPath.length)
    : window.location.pathname;

  let pathArray = relativePath
    .split("/")
    .filter((item) => item !== "");

  // Logic loại bỏ file trùng tên folder
  if (pathArray.length >= 2) {
    const lastItem = pathArray[pathArray.length - 1].toLowerCase();
    const folderName = pathArray[pathArray.length - 2].toLowerCase();
    // Chỉ bỏ khi segment cuối trùng tên folder và không có đuôi .html (tránh làm mất people.html)
    const lastIsFolderOnly = lastItem === folderName;
    if (lastIsFolderOnly) {
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

  const homeHref = new URL("./index.html", breadcrumbScriptBase).href;
  let breadcrumbsHTML = `<a href="${homeHref}">Home</a>`;
  const currentSegments = [];

  pathArray.forEach((part, index) => {
    currentSegments.push(part);

    // Xử lý tên cơ bản từ URL
    let lowerName = part.replace(".html", "").replace(/-/g, " ").toLowerCase();
    let displayName = lowerName.charAt(0).toUpperCase() + lowerName.slice(1);

    const isLast = index === pathArray.length - 1;
    const nextPart = pathArray[index + 1];
    const nextBase =
      typeof nextPart === "string"
        ? nextPart.replace(".html", "").toLowerCase()
        : null;
    const skipBecauseNextMatchesFolder =
      !isLast && nextBase && nextBase === lowerName;

    if (skipBecauseNextMatchesFolder) {
      return;
    }

    breadcrumbsHTML += arrowIcon;

    if (isLast) {
      const pageTitleEl = document.getElementById("page-title");
      if (pageTitleEl) {
        displayName = pageTitleEl.innerText;
      }
      const currentHref = new URL(
        currentSegments.join("/"),
        breadcrumbScriptBase
      ).href;
      breadcrumbsHTML += `<a class="current" href="${currentHref}">${displayName}</a>`;
    } else {
      // Logic fix link folder cho các trang danh mục
      const folderSegments = [...currentSegments];
      if (["blogs", "people"].includes(displayName.toLowerCase())) {
        folderSegments.push(`${displayName.toLowerCase()}.html`);
      }
      const folderLink = new URL(
        folderSegments.join("/"),
        breadcrumbScriptBase
      ).href;
      breadcrumbsHTML += `<a href="${folderLink}">${displayName}</a>`;
    }
  });

  breadcrumbContainer.innerHTML = breadcrumbsHTML;
});
