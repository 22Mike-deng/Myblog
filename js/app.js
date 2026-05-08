const state = {
  articles: [],
  currentArticle: null,
  activeTag: null,
  activeRatio: null,
  activeCategory: null,
  searchQuery: '',
  cache: {}
};

async function init() {
  await loadArticles();
  renderCategoryFilter();
  renderTagCloud();
  renderArticles();
  updateStats();
  setupEventListeners();
}

async function loadArticles() {
  try {
    // 获取当前页面文件名（兼容各种路径格式，包括服务器自动去掉.html后缀的情况）
    const pathname = window.location.pathname;
    const pageName = pathname.split('/').pop().split('?')[0] || '';
    
    // 兼容服务器自动去掉 .html 后缀的情况
    const isAigcPage = pageName === 'aigc' || pageName === 'aigc.html' || pathname.includes('/aigc');
    const isBookmarksPage = pageName === 'bookmarks' || pageName === 'bookmarks.html' || pathname.includes('/bookmarks');
    
    // 计算基础路径（处理子目录部署情况）
    const basePath = pathname.substring(0, pathname.lastIndexOf('/') + 1);
    
    let url = basePath + 'data/index.json';
    let dataKey = 'articles';
    
    if (isAigcPage) {
      url = basePath + 'data/aigc.json';
      dataKey = 'items';
    } else if (isBookmarksPage) {
      url = basePath + 'data/bookmarks.json';
      dataKey = 'items';
    }
    
    console.log('Loading data from:', url, 'Page:', pageName, 'isAigc:', isAigcPage, 'isBookmarks:', isBookmarksPage);
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const items = data[dataKey] || [];
    
    state.articles = items.sort((a, b) => new Date(b.date) - new Date(a.date));
    console.log('Loaded', state.articles.length, 'items from', url);
  } catch (error) {
    console.error('加载文章失败:', error);
    state.articles = [];
  }
}

async function loadArticleDetail(id) {
  if (state.cache[id]) {
    return state.cache[id];
  }
  try {
    const response = await fetch(`data/articles/${id}.json`);
    const data = await response.json();
    state.cache[id] = data;
    return data;
  } catch (error) {
    console.error('加载文章详情失败:', error);
    return null;
  }
}

