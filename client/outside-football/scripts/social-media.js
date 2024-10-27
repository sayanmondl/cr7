const data = {
  twitter: {
    posts: '2250+',
    followers: '110M+'
  },
  instagram: {
    posts: '3750+',
    followers: '641M+'
  },
  facebook: {
    posts: '_',
    followers: '170M+'
  },
  youtube: {
    posts: '60+',
    followers: '60M+'
  }
};

function createMediaInfo(posts, followers) {
  return `<div class="media-info">
            <div class="info-posts">
              <h2>Posts</h2>
              <h1>${posts}</h1>
            </div>
            <div class="info-followers">
              <h2>Followers</h2>
              <h1>${followers}</h1>
            </div>
          </div>`;
}

document.querySelectorAll('.platform').forEach(platform => {
  let platformName = platform.querySelector('img').getAttribute('alt').toLowerCase();

  let mediaData = data[platformName];

  if (data) {
    let mediaInfo = createMediaInfo(mediaData.posts, mediaData.followers);
    platform.innerHTML += mediaInfo;
  } else {
    console.warn(`No data available for platform: ${platformName}`);
  }
});
