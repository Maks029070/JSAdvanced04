let tree = [{
      name: 'Google',
      url: 'https://www.google.com'
   },
   [{
         name: 'Dir1',
         url: '#'
      },
      {
         name: 'Facebook',
         url: 'https://www.facebook.com/'
      },
      {
         name: 'Twitter',
         url: 'https://twitter.com'
      }
   ],
   [{
         name: 'Dir2',
         url: '#'
      },
      [{
            name: 'Dir2_dir1',
            url: '#'
         },
         {
            name: 'Stack overflow',
            url: 'https://stackoverflow.com'
         },
         {
            name: 'Reddit',
            url: 'https://www.reddit.com'
         }
      ],
      {
         name: 'Youtube',
         url: 'https://www.youtube.com'
      }
   ],
   {
      name: 'Amazon',
      url: 'https://www.amazon.com'
   },
   [
      {
         name: 'Dir3',
         url: '#'
      },
      [
         {
            name: 'Dir3_dir1',
            url: '#'
         },
         [
            {
               name: 'Dir3_dir1_dir1',
               url: '#'
            },
            {
               name: 'Linkedin',
               url: 'https://www.linkedin.com'
            }
         ]
      ]
   ]
];
let container = document.getElementById('list');
let depth = 0;
let elements;
let folders;

function buildTree(tree) {
   for (let i = 0; i < tree.length; i++) {
      if (Array.isArray(tree[i]) === true) {
         depth++;
         buildTree(tree[i]);
         depth--;
      } else {
         if (i === 0 && depth !== 0) {
            container.innerHTML += `<div class="el folder" data-depth=${depth-1}>${tree[i].name}</div>`;
         } else {
            container.innerHTML += `<a href="${tree[i].url}" target="blank"><div class="el file" data-depth=${depth}>${tree[i].name}</div></a>`;
         }
      }
   }

   elements = document.getElementsByClassName('el');
   for (let i = 0; i < elements.length; i++) {
      elements[i].style.marginLeft = `${20*parseInt(elements[i].getAttribute('data-depth'))}px`;
      if (parseInt(elements[i].getAttribute('data-depth')) > 0) {
         elements[i].classList.add('disabled');
      }
   }
}
buildTree(tree);

folders = document.getElementsByClassName('folder');
for (let i = 0; i < folders.length; i++) {
   folders[i].addEventListener('click', function (event) {
      for (let i = 0; i < elements.length; i++) {
         if (elements[i] === event.target) {
            for (let k = i + 1; k < elements.length; k++) {
               if (elements[k].classList.contains('disabled') === true) {
                  if (parseInt(elements[k].getAttribute('data-depth')) === parseInt(elements[i].getAttribute('data-depth')) + 1) {
                     elements[k].classList.add('active');
                     elements[k].classList.remove('disabled');
                  }
               } else if (elements[k].classList.contains('active') === true) {
                  if (parseInt(elements[k].getAttribute('data-depth')) > parseInt(elements[i].getAttribute('data-depth'))) {
                     elements[k].classList.add('disabled');
                     elements[k].classList.remove('active');
                  }
               } else {
                  break;
               }
            }
            break;
         }
      }
   }, false);
}