function getAllTags() {
  const tagCounts = {};
  state.articles.forEach(article => {
    article.tags.forEach(tag => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });
  return Object.entries(tagCounts).sort((a, b) => b[1] - a[1]);
}

function getFilteredArticles() {
  let articles = state.articles;

  if (state.activeCategory) {
    articles = articles.filter(article => article.category === state.activeCategory);
  }

  if (state.activeRatio) {
    articles = articles.filter(article => article.aspectRatio === state.activeRatio);
  }

  if (state.activeTag) {
    articles = articles.filter(article => article.tags.includes(state.activeTag));
  }

  if (state.searchQuery) {
    const query = state.searchQuery.toLowerCase();
    articles = articles.filter(article =>
      article.title.toLowerCase().includes(query) ||
      (article.summary && article.summary.toLowerCase().includes(query)) ||
      (article.description && article.description.toLowerCase().includes(query)) ||
      article.tags.some(tag => tag.toLowerCase().includes(query))
    );
  }

  return articles;
}

function renderTagCloud() {
  const container = document.getElementById('tagCloud');
  const tags = getAllTags();

  const allBtn = document.createElement('button');
  allBtn.className = `tag-cloud-item ${!state.activeTag ? 'active' : ''}`;
  allBtn.innerHTML = `<span class="tag-name">全部</span><span class="tag-count">${state.articles.length}</span>`;
  allBtn.addEventListener('click', () => filterByTag(null));
  container.appendChild(allBtn);

  tags.forEach(([tag, count]) => {
    const btn = document.createElement('button');
    btn.className = `tag-cloud-item ${state.activeTag === tag ? 'active' : ''}`;
    btn.innerHTML = `<span class="tag-name">${tag}</span><span class="tag-count">${count}</span>`;
    btn.addEventListener('click', () => filterByTag(tag));
    container.appendChild(btn);
  });
}

function getAllCategories() {
  const categoryCounts = {};
  state.articles.forEach(article => {
    if (article.category) {
      categoryCounts[article.category] = (categoryCounts[article.category] || 0) + 1;
    }
  });
  return Object.entries(categoryCounts).sort((a, b) => b[1] - a[1]);
}

function renderCategoryFilter() {
  const container = document.getElementById('categoryFilter');
  if (!container) return;

  const categories = getAllCategories();

  const allBtn = document.createElement('button');
  allBtn.className = `category-filter-item ${!state.activeCategory ? 'active' : ''}`;
  allBtn.dataset.category = 'all';
  allBtn.innerHTML = `<span class="category-name">全部</span><span class="category-count">${state.articles.length}</span>`;
  container.appendChild(allBtn);

  categories.forEach(([category, count]) => {
    const btn = document.createElement('button');
    btn.className = `category-filter-item ${state.activeCategory === category ? 'active' : ''}`;
    btn.dataset.category = category;
    btn.innerHTML = `<span class="category-name">${category}</span><span class="category-count">${count}</span>`;
    container.appendChild(btn);
  });
}

function filterByCategory(category) {
  state.activeCategory = category === 'all' ? null : category;

  document.querySelectorAll('.category-filter-item').forEach(btn => {
    const catName = btn.dataset.category;
    btn.classList.toggle('active', catName === (category || 'all'));
  });

  updateContentTitle();
  renderArticles();
}

function filterByTag(tag) {
  state.activeTag = tag;

  document.querySelectorAll('.tag-cloud-item').forEach(btn => {
    const tagName = btn.querySelector('.tag-name').textContent;
    btn.classList.toggle('active', tagName === (tag || '全部'));
  });

  updateContentTitle();
  renderArticles();
}

function filterByRatio(ratio) {
  state.activeRatio = ratio === 'all' ? null : ratio;

  document.querySelectorAll('.ratio-filter-item').forEach(btn => {
    const ratioName = btn.dataset.ratio;
    btn.classList.toggle('active', ratioName === (ratio || 'all'));
  });

  updateContentTitle();
  renderArticles();
}

function updateContentTitle() {
  const titleEl = document.getElementById('contentTitle');
  const isAigcPage = window.location.pathname.includes('aigc.html');
  const isBookmarksPage = window.location.pathname.includes('bookmarks.html');

  const filters = [];
  if (state.activeCategory) filters.push(`分类：${state.activeCategory}`);
  if (state.activeRatio) filters.push(`比例：${state.activeRatio}`);
  if (state.activeTag) filters.push(`标签：${state.activeTag}`);
  if (state.searchQuery) filters.push(`搜索：${state.searchQuery}`);

  if (filters.length > 0) {
    titleEl.textContent = filters.join(' + ');
  } else if (isAigcPage) {
    titleEl.textContent = '全部内容';
  } else if (isBookmarksPage) {
    titleEl.textContent = '全部书签';
  } else {
    titleEl.textContent = '全部文章';
  }
}

function searchArticles(query) {
  state.searchQuery = query;
  updateContentTitle();
  renderArticles();
}

function renderArticles() {
  const container = document.getElementById('articlesList');
  const articles = getFilteredArticles();
  const countEl = document.getElementById('contentCount');
  const isAigcPage = window.location.pathname.includes('aigc.html');
  const isBookmarksPage = window.location.pathname.includes('bookmarks.html');

  let countUnit = '篇';
  if (isAigcPage) countUnit = '条';
  if (isBookmarksPage) countUnit = '个';

  countEl.textContent = `${articles.length} ${countUnit}`;
  container.innerHTML = '';

  if (articles.length === 0) {
    container.innerHTML = `
      <div class="no-articles">
        <p>没有找到相关内容</p>
        <button class="reset-btn" onclick="resetFilters()">重置筛选</button>
      </div>
    `;
    return;
  }

  if (isAigcPage) {
    renderAigcCards(articles, container);
  } else if (isBookmarksPage) {
    renderBookmarkCards(articles, container);
  } else {
    renderArticleCards(articles, container);
  }
}

function renderArticleCards(articles, container) {
  articles.forEach((article, index) => {
    const card = document.createElement('article');
    card.className = 'article-item';
    card.style.animationDelay = `${index * 0.05}s`;

    card.innerHTML = `
      <div class="article-item-header">
        <time class="article-item-date">${article.date}</time>
        <div class="article-item-tags">
          ${article.tags.map(tag => `<span class="article-item-tag">${tag}</span>`).join('')}
        </div>
      </div>
      <h3 class="article-item-title">${article.title}</h3>
      <p class="article-item-summary">${article.summary}</p>
      <div class="article-item-footer">
        <span class="read-more">阅读全文 →</span>
      </div>
    `;

    card.addEventListener('click', () => openArticle(article.id));
    container.appendChild(card);
  });
}

function renderAigcCards(articles, container) {
  // 计算基础路径
  const pathname = window.location.pathname;
  const basePath = pathname.substring(0, pathname.lastIndexOf('/') + 1);
  
  articles.forEach((item, index) => {
    const card = document.createElement('div');
    card.className = 'aigc-card';
    card.style.animationDelay = `${index * 0.05}s`;

    const ratioClass = getAspectRatioClass(item.aspectRatio);
    // 处理图片路径，如果是相对路径则添加基础路径
    const imagePath = item.image.startsWith('http') || item.image.startsWith('/') 
      ? item.image 
      : basePath + item.image;

    card.innerHTML = `
      <div class="aigc-card-image-wrapper ${ratioClass}">
        <img src="${imagePath}" alt="${item.title}" class="aigc-card-image"
          onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22><rect fill=%22%233d2b5e%22 width=%22400%22 height=%22300%22/><text fill=%22%23a89cc8%22 font-size=%2214%22 x=%2250%%22 y=%2250%%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22>图片加载失败</text></svg>'">
        <span class="aigc-card-ratio-badge">${item.aspectRatio}</span>
      </div>
      <div class="aigc-card-body">
        <div class="aigc-card-header">
          <span class="aigc-card-category">${item.category}</span>
          <time class="aigc-card-date">${item.date}</time>
        </div>
        <h3 class="aigc-card-title">${item.title}</h3>
        <div class="aigc-card-tags">
          ${item.tags.map(tag => `<span class="article-item-tag">${tag}</span>`).join('')}
        </div>
        <div class="aigc-card-prompt">
          <span class="aigc-card-prompt-label">提示词：</span>
          <span class="aigc-card-prompt-text">${escapeHtml(item.prompt)}</span>
        </div>
        <button class="aigc-copy-btn" data-prompt="${escapeHtml(item.prompt)}">
          复制提示词
        </button>
      </div>
    `;

    card.querySelector('.aigc-copy-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      copyPrompt(item.prompt, e.currentTarget);
    });

    container.appendChild(card);
  });
}

