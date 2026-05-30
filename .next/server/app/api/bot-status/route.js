"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/bot-status/route";
exports.ids = ["app/api/bot-status/route"];
exports.modules = {

/***/ "../../client/components/action-async-storage.external":
/*!*******************************************************************************!*\
  !*** external "next/dist/client/components/action-async-storage.external.js" ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/action-async-storage.external.js");

/***/ }),

/***/ "../../client/components/request-async-storage.external":
/*!********************************************************************************!*\
  !*** external "next/dist/client/components/request-async-storage.external.js" ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/request-async-storage.external.js");

/***/ }),

/***/ "../../client/components/static-generation-async-storage.external":
/*!******************************************************************************************!*\
  !*** external "next/dist/client/components/static-generation-async-storage.external.js" ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/static-generation-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fbot-status%2Froute&page=%2Fapi%2Fbot-status%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fbot-status%2Froute.ts&appDir=%2Fhome%2Frunner%2Fworkspace%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Frunner%2Fworkspace&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fbot-status%2Froute&page=%2Fapi%2Fbot-status%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fbot-status%2Froute.ts&appDir=%2Fhome%2Frunner%2Fworkspace%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Frunner%2Fworkspace&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _home_runner_workspace_app_api_bot_status_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/bot-status/route.ts */ \"(rsc)/./app/api/bot-status/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/bot-status/route\",\n        pathname: \"/api/bot-status\",\n        filename: \"route\",\n        bundlePath: \"app/api/bot-status/route\"\n    },\n    resolvedPagePath: \"/home/runner/workspace/app/api/bot-status/route.ts\",\n    nextConfigOutput,\n    userland: _home_runner_workspace_app_api_bot_status_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/bot-status/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZib3Qtc3RhdHVzJTJGcm91dGUmcGFnZT0lMkZhcGklMkZib3Qtc3RhdHVzJTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGYm90LXN0YXR1cyUyRnJvdXRlLnRzJmFwcERpcj0lMkZob21lJTJGcnVubmVyJTJGd29ya3NwYWNlJTJGYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj0lMkZob21lJTJGcnVubmVyJTJGd29ya3NwYWNlJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBc0c7QUFDdkM7QUFDYztBQUNFO0FBQy9FO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixnSEFBbUI7QUFDM0M7QUFDQSxjQUFjLHlFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsaUVBQWlFO0FBQ3pFO0FBQ0E7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDdUg7O0FBRXZIIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZHJvZ29uLXdlYi8/ZDljZCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCIvaG9tZS9ydW5uZXIvd29ya3NwYWNlL2FwcC9hcGkvYm90LXN0YXR1cy9yb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvYm90LXN0YXR1cy9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL2JvdC1zdGF0dXNcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL2JvdC1zdGF0dXMvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCIvaG9tZS9ydW5uZXIvd29ya3NwYWNlL2FwcC9hcGkvYm90LXN0YXR1cy9yb3V0ZS50c1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmNvbnN0IG9yaWdpbmFsUGF0aG5hbWUgPSBcIi9hcGkvYm90LXN0YXR1cy9yb3V0ZVwiO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICBzZXJ2ZXJIb29rcyxcbiAgICAgICAgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBvcmlnaW5hbFBhdGhuYW1lLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fbot-status%2Froute&page=%2Fapi%2Fbot-status%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fbot-status%2Froute.ts&appDir=%2Fhome%2Frunner%2Fworkspace%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Frunner%2Fworkspace&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/api/bot-status/route.ts":
