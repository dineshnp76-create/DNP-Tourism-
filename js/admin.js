// Default Contact Data
const defaultContactData = {
    phone1: "+94 77 123 4567",
    phone2: "+94 11 987 6543",
    email1: "info@dnptourism.com",
    email2: "bookings@dnptourism.com",
    address: "Level 5, World Trade Center, Colombo 01, Sri Lanka"
};

// Default Social Links
const defaultSocialData = {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    twitter: "https://twitter.com",
    whatsapp: "https://wa.me/94771234567",
    linkedin: "https://linkedin.com"
};

// Default Dynamic Packages Array
const defaultPackages = [
    {
        id: "pkg_1", title: "Cultural Heritage Tour", duration: "7 Days", route: "Colombo • Sigiriya • Kandy • Nuwara Eliya",
        desc: "Discover the ancient ruins, temples, and magnificent rock fortresses of Sri Lanka in absolute luxury. Perfect for history enthusiasts.",
        price: "From $850 / Person", img: "assets/images/hero_bg.png"
    },
    {
        id: "pkg_2", title: "Tropical Beach Escape", duration: "10 Days", route: "Bentota • Galle • Mirissa • Yala",
        desc: "Experience golden shores, whale watching, and luxury 5-star seaside resorts along the famous southern coast of Sri Lanka.",
        price: "From $1200 / Person", img: "assets/images/mirissa_beach.png"
    },
    {
        id: "pkg_3", title: "Wildlife Safari Adventure", duration: "5 Days", route: "Colombo • Yala • Udawalawe",
        desc: "Get close to nature with exclusive private jeep safaris. Spot the majestic Sri Lankan leopard and wild elephants in their natural habitat.",
        price: "From $650 / Person", img: "assets/images/yala_safari.png"
    },
    {
        id: "pkg_4", title: "Ultimate Island Explorer", duration: "14 Days", route: "All Major Destinations + Ella Train",
        desc: "The pinnacle of luxury travel. A comprehensive two-week journey covering the best scenery, culture, wildlife, and beaches.",
        price: "From $1800 / Person", img: "assets/images/ella_train.png"
    }
];

let currentPackages = [];

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('adminLoggedIn') === 'true') {
        showDashboard();
        loadContactData();
        loadSocialData();
        loadPackageData();
    }
});

function login() {
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;
    const err = document.getElementById('login-error');

    if (user === 'admin' && pass === 'admin123') {
        localStorage.setItem('adminLoggedIn', 'true');
        err.classList.add('hidden');
        showDashboard();
        loadContactData();
        loadSocialData();
        loadPackageData();
    } else {
        err.classList.remove('hidden');
    }
}

function logout() {
    localStorage.removeItem('adminLoggedIn');
    document.getElementById('dashboard-screen').classList.add('hidden');
    document.getElementById('login-screen').classList.remove('hidden');
}

function showDashboard() {
    document.getElementById('login-screen').classList.add('hidden');
    document.getElementById('dashboard-screen').classList.remove('hidden');
    switchTab('contact');
}

function switchTab(tabId) {
    document.getElementById('tab-contact').classList.add('hidden');
    document.getElementById('tab-packages').classList.add('hidden');
    document.getElementById('tab-' + tabId).classList.remove('hidden');

    document.getElementById('nav-contact').classList.remove('bg-gold');
    document.getElementById('nav-packages').classList.remove('bg-gold');
    document.getElementById('nav-' + tabId).classList.add('bg-gold');
}

function loadContactData() {
    let rawData = localStorage.getItem('dnpContactData');
    let data = rawData ? JSON.parse(rawData) : defaultContactData;
    document.getElementById('phone1').value = data.phone1;
    document.getElementById('phone2').value = data.phone2;
    document.getElementById('email1').value = data.email1;
    document.getElementById('email2').value = data.email2;
    document.getElementById('address').value = data.address.replace(/<br>/g, "\n");
    if (document.getElementById('announcement')) document.getElementById('announcement').value = data.announcement || "";
}

function loadSocialData() {
    let rawData = localStorage.getItem('dnpSocialData');
    let data = rawData ? JSON.parse(rawData) : defaultSocialData;
    if (document.getElementById('facebook')) document.getElementById('facebook').value = data.facebook || "";
    if (document.getElementById('instagram')) document.getElementById('instagram').value = data.instagram || "";
    if (document.getElementById('twitter')) document.getElementById('twitter').value = data.twitter || "";
    if (document.getElementById('whatsapp')) document.getElementById('whatsapp').value = data.whatsapp || "";
    if (document.getElementById('linkedin')) document.getElementById('linkedin').value = data.linkedin || "";
}

