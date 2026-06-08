const username = 'PatrickRucareanGeorge';
const repoGrid = document.getElementById('repoGrid');
const statusText = document.getElementById('statusText');
const projectCount = document.getElementById('projectCount');
const searchInput = document.getElementById('searchInput');
const sortSelect = document.getElementById('sortSelect');
const loadMoreBtn = document.getElementById('loadMoreBtn');

const fallbackProjects = [
  {
    name: 'Portfolio-basic',
    description: 'Site personal HTML/CSS cu secțiuni despre mine, proiecte și contact.',
    html_url: 'https://github.com/PatrickRucareanGeorge/portfolio-basic',
    language: 'HTML',
    stargazers_count: 5,
    forks_count: 1,
    updated_at: '2026-05-15T12:00:00Z',
    fork: false,
  },
  {
    name: 'Music-player',
    description: 'Aplicație simplă de muzică cu interfață modernă și controale custom.',
    html_url: 'https://github.com/PatrickRucareanGeorge/music-player',
    language: 'JavaScript',
    stargazers_count: 8,
    forks_count: 2,
    updated_at: '2026-04-20T15:00:00Z',
    fork: false,
  },
  {
    name: 'Game-dashboard',
    description: 'Interfață dashboard pentru jocuri și statistici personale.',
    html_url: 'https://github.com/PatrickRucareanGeorge/game-dashboard',
    language: 'CSS',
    stargazers_count: 4,
    forks_count: 0,
    updated_at: '2026-03-28T09:00:00Z',
    fork: false,
  },
  {
    name: 'News-filters',
    description: 'Exemplu de pagină cu filtru de știri și căutare live.',
    html_url: 'https://github.com/PatrickRucareanGeorge/news-filters',
    language: 'JavaScript',
    stargazers_count: 6,
    forks_count: 1,
    updated_at: '2026-02-11T18:00:00Z',
    fork: false,
  },
  {
    name: 'Study-notes',
    description: 'Proiect cu notițe și definiții utile pentru programare.',
    html_url: 'https://github.com/PatrickRucareanGeorge/study-notes',
    language: 'HTML',
    stargazers_count: 3,
    forks_count: 0,
    updated_at: '2026-01-22T14:00:00Z',
    fork: false,
  },
];

let allRepos = [];
let filteredRepos = [];
let visibleCount = 6;
const pageSize = 6;

function showStatus(message) {
  statusText.textContent = message;
}

function renderRepos(repos) {
  repoGrid.innerHTML = '';
  const items = repos.slice(0, visibleCount);

  if (items.length === 0) {
    repoGrid.innerHTML = '<p>Nu am găsit proiecte care să se potrivească filtrului.</p>';
    loadMoreBtn.style.display = 'none';
    projectCount.textContent = '';
    return;
  }

  items.forEach(repo => {
    const card = document.createElement('article');
    card.className = 'repo-card';
    const description = repo.description || 'Fără descriere disponibilă.';
    const language = repo.language || 'N/A';

    card.innerHTML = `
      <div>
        <h3>${repo.name}</h3>
        <p>${description}</p>
      </div>
      <div class="repo-meta">
        <span>🟦 ${language}</span>
        <span>⭐ ${repo.stargazers_count}</span>
        <span>🍴 ${repo.forks_count}</span>
        <span>🕒 ${new Date(repo.updated_at).toLocaleDateString('ro-RO')}</span>
      </div>
      <a href="${repo.html_url}" target="_blank">Vezi pe GitHub</a>
    `;

    repoGrid.appendChild(card);
  });

  const total = repos.length;
  projectCount.textContent = `Afișate ${Math.min(visibleCount, total)} din ${total} proiecte`;

  loadMoreBtn.style.display = total > visibleCount ? 'inline-flex' : 'none';
}

function applyFilters() {
  const query = searchInput.value.trim().toLowerCase();
  const sortValue = sortSelect.value;

  filteredRepos = allRepos.filter(repo => {
    const text = `${repo.name} ${repo.description || ''} ${repo.language || ''}`.toLowerCase();
    return text.includes(query);
  });

  if (sortValue === 'stars') {
    filteredRepos.sort((a, b) => b.stargazers_count - a.stargazers_count);
  } else {
    filteredRepos.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
  }

  visibleCount = pageSize;
  renderRepos(filteredRepos);
}

function loadMore() {
  visibleCount += pageSize;
  renderRepos(filteredRepos);
}

async function fetchRepos() {
  showStatus('Se încarcă proiectele...');
  repoGrid.innerHTML = '';
  loadMoreBtn.style.display = 'none';

  const proxyUrl = `/api/repos?username=${username}`;
  const directUrl = `https://api.github.com/users/${username}/repos?per_page=100&type=owner&sort=pushed`;

  try {
    const response = await fetch(proxyUrl);
    if (!response.ok) {
      throw new Error(`Proxy API error: ${response.status}`);
    }

    const repos = await response.json();
    allRepos = repos.filter(repo => repo.fork === false);
    showStatus(`Date preluate prin proxy. ${allRepos.length} proiecte directe găsite.`);
  } catch (proxyError) {
    console.warn('Proxy unavailable:', proxyError);
    try {
      const response = await fetch(directUrl);
      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }
      const repos = await response.json();
      allRepos = repos.filter(repo => repo.fork === false);
      showStatus(`Date preluate direct din GitHub. ${allRepos.length} proiecte directe găsite.`);
    } catch (githubError) {
      console.error(githubError);
      showStatus('Ups! Nu am putut încărca proiectele. Afișez proiecte de rezervă.');
      allRepos = fallbackProjects;
    }
  }

  if (allRepos.length < 5) {
    showStatus('Afișez proiecte de rezervă deoarece sunt prea puține proiecte directe pe GitHub.');
    allRepos = fallbackProjects;
  }

  applyFilters();
}

searchInput.addEventListener('input', applyFilters);
sortSelect.addEventListener('change', applyFilters);
loadMoreBtn.addEventListener('click', loadMore);

fetchRepos();
