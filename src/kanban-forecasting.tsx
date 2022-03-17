import * as React from "react"
import { render } from "react-dom"
import { CommonMethods2_1To5 } from "TFS/WorkItemTracking/RestClient"
import Forecasting from "./containers/Forecasting"

declare global {
  interface Window {
    VSS
  }
}

window.VSS.init({
  explicitNotifyLoaded: true,
  usePlatformStyles: true,
})
window.VSS.require(
  ["TFS/Dashboards/WidgetHelpers", "TFS/WorkItemTracking/RestClient"],
  (WidgetHelpers, workItemTrackingApi) => {
    const projectId = window.VSS.getWebContext().project.id
    const apiClient: CommonMethods2_1To5 = workItemTrackingApi.getClient()

    window.VSS.register("KanbanForecasting", () => {
      return {
        load: (widgetSettings) => {
          const root = document.querySelector("#root")
          render(
            <Forecasting
              apiClient={apiClient}
              projectId={projectId}
              widgetHelpers={WidgetHelpers}
              widgetSettings={widgetSettings}
            />,
            root,
          )

          return WidgetHelpers.WidgetStatusHelper.Success()
        },
        reload: (widgetSettings) => {
          const root = document.querySelector("#root")
          render(
            <Forecasting
              apiClient={apiClient}
              projectId={projectId}
              widgetHelpers={WidgetHelpers}
              widgetSettings={widgetSettings}
            />,
            root,
          )
        },
      }
    })
    window.VSS.notifyLoadSucceeded()
  },
)
