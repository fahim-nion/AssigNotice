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
exports.id = "app/api/telegram/auth/route";
exports.ids = ["app/api/telegram/auth/route"];
exports.modules = {

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "websocket":
/*!****************************!*\
  !*** external "websocket" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("websocket");

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("assert");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ "constants":
/*!****************************!*\
  !*** external "constants" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("constants");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ "net":
/*!**********************!*\
  !*** external "net" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("net");

/***/ }),

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("os");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("stream");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Ftelegram%2Fauth%2Froute&page=%2Fapi%2Ftelegram%2Fauth%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Ftelegram%2Fauth%2Froute.ts&appDir=%2Frun%2Fmedia%2Ffahimmorshed%2FGamPam%2FAssigNotice%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Frun%2Fmedia%2Ffahimmorshed%2FGamPam%2FAssigNotice&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Ftelegram%2Fauth%2Froute&page=%2Fapi%2Ftelegram%2Fauth%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Ftelegram%2Fauth%2Froute.ts&appDir=%2Frun%2Fmedia%2Ffahimmorshed%2FGamPam%2FAssigNotice%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Frun%2Fmedia%2Ffahimmorshed%2FGamPam%2FAssigNotice&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   headerHooks: () => (/* binding */ headerHooks),\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage),\n/* harmony export */   staticGenerationBailout: () => (/* binding */ staticGenerationBailout)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _run_media_fahimmorshed_GamPam_AssigNotice_app_api_telegram_auth_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/telegram/auth/route.ts */ \"(rsc)/./app/api/telegram/auth/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/telegram/auth/route\",\n        pathname: \"/api/telegram/auth\",\n        filename: \"route\",\n        bundlePath: \"app/api/telegram/auth/route\"\n    },\n    resolvedPagePath: \"/run/media/fahimmorshed/GamPam/AssigNotice/app/api/telegram/auth/route.ts\",\n    nextConfigOutput,\n    userland: _run_media_fahimmorshed_GamPam_AssigNotice_app_api_telegram_auth_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks, headerHooks, staticGenerationBailout } = routeModule;\nconst originalPathname = \"/api/telegram/auth/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZ0ZWxlZ3JhbSUyRmF1dGglMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRnRlbGVncmFtJTJGYXV0aCUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRnRlbGVncmFtJTJGYXV0aCUyRnJvdXRlLnRzJmFwcERpcj0lMkZydW4lMkZtZWRpYSUyRmZhaGltbW9yc2hlZCUyRkdhbVBhbSUyRkFzc2lnTm90aWNlJTJGYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj0lMkZydW4lMkZtZWRpYSUyRmZhaGltbW9yc2hlZCUyRkdhbVBhbSUyRkFzc2lnTm90aWNlJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFzRztBQUN2QztBQUNjO0FBQ3lCO0FBQ3RHO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixnSEFBbUI7QUFDM0M7QUFDQSxjQUFjLHlFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsdUdBQXVHO0FBQy9HO0FBQ0E7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDNko7O0FBRTdKIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYXNzaWdub3RpY2UvP2NjMmIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiL3J1bi9tZWRpYS9mYWhpbW1vcnNoZWQvR2FtUGFtL0Fzc2lnTm90aWNlL2FwcC9hcGkvdGVsZWdyYW0vYXV0aC9yb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvdGVsZWdyYW0vYXV0aC9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL3RlbGVncmFtL2F1dGhcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL3RlbGVncmFtL2F1dGgvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCIvcnVuL21lZGlhL2ZhaGltbW9yc2hlZC9HYW1QYW0vQXNzaWdOb3RpY2UvYXBwL2FwaS90ZWxlZ3JhbS9hdXRoL3JvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgcmVxdWVzdEFzeW5jU3RvcmFnZSwgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIGhlYWRlckhvb2tzLCBzdGF0aWNHZW5lcmF0aW9uQmFpbG91dCB9ID0gcm91dGVNb2R1bGU7XG5jb25zdCBvcmlnaW5hbFBhdGhuYW1lID0gXCIvYXBpL3RlbGVncmFtL2F1dGgvcm91dGVcIjtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgc2VydmVySG9va3MsXG4gICAgICAgIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCByZXF1ZXN0QXN5bmNTdG9yYWdlLCBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgaGVhZGVySG9va3MsIHN0YXRpY0dlbmVyYXRpb25CYWlsb3V0LCBvcmlnaW5hbFBhdGhuYW1lLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Ftelegram%2Fauth%2Froute&page=%2Fapi%2Ftelegram%2Fauth%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Ftelegram%2Fauth%2Froute.ts&appDir=%2Frun%2Fmedia%2Ffahimmorshed%2FGamPam%2FAssigNotice%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Frun%2Fmedia%2Ffahimmorshed%2FGamPam%2FAssigNotice&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/api/telegram/auth/route.ts":
/*!****************************************!*\
  !*** ./app/api/telegram/auth/route.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/web/exports/next-response */ \"(rsc)/./node_modules/next/dist/server/web/exports/next-response.js\");\n/* harmony import */ var telegram__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! telegram */ \"(rsc)/./node_modules/telegram/index.js\");\n/* harmony import */ var telegram_sessions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! telegram/sessions */ \"(rsc)/./node_modules/telegram/sessions/index.js\");\n\n\n\nconst apiId = Number(process.env.TELEGRAM_API_ID);\nconst apiHash = process.env.TELEGRAM_API_HASH || \"\";\n// Persistent client instance (In production, use a more robust session manager)\nlet client;\nasync function POST(req) {\n    const { action, phone, code, phoneCodeHash, sessionString } = await req.json();\n    try {\n        // 1. Initialize Client\n        const session = new telegram_sessions__WEBPACK_IMPORTED_MODULE_2__.StringSession(sessionString || \"\");\n        client = new telegram__WEBPACK_IMPORTED_MODULE_1__.TelegramClient(session, apiId, apiHash, {\n            connectionRetries: 5\n        });\n        await client.connect();\n        // 2. Action: Send Code\n        if (action === \"SEND_CODE\") {\n            const result = await client.sendCode({\n                apiId,\n                apiHash\n            }, phone);\n            return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_0__[\"default\"].json({\n                phoneCodeHash: result.phoneCodeHash\n            });\n        }\n        // 3. Action: Verify Code\n        if (action === \"VERIFY_CODE\") {\n            await client.signInUser({\n                apiId,\n                apiHash\n            }, {\n                phoneNumber: phone,\n                phoneCode: async ()=>code,\n                phoneCodeHash: phoneCodeHash,\n                onError: (err)=>console.log(err)\n            });\n            const newSessionString = client.session.save();\n            return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_0__[\"default\"].json({\n                session: newSessionString\n            });\n        }\n        // 4. Action: Fetch Real Groups/Channels\n        if (action === \"FETCH_CHANNELS\") {\n            const dialogs = await client.getDialogs({});\n            const channels = dialogs.filter((d)=>d.isChannel || d.isGroup).map((d)=>({\n                    id: d.id?.toString(),\n                    name: d.title\n                }));\n            return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_0__[\"default\"].json({\n                channels\n            });\n        }\n        return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_0__[\"default\"].json({\n            error: \"Invalid Action\"\n        }, {\n            status: 400\n        });\n    } catch (error) {\n        return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_0__[\"default\"].json({\n            error: error.message\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL3RlbGVncmFtL2F1dGgvcm91dGUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUF3RDtBQUNkO0FBQ1E7QUFFbEQsTUFBTUcsUUFBUUMsT0FBT0MsUUFBUUMsR0FBRyxDQUFDQyxlQUFlO0FBQ2hELE1BQU1DLFVBQVVILFFBQVFDLEdBQUcsQ0FBQ0csaUJBQWlCLElBQUk7QUFFakQsZ0ZBQWdGO0FBQ2hGLElBQUlDO0FBRUcsZUFBZUMsS0FBS0MsR0FBZ0I7SUFDekMsTUFBTSxFQUFFQyxNQUFNLEVBQUVDLEtBQUssRUFBRUMsSUFBSSxFQUFFQyxhQUFhLEVBQUVDLGFBQWEsRUFBRSxHQUFHLE1BQU1MLElBQUlNLElBQUk7SUFFNUUsSUFBSTtRQUNGLHVCQUF1QjtRQUN2QixNQUFNQyxVQUFVLElBQUlqQiw0REFBYUEsQ0FBQ2UsaUJBQWlCO1FBQ25EUCxTQUFTLElBQUlULG9EQUFjQSxDQUFDa0IsU0FBU2hCLE9BQU9LLFNBQVM7WUFBRVksbUJBQW1CO1FBQUU7UUFDNUUsTUFBTVYsT0FBT1csT0FBTztRQUVwQix1QkFBdUI7UUFDdkIsSUFBSVIsV0FBVyxhQUFhO1lBQzFCLE1BQU1TLFNBQVMsTUFBTVosT0FBT2EsUUFBUSxDQUFDO2dCQUFFcEI7Z0JBQU9LO1lBQVEsR0FBR007WUFDekQsT0FBT2Qsa0ZBQVlBLENBQUNrQixJQUFJLENBQUM7Z0JBQUVGLGVBQWVNLE9BQU9OLGFBQWE7WUFBQztRQUNqRTtRQUVBLHlCQUF5QjtRQUN6QixJQUFJSCxXQUFXLGVBQWU7WUFDNUIsTUFBTUgsT0FBT2MsVUFBVSxDQUFDO2dCQUFFckI7Z0JBQU9LO1lBQVEsR0FBRztnQkFDMUNpQixhQUFhWDtnQkFDYlksV0FBVyxVQUFZWDtnQkFDdkJDLGVBQWVBO2dCQUNmVyxTQUFTLENBQUNDLE1BQVFDLFFBQVFDLEdBQUcsQ0FBQ0Y7WUFDaEM7WUFDQSxNQUFNRyxtQkFBbUJyQixPQUFPUyxPQUFPLENBQUNhLElBQUk7WUFDNUMsT0FBT2hDLGtGQUFZQSxDQUFDa0IsSUFBSSxDQUFDO2dCQUFFQyxTQUFTWTtZQUFpQjtRQUN2RDtRQUVBLHdDQUF3QztRQUN4QyxJQUFJbEIsV0FBVyxrQkFBa0I7WUFDL0IsTUFBTW9CLFVBQVUsTUFBTXZCLE9BQU93QixVQUFVLENBQUMsQ0FBQztZQUN6QyxNQUFNQyxXQUFXRixRQUNkRyxNQUFNLENBQUNDLENBQUFBLElBQUtBLEVBQUVDLFNBQVMsSUFBSUQsRUFBRUUsT0FBTyxFQUNwQ0MsR0FBRyxDQUFDSCxDQUFBQSxJQUFNO29CQUFFSSxJQUFJSixFQUFFSSxFQUFFLEVBQUVDO29CQUFZQyxNQUFNTixFQUFFTyxLQUFLO2dCQUFDO1lBQ25ELE9BQU81QyxrRkFBWUEsQ0FBQ2tCLElBQUksQ0FBQztnQkFBRWlCO1lBQVM7UUFDdEM7UUFFQSxPQUFPbkMsa0ZBQVlBLENBQUNrQixJQUFJLENBQUM7WUFBRTJCLE9BQU87UUFBaUIsR0FBRztZQUFFQyxRQUFRO1FBQUk7SUFDdEUsRUFBRSxPQUFPRCxPQUFZO1FBQ25CLE9BQU83QyxrRkFBWUEsQ0FBQ2tCLElBQUksQ0FBQztZQUFFMkIsT0FBT0EsTUFBTUUsT0FBTztRQUFDLEdBQUc7WUFBRUQsUUFBUTtRQUFJO0lBQ25FO0FBQ0YiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hc3NpZ25vdGljZS8uL2FwcC9hcGkvdGVsZWdyYW0vYXV0aC9yb3V0ZS50cz9jYWEwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXF1ZXN0LCBOZXh0UmVzcG9uc2UgfSBmcm9tICduZXh0L3NlcnZlcic7XG5pbXBvcnQgeyBUZWxlZ3JhbUNsaWVudCB9IGZyb20gJ3RlbGVncmFtJztcbmltcG9ydCB7IFN0cmluZ1Nlc3Npb24gfSBmcm9tICd0ZWxlZ3JhbS9zZXNzaW9ucyc7XG5cbmNvbnN0IGFwaUlkID0gTnVtYmVyKHByb2Nlc3MuZW52LlRFTEVHUkFNX0FQSV9JRCk7XG5jb25zdCBhcGlIYXNoID0gcHJvY2Vzcy5lbnYuVEVMRUdSQU1fQVBJX0hBU0ggfHwgJyc7XG5cbi8vIFBlcnNpc3RlbnQgY2xpZW50IGluc3RhbmNlIChJbiBwcm9kdWN0aW9uLCB1c2UgYSBtb3JlIHJvYnVzdCBzZXNzaW9uIG1hbmFnZXIpXG5sZXQgY2xpZW50OiBUZWxlZ3JhbUNsaWVudDtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFBPU1QocmVxOiBOZXh0UmVxdWVzdCkge1xuICBjb25zdCB7IGFjdGlvbiwgcGhvbmUsIGNvZGUsIHBob25lQ29kZUhhc2gsIHNlc3Npb25TdHJpbmcgfSA9IGF3YWl0IHJlcS5qc29uKCk7XG5cbiAgdHJ5IHtcbiAgICAvLyAxLiBJbml0aWFsaXplIENsaWVudFxuICAgIGNvbnN0IHNlc3Npb24gPSBuZXcgU3RyaW5nU2Vzc2lvbihzZXNzaW9uU3RyaW5nIHx8IFwiXCIpO1xuICAgIGNsaWVudCA9IG5ldyBUZWxlZ3JhbUNsaWVudChzZXNzaW9uLCBhcGlJZCwgYXBpSGFzaCwgeyBjb25uZWN0aW9uUmV0cmllczogNSB9KTtcbiAgICBhd2FpdCBjbGllbnQuY29ubmVjdCgpO1xuXG4gICAgLy8gMi4gQWN0aW9uOiBTZW5kIENvZGVcbiAgICBpZiAoYWN0aW9uID09PSAnU0VORF9DT0RFJykge1xuICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgY2xpZW50LnNlbmRDb2RlKHsgYXBpSWQsIGFwaUhhc2ggfSwgcGhvbmUpO1xuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgcGhvbmVDb2RlSGFzaDogcmVzdWx0LnBob25lQ29kZUhhc2ggfSk7XG4gICAgfVxuXG4gICAgLy8gMy4gQWN0aW9uOiBWZXJpZnkgQ29kZVxuICAgIGlmIChhY3Rpb24gPT09ICdWRVJJRllfQ09ERScpIHtcbiAgICAgIGF3YWl0IGNsaWVudC5zaWduSW5Vc2VyKHsgYXBpSWQsIGFwaUhhc2ggfSwge1xuICAgICAgICBwaG9uZU51bWJlcjogcGhvbmUsXG4gICAgICAgIHBob25lQ29kZTogYXN5bmMgKCkgPT4gY29kZSxcbiAgICAgICAgcGhvbmVDb2RlSGFzaDogcGhvbmVDb2RlSGFzaCxcbiAgICAgICAgb25FcnJvcjogKGVycikgPT4gY29uc29sZS5sb2coZXJyKSxcbiAgICAgIH0pO1xuICAgICAgY29uc3QgbmV3U2Vzc2lvblN0cmluZyA9IGNsaWVudC5zZXNzaW9uLnNhdmUoKSBhcyB1bmtub3duIGFzIHN0cmluZztcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IHNlc3Npb246IG5ld1Nlc3Npb25TdHJpbmcgfSk7XG4gICAgfVxuXG4gICAgLy8gNC4gQWN0aW9uOiBGZXRjaCBSZWFsIEdyb3Vwcy9DaGFubmVsc1xuICAgIGlmIChhY3Rpb24gPT09ICdGRVRDSF9DSEFOTkVMUycpIHtcbiAgICAgIGNvbnN0IGRpYWxvZ3MgPSBhd2FpdCBjbGllbnQuZ2V0RGlhbG9ncyh7fSk7XG4gICAgICBjb25zdCBjaGFubmVscyA9IGRpYWxvZ3NcbiAgICAgICAgLmZpbHRlcihkID0+IGQuaXNDaGFubmVsIHx8IGQuaXNHcm91cClcbiAgICAgICAgLm1hcChkID0+ICh7IGlkOiBkLmlkPy50b1N0cmluZygpLCBuYW1lOiBkLnRpdGxlIH0pKTtcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGNoYW5uZWxzIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiAnSW52YWxpZCBBY3Rpb24nIH0sIHsgc3RhdHVzOiA0MDAgfSk7XG4gIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogZXJyb3IubWVzc2FnZSB9LCB7IHN0YXR1czogNTAwIH0pO1xuICB9XG59Il0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsIlRlbGVncmFtQ2xpZW50IiwiU3RyaW5nU2Vzc2lvbiIsImFwaUlkIiwiTnVtYmVyIiwicHJvY2VzcyIsImVudiIsIlRFTEVHUkFNX0FQSV9JRCIsImFwaUhhc2giLCJURUxFR1JBTV9BUElfSEFTSCIsImNsaWVudCIsIlBPU1QiLCJyZXEiLCJhY3Rpb24iLCJwaG9uZSIsImNvZGUiLCJwaG9uZUNvZGVIYXNoIiwic2Vzc2lvblN0cmluZyIsImpzb24iLCJzZXNzaW9uIiwiY29ubmVjdGlvblJldHJpZXMiLCJjb25uZWN0IiwicmVzdWx0Iiwic2VuZENvZGUiLCJzaWduSW5Vc2VyIiwicGhvbmVOdW1iZXIiLCJwaG9uZUNvZGUiLCJvbkVycm9yIiwiZXJyIiwiY29uc29sZSIsImxvZyIsIm5ld1Nlc3Npb25TdHJpbmciLCJzYXZlIiwiZGlhbG9ncyIsImdldERpYWxvZ3MiLCJjaGFubmVscyIsImZpbHRlciIsImQiLCJpc0NoYW5uZWwiLCJpc0dyb3VwIiwibWFwIiwiaWQiLCJ0b1N0cmluZyIsIm5hbWUiLCJ0aXRsZSIsImVycm9yIiwic3RhdHVzIiwibWVzc2FnZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/telegram/auth/route.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/tslib","vendor-chunks/telegram","vendor-chunks/pako","vendor-chunks/ip-address","vendor-chunks/entities","vendor-chunks/domutils","vendor-chunks/socks","vendor-chunks/async-mutex","vendor-chunks/slide","vendor-chunks/mime","vendor-chunks/htmlparser2","vendor-chunks/graceful-fs","vendor-chunks/smart-buffer","vendor-chunks/domhandler","vendor-chunks/dom-serializer","vendor-chunks/ts-custom-error","vendor-chunks/write-file-atomic","vendor-chunks/store2","vendor-chunks/node-localstorage","vendor-chunks/imurmurhash","vendor-chunks/domelementtype","vendor-chunks/big-integer","vendor-chunks/@cryptography"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Ftelegram%2Fauth%2Froute&page=%2Fapi%2Ftelegram%2Fauth%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Ftelegram%2Fauth%2Froute.ts&appDir=%2Frun%2Fmedia%2Ffahimmorshed%2FGamPam%2FAssigNotice%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Frun%2Fmedia%2Ffahimmorshed%2FGamPam%2FAssigNotice&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();