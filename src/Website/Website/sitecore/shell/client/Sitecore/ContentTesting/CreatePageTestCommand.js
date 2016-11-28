require.config({
  paths: {
    loadingImage: "/sitecore/shell/client/Sitecore/ContentTesting/LoadingImage",
    activeTestState: "/sitecore/shell/client/Sitecore/ContentTesting/ActiveTestState"
  }
});

define(["sitecore", "loadingImage", "activeTestState"], function (Sitecore, loadingImage, ActiveTestState) {
  Sitecore.Commands.CreatePageTest =
  {
    canExecute: function(context, sourceControl) {
      return !ActiveTestState.hasActiveTest(context);
    },

    execute: function(context) {
      var dialogPath = Sitecore.Helpers.url.addQueryParameters("/sitecore/client/Applications/ContentTesting/Pages/CreatePageTest.aspx", {
        id: context.app.currentContext.itemId,
        la: context.app.currentContext.language,
        vs: context.app.currentContext.version
      });

      var dialogFeatures = "dialogHeight: 800px;dialogWidth: 1000px;";
      Sitecore.ExperienceEditor.Dialogs.showModalDialog(dialogPath, "", dialogFeatures, null, function (result) {
        if (!result) {
          return;
        }
      });

      // Show the loading image until dialog doesn't appeared
      loadingImage.showElement();
      loadingImage.waitLoadingDialog("jqueryModalDialogsFrame", { height: 760 });
    }
  };
});