/*!*************************************!*\
  !*** ./app/api/bot-status/route.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   dynamic: () => (/* binding */ dynamic)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_server_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/server-auth */ \"(rsc)/./lib/server-auth.ts\");\nconst dynamic = \"force-dynamic\";\n\n\nasync function GET() {\n    const session = await (0,_lib_server_auth__WEBPACK_IMPORTED_MODULE_1__.getSession)();\n    if (!session) return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n        error: \"Unauthorized\"\n    }, {\n        status: 401\n    });\n    const url = process.env.BOT_HEALTH_URL;\n    if (!url) return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n        error: \"BOT_HEALTH_URL not set\"\n    }, {\n        status: 500\n    });\n    try {\n        const r = await fetch(url, {\n            next: {\n                revalidate: 30\n            }\n        });\n        const d = await r.json();\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(d);\n    } catch  {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Bot unreachable\"\n        }, {\n            status: 503\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2JvdC1zdGF0dXMvcm91dGUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFPLE1BQU1BLFVBQVUsZ0JBQWU7QUFFSTtBQUNJO0FBRXZDLGVBQWVHO0lBQ3BCLE1BQU1DLFVBQVUsTUFBTUYsNERBQVVBO0lBQ2hDLElBQUksQ0FBQ0UsU0FBUyxPQUFPSCxxREFBWUEsQ0FBQ0ksSUFBSSxDQUFDO1FBQUVDLE9BQU87SUFBZSxHQUFHO1FBQUVDLFFBQVE7SUFBSTtJQUVoRixNQUFNQyxNQUFNQyxRQUFRQyxHQUFHLENBQUNDLGNBQWM7SUFDdEMsSUFBSSxDQUFDSCxLQUFLLE9BQU9QLHFEQUFZQSxDQUFDSSxJQUFJLENBQUM7UUFBRUMsT0FBTztJQUF5QixHQUFHO1FBQUVDLFFBQVE7SUFBSTtJQUV0RixJQUFJO1FBQ0YsTUFBTUssSUFBSSxNQUFNQyxNQUFNTCxLQUFLO1lBQUVNLE1BQU07Z0JBQUVDLFlBQVk7WUFBRztRQUFFO1FBQ3RELE1BQU1DLElBQUksTUFBTUosRUFBRVAsSUFBSTtRQUN0QixPQUFPSixxREFBWUEsQ0FBQ0ksSUFBSSxDQUFDVztJQUMzQixFQUFFLE9BQU07UUFDTixPQUFPZixxREFBWUEsQ0FBQ0ksSUFBSSxDQUFDO1lBQUVDLE9BQU87UUFBa0IsR0FBRztZQUFFQyxRQUFRO1FBQUk7SUFDdkU7QUFDRiIsInNvdXJjZXMiOlsid2VicGFjazovL2Ryb2dvbi13ZWIvLi9hcHAvYXBpL2JvdC1zdGF0dXMvcm91dGUudHM/MDU0NiJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgZHluYW1pYyA9ICdmb3JjZS1keW5hbWljJ1xuXG5pbXBvcnQgeyBOZXh0UmVzcG9uc2UgfSBmcm9tICduZXh0L3NlcnZlcidcbmltcG9ydCB7IGdldFNlc3Npb24gfSBmcm9tICdAL2xpYi9zZXJ2ZXItYXV0aCdcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIEdFVCgpIHtcbiAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGdldFNlc3Npb24oKVxuICBpZiAoIXNlc3Npb24pIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiAnVW5hdXRob3JpemVkJyB9LCB7IHN0YXR1czogNDAxIH0pXG5cbiAgY29uc3QgdXJsID0gcHJvY2Vzcy5lbnYuQk9UX0hFQUxUSF9VUkxcbiAgaWYgKCF1cmwpIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiAnQk9UX0hFQUxUSF9VUkwgbm90IHNldCcgfSwgeyBzdGF0dXM6IDUwMCB9KVxuXG4gIHRyeSB7XG4gICAgY29uc3QgciA9IGF3YWl0IGZldGNoKHVybCwgeyBuZXh0OiB7IHJldmFsaWRhdGU6IDMwIH0gfSlcbiAgICBjb25zdCBkID0gYXdhaXQgci5qc29uKClcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oZClcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6ICdCb3QgdW5yZWFjaGFibGUnIH0sIHsgc3RhdHVzOiA1MDMgfSlcbiAgfVxufVxuIl0sIm5hbWVzIjpbImR5bmFtaWMiLCJOZXh0UmVzcG9uc2UiLCJnZXRTZXNzaW9uIiwiR0VUIiwic2Vzc2lvbiIsImpzb24iLCJlcnJvciIsInN0YXR1cyIsInVybCIsInByb2Nlc3MiLCJlbnYiLCJCT1RfSEVBTFRIX1VSTCIsInIiLCJmZXRjaCIsIm5leHQiLCJyZXZhbGlkYXRlIiwiZCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/bot-status/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/neon-server-auth.ts":
