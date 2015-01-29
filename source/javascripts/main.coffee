Turbolinks.enableProgressBar()

$(document).on "ready page:load", ->
  FastClick.attach(document.body)

# startSpinner = ->
#   $("html").addClass "fetching"
#   return
# stopSpinner = ->
#   $("html").removeClass "fetching"
#   return
# $(document).on "page:fetch", startSpinner
# $(document).on "page:receive", stopSpinner