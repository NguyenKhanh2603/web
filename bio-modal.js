// Bio Modal Functionality

// Sample data for people - you can replace this with dynamic data
const peopleData = {
  'quan-thanh-tho': {
    name: 'Quan Thanh Tho',
    nameVN: '(Quản Thành Thơ)',
    title: 'ASSOC. PROF.',
    image: '../assets/Tho.jpg',
    about: {
      admission: '-',
      graduation: '-',
      email: 'quan.thanh.tho@hcmut.edu.vn',
      interests: ['Artificial Intelligence', 'Natural Language Processing', 'Intelligent Systems', 'Formal Methods'],
      topic: 'AI and NLP Research'
    },
    papers: [
      'Publication 1: Advanced NLP Methods',
      'Publication 2: AI Systems Architecture',
      'Publication 3: Formal Logic in AI'
    ],
    support: [
      { name: 'Team Member 1', role: 'Research Associate', contact: 'member1@hcmut.edu.vn' },
      { name: 'Team Member 2', role: 'Research Associate', contact: 'member2@hcmut.edu.vn' }
    ]
  },
  'dung-cam-quang': {
    name: 'Dung Cam Quang',
    nameVN: '(Dung Cẩm Quang)',
    title: 'PhD Student',
    image: '../assets/PHD/Quang.jpg',
    about: {
      admission: '2025',
      graduation: '-',
      email: 'quang.dungcse@hcmut.edu.vn',
      interests: ['Machine Learning', 'Large Language Model', 'Graph Neural Networks'],
      topic: 'Event Extraction in Vietnamese Corpus'
    },
    papers: [
      '[1] Author et al. "Paper Title 1" Conference 2025',
      '[2] Author et al. "Paper Title 2" Conference 2024'
    ],
    support: [
      { name: 'Vo Quang Vinh', role: 'PhD Student', contact: 'voquangvinh@gmail.com' },
      { name: 'Cao Nguyen Thien Hoang', role: 'PhD Student at MBZUAI', contact: '' },
      { name: 'Truong Van Khang', role: 'PhD Student at RMIT', contact: '' }
    ]
  }
};

const modal = document.getElementById('bioModal');
const modalOverlay = document.querySelector('.bio-modal__overlay');
const closeBtn = document.querySelector('.bio-modal__close');
const tabButtons = document.querySelectorAll('.bio-tabs__btn');
const tabPanes = document.querySelectorAll('.bio-tabs__pane');

// Open modal
function openBioModal(personId) {
  const person = peopleData[personId];
  if (!person) return;

  // Populate modal with person data
  document.getElementById('bioName').textContent = person.name;
  document.getElementById('bioNameVN').textContent = person.nameVN;
  document.getElementById('bioTitle').textContent = person.title;
  document.getElementById('bioImage').src = person.image;
  document.getElementById('bioImage').alt = person.name;

  // Populate About tab
  const aboutContent = `
    <div class="bio-detail-row">
      <span class="bio-detail-label">Year of Admission</span>
      <span>${person.about.admission}</span>
    </div>
    <div class="bio-detail-row">
      <span class="bio-detail-label">Year of Graduation</span>
      <span>${person.about.graduation}</span>
    </div>
    <div class="bio-detail-row">
      <span class="bio-detail-label">Email</span>
      <a href="mailto:${person.about.email}">${person.about.email}</a>
    </div>
    <div class="bio-detail-row">
      <span class="bio-detail-label">Research Interest</span>
      <div class="bio-interests">
        ${person.about.interests.map(i => `<div>${i}</div>`).join('')}
      </div>
    </div>
    <div class="bio-detail-row">
      <span class="bio-detail-label">Specific Research Topic</span>
      <span>${person.about.topic}</span>
    </div>
  `;
  document.getElementById('bioAbout').innerHTML = aboutContent;

  // Populate Paper tab
  const paperContent = person.papers.map(p => `<p>${p}</p>`).join('');
  document.getElementById('bioPaper').innerHTML = paperContent;

  // Populate Support Members tab
  const supportContent = `
    <div class="bio-members-grid">
      ${person.support.map(member => `
        <div class="bio-member-card">
          <div class="bio-member-avatar"></div>
          <h3>${member.name}</h3>
          <p class="bio-member-role">${member.role}</p>
          ${member.contact ? `<p class="bio-member-contact">${member.contact}</p>` : ''}
        </div>
      `).join('')}
    </div>
  `;
  document.getElementById('bioSupport').innerHTML = supportContent;

  // Reset to About tab
  tabButtons.forEach(btn => btn.classList.remove('active'));
  tabPanes.forEach(pane => pane.classList.remove('active'));
  tabButtons[0].classList.add('active');
  tabPanes[0].classList.add('active');

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// Close modal
function closeBioModal() {
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

// Tab switching
tabButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    const tabName = e.target.dataset.tab;
    
    tabButtons.forEach(b => b.classList.remove('active'));
    tabPanes.forEach(p => p.classList.remove('active'));
    
    e.target.classList.add('active');
    const tabId = tabName.charAt(0).toUpperCase() + tabName.slice(1) + 'Tab';
    document.getElementById(tabId).classList.add('active');
  });
});

// Close modal events
closeBtn.addEventListener('click', closeBioModal);
modalOverlay.addEventListener('click', closeBioModal);

// Prevent closing when clicking inside modal content
document.querySelector('.bio-modal__content').addEventListener('click', (e) => {
  e.stopPropagation();
});

// Attach click handlers to all "Read Bio" buttons
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.link a[href="#"]').forEach((link, index) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Determine which person was clicked based on nearby card content
      const card = link.closest('.card') || link.closest('.founder');
      if (!card) return;

      const nameEl = card.querySelector('.name');
      if (!nameEl) return;

      const name = nameEl.textContent.toLowerCase().replace(/\s+/g, '-');
      openBioModal(name);
    });
  });
});

// Close with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('active')) {
    closeBioModal();
  }
});
