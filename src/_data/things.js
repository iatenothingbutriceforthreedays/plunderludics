// basically this flattens all the objects in subdirectories into one big object of 'things'
// with a 'category' property to tell what kind of thing it is.
// e.g.
// things: {
//   "read-input": {
//     "category": "techniques"
//     "subcategory": "input"
//   }, 
//   ...
// }
// (this is to make it easy to generate pages for all the different types of things)

// ! need to be careful about colliding keys in the merged object
// TODO raise an error for this

// TODO move this out of _data and into addGlobal somewhere else

const { debug } = require('console');
const fs = require('fs');
const {
  lstat,
  readdir,
  access,
} = require('fs/promises');
const path = require('path');

const objMapValues = (obj, fn) => {
  return Object.fromEntries(
    Object.entries(obj).map(
      ([k, v], i) => [k, fn(v, k, i)]
    )
  );
}

const objMap = (obj, fn) => {
  return Object.fromEntries(
    Object.entries(obj).map(
      ([k, v], i) => fn(v, k, i)
    )
  );
}

const exists = file => {
  try {
    fs.accessSync(file, fs.constants.F_OK);
    return true;
  } catch (e) {
    return false;
  }
}

const listFileTreeRecursive = dir => {
  const recurse = entry => {
    if (!(fs.existsSync(entry))) {
      console.log(entry, "doesn't exist")
      return {};
    }

    const stats = fs.lstatSync(entry);
    if (!stats.isDirectory()) {
      return {
        name: path.basename(entry),
        time: stats.mtime,
        size: stats.size,
        path: entry
      };
    }

    const files = fs.readdirSync(entry);
    const childEntries = files.map((child) => recurse(path.join(entry, child)))
    return {
      name: path.basename(entry),
      time: stats.mtime,
      entries: childEntries,
      path: entry
    };
  };

  return recurse(dir);
}


const getThings = () => {
  const dataDir = "./src/_data/"
  const ignore = new Set(['things.js', 'categories.js']);
  const fileTree = listFileTreeRecursive(dataDir);
  const loadModulesInTree = entry => {
    if (entry.entries !== undefined) {
      // directory
      const res = entry.entries
                       .filter(e => !ignore.has(e.name))
                       .map(e => {
                         const name =  path.basename(e.name, '.js'); // strip the .js from the end for js files
                         return [name, loadModulesInTree(e)];
                       });
      return Object.fromEntries(res);
    } else {
      // file

      // import JS
      const relPath = path.relative(dataDir, entry.path);
      const m = require('./'+relPath);
      return m;
    }
  }
  modules = loadModulesInTree(fileTree);
  const dataDirBase = path.basename(dataDir); // "_data"
  return modules;
}

// getThings().then(_ => console.dir(_, {depth : 20}))

const flattenThings = things => {
  return Object.entries(things).reduce((previous, [category, thingsInCategory]) => {
    return {
      ...previous,
      ...(objMap(thingsInCategory, (v, k) => {
        const newKey = '/'+category+'/'+k; // e.g. move 'bizhawk' to '/tools/bizhawk'
        return [
          newKey, // key
          {
            ...v,
            id: newKey,
            category
          }                   // value
        ]
      }))
    };
  }, {});
}
// listFileTreeRecursive("./src/_data/").then(_ => console.dir(_, {depth : 20}));

const unFlatThings = getThings();
const flatThings = flattenThings(unFlatThings);

// console.dir(flatThings, {depth : 20});

module.exports = flatThings;