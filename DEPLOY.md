# Deploying "Unfunny Sinha" (FrameCraft) to unfunnysinha.in

This project has two parts that deploy separately:
- **frontend/** — React site (Home, About, Course, Contact, Blog)
- **backend/** — FastAPI server (contact form emails + blog data), needs MongoDB

I already verified `frontend` builds cleanly (`npm run build` succeeds) and fixed
one broken dependency reference in `package.json`.

---

## 1. Database — MongoDB Atlas (free tier is fine)

1. Go to https://www.mongodb.com/cloud/atlas and create a free (M0) cluster.
2. Create a database user (username + password).
3. Under Network Access, allow access from anywhere (0.0.0.0/0) — or your host's IP once known.
4. Copy the connection string, it looks like:
   `mongodb+srv://<username>:<password>@<cluster>.mongodb.net/?retryWrites=true&w=majority`

## 2. Email — Resend (free tier: 100 emails/day)

1. Sign up at https://resend.com
2. Create an API key.
3. For a custom "from" address (e.g. hello@unfunnysinha.in), verify your domain
   in Resend's dashboard — it'll give you DNS records to add at Hostinger
   (this is separate from pointing the site itself).
4. Until you verify the domain, you can use Resend's default sender:
   `onboarding@resend.dev`

## 3. Backend — deploy `backend/` folder

Pick one: **Render** (recommended, has free tier) or Railway.

### Render.com
1. New → Web Service → connect your GitHub repo (push this project to GitHub first) or use "Deploy from folder" if offered.
2. Root directory: `backend`
3. Build command: `pip install -r requirements.txt`
4. Start command: `uvicorn server:app --host 0.0.0.0 --port $PORT`
   (a `Procfile` is already included for platforms that read it)
5. Add environment variables (from `backend/.env.example`):
   - `MONGO_URL`
   - `DB_NAME`
   - `RESEND_API_KEY`
   - `SENDER_EMAIL`
   - `CORS_ORIGINS` = `https://unfunnysinha.in,https://www.unfunnysinha.in`
6. Deploy. Render gives you a URL like `https://unfunny-sinha-api.onrender.com`.
   Once deployed, test: visit `https://<your-render-url>/api/health`

### Custom subdomain for the API (optional but recommended)
At Hostinger DNS, add a CNAME:
- Host: `api`
- Points to: `unfunny-sinha-api.onrender.com` (or whatever Render gives you)
Then in Render, add `api.unfunnysinha.in` as a Custom Domain for the service.

## 4. Frontend — deploy `frontend/` folder

Pick one: **Vercel** or **Netlify** (both free, both easiest for React + custom domains).

### Vercel
1. Push this project to a GitHub repo.
2. Go to https://vercel.com → New Project → import the repo.
3. Root directory: `frontend`
4. Framework preset: Create React App
5. Build command: `npm run build` (already default)
6. Environment variable: `REACT_APP_BACKEND_URL` = `https://api.unfunnysinha.in`
   (or your Render URL if you skip the api subdomain)
7. Deploy.

## 5. Connect unfunnysinha.in (at Hostinger)

In Hostinger → Domains → unfunnysinha.in → DNS / Nameservers:

**If using Vercel for the frontend:**
- Add an A record: Host `@`, Value `76.76.21.21`
- Add a CNAME: Host `www`, Value `cname.vercel-dns.com`
- In Vercel project settings → Domains, add `unfunnysinha.in` and `www.unfunnysinha.in`, Vercel will confirm once DNS propagates (can take up to a few hours).

**If using Netlify instead:**
- Netlify gives you its own A record / CNAME target in Site settings → Domain management — add whatever it shows you, same pattern as above.

**For the backend API subdomain:**
- CNAME: Host `api`, Value = your Render service hostname (see step 3).

DNS changes typically take 10 minutes–24 hours to fully propagate.

---

## Local testing before you deploy (optional)

```bash
# Backend
cd backend
pip install -r requirements.txt
cp .env.example .env   # then fill in real values
uvicorn server:app --reload

# Frontend (separate terminal)
cd frontend
npm install --legacy-peer-deps
cp .env.example .env   # point REACT_APP_BACKEND_URL at http://localhost:8000
npm start
```

## Notes
- One dev-only dependency (`@emergentbase/visual-edits`, an editor plugin from
  the platform this project was originally built on) was removed from
  `frontend/package.json` since it's not reachable outside that platform and
  isn't needed for building or running the site.
- `ajv` / `ajv-keywords` were pinned to newer versions to fix a build error
  with the bundled `react-scripts` version — already applied.
