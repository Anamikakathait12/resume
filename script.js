
/* ==========================================================
   Anamika Kathait - Portfolio interactions
   ========================================================== */
 
var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
 
/* ---------- Tabs (Skills / Education) ---------- */
var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");
 
function opentab(tabname, btn) {
    for (var i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active-link");
        tablinks[i].setAttribute("aria-selected", "false");
    }
    for (var j = 0; j < tabcontents.length; j++) {
        tabcontents[j].classList.remove("skill-tab");
    }
    btn.classList.add("active-link");
    btn.setAttribute("aria-selected", "true");
    document.getElementById(tabname).classList.add("skill-tab");
}
 
/* ---------- Mobile side menu ---------- */
var sidemenu = document.getElementById("sidemenu");
 
function openmenu() {
    sidemenu.style.right = "0";
}
function closemenu() {
    sidemenu.style.right = "-240px";
}
 
// close the menu after tapping a link, or with Escape
document.querySelectorAll(".nav-link").forEach(function (link) {
    link.addEventListener("click", closemenu);
});
document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closemenu();
});
 
/* ---------- Scroll: progress bar, sticky glass nav, back-to-top ---------- */
var progress = document.getElementById("progress");
var topnav = document.getElementById("topnav");
var toTop = document.getElementById("toTop");
 
function onScroll() {
    var scrollTop = window.scrollY || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = (height > 0 ? (scrollTop / height) * 100 : 0) + "%";
    topnav.classList.toggle("scrolled", scrollTop > 40);
    toTop.classList.toggle("show", scrollTop > 600);
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();
 
toTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
});
 
/* ---------- Highlight the nav link of the section in view ---------- */
var sections = ["header", "about", "projects", "achieve", "connect"]
    .map(function (id) { return document.getElementById(id); });
 
var spy = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            document.querySelectorAll(".nav-link").forEach(function (link) {
                link.classList.toggle("active", link.getAttribute("href") === "#" + entry.target.id);
            });
        }
    });
}, { rootMargin: "-45% 0px -50% 0px" });
sections.forEach(function (s) { if (s) spy.observe(s); });
 
/* ---------- Typing effect in the hero ---------- */
var typedEl = document.getElementById("typed");
var phrases = [
    "Flask backends.",
    "React interfaces.",
    "PostgreSQL-powered apps.",
    "tools that solve real problems."
];
 
(function typeLoop() {
    if (prefersReducedMotion) {
        typedEl.textContent = phrases[0];
        return;
    }
    var p = 0, c = 0, deleting = false;
 
    function tick() {
        var word = phrases[p];
        typedEl.textContent = word.substring(0, c);
 
        var delay = deleting ? 35 : 75;
        if (!deleting && c === word.length) {
            delay = 1600;
            deleting = true;
        } else if (deleting && c === 0) {
            deleting = false;
            p = (p + 1) % phrases.length;
            delay = 400;
        }
        c += deleting ? -1 : 1;
        setTimeout(tick, delay);
    }
    setTimeout(tick, 1100);
})();
 
/* ---------- Count-up numbers in About ---------- */
function runCounter(el) {
    var target = parseFloat(el.dataset.count);
    var decimals = parseInt(el.dataset.decimals || "0", 10);
    var prefix = el.dataset.prefix || "";
    if (prefersReducedMotion) {
        el.textContent = prefix + target.toFixed(decimals);
        return;
    }
    var duration = 1400;
    var start = null;
 
    function step(ts) {
        if (!start) start = ts;
        var t = Math.min((ts - start) / duration, 1);
        var eased = 1 - Math.pow(1 - t, 3);
        el.textContent = prefix + (target * eased).toFixed(decimals);
        if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
}
 
var counterObserver = new IntersectionObserver(function (entries, obs) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            runCounter(entry.target);
            obs.unobserve(entry.target);
        }
    });
}, { threshold: 0.6 });
document.querySelectorAll("[data-count]").forEach(function (el) { counterObserver.observe(el); });
 
/* ---------- Glow that follows the cursor on project cards ---------- */
document.querySelectorAll(".project-card").forEach(function (card) {
    card.addEventListener("mousemove", function (e) {
        var rect = card.getBoundingClientRect();
        card.style.setProperty("--mx", (e.clientX - rect.left) + "px");
        card.style.setProperty("--my", (e.clientY - rect.top) + "px");
    });
});
 
/* ---------- Toast + copy email ---------- */
var toast = document.getElementById("toast");
var toastTimer;
 
function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove("show"); }, 2200);
}
 
document.getElementById("copyEmail").addEventListener("click", function () {
    var email = "anamikakathait3@gmail.com";
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(
            function () { showToast("Email address copied"); },
            function () { showToast("Could not copy. Select the address instead."); }
        );
    } else {
        showToast("Could not copy. Select the address instead.");
    }
});
 
/* ---------- Contact form: opens the visitor's email app ---------- */
document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();
    var name = document.getElementById("cname").value.trim();
    var from = document.getElementById("cemail").value.trim();
    var msg = document.getElementById("cmsg").value.trim();
 
    var subject = encodeURIComponent("Portfolio message from " + name);
    var body = encodeURIComponent(msg + "\n\nFrom: " + name + " (" + from + ")");
    window.location.href = "mailto:anamikakathait3@gmail.com?subject=" + subject + "&body=" + body;
    showToast("Opening your email app");
});
 
/* ---------- Footer year ---------- */
document.getElementById("year").textContent = new Date().getFullYear();
 
