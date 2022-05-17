// function directions(...args) {
//   let [start, ...remaining] = args;
//   let [finish, ...stops] = remaining.reverse();
//   console.log(`drive through ${args.length} towns`);
//   console.log(`start in ${start}`);
//   console.log(`the destination is ${finish}`);
//   console.log(`stopping ${stops.length} times in between`);
// }
// directions("Truckee", "Tahoe City", "Sunnyside", "Homewood", "Tahoma");

// fetch("https://api.randomuser.me/?nat=US&results=2")
//   .then(res => res.json())
//   .then(json => json.results)
//   .then(console.log)
//   .catch(console.error);

// const getFakePerson = async () => {
//   try {
//     let res = await fetch("https://api.randomuser.me/?nat=US&results=1");
//     let { results } = res.json();
//     console.log(results);
//   } catch (error) {
//     console.error(error);
//   }
// };
// getFakePerson();

// const getFakePerson = async () => {
//   let res = await fetch("https://api.randomuser.me/?nat=US&results=1");
//   let { results } = res.json();
//   console.log(results);
// };
// getFakePerson();

// const getPeople = count =>
// new Promise((resolves, rejects) => {
//   const api = `https://api.randomuser.me/?nat=US&results=${count}`;
//   const request = new XMLHttpRequest();
//   request.open("GET", api);
//   request.onload = () =>
//     request.status === 200
//       ? resolves(JSON.parse(request.response).results)
//       : reject(Error(request.statusText));
//   request.onerror = err => rejects(err);
//   request.send();
// });

// getPeople(5)
//   .then(members => console.log(members))
//   .catch(error => console.error(`getPeople failed: ${error.message}`))

//   function Vacation(destination, length) {
//     this.destination = destination;
//     this.length = length;
//   }

// Vacation.prototype.print = function(){
//   console.log(this.dog + ' | ' + this.length + 'days');
// }

//   const maui = new Vacation('maui', 7)
//   console.log(maui);
//   maui.print()

// class Vacation {
//   constructor(destination, length) {
//     this.destination = destination
//     this.length = length
//   }

//   print() {
//     console.log(`${this.destination} | ${this.length} days`)
//   }
// }

// const maui = new Vacation('maui', 70)
// maui.print()

// class Expedition extends Vacation {
//   constructor(destination, length, gear) {
//     super(destination, length)
//     this.gear = gear
//   }
//   print() {
//     super.print()
//     console.log(`Bring your ${this.gear.join(' and your ')}`)
//   }
// }

// const trip = new Expedition('Mr. Bin', 10, ['cofee', 'milk', 'shake'])

// trip.print()


// функция филтрации по алфавиту
// const alphaFilter = (filter = currFilter) => {
//   if (filter === 'downAlpha') {
//     for (let i = 0; i < blogsList.children.length; i++) {
//       for (let k = i; k < blogsList.children.length; k++) {
//         if (
//           blogsList.children[i].getAttribute('data-sort') >
//           blogsList.children[k].getAttribute('data-sort')
//         ) {
//           replacedNode = blogsList.replaceChild(
//             blogsList.children[k],
//             blogsList.children[i]
//           )
//           insertAfter(replacedNode, blogsList.children[i])
//         }
//       }
//     }
//     currFilter = 'upAlpha'
//   } else {
//     for (let i = 0; i < blogsList.children.length; i++) {
//       for (let k = i; k < blogsList.children.length; k++) {
//         if (
//           blogsList.children[i].getAttribute('data-sort') <
//           blogsList.children[k].getAttribute('data-sort')
//         ) {
//           replacedNode = blogsList.replaceChild(
//             blogsList.children[k],
//             blogsList.children[i]
//           )
//           insertAfter(replacedNode, blogsList.children[i])
//         }
//       }
//     }
//     currFilter = 'downAlpha'
//   }
// }


// функция перетасовки нод элементов в доме
// function insertAfter(elem, refElem) {
//   return refElem.parentNode.insertBefore(elem, refElem.nextSibling)
// }

// функция филтрации по дате
// const dateFilter = function (filter = currFilter) {
//   if (filter === 'oldDate') {
//     for (let i = 0; i < blogsList.children.length; i++) {
//       for (let k = i; k < blogsList.children.length; k++) {
//         if (
//           +blogsList.children[i].getAttribute('data-sort-date') <
//           +blogsList.children[k].getAttribute('data-sort-date')
//         ) {
//           replacedNode = blogsList.replaceChild(
//             blogsList.children[k],
//             blogsList.children[i]
//           )
//           insertAfter(replacedNode, blogsList.children[i])
//         }
//       }
//     }
//     currFilter = 'newDate'
//   } else {
//     for (let i = 0; i < blogsList.children.length; i++) {
//       for (let k = i; k < blogsList.children.length; k++) {
//         if (
//           +blogsList.children[i].getAttribute('data-sort-date') >
//           +blogsList.children[k].getAttribute('data-sort-date')
//         ) {
//           replacedNode = blogsList.replaceChild(
//             blogsList.children[k],
//             blogsList.children[i]
//           )
//           insertAfter(replacedNode, blogsList.children[i])
//         }
//       }
//     }
//     currFilter = 'oldDate'
//   }
// }

// функция удаления блогов с страницы
// function deleteMessage() {
//   arrBlogs.forEach.call(document.querySelectorAll('.cl-btn-4'), function (el) {
//     el.addEventListener('click', function () {
//       let par = this.parentNode.parentNode
//       blogsList.removeChild(par)
//       arrBlogs.splice(par, 1)
//       localStorage.setItem('blogsList', JSON.stringify(arrBlogs))
//     })
//   })
// }

// функция сортировки блогов через строку поиска
// const searchBlog = function () {
//   let valueSearch = sortSearch.value.trim()
//     symbolSearch = valueSearch

//   let searchElem = document.querySelectorAll('.new-blog')

//   if (symbolSearch != '') {
//     symbolSearch = symbolSearch[0].toUpperCase() + symbolSearch.slice('1')
//     searchElem.forEach(function (elem) {
//       if (elem.innerText.search(symbolSearch) == -1) {
//         elem.classList.add('hide')
//       } else {
//         elem.classList.remove('hide')
//       }
//     })
//   } else {
//     searchElem.forEach(function (elem) {
//       elem.classList.remove('hide')
//     })
//   }
// }