# Getting Set Up to Work on the Campfire Website

## Step 1: Create a GitHub Account
1. Go to [github.com](https://github.com) and click **Sign up**
2. Use your work email, pick a username, create a password
3. Verify your email

**Then send Steve your GitHub username** so he can invite you to the project.

---

## Step 2: Accept the Invite
Steve will send you an invite. You'll get an email from GitHub — click **Accept invitation**.

---

## Step 3: Install Two Apps

**GitHub Desktop** (this replaces the scary command line stuff):
1. Go to [desktop.github.com](https://desktop.github.com)
2. Download and install it
3. Open it and sign in with your GitHub account

**VS Code** (this is your code editor):
1. Go to [code.visualstudio.com](https://code.visualstudio.com)
2. Download and install it

---

## Step 4: Clone the Project

1. Open **GitHub Desktop**
2. Click **File > Clone Repository**
3. Find `stevearntz/campfire-website` in the list
4. Choose where to save it on your computer (Desktop is fine)
5. Click **Clone**
6. **Important**: In the top bar, make sure the branch says **`development`** — if it says `main`, click it and switch to `development`

---

## Step 5: Set Up the Project Locally (one-time)

1. Open **VS Code**
2. Click **File > Open Folder** and select the `campfire-website` folder you just cloned
3. In VS Code, open the terminal: **Terminal > New Terminal** (a panel appears at the bottom)
4. Install Node.js first if you don't have it: go to [nodejs.org](https://nodejs.org), download the LTS version, install it
5. Back in the VS Code terminal, type:
   ```
   npm install
   ```
   Wait for it to finish.
6. Then type:
   ```
   npm run dev
   ```
7. Open your browser to **http://localhost:3000** — you should see the website!

---

## The Golden Rules

**Before you start working each day:**
1. Open **GitHub Desktop**
2. Make sure you're on the **`development`** branch
3. Click **Fetch origin** (top bar), then **Pull origin** if it appears
4. This grabs everyone else's latest changes

**Never work on the `main` branch.** Always work on `development`.

---

## Making Changes

1. Edit files in VS Code and save them
2. Check your browser at localhost:3000 to see changes live
3. When you're happy with your changes, go to **GitHub Desktop**
4. You'll see your changed files listed on the left
5. At the bottom left, type a short description of what you changed (e.g., "Updated homepage headline")
6. Click **Commit to development**
7. Click **Push origin** (top bar) to send your changes to everyone

---

## If You Get a Conflict

This happens when two people edited the same file at the same time. Don't panic.

1. GitHub Desktop will tell you there's a conflict
2. Click **Pull origin** first
3. If it says there are conflicts, open the file in VS Code
4. You'll see something like:
   ```
   <<<<<<< HEAD
   Your version of the text
   =======
   Their version of the text
   >>>>>>> development
   ```
5. Delete the `<<<<<<<`, `=======`, and `>>>>>>>` lines
6. Keep the version you want (or combine both)
7. Save the file
8. Go back to GitHub Desktop, commit, and push

**If you're ever stuck or confused, just ask Steve before clicking anything destructive.**

---

## Quick Daily Workflow Cheat Sheet

| When | Do This |
|------|---------|
| Start of day | GitHub Desktop > Fetch > Pull |
| While working | Edit in VS Code, check localhost:3000 |
| Done with a change | GitHub Desktop > Write summary > Commit > Push |
| Something weird happens | Don't force anything — ask Steve |
