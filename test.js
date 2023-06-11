function getButter() {

  return new Promise((resolve, reject) => {
 
   // Simulating an asynchronous operation
 
   setTimeout(() => {
 
    const butter = "Butter";
 
    resolve(butter);
 
   }, 2000);
 
  });
 
 }
 
 
 
 async function getColdDrinks() {
 
  try {
 
   const butter = await getButter();
 
   console.log("Husband got", butter);
 
   console.log("Husband is getting cold drinks...");
 
   // Simulating an asynchronous operation
 
   return new Promise((resolve, reject) => {
 
    setTimeout(() => {
 
     const coldDrinks = ["Cola", "Lemonade", "Iced Tea"];
 
     resolve(coldDrinks);
 
    }, 3000);
 
   });
 
  } catch (error) {
 
   console.log("Error:", error);
 
  }
 
 }
 
 
 
 getColdDrinks()
 
  .then((coldDrinks) => {
 
   console.log("Husband got the following cold drinks:", coldDrinks);
 
  })
 
  .catch((error) => {
 
   console.log("Error:", error);
 
  });
 
 
 
 
 
 
 
 // Simulated database object
 
 const database = {
 
  posts: []
 
 };
 
 
 
 function savePost(post) {
 
  return new Promise((resolve, reject) => {
 
   // Simulating an asynchronous operation
 
   setTimeout(() => {
 
    database.posts.push(post);
 
    resolve(post);
 
   }, 2000);
 
  });
 
 }
 
 
 
 function removePost(postId) {
 
  return new Promise((resolve, reject) => {
 
   // Simulating an asynchronous operation
 
   setTimeout(() => {
 
    const index = database.posts.findIndex((post) => post.id === postId);
 
    if (index !== -1) {
 
     const deletedPost = database.posts.splice(index, 1);
 
     resolve(deletedPost);
 
    } else {
 
     reject(new Error("Post not found"));
 
    }
 
   }, 2000);
 
  });
 
 }
 
 
 
 async function createPost(post) {
 
  try {
 
   console.log("Creating post...");
 
   const savedPost = await savePost(post);
 
   console.log("Post created:", savedPost);
 
   return savedPost;
 
  } catch (error) {
 
   console.log("Error:", error);
 
  }
 
 }
 
 
 
 async function deletePost(postId) {
 
  try {
 
   console.log("Deleting post...");
 
   const deletedPost = await removePost(postId);
 
   console.log("Post deleted:", deletedPost);
 
   return deletedPost;
 
  } catch (error) {
 
   console.log("Error:", error);
 
  }
 
 }
 
 
 
 // Example usage
 
 async function exampleUsage() {
 
  const newPost = {
 
   id: 1,
 
   title: "Hello, World!",
 
   content: "This is my first post."
 
  };
 
 
 
  await createPost(newPost);
 
  await deletePost(1);
 
 }
 
 
 
 exampleUsage();
 
 