/*!*********************************!*\
  !*** ./lib/neon-server-auth.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   auth: () => (/* binding */ auth)\n/* harmony export */ });\n/* harmony import */ var _neondatabase_auth_next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @neondatabase/auth/next/server */ \"(rsc)/./node_modules/@neondatabase/auth/dist/next/server/index.mjs\");\n\nconst auth = (0,_neondatabase_auth_next_server__WEBPACK_IMPORTED_MODULE_0__.createNeonAuth)({\n    baseUrl: process.env.NEON_AUTH_URL,\n    cookies: {\n        secret: process.env.NEON_AUTH_COOKIE_SECRET\n    }\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvbmVvbi1zZXJ2ZXItYXV0aC50cyIsIm1hcHBpbmdzIjoiOzs7OztBQUErRDtBQUV4RCxNQUFNQyxPQUFPRCw4RUFBY0EsQ0FBQztJQUNqQ0UsU0FBU0MsUUFBUUMsR0FBRyxDQUFDQyxhQUFhO0lBQ2xDQyxTQUFTO1FBQ1BDLFFBQVFKLFFBQVFDLEdBQUcsQ0FBQ0ksdUJBQXVCO0lBQzdDO0FBQ0YsR0FBRSIsInNvdXJjZXMiOlsid2VicGFjazovL2Ryb2dvbi13ZWIvLi9saWIvbmVvbi1zZXJ2ZXItYXV0aC50cz80MWIxIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNyZWF0ZU5lb25BdXRoIH0gZnJvbSAnQG5lb25kYXRhYmFzZS9hdXRoL25leHQvc2VydmVyJ1xuXG5leHBvcnQgY29uc3QgYXV0aCA9IGNyZWF0ZU5lb25BdXRoKHtcbiAgYmFzZVVybDogcHJvY2Vzcy5lbnYuTkVPTl9BVVRIX1VSTCEsXG4gIGNvb2tpZXM6IHtcbiAgICBzZWNyZXQ6IHByb2Nlc3MuZW52Lk5FT05fQVVUSF9DT09LSUVfU0VDUkVUISxcbiAgfSxcbn0pXG4iXSwibmFtZXMiOlsiY3JlYXRlTmVvbkF1dGgiLCJhdXRoIiwiYmFzZVVybCIsInByb2Nlc3MiLCJlbnYiLCJORU9OX0FVVEhfVVJMIiwiY29va2llcyIsInNlY3JldCIsIk5FT05fQVVUSF9DT09LSUVfU0VDUkVUIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./lib/neon-server-auth.ts\n");

/***/ }),

/***/ "(rsc)/./lib/server-auth.ts":
/*!****************************!*\
  !*** ./lib/server-auth.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getSession: () => (/* binding */ getSession)\n/* harmony export */ });\n/* harmony import */ var _lib_neon_server_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/lib/neon-server-auth */ \"(rsc)/./lib/neon-server-auth.ts\");\n\nasync function getSession() {\n    try {\n        const { data, error } = await _lib_neon_server_auth__WEBPACK_IMPORTED_MODULE_0__.auth.getSession();\n        if (error || !data?.user) return null;\n        return data;\n    } catch  {\n        return null;\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvc2VydmVyLWF1dGgudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBNkM7QUFFdEMsZUFBZUM7SUFDcEIsSUFBSTtRQUNGLE1BQU0sRUFBRUMsSUFBSSxFQUFFQyxLQUFLLEVBQUUsR0FBRyxNQUFNSCx1REFBSUEsQ0FBQ0MsVUFBVTtRQUM3QyxJQUFJRSxTQUFTLENBQUNELE1BQU1FLE1BQU0sT0FBTztRQUNqQyxPQUFPRjtJQUNULEVBQUUsT0FBTTtRQUNOLE9BQU87SUFDVDtBQUNGIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZHJvZ29uLXdlYi8uL2xpYi9zZXJ2ZXItYXV0aC50cz80YTkzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGF1dGggfSBmcm9tICdAL2xpYi9uZW9uLXNlcnZlci1hdXRoJ1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0U2Vzc2lvbigpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCB7IGRhdGEsIGVycm9yIH0gPSBhd2FpdCBhdXRoLmdldFNlc3Npb24oKVxuICAgIGlmIChlcnJvciB8fCAhZGF0YT8udXNlcikgcmV0dXJuIG51bGxcbiAgICByZXR1cm4gZGF0YVxuICB9IGNhdGNoIHtcbiAgICByZXR1cm4gbnVsbFxuICB9XG59XG4iXSwibmFtZXMiOlsiYXV0aCIsImdldFNlc3Npb24iLCJkYXRhIiwiZXJyb3IiLCJ1c2VyIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./lib/server-auth.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/zod","vendor-chunks/@supabase","vendor-chunks/@neondatabase","vendor-chunks/better-auth","vendor-chunks/@better-auth","vendor-chunks/tslib","vendor-chunks/@noble","vendor-chunks/better-call","vendor-chunks/rou3"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fbot-status%2Froute&page=%2Fapi%2Fbot-status%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fbot-status%2Froute.ts&appDir=%2Fhome%2Frunner%2Fworkspace%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Frunner%2Fworkspace&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();