module.exports = {
  name: "BizHawk",
  description: "for emulating console games. can read and modify the game state (ie, RAM) via Lua scripting",
  techniques: [
    'write-input',
    'read-ram',
    'write-ram',
    'save-state',
    'load-state',
  ]
};