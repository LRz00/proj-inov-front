document.addEventListener('DOMContentLoaded', function() {
            const categoryButtons = document.querySelectorAll('.left-column .category-button');
            const rightContentBlocks = document.querySelectorAll('.right-column .right-content-block');

            // Function to show a specific content block and set active button
            function showContent(contentId) {
                // Remove active class from all buttons
                categoryButtons.forEach(button => {
                    button.classList.remove('active');
                });

                // Hide all content blocks
                rightContentBlocks.forEach(block => {
                    block.classList.add('hidden');
                });

                // Add active class to the clicked button
                const clickedButton = document.querySelector(`.left-column [data-content-id="${contentId}"]`);
                if (clickedButton) {
                    clickedButton.classList.add('active');
                }

                // Show the corresponding content block
                const targetContent = document.getElementById(contentId);
                if (targetContent) {
                    targetContent.classList.remove('hidden');
                }
            }

            // Set "Solicitações" as active and visible on initial load
            showContent('solicitacoes-content');

            // Add click event listeners to category buttons
            categoryButtons.forEach(button => {
                button.addEventListener('click', function(event) {
                    event.preventDefault(); // Prevent default link behavior
                    const contentId = this.getAttribute('data-content-id');
                    showContent(contentId);
                });
            });
        });