# Purchase Request App

## Git commands

```javascript
// refresh remote branches list
git fetch origin --prune

// create a new branch
git checkout -b branch_name

// switch branch
git checkout branch_name

// list local branches
git branch

// delete a local branch
git branch -D branch_name

// rebase with the main branch
git rebase main

// after rebase, push the branch to origin
git push origin --force branch_name

// merge branch
git merge --no-ff branch_name

// list commits
git log

// hide file changes
git stash

// show stashed changes
git stash apply

// move commits from one branch to another
git cherry-pick commit_id
```

## Git flow

- Working on a separate branch

```javascript
// commit changes on your branch
git add ./changed_file
git commit -m 'Commit message'

// then push your branch to the origin
git push origin some_branch

// after you finished your work on that branch merge it into stage

// go to stage
git checkout stage

// make sure your local stage is up to date
git pull origin stage

// merge your branch into stage
git merge --no-ff some_branch

// then push stage to the origin
git push origin stage
```

- After your branch was tested on stage and everything it's ok you can merge it into the main branch

```javascript
// go to main
git checkout main

// make sure your main is up to date
git pull origin main

// go to your branch
git checkout some_branch

// rebase your branch with the main
git rebase main

// if there are some conflicts fix them and continue
git rebase --continue

// push your branch to origin
git push origin some_branch --force

// go to main
git checkout main

// merge your branch into the main branch
git merge --no-ff some_branch

// push main to the origin
git push origin main

// delete local branch
git branch -D some_branch

// delete remote branch
git push origin --delete some_branch
```
