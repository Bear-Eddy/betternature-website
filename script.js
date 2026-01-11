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
            // Submit to Formspree
            const response = await fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                showMessage("You're on the list. We'll be in touch.", 'success');
                form.reset();

                // Track conversion (add your analytics here)
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'sign_up', {
                        'event_category': 'waitlist',
                        'event_label': 'landing_page'
                    });
                }
            } else {
                const data = await response.json();
                if (data.errors) {
                    showMessage(data.errors.map(e => e.message).join(', '), 'error');
                } else {
                    showMessage('Something went wrong. Please try again.', 'error');
                }
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
