document.addEventListener('DOMContentLoaded', () => {
  const outcomesDiv = document.querySelector('.outcomes')
  const form = document.querySelector('form')
  const addOutcomeButton = document.querySelector('.add-outcome')
  addOutcomeButton.addEventListener('click', addOutcome)

  form.addEventListener('submit', (e) => {
    e.preventDefault()
    const formData = new FormData(form)
    formData.append('outcomes', JSON.stringify(getOutcomes()))
    const xhr = new XMLHttpRequest()
    xhr.open('POST', '/bets/new', true)
    xhr.send(formData)
    xhr.onload = () => {
      if (xhr.status === 200) {
        console.log(xhr.responseText)
      }
    }
  })

  function addOutcome() {
    const div = document.createElement('div')
    div.innerHTML = `
      <input type="text" name="description"  placeholder="Popis">
      <input type="number" name="odds" class="odds" placeholder="Šanca" min="0" max="1" step="0.01">
      <input type="number" name="limit" class="limit" placeholder="Limit" min="0">
      `
    outcomesDiv.appendChild(div)
  }

  function getOutcomes() {
    const outcomes = []
    outcomesDiv.querySelectorAll('div').forEach((div) => {
      const description = div.querySelector('[name=description]').value
      const odds = div.querySelector('[name=odds]').value
      const limit = div.querySelector('[name=limit]').value
      outcomes.push({ description, odds, limit })
    })
    console.log(outcomes)
    return outcomes
  }
})
