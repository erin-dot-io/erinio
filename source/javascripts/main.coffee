Turbolinks.enableProgressBar()

$(document).on "page:update", ->
  FastClick.attach(document.body)