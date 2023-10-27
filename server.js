import express from 'express';
import session from 'express-session';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import flash from 'connect-flash';
import dotenv from 'dotenv';
import crypto from 'crypto';
import sequelize from './config/database.js';
import htmlRoutes from './routes/html-routes.js';
import apiRoutes from './routes/api-routes.js';
import exphbs from 'express-handlebars';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';



const app = express();
const PORT = process.env.PORT || 3000;

dotenv.config();


const generateSessionSecret = () => {
  return crypto.randomBytes(32).toString('hex');
};

const sessionSecret = generateSessionSecret();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.use(session({ secret: sessionSecret, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ where: { username: username } }).then((user) => {
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (user.password !== password) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findByPk(id).then((user) => {
    done(null, user);
  });
});

const currentDir = dirname(fileURLToPath(import.meta.url));

const hbs = exphbs.create({
    defaultLayout: 'main',
  
    layoutsDir: path.join(currentDir, 'views/layouts'),
  
    partialsDir: path.join(currentDir, 'views/partials'),

  });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use('/', htmlRoutes);
app.use('/api', apiRoutes);

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
