const weatherImages = {
    'clear': './images/sunny.jpg',
    'cloudy': './images/cloudy.jpg',
    'partly-cloudy': './images/cloudy.jpg',
    'rain': './images/rain.jpg',
    'snow': './images/snow.jpg',
    'thunderstorm': './images/thunderstorm.jpg',
    'default': './images/default.jpg'
};

export function updateBackgroundImage(condition) {
    const backgroundContainer = document.getElementById('background-container');
    const lowerCaseCondition = condition.toLowerCase();
    
    let imageUrl = weatherImages.default;
    
    for (const [key, url] of Object.entries(weatherImages)) {
        if (lowerCaseCondition.includes(key)) {
            imageUrl = url;
            break;
        }
    }
    
    backgroundContainer.style.backgroundImage = `url('${imageUrl}')`;
}