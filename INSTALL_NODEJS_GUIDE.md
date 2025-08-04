# 🔧 **Install Node.js + Vercel CLI Guide**

## **Step 1: Install Node.js**
1. **Download**: Go to [nodejs.org](https://nodejs.org)
2. **Download LTS version** (recommended)
3. **Run installer** and follow setup
4. **Restart PowerShell** after installation

## **Step 2: Verify Installation**
```powershell
node --version
npm --version
```

## **Step 3: Install Vercel CLI**
```powershell
npm install -g vercel
```

## **Step 4: Login to Vercel**
```powershell
vercel login
```

## **Step 5: Deploy Manually**
```powershell
cd frontend
vercel --prod
```

## **Alternative: Use Vercel Dashboard**
If you don't want to install Node.js, use the web dashboard:
1. Go to [vercel.com](https://vercel.com)
2. Find your project
3. Click "Redeploy" 