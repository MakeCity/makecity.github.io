const assert = require("assert");
const HtmlWebpackPlugin = require("html-webpack-plugin");

class HtmlWebpackProcessingPlugin {
    constructor(options) {
        assert.equal(
            options,
            undefined,
            "The HtmlWebpackProcessingPlugin does not accept any options"
        );
    }

    apply(compiler) {
        let self = this;

        compiler.hooks.compilation.tap(
            "HTMLWebpackProcessingPlugin",
            (compilation) => {
                HtmlWebpackPlugin.getHooks(compilation).afterTemplateExecution.tap(
                    "HTMLWebpackProcessingPlugin",
                    (htmlPluginData, callback) => {
                        self.preProcessing(htmlPluginData, callback);
                    }
                );
            }
        );
    }

    preProcessing(htmlPluginData, callback) {
        if (typeof htmlPluginData.plugin.options.preProcessing === "function") {
            try {
                htmlPluginData.html = htmlPluginData.plugin.options.preProcessing(
                    htmlPluginData.html
                );
                typeof callback === "function" && callback(null, htmlPluginData);
            } catch (err) {
                console.log(err);
                typeof callback === "function" && callback(err);
            }
        } else {
            typeof callback === "function" && callback(null, htmlPluginData);
        }
    }
}

module.exports = HtmlWebpackProcessingPlugin;
