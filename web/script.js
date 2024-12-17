let homehub = {
  addNewUrl () {
    let newUrl = $('#new-url').val()
    if (!newUrl) return

    homehub.appendUrl(newUrl)
    $('#new-url').val('')
  },
  appendUrl (url) {
    let tmpUrl = $('#template-url').contents().clone()

    $(tmpUrl).find('a').attr('href', url).html(url)
    $('#urls .list-group').append(tmpUrl)
  },
  renderPage (data) {
    $.each(data.urls, (index, item) => {
      homehub.appendUrl(item.url)
    })
  },
  showStatus (xhr) {
    let tmpErr = $('#template-err').contents().clone()
    tmpErr.html(xhr.responseText)
    $('#urls').append(tmpErr)
    setTimeout(_ => { $('.alert-danger').remove() }, 5000)
  }
}

$(document).ready(() => {
  $.getJSON('/config/sites')
  .done(homehub.renderPage)
  .fail(homehub.showStatus)

  $('#add-url').on('click', homehub.addNewUrl)
  $('#new-url').on('keyup', (e) => { if (e.key === 'Enter') homehub.addNewUrl() })

  $('#urls').on('click', 'button.btn-close', (e) => {
    $(e.target).parent().remove()
  })

  $('#execute').on('click', (e) => {
    let sites = {}
    sites.urls = []
    $('li.list-group-item').each((index, item) => {
      sites.urls.push({ url: $(item).find('a').attr('href') })
    })

    $.ajax({
      url: '/sites',
      type: 'POST',
      data: JSON.stringify(sites),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: homehub.showStatus,
      error: homehub.showStatus
    })
  })
})