function getAspectRatioClass(ratio) {
  const map = {
    '3:4': 'ratio-3-4',
    '9:16': 'ratio-9-16',
    '1:1': 'ratio-1-1',
    '16:9': 'ratio-16-9'
  };
  return map[ratio] || 'ratio-16-9';
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

async function copyPrompt(text, btnEl) {
  try {
    await navigator.clipboard.writeText(text);
    const originalText = btnEl.textContent;
    btnEl.textContent = '已复制 ✓';
    btnEl.classList.add('copied');
    setTimeout(() => {
      btnEl.textContent = originalText;
      btnEl.classList.remove('copied');
    }, 2000);
  } catch (err) {
    btnEl.textContent = '复制失败';
    setTimeout(() => {
      btnEl.textContent = '复制提示词';
    }, 2000);
  }
}

function renderBookmarkCards(bookmarks, container) {
  bookmarks.forEach((item, index) => {
    const card = document.createElement('a');
    card.className = 'bookmark-card';
    card.href = item.url;
    card.target = '_blank';
    card.rel = 'noopener noreferrer';
    card.style.animationDelay = `${index * 0.05}s`;

    const iconHtml = item.icon
      ? `<img src="${item.icon}" alt="" class="bookmark-icon" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">`
      : '';

    card.innerHTML = `
      <div class="bookmark-card-header">
        <div class="bookmark-icon-wrapper">
          ${iconHtml}
          <div class="bookmark-icon-fallback" style="${item.icon ? 'display:none' : ''}">${item.title.charAt(0).toUpperCase()}</div>
        </div>
        <div class="bookmark-info">
          <h3 class="bookmark-title">${escapeHtml(item.title)}</h3>
          <span class="bookmark-category">${item.category}</span>
        </div>
      </div>
      <p class="bookmark-description">${escapeHtml(item.description)}</p>
      <div class="bookmark-footer">
        <div class="bookmark-tags">
          ${item.tags.map(tag => `<span class="bookmark-tag">${tag}</span>`).join('')}
        </div>
        <span class="bookmark-date">${item.date}</span>
      </div>
    `;

    container.appendChild(card);
  });
}

function updateStats() {
  document.getElementById('articleCount').textContent = state.articles.length;
  const tagCountEl = document.getElementById('tagCount');
  if (tagCountEl) {
    tagCountEl.textContent = getAllTags().length;
  }
}

function resetFilters() {
  state.activeTag = null;
  state.activeRatio = null;
  state.activeCategory = null;
  state.searchQuery = '';
  document.getElementById('searchInput').value = '';

  document.querySelectorAll('.tag-cloud-item').forEach(btn => {
    const tagName = btn.querySelector('.tag-name').textContent;
    btn.classList.toggle('active', tagName === '全部');
  });

  document.querySelectorAll('.ratio-filter-item').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.ratio === 'all');
  });

  document.querySelectorAll('.category-filter-item').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.category === 'all');
  });

  updateContentTitle();
  renderArticles();
}

