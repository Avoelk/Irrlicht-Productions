const waitOneFrame = () => new Promise(resolve => requestAnimationFrame(resolve))

const input = toggle => toggle.querySelector('input')
const content = toggle => toggle.querySelector('div')
const isOpen = toggle => !input(toggle).checked
const setOpen = (toggle, status) => input(toggle).checked = !status
const label = (toggle, className) => toggle.querySelector(`label.${className}`)
const hide = el => el.style.display = 'none'
const show = el => el.style.display = 'block'

const open = async div => {
  await waitOneFrame()
  div.style.overflow = 'hidden'
  const height = div.querySelector('div').clientHeight
  div.style.height = '0'
  await waitOneFrame()
  div.style.height = `${height}px`
}

const close = async div => {
  const height = div.querySelector('div').clientHeight
  div.style.height = `${height}px`
  div.style.overflow = 'hidden'
  await waitOneFrame()
  await waitOneFrame()
  div.style.height = '0'
}

const setStatus = (toggle, status) => {
  if (status === 'opened') {
    hide(label(toggle, 'close'))
    show(label(toggle, 'open'))
    setOpen(toggle, true)
  }

  if (status === 'closed') {
    show(label(toggle, 'close'))
    hide(label(toggle, 'open'))
    setOpen(toggle, false)
  }
}

const toggles = document.querySelectorAll('.toggle')

toggles.forEach(toggle => {
  if (!isOpen(toggle)) {
    const div = content(toggle)
    div.style.overflow = 'hidden'
    div.style.height = '0'    
  }

  setStatus(toggle, isOpen(toggle) ? 'opened' : 'closed')
  hide(input(toggle))

  input(toggle).addEventListener('change', () => {
    if (isOpen(toggle)) {
      open(content(toggle))
      setStatus(toggle, 'opened')
    } else {
      close(content(toggle))
      setStatus(toggle, 'closed')
    }
  })
})
