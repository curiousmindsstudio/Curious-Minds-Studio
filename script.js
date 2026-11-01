//
// Curious Minds Studio
// YouTube Data API v3
//

const channelId = "UC9z8-miJV8pgnrUioD1SmxQ";
const apiKey = YOUTUBE_API_KEY;


// Load channel statistics

async function getChannelData() {

  try {

    const url =
    `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${apiKey}`;


    const response = await fetch(url);
    const data = await response.json();


    if (data.error) {
      console.error("YouTube API Error:", data.error);
      return;
    }


    if (!data.items || data.items.length === 0) {
      console.error("Channel not found");
      return;
    }


    const stats = data.items[0].statistics;


    document.getElementById("subscriberCount").textContent =
      formatNumber(stats.subscriberCount);


    document.getElementById("videoCount").textContent =
      formatNumber(stats.videoCount);


    document.getElementById("viewCount").textContent =
      formatNumber(stats.viewCount);


  }

  catch(error) {

    console.error("Channel loading error:", error);

  }

}




// Load latest videos

async function getVideos() {


  try {


    const url =
    `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=6&order=date&type=video&key=${apiKey}`;



    const response = await fetch(url);
    const data = await response.json();



    if (data.error) {

      console.error("YouTube API Error:", data.error);
      return;

    }



    const grid = document.getElementById("videoGrid");


    grid.innerHTML = "";



    data.items.forEach(video => {


      const videoId = video.id.videoId;


      const title = video.snippet.title;


      const thumbnail =
      video.snippet.thumbnails.high.url;



      grid.innerHTML += `

      <div class="video-card">

        <a href="https://www.youtube.com/watch?v=${videoId}"
        target="_blank">


          <img 
          loading="lazy"
          src="${thumbnail}"
          alt="${title}">


          <div class="video-info">

            <h3>${title}</h3>

          </div>


        </a>

      </div>

      `;


    });


  }


  catch(error) {

    console.error("Video loading error:", error);

  }


}





function formatNumber(number) {

  if (!number) return "--";


  return new Intl.NumberFormat("en-US", {
    notation: "compact"
  }).format(number);

}




// Start

getChannelData();
getVideos();
