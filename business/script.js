document.addEventListener('DOMContentLoaded', () => {

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Form Handling
    const form = document.getElementById('orderForm');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const product = document.getElementById('product').value;
            const phone = document.getElementById('phone').value;
            const notes = document.getElementById('notes').value;

            // Save order to Local Storage (Client-side simple logging)
            saveOrder({
                id: Date.now(),
                date: new Date().toLocaleString(),
                name,
                product,
                phone,
                notes
            });

            // Create WhatsApp Link
            // Kontak WhatsApp: 087761571803
            const phoneNumber = '6287761571803';
            const message = `Halo AMIRA NET, saya ingin memesan:\n\n` +
                `Nama: ${name}\n` +
                `Produk: ${product}\n` +
                `Nomor HP: ${phone}\n` +
                `Catatan: ${notes ? notes : '-'}\n\n` +
                `Mohon diproses, terima kasih!`;

            const waUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

            // Redirect to WhatsApp
            window.open(waUrl, '_blank');

            // Allow form to reset
            form.reset();
        });
    }

});

function scrollToOrder(preselectedProduct) {
    const orderSection = document.getElementById('order');
    const select = document.getElementById('product');

    // Attempt to match the product in the dropdown
    for (let i = 0; i < select.options.length; i++) {
        if (select.options[i].text.includes(preselectedProduct) || select.options[i].value.includes(preselectedProduct)) {
            select.selectedIndex = i;
            break;
        }
    }

    orderSection.scrollIntoView({ behavior: 'smooth' });
}

function saveOrder(orderData) {
    let orders = JSON.parse(localStorage.getItem('amira_orders')) || [];
    orders.push(orderData);
    localStorage.setItem('amira_orders', JSON.stringify(orders));
}
