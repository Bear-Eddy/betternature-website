// BetterNature Landing Page Scripts

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('waitlist-form');
    const messageEl = document.getElementById('form-message');
    const submitBtn = form.querySelector('.submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        const email = form.email.value.trim();

        if (!email) {
            showMessage('Please enter your email address.', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showMessage('Please enter a valid email address.', 'error');
            return;
        }

        // Show loading state
        setLoading(true);

        try {
            // For now, we'll simulate a successful submission
            // Replace this with your actual form handling service
            // Options: Formspree, Netlify Forms, ConvertKit, Mailchimp, etc.

            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Store email in localStorage as backup (for demo)
            const waitlist = JSON.parse(localStorage.getItem('betternature_waitlist') || '[]');
            if (!waitlist.includes(email)) {
                waitlist.push(email);
                localStorage.setItem('betternature_waitlist', JSON.stringify(waitlist));
            }

            // Success!
            showMessage("You're on the list. We'll be in touch.", 'success');
            form.reset();

            // Track conversion (add your analytics here)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'sign_up', {
                    'event_category': 'waitlist',
                    'event_label': 'landing_page'
                });
            }

        } catch (error) {
            showMessage('Something went wrong. Please try again.', 'error');
            console.error('Form submission error:', error);
        } finally {
            setLoading(false);
        }
    });

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showMessage(text, type) {
        messageEl.textContent = text;
        messageEl.className = 'form-note ' + type;

        // Clear message after 5 seconds
        setTimeout(() => {
            messageEl.textContent = '';
            messageEl.className = 'form-note';
        }, 5000);
    }

    function setLoading(isLoading) {
        submitBtn.disabled = isLoading;
        btnText.style.display = isLoading ? 'none' : 'inline';
        btnLoading.style.display = isLoading ? 'inline-flex' : 'none';
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
