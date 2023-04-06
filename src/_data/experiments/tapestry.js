
module.exports = {
  name: "tapestry",
  description: `
  moving accross multiple (n64 and psx) third person games as their video output fading between them.
  multiple games are placed in space in relation to one another, as the player moved, the three closest games in space get interpolated on the screen, creating an

  tapestry 1-3: experiments with four games and manually modifying the blend factor.
    1. two modes of interaction: playing the games and choosing what game was being focused on.
    2. using vcv rack to modulate the fading over time
    3. using vcv rack to control and modulate the games with similar oscillations
  games: gex, mario 64, spiderman, ocarina of time


  tapestry 4: fully fledged tapestry of 16 games backed by invisible character that receives same input as rest
  games: mario 64, spiderman, ocarina of time
  `,
  comments: `
  `,
  assets: [
    {
      type: "video",
      src: "/documentation/2023-02-25/tapestry1.mp4"
    },
  ],
  tools: [
    'bizhawk',
    'unity',
    'osc',
  ],
  techniques: [
    "video interpolation",
    "video oscillation",
    "same input multiple games",
    "multiple tracks",
    "compositing",
    "overlaying",
  ],
  inspiration: [
  ]
};