// mobile nav toggle
  var toggle = document.getElementById('navToggle');
  var navList = document.getElementById('navList');
  if (toggle) {
    toggle.addEventListener('click', function(){ navList.classList.toggle('open'); });
    navList.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){ navList.classList.remove('open'); });
    });
  }

  // scroll reveal
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting) { entry.target.classList.add('in-view'); io.unobserve(entry.target); }
      });
    }, { threshold: 0.15 });
    reveals.forEach(function(el){ io.observe(el); });
  } else {
    reveals.forEach(function(el){ el.classList.add('in-view'); });
  }

  // typewriter role text
  var roles = ["Data Analyst", "Problem Solver", "Insight Seeker"];
  var el = document.getElementById('typedRole');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (el && !reduceMotion) {
    var ri = 0, ci = 0, deleting = false;
    function tick(){
      var word = roles[ri];
      if (!deleting) {
        ci++;
        el.textContent = word.slice(0, ci);
        if (ci === word.length) { deleting = true; setTimeout(tick, 1400); return; }
      } else {
        ci--;
        el.textContent = word.slice(0, ci);
        if (ci === 0) { deleting = false; ri = (ri + 1) % roles.length; }
      }
      setTimeout(tick, deleting ? 45 : 85);
    }
    tick();
  }

  // Copy phone
  var cp = document.getElementById('copyPhone');
  if (cp) cp.addEventListener('click', function () {
    var t = '+918081177892';
    try { navigator.clipboard.writeText(t).then(function(){ cp.textContent = 'Copied!'; }); }
    catch (err) {
      var ta = document.createElement('textarea'); ta.value = t; document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); cp.textContent = 'Copied!'; } catch (e2) {}
      document.body.removeChild(ta);
    }
  });

  // Copy email
  var ce = document.getElementById('copyEmail');
  if (ce) ce.addEventListener('click', function () {
    var t = 'ag6082885@gmail.com';
    try { navigator.clipboard.writeText(t).then(function(){ ce.textContent = 'Copied!'; }); }
    catch (err) {
      var ta = document.createElement('textarea'); ta.value = t; document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); ce.textContent = 'Copied!'; } catch (e2) {}
      document.body.removeChild(ta);
    }
  });

  // Contact form -> WhatsApp / SMS (with fallbacks)
  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    var OWNER = '918081177892';
    var fallback = document.getElementById('sendFallback');
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = document.getElementById('cf-name').value.trim();
      var phone = document.getElementById('cf-phone').value.trim();
      var email = document.getElementById('cf-email').value.trim();
      var address = document.getElementById('cf-address').value.trim();
      var message = document.getElementById('cf-message').value.trim();

      var lines = [
        'New message from my portfolio site:',
        'Name: ' + name,
        'Phone: ' + phone,
        'Email: ' + email
      ];
      if (address) lines.push('Address: ' + address);
      if (message) lines.push('Message: ' + message);
      var body = lines.join('\n');
      var enc = encodeURIComponent(body);

      var waUrl = 'https://api.whatsapp.com/send?phone=' + OWNER + '&text=' + enc;
      var smsUrl = 'sms:+' + OWNER + '?body=' + enc;

      document.getElementById('waLink').href = waUrl;
      document.getElementById('smsLink').href = smsUrl;
      document.getElementById('mailLink').href = 'https://mail.google.com/mail/?view=cm&fs=1&to=ag6082885@gmail.com&su=' + encodeURIComponent('Message from ' + name) + '&body=' + enc;
      fallback.hidden = false;

      var copyBtn = document.getElementById('copyMsg');
      copyBtn.onclick = function () {
        try {
          navigator.clipboard.writeText(body).then(function(){ copyBtn.textContent = 'Copied!'; });
        } catch (err) {
          var ta = document.createElement('textarea');
          ta.value = body; document.body.appendChild(ta); ta.select();
          try { document.execCommand('copy'); copyBtn.textContent = 'Copied!'; } catch (e2) {}
          document.body.removeChild(ta);
        }
      };

      // try to open WhatsApp directly via a real link click
      var a = document.createElement('a');
      a.href = waUrl; a.target = '_blank'; a.rel = 'noopener';
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
    });
  }
