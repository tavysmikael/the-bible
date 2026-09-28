module.exports = [
"[project]/node_modules/.pnpm/next@16.1.7_@babel+core@7.29.7_supports-color@7.2.0__babel-plugin-macros@3.1.0_react-do_c6aec7bc20ca54bf8fad0a3244290e65/node_modules/next/dist/pages/_app.js [ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return App;
    }
});
const _interop_require_default = __turbopack_context__.r("[project]/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/cjs/_interop_require_default.cjs [ssr] (ecmascript)");
const _jsxruntime = __turbopack_context__.r("[externals]/react/jsx-runtime [external] (react/jsx-runtime, cjs)");
const _react = /*#__PURE__*/ _interop_require_default._(__turbopack_context__.r("[externals]/react [external] (react, cjs)"));
const _utils = __turbopack_context__.r("[project]/node_modules/.pnpm/next@16.1.7_@babel+core@7.29.7_supports-color@7.2.0__babel-plugin-macros@3.1.0_react-do_c6aec7bc20ca54bf8fad0a3244290e65/node_modules/next/dist/shared/lib/utils.js [ssr] (ecmascript)");
/**
 * `App` component is used for initialize of pages. It allows for overwriting and full control of the `page` initialization.
 * This allows for keeping state between navigation, custom error handling, injecting additional data.
 */ async function appGetInitialProps({ Component, ctx }) {
    const pageProps = await (0, _utils.loadGetInitialProps)(Component, ctx);
    return {
        pageProps
    };
}
class App extends _react.default.Component {
    static{
        this.origGetInitialProps = appGetInitialProps;
    }
    static{
        this.getInitialProps = appGetInitialProps;
    }
    render() {
        const { Component, pageProps } = this.props;
        return /*#__PURE__*/ (0, _jsxruntime.jsx)(Component, {
            ...pageProps
        });
    }
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=_app.js.map
}),
"[project]/node_modules/.pnpm/next@16.1.7_@babel+core@7.29.7_supports-color@7.2.0__babel-plugin-macros@3.1.0_react-do_c6aec7bc20ca54bf8fad0a3244290e65/node_modules/next/app.js [ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = __turbopack_context__.r("[project]/node_modules/.pnpm/next@16.1.7_@babel+core@7.29.7_supports-color@7.2.0__babel-plugin-macros@3.1.0_react-do_c6aec7bc20ca54bf8fad0a3244290e65/node_modules/next/dist/pages/_app.js [ssr] (ecmascript)");
}),
];

//# sourceMappingURL=eae03_next_80784f72._.js.map