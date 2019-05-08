// prefer default export if available
const preferDefault = m => m && m.default || m

exports.components = {
  "component---src-app-js": () => import("/Users/zhuangyz1998/ReactProjects/react-kanban/src/app.js" /* webpackChunkName: "component---src-app-js" */),
  "component---src-templates-blog-js": () => import("/Users/zhuangyz1998/ReactProjects/react-kanban/src/templates/blog.js" /* webpackChunkName: "component---src-templates-blog-js" */),
  "component---cache-dev-404-page-js": () => import("/Users/zhuangyz1998/ReactProjects/react-kanban/.cache/dev-404-page.js" /* webpackChunkName: "component---cache-dev-404-page-js" */)
}

exports.data = () => import(/* webpackChunkName: "pages-manifest" */ "/Users/zhuangyz1998/ReactProjects/react-kanban/.cache/data.json")

