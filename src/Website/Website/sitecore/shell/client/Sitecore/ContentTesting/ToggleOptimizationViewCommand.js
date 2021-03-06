require.config({
  paths: {
    activeTestState: "/sitecore/shell/client/Sitecore/ContentTesting/ActiveTestState"
  }
});

define(["sitecore", "activeTestState"], function (Sitecore, ActiveTestState) {
  Sitecore.Commands.ToggleOptimizationView =
  {
    registryKey: "/Current_User/Page Editor/Show/Optimization",

    canExecute: function (context, sourceControl) {
      var button = context.button;
      var hasTest = ActiveTestState.hasActiveTest(context);
      var self = this;
      
      Sitecore.ExperienceEditor.PipelinesUtil.generateRequestProcessor(
        "ExperienceEditor.ToggleRegistryKey.Get",
        function (response) {
          if (hasTest) {
            if (response.responseValue.value !== undefined && response.responseValue.value) {
              button.set("isPressed", true);
            }
            else if (Sitecore.Helpers.url.getQueryParameters(window.top.location.href)["sc_optimize"] == "true") {
              self.execute(context);
            }
          }
        },
        { value: this.registryKey }).execute(context);
        
      
      return hasTest;
    },

    execute: function (context) {
      var isTurnOn = false;
      Sitecore.ExperienceEditor.PipelinesUtil.generateRequestProcessor(
        "ExperienceEditor.ToggleRegistryKey.Toggle",
        function (response) {
          response.context.button.set("isPressed", response.responseValue.value);
          isTurnOn = response.responseValue.value;
        },
        { value: this.registryKey }
      ).execute(context);

      context.currentContext.value = isTurnOn + "|" + encodeURIComponent(window.top.location.href);
      
      Sitecore.ExperienceEditor.PipelinesUtil.generateRequestProcessor(
        "OptimizationView.Toogle.GetUrl",
        function (response) {
          window.top.location.href = response.responseValue.value;
        }
      ).execute(context);
    }
  };
});