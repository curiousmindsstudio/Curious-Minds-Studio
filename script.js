// Curious Minds Studio
// YouTube Data API Integration


const channelId = "UC9z8-miJV8pgnrUioD1SmxQ";

const apiKey = YOUTUBE_API_KEY;



async function getChannelData(){

try {


const url =
`https://www.googleapis.com/youtube/v3/channels?part=statistics,snippet&id=${channelId}&key=${apiKey}`;


const response = await fetch(url);

const data = await response.json();


const stats = data.items[0].statistics;


document.getElementById("subscriberCount").textContent =
formatNumber(stats.subscriberCount);


document.getElementById("videoCount").textContent =
formatNumber(stats.videoCount);


document.getElementById("viewCount").textContent =
formatNumber(stats.viewCount);



}

catch(error){

console.log("Channel error:",error);

}

}




async function getVideos(){

try {


const searchURL =

`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=6&order=date&type=video&key=${apiKey}`;



const response = await fetch(searchURL);

const data = await response.json();



const grid = document.getElementById("videoGrid");


grid.innerHTML = "";



data.items.forEach(video=>{


const id = video.id.videoId;


const title = video.snippet.title;


const thumbnail =
video.snippet.thumbnails.high.url;



grid.innerHTML += `

<div class="video-card">

<a href="https://youtube.com/watch?v=${id}"
target="_blank">


<img loading="lazy"
src="${thumbnail}"
alt="${title}">


<div class="video-info">

<h3>
${title}
</h3>


</div>

</a>

</div>

`;


});



}

catch(error){

console.log("Video error:",error);

}

}




function formatNumber(number){

if(!number) return "--";


return new Intl.NumberFormat("en-US",{
notation:"compact"
}).format(number);

}




getChannelData();

getVideos();
