# SIH-BRAINCELLS
Codebase for react native app, Website and Backend

# Contents
1. [React native app](#react-native-app)
2. [Cloning repo](#cloning-repo-to-you-local)
3. [Pushing to remote repo](#pushing-to-this-repo)
4. [Pull changes](#pull-changes)
5. [Removing conflicts](#removing-conflicts)


# write your domain's dependencies and installation

-------------------------------------------------------------------------------------------------

## React Native App

1. So you have cloned the repo, lets try out the react native app
2. move to SIH-BRAINCELLS
3. now open the folder named 'React_native_app' in VS code or your preferred code editior
4. 📒 N.B. (as node modules are not pushed to github repo) you need to install node modules
5. As you move to the folder 'React_native_app', open the terminal for this folder using **ctrl + `** , if this command doesn't work in your machine, just simply you can open terminal from the menubar of VS code.
6. now type to install **node modules** `npm install`
7. Now you are good to go.
8. run `npm start`. this will generate a QR code for scanning
9. Now in your phone install `expo` app from playstore
10. Open the `expo go` and scan the QR code generated in your terminal.
11. Enjoy the app.

-------------------------------------------------------------------------------------------------









# Git operations

## Cloning repo to you local

1. First you should have git installed in your local computer

2. Create a folder for this repo

3. open the newly created folder with terminal 

4. copy the HTTPS url from this repo code(green colored button)

5. Lets move to your terminal

6. enter this `git clone https://github.com/KrishnenduDakshi2002/SIH-BRAINCELLS.git`

7. Now you have this repo in your local


-------------------------------------------------------------------------------------------------


## Pushing to this repo
1. Be careful while pushing code

2. Open the `SIH-BRAINCELLS` in terminal

3. type `git status` --> to check what are the files you have changed in your local copy

4. `git add .` --> adds all change in the working directory to the staging area

5. `git commit -m "commit messge"` ---> please give a good commit message what you have changed

6. `git push origin main` ---> pushing changes to remote repo

-------------------------------------------------------------------------------------------------

## Pull changes

Lets clear this

1. Ankesh cloned this repo at 10:00 AM and
   also  Arjya cloned this repo at 10:10 AM and both wants to work on a same file README.md (note that they don't know each other)

2. Now they have the same copy of this repo in their local
3. Ankesh started developing and makes some changes in the README.md file and he finished his developing 10:30 AM, he wants to push changes to the main branch, he ran some commands (you will get to this commands very soon) and find out that there is no changes have been made to this repo, so he pushed the changes to main branch, so main branch has Ankesh's changes.

4. Let's move to Arjya's developement, she has been developing on her version of README.md and she completed her developement at 10:45 AM,
she is pretty satisfied with her changes in README.md, she wants to push her changes to main branch( Arjya still doesn't know that Ankesh's changes were already pushed, but she guessed that there might be some changes in the main repo).

5. Before pulling any changes from the remote repo (main branch), Arjya needs to commit her changes in the local version of repo else when changes will be pulled her chagnes will be lost, so she followed the above guide `Pushing to this repo` upto `step 5` , then she ran the following command to check is there any changes made in the remote repo.

> `git add .`
    
> `git commit -m "Updated README.md by Arjya`

> `git fetch` -- > to update the local repo's metadata(which gives the you the info about any changes)

> `git log --oneline` --> to log the the changes have been made

### This images shows there are no changes
As (HEAD-> main) 
![No changes images](/assets/images/No_changes.png)

### This image shows there are changes
As (HEAD)
![changes images](/assets/images/Chages_no_changes.jpg)

> `git pull origin main` --> pulling the changes made in the remote repo

It will show Auto merge conflict as Ankesh already pushed his code

### Conflict message shows up when run the above command

![changes images](/assets/images/pull_conflicts.jpg)

**Now Arjya can see the conflicts in the README.md file by opening the README.md file in VS code**

### Arjya can see the conflicts in the file

She can now see both her code and Ankesh's code
Now it's her decision what she wants to do, see can remove Ankesh's code or keep the code untouched

![changes images](/assets/images/Conflicts.jpg)

-------------------------------------------------------------------------------------------------


### Removing conflicts

<<<<<<<< HEAD  

`Arjya's code`

========

`Person 1's  code` --> May be it is Ankesh's code

========

`Person 2's  code`  --> May be it is Ankesh's code

========

`Person 2's  code`  --> May be it is Ankesh's code

'>>>>>>>>>  BRANCH_NAME'

Arjya don't know which is Ankesh's code
She will ask the maintainer what to do or she can do anything


### Arjya decides to keep all the code along with Ankesh's code


`Arjya's code`


`Person 1's  code` --> May be it is Ankesh's code



`Person 2's  code`  --> May be it is Ankesh's code


`Person 2's  code`  --> May be it is Ankesh's code


Arjya removes the notations before push to the main

-------------------------------------------------------------------------------------------------

