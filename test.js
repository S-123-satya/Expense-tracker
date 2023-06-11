function updateLastUserActivityTime(posts) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const lastActivityTime = new Date().toISOString();
        resolve(lastActivityTime);
      }, 1000);
    });
  }
  
  function createPost(post) {
    return new Promise((resolve, reject) => {
      // Simulating asynchronous post creation
      setTimeout(() => {
        const newPost = { ...post };
        resolve(newPost);
      }, 200);
    });
  }
  
  function deletePost(postId) {
    return new Promise((resolve, reject) => {
      // Simulating asynchronous post deletion
      setTimeout(() => {
        const deletedPostId = postId;
        resolve(deletedPostId);
      }, 300);
    });
  }
  
  // Usage example:
  const posts = [];
  const user = { lastActivityTime: null };
  
  function executePostCreationFlow(post) {
    createPost(post)
      .then((createdPost) => {
        posts.push(createdPost);
        return Promise.all([updateLastUserActivityTime(posts), createdPost]);
      })
      .then(([lastActivityTime, createdPost]) => {
        user.lastActivityTime = lastActivityTime;
        console.log('All posts:', posts);
        console.log('Last activity time:', lastActivityTime);
        return deletePost(createdPost.id);
      })
      .then((deletedPostId) => {
        const deletedPostIndex = posts.findIndex((post) => post.id === deletedPostId);
        if (deletedPostIndex !== -1) {
          posts.splice(deletedPostIndex, 1);
          console.log('Posts after deletion:', posts);
        } else {
          console.log('Failed to find and delete the last post');
        }
      })
      .catch((error) => {
        console.error('Error occurred:', error);
      });
  }
  
  // Example usage
  const post1 = { id: 1, content: 'Post 1' };
  const post2 = { id: 2, content: 'Post 2' };
  const post3 = { id: 3, content: 'Post 3' };
  
  executePostCreationFlow(post1);
  executePostCreationFlow(post2);
  executePostCreationFlow(post3);
  