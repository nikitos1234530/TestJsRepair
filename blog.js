let textArea = document.querySelector('textarea')
let formBlogs = document.querySelector('.form-blogs')
let titleInput = document.querySelector('.blog-title__input')
let infoTextArea = document.querySelector('.blog-info__textarea')
let blogsList = document.querySelector('.blogs-list')
let sortWord = document.querySelector('.sort-word')
let sortDate = document.querySelector('.sort-date')
let sortSearch = document.querySelector('#sort-search')
let newBlog = blogsList.querySelector('.new-blog')
let searchCLoseBtn = document.querySelector('.clear-search')
let charCounter = document.querySelector('.blog-info__char-counter')
let arrBlogs = []
let symbolSearch = ''
let dateSort = ''

// функция дебоунс, для передачи слова из поля ввода поиска.
function debounce(f, ms) {
  let timerId = null

  return function () {
    window.clearTimeout(timerId)
    timerId = setTimeout(() => f(), ms)
  }
}

// функция отрисовки существующих блогов на странице
if (localStorage.getItem('blogsList')) {
  arrBlogs = JSON.parse(localStorage.getItem('blogsList'))
  displayMessages(arrBlogs)
}

// Увеличение поля текст ареа
textArea.addEventListener('keyup', function () {
  if (this.scrollTop > 0) {
    this.style.height = this.scrollHeight + 'px'
  }
})

// Счетчик оставшихся символов в textarea
textArea.addEventListener('input', function () {
  charCounter.textContent = textArea.value.length
})

// функция отслеживания события добавления блогов на страницу
formBlogs.addEventListener('submit', function (e) {
  e.preventDefault()

  let blogsObj = {
    title: titleInput.value,
    info: infoTextArea.value,
    date: new Date().toLocaleString(),
    dateNow: Date.now(),
  }

  arrBlogs.push(blogsObj)

  localStorage.setItem('blogsList', JSON.stringify(arrBlogs))
  titleInput.value = ''
  infoTextArea.value = ''
  displayMessages(arrBlogs)
  blogClass.deleteMessage()
  charCounter.textContent = 0
})

// функция для шаблона добавляемого объекта на страницу
function displayMessages(arr) {
  blogsList.innerHTML = ''
  arr.map(function (item, i) {
    let post = document.createElement('div')
    post.id = i
    post.innerHTML = `
    <div class="new-blog" data-sort="${item.title}" data-sort-date="${item.dateNow}">
    <div class="new-blog-nav">
      <h5 class="new-blog__title">${item.title}</h5>
      <div class="cl-btn-4" id="${i}"></div>
    </div>
    <p class="new-blog__info">${item.info}</p>
    <p class="new-blog__date">${item.date}</p>
  </div>
    `
    blogsList.appendChild(post)
  })
}

// вызов сортировки по алфавиту
sortWord.addEventListener('click', function () {
  if (dateSort === 'word') {
    blogClass.sortAlpha()
    dateSort = 'wordReverse'
  } else {
    blogClass.sortAlphaReverse()
    dateSort = 'word'
  }
})

// вызов сортировки по дате по клику
sortDate.addEventListener('click', function () {
  if (dateSort === 'date') {
    blogClass.sortDate()
    dateSort = 'reverse'
  } else {
    blogClass.sortDateReverse()
    dateSort = 'date'
  }
})

// вызов функции сортировки  по поиску при изменении поля инпут
sortSearch.addEventListener(
  'input',
  debounce(() => {
    blogClass.inputCashHandler()
  }, 500)
)

class BlogCache {
  // функция удаления блога с страницы и с локалСторедж поиска
  deleteMessage() {
    arrBlogs.forEach.call(document.querySelectorAll('.cl-btn-4'), function (el) {
        el.addEventListener('click', function () {
          let par = this.parentNode.parentNode.parentNode
          par.parentNode.removeChild(par)
          let deleteBlogTitle = arrBlogs[par.id].title
          arrBlogs.splice(par.id, 1)
          localStorage.setItem('blogsList', JSON.stringify(arrBlogs))
          let copyKashObj = JSON.parse(localStorage.getItem('kash'))
          const kashKeys = Object.keys(copyKashObj)
          for (let index in kashKeys) {
            let objKeysArr = copyKashObj[kashKeys[index]]
            for (let i = 0; i < objKeysArr.length; i++) {
              if (
                objKeysArr[i].title.toLowerCase() === deleteBlogTitle.toLowerCase()) {
                delete copyKashObj[kashKeys[index]]
              }
            }
          }
          localStorage.setItem('kash', JSON.stringify({ ...copyKashObj }))
        })
      }
    )
  }

