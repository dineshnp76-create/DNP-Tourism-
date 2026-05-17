document.addEventListener('DOMContentLoaded', () => {
    const updateClass = (className, newValue) => {
        const elements = document.querySelectorAll('.' + className);
        elements.forEach(el => {
            if (newValue) el.innerHTML = newValue;
        });
    };

    // Load Contact Data & Announcement (aria-live)
    const rawContact = localStorage.getItem('dnpContactData');
    if (rawContact) {
        const data = JSON.parse(rawContact);
        updateClass('dyn-phone1', data.phone1);
        updateClass('dyn-phone2', data.phone2);
        updateClass('dyn-email1', data.email1);
        updateClass('dyn-email2', data.email2);
        updateClass('dyn-address', data.address);

        if (data.announcement && data.announcement.trim() !== "") {
            const annBanner = document.createElement('div');
            annBanner.id = "live-announcement";
            annBanner.setAttribute("aria-live", "polite");
            annBanner.className = "bg-gold text-brandBlue py-2 px-4 text-sm font-bold uppercase tracking-widest fixed top-0 w-full z-[100] shadow-md overflow-hidden";
            annBanner.innerHTML = `<marquee scrollamount="8" class="w-full">${data.announcement}</marquee>`;
            document.body.insertBefore(annBanner, document.body.firstChild);

            // Ensure fixed navbars don't get covered by the top banner
            const navbar = document.getElementById('navbar');
            if (navbar) navbar.style.top = "36px";
        }
    }

    // Load Social Data
    const updateLink = (id, href) => {
        const els = document.querySelectorAll(id);
        els.forEach(el => { if (href) el.href = href; });
    };

    const rawSocial = localStorage.getItem('dnpSocialData');
    let waPhone = "94763971044";
    let waLink = `https://wa.me/${waPhone}?text=Hello! I would like to request a Tour Package.`;

    if (rawSocial) {
        const data = JSON.parse(rawSocial);
        updateLink('#link-facebook', data.facebook);
        updateLink('#link-instagram', data.instagram);
        updateLink('#link-twitter', data.twitter);
        updateLink('#link-whatsapp', data.whatsapp);
        updateLink('#link-linkedin', data.linkedin);
        waLink = data.whatsapp || waLink;
    } else {
        if (rawContact) waPhone = JSON.parse(rawContact).phone1.replace(/\D/g, '');
        waLink = `https://wa.me/${waPhone}?text=Hello! I would like to request a Tour Package.`;
    }

    // Create Global Floating WhatsApp Button if body exists
    if (document.body) {
        const waWidget = document.createElement('a');
        waWidget.href = waLink;
        waWidget.target = "_blank";
        waWidget.innerHTML = `<i class="fa-brands fa-whatsapp text-3xl"></i> <span class="hidden md:inline ml-2 font-bold uppercase tracking-wider text-sm">Request Tour via WhatsApp</span>`;
        waWidget.className = "fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl z-50 flex items-center justify-center transition-transform hover:scale-110";
        document.body.appendChild(waWidget);
    }

    // Load Dynamic Packages
    renderPackagesOnPages(waLink);
});

function renderPackagesOnPages(waLink) {
    const rawPackage = localStorage.getItem('dnpPackageList');
    let packagesArray = [];

    if (rawPackage) {
        packagesArray = JSON.parse(rawPackage);
    } else {
        // Fallback for old static storage
        const oldData = localStorage.getItem('dnpPackageData');
        if (oldData) {
            const o = JSON.parse(oldData);
            packagesArray = [
                { title: o.pkg1_title, duration: o.pkg1_duration, route: o.pkg1_route, desc: o.pkg1_desc, price: o.pkg1_price, img: "assets/images/hero_bg.png" },
                { title: o.pkg2_title, duration: o.pkg2_duration, route: o.pkg2_route, desc: o.pkg2_desc, price: o.pkg2_price, img: "assets/images/mirissa_beach.png" },
                { title: o.pkg3_title, duration: o.pkg3_duration, route: o.pkg3_route, desc: o.pkg3_desc, price: o.pkg3_price, img: "assets/images/yala_safari.png" },
                { title: o.pkg4_title, duration: o.pkg4_duration, route: o.pkg4_route, desc: o.pkg4_desc, price: o.pkg4_price, img: "assets/images/ella_train.png" }
            ];
        } else {
            packagesArray = [
                { title: "Cultural Heritage Tour", duration: "7 Days", route: "Colombo • Sigiriya • Kandy • Nuwara Eliya", desc: "Discover the ancient ruins, temples, and magnificent rock fortresses of Sri Lanka in absolute luxury. Perfect for history enthusiasts.", price: "From $850 / Person", img: "assets/images/hero_bg.png" },
                { title: "Tropical Beach Escape", duration: "10 Days", route: "Bentota • Galle • Mirissa • Yala", desc: "Experience golden shores, whale watching, and luxury 5-star seaside resorts along the famous southern coast of Sri Lanka.", price: "From $1200 / Person", img: "assets/images/mirissa_beach.png" },
                { title: "Wildlife Safari Adventure", duration: "5 Days", route: "Colombo • Yala • Udawalawe", desc: "Get close to nature with exclusive private jeep safaris. Spot the majestic Sri Lankan leopard and wild elephants in their natural habitat.", price: "From $650 / Person", img: "assets/images/yala_safari.png" },
                { title: "Ultimate Island Explorer", duration: "14 Days", route: "All Major Destinations + Ella Train", desc: "The pinnacle of luxury travel. A comprehensive two-week journey covering the best scenery, culture, wildlife, and beaches.", price: "From $1800 / Person", img: "assets/images/ella_train.png" }
            ];
        }
    }

    const pkgGrid = document.getElementById('dynamic-packages-grid');
    if (pkgGrid) {
        pkgGrid.innerHTML = '';
        packagesArray.forEach((pkg, i) => {
            let delay = (i % 2 === 0) ? "" : "data-aos-delay='100'";
            let htmlChunk = `
                <div class="bg-white rounded-2xl overflow-hidden shadow-xl flex flex-col md:flex-row group" data-aos="fade-up" ${delay}>
                    <div class="md:w-2/5 h-64 md:h-auto overflow-hidden relative img-hover">
                        <img src="${pkg.img}" class="w-full h-full object-cover">
                        <div class="absolute top-4 left-4 bg-brandBlue text-white text-xs font-bold px-3 py-1 rounded-full uppercase">${pkg.duration}</div>
                    </div>
                    <div class="md:w-3/5 p-8 flex flex-col justify-center">
                        <h3 class="font-playfair text-2xl font-bold text-brandBlue mb-2">${pkg.title}</h3>
                        <p class="text-gold font-semibold mb-4">${pkg.route}</p>
                        <p class="text-gray-600 text-sm mb-6 leading-relaxed">${pkg.desc}</p>
                        <div class="mt-auto flex justify-between items-center border-t pt-4">
                            <span class="text-xs text-gray-500 uppercase font-semibold">${pkg.price}</span>
                            <a href="${waLink}" target="_blank" class="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-full font-bold uppercase tracking-widest text-xs transition shadow-md"><i class="fa-brands fa-whatsapp text-lg align-middle mr-1"></i> Request via Whatsapp</a>
                        </div>
                    </div>
                </div>
            `;
            pkgGrid.innerHTML += htmlChunk;
        });
    }
}
