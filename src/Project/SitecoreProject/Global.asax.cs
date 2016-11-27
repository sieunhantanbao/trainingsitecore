using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Optimization;
using System.Web.Routing;
using System.Web.Security;
using System.Web.SessionState;
using Sitecore;
using Castle.Windsor;
using Sitecore.ContentSearch.SolrProvider.CastleWindsorIntegration;

namespace SitecoreProject
{
    public class Global : Sitecore.Web.Application, IContainerAccessor
    {
        public IWindsorContainer Container{get;set;}

        void Application_Start(object sender, EventArgs e)
        {
            this.Container = new WindsorContainer();
            //this.Container.Register(Component.For<IDinningRepository>().ImplementedBy<DinningRepository>().LifestylePerWebRequest());
            var startup = new WindsorSolrStartUp(this.Container);
            startup.Initialize();



            // Code that runs on application startup
        }
    }
}