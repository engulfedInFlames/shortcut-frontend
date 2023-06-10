document.addEventListener("DOMContentLoaded", (event) => {
  const tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  const firstScriptTag = document.getElementsByTagName("script")[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  // IFrame player API를 비동기로 로드
  const playerInfoList = [
    {
      id: "player1",
      videoId: "HTlKoYCD96I",
    },
    {
      id: "player2",
      videoId: "x6q9AxPUTOs",
    },
    {
      id: "player3",
      videoId: "wcIf3huwFhc",
    },
    {
      id: "player4",
      videoId: "0reLafQuDik",
    },
    {
      id: "player5",
      videoId: "cYM7Rpk1wmc",
    },
    {
      id: "player6",
      videoId: "yU19mWfCIdg",
    },
  ];

  window.onYouTubeIframeAPIReady = () => {
    if (typeof playerInfoList === "undefined") return;
    const createPlayer = (playerInfo) => {
      const player = new YT.Player(playerInfo.id, {
        width: "480",
        height: "270",
        videoId: playerInfo.videoId,
        playerVars: { controls: 0 },
      });
      return player;
    };

    for (let i = 0; i < playerInfoList.length; i++) {
      let curPlayer = createPlayer(playerInfoList[i]);
    }
  };
});
