define(["sitecore"], function (Sitecore) {
    return {
        priority: 2,
        execute: function (context) {
            // TODO: Check modified flag
            var dialogPath = "/sitecore/shell/Applications/Publish.aspx?id=" + context.currentContext.itemId;
            var dialogFeatures = "dialogHeight: 600px;dialogWidth: 500px;";
            Sitecore.ExperienceEditor.Dialogs.showModalDialog(dialogPath, '', dialogFeatures);
        }
    };
});