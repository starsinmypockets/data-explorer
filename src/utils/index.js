export const unloadDatapackage = datapackage => {
  const unloadedDatapackage = deepClone(datapackage)
  
  unloadedDatapackage.resources && unloadedDatapackage.resources.forEach(resource => {
    delete resource.data
    delete resource._values
  })
  
  unloadedDatapackage.views && unloadedDatapackage.views.forEach(view => {
    view.resources && view.resources.forEach(resource => {
      delete resource.data
      delete resource._values
    })
  })

  return unloadedDatapackage
}

export const getEmptyView = datapackage => {
  try {
    return {resources: [{schema: datapackage.resources[0].schema}]}
  } catch (e) {
    return {}
  }
}

export const getDataViewChartBuilderView = (datapackage) => {
  if (!datapackage) return {}

  const views = datapackage.views || []

  switch (views.length) {
    case 1:
      return datapackage.views[0]
    case 2:
      return datapackage.views[1]
    case 3:
      return datapackage.views[2]
    default:
      return getEmptyView(datapackage)
  }
}

export const showQueryBuilder = (props) => {
  const activeWidget = props.widgets.find(widget => widget.active)
  let isWebView = false

  try {
    isWebView = activeWidget.datapackage.views[0].view_type === 'webpage_view'
  } catch {
    // just continue -- not a web view
  }
  
  if (isWebView) return false

  return props.datapackage.resources[0].datastore_active
}

export const getDataViewMapBuilderView = (datapackage) => {
  if (!datapackage) return {}

  const views = datapackage.views || []

  return views.find(view => view.specType === 'tabularmap') || getEmptyView(datapackage)
}

export const getResourceForFiltering = (datapackage) => {
  if (!datapackage) return {}
  return datapackage.resources[0]
}

export const deepClone = obj => {
  return JSON.parse(JSON.stringify(obj))
}
