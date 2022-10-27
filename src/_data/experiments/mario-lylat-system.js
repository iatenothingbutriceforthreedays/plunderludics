module.exports = {
  name: "mario in lylat system",
  description: `
running two n64 instances (super mario 64 and lylat wars),
both receiving input, and blending in {{ link_thing('/tools/touchdesigner') }}. 
also tried blending via checkerboard matte. also tried blending using a third n64 instance running killer instinct as the matte.
  `,
  assets: [
    {
      type: "video",
      src: "/documentation/21-10-2022/mario-lylat-system.mp4"
    },
    {
      type: "image",
      src: "/documentation/21-10-2022/checkers.jpg"
    },
    {
      type: "video",
      src: "/documentation/21-10-2022/killer-instinct-matte.mp4"
    }
  ],
  tools: [
    'bizhawk',
    'touchdesigner'
  ]
};