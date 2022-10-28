# Build files
npm run build

# Checkout gh-pages branch
git checkout gh-pages

# Merge changes from main
git merge main

# Add and commit built files
git add docs
git commit -m "add built files"

# Squash history (don't need versioning on generated files)
git reset $(git commit-tree HEAD^{tree} -m "Erase history")

# Force push
git push -f