function loadPackageData() {
    let rawData = localStorage.getItem('dnpPackageList');
    if (rawData) {
        currentPackages = JSON.parse(rawData);
    } else {
        // Fallback for migration from old system
        let oldData = localStorage.getItem('dnpPackageData');
        if (oldData) {
            let o = JSON.parse(oldData);
            currentPackages = [
                { id: "pkg_1", title: o.pkg1_title || "", duration: o.pkg1_duration || "", route: o.pkg1_route || "", desc: o.pkg1_desc || "", price: o.pkg1_price || "", img: "assets/images/hero_bg.png" },
                { id: "pkg_2", title: o.pkg2_title || "", duration: o.pkg2_duration || "", route: o.pkg2_route || "", desc: o.pkg2_desc || "", price: o.pkg2_price || "", img: "assets/images/mirissa_beach.png" },
                { id: "pkg_3", title: o.pkg3_title || "", duration: o.pkg3_duration || "", route: o.pkg3_route || "", desc: o.pkg3_desc || "", price: o.pkg3_price || "", img: "assets/images/yala_safari.png" },
                { id: "pkg_4", title: o.pkg4_title || "", duration: o.pkg4_duration || "", route: o.pkg4_route || "", desc: o.pkg4_desc || "", price: o.pkg4_price || "", img: "assets/images/ella_train.png" }
            ];
        } else {
            currentPackages = JSON.parse(JSON.stringify(defaultPackages));
        }
    }
    renderAdminPackages();
}

function renderAdminPackages() {
    const container = document.getElementById('packages-container');
    if (!container) return;
    container.innerHTML = '';

    currentPackages.forEach((pkg, index) => {
        const div = document.createElement('div');
        div.className = "glass-panel p-6 rounded-xl border border-gray-200 relative";
        div.innerHTML = `
            <button onclick="removePackage(${index})" class="absolute top-2 right-2 bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-red-700 transition" title="Delete Package"><i class="fa-solid fa-trash"></i></button>
            <h3 class="font-playfair text-xl font-bold bg-brandBlue text-white p-3 rounded-t-lg -mx-6 -mt-6 mb-4">Package: ${pkg.title || 'New Package'}</h3>
            <div class="space-y-4">
                <div><label class="text-xs font-bold text-gray-500 uppercase">Title</label><input type="text" id="pkg_${index}_title" value="${pkg.title}" class="w-full px-3 py-2 border rounded"></div>
                <div><label class="text-xs font-bold text-gray-500 uppercase">Duration</label><input type="text" id="pkg_${index}_duration" value="${pkg.duration}" class="w-full px-3 py-2 border rounded"></div>
                <div><label class="text-xs font-bold text-gray-500 uppercase">Route</label><input type="text" id="pkg_${index}_route" value="${pkg.route}" class="w-full px-3 py-2 border rounded"></div>
                <div><label class="text-xs font-bold text-gray-500 uppercase">Price Text</label><input type="text" id="pkg_${index}_price" value="${pkg.price}" class="w-full px-3 py-2 border rounded"></div>
                <div><label class="text-xs font-bold text-gray-500 uppercase">Image URL (e.g. assets/images/hero_bg.png)</label><input type="text" id="pkg_${index}_img" value="${pkg.img}" class="w-full px-3 py-2 border rounded"></div>
                <div><label class="text-xs font-bold text-gray-500 uppercase">Description</label><textarea id="pkg_${index}_desc" rows="3" class="w-full px-3 py-2 border rounded">${pkg.desc}</textarea></div>
            </div>
        `;
        container.appendChild(div);
    });
}

function addNewPackage() {
    currentPackages.push({
        id: "pkg_" + Date.now(),
        title: "New Custom Package",
        duration: "3 Days",
        route: "Route Details...",
        desc: "Description here...",
        price: "From $500",
        img: "assets/images/hero_bg.png"
    });
    renderAdminPackages();
}

function removePackage(index) {
    if (confirm("Are you sure you want to delete this package?")) {
        currentPackages.splice(index, 1);
        renderAdminPackages();
    }
}

function showSaveStatus() {
    const status = document.getElementById('save-status');
    status.classList.remove('hidden');
    setTimeout(() => { status.classList.add('hidden'); }, 3000);
}

function saveContactDetails() {
    const data = {
        phone1: document.getElementById('phone1').value,
        phone2: document.getElementById('phone2').value,
        email1: document.getElementById('email1').value,
        email2: document.getElementById('email2').value,
        announcement: document.getElementById('announcement') ? document.getElementById('announcement').value : "",
        address: document.getElementById('address').value.replace(/\n/g, "<br>")
    };
    localStorage.setItem('dnpContactData', JSON.stringify(data));
    showSaveStatus();
}

function saveSocialDetails() {
    const data = {
        facebook: document.getElementById('facebook').value,
        instagram: document.getElementById('instagram').value,
        twitter: document.getElementById('twitter').value,
        whatsapp: document.getElementById('whatsapp').value,
        linkedin: document.getElementById('linkedin').value
    };
    localStorage.setItem('dnpSocialData', JSON.stringify(data));
    showSaveStatus();
}

function savePackageDetails() {
    // Gather dynamic inputs back into the array
    currentPackages.forEach((pkg, index) => {
        pkg.title = document.getElementById(`pkg_${index}_title`).value;
        pkg.duration = document.getElementById(`pkg_${index}_duration`).value;
        pkg.route = document.getElementById(`pkg_${index}_route`).value;
        pkg.price = document.getElementById(`pkg_${index}_price`).value;
        pkg.img = document.getElementById(`pkg_${index}_img`).value;
        pkg.desc = document.getElementById(`pkg_${index}_desc`).value;
    });
    localStorage.setItem('dnpPackageList', JSON.stringify(currentPackages));
    showSaveStatus();
}
