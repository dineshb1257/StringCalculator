import("@babel/register").then(() => {
  console.log("Babel configured");
});
module.exports= {
    presets: [
      ["@babel/preset-env", { targets: { node: "current" } }],
     "@babel/preset-react"
    ],
  };