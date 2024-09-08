let stories = JSON.parse(localStorage.getItem('stories')) || [
    { text: "This is an example story to get started. Each story has exactly five sentences. Upvote stories you like to rank them higher!", upvotes: 0 },
    { text: "Here’s another 5-sentence story for you. Play around with the upvotes to see how they work. Enjoy the creativity!", upvotes: 0 },
    { text: "Make sure to submit your own five-sentence story. Use the form below to get started!", upvotes: 0 }
];

// Function to render the stories sorted by upvotes
function renderStories() {
    stories.sort((a, b) => b.upvotes - a.upvotes);  // Sort by upvotes (highest first)
    const storiesContainer = document.getElementById('stories');
    storiesContainer.innerHTML = ''; // Clear previous stories

    stories.forEach((story, index) => {
        const storyElement = document.createElement('div');
        storyElement.className = 'story';

        storyElement.innerHTML = `
            <p>${story.text}</p>
            <button class="upvote-btn" data-index="${index}"><img src="up-arrow.png" class="upvote-icon" /> ${story.upvotes}</button>
        `;
        storiesContainer.appendChild(storyElement);
    });
}

// Handle story submission
document.getElementById('submit-btn').addEventListener('click', () => {
    const storyText = document.getElementById('story-text').value;
    if (storyText.trim().split(' ').length >= 5) {
        const newStory = {
            text: storyText.trim(),
            upvotes: 0
        };
        stories.push(newStory);
        localStorage.setItem('stories', JSON.stringify(stories));
        renderStories();
        document.getElementById('story-text').value = ''; // Clear the text area
    } else {
        alert('Your story must be at least 5 sentences long!');
    }
});

// Handle upvotes
document.addEventListener('click', (e) => {
    if (e.target.closest('.upvote-btn')) {
        const index = e.target.closest('.upvote-btn').getAttribute('data-index');
        stories[index].upvotes++;
        localStorage.setItem('stories', JSON.stringify(stories));
        renderStories(); // Re-render stories after upvote
    }
});

// Initial render on page load
renderStories();
