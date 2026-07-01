// مطعم زيتون — JS  
// =========================================================

//  فتح/إغلاق القائمة في الجوال 
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle) {
  navToggle.addEventListener('click', function () {
    navMenu.classList.toggle('open');
  });
}

//  تبديل تصنيفات القائمة (menu.html) 
const menuTabs = document.querySelectorAll('.menu-tab');
const menuCategories = document.querySelectorAll('.menu-category');

menuTabs.forEach(function (tab) {
  tab.addEventListener('click', function () {

    menuTabs.forEach(t => t.classList.remove('active'));
    menuCategories.forEach(c => c.classList.remove('active'));

    // تفعيل الزر والقسم المطلوبين
    tab.classList.add('active');
    const targetId = tab.getAttribute('data-target');
    document.getElementById(targetId).classList.add('active');
  });
});

//  التحقق من نموذج الحجز (reservation.html) 
const reservationForm = document.getElementById('reservation-form');

if (reservationForm) {

  // منع اختيار تاريخ في الماضي
  const dateInput = document.getElementById('res-date');
  const today = new Date().toISOString().split('T')[0];
  dateInput.setAttribute('min', today);

  reservationForm.addEventListener('submit', function (e) {
    e.preventDefault();

    let isValid = true;

    // الاسم
    const name = document.getElementById('res-name');
    const nameError = document.getElementById('name-error');
    if (name.value.trim().length < 2) {
      nameError.textContent = 'الرجاء إدخال الاسم كاملاً';
      isValid = false;
    } else {
      nameError.textContent = '';
    }

    // رقم الهاتف
    const phone = document.getElementById('res-phone');
    const phoneError = document.getElementById('phone-error');
    const phonePattern = /^[0-9\-\+\s]{8,15}$/;
    if (!phonePattern.test(phone.value.trim())) {
      phoneError.textContent = 'رقم الهاتف غير صحيح';
      isValid = false;
    } else {
      phoneError.textContent = '';
    }

    // التاريخ والوقت وعدد الضيوف (حقول required أساسًا، نتأكد أيضًا هنا)
    const date = document.getElementById('res-date');
    const dateError = document.getElementById('date-error');
    if (date.value === '') {
      dateError.textContent = 'الرجاء اختيار التاريخ';
      isValid = false;
    } else {
      dateError.textContent = '';
    }

    const guests = document.getElementById('res-guests');
    const guestsError = document.getElementById('guests-error');
    if (guests.value === '') {
      guestsError.textContent = 'الرجاء اختيار عدد الضيوف';
      isValid = false;
    } else {
      guestsError.textContent = '';
    }

    // إذا كل شيء صحيح، نعرض رسالة النجاح ونفرغ النموذج
    if (isValid) {
      document.getElementById('success-box').classList.add('show');
      reservationForm.reset();
    }
  });
}
