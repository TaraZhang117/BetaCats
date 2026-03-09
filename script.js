document.addEventListener('DOMContentLoaded', () => {
  const gallery = document.getElementById('catGallery');
  const searchInput = document.getElementById('searchInput');

  // 载入猫资料（改成 ./cats.json 以兼容子目录）
  fetch('./cats.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok: ' + response.status);
      }
      return response.json();
    })
    .then(cats => {
      displayCats(cats);

      // 搜索功能
      searchInput.addEventListener('input', () => {
        const term = searchInput.value.toLowerCase().trim();
        const filtered = cats.filter(cat => 
          cat.name.toLowerCase().includes(term) ||
          cat.chineseName.toLowerCase().includes(term) ||
          cat.personality.toLowerCase().includes(term) ||
          cat.story.toLowerCase().includes(term)
        );
        displayCats(filtered);
      });
    })
    .catch(error => {
      console.error('加载 cats.json 失败:', error);
      gallery.innerHTML = '<p style="text-align:center;color:red;">載入貓咪資料失敗：' + error.message + '（请检查 cats.json 是否存在且格式正确）</p>';
    });

  function displayCats(catsList) {
    gallery.innerHTML = '';
    if (catsList.length === 0) {
      gallery.innerHTML = '<p style="text-align:center;grid-column:1/-1;">找不到符合的貓咪～试试其他关键字！</p>';
      return;
    }

    catsList.forEach(cat => {
      const card = document.createElement('div');
      card.className = 'cat-card';
      card.innerHTML = `
        <img src="${cat.image}" alt="${cat.name}" onerror="this.src='https://via.placeholder.com/300x220?text=猫咪照片'">
        <div class="cat-info">
          <h3>${cat.name} (${cat.chineseName})</h3>
          <p><strong>性别：</strong>${cat.gender}</p>
          <p><strong>年龄：</strong>${cat.age}</p>
          <p><strong>个性：</strong>${cat.personality}</p>
          <p><strong>小故事：</strong>${cat.story}</p>
        </div>
      `;
      gallery.appendChild(card);
    });
  }
});
