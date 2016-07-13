var config = require('../../server/config.json');
var path = require('path');

module.exports = function (user) {

  // This way we can override the built-in functions that are used for password hashing.

/*  user.prototype.hasPassword = function (){
    console.log("override!");
  }

 User.hashPassword = function(plain) {
 this.validatePassword(plain);
 var salt = bcrypt.genSaltSync(this.settings.saltWorkFactor || SALT_WORK_FACTOR);
 return bcrypt.hashSync(plain, salt);
 };
*/

/* function wp_generate_password( $length = 12, $special_chars = true, $extra_special_chars = false ) {
 2091	        $chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
 2092	        if ( $special_chars )
 2093	                $chars .= '!@#$%^&*()';
 2094	        if ( $extra_special_chars )
 2095	                $chars .= '-_ []{}<>~`+=,.;:/?|';
 2096
 2097	        $password = '';
 2098	        for ( $i = 0; $i < $length; $i++ ) {
 2099	                $password .= substr($chars, wp_rand(0, strlen($chars) - 1), 1);
 2100	        }
 2101
 2102	        /!**
 2103	         * Filter the randomly-generated password.
 2104	         *
 2105	         * @since 3.0.0
 2106	         *
 2107	         * @param string $password The generated password.
 2108	         *!/
    	        return apply_filters( 'random_password', $password );
  }*/



  //send verification email after registration
  user.afterRemote('create', function(context, userInstance, next) {
    console.log('> user.afterRemote triggered');

    var options = {
      type: 'email',
      to: userInstance.email,
      from: 'yotam@epart.co.il',
      subject: 'Thanks for registering.',
      template: path.resolve(__dirname, '../../server/views/verify.ejs'),
      redirect: 'http://localhost:9000/welcome',
      user: user
    };

    userInstance.verify(options, function(err, response) {
      if (err)  {
        console.log(err);
        return next(err);
      }

      console.log('> verification email sent:', response);
      next();

/*      context.res.render('response', {
        title: 'Signed up successfully',
        content: 'Please check your email and click on the verification link ' +
        'before logging in.',
        redirectTo: '/',
        redirectToLinkText: 'Log in'
      });*/
    });
  });

  // Set the username to the users email address by default.
  user.observe('before save', function setDefaultUsername(ctx, next) {
    if (ctx.instance) {
      if(ctx.isNewInstance) {
        ctx.instance.username = ctx.instance.email;
      }
      ctx.instance.status = 'created';
      ctx.instance.created = Date.now();
    }
    next();
  });

};
