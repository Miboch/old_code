/*
  We define an object to hold our "magic" hard-coded string values
  We do this to firstly add some explanation to what they represent and secondly to make it
  easier to change them later on should we need to, so we won't have to change multiple references all
  over our files.

  Note the wordSalad property is just used to pick random words when generating a test post.
*/
const options = {
  storageKey: 'my-posts',
  posts: [],
  wordSalad: [
    'quicksand',
    'lean',
    'difficult',
    'argue',
    'grumpy',
    'sleep',
    'identify',
    'bed',
    'manage',
    'bore',
    'dinner',
    'plausible',
    'wicked',
    'voice',
    'slope',
    'friends',
    'wary',
    'crown',
    'plucky',
    'mountain',
    'impulse',
    'ignorant',
    'fanatical',
    'arch',
    'gaping',
    'flagrant',
    'basin',
    'tasteful',
    'multiply',
    'daughter',
    'helpful',
    'approve',
    'bottle',
    'tight',
    'suck',
    'shade',
    'nippy',
    'distribution',
    'modern',
    'superb'
  ]
};

/* 
  calls the whenPageHasLoaded function once the DomContent is ready.
  This is the entry-point for our "app."
  Here we check if we already have data in localstorage, and if so we will load our posts!
*/
document.addEventListener('DOMContentLoaded', whenPageHasLoaded);
function whenPageHasLoaded() {
  checkLocalstorageForData();
  addPostsFromArray(options.posts);
}

/**
 * Here we first fetch whatever is in localStorage under our storageKey key-value.
 * Then, if there was any data given by that key, we update our options.posts object,
 * which is where we will save our posts while editing the page.
 */
function checkLocalstorageForData() {
  let data = localStorage.getItem(options.storageKey);
  for(item of JSON.parse(data)) {
    options.posts.push(new Post(item.title, item.content, new Date(item.date))); 
  }
}

/**
 * Method used to test quickly by generating a new post fast.
 */
function generateTestPost() {
  let title = replaceXWithWordSalad("x".repeat(1 + Math.random() * 6));
  let body = replaceXWithWordSalad("x".repeat(1 + Math.random() * 40));
  processPost(new Post(title, body));
}

/**
 * Takes a string and replaces every x character with a random word from the wordSalad array.
 * @param {string} inputString 
 */
function replaceXWithWordSalad(inputString) {
  return inputString.split('').map(character => character.replace("x", options.wordSalad[Math.random() * options.wordSalad.length | 0])).join(" ");
}

/**
 * Takes a newly created post and processes it so that it is saved and added to the page.
 * @param {Post} post 
 */
function processPost(post) {
  addPostToDocument(post);
  options.posts.push(post); // add to the array so that the post may be saved.
  savePosts();
}

/**
 * Saves all posts in localStorage
 */
function savePosts() {
  localStorage.setItem(options.storageKey, JSON.stringify(options.posts));
}

/**
 * Function is called when we close out the modal for creating a post without saving the changes.
 */
function cancelPostCreate() {
  clearModalForm();
  toggleModal('create-post');
}

/**
 * Function is called when we want to save a new post from the modal form.
 */
function createPost() {
  let title = document.querySelector('#post-title').value;
  let content = document.querySelector("#post-content").value
  let newPost = new Post(title, content);
  processPost(newPost);
  clearModalForm();
  toggleModal('create-post');
}