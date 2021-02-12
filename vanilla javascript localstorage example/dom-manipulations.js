const domOptions = {
  postRootID: 'post-root',
  clearBehaviors: ['no-warn', 'warn'],
  selectedClearBehavior: 1,
  clearWarning: 'Delete all current posts? This cannot be undone'
};

/**
 * creates 1 post for each Post element in the given array.
 * @param {Post[]} postsToAdd
 */
function addPostsFromArray(postsToAdd) {
  for (post of postsToAdd) {
    addPostToDocument(post);
  }
}

/**
 * Adds a single post to the document.
 * @param {Post} post
 */
function addPostToDocument(post) {
  let root = getPostRoot();
  let postContainer = generatePostContainer();
  let postTitle = generatePostTitle(post.title);
  let dateTag = generateDateTag(post.formattedDate);
  let content = generatePostContentContainer(post.content);
  root.appendChild(composePost(postContainer, postTitle, dateTag, content));
}

/**
 * Generates a container for the post.
 */
function generatePostContainer() {
  let container = document.createElement('div');
  container.classList.add('post-wrapper');
  return container;
}

/**
 * returns a div.post-title element wrapping a h2 with the given titleText.
 * @param {string} titleText
 */
function generatePostTitle(titleText) {
  let title = document.createElement('div');
  title.classList.add('post-title');
  let textElement = document.createElement('h2');
  textElement.innerHTML = titleText;
  title.appendChild(textElement);
  return title;
}

/**
 * returns a div.date-wrapper containing the given text.
 * @param {string} dateText
 */
function generateDateTag(dateText) {
  let dateWrapper = document.createElement('div');
  dateWrapper.classList.add('date-wrapper');
  dateWrapper.innerHTML = dateText;
  return dateWrapper;
}

/**
 * Returns a div.post-content element with the given contentText string.
 * @param {string} contentText
 */
function generatePostContentContainer(contentText) {
  let contentContainer = document.createElement('div');
  contentContainer.classList.add('post-content');
  contentContainer.innerHTML = contentText;
  return contentContainer;
}

/**
 * combines the provided elements into the correct post structure.
 * @param {HTMLElement} postContainer
 * @param {HTMLElement} postTitle
 * @param {HTMLElement} dateTag
 * @param {HTMLElement} content
 */
function composePost(postContainer, postTitle, dateTag, content) {
  postContainer.appendChild(postTitle);
  postContainer.appendChild(dateTag);
  postContainer.appendChild(content);
  return postContainer;
}

/**
 * Checks the page for a modal-container with the given id, and toggles
 * the "show" class on it to show/hide the modal
 * @param {string} modalId
 */
function toggleModal(modalId) {
  let targetedModal = document.querySelector(`#${modalId}`);
  if (targetedModal) targetedModal.classList.toggle('show');
  else console.error(`Found No modal for given id: ${modalId}`);
}

/**
 * Since this function has a branching logic with duplicated logic, we refactor the
 * actual clearing action out into its own method.
 *
 * This function is only concerned with the control-flow of the user interaction
 * The actual dom manipulation and data manipulation happens as a side-effect in performPostClearance()
 */
function clearPostContainer() {
  if (domOptions.clearBehaviors[domOptions.selectedClearBehavior] === domOptions.clearBehaviors[1]) {
    // creates a confirmation dialog with the text from domOptions.clearWarning.
    if (confirm(domOptions.clearWarning)) {
      _performPostClearance();
    }
  } else {
    // in this case we just delete without warnings.
    _performPostClearance();
  }
}

/**
 * Clears out the current posts on the page. Should only be called through clearPostContainer.
 */
function _performPostClearance() {
  options.posts = [];
  let postsContainer = getPostRoot();
  if (postsContainer) postsContainer.innerHTML = '';
  savePosts();
}

/**
 * Flips the selected clear behavior between 1 and 0.
 * This approach only works because there are only two options.
 */
function changeWarnBehavior() {
  domOptions.selectedClearBehavior = 1 - domOptions.selectedClearBehavior;
}

/**
 * Returns the element which is the root container for all posts.
 */
function getPostRoot() {
  let root = document.querySelector(`#${domOptions.postRootID}`);
  if (root) return root;
  else console.error('Could not find any root for posts using the given id: ' + domOptions.postRootID);
}

/**
 * Clears the input values in the modal form, in case we want to add more than one post on the same page view.
 */
function clearModalForm() {
  document.querySelector('#post-title').value = "";
  document.querySelector("#post-content").value = "";
}