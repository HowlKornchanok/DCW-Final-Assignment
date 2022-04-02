const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GithubStrategy = require("passport-github2").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const passport = require("passport");

const GOOGLE_CLIENT_ID =
  "855737797206-7uvoq9k33d4bms1n0lerqecp6bjq37v4.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

GITHUB_CLIENT_ID = "69729274b73851dc8e66";
GITHUB_CLIENT_SECRET = "d1c54337b5dd48d05a94847ffa05a8510b413c14";

FACEBOOK_APP_ID = "282394247268943";
FACEBOOK_APP_SECRET = "64df0bfaf2e6a874404d0d4058546b73";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);

passport.use(
  new GithubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: "/auth/github/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_APP_SECRET,
      callbackURL: "/auth/facebook/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
