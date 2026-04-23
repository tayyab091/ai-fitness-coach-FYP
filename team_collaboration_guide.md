# Team Collaboration Guide: AI Fitness Coach FYP

This guide outlines the step-by-step process for **Muneeb**, **Tayyab**, and **Musadiq** to collaborate on the new GitHub repository: `https://github.com/tayyab091/ai-fitness-coach-FYP`.

---

## 1. Environment Setup (One-time)

I have already updated the remotes in your folders to point to the new URL. Each member should follow these steps once:

1.  **Open your assigned folder** in your code editor (VS Code, etc.).
2.  **Install dependencies**:
    ```bash
    npm install
    cd client && npm install
    cd ../server && npm install
    ```
3.  **Verify your branch**:
    ```bash
    git branch --show-current
    ```
    *(Should be `feature/coaching-workouts`, `feature/nutrition-recipes`, or `feature/auth-subscription`)*

---

## 2. Daily Development Workflow

Each member should follow this loop to stay in sync and push progress:

### Step A: Pull Latest Changes
Before starting work, ensure your local `main` branch is up to date:
```bash
git checkout main
git pull origin main
git checkout your-feature-branch
git merge main
```

### Step B: Develop & Test
Make changes in your assigned functionality area. Run the app locally to test:
```bash
npm run dev
```

### Step C: Commit Changes
Stage and save your work locally:
```bash
git add .
git commit -m "feat: described what you added or fixed"
```

### Step D: Push to GitHub
Push your specific branch to the collaborative repository:
```bash
git push origin your-feature-branch
```

---

## 3. Merging Work "Into One"

The goal is to keep the `main` branch as the single source of truth where all your work is combined.

### The GitHub Merge Flow (Recommended)
1.  **Push**: Member pushes `feature/coaching-workouts` to GitHub.
2.  **Pull Request**: Member opens a **Pull Request** on GitHub to merge their branch into `main`.
3.  **Review**: Other team members check the code.
4.  **Merge**: Click **"Merge Pull Request"**. The `main` branch now contains the new features.

### Staying in Sync
Once a branch is merged into `main`, **every other member** should update their local folder:
```bash
git checkout main
git pull origin main
git checkout your-feature-branch
git merge main
```
This ensures that Muneeb's folder also has Tayyab's and Musadiq's work once they merge.

---

## 4. Advanced Tips

### Handling Merge Conflicts
If two members edit the same file, you might get a "Merge Conflict."
- **To fix**: Open the conflicted file in VS Code, choose which changes to keep, save, then `git add` and `git commit`.
- **Pro-tip**: Communicate with your team if you plan to edit "core" files like `App.tsx` or `globals.css`.

### Shared Environment Variables
Since `.env` files are not pushed to GitHub, you must share the contents (like the MongoDB URI) with your team via a secure channel (WhatsApp/Slack).
- Each member must create their own `.env` file in their `server/` and `client/` directories based on the shared values.

### Shared Components
If you create a component that others can use (like a button or a card), put it in `client/components/ui/` so everyone can access it.

---

## 5. Responsibility Checklist

| Member | Folder | Branch | Primary Responsibility |
| :--- | :--- | :--- | :--- |
| **Muneeb** | `muneeb/` | `feature/coaching-workouts` | Trainers, Exercises, Coaching logic. |
| **Tayyab** | `tayyab/` | `feature/nutrition-recipes` | Recipes, Meal Plans, Nutrition logic. |
| **Musadiq** | `musadiq/` | `feature/auth-subscription` | Auth, Payments, Admin Panel. |

> [!IMPORTANT]
> **Never commit `.env` files.** I have already added them to `.gitignore`, but stay vigilant to keep your credentials secure!

---

## 6. Member-Specific Cheatsheets

### 👤 Muneeb (Coaching & Workouts)
- **Folder**: `D:\New folder (3)\muneeb`
- **Your Branch**: `feature/coaching-workouts`
- **Commands**:
  ```bash
  # Stage and commit your work
  git add .
  git commit -m "feat: updated coaching features"
  
  # Push your work to GitHub
  git push origin feature/coaching-workouts
  ```

### 👤 Tayyab (Nutrition & Recipes)
- **Folder**: `D:\New folder (3)\tayyab`
- **Your Branch**: `feature/nutrition-recipes`
- **Commands**:
  ```bash
  # Stage and commit your work
  git add .
  git commit -m "feat: updated nutrition features"
  
  # Push your work to GitHub
  git push origin feature/nutrition-recipes
  ```

### 👤 Musadiq (Auth & Subscription)
- **Folder**: `D:\New folder (3)\musadiq`
- **Your Branch**: `feature/auth-subscription`
- **Commands**:
  ```bash
  # Stage and commit your work
  git add .
  git commit -m "feat: updated auth and payment features"
  
  # Push your work to GitHub
  git push origin feature/auth-subscription
  ```

---

## 7. How to Merge Everything into One
When you are ready to merge your work into the main project:
1. Push your branch using the commands above.
2. Go to the [GitHub Repo](https://github.com/tayyab091/ai-fitness-coach-FYP).
3. Click "New Pull Request".
4. Select `base: main` and `compare: your-branch-name`.
5. Click "Create Pull Request".
