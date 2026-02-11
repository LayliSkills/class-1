const courses = [
  {id: 'js-basics', title: 'JavaScript Basics', desc: 'Beginner friendly JavaScript course', img: 'https://picsum.photos/seed/js/400/200'},
  {id: 'html-css', title: 'HTML & CSS', desc: 'Build modern web pages', img: 'https://picsum.photos/seed/html/400/200'},
  {id: 'python', title: 'Python for Everyone', desc: 'Intro to Python programming', img: 'https://picsum.photos/seed/py/400/200'}
];

function renderCourses(){
  const container = document.getElementById('coursesList');
  container.innerHTML = '';
  const enrolled = getEnrolled();
  courses.forEach(c => {
    const col = document.createElement('div');
    col.className = 'col-md-4 mb-4';
    col.innerHTML = `
      <div class="card position-relative">
        <img src="${c.img}" class="card-img-top" alt="${c.title}">
        <div class="card-body">
          <h5 class="card-title">${c.title}</h5>
          <p class="card-text">${c.desc}</p>
          <div class="d-flex justify-content-between align-items-center">
            <a href="course.html?id=${c.id}" class="btn btn-outline-primary btn-sm">View</a>
            <button data-id="${c.id}" class="btn btn-primary btn-sm enroll-btn">${enrolled.includes(c.id)?'Enrolled':'Enroll'}</button>
          </div>
        </div>
      </div>
    `;
    if(enrolled.includes(c.id)){
      const badge = document.createElement('span');
      badge.className = 'badge bg-success enrolled-badge';
      badge.textContent = 'Enrolled';
      col.firstElementChild.appendChild(badge);
    }
    container.appendChild(col);
  });
  attachEnrollHandlers();
}

function attachEnrollHandlers(){
  document.querySelectorAll('.enroll-btn').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const id = btn.getAttribute('data-id');
      enrollCourse(id);
    });
  });
}

function getEnrolled(){
  try{ return JSON.parse(localStorage.getItem('enrolled')||'[]') }catch(e){return []}
}

function enrollCourse(id){
  const list = getEnrolled();
  if(!list.includes(id)) list.push(id);
  localStorage.setItem('enrolled', JSON.stringify(list));
  const course = courses.find(c=>c.id===id);
  const modalEl = document.getElementById('enrollModal');
  const body = document.getElementById('enrollBody');
  const openCourse = document.getElementById('openCourse');
  body.textContent = `You are enrolled in "${course.title}".`;
  openCourse.href = `course.html?id=${id}`;
  const modal = new bootstrap.Modal(modalEl);
  modal.show();
  renderCourses();
}

// Initialize
document.addEventListener('DOMContentLoaded', ()=>{
  renderCourses();
});
