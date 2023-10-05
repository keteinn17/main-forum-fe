const algacss = require("alga-css");

module.exports = {
  plugins: [
    algacss({
      important: false /*you may want to render style inside @layer cascading inheritance*/,
      directive:
        "use" /*insert 'layer' if you want a valid CSS, @layer instead of @use*/,
      mode: "[data-mode={theme}]" /*you can replace it with '.{theme}-mode' */,
      extract: ["./src/**/*.html", "./src/**/*.{otherFormat}", "./src/App.vue"],
      src: "./src/styles/*.alga",
      plugins: [],
    }),
  ],
};
