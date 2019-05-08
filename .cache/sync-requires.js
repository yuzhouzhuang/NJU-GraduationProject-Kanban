const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => m && m.default || m


exports.components = {
  "component---src-app-js": hot(preferDefault(require("/Users/zhuangyz1998/ReactProjects/react-kanban/src/app.js"))),
  "component---src-templates-blog-js": hot(preferDefault(require("/Users/zhuangyz1998/ReactProjects/react-kanban/src/templates/blog.js"))),
  "component---cache-dev-404-page-js": hot(preferDefault(require("/Users/zhuangyz1998/ReactProjects/react-kanban/.cache/dev-404-page.js")))
}

