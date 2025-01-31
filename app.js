async function loadPosts() {
  // جلب لائحة المقالات من ملف JSON (سيتم إنشاؤه تلقائيًا)
  const postsList = await fetch('/blog/posts/list.json').then(res => res.json());
  
  const container = document.getElementById('posts');
  
  for (const post of postsList) {
      const response = await fetch(post.url);
      const markdown = await response.text();
      const htmlContent = marked.parse(markdown);
      
      container.innerHTML += `
          <article>
              <h2>${post.title}</h2>
              <small>${new Date(post.date).toLocaleDateString('ar-EG')}</small>
              <div>${htmlContent}</div>
          </article>
      `;
  }
}

loadPosts();