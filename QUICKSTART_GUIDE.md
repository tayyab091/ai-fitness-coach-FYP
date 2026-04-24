# 🚀 QUICK START GUIDE - AI Fitness Coach (Antigravity)

## Project Structure
```
server/
  src/
    models/ (User, Exercise, Recipe, Trainer)
    routes/ (auth, payments, admin, exercises, recipes, trainers)
    middleware/ (auth, admin)
    index.ts
  .env

client/
  app/ (login, signup, admin, subscription/payment, coaching, nutrition, etc)
  components/ (layouts, UI components, forms)
  hooks/ (useAuth)
  .env.local

ENHANCEMENT_SUMMARY.md (This audit's documentation)
PUSH_COMMANDS_GUIDE.md (Git guide)
```

## Starting Development

### 1. Install Dependencies
```bash
cd server && npm install
cd ../client && npm install
```

### 2. Configure Environment
**server/.env:**
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/antigravity
JWT_SECRET=your-secure-secret-key
PORT=5000
CLIENT_URL=http://localhost:3000
```

**client/.env.local:**
```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### 3. Start Development Servers
```bash
# Terminal 1: Backend
cd server
npm run dev

# Terminal 2: Frontend
cd client
npm run dev
```

Visit: http://localhost:3000

## Key API Routes

### Authentication
- `POST /api/auth/register` - Sign up
- `POST /api/auth/login` - Sign in
- `POST /api/auth/logout` - Sign out
- `GET /api/auth/me` - Get current user

### Payments
- `POST /api/payments/subscribe` - Subscribe to plan
- `GET /api/payments/subscription` - Check subscription
- `POST /api/payments/cancel` - Cancel subscription

### Admin (admin-only)
- `GET /api/admin/stats` - Dashboard stats
- `GET /api/admin/users` - List users
- `PUT /api/admin/users/:id/role` - Update role
- `DELETE /api/admin/users/:id` - Delete user
- `GET /api/admin/subscriptions` - All subscriptions

### Exercises
- `GET /api/exercises` - List all
- `POST /api/exercises` - Create
- `PUT /api/exercises/:id` - Update
- `DELETE /api/exercises/:id` - Delete

## Testing Flows

### Register & Login
1. Go to /signup
2. Enter email, password (6+ chars), full name
3. Click "Create Account"
4. Should redirect to home (logged in)

### Subscribe to Plan
1. Go to /subscription
2. Pick a plan (basic, pro, elite)
3. Click "Subscribe"
4. Go to /subscription/payment
5. Fill in test card: 4242 4242 4242 4242
6. Any future expiry, any 3-digit CVC
7. Click "Pay $X"
8. Success screen appears

### Admin Panel
1. Create admin user: `db.users.updateOne({email: "yourmail@test.com"}, {$set: {role: "admin"}})`
2. Login as that user
3. Visit /admin
4. See stats, manage users, view subscriptions, manage exercises

## Common Tasks

### Add New Admin Endpoint
1. Open `server/src/routes/admin.ts`
2. Add route: `router.get("/endpoint", adminMiddleware, async (req, res) => {...})`
3. Register in `server/src/index.ts`: `app.use("/api/admin", adminRoutes)`

### Modify User Model
1. Open `server/src/models/User.ts`
2. Add field to schema
3. Add validation if needed
4. Restart server

### Change Payment Plan Pricing
1. Open `client/app/subscription/page.tsx`
2. Find PLANS constant
3. Update price values
4. Save

## Environment Variables Checklist

Server:
- [ ] MONGO_URI (MongoDB connection)
- [ ] JWT_SECRET (secure string)
- [ ] PORT (5000)
- [ ] CLIENT_URL (http://localhost:3000)

Client:
- [ ] NEXT_PUBLIC_API_URL (http://localhost:5000)

## Debugging Tips

**Payment not working:**
- Check server is running: `curl http://localhost:5000/api/admin/stats`
- Check .env files are set
- Check MongoDB connection
- Look at server console for errors
- Check browser Network tab in DevTools

**Login not working:**
- Check MongoDB has users collection
- Check password hashing (look at console logs)
- Check JWT_SECRET is same in login/auth

**Admin page not showing data:**
- Check user role is "admin"
- Check admin middleware (401/403 errors)
- Check API endpoint returns data
- Look at browser console for fetch errors

## Code Standards

- Use TypeScript types
- Use async/await (no callbacks)
- Use try/catch for errors
- Toast notifications for user feedback
- HTTP-only cookies for auth
- Validate on both frontend and backend
- Use lucide-react for icons
- Use shadcn/ui for components
- Use Tailwind for styling

## Files Not to Edit
- `client/next-env.d.ts` - Auto-generated
- `client/.next/` - Build directory
- `server/node_modules/` - Dependencies
- `client/node_modules/` - Dependencies

## Useful Commands

```bash
# Restart server (clears connection)
npm run dev

# Check types
npm run type-check

# Build for production
npm run build

# Start production
npm run start

# Database operations
# Open MongoDB compass or mongosh CLI
# View users: db.users.find()
# Add admin: db.users.updateOne({_id: ObjectId("...")}, {$set: {role: "admin"}})
```

## Module Owners (Team Structure)
- **Musadiq**: Auth, Payments, Admin Panel
- **Muneeb**: Coaching, Trainers
- **Tayyab**: Nutrition, Recipes

## Next Features to Add
- [ ] Email verification for signup
- [ ] Password reset flow
- [ ] Payment history
- [ ] Stripe/PayPal integration
- [ ] User profile editing
- [ ] Two-factor authentication
- [ ] Chat/messaging
- [ ] Notifications

---

**Last Updated**: Audit Complete (April 24, 2026)  
**Status**: Production Ready ✅