async function openArticle(id) {
  const article = await loadArticleDetail(id);
  if (!article) return;

  state.currentArticle = article;
  const detail = document.getElementById('articleDetail');
  const body = document.getElementById('detailBody');

  body.innerHTML = `
    <div class="detail-header">
      <h1 class="detail-title">${article.title}</h1>
      <div class="detail-meta">
        <time>${article.date}</time>
        <div class="article-tags">
          ${article.tags.map(tag => `<span class="article-tag">${tag}</span>`).join('')}
        </div>
      </div>
    </div>
    ${article.content}
  `;

  detail.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeArticle() {
  const detail = document.getElementById('articleDetail');
  detail.classList.remove('active');
  document.body.style.overflow = '';
  state.currentArticle = null;
}

function setupEventListeners() {
  const closeDetailBtn = document.getElementById('closeDetail');
  if (closeDetailBtn) {
    closeDetailBtn.addEventListener('click', closeArticle);
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeArticle();
    }
  });

  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.getElementById('searchBtn');

  searchInput.addEventListener('input', (e) => {
    searchArticles(e.target.value);
  });

  searchBtn.addEventListener('click', () => {
    searchArticles(searchInput.value);
  });

  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      searchArticles(searchInput.value);
    }
  });

  // 分类筛选按钮事件
  const categoryFilter = document.getElementById('categoryFilter');
  if (categoryFilter) {
    categoryFilter.addEventListener('click', (e) => {
      const btn = e.target.closest('.category-filter-item');
      if (btn) {
        filterByCategory(btn.dataset.category);
      }
    });
  }

  // 比例筛选按钮事件
  const ratioFilter = document.getElementById('ratioFilter');
  if (ratioFilter) {
    ratioFilter.addEventListener('click', (e) => {
      const btn = e.target.closest('.ratio-filter-item');
      if (btn) {
        filterByRatio(btn.dataset.ratio);
      }
    });
  }

  // 文章详情内的筛选按钮事件委托
  document.getElementById('detailBody').addEventListener('click', (e) => {
    if (e.target.classList.contains('filter-btn')) {
      const category = e.target.dataset.category;
      filterArticleCards(category);
    }
  });
}

// 文章详情内的分类筛选功能
function filterArticleCards(category) {
  // Update active button
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.category === category) {
      btn.classList.add('active');
    }
  });
  
  // Show/hide categories
  document.querySelectorAll('.category-section').forEach(section => {
    if (category === 'all' || section.dataset.category === category) {
      section.style.display = 'block';
    } else {
      section.style.display = 'none';
    }
  });
}

// 角色资料弹窗功能
function openProfileModal() {
  const modal = document.getElementById('profileModal');
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeProfileModal() {
  const modal = document.getElementById('profileModal');
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

// 在 init 函数后添加头像点击事件
function initProfileModal() {
  const avatarContainer = document.getElementById('avatarContainer');
  const profileCloseBtn = document.getElementById('profileCloseBtn');
  const profileModal = document.getElementById('profileModal');
  
  if (avatarContainer) {
    avatarContainer.addEventListener('click', openProfileModal);
  }
  
  if (profileCloseBtn) {
    profileCloseBtn.addEventListener('click', closeProfileModal);
  }
  
  // 点击弹窗外部关闭
  if (profileModal) {
    profileModal.addEventListener('click', (e) => {
      if (e.target === profileModal) {
        closeProfileModal();
      }
    });
  }
  
  // ESC 键关闭弹窗
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeProfileModal();
    }
  });
}

// 修改 init 函数，添加头像点击事件
const originalInit = init;
init = function() {
  originalInit();
  initProfileModal();
};

document.addEventListener('DOMContentLoaded', init);