  // функция сортировки по алфавиту/
  sortAlpha() {
    function sorted(a, b) {
      if (a.title < b.title) {
        return -1
      }
      if (a.title > b.title) {
        return 1
      }
      return 0
    }
    let sortedAlpha = arrBlogs.sort(sorted)
    localStorage.setItem('blogsList', JSON.stringify(arrBlogs))
    displayMessages(arrBlogs)
    this.deleteMessage()
  }

  // в  обратном порядке
  sortAlphaReverse() {
    function sorted(a, b) {
      if (a.title < b.title) {
        return 1
      }
      if (a.title > b.title) {
        return -1
      }
      return 0
    }
    let sortedAlphaReverse = arrBlogs.sort(sorted)
    localStorage.setItem('blogsList', JSON.stringify(arrBlogs))
    displayMessages(arrBlogs)
    this.deleteMessage()
  }

  //фунция сортировки по дате
  sortDate() {
    function sorted(a, b) {
      if (a.dateNow - b.dateNow > 0) {
        return 1
      }
      if (a.dateNow - b.dateNow < 0) {
        return -1
      }
      return 0
    }
    let sortedDate = arrBlogs.sort(sorted)
    localStorage.setItem('blogsList', JSON.stringify(arrBlogs))
    displayMessages(arrBlogs)
    this.deleteMessage()
  }

  // в обратном порядке даты
  sortDateReverse() {
    function sorted(a, b) {
      if (a.dateNow - b.dateNow > 0) {
        return -1
      }
      if (a.dateNow - b.dateNow < 0) {
        return 1
      }
      return 0
    }
    let sortedDateReverse = arrBlogs.sort(sorted)
    localStorage.setItem('blogsList', JSON.stringify(arrBlogs))
    displayMessages(arrBlogs)
    this.deleteMessage()
  }

  // функция рендера блогов из кеша по поиску/ если же данного кеша нет, то вызывается функция поиска.
  inputCashHandler() {
    const valueSearch = sortSearch.value.trim()
    let kash = JSON.parse(localStorage.getItem('kash'))

    if (!kash) {
      localStorage.setItem('kash', JSON.stringify({}))
    }
    const kashKeys = Object.keys(kash)

    for (let index in kashKeys) {
      if (kashKeys[index].toLowerCase() === valueSearch.toLowerCase()) {
        displayMessages(kash[kashKeys[index]])
        return
      }
    }
    this.searchBlog()
  }

  //функция сортировки блогов по поиску, и добавление данного результата в кеш
  searchBlog() {
    console.log('TRIGGER')
    const valueSearch = sortSearch.value.trim()
    const allPosts = JSON.parse(localStorage.getItem('blogsList'))
    const sortPosts = allPosts.filter((item) => {
      return item.title.toLowerCase().includes(valueSearch.toLowerCase())
    })
    let kash = JSON.parse(localStorage.getItem('kash'))

    if (sortPosts.length && valueSearch.length !== 0) {
      localStorage.setItem('kash',  JSON.stringify({ ...kash, [valueSearch]: sortPosts })
      )
    }
    displayMessages(sortPosts)
    this.deleteMessage()
  }
}
let blogClass = new BlogCache()

//функция для создания пустого объекта, если до этого не было кеша поиска, чтобы не выскакивало ошибки при первом создании кеша
window.onload = function () {
  blogClass.deleteMessage()
  nullKashObject()
}

let nullKashObject = function () {
  let kash = JSON.parse(localStorage.getItem('kash'))

  if (!kash) {
    localStorage.setItem('kash', JSON.stringify({}))
  }
}
