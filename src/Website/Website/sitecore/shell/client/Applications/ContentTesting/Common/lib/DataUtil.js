define(["sitecore"], function (Sitecore) {
  return {
    DataUri: function(initVal) {
      var prefix = "sitecore://";

      this.id = null;
      this.ver = null;
      this.lang = null;
      this.rev = null;

      this.from = function (str) {
        if (str.indexOf(prefix) != 0) {
          return;
        }

        var idEnd = str.indexOf("?") || str.length - 1;
        this.id = str.slice(prefix.length, idEnd);
        this._ensureIdFormat();

        if (idEnd < str.length - 1) {
          var params = Sitecore.Helpers.url.getQueryParameters(str);
          this.ver = params.ver;
          this.lang = params.lang;
          this.rev = params.rev;
        }
      };

      this.fromObject = function (ob) {
        if(ob.ItemID) {
          this.id = ob.ItemID;
          this._ensureIdFormat();
        }
        
        if(ob.Language && ob.Language.Name) {
          this.lang = ob.Language.Name;
        }
        
        if (ob.Version && ob.Version.Number) {
          this.ver = ob.Version.Number;
        }
      };

      this.toString = function () {
        var decodedId = decodeURIComponent(this.id);
        var output = prefix + decodedId;
        if (this.ver) {
          output = Sitecore.Helpers.url.addQueryParameters(output, { ver: this.ver });
        }

        if (this.lang) {
          output = Sitecore.Helpers.url.addQueryParameters(output, { lang: this.lang });
        }

        if (this.rev) {
          output = Sitecore.Helpers.url.addQueryParameters(output, { rev: this.rev });
        }

        return output;
      };

      this._ensureIdFormat = function () {
        var decodedId = decodeURIComponent(this.id);
        if (decodedId.substring(0, 1) != "{") {
          decodedId = "{" + this.id + "}";
        }

        this.id = decodedId.toUpperCase();
      };

      if (initVal) {
        if (_.isObject(initVal)) {
          this.fromObject(initVal);
        }
        else {
          this.from(initVal);
        }
      }
    },

    composeUri: function (storage) {
      var params = Sitecore.Helpers.url.getQueryParameters(window.location.href);
      var la = (storage ? storage.get("languageName") : null) || params.la;
      var id = (storage ? storage.get("itemId") : null) || params.id;
      var vs = (storage ? storage.get("version") : null) || params.vs;

      var uri = null;

      if (id != null && vs != null) {
        var decodedId = decodeURIComponent(id);
        uri = "sitecore://" + decodedId + "?ver=" + vs;
      }

      if (la != null) {
        uri += "&lang=" + la;
      }

      return uri;
    }
  }
});